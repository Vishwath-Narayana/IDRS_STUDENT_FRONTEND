import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

function Overview({kpis}) {
  
  return (
    <section 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-fade-in-up" 
      role="region" 
      aria-label="Key Performance Indicators"
    >
      {kpis.map((kpi, idx) => (
        <Card
          key={idx}
          className="group cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
          aria-label={kpi.label}
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="p-5">
            <div className="flex items-start justify-between mb-3">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{kpi.label}</p>
              {kpi.trend === 'up' && (
                <Badge variant="success" className="gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-[10px]">+5%</span>
                </Badge>
              )}
              {kpi.trend === 'down' && (
                <Badge variant="warning" className="gap-1">
                  <TrendingDown className="w-3 h-3" />
                  <span className="text-[10px]">-3%</span>
                </Badge>
              )}
              {kpi.trend === 'neutral' && (
                <Badge variant="secondary" className="gap-1">
                  <Minus className="w-3 h-3" />
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <p className={`text-3xl font-bold ${kpi.textColor || 'text-gray-900'} group-hover:scale-105 transition-transform duration-300`}>
                {kpi.value}
              </p>
              {kpi.subtitle && (
                <p className="text-xs text-gray-500 font-medium">{kpi.subtitle}</p>
              )}
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Card>
      ))}
    </section>
  );
}
export default Overview;
