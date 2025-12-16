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
  Tag,
  Zap,
  FolderOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Website {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
  listId: string;
}

interface WebsiteListType { // Renamed from WebsiteList to WebsiteListType
  id: string;
  name: string;
  createdAt: Date;
}

const WebsiteList = ({ 
  websites, 
  setWebsites, 
  lists,
  activeListId 
}: {
  websites: Website[];
  setWebsites: (websites: Website[]) => void;
  lists: WebsiteListType[]; // Using WebsiteListType here
  activeListId: string | null;
}) => {
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
    if (!activeListId) {
      toast({
        title: "No List Selected",
        description: "Please select a list first",
        variant: "destructive",
      });
      return;
    }

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
      listId: activeListId,
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

  const activeList = lists.find(list => list.id === activeListId);
  const filteredWebsites = websites.filter(website => website.listId === activeListId);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mb-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-purple-400">
            <Zap className="h-6 w-6 text-purple-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              {activeList ? activeList.name : "Select a List"}
            </span>
          </CardTitle>
          <p className="text-muted-foreground text-purple-300/70">
            {activeList 
              ? "Add websites to your selected list" 
              : "Please select a list from the manager above"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-purple-300">Website Name</Label>
              <Input
                id="name"
                placeholder="e.g., GitHub"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!activeListId}
                className="bg-gray-800/50 border-purple-500/30 text-purple-100 focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-purple-300">URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={!activeListId}
                className="bg-gray-800/50 border-purple-500/30 text-purple-100 focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-purple-300">Category (Optional)</Label>
              <Input
                id="category"
                placeholder="e.g., Development"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={!activeListId}
                className="bg-gray-800/50 border-purple-500/30 text-purple-100 focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addWebsite} 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.3)] disabled:opacity-50"
                disabled={!activeListId}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Website
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {!activeListId ? (
        <Card className="text-center py-12 bg-gray-900/50 border border-purple-500/20 backdrop-blur-sm">
          <CardContent>
            <FolderOpen className="mx-auto h-12 w-12 text-purple-400/50" />
            <h3 className="mt-4 text-lg font-medium text-purple-300">No List Selected</h3>
            <p className="mt-2 text-purple-300/70">
              Select a list from the manager above to start adding websites
            </p>
          </CardContent>
        </Card>
      ) : filteredWebsites.length === 0 ? (
        <Card className="text-center py-12 bg-gray-900/50 border border-purple-500/20 backdrop-blur-sm">
          <CardContent>
            <Globe className="mx-auto h-12 w-12 text-purple-400/50" />
            <h3 className="mt-4 text-lg font-medium text-purple-300">No websites in this list</h3>
            <p className="mt-2 text-purple-300/70">
              Add your first website using the form above
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWebsites.map((website) => (
            <Card 
              key={website.id} 
              className="hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 hover:-translate-y-1 bg-gray-900/50 border border-gray-700 backdrop-blur-sm"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2 text-purple-300">
                    <div className="bg-purple-900/30 p-2 rounded-lg">
                      <Globe className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="truncate max-w-[140px]">{website.name}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWebsite(website.id, website.name)}
                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-purple-300/70">
                    <Tag className="mr-2 h-4 w-4" />
                    <span className="truncate">{website.category}</span>
                  </div>
                  <div className="flex items-center text-sm text-purple-300/70">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(website.createdAt, "MMM d, yyyy")}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
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