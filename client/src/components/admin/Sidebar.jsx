import React, { useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import { 

  LayoutDashboard, 
  ClipboardList, 
  CreditCard, 
  BetweenHorizontalEnd,
  LogOut,
  UtensilsCrossed 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(!sessionStorage.getItem('token')){
      navigate('/admin/auth', {replace:true});}

  },[navigate])
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: UtensilsCrossed, label: 'Menu Items', path: '/admin/menu-items' },
    { icon: BetweenHorizontalEnd, label: 'Insert Items', path: '/admin/insert-items' },
    { icon: ClipboardList, label: 'Orders', path: '/admin/orders' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' }
  ];

  const handleLogout = () => {
    // Add logout logic here
    sessionStorage.removeItem('token');
    // navigate('/admin/auth', {replace:true});
    window.location.href = '/admin/auth';
  };

  return (
    <div className="h-screen w-64 bg-white border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-600 hover:text-red-600 w-full px-4 py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;