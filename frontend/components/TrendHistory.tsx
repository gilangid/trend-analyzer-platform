import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Clock } from 'lucide-react';
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
    google: 'bg-blue-100 text-blue-700',
    tiktok: 'bg-pink-100 text-pink-700',
    instagram: 'bg-purple-100 text-purple-700',
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <History className="w-5 h-5" />
          <span>Recent Searches</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-16 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-gray-500">
            Failed to load search history
          </div>
        )}
        
        {data && (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {data.map((analysis) => (
              <Button
                key={analysis.id}
                variant="ghost"
                className="w-full p-3 h-auto justify-start hover:bg-gray-100"
                onClick={() => onSelectAnalysis(analysis)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="text-left">
                    <div className="font-medium text-gray-900 truncate">
                      {analysis.keyword}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(analysis.searchDate)}</span>
                    </div>
                  </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={`capitalize ${platformColors[analysis.platform as keyof typeof platformColors]}`}
                  >
                    {analysis.platform}
                  </Badge>
                </div>
              </Button>
            ))}
            
            {data.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No search history yet. Start by searching for a trend!
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
