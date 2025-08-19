import React from 'react';
import { TrendingUp, Search, BarChart3 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">TrendScope</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#search" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </a>
            <a href="#analytics" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
