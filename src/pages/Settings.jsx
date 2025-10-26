import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { User, Mail, Phone, Lock, Bell, Shield, Palette, Globe, Edit2, Save, X, Check, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../components/ThemeContext';

const Settings = () => {
  const { theme, setLightTheme, setDarkTheme, setSystemTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    studentId: '',
    major: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await fetch(`http://localhost:5001/api/auth/getuser/${email}`);
        const data = await response.json();

        if (data.success) {
          const userInfo = {
            fullName: data.user.name || 'N/A',
            studentId: data.user.studentId || 'N/A',
            major: data.user.major || 'Computer Science',
            email: data.user.email || 'N/A',
            contactNumber: data.user.contactNumber || 'N/A',
            password: '********',
          };
          setUserData(userInfo);
          setEditedData(userInfo);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...userData });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const email = localStorage.getItem('email');
      const response = await fetch(`http://localhost:5001/api/auth/updateuser/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedData.fullName,
          contactNumber: editedData.contactNumber,
          email: editedData.email,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUserData({ ...editedData });
        setIsEditing(false);
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette },
  ];

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account settings and preferences</p>
        </div>

        {/* Tabs */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-6 text-sm font-medium focus:outline-none whitespace-nowrap transition-all ${
                    activeTab === id
                      ? 'border-b-2 border-gray-900 text-gray-900 bg-gray-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Your basic account information</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleEdit}
                      className="gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleCancel}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gray-900 hover:bg-gray-800 gap-2"
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</label>
                    {isEditing ? (
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-gray-900">
                        <User className="w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={editedData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="flex-1 text-sm font-medium text-gray-900 bg-transparent focus:outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{userData.fullName}</p>
                      </div>
                    )}
                  </div>

                  {/* Student ID - Not Editable */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Student ID</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Badge variant="secondary" className="text-xs">{userData.studentId}</Badge>
                      <span className="text-[10px] text-gray-400 ml-auto">Cannot be changed</span>
                    </div>
                  </div>

                  {/* Major - Not Editable */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Major</label>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">{userData.major}</p>
                      <span className="text-[10px] text-gray-400 ml-auto">Cannot be changed</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                    {isEditing ? (
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-gray-900">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={editedData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="flex-1 text-sm font-medium text-gray-900 bg-transparent focus:outline-none"
                          placeholder="Enter your email"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{userData.email}</p>
                      </div>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Number</label>
                    {isEditing ? (
                      <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-gray-900">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={editedData.contactNumber}
                          onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                          className="flex-1 text-sm font-medium text-gray-900 bg-transparent focus:outline-none"
                          placeholder="Enter your contact number"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <p className="text-sm font-medium text-gray-900">{userData.contactNumber}</p>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">i</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-900">Editing Mode</p>
                        <p className="text-xs text-blue-700 mt-1">You can edit your Full Name, Email, and Contact Number. Student ID and Major cannot be changed.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
                <CardDescription>Manage your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Password</p>
                      <p className="text-xs text-gray-500 mt-0.5">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <NavLink to="/change-password">
                    <Button variant="outline" size="sm">Change Password</Button>
                  </NavLink>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
                      <p className="text-xs text-gray-500 mt-0.5">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Course Updates', description: 'Get notified about new course materials' },
                  { label: 'Assignment Reminders', description: 'Receive reminders for upcoming deadlines' },
                  { label: 'Grade Notifications', description: 'Be notified when grades are posted' },
                  { label: 'Announcements', description: 'Receive important announcements from instructors' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gray-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preferences Tab */}
        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>Customize your interface appearance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-900">Theme</label>
                  <p className="text-xs text-gray-500">Choose your preferred color scheme</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Light Theme */}
                    <button
                      onClick={setLightTheme}
                      className={`flex flex-col items-center gap-3 p-5 border-2 rounded-lg transition-all ${
                        theme === 'light'
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
                        <Sun className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">Light</p>
                        <p className="text-xs text-gray-500 mt-0.5">Bright and clean</p>
                      </div>
                      {theme === 'light' && (
                        <Badge className="bg-gray-900 text-white text-[10px] mt-1">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </button>

                    {/* Dark Theme */}
                    <button
                      onClick={setDarkTheme}
                      className={`flex flex-col items-center gap-3 p-5 border-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
                        <Moon className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">Dark</p>
                        <p className="text-xs text-gray-500 mt-0.5">Easy on the eyes</p>
                      </div>
                      {theme === 'dark' && (
                        <Badge className="bg-gray-900 text-white text-[10px] mt-1">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </button>

                    {/* System Theme */}
                    <button
                      onClick={setSystemTheme}
                      className={`flex flex-col items-center gap-3 p-5 border-2 rounded-lg transition-all ${
                        theme === 'system'
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
                        <Monitor className="w-6 h-6 text-gray-900" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-900">System</p>
                        <p className="text-xs text-gray-500 mt-0.5">Match device</p>
                      </div>
                      {theme === 'system' && (
                        <Badge className="bg-gray-900 text-white text-[10px] mt-1">
                          <Check className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      )}
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-900">Language</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 bg-white text-gray-900 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
