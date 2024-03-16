import React, { useState } from 'react';
import { useAuth } from "../../contexts/Auth";
import AdminBookingList from './AdminBookings';
import {AddDestination} from './AdminDestinations';
import PackageForm from './AdminPackages';

const Admin = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'tab1');
  const { role, isAuthenticated } = useAuth();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  if (isAuthenticated() && role=="ADMIN") {
    return (
      <div className="container mx-auto py-8">
      <div className="flex justify-center flex-col md:flex-row *:md:my-0 *:my-1">
        <button
          className={`px-4 py-2 md:mr-2 focus:outline-none rounded-md ${activeTab === 'tab1' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab1')}
          >
          Bookings
        </button>
        <button
          className={`px-4 py-2 focus:outline-none rounded-md ${activeTab === 'tab2' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab2')}
          >
          Destinations
        </button>
        <button
          className={`px-4 py-2 md:ml-2 focus:outline-none rounded-md ${activeTab === 'tab3' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab3')}
          >
          Packages
        </button>
      </div>

      <div className="mt-8">
        {activeTab === 'tab1' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <AdminBookingList/>
          </div>
        )}
        {activeTab === 'tab2' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <AddDestination/>
          </div>
        )}
        {activeTab === 'tab3' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <PackageForm/>
          </div>
        )}
      </div>
    </div>
  );
}else{
  window.location.replace("/")
}
};

export { Admin }