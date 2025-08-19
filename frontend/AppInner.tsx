import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchForm from './components/SearchForm';
import TrendChart from './components/TrendChart';
import RelatedQueries from './components/RelatedQueries';
import TrendHistory from './components/TrendHistory';
import PopularTrends from './components/PopularTrends';
import Footer from './components/Footer';
import type { TrendAnalysis } from '~backend/trends/types';

export default function AppInner() {
  const [currentAnalysis, setCurrentAnalysis] = useState<TrendAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (analysis: TrendAnalysis) => {
    setCurrentAnalysis(analysis);
    setIsLoading(false);
  };

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />
      
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <SearchForm 
                onSearchStart={handleSearchStart}
                onAnalysisComplete={handleAnalysisComplete}
                isLoading={isLoading}
              />
              
              {currentAnalysis && (
                <>
                  <TrendChart analysis={currentAnalysis} />
                  <RelatedQueries analysis={currentAnalysis} />
                </>
              )}
            </div>
            
            <div className="space-y-8">
              <PopularTrends />
              <TrendHistory onSelectAnalysis={setCurrentAnalysis} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
