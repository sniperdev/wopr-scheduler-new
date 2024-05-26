export interface User {
  jwt: string;
  data: {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    phone: number;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    company_id: number;
  };
}
