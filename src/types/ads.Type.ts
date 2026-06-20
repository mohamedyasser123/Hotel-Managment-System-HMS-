export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Ads {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy?: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface GetAdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ads[];
    totalCount: number;
  };
}

export interface GetAdsDetailsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ads;
  };
}

export interface CreateAdsData {
  room: string;
  discount: number;
  isActive: boolean;
}

export interface CreateAdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: Ads;
  };
}

export interface UpdateAdsData {
  discount: number;
  isActive: boolean;
}

export interface UpdateAdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: {
      _id: string;
      room: string;
      createdBy: string;
      isActive: boolean;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface DeleteAdsResponse {
  success: boolean;
  message: string;
  data: {
    ads: {
      acknowledged: boolean;
      deletedCount: number;
    };
  };
}