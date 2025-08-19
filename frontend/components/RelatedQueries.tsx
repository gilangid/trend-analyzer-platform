import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowUp } from 'lucide-react';
import type { TrendAnalysis } from '~backend/trends/types';

interface RelatedQueriesProps {
  analysis: TrendAnalysis;
}

export default function RelatedQueries({ analysis }: RelatedQueriesProps) {
  const [activeTab, setActiveTab] = useState<'top' | 'rising'>('top');
  
  const topQueries = analysis.relatedQueries.filter(q => q.type === 'top');
  const risingQueries = analysis.relatedQueries.filter(q => q.type === 'rising');
  
  const currentQueries = activeTab === 'top' ? topQueries : risingQueries;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>Related Queries</span>
        </CardTitle>
        
        <div className="flex space-x-2">
          <Button
            variant={activeTab === 'top' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('top')}
            className={activeTab === 'top' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            Top Queries
          </Button>
          <Button
            variant={activeTab === 'rising' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('rising')}
            className={activeTab === 'rising' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            <ArrowUp className="w-4 h-4 mr-1" />
            Rising Queries
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {currentQueries.map((query, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-900">{query.query}</span>
              </div>
              
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {query.value}
              </Badge>
            </div>
          ))}
          
          {currentQueries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} queries found for this search.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
