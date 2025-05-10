
export interface User {
  user_id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Member' | 'Representative';
  reputation_score: number;
  violation_count: number;
  rating: number;
  status: 'Active' | 'Banned';
  avatar?: string;
}

export type ItemType = 'Liquidation' | 'Exchange' | 'Donation';

export interface Post {
  post_id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  type: ItemType;
  product_type: string;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Completed';
  image?: string;
  
  // Additional properties needed by existing code
  id?: string;
  category?: string;
  seller?: string;
}

export type FundraiserType = 'ItemDonation' | 'ItemSale';

export interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  amountRaised: number;
  image: string;
  organizer: string;
  endDate: Date;
  participants: number;
  fundraiserType: FundraiserType;
  items?: Post[];
}

export type TransactionType = 'Sale' | 'Exchange' | 'Donation' | 'Fundraiser';

export interface Transaction {
  id: number; // Used in existing code
  transactionId?: string; // Added to match API format
  type: TransactionType;
  item: string;
  date: string;
  amount: string;
  status: 'Pending' | 'Completed' | 'In Progress' | 'Cancelled';
  counterpartyName?: string;
  itemId?: string;
}

// Added new interfaces to match API structure
export interface TransactionAPI {
  transactionId: string;
  postId: string | null;
  representativeId: string | null;
  activityId: string | null;
  item?: {
    itemId: string;
    itemName: string;
    description: string;
    imageUrl: string;
    owner: UserAPI;
    category: CategoryAPI;
    createdAt: string;
  };
  user?: UserAPI;
  type: TransactionType;
  status: 'Pending' | 'Completed' | 'In Progress' | 'Cancelled';
}

export interface UserAPI {
  userId: string;
  name: string;
  email: string;
  status: string;
  avatar?: string;
  roles?: Array<{roleId: number; roleName: string}>;
  rolesName?: string[];
  reputationScore?: number;
  violationCount?: number;
  rating?: number;
}

export interface CategoryAPI {
  categoryId: string;
  name: string;
  description: string;
  createdAt: string;
}
