export interface IHelpers {
    typeToast: 'success' | 'warning' | 'error';
    isShowToast: boolean;
    titleToast: string;
    messageToast: string;
    toggleToast: (
        params: IToastParams
    ) => void;
}
export interface IToastParams {
    typeToast: 'success' | 'warning' | 'error',
    isShowToast: boolean,
    titleToast: string,
    messageToast: string,
}