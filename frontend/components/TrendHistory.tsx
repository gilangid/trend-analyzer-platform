import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Clock, Search, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import backend from '~backend/client';
import type { TrendAnalysis } from '~backend/trends/types';

interface TrendHistoryProps {
  onSelectAnalysis: (analysis: TrendAnalysis) => void;
}

export default function TrendHistory({ onSelectAnalysis }: TrendHistoryProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['trend-history'],
    queryFn: async () => {
      const response = await backend.trends.history();
      return response.searches;
    },
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const platformColors = {
    google: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    tiktok: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-200' },
    instagram: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
  };

  return (
    <Card className="glass-effect border-0 shadow-xl hover-lift">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
            <History className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Searches</h3>
            <p className="text-sm text-gray-500 font-normal">Your search history</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load</h3>
            <p className="text-gray-500">Unable to load search history</p>
          </div>
        )}
        
        {data && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.map((analysis) => {
              const platformConfig = platformColors[analysis.platform as keyof typeof platformColors];
              return (
                <Button
                  key={analysis.id}
                  variant="ghost"
                  className="w-full p-4 h-auto justify-start hover:bg-gray-100/50 rounded-xl transition-all duration-200 hover-lift group"
                  onClick={() => onSelectAnalysis(analysis)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-200">
                        <Search className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                          {analysis.keyword}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(analysis.searchDate)}</span>
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
                      {analysis.platform}
                    </Badge>
                  </div>
                </Button>
              );
            })}
            
            {data.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <History className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No search history</h3>
                <p className="text-gray-500">
                  Start by searching for a trend to see your history here!
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
