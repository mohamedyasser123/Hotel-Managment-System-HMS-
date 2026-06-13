
export interface RoomFacility {
  _id: string;
  name: string;
}

export interface RoomCreatedBy {
  _id: string;
  userName: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: RoomFacility[];
  createdBy: RoomCreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}
export type RoomForm = {
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  facilities: string[];
  imgs: FileList | null;
};

export interface GetRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
    totalCount: number;
  };
}

export interface CreateRoomData {
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[]; 
}

export interface CreateRoomResponse {
  success: boolean;
  message: string;
  data: Room;
}

export interface UpdateRoomData {
  roomNumber?: string;
  price?: number;
  capacity?: number;
  discount?: number;
  facilities?: string[];
}

export interface UpdateRoomResponse {
  success: boolean;
  message: string;
  data: Room;
}

export interface DeleteRoomResponse {
  success: boolean;
  message: string;
}