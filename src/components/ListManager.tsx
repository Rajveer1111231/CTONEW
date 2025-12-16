"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Trash2, 
  Edit3,
  Globe,
  FolderOpen,
  FolderPlus,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteListType { // Renamed from WebsiteList to WebsiteListType
  id: string;
  name: string;
  createdAt: Date;
}

const ListManager = ({ 
  lists, 
  setLists, 
  activeListId, 
  setActiveListId 
}: {
  lists: WebsiteListType[]; // Using WebsiteListType here
  setLists: (lists: WebsiteListType[]) => void; // Using WebsiteListType here
  activeListId: string | null;
  setActiveListId: (id: string) => void;
}) => {
  const [newListName, setNewListName] = useState("");
  const { toast } = useToast();

  const addList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a list name",
        variant: "destructive",
      });
      return;
    }

    const newList: WebsiteListType = { // Using WebsiteListType here
      id: Math.random().toString(36).substring(2, 9),
      name: newListName,
      createdAt: new Date(),
    };

    setLists([...lists, newList]);
    setNewListName("");
    
    toast({
      title: "List Created",
      description: `${newList.name} has been created`,
    });
  };

  const removeList = (id: string, name: string) => {
    // Create a new list array without the deleted list
    const updatedLists = lists.filter(list => list.id !== id);
    setLists(updatedLists);
    
    // If the deleted list was the active list, select a new active list
    if (activeListId === id) {
      // If there are remaining lists, select the first one
      // Otherwise, set activeListId to null (no list selected)
      if (updatedLists.length > 0) {
        setActiveListId(updatedLists[0].id);
      } else {
        setActiveListId("");
      }
    }
    
    toast({
      title: "List Removed",
      description: `${name} has been deleted`,
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mb-8 bg-gradient-to-br from-gray-900 to-gray-950 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-cyan-400">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              SiteManager Pro
            </span>
          </CardTitle>
          <p className="text-muted-foreground text-cyan-300/70">
            Create and organize your website collections
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="listName" className="text-cyan-300">List Name</Label>
              <Input
                id="listName"
                placeholder="e.g., Development Resources"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                className="bg-gray-800/50 border-cyan-500/30 text-cyan-100 focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addList} 
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {lists.length === 0 ? (
        <Card className="text-center py-12 bg-gray-900/50 border border-cyan-500/20 backdrop-blur-sm">
          <CardContent>
            <FolderOpen className="mx-auto h-12 w-12 text-cyan-400/50" />
            <h3 className="mt-4 text-lg font-medium text-cyan-300">No lists created</h3>
            <p className="mt-2 text-cyan-300/70">
              Create your first list using the form above
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <Card 
              key={list.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:-translate-y-1 bg-gray-900/50 border ${
                activeListId === list.id 
                  ? "border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                  : "border-gray-700"
              } backdrop-blur-sm`}
              onClick={() => setActiveListId(list.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2 text-cyan-300">
                    <div className="bg-cyan-900/30 p-2 rounded-lg">
                      <FolderOpen className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="truncate max-w-[140px]">{list.name}</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeList(list.id, list.name);
                    }}
                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-cyan-300/70">
                  <Globe className="mr-2 h-4 w-4" />
                  <span>
                    {list.id === "default" ? "Default list" : "Custom list"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListManager;