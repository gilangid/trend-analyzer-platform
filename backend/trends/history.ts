import { api } from "encore.dev/api";
import { trendsDB } from "./db";
import { TrendHistoryResponse, TrendAnalysis } from "./types";

// Retrieves the search history of trend analyses
export const history = api<void, TrendHistoryResponse>(
  { expose: true, method: "GET", path: "/trends/history" },
  async () => {
    const searches = await trendsDB.queryAll<{
      id: number;
      keyword: string;
      platform: string;
      region: string;
      timeframe: string;
      search_date: string;
    }>`
      SELECT id, keyword, platform, region, timeframe, search_date
      FROM trend_searches
      ORDER BY search_date DESC
      LIMIT 50
    `;

    const analyses: TrendAnalysis[] = [];

    for (const search of searches) {
      const trendData = await trendsDB.queryAll<{
        date: string;
        value: number;
        formatted_date: string;
      }>`
        SELECT date, value, formatted_date
        FROM trend_data
        WHERE search_id = ${search.id}
        ORDER BY date ASC
      `;

      const relatedQueries = await trendsDB.queryAll<{
        query: string;
        value: number;
        query_type: string;
      }>`
        SELECT query, value, query_type
        FROM related_queries
        WHERE search_id = ${search.id}
        ORDER BY value DESC
      `;

      analyses.push({
        id: search.id,
        keyword: search.keyword,
        platform: search.platform,
        region: search.region,
        timeframe: search.timeframe,
        searchDate: search.search_date,
        data: trendData.map(d => ({
          date: d.date,
          value: d.value,
          formattedDate: d.formatted_date,
        })),
        relatedQueries: relatedQueries.map(q => ({
          query: q.query,
          value: q.value,
          type: q.query_type as 'top' | 'rising',
        })),
      });
    }

    return { searches: analyses };
  }
);
