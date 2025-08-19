export interface TrendSearchRequest {
  keyword: string;
  platform: 'google' | 'tiktok' | 'instagram';
  region?: string;
  timeframe?: string;
}

export interface TrendDataPoint {
  date: string;
  value: number;
  formattedDate: string;
}

export interface RelatedQuery {
  query: string;
  value: number;
  type: 'top' | 'rising';
}

export interface TrendAnalysis {
  id: number;
  keyword: string;
  platform: string;
  region: string;
  timeframe: string;
  searchDate: string;
  data: TrendDataPoint[];
  relatedQueries: RelatedQuery[];
}

export interface TrendSearchResponse {
  success: boolean;
  analysis: TrendAnalysis;
}

export interface TrendHistoryResponse {
  searches: TrendAnalysis[];
}

export interface PopularTrendsResponse {
  trends: Array<{
    keyword: string;
    platform: string;
    searchCount: number;
    lastSearched: string;
  }>;
}
