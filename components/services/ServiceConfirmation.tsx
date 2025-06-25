'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { services } from '@/lib/data/services';
import { getTechniciansByService } from '@/lib/data/technicians';
import { Calendar, Clock, Phone, Star, User } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
}

export default function ServiceConfirmation() {
  const [selectedService, setSelectedService] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    preferredDate: '',
    preferredTime: '',
  });

  const selectedServiceData = services.find((s) => s.id === selectedService);
  const availableTechnicians = selectedService ? getTechniciansByService(selectedService) : [];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedServiceData) return alert('Please select a service first.');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedService,
          selectedTechnician,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Booking berhasil!');
        const params = new URLSearchParams({
          service: selectedServiceData.title,
          price: selectedServiceData.basePrice.toString(),
          technician: selectedTechnician || 'Professional Technician',
          date: `${formData.preferredDate} at ${formData.preferredTime}`,
          address: `${formData.address}, ${formData.city}`,
          bookingId: result.data._id,
        });

        window.location.href = `/payment?${params.toString()}`;
      } else {
        alert('Failed to create booking. Please try again.');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Selection & Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Select Service & Provide Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="service">Choose Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title} - Rp {service.basePrice.toLocaleString('id-ID')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Service Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter the complete address"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Problem Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe the issue in detail"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter your city"
                      required
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={!selectedService || !formData.name}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Confirm Booking & Proceed to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Service Details & Technicians */}
          <div className="space-y-6">
            {selectedServiceData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <selectedServiceData.icon className="h-5 w-5 mr-2" />
                    {selectedServiceData.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{selectedServiceData.longDescription}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      {selectedServiceData.duration}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-primary">Rp {selectedServiceData.basePrice.toLocaleString('id-ID')}</span>
                      <span className="text-muted-foreground ml-1">starting</span>
                    </div>
                  </div>

                  {selectedServiceData.emergencyAvailable && (
                    <Badge variant="destructive" className="w-fit">
                      24/7 Emergency Available
                    </Badge>
                  )}

                  <div>
                    <h4 className="font-semibold mb-2">Service Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {selectedServiceData.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="h-3 w-3 mr-2 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {availableTechnicians.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Available Technicians</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {availableTechnicians.slice(0, 3).map((tech) => (
                    <div key={tech.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-white">{tech.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold">{tech.name}</div>
                        <div className="text-sm text-muted-foreground">{tech.experience} experience</div>
                        <div className="flex items-center text-sm">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          {tech.rating} ({tech.completedJobs} jobs)
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">Rp {tech.hourlyRate.toLocaleString('id-ID')}/hr</div>
                        <Badge variant="secondary" className="text-xs">Available</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
