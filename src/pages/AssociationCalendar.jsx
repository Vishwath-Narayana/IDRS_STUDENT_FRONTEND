import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowLeft, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssociationCalendar = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Weekly Events - Mandatory for department students only
  const weeklyEvents = [
    {
      id: 1,
      title: 'Department Association Meeting',
      date: 'Jun 30, 2025',
      day: 'Monday',
      time: '11:40 AM - 12:30 PM',
      location: 'Association Hall',
      type: 'Weekly Activity',
      attendees: 50,
      status: 'Mandatory',
      description: 'Weekly mandatory department association activity for all students',
      department: 'Your Department',
      week: 28,
    },
    {
      id: 2,
      title: 'Weekly Activity Session',
      date: 'Jul 7, 2025',
      day: 'Monday',
      time: '11:40 AM - 12:30 PM',
      location: 'Association Hall',
      type: 'Weekly Activity',
      attendees: 50,
      status: 'Mandatory',
      description: 'Weekly mandatory department association activity for all students',
      department: 'Your Department',
      week: 29,
    },
    {
      id: 3,
      title: 'Department Association Meeting',
      date: 'Jul 14, 2025',
      day: 'Monday',
      time: '11:40 AM - 12:30 PM',
      location: 'Association Hall',
      type: 'Weekly Activity',
      attendees: 50,
      status: 'Mandatory',
      description: 'Weekly mandatory department association activity for all students',
      department: 'Your Department',
      week: 30,
    },
    {
      id: 4,
      title: 'Weekly Activity Session',
      date: 'Jul 21, 2025',
      day: 'Monday',
      time: '11:40 AM - 12:30 PM',
      location: 'Association Hall',
      type: 'Weekly Activity',
      attendees: 50,
      status: 'Mandatory',
      description: 'Weekly mandatory department association activity for all students',
      department: 'Your Department',
      week: 31,
    },
  ];

  // Generate calendar grid for current month
  const generateCalendar = () => {
    const daysInMonth = 31; // June has 30, July has 31
    const firstDay = 0; // 0 = Sunday, adjust based on actual month
    const weeks = [];
    let currentWeek = new Array(7).fill(null);
    let dayCounter = 1;

    // Fill first week
    for (let i = firstDay; i < 7 && dayCounter <= daysInMonth; i++) {
      currentWeek[i] = dayCounter++;
    }
    weeks.push([...currentWeek]);

    // Fill remaining weeks
    while (dayCounter <= daysInMonth) {
      currentWeek = new Array(7).fill(null);
      for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
        currentWeek[i] = dayCounter++;
      }
      weeks.push([...currentWeek]);
    }

    return weeks;
  };

  const calendarWeeks = generateCalendar();

  const hasEventOnDay = (day) => {
    return weeklyEvents.some(event => {
      const eventDay = parseInt(event.date.split(',')[0].split(' ')[1]);
      return eventDay === day;
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/association')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Weekly Event Calendar</h1>
              <p className="text-sm text-gray-500">View weekly mandatory events for your department</p>
            </div>
          </div>
        </div>

        {/* Month Selector & View Toggle */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-900">{selectedMonth}</span>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'list' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gray-900' : ''}
                >
                  List View
                </Button>
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('calendar')}
                  className={viewMode === 'calendar' ? 'bg-gray-900' : ''}
                >
                  Calendar View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Weeks</p>
              <p className="text-2xl font-bold text-gray-900">32</p>
              <p className="text-[10px] text-gray-500 mt-1">This semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Weeks Attended</p>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-[10px] text-gray-500 mt-1">87% attendance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upcoming Events</p>
              <p className="text-2xl font-bold text-gray-900">{weeklyEvents.length}</p>
              <p className="text-[10px] text-gray-500 mt-1">Mandatory attendance</p>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <Card>
            <CardContent className="p-5">
              <div className="mb-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {calendarWeeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="grid grid-cols-7 gap-2">
                      {week.map((day, dayIdx) => (
                        <div
                          key={dayIdx}
                          className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                            day
                              ? hasEventOnDay(day) && dayIdx === 1
                                ? 'bg-blue-600 text-white font-bold cursor-pointer hover:bg-blue-700'
                                : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                              : 'bg-transparent'
                          }`}
                        >
                          {day && (
                            <div className="text-center">
                              <div>{day}</div>
                              {hasEventOnDay(day) && dayIdx === 1 && (
                                <div className="text-[8px] mt-0.5">Weekly</div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-900 font-medium">📅 Blue highlighted days indicate mandatory weekly events (Every Monday)</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {weeklyEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-16 text-center">
                      <div className="bg-blue-600 text-white rounded-lg p-2.5">
                        <p className="text-[10px] font-semibold uppercase">{event.day}</p>
                        <p className="text-xl font-bold mt-0.5">{event.date.split(',')[0].split(' ')[1]}</p>
                        <p className="text-[10px] opacity-80">{event.date.split(',')[0].split(' ')[0]}</p>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-1.5">{event.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className="text-[10px] bg-blue-100 text-blue-700">
                              {event.type}
                            </Badge>
                            <Badge className="bg-blue-600 text-white text-[10px]">
                              {event.status}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              Week {event.week}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">{event.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{event.department}</span>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-900">✓ No registration required - Attendance tracked automatically</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AssociationCalendar;
