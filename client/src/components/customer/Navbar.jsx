import { 
    Home,
    ShoppingBag,
    Clock,
    Settings,
    LogOut,
    ChefHat,
    Users,
    BarChart
  } from 'lucide-react'
import {Provider } from "../../context/contextProvider"  


export const Navbar = () => {
    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg">
            <div className="flex items-center gap-2 p-6 border-b">
                <ChefHat className="w-8 h-8 text-orange-500" />
                <span className="text-xl font-bold text-gray-800">FoodieHub</span>
            </div>

            <nav className="p-4">
                <div className="space-y-2">
                    <NavItem icon={<Home />} text="Menu" path="/" active />
                    <NavItem icon={<ShoppingBag />} text="My Orders" path="/my-orders"/>
                    <NavItem icon={<Clock />} text="Order History" path="/order-history" />
                    <NavItem icon={<BarChart />} text="Analytics" path="/analysis" />
                </div>
            </nav>
        </div>
    )
}

function NavItem({ icon, text, active,path }) {
    const {navigation } = Provider()
    return (
      <button
        className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors
          ${active 
            ? 'bg-orange-50 text-orange-600' 
            : 'text-gray-600 hover:bg-gray-50'
          }`}
          onClick={()=>navigation(path)}
      >
        {icon}
        <span className="font-medium">{text}</span>
      </button>
    );
  }