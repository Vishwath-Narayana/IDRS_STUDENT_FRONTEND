import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare, Mail, Phone, HelpCircle, BookOpen, FileText, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const faqs = [
  {
    question: "How do I reset a user’s password?",
    answer: "Go to User Management > Select the user > Click on 'Reset Password'."
  },
  {
    question: "What are the different user roles and permissions?",
    answer: "Roles include Admin, Faculty, Student, and Alumni. Each role has specific access defined under System Settings > Roles."
  },
  {
    question: "How can I export user data?",
    answer: "Navigate to Export Data > Select category > Choose format > Click Export."
  }
];

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState("Knowledge Base/FAQs");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Knowledge Base/FAQs':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex justify-between items-center px-4 py-4 text-sm font-medium text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-900">{faq.question}</span>
                      {openFAQ === index ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                    </button>
                    {openFAQ === index && (
                      <div className="px-4 py-4 text-sm text-gray-600 border-t border-gray-100 bg-gray-50 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      case 'Contact Support':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Contact Support Team</CardTitle>
              <CardDescription>Submit a support request and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  />
                </div>
                <Button className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        );
      case 'My Tickets':
        return (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">You have no active tickets at the moment.</p>
            </CardContent>
          </Card>
        );
      case 'Announcements':
        return (
          <Card>
            <CardContent className="p-12 text-center">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">No new announcements.</p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Center</h1>
        <p className="text-sm text-gray-500">Get help and find answers to your questions</p>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Knowledge Base</h3>
            <p className="text-sm text-gray-500 mb-4">Browse articles and guides</p>
            <Badge variant="secondary" className="text-xs">50+ Articles</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Chat with support team</p>
            <Badge variant="success" className="text-xs">Online Now</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all cursor-pointer group">
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-500 mb-4">Send us a message</p>
            <Badge variant="secondary" className="text-xs">24h Response</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {['Knowledge Base/FAQs', 'Contact Support', 'My Tickets', 'Announcements'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-6 text-sm font-medium focus:outline-none whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-gray-900 text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for articles or FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default SupportCenter;