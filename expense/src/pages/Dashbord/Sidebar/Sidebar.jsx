import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  PieChart,
  Wallet,
  Receipt,
  Settings,
  Calendar,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Plus,
  CreditCard,
} from 'lucide-react';

const SidebarItem = ({ icon, label, active, to, collapsed, onClick }) => {
  return (
    <Link to={to} className="w-full" onClick={onClick}>
      <button
        className={`w-full flex items-center gap-3 px-3 py-2 h-auto text-left rounded-md transition-all ${
          active ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
        } ${collapsed ? 'justify-center px-2' : ''}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </button>
    </Link>
  );
};

const Sidebar = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);
  const path = window.location.pathname;

  return (
    <div className={`h-screen flex flex-col border-r bg-gray-50 transition-all ${collapsed ? 'w-16' : 'w-60'} ${className}`}>
      <div className="flex items-center px-4 py-5">
        {!collapsed && <h2 className="text-xl font-semibold">FinTrack</h2>}
      </div>
      <button
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-white shadow-md"
        onClick={toggleSidebar}
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
      <div className="flex-1 overflow-auto py-2 px-3">
        <nav className="flex flex-col gap-1">
          <SidebarItem icon={<Home className="h-4 w-4" />} label="Dashboard" to="/dashboard" active={path === '/dashboard'} collapsed={collapsed} />
          <SidebarItem icon={<Wallet className="h-4 w-4" />} label="Accounts" to="/accounts" active={path === '/accounts'} collapsed={collapsed} />
          <SidebarItem icon={<Receipt className="h-4 w-4" />} label="Transactions" to="/transactions" active={path === '/transactions'} collapsed={collapsed} />
          <SidebarItem icon={<BarChart3 className="h-4 w-4" />} label="Analytics" to="/analytics" active={path === '/analytics'} collapsed={collapsed} />
          <SidebarItem icon={<PieChart className="h-4 w-4" />} label="Budgets" to="/budgets" active={path === '/budgets'} collapsed={collapsed} />
          <SidebarItem icon={<Calendar className="h-4 w-4" />} label="Calendar" to="/calendar" active={path === '/calendar'} collapsed={collapsed} />
        </nav>
        {!collapsed && <h3 className="mt-4 px-2 text-xs font-medium text-gray-500">Quick Actions</h3>}
        <div className="mt-2">
          <SidebarItem icon={<Plus className="h-4 w-4" />} label="Add Expense" to="/add-expense" active={path === '/add-expense'} collapsed={collapsed} />
          <SidebarItem icon={<CreditCard className="h-4 w-4" />} label="Add Income" to="/add-income" active={path === '/add-income'} collapsed={collapsed} />
        </div>
      </div>
      <div className="border-t p-3">
        <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" to="/settings" active={path === '/settings'} collapsed={collapsed} />
      </div>
    </div>
  );
};

export default Sidebar;
