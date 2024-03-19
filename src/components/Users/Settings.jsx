import React, { useState } from 'react';
import { useAuth } from "../../contexts/Auth";
import { SetPassword } from '../../utils/SetPassword';

const Settings = () => {
  const [activeTabSettings, setActiveTabSettings] = useState('tab1');
  const { isAuthenticated } = useAuth();

  const handleTabClick = (tab) => {
    setActiveTabSettings(tab);
  };

  if (isAuthenticated()) {
    return (
      <div className="container mx-auto py-8">
      <div className="flex justify-center">
        <button
          className={`px-4 py-2 mr-2 focus:outline-none rounded-md ${activeTabSettings === 'tab1' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab1')}
          >
          Change Password
        </button>
        {/* <button
          className={`px-4 py-2 focus:outline-none rounded-md ${activeTabSettings === 'tab2' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab2')}
          >
          Destinations
        </button>
        <button
          className={`px-4 py-2 ml-2 focus:outline-none rounded-md ${activeTabSettings === 'tab3' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => handleTabClick('tab3')}
          >
          Packages
        </button> */}
      </div>

      <div className="mt-8">
        {activeTabSettings === 'tab1' && (
          <div className="bg-gray-200 p-4 rounded-md">
            <SetPassword />
          </div>
        )}
        {/* {activeTabSettings === 'tab2' && (
          <div className="bg-gray-200 p-4 rounded-md">
            Content of Tab 2
          </div>
        )}
        {activeTabSettings === 'tab3' && (
          <div className="bg-gray-200 p-4 rounded-md">
            Content of Tab 3
          </div>
        )} */}
      </div>
    </div>
  );
}else{
  window.location.replace("/login")
}
};

export { Settings }