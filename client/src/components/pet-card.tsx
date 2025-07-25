import { PetReport } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Palette, Dog, Cat, Bird } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PetCardProps {
  pet: PetReport;
  onMarkFound?: (petId: string) => void;
  showMarkFound?: boolean;
}

const getPetIcon = (petType: string) => {
  switch (petType) {
    case "dog":
      return Dog;
    case "cat":
      return Cat;
    case "bird":
      return Bird;
    default:
      return Dog;
  }
};

const getStatusColor = (reportType: string, status: string) => {
  if (status === "reunited") return "bg-blue-100 text-blue-800";
  return reportType === "missing" 
    ? "bg-red-600 text-white" 
    : "bg-green-600 text-white";
};

const getStatusText = (reportType: string, status: string) => {
  if (status === "reunited") return "Reunited";
  return reportType === "missing" ? "Missing" : "Found";
};

export default function PetCard({ pet, onMarkFound, showMarkFound = false }: PetCardProps) {
  const PetIcon = getPetIcon(pet.petType);
  const timeAgo = formatDistanceToNow(new Date(pet.createdAt), { addSuffix: true });
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        {pet.photoUrl ? (
          <img 
            src={pet.photoUrl} 
            alt={`${pet.petName || 'Unknown'} - ${pet.petType}`}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <PetIcon className="h-16 w-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-4 left-4">
          <Badge className={getStatusColor(pet.reportType, pet.status)}>
            {getStatusText(pet.reportType, pet.status)}
          </Badge>
        </div>
        
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black bg-opacity-50 text-white text-xs">
            {timeAgo.replace('about ', '')}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900">
            {pet.petName || `Unknown ${pet.petType}`}
          </h3>
          
          {showMarkFound && pet.status === 'active' && onMarkFound && (
            <Button
              size="sm"
              onClick={() => onMarkFound(pet.id)}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-full"
            >
              Mark Found
            </Button>
          )}
          
          {pet.status === 'reunited' && (
            <Badge className="bg-blue-100 text-blue-800 text-xs px-2 py-1">
              Safe
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <PetIcon className="h-4 w-4 mr-2" />
            <span>
              {pet.breed ? `${pet.breed}, ` : ''}
              {pet.age ? pet.age.replace('-', '/') : 'unknown age'}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>
              {pet.reportType === 'missing' ? 'Last seen: ' : 'Found in: '}{pet.location}
            </span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>
              {pet.reportType === 'missing' ? 'Missing since: ' : 'Found: '}
              {new Date(pet.dateTime).toLocaleDateString()} - {new Date(pet.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          {pet.color && (
            <div className="flex items-center">
              <Palette className="h-4 w-4 mr-2" />
              <span>{pet.color}</span>
            </div>
          )}
        </div>
        
        {pet.description && (
          <div className="border-t pt-4 mb-4">
            <p className="text-sm text-gray-700 line-clamp-3">{pet.description}</p>
          </div>
        )}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              <p>Contact: {pet.contactName}</p>
              <p>Phone: {pet.contactPhone}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              {pet.reportType === 'missing' ? 'Full Details' : 'Is This Your Pet?'}
              <span className="ml-1">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
