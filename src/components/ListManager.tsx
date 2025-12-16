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
  FolderPlus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebsiteList {
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
  lists: WebsiteList[];
  setLists: (lists: WebsiteList[]) => void;
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

    const newList: WebsiteList = {
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
    setLists(lists.filter(list => list.id !== id));
    if (activeListId === id) {
      setActiveListId(lists.length > 1 ? lists[0].id : "");
    }
    toast({
      title: "List Removed",
      description: `${name} has been deleted`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <FolderPlus className="h-6 w-6 text-indigo-500" />
            Manage Lists
          </CardTitle>
          <p className="text-muted-foreground">
            Create and organize your website collections
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="listName">List Name</Label>
              <Input
                id="listName"
                placeholder="e.g., Development Resources"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={addList} 
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create List
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {lists.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No lists created</h3>
            <p className="mt-2 text-muted-foreground">
              Create your first list using the form above
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <Card 
              key={list.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                activeListId === list.id 
                  ? "ring-2 ring-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" 
                  : ""
              }`}
              onClick={() => setActiveListId(list.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                      <FolderOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-300" />
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
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
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