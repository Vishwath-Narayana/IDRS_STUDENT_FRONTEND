import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, Users, ArrowLeft, DollarSign, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssociationRegister = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    teamName: '',
    teamMembers: '',
  });

  // Club Events - Open to all departments (free or paid)
  const availableEvents = [
    {
      id: 1,
      title: 'Tech Talk: AI & Machine Learning',
      date: 'Jun 28, 2025',
      time: '2:00 PM - 4:00 PM',
      location: 'Auditorium A',
      type: 'Workshop',
      fee: 'Free',
      seats: 120,
      registered: 87,
      department: 'All Departments',
      description: 'Expert session on latest AI trends and applications. Learn from industry professionals.',
      requirements: ['Laptop required', 'Basic programming knowledge', 'Enthusiasm to learn'],
      benefits: ['Certificate of participation', 'Networking opportunity', 'Learning materials'],
    },
    {
      id: 2,
      title: 'Annual Hackathon 2024',
      date: 'Jul 15-16, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'Main Campus',
      type: 'Competition',
      fee: '₹500',
      seats: 200,
      registered: 145,
      department: 'All Departments',
      description: '24-hour hackathon with industry mentors. Build innovative solutions and win prizes.',
      requirements: ['Team of 2-4 members', 'Laptop required', 'Problem-solving skills'],
      benefits: ['Cash prizes up to ₹50,000', 'Internship opportunities', 'Mentorship from experts', 'Certificates'],
    },
    {
      id: 3,
      title: 'Code Sprint Challenge',
      date: 'Jul 5, 2025',
      time: '10:00 AM - 5:00 PM',
      location: 'Computer Lab 1',
      type: 'Competition',
      fee: '₹200',
      seats: 80,
      registered: 62,
      department: 'All Departments',
      description: '6-hour coding challenge with exciting prizes. Test your coding skills.',
      requirements: ['Individual participation', 'Laptop required', 'Coding proficiency'],
      benefits: ['Prizes for top 3', 'Certificate', 'Skill assessment report'],
    },
    {
      id: 4,
      title: 'Web Development Workshop',
      date: 'Jul 10, 2025',
      time: '1:00 PM - 5:00 PM',
      location: 'Lab 2',
      type: 'Workshop',
      fee: 'Free',
      seats: 60,
      registered: 45,
      department: 'All Departments',
      description: 'Hands-on workshop on modern web development. Build your first web application.',
      requirements: ['Laptop required', 'Basic HTML/CSS knowledge', 'Willingness to learn'],
      benefits: ['Certificate', 'Project code', 'Learning resources'],
    },
    {
      id: 5,
      title: 'Cloud Computing Seminar',
      date: 'Jul 20, 2025',
      time: '3:00 PM - 5:00 PM',
      location: 'Auditorium B',
      type: 'Seminar',
      fee: '₹200',
      seats: 150,
      registered: 98,
      department: 'All Departments',
      description: 'Industry experts discuss cloud technologies and career opportunities.',
      requirements: ['Interest in cloud computing', 'Basic IT knowledge'],
      benefits: ['Certificate', 'Industry insights', 'Networking with experts'],
    },
  ];

  const handleInputChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration submission
    alert('Registration submitted successfully!');
    navigate('/association');
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/association')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Club Events</h1>
            <p className="text-sm text-gray-500">Register for club events - Open to all departments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Events */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Available Club Events</h2>
            <p className="text-xs text-gray-500 mt-1">These events are open to students from all departments</p>
            
            {availableEvents.map((event) => (
              <Card 
                key={event.id} 
                className={`cursor-pointer transition-all ${
                  selectedEvent?.id === event.id 
                    ? 'ring-2 ring-gray-900 shadow-lg' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-900 mb-1.5">{event.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">{event.type}</Badge>
                        <Badge className={`text-[10px] ${
                          event.fee === 'Free' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {event.fee}
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-700 text-[10px]">{event.department}</Badge>
                      </div>
                    </div>
                    {selectedEvent?.id === event.id && (
                      <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">{event.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{event.date}</span>
                    </div>
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
                      <span>{event.registered}/{event.seats} registered</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Registration Progress</span>
                      <span>{Math.round((event.registered / event.seats) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="bg-gray-900 h-2 rounded-full transition-all"
                        style={{ width: `${(event.registered / event.seats) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full bg-gray-900 hover:bg-gray-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEvent(event);
                    }}
                  >
                    {selectedEvent?.id === event.id ? 'Selected' : 'Select Event'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Registration Form */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Registration Form</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedEvent ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-500">Select an event to register</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={registrationData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={registrationData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={registrationData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        placeholder="+91 1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Department *</label>
                      <select
                        name="department"
                        required
                        value={registrationData.department}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        <option value="">Select Department</option>
                        <option value="CSE">Computer Science</option>
                        <option value="ECE">Electronics</option>
                        <option value="ME">Mechanical</option>
                        <option value="CE">Civil</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-2">Year *</label>
                      <select
                        name="year"
                        required
                        value={registrationData.year}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        <option value="">Select Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>

                    {selectedEvent.type === 'Competition' && selectedEvent.title.includes('Hackathon') && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">Team Name *</label>
                          <input
                            type="text"
                            name="teamName"
                            required
                            value={registrationData.teamName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter team name"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-2">Team Members (2-4) *</label>
                          <textarea
                            name="teamMembers"
                            required
                            value={registrationData.teamMembers}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter member names (one per line)"
                          />
                        </div>
                      </>
                    )}

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-gray-700">Registration Fee</span>
                        <span className="text-lg font-bold text-gray-900">{selectedEvent.fee}</span>
                      </div>
                      <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                        Complete Registration
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssociationRegister;
