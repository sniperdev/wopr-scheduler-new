export interface User {
  jwt: string;
  data: {
    id: number | null;
    name: string;
    surname: string;
    email: string;
    phone: number;
    isAdmin: boolean | null;
    createdAt: string;
    updatedAt: string;
    company_id: number;
  };
}
