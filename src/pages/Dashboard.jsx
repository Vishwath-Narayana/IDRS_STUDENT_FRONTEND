import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Bell, CalendarCheck, UploadCloud, TrendingUp, Award, Target, Zap, Calendar, Clock, ArrowRight, BookOpen, FileText, Video, Star } from 'lucide-react';
import Overview from '../components/Overview';
import Analytics from '../components/Analytics';
import Progress from '../components/Progress';
import Activity from '../components/Activity';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import axios from 'axios';

const Dashboard = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [submissionData, setSubmissionData] = useState(null);
  const [kpis, setKpis] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [attendanceRes, submissionsRes, kpiRes, activitiesRes, progressRes, announcementsRes] = await Promise.all([
          axios.get('http://localhost:5001/api/dashboard/attendance'),
          axios.get('http://localhost:5001/api/dashboard/submissions'),
          axios.get('http://localhost:5001/api/dashboard/kpis'),
          axios.get('http://localhost:5001/api/dashboard/activities'),
          axios.get('http://localhost:5001/api/dashboard/progress'),
          axios.get('http://localhost:5001/api/dashboard/announcements'),
        ]);

        setAttendanceData({
          labels: attendanceRes.data.map(a => a.month),
          datasets: [{
            label: 'Attendance %',
            data: attendanceRes.data.map(a => a.percent),
            borderColor: '#6B7280',
            backgroundColor: 'transparent',
            tension: 0.4,
          }],
        });

        setSubmissionData({
          labels: submissionsRes.data.map(s => s.month),
          datasets: [{
            label: 'Submissions',
            data: submissionsRes.data.map(s => s.count),
            backgroundColor: '#9CA3AF',
          }],
        });

        setKpis(kpiRes.data);
        setRecentActivities(activitiesRes.data.map(a => ({
          icon: <span className="w-4 h-4 inline mr-1">🔔</span>,
          text: a.text,
        })));
        setCourseProgress(progressRes.data);
        setAnnouncements(announcementsRes.data.map(a => a.message));
      } catch (error) {
        console.error('Dashboard data fetch failed:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-zinc-900 text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </Layout>
    );
  }

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning' : currentHour < 18 ? 'Good Afternoon' : 'Good Evening';
  const userName = localStorage.getItem('user') || 'B23CS063';

  return (
    <Layout>
      <div className="space-y-6">
        {/* Sophisticated Dark Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGgxMnYxMkgzNnptMjQgMGgxMnYxMkg2MHpNMTIgMTE0aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDkwaDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDY2aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDQyaDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6TTEyIDE4aDEydjEySDF6bTI0IDBoMTJ2MTJIMzZ6bTI0IDBoMTJ2MTJINjB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <p className="text-xs font-semibold opacity-70 uppercase tracking-wider">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <h1 className="text-4xl font-bold tracking-tight">{greeting}, {userName} 👋</h1>
              <p className="text-sm opacity-80 font-medium">Here's your updated academic overview</p>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform duration-300 border border-white/20">
                <span className="text-5xl animate-float">📚</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Bar - Subtle Dark Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
          <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-800 transition-colors">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">My Courses</p>
              <p className="text-xs text-gray-500 mt-1">8 Active</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-800 transition-colors">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Assignments</p>
              <p className="text-xs text-gray-500 mt-1">3 Pending</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-800 transition-colors">
                <Video className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Lectures</p>
              <p className="text-xs text-gray-500 mt-1">12 New</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer">
            <CardContent className="p-5 text-center">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-800 transition-colors">
                <Award className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Achievements</p>
              <p className="text-xs text-gray-500 mt-1">View All</p>
            </CardContent>
          </Card>
        </div>

        <Overview kpis={kpis} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Analytics attendanceData={attendanceData} submissionData={submissionData} />
            
            {/* Upcoming Events - Dark Theme */}
            <Card className="animate-fade-in-up hover:shadow-lg transition-all" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Data Structures Mid-Term', date: 'Tomorrow, 10:00 AM', urgent: true },
                    { title: 'Web Development Project Due', date: 'Jun 25, 11:59 PM', urgent: false },
                    { title: 'Career Fair Registration', date: 'Jun 28, 9:00 AM', urgent: false },
                  ].map((event, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                      <div className={`w-1.5 h-14 rounded-full ${event.urgent ? 'bg-gray-900' : 'bg-gray-400'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <p className="text-xs text-gray-500">{event.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Progress courseProgress={courseProgress} />
            
            {/* Performance Insights - Subtle Design */}
            <Card className="animate-fade-in-up hover:shadow-lg transition-all" style={{ animationDelay: '250ms' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Overall Grade</span>
                    <Badge variant="secondary" className="text-[10px]">Excellent</Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">8.7 / 10</p>
                  <p className="text-xs text-gray-500 mt-1">+0.3 from last semester</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Class Rank</span>
                    <Badge variant="secondary" className="text-[10px]">Top 10%</Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">#12</p>
                  <p className="text-xs text-gray-500 mt-1">Out of 120 students</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Streak</span>
                    <Badge variant="secondary" className="text-[10px]">15 Days</Badge>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">15 Days</p>
                  <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Activity announcements={announcements} recentActivities={recentActivities} />
      </div>
    </Layout>
  );
};

export default Dashboard;
