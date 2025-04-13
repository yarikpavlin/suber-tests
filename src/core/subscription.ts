export interface Subscription {
  _id?: string;
  userId: string;
  name: string;
  cost: number;
  currency: 'UAH' | 'USD' | 'EUR';
  frequency: 'weekly' | 'monthly' | 'yearly';
  lastPaidDate: Date;
  nextDueDate: Date;
  isActive: boolean;
  createdAt: Date;
  notes?: string;
}
