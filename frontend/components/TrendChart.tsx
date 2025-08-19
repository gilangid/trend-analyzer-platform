import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowTrendingUpIcon, CalendarIcon, MapPinIcon, ChartBarIcon, PresentationChartLineIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { TrendAnalysis } from '~backend/trends/types';

interface TrendChartProps {
  analysis: TrendAnalysis;
}

export default function TrendChart({ analysis }: TrendChartProps) {
  const maxValue = Math.max(...analysis.data.map(d => d.value));
  const avgValue = Math.round(analysis.data.reduce((sum, d) => sum + d.value, 0) / analysis.data.length);
  const minValue = Math.min(...analysis.data.map(d => d.value));
  
  const platformColors = {
    google: { primary: '#4285f4', secondary: '#e8f0fe', gradient: 'from-blue-500 to-blue-600' },
    tiktok: { primary: '#ff0050', secondary: '#ffe8f0', gradient: 'from-pink-500 to-red-500' },
    instagram: { primary: '#e4405f', secondary: '#fce8ec', gradient: 'from-purple-500 to-pink-500' },
  };

  const platformConfig = platformColors[analysis.platform as keyof typeof platformColors];

  const stats = [
    {
      label: 'Peak Interest',
      value: maxValue,
      icon: ArrowTrendingUpIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Average Interest',
      value: avgValue,
      icon: PresentationChartLineIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Lowest Point',
      value: minValue,
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  return (
    <Card className="glass-effect border-0 shadow-2xl hover-lift animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-3">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br", platformConfig.gradient)}>
              <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Trend Analysis</h3>
              <p className="text-sm text-gray-500 font-normal">"{analysis.keyword}"</p>
            </div>
          </CardTitle>
          <Badge 
            variant="secondary" 
            className="capitalize px-3 py-1 font-medium"
            style={{ backgroundColor: platformConfig.secondary, color: platformConfig.primary }}
          >
            {analysis.platform}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <MapPinIcon className="w-4 h-4" />
            <span className="font-medium">{analysis.region}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-4 h-4" />
            <span className="font-medium">{analysis.timeframe}</span>
          </div>
          <div className="flex items-center space-x-2">
            <PresentationChartLineIcon className="w-4 h-4" />
            <span className="font-medium">{analysis.data.length} data points</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-4 bg-gray-50/50 rounded-xl hover-lift">
                <div className={cn("w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center", stat.bgColor)}>
                  <Icon className={cn("w-6 h-6", stat.color)} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analysis.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={platformConfig.primary} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={platformConfig.primary} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="formattedDate" 
                stroke="#666"
                fontSize={12}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={[0, 100]}
                tick={{ fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '12px',
                }}
                labelStyle={{ color: '#374151', fontWeight: '600' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={platformConfig.primary}
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{ fill: platformConfig.primary, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: platformConfig.primary, strokeWidth: 2, fill: 'white' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
