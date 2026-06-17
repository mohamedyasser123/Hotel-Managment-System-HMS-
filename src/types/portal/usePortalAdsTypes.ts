export type Room = {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount?: number;
  facilities: string[];
  createdBy: string | { _id: string; userName: string };
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export type Ad = {
  _id: string;
  isActive: boolean;
  room: Room;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type AdsResponse = {
  success: boolean;
  message: string;
  data: {
    ads: Ad[];
    totalCount: number;
  };
};


export type GetAdsParams = {
  page?: number;
  size?: number;
  isActive?: boolean;
};