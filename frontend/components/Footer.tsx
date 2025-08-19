import React from 'react';
import { TrendingUp, Github, Twitter, Mail, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">TrendScope</h3>
                <p className="text-gray-400 text-sm">Trend Analysis Platform</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
              Discover trending topics across Google, TikTok, and Instagram. 
              Make data-driven decisions with comprehensive trend analysis and real-time insights.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Features</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Google Trends</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>TikTok Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Instagram Insights</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200 flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trend History</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-white">Support</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2024 TrendScope. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for trend enthusiasts</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
