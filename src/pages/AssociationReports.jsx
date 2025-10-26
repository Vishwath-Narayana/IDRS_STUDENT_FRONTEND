import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Image, FileText, ArrowLeft, Download, Eye, Calendar, Users, Award, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssociationReports = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const pastEvents = [
    {
      id: 1,
      title: 'Tech Symposium 2024',
      date: 'May 15, 2024',
      type: 'Conference',
      attendees: 250,
      photos: 45,
      description: 'Annual technical symposium with keynote speakers from top tech companies.',
      highlights: ['5 keynote sessions', '15 technical workshops', '200+ participants'],
      report: 'tech-symposium-2024.pdf',
      gallery: [
        { id: 1, url: '/images/event1-1.jpg', caption: 'Opening ceremony' },
        { id: 2, url: '/images/event1-2.jpg', caption: 'Keynote session' },
        { id: 3, url: '/images/event1-3.jpg', caption: 'Workshop session' },
        { id: 4, url: '/images/event1-4.jpg', caption: 'Award ceremony' },
      ],
      achievements: ['Best Paper Award', 'Innovation Award'],
    },
    {
      id: 2,
      title: 'Coding Marathon 2024',
      date: 'Apr 20, 2024',
      type: 'Competition',
      attendees: 120,
      photos: 32,
      description: '12-hour coding competition with challenging problem statements.',
      highlights: ['120 participants', '30 teams', '₹50,000 prize pool'],
      report: 'coding-marathon-2024.pdf',
      gallery: [
        { id: 1, url: '/images/event2-1.jpg', caption: 'Competition floor' },
        { id: 2, url: '/images/event2-2.jpg', caption: 'Teams coding' },
        { id: 3, url: '/images/event2-3.jpg', caption: 'Winners announcement' },
      ],
      achievements: ['30 teams participated', '3 winning teams'],
    },
    {
      id: 3,
      title: 'AI Workshop Series',
      date: 'Mar 10-12, 2024',
      type: 'Workshop',
      attendees: 180,
      photos: 28,
      description: '3-day intensive workshop on Artificial Intelligence and Machine Learning.',
      highlights: ['3 days of learning', 'Hands-on projects', 'Industry experts'],
      report: 'ai-workshop-2024.pdf',
      gallery: [
        { id: 1, url: '/images/event3-1.jpg', caption: 'Workshop session' },
        { id: 2, url: '/images/event3-2.jpg', caption: 'Practical demonstration' },
        { id: 3, url: '/images/event3-3.jpg', caption: 'Certificate distribution' },
      ],
      achievements: ['180 certificates issued', '15 projects completed'],
    },
    {
      id: 4,
      title: 'Web Dev Bootcamp',
      date: 'Feb 5, 2024',
      type: 'Workshop',
      attendees: 95,
      photos: 20,
      description: 'Full-stack web development bootcamp for beginners.',
      highlights: ['Full-stack curriculum', 'Live projects', 'Mentorship'],
      report: 'webdev-bootcamp-2024.pdf',
      gallery: [
        { id: 1, url: '/images/event4-1.jpg', caption: 'Coding session' },
        { id: 2, url: '/images/event4-2.jpg', caption: 'Project presentation' },
      ],
      achievements: ['95 participants', '20 projects deployed'],
    },
  ];

  const eventTypes = ['All', 'Conference', 'Competition', 'Workshop', 'Seminar'];

  const filteredEvents = selectedFilter === 'All' 
    ? pastEvents 
    : pastEvents.filter(event => event.type === selectedFilter);

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
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Event Reports & Gallery</h1>
              <p className="text-sm text-gray-500">View past events, reports, and photo galleries</p>
            </div>
          </div>
        </div>

        {/* Filter & View Mode */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-gray-900' : ''}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-gray-900' : ''}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{filteredEvents.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredEvents.reduce((sum, event) => sum + event.attendees, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Photos</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredEvents.reduce((sum, event) => sum + event.photos, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Reports Available</p>
              <p className="text-2xl font-bold text-gray-900">{filteredEvents.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Events Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : 'space-y-4'}>
          {filteredEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all">
              <CardContent className="p-5">
                {/* Event Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1.5">{event.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-[10px]">{event.type}</Badge>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{event.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{event.attendees} attendees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Image className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{event.photos} photos</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-1.5">Highlights:</p>
                  <ul className="space-y-1">
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-1.5 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                {event.achievements && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Award className="w-4 h-4 text-gray-900" />
                      <p className="text-xs font-semibold text-gray-900">Achievements</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {event.achievements.map((achievement, idx) => (
                        <Badge key={idx} className="bg-gray-900 text-white text-[10px]">
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Photo Gallery Preview */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Photo Gallery:</p>
                  <div className="grid grid-cols-4 gap-2">
                    {event.gallery.slice(0, 4).map((photo) => (
                      <div 
                        key={photo.id} 
                        className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <Button size="sm" className="flex-1 bg-gray-900 hover:bg-gray-800 gap-2">
                    <Eye className="w-3.5 h-3.5" />
                    View Gallery
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-2">
                    <Download className="w-3.5 h-3.5" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">No events found for the selected filter.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AssociationReports;
