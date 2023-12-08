

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function PrivateRoute({ element }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  return element;
}

export default PrivateRoute;

/*
function PrivateRoute({ element }) {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Use the useEffect hook to navigate when the component is mounted.
    if (!authState.isLoggedIn) {
      navigate('/login');
    }
  }, [authState.isLoggedIn, navigate]);

  return element;
}

export default PrivateRoute;

=====================================

function PrivateRoute({ element }) {
  const authState = useSelector((state) => state.auth);
  const location = useLocation();

  return authState.isLoggedIn ? 
  (
    <Outlet />
  ) 
  : 
  (
    <Navigate to="/" replace state={{from: location}} />
  );
}

export default PrivateRoute;


===============
const PrivateRoute = ({ path, element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: path }} replace />
  );
};

export default PrivateRoute;
*/