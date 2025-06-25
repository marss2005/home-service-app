'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Star, Download, MessageCircle, Calendar, MapPin, CheckCircle, Receipt, Phone } from 'lucide-react';
import Link from 'next/link';

interface Service {
	id: string;
	service: string;
	completedDate: string;
	completedTime: string;
	technician: {
		name: string;
		avatar: string;
		rating: number;
		experience: string;
	};
	address: string;
	duration: string;
	invoice: {
		subtotal: number;
		tax: number;
		total: number;
		items: Array<{
			description: string;
			amount: number;
		}>;
	};
	paymentMethod: string;
	warranty: string;
	rating: number | null;
	feedback: string;
	beforeAfterPhotos: boolean;
	workDone: string[];
}

export default function ServiceCompleted() {
	const searchParams = useSearchParams();
	const [services, setServices] = useState<Service[]>([]);
	const [feedbackText, setFeedbackText] = useState('');
	const [selectedRating, setSelectedRating] = useState(0);

	useEffect(() => {
		// Check if there's a new completed service from status page
		const service = searchParams?.get('service');
		const price = searchParams?.get('price');
		const technician = searchParams?.get('technician');
		const date = searchParams?.get('date');
		const address = searchParams?.get('address');
		const method = searchParams?.get('method');
		const status = searchParams?.get('status');

		if (service && price && status === 'completed') {
			const serviceId = `SRV-${Date.now().toString().slice(-6)}`;

			const newCompletedService = {
				id: serviceId,
				service: service,
				completedDate: new Date().toLocaleDateString('en-US'),
				completedTime: new Date().toLocaleTimeString('en-US', {
					hour: '2-digit',
					minute: '2-digit',
				}),
				technician: {
					name: technician || 'Ahmad Rizki',
					avatar: technician
						? technician.split(' ').map((n) => n[0]).join('').toUpperCase()
						: 'AR',
					rating: 4.9,
					experience: '5+ years',
				},
				address: address || 'Customer Address',
				duration: getDurationByService(service),
				invoice: {
					subtotal: parseFloat(price) - parseFloat(price) * 0.1,
					tax: parseFloat(price) * 0.1,
					total: parseFloat(price),
					items: [
						{
							description: service,
							amount: parseFloat(price) - parseFloat(price) * 0.1,
						},
						{ description: 'Tax & Fees (10%)', amount: parseFloat(price) * 0.1 },
					],
				},
				paymentMethod: method || 'shopeepay',
				warranty: '30 days',
				rating: null,
				feedback: '',
				beforeAfterPhotos:
					service.toLowerCase().includes('renovation') ||
					service.toLowerCase().includes('repair'),
				workDone: getWorkDoneByService(service),
			};

			// Set only the new service, not adding to existing ones
			setServices([newCompletedService]);
		}
	}, [searchParams]);

	const getDurationByService = (service: string): string => {
		const serviceLower = service.toLowerCase();
		if (serviceLower.includes('renovation') || serviceLower.includes('bathroom'))
			return '3 days';
		if (serviceLower.includes('electrical') || serviceLower.includes('plumbing'))
			return '4-6 hours';
		if (serviceLower.includes('ac')) return '2 hours';
		if (serviceLower.includes('electronic')) return '3-4 hours';
		return '2-3 hours';
	};

	const getWorkDoneByService = (service: string): string[] => {
		const serviceLower = service.toLowerCase();
		if (serviceLower.includes('ac')) {
			return [
				'Complete AC cleaning and maintenance',
				'Filter replacement and cleaning',
				'Coolant level check and refill',
				'Performance testing and verification',
			];
		}
		if (serviceLower.includes('electrical')) {
			return [
				'Electrical system inspection',
				'Wiring repair and replacement',
				'Safety testing and verification',
				'Clean-up and final check',
			];
		}
		if (serviceLower.includes('plumbing')) {
			return [
				'Plumbing system diagnosis',
				'Pipe repair or replacement',
				'Water pressure testing',
				'Quality assurance check',
			];
		}
		if (serviceLower.includes('bathroom')) {
			return [
				'Complete bathroom renovation',
				'New tiles and fixtures installation',
				'Plumbing system upgrade',
				'Quality testing and cleanup',
			];
		}
		return [
			'Thorough inspection and diagnosis',
			'Professional service completion',
			'Quality testing and verification',
			'Clean-up and final check',
		];
	};

	const handleRatingSubmit = async (serviceId: string, rating: number, feedback: string) => {
		try {
			// Ambil data service untuk rating
			const service = services.find(s => s.id === serviceId);
			
			if (!service) {
				alert('Service not found!');
				return;
			}

			const response = await fetch('/api/ratings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					serviceId: serviceId,
					customerName: 'Customer Name', // Bisa ambil dari localStorage atau context
					customerEmail: 'customer@email.com', // Bisa ambil dari localStorage atau context
					technicianName: service.technician?.name || 'Unknown Technician',
					serviceName: service.service,
					rating: rating,
					feedback: feedback,
				}),
			});

			const result = await response.json();

			if (result.success) {
				// Update UI state
				setServices((prev) =>
					prev.map((service) =>
						service.id === serviceId ? { ...service, rating, feedback } : service
					)
				);
				setSelectedRating(0);
				setFeedbackText('');
				alert(`Thank you for your ${rating}-star rating! Your feedback has been saved to database.`);
			} else {
				alert('Failed to submit rating: ' + result.message);
			}
		} catch (error) {
			console.error('Error submitting rating:', error);
			alert('An error occurred while submitting your rating.');
		}
	};

	const downloadInvoice = (serviceId: string) => {
		console.log('Downloading invoice for:', serviceId);
		alert('Invoice download started!');
	};

	return (
		<section className="py-12">
			<div className="container mx-auto px-4 max-w-4xl">
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Completed Services</h1>
					<p className="text-muted-foreground">
						View your completed service details and manage reviews
					</p>
				</div>

				<div className="space-y-8">
					{services.map((service) => (
						<Card key={service.id} className="overflow-hidden">
							<CardHeader className="bg-green-50 border-b">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="text-xl flex items-center">
											<CheckCircle className="h-5 w-5 mr-2 text-green-600" />
											{service.service}
										</CardTitle>
										<p className="text-sm text-muted-foreground">
											Service ID: {service.id} • Completed on{' '}
											{service.completedDate} at {service.completedTime}
										</p>
									</div>
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-800"
									>
										<CheckCircle className="h-3 w-3 mr-1" />
										Completed
									</Badge>
								</div>
							</CardHeader>

							<CardContent className="p-6 space-y-6">
								{/* Service Details */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="space-y-3">
										<h4 className="font-semibold">Service Details</h4>
										<div className="space-y-2 text-sm">
											<div className="flex items-center">
												<Calendar className="h-4 w-4 mr-2 text-primary" />
												<span>Duration: {service.duration}</span>
											</div>
											<div className="flex items-center">
												<MapPin className="h-4 w-4 mr-2 text-primary" />
												<span>{service.address}</span>
											</div>
											<div className="flex items-center">
												<CheckCircle className="h-4 w-4 mr-2 text-green-600" />
												<span>Warranty: {service.warranty}</span>
											</div>
										</div>
									</div>

									{/* Technician Info */}
									<div className="space-y-3">
										<h4 className="font-semibold">Technician</h4>
										<div className="flex items-center space-x-3">
											<Avatar>
												<AvatarFallback className="bg-primary text-white">
													{service.technician.avatar}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className="font-semibold">{service.technician.name}</div>
												<div className="flex items-center text-sm text-muted-foreground">
													<Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
													{service.technician.rating} •{' '}
													{service.technician.experience}
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Work Done */}
								<div className="space-y-3">
									<h4 className="font-semibold">Work Completed</h4>
									<ul className="space-y-2">
										{service.workDone.map((work: string, index: number) => (
											<li key={index} className="flex items-center text-sm">
												<CheckCircle className="h-4 w-4 mr-2 text-green-600" />
												{work}
											</li>
										))}
									</ul>
								</div>

								{/* Invoice */}
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<h4 className="font-semibold">Invoice</h4>
										<Button
											variant="outline"
											size="sm"
											onClick={() => downloadInvoice(service.id)}
										>
											<Download className="h-4 w-4 mr-2" />
											Download PDF
										</Button>
									</div>

									<div className="bg-muted/50 rounded-lg p-4 space-y-2">
										{service.invoice.items.map((item: any, index: number) => (
											<div key={index} className="flex justify-between text-sm">
												<span>{item.description}</span>
												<span>Rp {item.amount.toLocaleString('id-ID')}</span>
											</div>
										))}
										<Separator />
										<div className="flex justify-between font-semibold">
											<span>Total Paid</span>
											<span>Rp {service.invoice.total.toLocaleString('id-ID')}</span>
										</div>
										<div className="text-xs text-muted-foreground">
											Payment method: {service.paymentMethod.toUpperCase()}
										</div>
									</div>
								</div>

								{/* Rating & Feedback */}
								<div className="space-y-4">
									<h4 className="font-semibold">Rate This Service</h4>

									{service.rating ? (
										<div className="bg-green-50 p-4 rounded-lg">
											<div className="flex items-center space-x-2 mb-2">
												<span className="text-sm font-medium">Your Rating:</span>
												{[...Array(5)].map((_, i) => (
													<Star
														key={i}
														className={`h-4 w-4 ${
															i < service.rating!
																? 'fill-yellow-400 text-yellow-400'
																: 'text-gray-300'
														}`}
													/>
												))}
												<span className="text-sm text-muted-foreground">
													({service.rating}/5)
												</span>
											</div>
											{service.feedback && (
												<p className="text-sm text-muted-foreground italic">
													"{service.feedback}"
												</p>
											)}
										</div>
									) : (
										<div className="space-y-3">
											<div className="flex items-center space-x-1">
												{[...Array(5)].map((_, i) => (
													<button
														key={i}
														onClick={() => setSelectedRating(i + 1)}
														className="p-1"
													>
														<Star
															className={`h-6 w-6 transition-colors ${
																i < selectedRating
																	? 'fill-yellow-400 text-yellow-400'
																	: 'text-gray-300 hover:text-yellow-400'
															}`}
														/>
													</button>
												))}
												{selectedRating > 0 && (
													<span className="text-sm text-muted-foreground ml-2">
														{selectedRating}/5 stars
													</span>
												)}
											</div>

											<Textarea
												placeholder="Share your experience with this service..."
												value={feedbackText}
												onChange={(e) => setFeedbackText(e.target.value)}
												rows={3}
											/>

											<Button
												onClick={() =>
													handleRatingSubmit(service.id, selectedRating, feedbackText)
												}
												disabled={selectedRating === 0}
											>
												Submit Rating
											</Button>
										</div>
									)}
								</div>

								{/* Action Buttons */}
								<div className="flex flex-wrap gap-3 pt-4 border-t">
									<Button variant="outline" size="sm">
										<Receipt className="h-4 w-4 mr-2" />
										Download Receipt
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
									{service.beforeAfterPhotos && (
										<Button variant="outline" size="sm">
											<CheckCircle className="h-4 w-4 mr-2" />
											View Photos
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					))}

					{services.length === 0 && (
						<Card>
							<CardContent className="text-center py-12">
								<CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
								<h3 className="text-lg font-semibold mb-2">No Completed Services</h3>
								<p className="text-muted-foreground mb-4">
									Your completed services will appear here when you mark them as completed from the status page.
								</p>
								<Link href="/status">
									<Button>
										<CheckCircle className="h-4 w-4 mr-2" />
										Go to Service Status
									</Button>
								</Link>
							</CardContent>
						</Card>
					)}
				</div>
			</div>
		</section>
	);
}