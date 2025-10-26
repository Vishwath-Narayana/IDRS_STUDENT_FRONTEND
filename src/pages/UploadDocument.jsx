import React from "react";
import { useAlert } from "../components/AlertContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import UploadDocumentForm from "../components/Documents/UploadDocumentForm";

import {
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "../firebaseConfig";

const UploadDocument = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      if (!formData.documentFile) {
        showAlert("Please select a document file.", "error");
        return;
      }

      // Construct a unique Firebase Storage path
      const filePath = `documents/${Date.now()}_${formData.documentFile.name}`;
      const fileRef = ref(storage, filePath);

      // Upload file to Firebase Storage
      const uploadTask = uploadBytesResumable(fileRef, formData.documentFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: show progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          showAlert("Document upload failed", "error");
        },
        async () => {
          // Upload completed
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);

          // Build payload for backend
          const payload = {
            name: formData.name,
            type: formData.type,
            category: formData.category,
            uploadedBy: formData.uploadedBy,
            date: formData.date || new Date().toISOString(),
            documentUrl: downloadURL,
            filePath: filePath, // Needed for deletion later
          };

          // Send metadata to backend
          const response = await axios.post(
            "http://localhost:5001/api/documents/upload",
            payload
          );

          console.log("Document metadata saved:", response.data);
          showAlert("Document uploaded successfully", "success");
          navigate("/logs");
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      showAlert("Document upload failed", "error");
    }
  };

  return (
    <Layout>
      <UploadDocumentForm onSubmit={handleSubmit} />
    </Layout>
  );
};

export default UploadDocument;
