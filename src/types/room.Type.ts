export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;

  facilities: {
    _id: string;
    name: string;
  }[];

  createdBy: {
    _id: string;
    userName: string;
  };

  images: string[];

  createdAt: string;
  updatedAt: string;
}

export interface GetRoomsResponse {
  success: boolean;
  message: string;

  data: {
    rooms: Room[];
    totalCount: number;
  };
}