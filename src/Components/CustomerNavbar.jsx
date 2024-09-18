import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import axios from 'axios';

// Carousel Images
const carouselImages = [
  "https://wallpaperaccess.com/full/1496231.jpg",
  "https://img.freepik.com/free-photo/cyber-monday-sale-red-labels-concept-copy-space_23-2148670063.jpg",
  "https://img.freepik.com/free-photo/full-shot-woman-holding-sale-tag_23-2149220649.jpg",
];

// Brand Logos
const brandLogos = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnH8SDZ9_VWl8c35f9SYAGnFIw6Nv_9Hpvsw&s",
  "https://www.hm.com/entrance/assets/bundle/img/HM-Share-Image.jpg",
  "https://i.pinimg.com/originals/d0/26/cd/d026cdab7c96788a41c54941dc836696.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBUWunJ1elYLIWhRR2ZTnCk2otEzQIk4RVqA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrzJvWU0onXnd7RNG5oMBMvWd7eKdcSCEqw&s",
  "https://etimg.etb2bimg.com/photo/68610404.cms",
];

const CustomerNavbar = () => {
  const [user, setUser] = useState({ username: '', email: '', profilePhoto: '' });
  const [editProfile, setEditProfile] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleEditProfile = () => {
    setEditProfile(!editProfile);
  };

  const handlePasswordChange = () => {
    // Verify old password and change to new password
    axios.post('/api/user/change-password', { oldPassword, newPassword })
      .then(response => {
        alert('Password changed successfully');
        setOldPassword('');
        setNewPassword('');
      })
      .catch(error => {
        setPasswordError('Error changing password: ' + error.response.data.message);
      });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000, // Change slide every 3 seconds
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <nav className="bg-orange-100 text-black py-4 relative z-10">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            TextileShop
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/customerview" className="hover:text-orange-400">Shop</Link>
            <Link to="/customertracking" className="hover:text-orange-400">Order Status</Link>
            <Link to="/aboutus" className="hover:text-orange-400">About Us</Link>
            <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>
            <Link to="/" className="hover:text-orange-400">Logout</Link>


            {/* Profile Photo and Dropdown */}
            <div className="relative">
              <button onClick={handleEditProfile} className="flex items-center space-x-2 hover:text-orange-400">
                <img src={user.profilePhoto || 'https://via.placeholder.com/40'} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
                <span>{user.username || 'User'}</span>
              </button>
              {editProfile && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-gray-300 w-80 p-4 z-20">
                  <h3 className="text-lg font-bold">Edit Profile</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">CustomerName</label>
                      <input
                        type="text"
                        value={user.customerName}
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">Old Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="mt-2">
                      <label className="block text-sm font-medium">New Password</label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-2 text-sm text-blue-600">
                      {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                    <button type="submit" className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md">Change Password</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="carousel-container py-4 relative">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Carousel ${index + 1}`} className="w-full h-auto"/>
            </div>
          ))}
        </Slider>
      </div>

      <div className="brands-container py-8 bg-gray-100">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brandLogos.map((logo, index) => (
            <div key={index} className="flex items-center justify-center p-4">
              <img src={logo} alt={`Brand ${index + 1}`} className="w-full h-auto max-w-[150px]"/>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 TextileShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerNavbar;
