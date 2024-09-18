import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

// Sample slider component
const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} className="mb-8">
      <div>
        <img src="https://www.frisbo.eu/hubfs/Fashion-Fulfillment.jpg" alt="Textile 1" className="w-full h-auto" />
      </div>
      <div>
        <img src="https://www.avikalp.com/cdn/shop/products/MWZ3576_wallpaper1.jpg?v=1653227702" alt="Textile 2" className="w-full h-auto" />
      </div>
    </Slider>
  );
};

// Sample card component
const InfoCard = ({ image, title, description }) => (
  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const AdminNavbar = () => {
  return (
    <>
      <nav className="bg-slate-100 text-slate-950 py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8">
          <Link to="/" className="text-3xl font-bold hover:text-rose-500 transition-colors duration-300">
            Modern Loom
          </Link>
          
          <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
            <Link to="/adminnavbar" className="hover:text-rose-500 transition-colors duration-300">Home</Link>
            <Link to="/addproduct" className="hover:text-rose-500 transition-colors duration-300">Add Stock</Link>
            <Link to="/viewadminproduct" className="hover:text-rose-500 transition-colors duration-300">View Stock</Link>
            <Link to="/orderhistory" className="hover:text-rose-500 transition-colors duration-300">Order History</Link>
            <Link to="/admindashboard" className="hover:text-rose-500 transition-colors duration-300">Admin Dashboard</Link>
            <Link to="/addtracking" className="hover:text-rose-500 transition-colors duration-300">Manage Order Tracking</Link>
            <Link to="/viewtracking" className="hover:text-rose-500 transition-colors duration-300">View Order Tracking</Link>
            <Link to="/" className="hover:text-rose-500 transition-colors duration-300">Logout</Link>
          </div>
        </div>
      </nav>

      {/* Slider Section */}
      <div className="container mx-auto px-4 py-8">
        <ImageSlider />
      </div>

      {/* Textile Industry Content */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome to Modern Loom</h2>
          <p className="text-center text-lg mb-8">
            Explore the finest collection of textiles that combine quality with craftsmanship. From luxurious fabrics to modern designs, we offer a wide range of products to meet all your textile needs. Discover the latest trends and enhance your collection with our premium selection.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoCard
              image="https://www.givuil.com/cdn/shop/articles/a-guide-to-premium-quality-clothing.png?v=1714798115"
              title="Premium Quality"
              description="Our textiles are crafted from the finest materials ensuring durability and comfort."
            />
            <InfoCard
              image="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fa/e15e80504811e6bcaf7158d37ab7ca/LightBulb.jpg"
              title="Innovative Designs"
              description="Stay ahead with our innovative designs that merge tradition with modern trends."
            />
            <InfoCard
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHYszpZfgJTiJRMyTUYWMcC9frawAle1PA&s"
              title="Sustainable Practices"
              description="We are committed to sustainability, using eco-friendly processes in our manufacturing."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 text-slate-950 py-4 shadow-md mt-8">
        <div className="container mx-auto text-center px-4">
          <p>&copy; 2024 ModernLoom. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/" className="hover:text-rose-50 transition-colors duration-300">Privacy Policy</Link>
            <Link to="/" className="hover:text-rose-50 transition-colors duration-300">Terms of Service</Link>
            <Link to="/" className="hover:text-rose-50 transition-colors duration-300">Contact Us</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminNavbar;
