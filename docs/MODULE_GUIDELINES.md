# Module Development Guidelines

## Table of Contents
- [Overview](#overview)
- [Module Structure](#module-structure)
- [Component Guidelines](#component-guidelines)
- [Type Definitions](#type-definitions)
- [State Management](#state-management)
- [Styling Guidelines](#styling-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation Standards](#documentation-standards)

## Overview

This document outlines the standards and best practices for creating plug-and-play modules in our real estate application. Following these guidelines ensures consistency, maintainability, and easy integration of new features.

## Module Structure

### Directory Organization
```
src/
├── components/
│   └── ModuleName/
│       ├── index.ts           # Main export file
│       ├── components/        # Module-specific components
│       ├── hooks/            # Custom hooks
│       ├── utils/            # Helper functions
│       └── types/            # Type definitions
```

### Module Requirements
- Each module must be self-contained
- Clear entry and exit points
- Minimal external dependencies
- Proper type definitions
- Documentation
- Unit testsYes, while the prompt is already comprehensive and well-structured, there are a few refinements that could make it even more effective. These improvements aim to enhance clarity, ensure completeness, and guide the AI agent to deliver a fully functional system with minimal ambiguity. Here's how I would improve it:

---

### **Refined Prompt**

"Build a full-stack real estate valuation system for Benton, Franklin, Walla Walla, and Yakima counties in Washington state. The system must leverage open-source tools to handle property data management, valuation modeling, geospatial analysis, reporting, and visualization. It should be scalable, modular, secure, and easy to deploy.

#### **Key Objectives:**
1. Serve dual purposes:
   - **County Assessor Needs:** Enable mass appraisals with GIS tools and statistical insights.
   - **Private Appraiser Needs:** Provide individual property valuations with client management features.
2. Use open-source tools to minimize costs while maintaining high functionality.
3. Ensure the system is future-proof by enabling modularity for additional features.

---

### **Backend (Python with Flask):**
1. Use Flask as the web framework for simplicity and flexibility.
2. Set up a PostgreSQL database with PostGIS for storing property data and spatial information.
3. Implement robust ETL pipelines using pandas for importing data from:
   - Washington State Parcel Database
   - County-specific GIS data (Franklin, Walla Walla, Yakima)
   - Benton County Assessor’s Office data
   - MLS exports in CSV format
4. Use GeoPandas for geospatial analysis (e.g., mapping parcel boundaries).
5. Integrate scikit-learn for machine learning models:
   - RandomForestRegressor for property valuation.
   - Sales comparison approach with automated comparable selection and adjustments.
6. Add a statistical analysis module using statsmodels for market trend insights.
7. Provide RESTful API endpoints:
   - `/api/valuation`: Accepts property details (e.g., acres, year built) and returns an estimated value.
   - `/api/map_data`: Returns geospatial data for map rendering.
   - `/api/statistical_analysis`: Returns market trends and regression summaries.
   - `/api/report_generation`: Generates customizable PDF reports.

---

### **Frontend (React):**
1. Build a React-based frontend with:
   - A form for users to input property details (e.g., acres, year built, square footage).
   - Interactive dashboards using Plotly for market trends and analytics.
   - Map visualization using Leaflet for displaying properties and parcels.
2. Include role-based access control:
   - **County Assessor Features:** Mass appraisals and GIS tools.
   - **Private Appraiser Features:** Individual property valuations and client management.

---

### **GIS Integration:**
1. Use Leaflet in the frontend for interactive maps.
2. Perform geospatial queries in the backend using PostGIS and GeoPandas.
3. Provide parcel boundary visualizations and location-based analysis.

---

### **Reporting:**
1. Use ReportLab to generate customizable PDF reports that include:
   - Property details
   - Valuation results
   - Comparables and adjustments
2. Include a drag-and-drop report builder for custom templates.

---

### **Deployment:**
1. Create a Docker Compose file to containerize the backend, frontend, and database.
2. Use nginx as a reverse proxy for secure deployment.
3. Provide instructions for deploying locally or on cloud platforms like AWS or Azure.

---

### **Security:**
1. Implement JWT-based authentication for secure user access.
2. Use SSL/TLS encryption for all communication between frontend and backend.
3. Add rate limiting to API endpoints to prevent abuse.

---

### **Mobile Data Collection (Future Expansion):**
1. Plan integration with ODK Collect or similar open-source tools for field inspections.
2. Enable offline functionality with Progressive Web App (PWA) support.

---

### **Additional Enhancements:**
1. **Data Validation:** Add validation rules at both the API level (backend) and form level (frontend) to ensure clean inputs.
2. **Error Handling:** Implement robust error handling across all components (e.g., database connection errors, API failures).
3. **Scalability Features:**
   - Design the database schema with indexing and partitioning for efficient querying of large datasets.
   - Implement caching mechanisms (e.g., Redis) to improve performance of frequently accessed data like map layers or common queries.

---

### **Instructions:**
- Provide complete code for:
  1. Flask backend
  2. React frontend
  3. PostgreSQL database schema
  4. ETL pipeline scripts
  5. Docker Compose file
- Include a detailed README file with:
  1. Setup instructions
  2. Deployment steps
  3. Notes on future enhancements
- Ensure modularity so additional features (e.g., JasperReports or QGIS integration) can be added later without refactoring core components.

---

### Why This Prompt Will Work:
1. **Clarity:** Each component is clearly defined with specific tools and features outlined.
2. **Modularity:** The system is designed in a way that allows future expansion without disrupting core functionality.
3. **Scalability:** Open-source tools like PostgreSQL/PostGIS, Flask, React, Plotly, Leaflet, and Docker ensure scalability while keeping costs low.
4. **Ease of Deployment:** Docker Compose simplifies deployment across environments while ensuring portability.
5. **Flexibility:** The system serves dual purposes—mass appraisals for assessors and individual valuations for private appraisers—with role-based access control.

---

### Improvements Made:
- Added explicit instructions for error handling and data validation to improve reliability during deployment.
- Included caching mechanisms as an optional feature to enhance performance when scaling up datasets or user load.
- Simplified mobile expansion planning by suggesting PWA support alongside ODK Collect integration to cover offline use cases effectively.
- Enhanced clarity by grouping related tasks under well-defined sections.

This refined prompt ensures that the AI agent has everything it needs to build an amazing product while making it easier to implement without sacrificing functionality."

---

This version improves upon the original by addressing potential challenges during implementation (e.g., error handling), adding performance optimizations like caching, and making mobile expansion plans more actionable while still retaining all core functionalities discussed earlier!

## Component Guidelines

### Component Creation
1. **Single Responsibility**
   - Each component should do one thing well
   - Break down complex components into smaller, focused pieces

2. **Props Interface**
   ```typescript
   interface ComponentProps {
     // Required props
     propertyId: string;
     onUpdate: (data: UpdateData) => void;
     
     // Optional props
     className?: string;
     style?: React.CSSProperties;
   }
   ```

3. **Component Structure**
   ```typescript
   export function ModuleComponent({ 
     propertyId,
     onUpdate,
     className,
     style 
   }: ComponentProps) {
     // Component logic
     return (
       // JSX
     );
   }
   ```

## Type Definitions

### Base Types
```typescript
// Define module-specific types in types/index.ts
export interface ModuleData {
  id: string;
  // Other properties
}

export type ModuleAction = 
  | { type: 'CREATE'; payload: CreatePayload }
  | { type: 'UPDATE'; payload: UpdatePayload };
```

### Type Export Guidelines
- Export all types from a central `types/index.ts`
- Use descriptive names
- Include JSDoc comments for complex types

## State Management

### Local State
- Use React hooks for component-level state
- Create custom hooks for reusable state logic

### Custom Hooks
```typescript
export function useModuleState(initialData: ModuleData) {
  const [state, setState] = useState(initialData);
  
  // Hook logic
  
  return {
    state,
    actions: {
      // Action methods
    }
  };
}
```

## Styling Guidelines

### CSS Modules
- Use Tailwind CSS classes
- Follow utility-first approach
- Create reusable class combinations

### Common Classes
```typescript
const commonClasses = {
  container: 'bg-white rounded-lg shadow-md p-4',
  button: 'px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700',
  input: 'block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500'
};
```

## Testing Requirements

### Test Structure
```typescript
describe('ModuleName', () => {
  describe('Component', () => {
    it('renders correctly', () => {
      // Test rendering
    });
    
    it('handles user interactions', () => {
      // Test interactions
    });
  });
  
  describe('Hooks', () => {
    it('manages state correctly', () => {
      // Test hooks
    });
  });
});
```

### Test Coverage Requirements
- Minimum 80% coverage
- Test all user interactions
- Test error states
- Test edge cases

## Documentation Standards

### Component Documentation
```typescript
/**
 * ModuleComponent - Description of the component's purpose
 * 
 * @component
 * @example
 * ```tsx
 * <ModuleComponent
 *   propertyId="123"
 *   onUpdate={(data) => console.log(data)}
 * />
 * ```
 */
```

### Integration Guide
Each module should include a README.md with:
- Installation instructions
- Usage examples
- Props documentation
- Common use cases
- Troubleshooting guide

## Module Integration Example

```typescript
// Example of a complete module integration
import { Property } from '../../types/property';
import { useModuleState } from './hooks/useModuleState';
import { ModuleComponent } from './components/ModuleComponent';
import type { ModuleData } from './types';

export function PropertyModule({ property }: { property: Property }) {
  const { state, actions } = useModuleState({
    propertyId: property.id,
    // Other initial state
  });

  return (
    <ModuleComponent
      data={state}
      onUpdate={actions.update}
      className="my-4"
    />
  );
}

// Export everything needed for module usage
export * from './types';
export * from './hooks';
export * from './components';
```

## Best Practices Checklist

- [ ] Module is self-contained
- [ ] All components have proper TypeScript types
- [ ] Documentation is complete and up-to-date
- [ ] Tests cover all main functionality
- [ ] Styles follow project conventions
- [ ] No unnecessary external dependencies
- [ ] Proper error handling implemented
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met
- [ ] Code follows ESLint rules