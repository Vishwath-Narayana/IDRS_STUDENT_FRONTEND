import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Bell, Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';

const noticesData = [
  {
    id: 1,
    title: "Academic Calendar Update",
    date: "2025-06-01",
    category: "Academic",
    priority: "high",
    description: "Revised academic calendar for the upcoming semester, including exam dates and holidays. Please review the updated schedule and mark important dates in your calendar.",
    image: "/images/calendar.png",
  },
  {
    id: 2,
    title: "Campus Event: Career Fair",
    date: "2025-06-02",
    category: "Event",
    priority: "medium",
    description: "Annual career fair for internships and job opportunities. Top companies from various industries will be present. Bring your resume and dress professionally.",
    image: "/images/career-fair.png",
  },
  {
    id: 3,
    title: "Library Resources Enhancement",
    date: "2025-06-03",
    category: "Facility",
    priority: "low",
    description: "New resources and databases available through the library portal. Access to premium research journals and e-books has been expanded.",
    image: "/images/library.png",
  },
  {
    id: 4,
    title: "Mid-Semester Examination Schedule",
    date: "2025-06-05",
    category: "Academic",
    priority: "high",
    description: "Mid-semester examinations will be conducted from June 15-20. Check your individual timetables on the student portal.",
    image: "/images/exam.png",
  },
  {
    id: 5,
    title: "Sports Day Registration Open",
    date: "2025-06-07",
    category: "Event",
    priority: "medium",
    description: "Register for the annual sports day events. Multiple categories including athletics, team sports, and indoor games available.",
    image: "/images/sports.png",
  },
];

const Notices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(noticesData.map(n => n.category))];

  const getPriorityVariant = (priority) => {
    if (priority === 'high') return 'destructive';
    if (priority === 'medium') return 'warning';
    return 'secondary';
  };

  const getPriorityLabel = (priority) => {
    if (priority === 'high') return 'Urgent';
    if (priority === 'medium') return 'Important';
    return 'Info';
  };

  const filteredNotices = noticesData.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || notice.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Institute Notices</h1>
            <p className="text-sm text-gray-500">Stay updated with the latest announcements and news</p>
          </div>
          <Badge variant="info" className="gap-1">
            <Bell className="w-3 h-3" />
            {noticesData.length} Active
          </Badge>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredNotices.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-sm text-gray-500 font-medium">
                  {searchQuery || selectedCategory !== 'All'
                    ? "No notices match your search criteria."
                    : "No notices available."}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotices.map((notice, idx) => (
              <Card
                key={notice.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-48 h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                      <Bell className="w-16 h-16 text-gray-400 relative z-10" />
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={getPriorityVariant(notice.priority)} className="text-[10px]">
                              {getPriorityLabel(notice.priority)}
                            </Badge>
                            <Badge variant="secondary" className="text-[10px]">
                              {notice.category}
                            </Badge>
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                            {notice.title}
                          </h2>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {new Date(notice.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {getTimeAgo(notice.date)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {notice.description}
                      </p>

                      <Button variant="ghost" className="gap-2 group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notices;