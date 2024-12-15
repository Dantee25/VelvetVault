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

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu visibility

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
              <Link
                to="/services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Services
              </Link>
              <a
                href="#gallery"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
              >
                About
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
              <Link
                to="/services"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                Services
              </Link>
              <a
                href="#gallery"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
              <a
                href="#about"
                className="text-gray-800 hover:text-[#71086E] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
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

      <section className="relative h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-[#71086E]/50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Premium Auto Detailing Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Experience the ultimate in automotive care with our professional
              detailing services
            </p>
            <a
              href="#services"
              className="inline-flex items-center px-8 py-3 bg-[#71086E] text-white rounded-lg hover:bg-[#71086E]/80 transition-colors"
            >
              Explore Services
              <ChevronRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="py-24 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#1E3A8A]">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Interior Detailing",
                description:
                  "Complete interior cleaning and restoration services",
                image:
                  "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80",
              },
              {
                title: "Exterior Detailing",
                description:
                  "Professional washing, waxing, and paint protection",
                image:
                  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80",
              },
              {
                title: "Premium Packages",
                description:
                  "Comprehensive detailing solutions for your vehicle",
                image:
                  "https://images.unsplash.com/photo-1600275669439-14e40452d20b?auto=format&fit=crop&q=80",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={service.image}
                  alt={service.title}
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
        </div>
      </section>

      <section id="about" className="py-24 bg-[#1E3A8A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">About Us</h2>
                <p className="text-white/90 mb-6">
                  With over a decade of experience in premium auto detailing, we
                  provide unmatched service quality and customer satisfaction.
                </p>
                <ul className="space-y-4">
                  {[
                    "Professional Equipment",
                    "Certified Technicians",
                    "Premium Products",
                    "Satisfaction Guaranteed",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-white">
                      <Star className="h-5 w-5 mr-2 text-[#71086E]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-96">
                <img
                  src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80"
                  alt="Detailing process"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
  
        <section
          id="testimonials"
          className="py-24 bg-gradient-to-b from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-16 text-[#1E3A8A]">
              Client Testimonials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Smith",
                  comment:
                    "Exceptional service! My car looks better than when it was new.",
                  rating: 5,
                },
                {
                  name: "Sarah Johnson",
                  comment:
                    "Professional, thorough, and attention to detail is outstanding.",
                  rating: 5,
                },
                {
                  name: "Michael Brown",
                  comment: "Best auto detailing service I've ever experienced.",
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
                    <span>+1 (915)232-7873</span>
                  </div>
                  <div className="flex items-center text-white">
                    <Mail className="h-5 w-5 mr-2" />
                    <span>velvetvaultauto@gmail.com</span>
                  </div>
                  <div className="flex items-center text-white">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>123 Detail Street, Car City, ST 12345</span>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                />
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#71086E]"
                ></textarea>
                <button className="w-full bg-[#71086E] text-white py-3 rounded-lg hover:bg-[#71086E]/80 transition-colors">
                  Send Message
                </button>
              </form>
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
                    <a href="#gallery" className="text-white/60 hover:text-white">
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-white/60 hover:text-white">
                      About
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
                    href="https://www.tiktok.com/@velvetvaultautode" // Replace with your TikTok profile URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    <FaTiktok className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61569906939845" // Replace with your Facebook profile URL
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/yourprofile" // Replace with your Instagram profile URL
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







