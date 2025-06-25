'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Building2, Shield, CheckCircle } from 'lucide-react';

const paymentMethods = [
	{
		id: 'shopeepay',
		name: 'ShopeePay',
		icon: Smartphone,
		description: 'Pay with your ShopeePay wallet',
		fee: 'No additional fees',
	},
	{
		id: 'qris',
		name: 'QRIS',
		icon: Smartphone,
		description: 'Scan QR code to pay',
		fee: 'No additional fees',
	},
	{
		id: 'mbanking',
		name: 'Mobile Banking',
		icon: Building2,
		description: 'Transfer via mobile banking',
		fee: 'Bank transfer fees may apply',
	},
];

export default function PaymentMethod() {
	const searchParams = useSearchParams();
	const [selectedMethod, setSelectedMethod] = useState('shopeepay');

	// Get data from URL parameters
	const serviceTitle = searchParams.get('service') || 'Home Service';
	const servicePrice = parseFloat(searchParams.get('price') || '0');
	const technicianName = searchParams.get('technician') || 'Professional Technician';
	const serviceDate = searchParams.get('date') || 'To be scheduled';
	const customerAddress = searchParams.get('address') || 'Customer Address';

	const tax = servicePrice * 0.1; // 10% tax
	const total = servicePrice + tax;

	const handlePayment = () => {
		// Handle payment processing
		console.log('Processing payment:', { method: selectedMethod, amount: total });
		
		// Navigate to status page with payment data
		const statusParams = new URLSearchParams({
			service: serviceTitle,
			price: total.toString(),
			technician: technicianName,
			date: serviceDate,
			address: customerAddress,
			method: selectedMethod,
			status: 'confirmed'
		});

		window.location.href = `/status?${statusParams.toString()}`;
	};

	return (
		<section className='py-12'>
			<div className='container mx-auto px-4 max-w-4xl'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					{/* Payment Methods */}
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle className='flex items-center'>
									<Smartphone className='h-5 w-5 mr-2' />
									Choose Payment Method
								</CardTitle>
							</CardHeader>
							<CardContent>
								<RadioGroup
									value={selectedMethod}
									onValueChange={setSelectedMethod}
									className='space-y-4'
								>
									{paymentMethods.map((method) => {
										const Icon = method.icon;
										return (
											<div
												key={method.id}
												className='flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors'
											>
												<RadioGroupItem value={method.id} id={method.id} />
												<Icon className='h-6 w-6 text-primary' />
												<div className='flex-1'>
													<Label
														htmlFor={method.id}
														className='font-semibold cursor-pointer'
													>
														{method.name}
													</Label>
													<p className='text-sm text-muted-foreground'>
														{method.description}
													</p>
													<p className='text-xs text-green-600'>
														{method.fee}
													</p>
												</div>
											</div>
										);
									})}
								</RadioGroup>
							</CardContent>
						</Card>

						{/* Remove credit card form, keep only QRIS */}
						{selectedMethod === 'qris' && (
							<Card>
								<CardHeader>
									<CardTitle>QRIS Payment</CardTitle>
								</CardHeader>
								<CardContent className='text-center space-y-4'>
									<div className='w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center'>
										<p className='text-muted-foreground'>
											QR Code will appear here
										</p>
									</div>
									<p className='text-sm text-muted-foreground'>
										Scan this QR code with your banking app or e-wallet
									</p>
								</CardContent>
							</Card>
						)}
					</div>

					{/* Order Summary */}
					<div className='space-y-6'>
						<Card>
							<CardHeader>
								<CardTitle>Order Summary</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div className='space-y-2'>
									<div className='flex justify-between'>
										<span>{serviceTitle}</span>
										<span>Rp {servicePrice.toLocaleString('id-ID')}</span>
									</div>
									<div className='flex justify-between text-sm text-muted-foreground'>
										<span>Tax & Fees (10%)</span>
										<span>Rp {tax.toLocaleString('id-ID')}</span>
									</div>
								</div>
								<Separator />
								<div className='flex justify-between font-semibold text-lg'>
									<span>Total</span>
									<span>Rp {total.toLocaleString('id-ID')}</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Service Details</CardTitle>
							</CardHeader>
							<CardContent className='space-y-3'>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Service:</span>
									<span>{serviceTitle}</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Date:</span>
									<span>{serviceDate}</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Address:</span>
									<span>{customerAddress}</span>
								</div>
								<div className='flex justify-between text-sm'>
									<span className='text-muted-foreground'>Technician:</span>
									<span>{technicianName}</span>
								</div>
							</CardContent>
						</Card>

						<div className='space-y-3'>
							<Button
								size='lg'
								className='w-full'
								onClick={handlePayment}
							>
								<Shield className='h-4 w-4 mr-2' />
								Pay Rp {total.toLocaleString('id-ID')} Securely
							</Button>

							<div className='flex items-center justify-center space-x-2 text-sm text-muted-foreground'>
								<Shield className='h-4 w-4' />
								<span>Secured by 256-bit SSL encryption</span>
							</div>

							<div className='flex items-center space-x-4 text-xs text-muted-foreground justify-center'>
								<div className='flex items-center'>
									<CheckCircle className='h-3 w-3 mr-1 text-green-500' />
									Money-back guarantee
								</div>
								<div className='flex items-center'>
									<CheckCircle className='h-3 w-3 mr-1 text-green-500' />
									Licensed professionals
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}