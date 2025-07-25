import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StatsCard from "@/components/stats-card";
import PetCard from "@/components/pet-card";
import { getStats, getRecentPetReports } from "@/lib/firebase";
import { Search, Plus, Eye, Heart, Info, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['/api/stats'],
    queryFn: getStats,
  });

  const { data: recentReports, isLoading: reportsLoading } = useQuery({
    queryKey: ['/api/recent-reports'],
    queryFn: () => getRecentPetReports(6),
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl p-8 mb-12 text-white overflow-hidden">
        <div className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Reunite Families with Their Beloved Pets
            </h1>
            <p className="text-xl mb-6 opacity-90">
              Cyprus is facing unprecedented wildfires affecting over 120 square kilometers. 
              Many pets are missing or found wandering. Together, we can bring them home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/report">
                <Button className="bg-white text-orange-500 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
                  <Plus className="mr-2 h-5 w-5" />
                  Report a Pet
                </Button>
              </Link>
              <Link href="/missing">
                <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 text-lg font-semibold">
                  <Search className="mr-2 h-5 w-5" />
                  Search Missing Pets
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <Heart className="absolute top-4 right-4 h-24 w-24" />
          <Search className="absolute top-20 right-16 h-16 w-16" />
          <Plus className="absolute bottom-4 right-8 h-20 w-20" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : (
          <>
            <StatsCard
              icon={Search}
              value={stats?.missing || 0}
              label="Missing Pets"
              color="red"
            />
            <StatsCard
              icon={Heart}
              value={stats?.found || 0}
              label="Found Pets"
              color="green"
            />
            <StatsCard
              icon={Plus}
              value={stats?.recent || 0}
              label="Recent Reports"
              color="amber"
            />
            <StatsCard
              icon={Heart}
              value={stats?.reunited || 0}
              label="Reunited"
              color="blue"
            />
          </>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/report">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white p-6 h-auto w-full text-left justify-start">
                <div>
                  <Plus className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Report Missing Pet</h3>
                  <p className="text-orange-100 text-sm">Pet gone missing? Report it immediately</p>
                </div>
              </Button>
            </Link>
            
            <Link href="/report">
              <Button className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto w-full text-left justify-start">
                <div>
                  <Eye className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Report Found Pet</h3>
                  <p className="text-green-100 text-sm">Found a wandering pet? Help reunite</p>
                </div>
              </Button>
            </Link>
            
            <Link href="/missing">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto w-full text-left justify-start">
                <div>
                  <Search className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-lg mb-2">Search Database</h3>
                  <p className="text-blue-100 text-sm">Look through reported pets</p>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Information */}
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-12">
        <div className="flex items-start">
          <Info className="text-amber-500 h-6 w-6 mr-4 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Emergency Pet Resources</h3>
            <p className="text-gray-700 mb-4">
              If you need immediate assistance or found an injured animal, contact these organizations:
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Animal Rescue Cyprus:</strong>{" "}
                <a 
                  href="https://animalrescuecyprus.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  animalrescuecyprus.com <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                {" "}- 24/7 vet team available
              </p>
              <p className="text-gray-700">
                <strong>Cyprus Pride House:</strong>{" "}
                <a 
                  href="https://cypruspridehouse.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center"
                >
                  cypruspridehouse.org <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                {" "}- Troodos Mountain rescue
              </p>
              <p className="text-gray-700">
                <strong>Animal Welfare Commissioner:</strong> Send photos of injured animals for social media awareness
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Reports</h2>
            <Link href="/missing">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700 font-medium">
                View All Reports <span className="ml-1">→</span>
              </Button>
            </Link>
          </div>
          
          {reportsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-96 rounded-xl" />
              ))}
            </div>
          ) : recentReports && recentReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.map((report) => (
                <PetCard key={report.id} pet={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
              <p className="text-gray-600 mb-4">Be the first to report a missing or found pet.</p>
              <Link href="/report">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Report
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Link href="/report">
        <Button className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white w-16 h-16 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
