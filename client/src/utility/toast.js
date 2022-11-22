import { toast } from "react-toastify";

//create toast
export const createToast = (msg, type = 'error') => {
    switch (type) {
        case "error":
            toast.error(msg);
            break;
        case "success":
            toast.success(msg);
            break;
        case "warn":
            toast.warn(msg);
            break;
        case "info":
            toast.info(msg);
            break;
    
        default:
            break;
    }
}