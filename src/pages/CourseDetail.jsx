import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { FileText, Video, Download, Play, BookOpen, ArrowLeft, CheckCircle2, Clock, FileDown } from 'lucide-react';


// --- Main Component ---
function CourseDetail() {
  const { courseId } = useParams();
  
  // State for course data, loading, and errors
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUnitId, setActiveUnitId] = useState(null);

  // Effect to fetch course data from the backend
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        // Fetch data from the API endpoint
        const response = await axios.get(`/api/syllabus/coursedetail/${courseId}`);
        setCourse(response.data);
        setError(null);
      } catch (err) {
        setError('Course not found or an error occurred.');
        console.error("API Error:", err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]); // Re-run effect if courseId changes

  // Effect to set the default active unit once the course is loaded
  useEffect(() => {
    if (course?.units?.length > 0) {
      setActiveUnitId(course.units[0].id);
    }
  }, [course]);

  const activeUnit = course?.units?.find(u => u.id === activeUnitId);

  // --- Render States ---

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-600">Loading course details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !course) {
    return (
      <Layout>
        <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
          <Card className="max-w-md">
            <CardContent className="p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {error ? 'Error Loading Course' : 'Course Not Found'}
              </h1>
              <p className="text-sm text-gray-600">
                {error || `The course ID "${courseId}" does not match any known courses.`}
              </p>
              <Link to="/syllabus">
                <Button className="w-full gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Courses
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // --- Main Content Render ---

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Link to="/syllabus">
              <Button variant="ghost" size="sm" className="gap-2 -ml-2 mb-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="text-sm text-gray-500">Explore course units and access learning materials</p>
          </div>
        </div>

        {/* Unit Navigation Tabs */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {course.units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => setActiveUnitId(unit.id)}
                  className={`py-4 px-6 text-sm font-medium focus:outline-none whitespace-nowrap transition-all ${
                    unit.id === activeUnitId
                      ? 'border-b-2 border-gray-900 text-gray-900 bg-gray-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {unit.title.substring(0, unit.title.indexOf(':') > 0 ? unit.title.indexOf(':') : unit.title.length)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unit Content */}
        {activeUnit ? (
          <div className="space-y-6">
            {/* Unit Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl">{activeUnit.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {activeUnit.description}
                    </CardDescription>
                  </div>
                  <Badge variant="info" className="text-xs">
                    {activeUnit.resources.length} Resources
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Table of Contents", icon: BookOpen },
                    { label: "Unit Overview", icon: FileText },
                    { label: "Download Notes", icon: Download },
                    { label: "Watch Video", icon: Play }
                  ].map(({ label, icon: Icon }) => (
                    <Button
                      key={label}
                      variant="outline"
                      className="justify-start gap-2 h-auto py-3"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Resources</CardTitle>
                <CardDescription>Access course materials and study resources</CardDescription>
              </CardHeader>
              <CardContent>
                {activeUnit.resources.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-sm text-gray-500 font-medium">No resources available for this unit yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {activeUnit.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer border border-transparent hover:border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            resource.type === "Video" 
                              ? "bg-red-50 text-red-600" 
                              : "bg-blue-50 text-blue-600"
                          }`}>
                            {resource.type === "Video" ? (
                              <Video className="w-5 h-5" />
                            ) : (
                              <FileText className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                              {resource.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{resource.type}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <FileDown className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500 font-medium">Select a unit to see its details.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}

export default CourseDetail;