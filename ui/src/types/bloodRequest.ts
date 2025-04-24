export type BloodRequest = {
  isForSelf: boolean;
  bloodGroup: string;
  numberOfDonors: number;
  city: string;
  hospital: string;
  urgencyLevel: "Low" | "Medium" | "High";
  contactNumber: string;
};

export type BloodRequestList = {
  _id: string;
  requestor: string; // or use a more specific type like User if you have user details
  isForSelf: boolean;
  bloodGroup: string;
  numberOfDonors: number;
  city: string;
  hospital: string;
  urgencyLevel: "Low" | "Medium" | "High" | "Critical"; // Added Critical based on your data
  contactNumber: string;
  requestStatus: "Pending" | "Fulfilled" | "Cancelled" | "Expired"; // Adjust as per your statuses
  message?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};
