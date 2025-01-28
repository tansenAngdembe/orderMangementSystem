import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gray-50 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;