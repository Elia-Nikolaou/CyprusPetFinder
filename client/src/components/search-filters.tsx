import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
  resultCount: number;
  searchValue: string;
  typeValue: string;
  locationValue: string;
  dateValue: string;
  type: "missing" | "found";
}

export default function SearchFilters({
  onSearchChange,
  onTypeChange,
  onLocationChange,
  onDateChange,
  onReset,
  resultCount,
  searchValue,
  typeValue,
  locationValue,
  dateValue,
  type,
}: SearchFiltersProps) {
  const primaryColor = type === "missing" ? "focus:ring-orange-500" : "focus:ring-green-500";
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Pet name, breed, location..."
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className={`pl-10 ${primaryColor} focus:border-transparent`}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pet Type</label>
          <Select value={typeValue} onValueChange={onTypeChange}>
            <SelectTrigger className={primaryColor}>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="dog">Dogs</SelectItem>
              <SelectItem value="cat">Cats</SelectItem>
              <SelectItem value="bird">Birds</SelectItem>
              <SelectItem value="rabbit">Rabbits</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Select value={locationValue} onValueChange={onLocationChange}>
            <SelectTrigger className={primaryColor}>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              <SelectItem value="limassol">Limassol</SelectItem>
              <SelectItem value="paphos">Paphos</SelectItem>
              <SelectItem value="troodos">Troodos Mountains</SelectItem>
              <SelectItem value="nicosia">Nicosia</SelectItem>
              <SelectItem value="larnaca">Larnaca</SelectItem>
              <SelectItem value="famagusta">Famagusta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <Select value={dateValue} onValueChange={onDateChange}>
            <SelectTrigger className={primaryColor}>
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{resultCount}</span> {type} pets
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className={`text-sm font-medium ${
            type === "missing" ? "text-orange-500 hover:text-orange-600" : "text-green-500 hover:text-green-600"
          }`}
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
