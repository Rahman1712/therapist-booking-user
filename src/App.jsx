
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import UserRoutes from './Routes/UserRoutes';
import VendorRoutes from './Routes/VendorRoutes';
import NotFound from './pages/Error/NotFound';

function App() {


  return (
    
      <Router>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/vendor/*" element={<VendorRoutes />} />
          {/* <Route path="*"  element={<NotFound />}/> */}
        </Routes>
      </Router>
    
  )
}

export default App


// const PrivateRoute = ({ element, redirectTo, condition }) => {
//   return condition ? element : <Navigate to={redirectTo} />;
// };
// const authState = useSelector((state) => state.auth);
// <Route exact path="/demo" element={
// <PrivateRoute
//     path="/profile"
//     element={<Profile />}
//     condition={authState.isLoggedIn}
//     redirectTo="/login"
//   />
// }
// ></Route>