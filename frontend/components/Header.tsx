import React from 'react';
import { TrendingUp, Search, BarChart3, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 animate-fade-in">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-xl flex items-center justify-center shadow-lg hover-lift">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">TrendScope</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Trend Analysis Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 transition-all duration-200"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Button>
          </nav>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
