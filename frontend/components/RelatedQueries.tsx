import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowUp, Search, Crown, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
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
    <Card className="glass-effect border-0 shadow-2xl hover-lift animate-slide-up">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Related Queries</h3>
            <p className="text-sm text-gray-500 font-normal">Discover related search terms</p>
          </div>
        </CardTitle>
        
        <div className="flex space-x-2 mt-4">
          <Button
            variant={activeTab === 'top' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('top')}
            className={cn(
              "flex items-center space-x-2 transition-all duration-200",
              activeTab === 'top' 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700' 
                : 'hover:bg-gray-100'
            )}
          >
            <Crown className="w-4 h-4" />
            <span>Top Queries</span>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {topQueries.length}
            </Badge>
          </Button>
          <Button
            variant={activeTab === 'rising' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('rising')}
            className={cn(
              "flex items-center space-x-2 transition-all duration-200",
              activeTab === 'rising' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600' 
                : 'hover:bg-gray-100'
            )}
          >
            <Flame className="w-4 h-4" />
            <span>Rising Queries</span>
            <Badge variant="secondary" className="bg-white/20 text-white text-xs">
              {risingQueries.length}
            </Badge>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {currentQueries.map((query, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl hover:from-gray-100 hover:to-gray-200/50 transition-all duration-200 hover-lift group"
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-200",
                  activeTab === 'top' 
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:from-purple-600 group-hover:to-indigo-700' 
                    : 'bg-gradient-to-br from-orange-500 to-red-500 group-hover:from-orange-600 group-hover:to-red-600'
                )}>
                  {index + 1}
                </div>
                <div>
                  <span className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {query.query}
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    {activeTab === 'top' ? (
                      <Crown className="w-3 h-3 text-purple-500" />
                    ) : (
                      <ArrowUp className="w-3 h-3 text-orange-500" />
                    )}
                    <span className="text-xs text-gray-500 font-medium">
                      {activeTab === 'top' ? 'Popular' : 'Trending'}
                    </span>
                  </div>
                </div>
              </div>
              
              <Badge 
                variant="secondary" 
                className={cn(
                  "font-bold px-3 py-1 transition-all duration-200",
                  activeTab === 'top' 
                    ? 'bg-purple-100 text-purple-700 group-hover:bg-purple-200' 
                    : 'bg-orange-100 text-orange-700 group-hover:bg-orange-200'
                )}
              >
                {query.value}
              </Badge>
            </div>
          ))}
          
          {currentQueries.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No queries found</h3>
              <p className="text-gray-500">
                No {activeTab} queries found for this search. Try a different keyword or platform.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
