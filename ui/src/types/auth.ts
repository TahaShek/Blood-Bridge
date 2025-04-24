export type LoginCredentials = {
  phoneNumber: string;
};

export type RegisterCredentials = {
  name: string;
  phoneNumber: string;
  address: {
    city: string;
    street?: string;
    state?: string;
    country?: string;
    zipCode?: string;
  };
  bloodGroup: string;
  isDonating?: boolean;
};

type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  bloodGroup: string;
  isDonating: boolean;
  phoneNumber: string;
  role: "user" | "admin";
  refreshToken: string;
  fcmToken: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
