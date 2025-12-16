"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/components/AuthContext";

const LoginForm = () => {
  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-950 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <CardHeader className="text-center">
          <CardTitle className="flex flex-col items-center gap-2 text-3xl text-blue-400">
            <Sparkles className="h-8 w-8 text-blue-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
              Welcome to SiteManager Pro
            </span>
          </CardTitle>
          <p className="text-muted-foreground text-blue-300/70 mt-2">
            Log in to access your website collections and tools.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={login} 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Log In as Guest
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            No account needed for guest access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;