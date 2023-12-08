
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function BackAuth({ element }) {
  const {isLoggedIn, role} = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      const toPath = role === "USER" ? "/" : "/vendor/home";
      navigate(toPath);
    }
  }, [isLoggedIn, role, navigate]);

  return element;
}
      
export default BackAuth;


// const toPath = () => {
//   return authstate.role === "USER" ? "/" : "/vendor/home";
// }


// authstate?.isLoggedIn
//     ? <Navigate to="/" state={{ from: location.pathname }} replace />
//     : <Outlet state={{from: location}} />

/*
const BackAuth = () => {
  const authstate = useSelector((state)=> state.auth)
  const location = useLocation();
  const toPath = () => {
    return authstate.role === "USER" ? "/" : "/vendor/home";
  }

  return (
    authstate?.isLoggedIn
        ? <Navigate to={toPath} state={{ from: location.pathname }} replace />
        : <Outlet state={{from: location}} />
        ) 
}
      
export default BackAuth;

*/





// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const BackAuth = () => {
//   const authState = useSelector((state) => state.auth);
//   const location = useLocation();
//   const navigate = useNavigate();

//   if (authState?.isLoggedIn) {
//     const toPath = authState.role === "USER" ? "/" : "/vendor/home";
//     navigate(toPath, { state: { from: location.pathname } });
//   }

//   return null; // Return null or a placeholder if needed
// };

// export default BackAuth;