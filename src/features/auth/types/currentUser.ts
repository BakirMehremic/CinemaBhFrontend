export type CurrentUser = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  image_url?: string;
  role: "ADMIN" | "REGISTERED_USER";
  verified: boolean;
};
