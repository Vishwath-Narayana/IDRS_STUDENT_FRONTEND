import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { BookOpen } from 'lucide-react';

function Progress({courseProgress}) {
    const getProgressColor = (percent) => {
      if (percent >= 80) return 'bg-gray-900';
      if (percent >= 60) return 'bg-gray-700';
      if (percent >= 40) return 'bg-gray-600';
      return 'bg-gray-500';
    };

    return (
        <Card className="animate-fade-in-up hover:shadow-lg transition-all" style={{ animationDelay: '150ms' }} role="region" aria-label="Course Progress">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {courseProgress.map(({ course, percent }, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{course}</span>
                    <span className="font-semibold text-gray-900 tabular-nums">{percent}%</span>
                  </div>
                  <div
                    className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${getProgressColor(percent)}`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
    );
}

export default Progress;
