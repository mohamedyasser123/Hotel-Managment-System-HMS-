export type CreateBookingPayload = {
  startDate: string;
  endDate: string;
  capacity: number;
  room: string;
}


export type Booking = {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  user?: string;
  room: string;
  createdAt?: string;
  updatedAt?: string;
};


export type CreateBookingResponse = {
  success: boolean;
  message: string;
  data: {
    booking: Booking;
  };
};

export type UsePortalBookingReturn = {
  dateRange: [any, any];
  capacity: number;
  loading: boolean;
  error: any;
  data: any;
  setDates: (value: [any, any]) => void;
  increase: () => void;
  decrease: () => void;
  createBooking: () => Promise<any>;
};


