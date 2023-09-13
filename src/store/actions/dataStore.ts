import { IHelpers, IToastParams } from 'types/store.types';
import { showToast } from 'utils/Toast';
import { apiWithInterceptor } from 'utils/interceptorV2';
import { create } from 'zustand';


const useDataStore = create((set) => ({
    vehicles: [],
    loaderVehicle: false,
    getVehicles: async () => {

        try {
            set({
                loaderVehicle: true
            })
            let response = await apiWithInterceptor({
                url: 'admin/vehicles',
                method: 'get'
            })
            set({
                loaderVehicle: false
            })
            console.log('res veh =', response?.data);
            set({
                vehicles: response?.data?.vehicles
            })
        } catch (error) {
            set({
                loaderVehicle: false
            })
            showToast({
                message: 'gagal mendapatkan data mobil',
                title: 'warning',
                type: 'warning'
            })
        }

    },
}))

export {
    useDataStore,
}