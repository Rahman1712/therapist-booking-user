/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { sidebarUserActions } from "../../../store/sidebar-slice-user";
import { Link, useLocation } from "react-router-dom";
import {
   ChevronLast, ChevronFirst, 
  LayoutDashboard,User, List, MessageCircle
 } from 'lucide-react';
import { useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const { userExpanded, userActiveLink } = useSelector((state) => state.sidebaruser);
  const dispatch = useDispatch();

  const handleItemClick = (text) => {
    dispatch(sidebarUserActions.setActiveLink( { userActiveLink: text }));
  };

  useEffect(() => {
    // Extract the pathname from the location object
    const { pathname } = location;

    // Define a function to extract the active link based on the URL path
    const getActiveLink = (path) => {
      switch (path) {
        case '/user-dashboard':
          return 'Dashboard';
        case '/user-profile':
          return 'Profile';
        case '/user-profile-edit':
          return 'Profile';
        case '/user-bookings':
          return 'Bookings';
        case '/user-chats':
          return 'Chats';
        default:
          return 'Dashboard'; // Set a default active link
      }
    };

    // Get the active link based on the current pathname
    const activeLink = getActiveLink(pathname);

    // Dispatch an action to set the active link in the Redux store
    dispatch(sidebarUserActions.setActiveLink({ userActiveLink: activeLink }));
  }, [location, dispatch]);

  return (
    <aside className="h-screennnnn">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
          <p className={`text-blue-950 font-bold cursor-default overflow-hidden transition-all ${userExpanded ? "w-32" : "w-0"
            }`}>💙 MediCare </p>
          <button
            // onClick={() => setExpanded((curr) => !curr)}
            onClick={() => dispatch(sidebarUserActions.toggleExpanded())}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {userExpanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">

          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            to="/user-dashboard"
            active={userActiveLink === 'Dashboard'}
            onClick={() => handleItemClick('Dashboard')}
            key="Dashboard" />

          <SidebarItem
            icon={<User size={20} />}
            text="Profile"
            to="/user-profile"
            active={userActiveLink === 'Profile'}
            onClick={() => handleItemClick('Profile')}
            key="Profile" />

          <SidebarItem
            icon={<List size={20} />}
            text="Bookings"
            to="/user-bookings"
            active={userActiveLink === 'Bookings'}
            onClick={() => handleItemClick('Bookings')}
            key="Bookings" />

          <SidebarItem
            icon={<MessageCircle size={20} />}
            text="Chats"
            to="/user-chats"
            active={userActiveLink === 'Chats'}
            onClick={() => handleItemClick('Chats')}
            key="Chats" />

        </ul>

        
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, to, onClick }) {
  // const { expanded } = useContext(SidebarContext)
  const userExpanded = useSelector((state) => state.sidebaruser.userExpanded);

  return (
    <Link onClick={onClick} to={to}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        z-50
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${userExpanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${userExpanded ? "" : "top-2"
            }`}
        />
      )}

      {!userExpanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </Link>
  )
}