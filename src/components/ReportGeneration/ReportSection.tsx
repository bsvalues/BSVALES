import React from 'react';
import { Property } from '../../types/property';
import { PropertyDetails } from '../PropertyDetails/PropertyDetails';
import { ValuationSummary } from '../Valuation/ValuationSummary';
import { ComparableAnalysis } from '../Valuation/ComparableAnalysis';
import { MarketAnalysis } from '../MarketAnalysis/MarketAnalysis';
import { PropertyGallery } from '../PropertyDetails/PropertyGallery';

interface ReportSectionProps {
  sectionId: string;
  property: Property;
  comparables: Property[];
  marketMetrics: any;
}

export function ReportSection({
  sectionId,
  property,
  comparables,
  marketMetrics
}: ReportSectionProps) {
  const renderSection = () => {
    switch (sectionId) {
      case 'property_details':
        return <PropertyDetails property={property} />;
      case 'valuation_summary':
        return <ValuationSummary property={property} />;
      case 'comparables':
        return <ComparableAnalysis subject={property} comparables={comparables} />;
      case 'market_analysis':
        return <MarketAnalysis metrics={marketMetrics} />;
      case 'photos':
        return <PropertyGallery property={property} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {renderSection()}
    </div>
  );
}