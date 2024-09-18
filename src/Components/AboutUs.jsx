import React from 'react';
import CustomerHeader from './CustomerHeader';

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <CustomerHeader/>
    <div className="bg-gray-50 text-gray-800">
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">About Us</h1>
          <p className="text-lg md:text-xl mb-12 leading-relaxed">
            Welcome to ModernLoom, your go-to destination for high-quality, fashionable clothing for men and women. We pride ourselves on offering a wide range of styles that cater to diverse tastes and preferences. Our mission is to provide exceptional clothing that combines comfort, style, and durability.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img src="https://d1fufvy4xao6k9.cloudfront.net/images/blog/posts/2023/10/hockerty_man_in_a_posh_polo_shirt_beige_outfit_in_front_of_a_lu_64105600_94ac_4eba_8f97_5fc6b29f918a__1_.jpg" alt="Men's Collection" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Men's Collection</h2>
                  <p className="text-gray-600">
                    At ModernLoom, our men's collection is designed to offer both style and comfort. From casual wear to formal attire, our range includes everything from sleek suits and jackets to trendy jeans and comfortable tees. We use only the finest materials to ensure that our clothing is not only fashionable but also durable.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img src="https://i.pinimg.com/736x/d2/7c/4a/d27c4a8ee62ca94e045f0e7f422e986c.jpg" alt="Women's Collection" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Women's Collection</h2>
                  <p className="text-gray-600">
                    Our women's collection offers a diverse array of clothing that caters to every occasion. Whether you're looking for elegant dresses, stylish blouses, or cozy sweaters, we have something for every fashion enthusiast. We focus on providing high-quality fabrics and contemporary designs that make you feel confident and beautiful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Commitment to Quality</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            At ModernLoom, quality is our top priority. We meticulously source our materials and work with skilled craftsmen to ensure that every piece of clothing meets our high standards. Our commitment to excellence is reflected in every stitch and fabric, providing you with garments that are not only stylish but also built to last.
          </p>
          <img src="https://media.assettype.com/knocksense%2F2024-02%2F87f6c740-422c-4fbd-9b34-9e2415142310%2F82307182_2665543886865408_8071081462943711232_o.jpg?rect=0%2C0%2C1080%2C608" alt="Our Commitment to Quality" className="w-full h-80 object-cover rounded-lg shadow-lg" />
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Join Our Community</h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed">
            We invite you to become a part of the ModernLoom community. Follow us on social media to stay updated with our latest collections, exclusive offers, and fashion tips. Join our mailing list for regular updates and be the first to know about new arrivals and promotions.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://facebook.com" className="text-blue-600 hover:text-blue-800 transition-colors">
              <img src="https://via.placeholder.com/40x40?text=FB" alt="Facebook" className="w-10 h-10" />
            </a>
            <a href="https://instagram.com" className="text-pink-600 hover:text-pink-800 transition-colors">
              <img src="https://via.placeholder.com/40x40?text=IG" alt="Instagram" className="w-10 h-10" />
            </a>
            <a href="https://twitter.com" className="text-blue-400 hover:text-blue-600 transition-colors">
              <img src="https://via.placeholder.com/40x40?text=TW" alt="Twitter" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;
