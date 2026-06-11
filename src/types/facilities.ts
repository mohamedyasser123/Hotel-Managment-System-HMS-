export interface Facility {
  _id: string; 
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    userName: string;
  };
}

export interface GetFacilitiesResponse {
  success: boolean;
  message: string;
  data: {
    facilities: Facility[];
    totalCount: number;
  };
}