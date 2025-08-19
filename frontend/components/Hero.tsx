import React from 'react';
import { ChartBarIcon, GlobeAltIcon, CameraIcon, MusicalNoteIcon, SparklesIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0 animate-bounce-in">
            <SparklesIcon className="w-3 h-3 mr-1" />
            Powered by Real-Time Data
          </Badge>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Analyze every{' '}
            <span className="gradient-text">trend</span>
            <span className="text-5xl md:text-6xl">.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            TrendScope helps you discover trending topics across Google, TikTok, and Instagram. 
            Get insights into what's popular and make data-driven decisions with comprehensive analytics.
          </p>
          
          <div className="flex justify-center items-center space-x-12 mb-16">
            <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors duration-200 hover-lift">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <GlobeAltIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Google</div>
                <div className="text-sm text-gray-500">Search Trends</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-600 hover:text-pink-600 transition-colors duration-200 hover-lift">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <MusicalNoteIcon className="w-6 h-6 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">TikTok</div>
                <div className="text-sm text-gray-500">Viral Content</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-gray-600 hover:text-purple-600 transition-colors duration-200 hover-lift">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CameraIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Instagram</div>
                <div className="text-sm text-gray-500">Visual Trends</div>
              </div>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover-lift animate-bounce-in"
            onClick={() => document.getElementById('search-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Analyzing
            <ArrowDownIcon className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
}
