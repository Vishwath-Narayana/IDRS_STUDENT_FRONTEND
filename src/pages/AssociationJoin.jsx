import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Upload, FileText, ArrowLeft, Check, X, Award, Users, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssociationJoin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    position: '',
    skills: '',
    experience: '',
    motivation: '',
    resume: null,
  });

  const [resumeFile, setResumeFile] = useState(null);

  const positions = [
    {
      id: 1,
      title: 'Technical Lead',
      description: 'Lead technical workshops and coding events',
      requirements: ['Strong programming skills', 'Leadership experience', 'Good communication'],
      openings: 2,
    },
    {
      id: 2,
      title: 'Event Coordinator',
      description: 'Organize and manage association events',
      requirements: ['Event management skills', 'Team coordination', 'Time management'],
      openings: 3,
    },
    {
      id: 3,
      title: 'Content Creator',
      description: 'Create content for social media and newsletters',
      requirements: ['Writing skills', 'Creativity', 'Social media knowledge'],
      openings: 2,
    },
    {
      id: 4,
      title: 'Design Head',
      description: 'Design posters, banners, and promotional materials',
      requirements: ['Graphic design skills', 'Adobe Suite/Figma', 'Creative thinking'],
      openings: 1,
    },
  ];

  const benefits = [
    { icon: Award, title: 'Certificate', description: 'Official association membership certificate' },
    { icon: Users, title: 'Networking', description: 'Connect with industry professionals' },
    { icon: Target, title: 'Skill Development', description: 'Enhance leadership and technical skills' },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        alert('Please upload PDF or DOC file');
        return;
      }
      setResumeFile(file);
      setFormData({ ...formData, resume: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Application submitted successfully! We will contact you soon.');
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
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Join Association</h1>
            <p className="text-sm text-gray-500">Submit your application to become a member</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-all">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                <p className="text-xs text-gray-500">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Positions */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-semibold text-gray-900">Available Positions</h2>
            
            {positions.map((position) => (
              <Card key={position.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1.5">{position.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 leading-relaxed">{position.description}</p>
                    </div>
                    <Badge className="bg-gray-900 text-white text-[10px]">
                      {position.openings} {position.openings === 1 ? 'Opening' : 'Openings'}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1.5">Requirements:</p>
                    <ul className="space-y-1">
                      {position.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                          <Check className="w-3.5 h-3.5 text-gray-900 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Application Guidelines */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-lg">Application Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Fill the Application Form</p>
                    <p className="text-xs text-gray-600 mt-1">Provide accurate information about yourself</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Upload Your Resume</p>
                    <p className="text-xs text-gray-600 mt-1">PDF or DOC format, max 5MB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Wait for Review</p>
                    <p className="text-xs text-gray-600 mt-1">We'll contact you within 5-7 business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.phone}
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
                      value={formData.department}
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
                      value={formData.year}
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

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Preferred Position *</label>
                    <select
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    >
                      <option value="">Select Position</option>
                      {positions.map((pos) => (
                        <option key={pos.id} value={pos.title}>{pos.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Skills *</label>
                    <input
                      type="text"
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="e.g., Python, Leadership, Design"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Why do you want to join? *</label>
                    <textarea
                      name="motivation"
                      required
                      value={formData.motivation}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Tell us about your motivation..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Upload Resume *</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-900 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="resume-upload"
                        required
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        {resumeFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="w-5 h-5 text-gray-900" />
                            <span className="text-sm font-medium text-gray-900">{resumeFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">Click to upload resume</p>
                            <p className="text-[10px] text-gray-400 mt-1">PDF or DOC (max 5MB)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                    Submit Application
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssociationJoin;
