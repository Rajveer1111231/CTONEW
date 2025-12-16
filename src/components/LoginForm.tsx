"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label
import { LogIn, Sparkles, Mail, Lock } from "lucide-react"; // Import Mail and Lock icons
import { useAuth } from "@/components/AuthContext";
import { useToast } from "@/hooks/use-toast"; // Import useToast for feedback

const LoginForm = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      toast({
        title: "Login Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Basic email format validation (client-side only)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Login Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you'd send these credentials to a backend for verification.
    // For this simulated client-side login, we just "log in" if inputs are present.
    login(email);
    toast({
      title: "Login Successful",
      description: `Welcome, ${email}!`,
    });
  };

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
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-blue-300">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-800/50 border-blue-500/30 text-blue-100 focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-blue-300">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-800/50 border-blue-500/30 text-blue-100 focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
          <Button 
            onClick={handleLogin} 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <p className="text-sm text-gray-500 mt-4 text-center">
            This is a client-side simulated login. Data is stored locally in your browser.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;