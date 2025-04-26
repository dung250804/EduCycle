
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

export interface Post {
  post_id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  type: 'Liquidation' | 'Exchange';
  product_type: string;
  status: 'Pending' | 'Approved' | 'Cancelled' | 'Completed';
  image?: string;
}
