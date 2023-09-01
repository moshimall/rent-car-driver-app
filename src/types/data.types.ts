export interface IDataStore {
    vehicles: Vehicle[];
    loaderVehicle: boolean;
    getVehicles: () => void;
}

export interface Vehicle {
    id: number;
    name: string;
    year: number;
    price: number;
    slash_price: number;
    price_with_driver: number;
    license_number: string;
    max_passenger: number;
    min_suitcase: number;
    max_suitcase: number;
    pet_allowed: boolean;
    disability_allowed: boolean;
    smoke_allowed: boolean;
    support_driver: boolean;
    required_driver: boolean;
    status: string;
    status_order: string;
    transmission: string;
    brand_name: string;
    photo: {
        id: number;
        name: string;
    }[];
    promo: {
        promo_id: number;
        promo_name: string;
        value: number;
    };
    category: {
        id: number;
        name: string;
    };
}
