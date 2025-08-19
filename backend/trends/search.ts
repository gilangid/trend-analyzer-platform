import { api, APIError } from "encore.dev/api";
import { trendsDB } from "./db";
import { TrendSearchRequest, TrendSearchResponse, TrendDataPoint, RelatedQuery } from "./types";

// Searches for trend data for a given keyword and platform
export const search = api<TrendSearchRequest, TrendSearchResponse>(
  { expose: true, method: "POST", path: "/trends/search" },
  async (req) => {
    const { keyword, platform, region = 'ID', timeframe = '12-m' } = req;

    try {
      // Insert search record
      const searchResult = await trendsDB.queryRow<{ id: number }>`
        INSERT INTO trend_searches (keyword, platform, region, timeframe)
        VALUES (${keyword}, ${platform}, ${region}, ${timeframe})
        RETURNING id
      `;

      if (!searchResult) {
        throw APIError.internal("Failed to create search record");
      }

      const searchId = searchResult.id;

      // Generate mock trend data based on platform
      const trendData = generateMockTrendData(platform, keyword, timeframe);
      const relatedQueries = generateMockRelatedQueries(platform, keyword);

      // Insert trend data
      for (const point of trendData) {
        await trendsDB.exec`
          INSERT INTO trend_data (search_id, date, value, formatted_date)
          VALUES (${searchId}, ${point.date}, ${point.value}, ${point.formattedDate})
        `;
      }

      // Insert related queries
      for (const query of relatedQueries) {
        await trendsDB.exec`
          INSERT INTO related_queries (search_id, query, value, query_type)
          VALUES (${searchId}, ${query.query}, ${query.value}, ${query.type})
        `;
      }

      // Get the complete analysis
      const searchRecord = await trendsDB.queryRow<{
        id: number;
        keyword: string;
        platform: string;
        region: string;
        timeframe: string;
        search_date: string;
      }>`
        SELECT id, keyword, platform, region, timeframe, search_date
        FROM trend_searches
        WHERE id = ${searchId}
      `;

      if (!searchRecord) {
        throw APIError.internal("Failed to retrieve search record");
      }

      return {
        success: true,
        analysis: {
          id: searchRecord.id,
          keyword: searchRecord.keyword,
          platform: searchRecord.platform,
          region: searchRecord.region,
          timeframe: searchRecord.timeframe,
          searchDate: searchRecord.search_date,
          data: trendData,
          relatedQueries: relatedQueries,
        },
      };
    } catch (error) {
      console.error("Error searching trends:", error);
      throw APIError.internal("Failed to search trends");
    }
  }
);

function generateMockTrendData(platform: string, keyword: string, timeframe: string): TrendDataPoint[] {
  const data: TrendDataPoint[] = [];
  const now = new Date();
  const months = timeframe === '12-m' ? 12 : timeframe === '3-m' ? 3 : 1;
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const baseValue = Math.floor(Math.random() * 100);
    
    // Platform-specific adjustments
    let value = baseValue;
    if (platform === 'tiktok') {
      value = Math.floor(baseValue * 1.2); // TikTok tends to have higher engagement
    } else if (platform === 'instagram') {
      value = Math.floor(baseValue * 0.8); // Instagram more visual-focused
    }
    
    value = Math.min(100, Math.max(0, value));
    
    data.push({
      date: date.toISOString().split('T')[0],
      value,
      formattedDate: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      }),
    });
  }
  
  return data;
}

function generateMockRelatedQueries(platform: string, keyword: string): RelatedQuery[] {
  const baseQueries = [
    `${keyword} tutorial`,
    `${keyword} tips`,
    `${keyword} guide`,
    `${keyword} review`,
    `${keyword} 2024`,
  ];
  
  const platformSpecific = {
    google: [`${keyword} definition`, `${keyword} news`, `${keyword} wiki`],
    tiktok: [`${keyword} dance`, `${keyword} challenge`, `${keyword} viral`],
    instagram: [`${keyword} aesthetic`, `${keyword} photo`, `${keyword} story`],
  };
  
  const allQueries = [...baseQueries, ...platformSpecific[platform as keyof typeof platformSpecific]];
  
  const topQueries: RelatedQuery[] = allQueries.slice(0, 5).map((query, index) => ({
    query,
    value: Math.floor(Math.random() * 100) + (5 - index) * 10,
    type: 'top' as const,
  }));
  
  const risingQueries: RelatedQuery[] = allQueries.slice(3, 8).map((query) => ({
    query: `${query} trending`,
    value: Math.floor(Math.random() * 50) + 50,
    type: 'rising' as const,
  }));
  
  return [...topQueries, ...risingQueries];
}
