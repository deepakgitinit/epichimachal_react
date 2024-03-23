import React, { useState } from 'react';
import { useAuth } from "../../contexts/Auth";
import { AddDestination } from './AdminDestinations';
import { AdminTaxi } from './AdminTaxi';
import { AdminPickups } from './AdminPickup';
import PackageForm from './AdminPackages';
import AdminBookingList from './AdminBookings';

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
        <button
          className={`px-4 py-2 md:ml-2 focus:outline-none rounded-md ${activeTab === 'tab4' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab4')}
          >
          Taxies
        </button>
        <button
          className={`px-4 py-2 md:ml-2 focus:outline-none rounded-md ${activeTab === 'tab5' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab5')}
          >
          Pickup Locations
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
        {activeTab === 'tab4' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <AdminTaxi/>
          </div>
        )}
        {activeTab === 'tab5' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <AdminPickups/>
          </div>
        )}
      </div>
    </div>
  );
}else{
  window.location.replace("/");
}
};

export { Admin }