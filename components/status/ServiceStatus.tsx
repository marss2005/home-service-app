'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Clock, MapPin, Phone, MessageCircle, CheckCircle, AlertCircle, Calendar, CreditCard, User, Star, Download, Receipt } from 'lucide-react';
import Link from 'next/link';

const statusConfig = {
  'confirmed': { color: 'bg-blue-500', label: 'Payment Confirmed', icon: CheckCircle, progress: 25 },
  'scheduled': { color: 'bg-blue-500', label: 'Scheduled', icon: Calendar, progress: 40 },
  'in-progress': { color: 'bg-yellow-500', label: 'In Progress', icon: AlertCircle, progress: 70 },
  'completed': { color: 'bg-green-500', label: 'Completed', icon: CheckCircle, progress: 100 },
};

export default function ServiceStatus() {
  const searchParams = useSearchParams();
  const [searchId, setSearchId] = useState('');
  const [serviceData, setServiceData] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    // Get data from URL parameters (from payment page)
    const service = searchParams.get('service');
    const price = searchParams.get('price');
    const technician = searchParams.get('technician');
    const date = searchParams.get('date');
    const address = searchParams.get('address');
    const method = searchParams.get('method');
    const status = searchParams.get('status');

    if (service && price) {
      // Generate service ID
      const serviceId = `SRV-${Date.now().toString().slice(-6)}`;
      
      // For demo purposes, simulate different statuses based on time
      const currentStatus = status || 'completed'; // Default to completed for demo
      
      // Create service data from payment info
      const newServiceData = {
        id: serviceId,
        service: service,
        status: currentStatus,
        progress: statusConfig[currentStatus as keyof typeof statusConfig].progress,
        technician: {
          name: technician || 'Ahmad Rizki',
          phone: '(021) 7542-8899',
          avatar: technician ? technician.split(' ').map(n => n[0]).join('').toUpperCase() : 'AR',
          rating: 4.9,
          experience: '5+ years',
        },
        scheduledDate: date ? date.split(' at ')[0] : new Date().toLocaleDateString('en-US'),
        scheduledTime: date ? date.split(' at ')[1] : '09:00 AM',
        completedDate: currentStatus === 'completed' ? new Date().toLocaleDateString('en-US') : null,
        completedTime: currentStatus === 'completed' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : null,
        address: address || 'Customer Address',
        estimatedCompletion: currentStatus === 'completed' ? 'Completed' : '2-3 hours',
        totalPrice: parseFloat(price || '0'),
        paymentMethod: method || 'shopeepay',
        warranty: '30 days',
        invoice: `INV-${Date.now().toString().slice(-8)}`,
        updates: [
          { 
            time: '08:30 AM', 
            message: `Payment confirmed via ${method || 'ShopeePay'}`,
            status: 'confirmed'
          },
          { 
            time: '08:35 AM', 
            message: 'Service booking confirmed',
            status: 'confirmed'
          },
          { 
            time: '09:00 AM', 
            message: 'Technician Ahmad Rizki assigned and on the way',
            status: 'scheduled'
          },
          { 
            time: '09:30 AM', 
            message: 'Technician arrived and started service',
            status: 'in-progress'
          },
          ...(currentStatus === 'completed' ? [
            { 
              time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), 
              message: `${service} completed successfully`,
              status: 'completed'
            }
          ] : []),
        ],
        completionDetails: currentStatus === 'completed' ? {
          workDone: [
            'Thorough inspection and diagnosis',
            'Professional service completion',
            'Quality testing and verification',
            'Clean-up and final check'
          ],
          beforePhoto: '/placeholder-before.jpg',
          afterPhoto: '/placeholder-after.jpg',
          notes: 'Service completed according to standards. All components tested and working properly.',
        } : null,
      };
      
      setServiceData(newServiceData);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (searchId === serviceData?.id) {
      // Service found
    } else {
      setServiceData(null);
    }
  };

  const handleRatingSubmit = () => {
    // In real app, this would submit to API
    alert(`Thank you for your ${rating}-star rating and review!`);
  };

  const displayService = searchId ? (searchId === serviceData?.id ? serviceData : null) : serviceData;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <CardHeader>
              <CardTitle>Track Your Service</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder={serviceData ? `Enter service ID (e.g., ${serviceData.id})` : "Enter service ID"}
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </CardContent>
          </Card>

          {/* Service Status Card */}
          {displayService && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{displayService.service}</CardTitle>
                    <p className="text-sm text-muted-foreground">Service ID: {displayService.id}</p>
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`${statusConfig[displayService.status as keyof typeof statusConfig].color} text-white`}
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {statusConfig[displayService.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Service Progress</span>
                    <span>{displayService.progress}%</span>
                  </div>
                  <Progress value={displayService.progress} className="h-2" />
                </div>

                {/* Payment Info */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-semibold text-green-800">Payment Confirmed</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-800">
                        Rp {displayService.totalPrice.toLocaleString('id-ID')}
                      </div>
                      <div className="text-sm text-green-600 capitalize">
                        via {displayService.paymentMethod}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        {displayService.status === 'completed' 
                          ? `Completed: ${displayService.completedDate} at ${displayService.completedTime}`
                          : `Scheduled: ${displayService.scheduledDate} at ${displayService.scheduledTime}`
                        }
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span>{displayService.address}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span>
                        {displayService.status === 'completed' 
                          ? `Duration: 2.5 hours` 
                          : `Est. completion: ${displayService.estimatedCompletion}`
                        }
                      </span>
                    </div>
                    {displayService.status === 'completed' && (
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        <span className="text-green-600">Warranty: {displayService.warranty}</span>
                      </div>
                    )}
                  </div>

                  {/* Technician Info */}
                  <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {displayService.technician.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{displayService.technician.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {displayService.technician.experience} • ⭐ {displayService.technician.rating}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Completion Details - Only for completed services */}
                {displayService.status === 'completed' && displayService.completionDetails && (
                  <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Service Completed Successfully
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Work Completed:</h5>
                        <ul className="text-sm space-y-1">
                          {displayService.completionDetails.workDone.map((work: string, index: number) => (
                            <li key={index} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-green-600" />
                              {work}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Technician Notes:</h5>
                        <p className="text-sm text-muted-foreground">
                          {displayService.completionDetails.notes}
                        </p>
                      </div>
                    </div>

                    {/* Invoice & Receipt */}
                    <div className="flex items-center justify-between pt-3 border-t border-green-200">
                      <span className="text-sm">Invoice: {displayService.invoice}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </div>
                )}

                {/* Recent Updates */}
                <div className="space-y-3">
                  <h4 className="font-semibold">Service Timeline</h4>
                  <div className="space-y-3">
                    {displayService.updates.map((update: any, index: number) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                          update.status === 'completed' ? 'bg-green-500' :
                          update.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{update.message}</p>
                            <span className="text-muted-foreground text-xs">{update.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating & Review - Only for completed services */}
                {displayService.status === 'completed' && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800">Rate Your Experience</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Rating:</span>
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className={`h-6 w-6 ${
                                star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              <Star className="h-full w-full" />
                            </button>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {rating > 0 && `${rating}/5 stars`}
                        </span>
                      </div>
                      
                      <textarea
                        placeholder="Share your experience with this service..."
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none"
                        rows={3}
                      />
                      
                      <Button 
                        onClick={handleRatingSubmit}
                        disabled={rating === 0}
                        className="w-full"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4 border-t">
                  {displayService.status === 'completed' ? (
                    <>
                      <Button variant="outline" size="sm">
                        <Receipt className="h-4 w-4 mr-2" />
                        Download Invoice
                      </Button>
                      <Link href="/services/confirm">
                        <Button size="sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Again
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Support
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message Technician
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Support: (021) 7542-8899
                      </Button>
                      <Link href={`/completed?service=${encodeURIComponent(displayService.service)}&price=${displayService.totalPrice}&technician=${encodeURIComponent(displayService.technician.name)}&date=${encodeURIComponent(displayService.scheduledDate)}&address=${encodeURIComponent(displayService.address)}&method=${displayService.paymentMethod}&status=completed`}>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Completed
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Service Found */}
          {!displayService && searchId && (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Service Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find a service with ID "{searchId}". Please check the ID and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Welcome Message for new bookings */}
          {!displayService && !searchId && (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Welcome to Service Tracking</h3>
                <p className="text-muted-foreground">
                  Use the search box above to track your service status, or your service details will appear here after booking.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}