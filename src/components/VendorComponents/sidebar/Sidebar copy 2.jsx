import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sidebarActions } from "../../../store/sidebar-slice";
import { Link } from "react-router-dom";
import {
  MoreVertical, ChevronLast, ChevronFirst,
  LifeBuoy,
  Receipt,
  Boxes,
  Package,
  UserCircle,
  BarChart3,
  LayoutDashboard,
  Settings,
  LucideHome,
  User
 } from 'lucide-react';

export default function Sidebar() {
  const expanded = useSelector((state) => state.sidebar.expanded);
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [suni, setSuni] = useState(true);

  const handleItemClick = (text) => {
    console.log('ddd');
    setActiveItem(text); 
  };

  const sss = () => {setSuni(false) }

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
          <p className={`text-blue-950 font-bold cursor-default overflow-hidden transition-all ${expanded ? "w-32" : "w-0"
            }`}>💙 MediCare</p>
          <button
            // onClick={() => setExpanded((curr) => !curr)}
            onClick={() => dispatch(sidebarActions.toggleExpanded())}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>


        <ul className="flex-1 px-3">

          {/* <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" key={"Dashboard"} to="/vendor/home" active={suni} onClick={() => handleItemClick('Dashboardr')} /> */}

          <SidebarItem icon={<User size={20} />} text="Profile" key={"Profile"} to="/vendor/profile" active={suni} onClick={sss} />
       
          {/* <SidebarItem icon={<User size={20} />} text="Appointments" active={activeItem === 'Appointments'}
            onClick={() => handleItemClick('Appointments')} />
       
          <SidebarItem icon={<Receipt size={20} />} text="Billings" active={activeItem === 'Billings'}
          />
          <hr className="my-3" />
       
          <SidebarItem icon={<Settings size={20} />} text="Settings" active={activeItem === 'Settings'}
            onClick={() => handleItemClick('Settings')} />
       
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" active={activeItem === 'Help'}
            onClick={() => handleItemClick('Help')} /> */}
        </ul>

        <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert, to }) {
  // const { expanded } = useContext(SidebarContext)
  const expanded = useSelector((state) => state.sidebar.expanded);

  return (
    <Link to={to}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
          }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
            }`}
        />
      )}

      {!expanded && (
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