// types/statsTypes.ts

export type RequestStats = {
    total: number;
    pending: number;
    expired: number;
    fulfilled: number;
    cancelled: number;
  }
  
  export type DonationStats = {
    total: number;
    successful: number;
    cancelled: number;
  }
  
  export type UserStatsRecord  = { 
    requestStats: RequestStats;
    donationStats: DonationStats;
    _id: string;
    user: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    lastRequestAt: string;
  }
  
  export type UserStatsResponse =  {
    statusCode: number;
    record: UserStatsRecord;
    message: string;
    success: boolean;
  }