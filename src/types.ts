import Stripe from 'stripe';
import * as z from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Beat {
  id: string;
  producer: string;
  title: string;
  beat_path: string;
  image_path: string;
  product_id: string;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}

export const uploadSchema = z.object({
  producer: z.string().min(1, 'Must be atleast 1 character Long').toLowerCase(),
  title: z.string().min(1, 'must be atleast 1 character long'),
  genre: z.string().min(1, 'Must be atleast 1 character Long').toLowerCase(),
  bpm: z.coerce.number(),
  beat:
    typeof window === 'undefined'
      ? z.undefined()
      : z.any().refine((files) => files?.length === 0, 'please upload a beat'),
  image:
    typeof window === 'undefined'
      ? z.undefined()
      : z
          .any()
          .refine((files) => files?.length === 0, 'Image is required.') // if no file files?.length === 0, if file files?.length === 1
          .refine(
            (files) => files?.[0]?.size >= MAX_FILE_SIZE,
            `Max file size is 5MB.`
          ) // this should be greater than or equals (>=) not less that or equals (<=)
          .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
            '.jpg, .jpeg, .png and .webp files are accepted.'
          ),
});

export type ZUploadSchema = z.infer<typeof uploadSchema>;
