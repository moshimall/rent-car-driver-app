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
  
  interface Identity {
    ktp: string;
    sim: string;
  }
  
  interface OrderDetail {
    vehicle_id: number;
    vehicle: Vehicle;
    rental_delivery_location: string;
    rental_delivery_location_detail: string;
    rental_return_location: string;
    rental_return_location_detail: string;
    start_booking_date: string;
    start_booking_time: string;
    end_booking_date: string;
    end_booking_time: string;
    without_driver: boolean;
    identity: Identity;
  }
  
  interface Order {
    id: number;
    order_key: string;
    order_status: string;
    user_name: string;
    phone_number: string;
    phone_country_code: string;
    wa_number: string;
    down_payment: number;
    deposit: number;
    booking_price: number;
    service_fee: number;
    rental_delivery_fee: number;
    rental_return_fee: number;
    insurance_fee: number;
    total_payment: number;
    customer_id: string;
    created_at: string;
    updated_at: string;
    expired_time: string;
    refferal_code: string;
    order_detail: OrderDetail;
    order_cancelation: null | unknown;
    is_extension: boolean;
    is_order_extension_exists: boolean;
    is_deposit_exists: boolean;
    is_admin_creation: boolean;
  }
  
  export interface DataItemTask {
    id: number;
    order: Order;
    courier_id: number;
    string: string;
    image_captures: null | unknown;
    note: string;
    status: 'DELIVERY_PROCESS' | 'PICKUP_PROCESS' | 'DELIVERED' | 'PICKED' | 'RETURNED';
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
  