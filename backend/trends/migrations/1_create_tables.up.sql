CREATE TABLE trend_searches (
  id BIGSERIAL PRIMARY KEY,
  keyword TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('google', 'tiktok', 'instagram')),
  region TEXT DEFAULT 'ID',
  timeframe TEXT DEFAULT '12-m',
  search_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE trend_data (
  id BIGSERIAL PRIMARY KEY,
  search_id BIGINT REFERENCES trend_searches(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  value INTEGER NOT NULL,
  formatted_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE related_queries (
  id BIGSERIAL PRIMARY KEY,
  search_id BIGINT REFERENCES trend_searches(id) ON DELETE CASCADE,
  query TEXT NOT NULL,
  value INTEGER NOT NULL,
  query_type TEXT NOT NULL CHECK (query_type IN ('top', 'rising')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_trend_searches_keyword_platform ON trend_searches(keyword, platform);
CREATE INDEX idx_trend_data_search_id_date ON trend_data(search_id, date);
CREATE INDEX idx_related_queries_search_id ON related_queries(search_id);
