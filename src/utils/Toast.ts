// import { useDispatch } from "react-redux"
// import { toggleToast } from "redux/features/utils/utilsSlice";
// import store from "redux/store";

import { useHelperStore } from "store/helpersStore";

interface IToast {
    title: string;
    message: string;
    type: 'success' | 'warning' | 'error';
}
export const showToast = ({
    title,
    message,
    type,
}: IToast) => {
   
    useHelperStore.setState({
        isShowToast: !useHelperStore.getState()?.isShowToast,
        messageToast: message,
        titleToast: title,
        typeToast: type,
      });
}