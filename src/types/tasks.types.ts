export type TaskStatus = "DELIVERY_PROCESS" | "TAKE_FROM_GARAGE" | "DELIVERY_CAR" | "TAKE_CAR" | "RETURN_TO_GARAGE";

export interface Vehicle {
  id: number;
  name: string;
  year: number;
  price: number;
  max_passanger: number;
  max_suitcase: number;
  pet_allowed: boolean;
  disability_allowed: boolean;
  smoke_allowed: boolean;
  slash_price: number;
  price_with_driver: number;
}

export interface BookingZone {
  date: string;
  pickup_zone_id: number;
  detail_pickup_location: string;
  pickup_zone_price: number;
  drop_off_zone_id: number;
  detail_drop_off_location: string;
  drop_off_zone_price: number;
  driving_zone_id: number;
  detail_driving_location: string;
  driving_zone_price: number;
  total_price: number;
  booking_start_time: string;
  booking_end_time: string;
  overtime_duration: number;
  overtime_price: number;
}

export interface DataItemTask {
  id: number;
  task_key: string;
  customer_name: string;
  vehicle_name: string;
  start_date: string;
  end_date: string;
  process_of_done: string;
  created_at: string;
}

export interface WithDriverTaskDetail {
  title: string;
  date: string;
  status: TaskStatus; // available: 'DELIVERY_PROCESS' | 'RETURN_TO_GARAGE' | 'TAKE_FROM_GARAGE';
  is_processed: boolean;
  order: {
    id: number;
    order_key: string;
    delivery_location: string;
    delivery_location_detail: string;
    rental_start_date: string;
    rental_start_time: string;
    rental_end_date: string;
    return_location: string;
    return_location_detail: string;
    rental_location: string;
    rental_location_detail: string;
    return_date: string;
    return_time: string;
    customer_name: string;
    phone_number: string;
    identity: {
      ktp: string;
      sim: string;
    };
    vehicle: {
      name: string;
      plate_number: string;
      max_suitcase: number;
      photos: Array<{
        id: number;
        url: string;
      }>;
    };
  };
  status_details: Array<{
    title: string;
    status: TaskStatus; // available: 'DELIVERY_PROCESS' | 'RETURN_TO_GARAGE' | 'TAKE_FROM_GARAGE';
    is_processed: boolean;
  }>;
}

export interface WithoutDriverTaskDetail {
  title: string;
  status: TaskStatus; // available: 'DELIVERY_PROCESS' | 'TAKE_FROM_GARAGE' | 'DELIVERY_CAR' | 'TAKE_CAR' | 'RETURN_TO_GARAGE';
  order: {
    order_key: string;
    delivery_location: string;
    delivery_location_detail: string;
    rental_start_date: string;
    rental_start_time: string;
    rental_end_date: string;
    return_location: string;
    return_location_detail: string;
    rental_location: string;
    rental_location_detail: string;
    return_date: string;
    return_time: string;
    customer_name: string;
    phone_number: string;
    identity: {
      ktp: string;
      sim: string;
    };
    vehicle: {
      name: string;
      plate_number: string;
      max_suitcase: number;
      photos: Array<{
        id: number;
        url: string;
      }>;
    };
  };
}

export interface Pagination {
  limit: number;
  page: number;
  next_page?: number;
  prev_page?: number;
  total?: number;
  total_page?: number;
}

export interface ApiResponseTasks {
  data: DataItemTask[];
  pagination: Pagination;
}
