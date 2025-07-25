import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchPetReports } from "@/lib/firebase";
import PetCard from "@/components/pet-card";
import SearchFilters from "@/components/search-filters";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export default function Found() {
  const [filters, setFilters] = useState({
    search: "",
    petType: "all",
    location: "all",
    dateRange: "all",
  });

  const { data: foundPets, isLoading } = useQuery({
    queryKey: ['/api/found-pets', filters],
    queryFn: () => searchPetReports('found', filters),
  });

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, petType: value }));
  };

  const handleLocationChange = (value: string) => {
    setFilters(prev => ({ ...prev, location: value }));
  };

  const handleDateChange = (value: string) => {
    setFilters(prev => ({ ...prev, dateRange: value }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      petType: "all",
      location: "all",
      dateRange: "all",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Found Pets</h1>
        <p className="text-gray-600">These pets have been found wandering and are looking for their families</p>
      </div>

      <SearchFilters
        onSearchChange={handleSearchChange}
        onTypeChange={handleTypeChange}
        onLocationChange={handleLocationChange}
        onDateChange={handleDateChange}
        onReset={handleReset}
        resultCount={foundPets?.length || 0}
        searchValue={filters.search}
        typeValue={filters.petType}
        locationValue={filters.location}
        dateValue={filters.dateRange}
        type="found"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-xl" />
          ))}
        </div>
      ) : foundPets && foundPets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          {foundPets.length >= 12 && (
            <div className="text-center mt-12">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 font-semibold">
                Load More Found Pets
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <Eye className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {Object.values(filters).some(v => v) ? "No found pets match your search" : "No found pets reported yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {Object.values(filters).some(v => v) 
              ? "Try adjusting your search filters to find more results."
              : "When pets are found wandering, they will appear here."
            }
          </p>
          {Object.values(filters).some(v => v) ? (
            <Button onClick={handleReset} variant="outline">
              Clear Filters
            </Button>
          ) : (
            <Link href="/report">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Report Found Pet
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Floating Action Button */}
      <Link href="/report">
        <Button className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white w-16 h-16 rounded-full shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
