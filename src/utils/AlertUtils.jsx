import toast from "react-hot-toast";

export function popupToast(toastType, toastMessage, duration = 1000){
  switch (toastType) {
    case "success":
      toast.success(toastMessage, { position: "bottom-center" });
      break;
    case "error":
      toast.error(toastMessage, { position: "bottom-center", duration: duration });
      break;
    case "warning":
      toast.error(toastMessage, { position: "bottom-center", duration: duration, style: { background: '#FFC107', color: 'red' }, icon: '⚠️' });
      break;
    default:
      toast.error("Error occurred...!");
      break;
  }
}