import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:*:shadow-2xl *:transition-shadow">
          {/* Best Car Services */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Best Car Services</h3>
            <p className="text-gray-600">
              Our fleet of modern, comfortable vehicles ensures a smooth and
              safe journey to your destination.
            </p>
          </div>

          {/* Best Travel Packages */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Best Travel Packages</h3>
            <p className="text-gray-600">
              Explore our curated travel packages that offer unique experiences
              and value for your money.
            </p>
          </div>

          {/* Best Stays */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Best Stays</h3>
            <p className="text-gray-600">
              From cozy boutique hotels to luxurious resorts, we offer
              accommodations that suit every traveler's preferences.
            </p>
          </div>
          
          {/* Best Food */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Best Food</h3>
            <p className="text-gray-600">
              Indulge in local and international cuisines at our partner
              restaurants and enjoy memorable dining experiences.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export { WhyChooseUs };
