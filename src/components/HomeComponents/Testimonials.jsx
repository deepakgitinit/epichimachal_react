import React from 'react';

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: 'Akshay Sharma',
      role: 'Adventurer',
      feedback:
        'The travel packages offered by this company are exceptional. I had an unforgettable experience exploring the Himalayas!',
      image: "https://t3.ftcdn.net/jpg/03/02/88/46/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg"
    },
    {
      id: 2,
      name: 'Arayan Kumar',
      role: 'Foodie',
      feedback:
        'The food recommendations were spot-on! From street vendors to fine dining, I savored every bite.',
      image: "https://img.freepik.com/free-photo/handsome-hispanic-man-with-beard-wearing-casual-clothes-with-happy-cool-smile-face-lucky-person_839833-31901.jpg?size=626&ext=jpg&ga=GA1.1.735520172.1710460800&semt=ais"
    },
    {
      id: 3,
      name: 'Amrita Singh',
      role: 'Explorer',
      feedback:
        'The stays provided were cozy and comfortable. I felt right at home in every location.',
      image: "https://img.freepik.com/premium-photo/portrait-young-indian-woman-happy-with-internship-human-resources-opportunity-mission-vision-company-values-goals-face-headshot-gen-z-person-with-hr-job-about-us-faq_590464-134290.jpg"
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
                    src={testimonial.image}
                    alt={`${testimonial.name}'s Avatar`}
                    className="w-10 h-10 rounded-full object-cover"
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
