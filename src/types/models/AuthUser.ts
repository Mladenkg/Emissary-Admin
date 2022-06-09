export interface AuthUser {
  id?: number;
  token?: string;
  status?: boolean;
  company_id?: number | null;
  name?: string;
  email?: string;
  image?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
  cart_token?: string;
  roles?: Role[];
}

export interface Role {
  id: number;
  name: string;
  guard_name: string;
}