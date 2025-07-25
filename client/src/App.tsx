import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Home from "@/pages/home";
import Report from "@/pages/report";
import Missing from "@/pages/missing";
import Found from "@/pages/found";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/report" component={Report} />
      <Route path="/missing" component={Missing} />
      <Route path="/found" component={Found} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Router />
          <Toaster />
          
          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-orange-500 rounded mr-3 flex items-center justify-center">
                      ❤️
                    </div>
                    <h3 className="text-xl font-bold">Cyprus Pet Rescue</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Helping reunite families with their beloved pets during the Cyprus wildfire emergency.
                  </p>

                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Emergency Resources</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>
                      <a 
                        href="https://animalrescuecyprus.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange-500 transition-colors"
                      >
                        Animal Rescue Cyprus
                      </a>
                    </li>

                    <li>
                      <a 
                        href="https://takemehome.com.cy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-orange-500 transition-colors"
                      >
                        Take Me Home Cyprus
                      </a>
                    </li>
                    <li>
                      <span className="text-gray-300">
                        Animal Welfare Commissioner
                      </span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact & Support</h4>
                  <p className="text-gray-300 mb-2">For website issues or urgent pet emergencies:</p>
                  <p className="text-gray-300">Email: help@cyprusperrescue.org</p>
                  <p className="text-gray-300">Emergency: Contact local animal rescue directly</p>
                </div>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2025 Cyprus Pet Rescue. Created during wildfire emergency to help reunite families with their pets.</p>
              </div>
            </div>
          </footer>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
