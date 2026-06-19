export interface FavoriteRoom {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Favorite {
  _id: string;
  rooms: FavoriteRoom[];
  user: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FavoritesResponse {
  success: boolean;
  message: string;
  data: {
    favoriteRooms: Favorite[];
    totalCount: number;
  };
}