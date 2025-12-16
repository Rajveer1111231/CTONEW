// Update this page to include the website list manager with futuristic dark theme
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
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container py-8 relative">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
              CyberWeb Manager
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Organize and access your favorite websites with our futuristic interface
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
          </div>
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