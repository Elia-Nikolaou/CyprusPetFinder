import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { insertPetReportSchema, InsertPetReport } from "@shared/schema";
import { createPetReport } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Heart, Camera, Search, Eye, Loader2 } from "lucide-react";

const reportFormSchema = insertPetReportSchema.extend({
  dateTime: insertPetReportSchema.shape.dateTime.refine(
    (val) => new Date(val) <= new Date(),
    { message: "Date cannot be in the future" }
  ),
});

export default function Report() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  const form = useForm<InsertPetReport>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: {
      reportType: "missing",
      petName: "",
      petType: "dog",
      breed: "",
      age: "unknown",
      color: "",
      size: "medium",
      location: "",
      dateTime: "",
      description: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      status: "active",
    },
  });

  const createReportMutation = useMutation({
    mutationFn: async (data: InsertPetReport) => {
      return await createPetReport(data, photoFile || undefined);
    },
    onSuccess: () => {
      toast({
        title: "Report submitted successfully!",
        description: "Your pet report has been added to our database.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/recent-reports'] });
      queryClient.invalidateQueries({ queryKey: ['/api/pet-reports'] });
      
      const reportType = form.getValues('reportType');
      setLocation(reportType === 'missing' ? '/missing' : '/found');
    },
    onError: (error) => {
      toast({
        title: "Error submitting report",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a photo under 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: InsertPetReport) => {
    createReportMutation.mutate(data);
  };

  const reportType = form.watch("reportType");

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <Heart className="text-orange-500 h-12 w-12 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Report a Pet</h1>
            <p className="text-gray-600">Help us reunite families by reporting missing or found pets</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Report Type */}
              <FormField
                control={form.control}
                name="reportType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Report Type</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value="missing"
                            checked={field.value === "missing"}
                            onChange={() => field.onChange("missing")}
                            className="sr-only peer"
                          />
                          <div className="border-2 border-gray-200 peer-checked:border-orange-500 peer-checked:bg-orange-50 rounded-lg p-4 text-center transition-colors">
                            <Search className="h-8 w-8 text-gray-400 peer-checked:text-orange-500 mx-auto mb-2" />
                            <p className="font-medium text-gray-700">Missing Pet</p>
                            <p className="text-sm text-gray-500">My pet is missing</p>
                          </div>
                        </label>
                        <label className="cursor-pointer">
                          <input
                            type="radio"
                            value="found"
                            checked={field.value === "found"}
                            onChange={() => field.onChange("found")}
                            className="sr-only peer"
                          />
                          <div className="border-2 border-gray-200 peer-checked:border-green-500 peer-checked:bg-green-50 rounded-lg p-4 text-center transition-colors">
                            <Eye className="h-8 w-8 text-gray-400 peer-checked:text-green-500 mx-auto mb-2" />
                            <p className="font-medium text-gray-700">Found Pet</p>
                            <p className="text-sm text-gray-500">I found a pet</p>
                          </div>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Pet Photo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pet Photo</label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('pet-photo')?.click()}
                >
                  {photoPreview ? (
                    <div className="space-y-2">
                      <img src={photoPreview} alt="Pet preview" className="h-32 w-32 object-cover rounded-lg mx-auto" />
                      <p className="text-sm text-gray-600">Click to change photo</p>
                    </div>
                  ) : (
                    <>
                      <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 mb-1">Click to upload a photo</p>
                      <p className="text-sm text-gray-500">JPG, PNG up to 10MB</p>
                    </>
                  )}
                  <input
                    type="file"
                    id="pet-photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Pet Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="petName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Max, Bella, Unknown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="petType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pet type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="bird">Bird</SelectItem>
                          <SelectItem value="rabbit">Rabbit</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Golden Retriever, Mixed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (approximate)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="puppy-kitten">Puppy/Kitten (0-1 year)</SelectItem>
                          <SelectItem value="young">Young (1-3 years)</SelectItem>
                          <SelectItem value="adult">Adult (3-7 years)</SelectItem>
                          <SelectItem value="senior">Senior (7+ years)</SelectItem>
                          <SelectItem value="unknown">Unknown</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color/Markings</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Brown and white, Black stripes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="small">Small (under 25 lbs)</SelectItem>
                          <SelectItem value="medium">Medium (25-60 lbs)</SelectItem>
                          <SelectItem value="large">Large (60-100 lbs)</SelectItem>
                          <SelectItem value="extra-large">Extra Large (100+ lbs)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Information */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Limassol, near Malia village" {...field} />
                    </FormControl>
                    <p className="text-sm text-gray-500">
                      Where was the pet {reportType === 'missing' ? 'last seen' : 'found'}?
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date & Time *</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Additional Details */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Any special characteristics, medical conditions, behavior, or circumstances..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <h3 className="font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input type="tel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={createReportMutation.isPending}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 font-semibold"
                >
                  {createReportMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Submit Report
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  className="flex-1 py-3 px-6 font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
