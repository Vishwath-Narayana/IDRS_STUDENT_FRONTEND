import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Calendar, 
  Users, 
  Image, 
  FileText, 
  Bell, 
  ArrowRight,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Association = () => {
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, title: 'Tech Talk scheduled for next Monday', time: '2 hours ago', unread: true },
    { id: 2, title: 'New event: Hackathon 2024 registration open', time: '5 hours ago', unread: true },
    { id: 3, title: 'Workshop materials uploaded', time: '1 day ago', unread: false },
  ]);

  // Weekly Events - Mandatory for department students
  const weeklyEvents = [
    {
      id: 'w1',
      title: 'Department Association Meeting',
      date: 'Jun 30, 2025',
      time: '11:40 AM - 12:30 PM',
      type: 'Weekly',
      category: 'weekly',
      status: 'Mandatory',
      registrationRequired: false,
      department: 'Your Department',
    },
    {
      id: 'w2',
      title: 'Weekly Activity Session',
      date: 'Jul 7, 2025',
      time: '11:40 AM - 12:30 PM',
      type: 'Weekly',
      category: 'weekly',
      status: 'Mandatory',
      registrationRequired: false,
      department: 'Your Department',
    },
  ];

  // Club Events - Optional, registration required (free or paid)
  const clubEvents = [
    {
      id: 1,
      title: 'Tech Talk: AI & Machine Learning',
      date: 'Jun 28, 2025',
      time: '2:00 PM - 4:00 PM',
      type: 'Workshop',
      category: 'club',
      status: 'Registration Open',
      registrationRequired: true,
      seats: 120,
      registered: 87,
      fee: 'Free',
      department: 'All Departments',
    },
    {
      id: 2,
      title: 'Annual Hackathon 2024',
      date: 'Jul 15-16, 2025',
      time: '9:00 AM - 6:00 PM',
      type: 'Competition',
      category: 'club',
      status: 'Registration Open',
      registrationRequired: true,
      seats: 200,
      registered: 145,
      fee: '₹500',
      department: 'All Departments',
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      date: 'Jul 5, 2025',
      time: '10:00 AM - 5:00 PM',
      type: 'Workshop',
      category: 'club',
      status: 'Registration Open',
      registrationRequired: true,
      seats: 60,
      registered: 45,
      fee: 'Free',
      department: 'All Departments',
    },
    {
      id: 4,
      title: 'Cloud Computing Seminar',
      date: 'Jul 20, 2025',
      time: '3:00 PM - 5:00 PM',
      type: 'Seminar',
      category: 'club',
      status: 'Registration Open',
      registrationRequired: true,
      seats: 150,
      registered: 98,
      fee: '₹200',
      department: 'All Departments',
    },
  ];

  // Combine weekly and club events for upcoming events display
  const upcomingEvents = [...weeklyEvents, ...clubEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const quickActions = [
    {
      title: 'Weekly Event Calendar',
      description: 'View weekly mandatory events',
      icon: Calendar,
      path: '/association/calendar',
      color: 'bg-gray-900',
    },
    {
      title: 'Club Events',
      description: 'Register for club events',
      icon: FileText,
      path: '/association/register',
      color: 'bg-gray-900',
    },
    {
      title: 'Join Association',
      description: 'Submit your resume',
      icon: Send,
      path: '/association/join',
      color: 'bg-gray-900',
    },
    {
      title: 'Event Reports',
      description: 'View past events & photos',
      icon: Image,
      path: '/association/reports',
      color: 'bg-gray-900',
    },
  ];

  const stats = [
    { label: 'Active Members', value: '50', icon: Users, trend: 'Department' },
    { label: 'Weekly Events', value: '32', icon: Calendar, trend: 'This semester' },
    { label: 'Club Events', value: '12', icon: TrendingUp, trend: 'Conducted' },
    { label: 'Attendance Rate', value: '87%', icon: Award, trend: 'Weekly avg' },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Association Activities</h1>
            <p className="text-sm text-gray-500">Department Association Club - Events, Activities & Community</p>
          </div>
          <Badge className="bg-gray-900 text-white gap-2">
            <Bell className="w-3 h-3" />
            {notifications.filter(n => n.unread).length} New
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-[10px]">{stat.trend}</Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <Card 
                key={idx} 
                className="group hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
                onClick={() => navigate(action.path)}
              >
                <CardContent className="p-5">
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{action.title}</h3>
                  <p className="text-xs text-gray-500 leading-snug">{action.description}</p>
                  <ArrowRight className="w-4 h-4 text-gray-400 mt-2 group-hover:translate-x-1 transition-transform" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Events */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate('/association/calendar')}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2.5">
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id} 
                      className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer"
                      onClick={() => event.category === 'club' ? navigate('/association/register') : null}
                    >
                      <div className={`w-1 h-16 rounded-full ${event.category === 'weekly' ? 'bg-blue-600' : 'bg-gray-900'}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{event.title}</h4>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Badge 
                                variant="secondary" 
                                className={`text-[10px] ${event.category === 'weekly' ? 'bg-blue-100 text-blue-700' : ''}`}
                              >
                                {event.type}
                              </Badge>
                              {event.category === 'weekly' ? (
                                <Badge className="bg-blue-600 text-white text-[10px]">Mandatory</Badge>
                              ) : event.registrationRequired && (
                                <Badge className="bg-orange-100 text-orange-700 text-[10px]">Reg Required</Badge>
                              )}
                              {event.category === 'club' && event.fee && (
                                <Badge className={`text-[10px] ${event.fee === 'Free' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                  {event.fee}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Badge className={`text-[10px] ml-2 ${event.category === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-white'}`}>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="truncate">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">{event.time}</span>
                          </div>
                        </div>
                        {event.category === 'club' && event.seats && (
                          <div className="mt-1.5">
                            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-0.5">
                              <span>Seats: {event.registered}/{event.seats}</span>
                              <span>{Math.round((event.registered / event.seats) * 100)}% filled</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-gray-900 h-1 rounded-full transition-all"
                                style={{ width: `${(event.registered / event.seats) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {event.category === 'weekly' && (
                          <div className="mt-1.5">
                            <p className="text-[10px] text-gray-600">Department: {event.department}</p>
                          </div>
                        )}
                      </div>
                      {event.category === 'club' && (
                        <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                        notification.unread ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {notification.unread && (
                          <div className="w-2 h-2 rounded-full bg-gray-900 mt-1 flex-shrink-0"></div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 leading-snug">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full mt-4 text-xs">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Weekly Schedule */}
            <Card className="hover:shadow-lg transition-all mt-6">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">Weekly Activity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-gray-900 text-white text-[10px]">Every Monday</Badge>
                    <Badge variant="secondary" className="text-[10px]">Mandatory</Badge>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">Department Association Activity</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    11:40 AM - 12:30 PM
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Mandatory weekly activity for all department students. No registration required - attendance tracked automatically.
                  </p>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-gray-700">Your Attendance</span>
                      <span className="text-xs font-bold text-gray-900">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-900 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">28 out of 32 weeks attended</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Association;
