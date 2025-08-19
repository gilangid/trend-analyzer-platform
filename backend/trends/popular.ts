import { api } from "encore.dev/api";
import { trendsDB } from "./db";
import { PopularTrendsResponse } from "./types";

// Retrieves the most popular trending keywords across all platforms
export const popular = api<void, PopularTrendsResponse>(
  { expose: true, method: "GET", path: "/trends/popular" },
  async () => {
    const trends = await trendsDB.queryAll<{
      keyword: string;
      platform: string;
      search_count: number;
      last_searched: string;
    }>`
      SELECT 
        keyword,
        platform,
        COUNT(*) as search_count,
        MAX(search_date) as last_searched
      FROM trend_searches
      WHERE search_date >= NOW() - INTERVAL '7 days'
      GROUP BY keyword, platform
      ORDER BY search_count DESC, last_searched DESC
      LIMIT 20
    `;

    return {
      trends: trends.map(t => ({
        keyword: t.keyword,
        platform: t.platform,
        searchCount: t.search_count,
        lastSearched: t.last_searched,
      })),
    };
  }
);
