
export type LoginCredentials = {
  phoneNumber: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  phoneNumber: string;
  city: string;
  bloodGroup: string;
  password: string;
};

export type Address = {
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
  role: "user" | "admin"; // Expand if more roles exist
  refreshToken: string;
  fcmToken: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
