import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import backend from '~backend/client';
import type { TrendAnalysis } from '~backend/trends/types';

interface SearchFormProps {
  onSearchStart: () => void;
  onAnalysisComplete: (analysis: TrendAnalysis) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearchStart, onAnalysisComplete, isLoading }: SearchFormProps) {
  const [keyword, setKeyword] = useState('');
  const [platform, setPlatform] = useState<'google' | 'tiktok' | 'instagram'>('google');
  const [region, setRegion] = useState('US');
  const [timeframe, setTimeframe] = useState('12-m');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keyword.trim()) {
      toast({
        title: "Error",
        description: "Please enter a keyword to search",
        variant: "destructive",
      });
      return;
    }

    onSearchStart();

    try {
      const response = await backend.trends.search({
        keyword: keyword.trim(),
        platform,
        region,
        timeframe,
      });

      if (response.success) {
        onAnalysisComplete(response.analysis);
        toast({
          title: "Success",
          description: `Trend analysis completed for "${keyword}"`,
        });
      } else {
        throw new Error('Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Error",
        description: "Failed to analyze trends. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <span>Search Trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter keyword to analyze..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="text-lg h-12"
              disabled={isLoading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Select value={platform} onValueChange={(value: 'google' | 'tiktok' | 'instagram') => setPlatform(value)}>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="JP">Japan</SelectItem>
                  <SelectItem value="KR">South Korea</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="BR">Brazil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger disabled={isLoading}>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-m">Past month</SelectItem>
                  <SelectItem value="3-m">Past 3 months</SelectItem>
                  <SelectItem value="12-m">Past year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Analyze Trends
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
