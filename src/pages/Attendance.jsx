import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  CalendarCheck, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

const Attendance = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [showAttendedDates, setShowAttendedDates] = useState(null);

  // Sample attendance data
  const attendanceStats = {
    overall: 87.5,
    totalClasses: 120,
    attended: 105,
    missed: 15,
    requiredPercentage: 75,
  };

  // Monthly attendance trend data
  const monthlyTrend = [
    { month: 'Aug', percentage: 85, attended: 18, total: 21 },
    { month: 'Sep', percentage: 88, attended: 22, total: 25 },
    { month: 'Oct', percentage: 90, attended: 27, total: 30 },
    { month: 'Nov', percentage: 87, attended: 20, total: 23 },
    { month: 'Dec', percentage: 86, attended: 18, total: 21 },
  ];

  const subjects = [
    {
      id: 1,
      name: 'Data Structures & Algorithms',
      code: 'CS301',
      totalClasses: 28,
      attended: 26,
      missed: 2,
      percentage: 92.86,
      instructor: 'Dr. Sarah Johnson',
      missedDates: [
        { date: 'Oct 15, 2024', day: 'Tuesday', reason: 'Medical Leave', type: 'Excused' },
        { date: 'Oct 22, 2024', day: 'Tuesday', reason: 'Not Marked', type: 'Absent' },
      ],
      attendedDates: [
        { date: 'Oct 1, 2024', day: 'Tuesday', time: '9:00 AM' },
        { date: 'Oct 3, 2024', day: 'Thursday', time: '9:00 AM' },
        { date: 'Oct 8, 2024', day: 'Tuesday', time: '9:00 AM' },
        { date: 'Oct 10, 2024', day: 'Thursday', time: '9:00 AM' },
        { date: 'Oct 17, 2024', day: 'Thursday', time: '9:00 AM' },
        { date: 'Oct 24, 2024', day: 'Thursday', time: '9:00 AM' },
      ],
    },
    {
      id: 2,
      name: 'Database Management Systems',
      code: 'CS302',
      totalClasses: 24,
      attended: 22,
      missed: 2,
      percentage: 91.67,
      instructor: 'Prof. Michael Chen',
      missedDates: [
        { date: 'Oct 10, 2024', day: 'Thursday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 17, 2024', day: 'Thursday', reason: 'College Event', type: 'Excused' },
      ],
      attendedDates: [
        { date: 'Oct 2, 2024', day: 'Wednesday', time: '11:00 AM' },
        { date: 'Oct 4, 2024', day: 'Friday', time: '11:00 AM' },
        { date: 'Oct 9, 2024', day: 'Wednesday', time: '11:00 AM' },
        { date: 'Oct 11, 2024', day: 'Friday', time: '11:00 AM' },
        { date: 'Oct 16, 2024', day: 'Wednesday', time: '11:00 AM' },
      ],
    },
    {
      id: 3,
      name: 'Operating Systems',
      code: 'CS303',
      totalClasses: 26,
      attended: 24,
      missed: 2,
      percentage: 92.31,
      instructor: 'Dr. Emily Rodriguez',
      missedDates: [
        { date: 'Oct 12, 2024', day: 'Saturday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 19, 2024', day: 'Saturday', reason: 'Family Emergency', type: 'Excused' },
      ],
      attendedDates: [
        { date: 'Oct 5, 2024', day: 'Saturday', time: '10:00 AM' },
        { date: 'Oct 7, 2024', day: 'Monday', time: '10:00 AM' },
        { date: 'Oct 14, 2024', day: 'Monday', time: '10:00 AM' },
        { date: 'Oct 21, 2024', day: 'Monday', time: '10:00 AM' },
        { date: 'Oct 26, 2024', day: 'Saturday', time: '10:00 AM' },
      ],
    },
    {
      id: 4,
      name: 'Computer Networks',
      code: 'CS304',
      totalClasses: 22,
      attended: 18,
      missed: 4,
      percentage: 81.82,
      instructor: 'Prof. David Kumar',
      missedDates: [
        { date: 'Oct 8, 2024', day: 'Monday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 11, 2024', day: 'Thursday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 18, 2024', day: 'Thursday', reason: 'Medical Leave', type: 'Excused' },
        { date: 'Oct 25, 2024', day: 'Thursday', reason: 'Not Marked', type: 'Absent' },
      ],
      attendedDates: [
        { date: 'Oct 1, 2024', day: 'Tuesday', time: '2:00 PM' },
        { date: 'Oct 4, 2024', day: 'Friday', time: '2:00 PM' },
        { date: 'Oct 15, 2024', day: 'Tuesday', time: '2:00 PM' },
        { date: 'Oct 22, 2024', day: 'Tuesday', time: '2:00 PM' },
      ],
    },
    {
      id: 5,
      name: 'Software Engineering',
      code: 'CS305',
      totalClasses: 20,
      attended: 15,
      missed: 5,
      percentage: 75.0,
      instructor: 'Dr. Lisa Anderson',
      missedDates: [
        { date: 'Oct 5, 2024', day: 'Friday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 9, 2024', day: 'Tuesday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 16, 2024', day: 'Tuesday', reason: 'Not Marked', type: 'Absent' },
        { date: 'Oct 20, 2024', day: 'Saturday', reason: 'Medical Leave', type: 'Excused' },
        { date: 'Oct 23, 2024', day: 'Tuesday', reason: 'Not Marked', type: 'Absent' },
      ],
      attendedDates: [
        { date: 'Oct 2, 2024', day: 'Wednesday', time: '1:00 PM' },
        { date: 'Oct 6, 2024', day: 'Sunday', time: '1:00 PM' },
        { date: 'Oct 12, 2024', day: 'Saturday', time: '1:00 PM' },
      ],
    },
  ];

  const filteredSubjects = selectedSubject === 'all' 
    ? subjects 
    : subjects.filter(s => s.id === parseInt(selectedSubject));

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getAttendanceStatus = (percentage) => {
    if (percentage >= 90) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Low';
  };

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
          <p className="font-semibold">{data.month}</p>
          <p className="text-gray-300">{data.percentage}% attendance</p>
          <p className="text-gray-300">{data.attended}/{data.total} classes</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Attendance</h1>
            <p className="text-sm text-gray-500">Track your class attendance and missed sessions</p>
          </div>
          <Badge className="bg-gray-900 text-white gap-2">
            <CalendarCheck className="w-3 h-3" />
            Academic Year 2024-25
          </Badge>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Overall</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.overall}%</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Total Attendance</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Present</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.attended}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Classes Attended</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Absent</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.missed}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Classes Missed</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Total</Badge>
              </div>
              <p className="text-2xl font-bold text-gray-900">{attendanceStats.totalClasses}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Total Classes</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Trend Graph */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Attendance Trend</CardTitle>
                <p className="text-xs text-gray-500 mt-0.5">Monthly attendance overview</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Recharts Bar Chart */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#e5e7eb' }}
                      domain={[0, 100]}
                      label={{ value: 'Attendance %', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12 } }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                    <ReferenceLine 
                      y={attendanceStats.requiredPercentage} 
                      stroke="#9ca3af" 
                      strokeDasharray="5 5"
                      label={{ value: `Required: ${attendanceStats.requiredPercentage}%`, position: 'right', fill: '#6b7280', fontSize: 11 }}
                    />
                    <Bar 
                      dataKey="percentage" 
                      radius={[8, 8, 0, 0]}
                      maxBarSize={80}
                    >
                      {monthlyTrend.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.percentage >= attendanceStats.requiredPercentage ? '#10b981' : '#ef4444'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Stats below chart */}
              <div className="grid grid-cols-5 gap-3 pt-2 border-t border-gray-100">
                {monthlyTrend.map((data, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-xs font-semibold text-gray-900">{data.month}</p>
                    <p className="text-[10px] text-gray-500">{data.attended}/{data.total}</p>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-xs text-gray-600">Above {attendanceStats.requiredPercentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span className="text-xs text-gray-600">Below {attendanceStats.requiredPercentage}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Status Alert */}
        {attendanceStats.overall < attendanceStats.requiredPercentage && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-900 mb-1">Low Attendance Warning</h3>
                  <p className="text-xs text-red-700 leading-relaxed">
                    Your overall attendance is below the required {attendanceStats.requiredPercentage}%. 
                    You need to attend more classes to meet the minimum requirement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {attendanceStats.overall >= attendanceStats.requiredPercentage && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-900 mb-1">Good Attendance</h3>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Your attendance is above the required {attendanceStats.requiredPercentage}%. Keep up the good work!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.code} - {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Subject-wise Attendance */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Subject-wise Attendance</h2>
          
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} className="hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Subject Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-bold text-gray-900">{subject.name}</h3>
                        <Badge variant="secondary" className="text-[10px]">{subject.code}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Instructor: {subject.instructor}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getAttendanceColor(subject.percentage)}`}>
                        {subject.percentage.toFixed(1)}%
                      </div>
                      <Badge className={`text-[10px] mt-1 ${getAttendanceBgColor(subject.percentage)} ${getAttendanceColor(subject.percentage)}`}>
                        {getAttendanceStatus(subject.percentage)}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Attended: {subject.attended}/{subject.totalClasses}</span>
                      <span>Missed: {subject.missed}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          subject.percentage >= 90 ? 'bg-green-600' : 
                          subject.percentage >= 75 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${subject.percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Missed Classes Section */}
                  {subject.missed > 0 && (
                    <div>
                      <button
                        onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span>View {subject.missed} Missed {subject.missed === 1 ? 'Class' : 'Classes'}</span>
                        {expandedSubject === subject.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {expandedSubject === subject.id && (
                        <div className="mt-3 space-y-2">
                          {subject.missedDates.map((missed, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <div className="flex-shrink-0 w-12 text-center">
                                <div className="bg-red-100 text-red-700 rounded-lg p-1.5">
                                  <p className="text-[10px] font-semibold uppercase">{missed.day}</p>
                                  <p className="text-xs font-bold">{missed.date.split(',')[0].split(' ')[1]}</p>
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-semibold text-gray-900">{missed.date}</p>
                                  <Badge className={`text-[10px] ${
                                    missed.type === 'Excused' 
                                      ? 'bg-blue-100 text-blue-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {missed.type}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-600">{missed.reason}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {subject.missed === 0 && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-xs text-green-700 font-medium">Perfect attendance! No classes missed.</p>
                    </div>
                  )}

                  {/* Attended Classes Section */}
                  {subject.attended > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setShowAttendedDates(showAttendedDates === subject.id ? null : subject.id)}
                        className="flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>View {subject.attended} Attended {subject.attended === 1 ? 'Class' : 'Classes'}</span>
                        {showAttendedDates === subject.id ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      {showAttendedDates === subject.id && (
                        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                          {subject.attendedDates.map((attended, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center gap-3 p-2.5 bg-green-50 rounded-lg border border-green-100"
                            >
                              <div className="flex-shrink-0 w-12 text-center">
                                <div className="bg-green-600 text-white rounded-lg p-1.5">
                                  <p className="text-[10px] font-semibold uppercase">{attended.day.slice(0, 3)}</p>
                                  <p className="text-xs font-bold">{attended.date.split(',')[0].split(' ')[1]}</p>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-900 truncate">{attended.date}</p>
                                <p className="text-[10px] text-gray-600">{attended.time}</p>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Attendance Tips</h3>
                <ul className="text-xs text-blue-700 space-y-1 leading-relaxed">
                  <li>• Maintain at least {attendanceStats.requiredPercentage}% attendance to be eligible for exams</li>
                  <li>• Medical leave requires proper documentation within 3 days</li>
                  <li>• College event participation is automatically marked as excused</li>
                  <li>• Contact your instructor for any attendance discrepancies</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Attendance;
