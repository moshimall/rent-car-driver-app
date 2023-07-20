import { IHelpers, IToastParams } from 'types/store.types';
import { create } from 'zustand';


// export const helpers = create();
const useHelperStore = create((set) => ({
    isShowToast: false,
    messageToast: '',
    titleToast: '',
    typeToast: 'warning',
    toggleToast: ({
        isShowToast,
        messageToast,
        titleToast,
        typeToast
    }: IToastParams) => {
        set({
            isShowToast: isShowToast,
            messageToast: messageToast,
            titleToast: titleToast,
            typeToast: typeToast,
        })

    },
}))

export {
    useHelperStore
}