// src/pages/Unauthorized.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft, Lock, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent className="p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
          
          {/* Description */}
          <p className="text-gray-600 mb-2 leading-relaxed">
            You need to be logged in to access this page.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Please authenticate to continue to the IDRS Student Portal.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/")}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white gap-2"
            >
              <Lock className="w-4 h-4" />
              Go to Login
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="w-full gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Need help? Contact support at{" "}
              <a href="mailto:support@idrs.edu" className="text-gray-900 hover:underline font-medium">
                support@idrs.edu
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;
