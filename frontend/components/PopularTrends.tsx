import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, TrendingUp } from 'lucide-react';
import backend from '~backend/client';

export default function PopularTrends() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['popular-trends'],
    queryFn: async () => {
      const response = await backend.trends.popular();
      return response.trends;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  const platformColors = {
    google: 'bg-blue-100 text-blue-700',
    tiktok: 'bg-pink-100 text-pink-700',
    instagram: 'bg-purple-100 text-purple-700',
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Popular Trends</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-gray-500">
            Failed to load popular trends
          </div>
        )}
        
        {data && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.map((trend, index) => (
              <div key={`${trend.keyword}-${trend.platform}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{trend.keyword}</div>
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{trend.searchCount} searches</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant="secondary" 
                  className={`capitalize ${platformColors[trend.platform as keyof typeof platformColors]}`}
                >
                  {trend.platform}
                </Badge>
              </div>
            ))}
            
            {data.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No popular trends available yet.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
