export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
};

export type Donor = {
  _id: string;
  name: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  isDonating: boolean;
  phoneNumber: string;
  role: "user" | "admin";
  fcmToken: string;
  address: Address;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Pagination = {
  totalDocs: number;
  currentPage: number;
  totalPages: number;
  limit: number;
};

export type DonorListResponse = {
  statusCode: number;
  donors: Donor[];
  pagination: Pagination;
  message: string;
  success: boolean;
};
