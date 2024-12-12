import React, { useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { SearchForm } from './components/PropertySearch/SearchForm';
import { PropertyGrid } from './components/PropertyList/PropertyGrid';
import { MarketDashboard } from './components/MarketAnalysis/MarketDashboard';
import { ComparisonDashboard } from './components/PropertyComparison/ComparisonDashboard';
import { PropertySearchCriteria } from './types/property';
import { mockProperties } from './utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';

function App() {
  const [searchResults, setSearchResults] = useState(mockProperties);

  const handleSearch = (criteria: PropertySearchCriteria) => {
    const filtered = mockProperties.filter(property => {
      if (criteria.county && property.county.toLowerCase() !== criteria.county) return false;
      if (criteria.propertyType && property.type.toLowerCase() !== criteria.propertyType) return false;
      if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) return false;
      if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) return false;
      return true;
    });
    setSearchResults(filtered);
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Real Estate Market Analysis
        </h1>
        
        <Tabs defaultValue="search" className="space-y-8">
          <TabsList>
            <TabsTrigger value="search">Property Search</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="compare">Compare Properties</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <div className="space-y-8">
              <SearchForm onSearch={handleSearch} />
              <PropertyGrid properties={searchResults} />
            </div>
          </TabsContent>

          <TabsContent value="market">
            <MarketDashboard />
          </TabsContent>

          <TabsContent value="compare">
            <ComparisonDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default App;