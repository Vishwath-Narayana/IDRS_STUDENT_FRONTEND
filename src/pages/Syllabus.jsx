import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BookOpen, User, Clock, TrendingUp, Search, Filter } from "lucide-react";

const CourseCard = ({ id, name, code, instructor, progress = 0, units = 0, status = "In Progress" }) => {
  const getStatusVariant = (status) => {
    if (status === "Completed") return "success";
    if (status === "In Progress") return "info";
    return "secondary";
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 animate-fade-in-up">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                  {name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="font-medium">{code}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{instructor}</span>
                  </div>
                </div>
              </div>
              <Badge variant={getStatusVariant(status)} className="text-[10px] font-semibold">
                {status}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{units} Units</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{progress}% Complete</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium">Progress</span>
                <span className="text-gray-900 font-semibold">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          <NavLink to={`/syllabus/${id}`}>
            <Button variant="outline" size="sm" className="group-hover:bg-gray-900 group-hover:text-white transition-all">
              View Course
            </Button>
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/syllabus/courses")
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      });
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          My Courses
        </h1>
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-sm text-gray-500">Track your academic progress and access course materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {courses.length} Total Courses
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all"
            >
              <option value="All">All Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm font-medium">
                {searchQuery || filterStatus !== "All" ? "No courses match your search criteria." : "No courses available."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredCourses.map((course, idx) => (
            <div key={course.id} style={{ animationDelay: `${idx * 50}ms` }}>
              <CourseCard
                id={course.id}
                name={course.name}
                code={course.code}
                instructor={course.instructor}
                progress={course.progress || Math.floor(Math.random() * 100)}
                units={course.units || Math.floor(Math.random() * 8) + 4}
                status={course.status || "In Progress"}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function Syllabus() {
  return (
    <Layout>
      <div className="animate-fade-in">
        <MyCourses />
      </div>
    </Layout>
  );
}

export default Syllabus;
