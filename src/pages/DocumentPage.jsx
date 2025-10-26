import React, { useState, useMemo, useEffect } from "react";
import { useAlert } from "../components/AlertContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { FileText, Download, Trash2, Upload, Search, Filter, FileUp, FileDown, TrendingUp, Calendar } from "lucide-react";
import ConfirmDialog from "../components/Documents/ConfirmDialog";

const PAGE_SIZE = 8;

const DocumentPage = () => {
  const navigate = useNavigate();

  // Get logged-in username from localStorage (replace as needed)
  const loggedUser = localStorage.getItem("user");

  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [docs, setDocs] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Fetch documents from backend on mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/documents");
        setDocs(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  // Extract unique categories for filter dropdown
  const categories = useMemo(() => {
    const cats = new Set(docs.map((doc) => doc.category));
    return ["All", ...Array.from(cats).sort()];
  }, [docs]);

  // Filter, search, and sort documents based on current state
  const filteredDocuments = useMemo(() => {
    let filtered = docs;

    if (activeTab === "mine") {
      filtered = filtered.filter((doc) => doc.uploadedBy === loggedUser);
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((doc) => doc.category === selectedCategory);
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === "date") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          if (typeof aVal === "string") aVal = aVal.toLowerCase();
          if (typeof bVal === "string") bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [docs, activeTab, searchTerm, selectedCategory, sortConfig, loggedUser]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDocuments.length / PAGE_SIZE);
  const paginatedDocs = filteredDocuments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const { showAlert } = useAlert();
  const confirmDelete = (docName) => {
    setSelectedDoc(docName);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `/api/documents/by-name/${encodeURIComponent(selectedDoc)}`
      );
      setDocs((prev) => prev.filter((doc) => doc.name !== selectedDoc));
      setConfirmOpen(false);
      setSelectedDoc(null);
      showAlert("Document deleted successfully", "success");
    } catch (err) {
      console.error("Delete failed:", err);
      showAlert("Document deletion failed", "error");
    }
  };

  // Reset page to 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, selectedCategory]);

  const myUploadsCount = docs.filter(d => d.uploadedBy === loggedUser).length;
  const recentDownloads = 8; // This could come from backend

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Logs & Reports</h1>
            <p className="text-sm text-gray-500">Manage and access your documents</p>
          </div>
          <Button onClick={() => navigate("/upload-doc")} className="gap-2">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <Badge variant="info" className="text-[10px]">Total</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900">{docs.length}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">All Documents</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <FileUp className="w-5 h-5 text-green-600" />
                </div>
                <Badge variant="success" className="text-[10px]">Mine</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900">{myUploadsCount}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">My Uploads</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                  <FileDown className="w-5 h-5 text-purple-600" />
                </div>
                <Badge variant="secondary" className="text-[10px]">Recent</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900">{recentDownloads}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Downloads</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <Badge variant="warning" className="text-[10px]">This Week</Badge>
              </div>
              <p className="text-3xl font-bold text-gray-900">+{Math.floor(docs.length * 0.15)}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">New Uploads</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Card>
          <CardContent className="p-0">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === "all"
                    ? "border-b-2 border-gray-900 text-gray-900 bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                All Documents
              </button>
              <button
                onClick={() => setActiveTab("mine")}
                className={`py-4 px-6 text-sm font-medium transition-all ${
                  activeTab === "mine"
                    ? "border-b-2 border-gray-900 text-gray-900 bg-gray-50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                My Documents
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Documents Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {[
                      { key: "name", label: "Document Name" },
                      { key: "type", label: "Type" },
                      { key: "category", label: "Category" },
                      { key: "uploadedBy", label: "Uploaded By" },
                      { key: "date", label: "Date" },
                    ].map(({ key, label }) => (
                      <th
                        key={key}
                        onClick={() => requestSort(key)}
                        className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {label}
                          <span className="text-gray-400">
                            {sortConfig.key === key
                              ? sortConfig.direction === "asc"
                                ? "↑"
                                : "↓"
                              : ""}
                          </span>
                        </div>
                      </th>
                    ))}
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedDocs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-sm text-gray-500 font-medium">
                          {searchTerm || selectedCategory !== "All"
                            ? "No documents match your search criteria."
                            : "No documents available."}
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedDocs.map((doc, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <FileText className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="text-xs">{doc.type}</Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{doc.uploadedBy}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            {doc.date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <a
                              href={doc.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Download className="w-3.5 h-3.5" />
                                Download
                              </Button>
                            </a>
                            {doc.uploadedBy === loggedUser && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => confirmDelete(doc.name)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                  {Math.min(currentPage * PAGE_SIZE, filteredDocuments.length)} of{" "}
                  {filteredDocuments.length} documents
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, i) => (
                    <Button
                      key={i + 1}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(i + 1)}
                      className="w-10"
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message={`Are you sure you want to delete "${selectedDoc}"? This action cannot be undone.`}
        />
      </div>
    </Layout>
  );
};

export default DocumentPage;
