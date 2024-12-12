import React from 'react';
import { Calendar, DollarSign, FileText, Home, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PropertyEvent } from '../../types/property';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface PropertyHistoryTimelineProps {
  events: PropertyEvent[];
}

export function PropertyHistoryTimeline({ events }: PropertyHistoryTimelineProps) {
  const getEventIcon = (type: PropertyEvent['type']) => {
    switch (type) {
      case 'sale': return DollarSign;
      case 'listing': return Home;
      case 'assessment': return FileText;
      default: return Calendar;
    }
  };

  const getEventColor = (type: PropertyEvent['type']) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-700';
      case 'listing': return 'bg-blue-100 text-blue-700';
      case 'assessment': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-medium mb-6">Property History</h3>
      <div className="flow-root">
        <ul role="list" className="-mb-8">
          {events.map((event, eventIdx) => {
            const Icon = getEventIcon(event.type);
            const colorClass = getEventColor(event.type);
            const isLastEvent = eventIdx === events.length - 1;
            const hasValueChange = event.type === 'sale' || event.type === 'assessment';

            return (
              <li key={event.id}>
                <div className="relative pb-8">
                  {!isLastEvent && (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative flex items-start space-x-3">
                    <div className={`relative px-1.5 py-1.5 rounded-full ${colorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {event.description}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{formatDate(event.date)}</span>
                        {hasValueChange && event.value && (
                          <div className="ml-4 flex items-center">
                            <span className="font-medium text-gray-900">
                              {formatCurrency(event.value)}
                            </span>
                            {event.change && (
                              <span className={`ml-2 flex items-center ${
                                event.change > 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {event.change > 0 ? (
                                  <ArrowUpRight className="h-4 w-4 mr-0.5" />
                                ) : (
                                  <ArrowDownRight className="h-4 w-4 mr-0.5" />
                                )}
                                {Math.abs(event.change)}%
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}