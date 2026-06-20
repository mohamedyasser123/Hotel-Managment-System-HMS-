export interface Facility {
  _id: string;
  name: string;
}

export interface Creator {
  _id: string;
  userName: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: Creator;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetAvailableRoomsParams {
  page: number;
  size: number;
  startDate?: string; 
  endDate?: string; 
    capacity?: number;
}

export interface AvailableRoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
    totalCount: number;
  };
}