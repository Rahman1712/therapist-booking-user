import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

// function VendorAuth({ element }) {
//     const {isLoggedIn, role} = useSelector((state) => state.auth);
//     const navigate = useNavigate();
  
//     useEffect(() => {
//       if (isLoggedIn) {
//         const toPath = role === "THERAPIST" ? "/vendor/home" : "/";
//         navigate(toPath);
//       }
//     }, [isLoggedIn, role, navigate]);
  
//     return element;
//   }
        
// export default VendorAuth;

const VendorAuth = ({allows})=> {
    const authstate = useSelector((state)=> state.auth)
    const location = useLocation();

    return (
        authstate?.role == "THERAPIST"
            ? <Outlet state={{from: location}} />
            : <Navigate to="/vendor/login" state={{ from: location.pathname }} replace />
    )
}


export default VendorAuth;