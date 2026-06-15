export interface Booking {
  _id: string;

  startDate: string;

  endDate: string;

  totalPrice: number;

  status: string;

  stripeChargeId: string;

  createdAt: string;

  updatedAt: string;

  user: {
    _id: string;

    userName: string;
  };

  room: {
    _id: string;

    roomNumber: string;
  };
}

export interface GetBookingsResponse {
  success: boolean;

  message: string;

  data: {
    booking: Booking[];
    totalCount: number;
  };
}