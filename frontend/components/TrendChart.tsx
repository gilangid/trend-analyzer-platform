import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, MapPin } from 'lucide-react';
import type { TrendAnalysis } from '~backend/trends/types';

interface TrendChartProps {
  analysis: TrendAnalysis;
}

export default function TrendChart({ analysis }: TrendChartProps) {
  const maxValue = Math.max(...analysis.data.map(d => d.value));
  const avgValue = Math.round(analysis.data.reduce((sum, d) => sum + d.value, 0) / analysis.data.length);
  
  const platformColors = {
    google: '#4285f4',
    tiktok: '#ff0050',
    instagram: '#e4405f',
  };

  const platformColor = platformColors[analysis.platform as keyof typeof platformColors];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Trend Analysis: {analysis.keyword}</span>
          </CardTitle>
          <Badge 
            variant="secondary" 
            className="capitalize"
            style={{ backgroundColor: `${platformColor}20`, color: platformColor }}
          >
            {analysis.platform}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{analysis.region}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{analysis.timeframe}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{maxValue}</div>
            <div className="text-sm text-gray-600">Peak Interest</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{avgValue}</div>
            <div className="text-sm text-gray-600">Average Interest</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{analysis.data.length}</div>
            <div className="text-sm text-gray-600">Data Points</div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={analysis.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="formattedDate" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={[0, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={platformColor}
                strokeWidth={3}
                dot={{ fill: platformColor, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: platformColor, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
