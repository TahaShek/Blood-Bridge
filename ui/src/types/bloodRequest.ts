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
  requestor: string;
  isForSelf: boolean;
  bloodGroup: string;
  numberOfDonors: number;
  city: string;
  hospital: string;
  urgencyLevel: "Low" | "Medium" | "High" | "Critical"; 
  contactNumber: string;
  requestStatus: "Pending" | "Fulfilled" | "Cancelled" | "Expired";
  message?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};
