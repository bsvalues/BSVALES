import React from 'react';
import { Calendar, DollarSign, Home, FileText } from 'lucide-react';
import { PropertyEvent } from '../../types/property';

interface HistoryTimelineProps {
  events: PropertyEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'sale': return DollarSign;
      case 'listing': return Home;
      case 'assessment': return FileText;
      default: return Calendar;
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, eventIdx) => {
          const Icon = getEventIcon(event.type);
          return (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 && (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">{event.description}</p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {event.date}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}