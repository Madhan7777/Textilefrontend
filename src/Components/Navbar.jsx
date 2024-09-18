// import React from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick"; 
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import { Menu, MenuItem, Button, IconButton } from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// const sliderItems = [
//   {
//     id: 1,
//     src: "https://previews.123rf.com/images/varijanta/varijanta1601/varijanta160100046/51310252-thin-line-flat-design-banner-of-online-shopping-e-commerce-m-commerce-modern-vector-illustration.jpg", // Replace with actual image URLs
//     alt: "Slide 1",
//     text: "Explore our latest collection of stylish and trendy clothing. Shop now and update your wardrobe with the newest fashion."
//   },
//   {
//     id: 2,
//     src: "https://static.vecteezy.com/system/resources/previews/008/601/839/non_2x/online-shopping-background-design-free-vector.jpg",
//     alt: "Slide 2",
//     text: "Discover our top-rated products that have received excellent feedback from our customers. Don't miss out on these must-haves!"
//   },
//   {
//     id: 3,
//     src: "https://via.placeholder.com/1200x400?text=Slide+3",
//     alt: "Slide 3",
//     text: "Check out our amazing deals on kids wear and find the perfect outfit for your little ones. Affordable and stylish!"
//   },
// ];

// const Navbar = () => {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <nav className="bg-gray-100 text-black py-4 shadow-md">
//         <div className="container mx-auto flex items-center justify-between">
//           <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800">
//             TextileShop
//           </Link>
//           <div className="flex items-center space-x-4">
//             <Button
//               aria-controls={open ? 'login-menu' : undefined}
//               aria-haspopup="true"
//               onClick={handleClick}
//               endIcon={<ArrowDropDownIcon />}
//               color="inherit"
//             >
//               Login
//             </Button>
//             <Menu
//               id="login-menu"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               PaperProps={{
//                 elevation: 0,
//                 sx: {
//                   overflow: 'visible',
//                   filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))',
//                   mt: 1.5,
//                   '& .MuiMenuItem-root': {
//                     px: 2,
//                     py: 1.5,
//                   },
//                 },
//               }}
//             >
//               <MenuItem onClick={handleClose} component={Link} to="/customerregister">Customer</MenuItem>
//             </Menu>
//             <Link to="/customerview" className="hover:text-orange-400">Shop</Link>
//             <Link to="/adminlogin" className="hover:text-orange-400">Admin</Link>
//             <Link to="/about-us" className="hover:text-orange-400">About Us</Link>
//             <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>
//           </div>
//         </div>
//       </nav>

//       <div className="relative">
//         <Slider {...sliderSettings}>
//           {sliderItems.map(item => (
//             <div key={item.id}>
//               <img src={item.src} alt={item.alt} className="w-full h-auto object-cover" />
//               <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4">
//                 <p>{item.text}</p>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//       <section className="py-8 bg-gray-200">
//         <div className="container mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-4">Our Top Brands</h2>
//           <div className="flex flex-wrap justify-center gap-4">
//             <div className="bg-white p-4 rounded-lg shadow-md w-1/4 text-center">
//               <img src="https://designshifu.com/wp-content/uploads/2022/12/DS_Blog_Image_Best_Clothing_Brand_Logos_of_all_Time_3-1024x536.jpg" alt="Brand 1" className="mx-auto mb-2" />
//               <p>Brand 1: Known for high-quality materials and modern designs.</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md w-1/4 text-center">
//               <img src="https://i.pinimg.com/564x/fa/bc/79/fabc798657d18e5f432482706a9aede1.jpg" alt="Brand 2" className="mx-auto mb-2" />
//               <p>Brand 2: Offers stylish and affordable clothing for all ages.</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md w-1/4 text-center">
//               <img src="https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2020/03/Levis-760x585-1.png" alt="Brand 3" className="mx-auto mb-2" />
//               <p>Brand 3: Premium quality and elegant fashion pieces.</p>
//             </div>
//             <div className="bg-white p-4 rounded-lg shadow-md w-1/4 text-center">
//               <img src="https://designshifu.com/wp-content/uploads/2022/12/DS_Blog_Image_Best_Clothing_Brand_Logos_of_all_Time_19-1024x536.jpg" alt="Brand 4" className="mx-auto mb-2" />
//               <p>Brand 4: Trendy and eco-friendly clothing for the modern consumer.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <footer className="bg-gray-800 text-white py-6">
//         <div className="container mx-auto text-center">
//           <p className="text-lg font-semibold mb-2">Contact Us</p>
//           <p>123 Textile Street, Fashion City, FC 45678</p>
//           <p>Email: contact@textileshop.com</p>
//           <p>Phone: (123) 456-7890</p>
//           <p className="mt-4">&copy; 2024 TextileShop. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Menu, MenuItem, Button } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const sliderItems = [
  {
    id: 1,
    src: "https://media.tommy.com/us/static/images/scheduled_marketing/2024/09/06_HP_FullTile01a_dt.jpg",
    alt: "Slide 1",
    text: "Explore our latest collection of stylish and trendy clothing. Shop now and update your wardrobe with the newest fashion."
  },
  {
    id: 2,
    src: "https://leoncechenal.com/wp-content/uploads/2023/01/best_french_clothing_brands_for_men.webp",
    alt: "Slide 2",
    text: "Discover our top-rated products that have received excellent feedback from our customers. Don't miss out on these must-haves!"
  },
];

const categoryItems = {
  Men: ["Shirts", "Kurtas", "Trousers", "Suits", "Jackets", "Shorts", "Jeans", "Sweaters", "Blazers", "T-Shirts"],
  Women: ["Dresses", "Tops", "Skirts", "Blouses", "Suits", "Cardigans", "Jeans", "Leggings", "Jackets", "Shirts"],
  Kids: ["T-Shirts", "Shorts", "Dresses", "Jeans", "Sweaters", "Jackets", "Skirts", "Leggings", "Shirts", "Coats"],
  Casuals: ["Jeans", "T-Shirts", "Shorts", "Casual Shirts", "Sweaters", "Jackets", "Casual Shoes", "Capris", "Skirts", "Hoodies"],
  PrintedShirts: ["Floral", "Geometric", "Abstract", "Polka Dots", "Stripes", "Checks", "Paisley", "Animal Print", "Tie-Dye", "Plaid"]
};

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const open = Boolean(anchorEl);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <div>
      <nav className="bg-gray-100 text-black py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          {/* <img
            src="https://i.pinimg.com/736x/84/b5/9b/84b59be9b02536800fad4d2ea45a4813.jpg" 
            alt="Modern Loom Logo"
            className="h-20 w-auto mr-3"
          /> */}
          <Link to="/" className="text-4xl font-black text-red-600 hover:text-red-700">
            Modern Loom
          </Link>
          <div className="flex items-center space-x-4">
            {/* <Button
              aria-controls={open ? 'login-menu' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
              endIcon={<ArrowDropDownIcon />}
              color="inherit"
            >
              Login
            </Button> */}
            <Menu
              id="login-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))',
                  mt: 1.5,
                  '& .MuiMenuItem-root': {
                    px: 2,
                    py: 1.5,
                  },
                },
              }}
            >
              <MenuItem onClick={handleClose} component={Link} to="/customerregister">Customer</MenuItem>
            </Menu>
            <Link to="/customerregister" className="hover:text-orange-400">Let's Purchase</Link>
            <Link to="/adminlogin" className="hover:text-orange-400">Admin</Link>
            <Link to="/aboutus" className="hover:text-orange-400">About Us</Link>
            <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>
          </div>
        </div>
      </nav>

      <nav className="bg-white px-4 py-2 shadow-md">
        <div className="container mx-auto flex items-center justify-center space-x-10">
          {Object.keys(categoryItems).map((category) => (
            <div
              key={category}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/${category.toLowerCase()}`} className="px-4 py-2 text-gray-700 hover:text-gray-900">
                {category}
              </Link>
              {hoveredCategory === category && (
                <div className="absolute left-0 top-full bg-white shadow-lg mt-2 z-10 w-48 border border-gray-300 rounded-lg">
                  <ul className="p-2">
                    {categoryItems[category].map((item) => (
                      <li key={item} className="px-4 py-2 text-gray-700 hover:bg-gray-100 border-b border-gray-200 last:border-0">
                        <Link to={`/${category.toLowerCase()}/${item.toLowerCase()}`}>
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Slider */}
      <div className="relative mt-8">
        <Slider {...sliderSettings}>
          {sliderItems.map(item => (
            <div key={item.id} className="relative">
              <img src={item.src} alt={item.alt} className="w-full h-auto object-cover" />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent text-white p-4 w-full">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Top Brands */}
      <section className="py-8 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Our Top Brands</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[  {
              src: "https://designshifu.com/wp-content/uploads/2022/12/DS_Blog_Image_Best_Clothing_Brand_Logos_of_all_Time_3-1024x536.jpg",
              alt: "Brand 1"
            },
            {
              src: "https://i.pinimg.com/564x/fa/bc/79/fabc798657d18e5f432482706a9aede1.jpg",
              alt: "Brand 2"
            },
            {
              src: "https://blog-frontend.envato.com/cdn-cgi/image/width=1024,quality=75,format=auto/uploads/2020/03/Levis-760x585-1.png",
              alt: "Brand 3"
            },
            {
              src: "https://yt3.googleusercontent.com/INtyscaUlFW14HkPOVupu2To90OkCbJ-b3vuiyp-2umkKl2FOqiyOChA1rE2WmIBEkEHA-wFLQ=s900-c-k-c0x00ffffff-no-rj",
              alt: "Brand 4"
            },
            {
              src: "https://download.logo.wine/logo/H%26M/H%26M-Logo.wine.png",
              alt: "Brand 5"
            },
            {
              src: "https://seeklogo.com/images/P/peter-england-logo-CAA89E9287-seeklogo.com.png",
              alt: "Brand 6"
            }
            ].map((brand, index) => (
              <div key={index} className="w-1/6 p-2">
                <img src={brand.src} alt={brand.alt} className="mx-auto w-full h-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Feedbacks and Reviews */}
      <section className="py-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[{
              name: "Johnkit",
              review: "Great selection of clothes and excellent customer service. Highly recommended!",
              rating: 5,
              imgSrc: "https://randomuser.me/api/portraits/men/1.jpg"
            },
            {
              name: "Priya",
              review: "Love the variety and the quality is top-notch. Will definitely shop here again.",
              rating: 4,
              imgSrc: "https://randomuser.me/api/portraits/women/2.jpg"
            },
            {
              name: "JansiRani",
              review: "Affordable prices and stylish designs. My new go-to store for fashion.",
              rating: 4,
              imgSrc: "https://randomuser.me/api/portraits/women/3.jpg"
            },
            {
              name: "AnilKumar",
              review: "Excellent service and high-quality clothing. Highly satisfied with my purchases.",
              rating: 3,
              imgSrc: "https://randomuser.me/api/portraits/men/4.jpg"
            }
            ].map((feedback, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg w-80">
                <div className="flex items-center mb-4">
                  <img src={feedback.imgSrc} alt={feedback.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-semibold text-lg">{feedback.name}</p>
                    <div className="flex items-center">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.87L12 16.56 8.82 21l1.18-6.87-5-4.87 5.91-.81L12 2z"/></svg>
                      ))}
                      {[...Array(5 - feedback.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.87L12 16.56 8.82 21l1.18-6.87-5-4.87 5.91-.81L12 2z"/></svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700">{feedback.review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-lg font-semibold mb-2">Contact Us</p>
          <p>123 Textile Street, Fashion City, FC 45678</p>
          <p>Email: contact@textileshop.com</p>
          <p>Phone: (123) 456-7890</p>
          <p className="mt-4">&copy; 2024 TextileShop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
