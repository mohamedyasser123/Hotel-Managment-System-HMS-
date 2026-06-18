export interface RoomDetails {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: {
    _id: string;
    userName: string;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomDetailsResponse {
  success: boolean;
  message: string;
  data: {
    room: RoomDetails;
  };
}