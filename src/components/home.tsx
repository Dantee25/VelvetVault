import React, { useState } from "react";
import { FaTiktok } from "react-icons/fa";
import {
  Menu,
  Star,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

import InteriorImage from "./images/InteriorImageHome.jpg";
import ExteriorImage from "./images/ExteriorImage.jpg";
import PaintImage from "./images/PaintImage.jpg";
import Insta1 from "./images/Insta1.jpg";
import Insta2 from "./images/Insta2.jpg";
import Insta3 from "./images/Insta3.jpg";

export default function HomePage() {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false); //State for message confirmation pop-up

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
    };

    try {
        const response = await fetch('https://velvetvault.onrender.com/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        }); 

        if (response.ok) {
            setIsPopupVisible(true); // Show confirmation popup
        } else {
            alert('Failed to send your message. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
};





  return (
    <div className="min-h-screen bg-white relative">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 0 0, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 100% 0, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 0 100%, #71086E20 0%, transparent 20%),
            radial-gradient(circle at 100% 100%, #71086E20 0%, transparent 20%)
          `,
        }}
      />
      <nav className="fixed w-full z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold text-[#71086E]">
              Velvet Vault Auto Detailing
            </div>
            <div className="hidden md:flex space-x-8">
            <a
                href="#services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Services
              </a>
              <Link
                to="/services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Pricing
              </Link>
              <a
                href="#instagram"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Instagram
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Contact
              </a>
            </div>
            <button className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-6 w-6 text-[#71086E]" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <a
                href="#services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <Link
                to="/services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Pricing
              </Link>
              <a
                href="#instagram"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Instagram
              </a>
              <a
                href="#contact"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${ExteriorImage})`, zIndex: 0 }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#71086E]/50" style={{ zIndex: 1 }}></div>

        {/* Content (Ensure it's on top) */}
        <div className="relative max-w-3xl text-center text-white px-6" style={{ zIndex: 2 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 opacity-100 animate-fadeIn">
            Premium Auto Detailing Services
          </h1>
          <p className="text-xl text-white/90 mb-8 opacity-100 animate-fadeIn delay-200">
            Experience the ultimate in automotive care with our professional detailing services.
          </p>

          {/* CTA Button */}
          <Link
            to="/services"
            className="inline-flex items-center px-10 py-4 text-lg font-bold text-white bg-[#71086E] rounded-full 
                      hover:bg-[#5E0660] transition-all transform hover:scale-110 shadow-lg"
          >
            Explore Services
            <ChevronRight className="ml-3 h-6 w-6" />
          </Link>

        </div>
      </section>




      <section
        id="services"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center text-[#71086E] mb-6 relative">
          Our Services
        </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Interior Detailing",
                description: "Complete interior cleaning and restoration services.",
                image:
                  InteriorImage,
              },
              {
                title: "Exterior Detailing",
                description: "Professional washing, rim and tire detailing, headlight restorations, and window cleaning.",
                image:
                  ExteriorImage,
              },
              {
                title: "Paint Corrections",
                description: "Profession polish and waxing, 1 and 2 step paint corrections, and coatings.",
                image:
                  PaintImage,
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Button Section */}
          <div className="mt-16 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center px-10 py-4 text-lg font-bold border-2 border-[#71086E] text-[#71086E] 
                      rounded-full hover:bg-[#71086E] hover:text-white transition-all transform hover:scale-105 shadow-md"
          >
            Estimate Prices
            <ChevronRight className="ml-3 h-6 w-6" />
          </Link>

          </div>
        </div>
      </section>
      <section 
      id="instagram"
      className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-extrabold text-[#71086E] mb-6 tracking-wide">
            Check Us Out on Instagram! 📸
          </h2>

          <p className="text-gray-600 text-lg mb-8">
            See our latest detailing work, transformations, and high-end edits!
          </p>

          {/* Instagram Preview (Replace with your best posts) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src={Insta1} alt="Detailing Work" className="rounded-lg shadow-lg"/>
            <img src={Insta2} alt="Luxury Car Polishing" className="rounded-lg shadow-lg"/>
            <img src={Insta3} alt="Interior Deep Clean" className="rounded-lg shadow-lg"/>
          </div>


          {/* Instagram Button */}
          <div className="mt-8">
          <a
            href="https://www.instagram.com/velvetvaultauto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#FF6B6B] to-[#71086E] 
                      rounded-full hover:opacity-90 transition-all transform hover:scale-110 shadow-xl"
          >
            📸 Follow & Book Now
          </a>

          </div>
        </div>
      </section>

        <section
          id="testimonials"
          className="py-24 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-center text-[#71086E] mb-6 flex items-center justify-center gap-2">
            ⭐ Customer Reviews ⭐
          </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ricardo G.",
                  comment:
                    "He left my 2013 Tacoma look like a 2025 Tundra. Amazing work.",
                  rating: 5,
                },
                {
                  name: "Daniel M.",
                  comment:
                    "He left my busted 6 year old mats look like the day I bought them..",
                  rating: 5,
                },
                {
                  name: "Lebron James",
                  comment: "Best Detailer in Town. No cap.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-[#71086E] fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.comment}"</p>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        <section
          id="contact"
          className="py-24 bg-gradient-to-b from-[#1E3A8A] to-black"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">Contact Us</h2>
                <p className="text-white/90 mb-8">
                  Ready to experience premium auto detailing? Get in touch with us
                  today.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-white">
                    <Phone className="h-5 w-5 mr-2" />
                    <span>+1 (915) 232-7873</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>velvetvaultauto@outlook.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>El Paso, Texas</span>
                  </div>
                </div>
              </div>
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address (Optional)"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number (Optional eg:1234567890)"
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                    pattern="[0-9]{10}"
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                    required
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-[#71086E] text-white py-3 rounded-lg hover:bg-[#71086E]/80 transition-colors"
                >
                    Send Message
                </button>
            </form>
            {isPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 animate-fadeIn">
                  <div className="bg-white text-[#1E3A8A] p-6 rounded-xl shadow-xl w-80">
                      
                      {/* Popup Content */}
                      <h3 className="text-xl font-semibold mb-3 text-center">Thank You!</h3>
                      <p className="text-sm text-[#4A5568] text-center mb-6">
                          Your message has been received. We’ll get back to you shortly.
                      </p>
                      {/* Close Button */}
                      <button
                          onClick={() => setIsPopupVisible(false)}
                          className="w-full bg-[#71086E] text-white py-2 rounded-lg hover:bg-[#71086E]/90 transition-transform transform hover:scale-105 shadow-md"
                      >
                          Close
                      </button>
                  </div>
              </div>
            )}




            </div>
          </div>
        </section>
  
        <footer className="bg-black text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Velvet Vault Auto Detailing
                </h3>
                <p className="text-white/60">
                  Premium auto detailing services for discerning clients.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#services"
                      className="text-white/60 hover:text-white"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#instagram" className="text-white/60 hover:text-white">
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="text-white/60 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Services</h4>
                <ul className="space-y-2">
                  <li className="text-white/60">Interior Detailing</li>
                  <li className="text-white/60">Exterior Detailing</li>
                  <li className="text-white/60">Paint Protection</li>
                  <li className="text-white/60">Ceramic Coating</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.tiktok.com/@velvetvaultautode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    <FaTiktok className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61569906939845"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/velvetvaultauto" // Replace with your Instagram profile URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                </div>
              </div>

            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
              <p>&copy; 2023 Velvet Vault Auto Detailing. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>
  );
}







