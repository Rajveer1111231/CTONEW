// Update this page to include the website list manager with futuristic dark theme
import { MadeWithDyad } from "@/components/made-with-dyad";
import WebsiteList from "@/components/WebsiteList";
import ListManager from "@/components/ListManager";
import ROICalculator from "@/components/ROICalculator";
import useLocalStorage from "@/hooks/use-local-storage";
import { useAuth } from "@/components/AuthContext"; // Import useAuth
import LoginForm from "@/components/LoginForm"; // Import LoginForm
import { Button } from "@/components/ui/button"; // Import Button
import { LogOut } from "lucide-react"; // Import LogOut icon

interface WebsiteType {
  id: string;
  name: string;
  url: string;
  category: string;
  createdAt: Date;
  listId: string;
}

interface WebsiteListType {
  id: string;
  name: string;
  createdAt: Date;
}

const Index = () => {
  const { isLoggedIn, logout } = useAuth(); // Use the auth hook

  // Use useLocalStorage for persistent state
  const [lists, setLists] = useLocalStorage<WebsiteListType[]>("sitemanager-lists", [
    { id: "default", name: "My Websites", createdAt: new Date() }
  ]);
  const [websites, setWebsites] = useLocalStorage<WebsiteType[]>("sitemanager-websites", []);
  const [activeListId, setActiveListId] = useLocalStorage<string | null>("sitemanager-active-list", "default");

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
      
      <div className="container py-8 relative">
        <header className="text-center mb-12 flex justify-between items-center">
          <div className="flex-grow text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                SiteManager Pro
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Professional website organization with futuristic interface
            </p>
            <div className="mt-4 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
          {isLoggedIn && (
            <Button 
              onClick={logout} 
              variant="outline" 
              className="border-red-500/30 text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          )}
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

        <ROICalculator />
        
        <div className="mt-16">
          <MadeWithDyad />
        </div>
      </div>
    </div>
  );
};

export default Index;