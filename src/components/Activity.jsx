import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Bell, Activity as ActivityIcon, Clock } from 'lucide-react';

function Activity({announcements, recentActivities}) {
    return (
        <section className='grid gap-6 grid-cols-1 lg:grid-cols-2 animate-fade-in-up' style={{ animationDelay: '200ms' }} role="region" aria-label="Announcements and Recent Activity">
          {/* Announcements */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">Announcements</CardTitle>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  {announcements.length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {announcements.map((note, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="hover:shadow-lg transition-all">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <ActivityIcon className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recentActivities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                      <Clock className="w-4 h-4 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors leading-relaxed flex-1">{activity.text}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
    )
}

export default Activity;