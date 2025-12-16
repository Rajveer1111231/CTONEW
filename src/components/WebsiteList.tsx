"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ExternalLink, 
  Plus, 
  Trash2, 
  Globe, 
  Search,
  Calendar,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Website {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
}

const WebsiteList = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const { toast } = useToast();

  const validateUrl = (urlString: string) => {
    try {
      const urlObj = new URL(urlString);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const addWebsite = () => {
    if (!name.trim() || !url.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter both name and URL",
        variant: "destructive",
      });
      return;
    }

    if (!validateUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (include http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    const newWebsite: Website = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      url,
      category: category || "General",
      createdAt: new Date(),
    };

    setWebsites([...websites, newWebsite]);
    setName("");
    setUrl("");
    setCategory("");
    
    toast({
      title: "Website Added",
      description: `${name} has been added to your list`,
    });
  };

  const removeWebsite = (id: string, name: string) => {
    setWebsites(websites.filter(website => website.id !== id));
    toast({
      title: "Website Removed",
      description: `${name} has been removed from your list`,
    });
  };

  const openWebsite = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Globe className="h-6 w-6 text-blue-500" />
            Website Manager
          </CardTitle>
          <p className="text-muted-foreground">
            Add and manage your favorite websites
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Website Name</Label>
              <Input
                id="name"
                placeholder="e.g., GitHub"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Input
                id="category"
                placeholder="e.g., Development"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addWebsite} 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {websites.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Globe className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No websites added</h3>
            <p className="mt-2 text-muted-foreground">
              Add your first website using the form above
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {websites.map((website) => (
            <Card 
              key={website.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                      <Globe className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                    </div>
                    <span className="truncate max-w-[140px]">{website.name}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWebsite(website.id, website.name)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="mr-2 h-4 w-4" />
                    <span className="truncate">{website.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(website.createdAt, "MMM d, yyyy")}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => openWebsite(website.url)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebsiteList;