// Update this page to include the website list manager
import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import WebsiteList from "@/components/WebsiteList";
import ListManager from "@/components/ListManager";

interface Website {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
  listId: string;
}

interface WebsiteList {
  id: string;
  name: string;
  createdAt: Date;
}

const Index = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [lists, setLists] = useState<WebsiteList[]>([
    { id: "default", name: "My Websites", createdAt: new Date() }
  ]);
  const [activeListId, setActiveListId] = useState<string | null>("default");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50/30 dark:to-blue-950/10">
      <div className="container py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Website Manager
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Organize and access your favorite websites in one place
          </p>
        </header>
        
        <ListManager 
          lists={lists} 
          setLists={setLists} 
          activeListId={activeListId} 
          setActiveListId={setActiveListId} 
        />
        
        <WebsiteList 
          websites={websites} 
          setWebsites={setWebsites} 
          lists={lists}
          activeListId={activeListId} 
        />
        
        <div className="mt-16">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;