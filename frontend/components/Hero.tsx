import React from 'react';
import { TrendingUp, Globe, Instagram, Music } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Analyze every trend.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            TrendScope helps you discover trending topics across Google, TikTok, and Instagram. 
            Get insights into what's popular and make data-driven decisions.
          </p>
          
          <div className="flex justify-center items-center space-x-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-500">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Music className="w-5 h-5" />
              <span className="text-sm">TikTok</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Instagram className="w-5 h-5" />
              <span className="text-sm">Instagram</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
    </section>
  );
}
