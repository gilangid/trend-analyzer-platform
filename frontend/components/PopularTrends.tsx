import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, TrendingUp, Crown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    google: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    tiktok: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
    instagram: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="w-4 h-4 text-yellow-500" />;
    if (index === 1) return <Crown className="w-4 h-4 text-gray-400" />;
    if (index === 2) return <Crown className="w-4 h-4 text-amber-600" />;
    return null;
  };

  const getRankColor = (index: number) => {
    if (index === 0) return 'from-yellow-400 to-orange-500';
    if (index === 1) return 'from-gray-300 to-gray-500';
    if (index === 2) return 'from-amber-400 to-orange-600';
    return 'from-gray-400 to-gray-600';
  };

  return (
    <Card className="glass-effect border-0 shadow-xl hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Popular Trends</h3>
            <p className="text-sm text-gray-500 font-normal">What's trending now</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <Flame className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load</h3>
            <p className="text-gray-500">Unable to load popular trends</p>
          </div>
        )}
        
        {data && (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {data.map((trend, index) => {
              const platformConfig = platformColors[trend.platform as keyof typeof platformColors];
              const rankIcon = getRankIcon(index);
              const rankColor = getRankColor(index);
              
              return (
                <div 
                  key={`${trend.keyword}-${trend.platform}`} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-gray-100 hover:to-gray-200/50 transition-all duration-200 hover-lift group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br transition-all duration-200",
                      rankColor
                    )}>
                      {rankIcon || (index + 1)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {trend.keyword}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Activity className="w-3 h-3" />
                        <span className="font-medium">{trend.searchCount} searches</span>
                        {index < 3 && (
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5">
                            Hot
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "capitalize font-medium transition-all duration-200",
                      platformConfig.bg,
                      platformConfig.text,
                      platformConfig.border,
                      "border"
                    )}
                  >
                    {trend.platform}
                  </Badge>
                </div>
              );
            })}
            
            {data.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No trends available</h3>
                <p className="text-gray-500">
                  Popular trends will appear here once users start searching.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
