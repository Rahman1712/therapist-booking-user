'use client';
import { Sidebar } from 'flowbite-react';
import { BiAlarm } from 'react-icons/bi';
import { HiArrowSmRight, HiChartPie, HiHome, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
// import { Link } from 'react-router-dom';

'use client';


export default function DefaultSidebar() {
  return (
    <aside className="w-1/4 bg-slate-50 dark:bg-gray-800 p-4 shadow-2xl">
      <Sidebar aria-label="Sidebar with logo branding example" >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              icon={HiChartPie}
            >
              <p>
                Dashboard
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiViewBoards}
            >
              <p>
                Kanban
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiInbox}
            >
              <p>
                Inbox
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiUser}
            >
              <p>
                Users
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiShoppingBag}
            >
              <p>
                Products
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiArrowSmRight}
            >
              <p>
                Sign In
              </p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              icon={HiTable}
            >
              <p>
                Sign Up
              </p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

    </aside>
  )
}






// return (
//   <aside className="w-1/4 bg-slate-50 dark:bg-gray-800 p-4 shadow-2xl">
//     <h2 className="text-2xl text-blue-950 dark:text-gray-200 font-bold underline">Therapist Dashboard</h2>
//     <nav className="mt-4">
//       <ul>
//         <li className='py-3 font-bold'>
//           <Link to="/vendor/home" className="text-blue-900 dark:text-gray-200 hover:text-blue-300 dark:hover:text-gray-400 ">Home</Link>
//         </li>
//         <li className='py-3 font-bold'>
//           <Link to="/vendor/profile" className="text-blue-900 dark:text-gray-200 hover:text-blue-300 dark:hover:text-gray-400 ">Profile</Link>
//         </li>
//         <li className='py-3 font-bold'>
//           <Link to="/vendor/appointments" className="text-blue-900 dark:text-gray-200 hover:text-blue-300 dark:hover:text-gray-400 ">Appointments</Link>
//         </li>
//       </ul>
//     </nav>
//   </aside>
// );