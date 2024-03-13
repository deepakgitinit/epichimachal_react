import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Adventurer',
      feedback:
        'The travel packages offered by this company are exceptional. I had an unforgettable experience exploring the Himalayas!',
    },
    {
      id: 2,
      name: 'Alice Smith',
      role: 'Foodie',
      feedback:
        'The food recommendations were spot-on! From street vendors to fine dining, I savored every bite.',
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Explorer',
      feedback:
        'The stays provided were cozy and comfortable. I felt right at home in every location.',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          What Our Travelers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600 mb-4">{testimonial.feedback}</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src="/avatar-placeholder.png" // Replace with actual avatar image
                    alt={`${testimonial.name}'s Avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export {Testimonials};
