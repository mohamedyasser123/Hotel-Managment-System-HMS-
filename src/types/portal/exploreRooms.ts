

export type Room = {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: any[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
};


export type GetRoomsResponse = {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
  };
};


export type GetRoomsParams = {
  startDate?: string;
  endDate?: string;
  capacity?: number;
};
