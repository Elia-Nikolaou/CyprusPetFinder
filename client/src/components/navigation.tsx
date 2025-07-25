import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", id: "home" },
    { path: "/report", label: "Report Pet", id: "report" },
    { path: "/missing", label: "Missing Pets", id: "missing" },
    { path: "/found", label: "Found Pets", id: "found" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-sm font-medium">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Active Wildfire Emergency in Cyprus - 14 villages evacuated, pets urgently need help
        </div>
      </div>

      {/* Navigation Header */}
      <nav className="bg-white shadow-lg border-b-2 border-orange-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="text-orange-500 h-6 w-6 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Cyprus Pet Rescue</h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.id} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-orange-500 border-b-2 border-orange-500 rounded-none"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link key={item.id} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`block w-full text-left px-3 py-2 text-base font-medium ${
                      isActive(item.path)
                        ? "text-orange-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
