import { useState } from "react";
import { Link } from "react-router-dom";
import contactUs from "../../../assets/contact-us.webp";

import {
  BadgeDollarSign,
  Facebook,
  Instagram,
  Linkedin,
  Ship,
  Timer,
  Truck,
  Twitter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { ACCESS_TOKEN } from "@/utils/formControls";

const services = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50.",
    icon: Ship,
    iconColor: "text-blue-500", // Blue for Free Shipping
  },
  {
    title: "24/7 Customer Support",
    description: "We're here to help you anytime, anywhere.",
    icon: Timer,
    iconColor: "text-green-500", // Green for Support
  },
  {
    title: "Easy Returns",
    description: "Hassle-free returns within 30 days.",
    icon: Truck,
    iconColor: "text-yellow-500", // Yellow for Returns
  },
  {
    title: "Exclusive Discounts",
    description: "Sign up for our newsletter and get exclusive offers.",
    icon: BadgeDollarSign,
    iconColor: "text-red-500", // Red for Discounts
  },
];

const ShoppingFooter = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", contactData.name);
    formData.append("email", contactData.email);
    formData.append("message", contactData.message);
    formData.append("access_key", ACCESS_TOKEN);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    setContactData({
      name: "",
      email: "",
      message: "",
    });

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      toast({
        Title: "Success",
        description: "Message sent successfully",
      });
    }
  };

  return (
    <>
      {/* Services Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-left">Our Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-md cursor-pointer">
                <CardContent className="p-6 text-center">
                  {/* Icon and Title */}
                  <div className="mb-4">
                    <service.icon
                      className={`w-12 h-12 ${service.iconColor} mx-auto`}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Contact Form */}
            <div className="w-full">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-sm mb-6 text-gray-600">
                Have any questions or inquiries? Please fill out the form below,
                and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    placeholder="Your Name"
                    name="name"
                    value={contactData.name}
                    className="w-full border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 rounded-md"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    value={contactData.email}
                    className="w-full border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 rounded-md"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    name="message"
                    value={contactData.message}
                    rows="5"
                    className="w-full border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 rounded-md"
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Image Section */}
            <div className="max-lg:hidden w-full flex justify-center items-center">
              <img
                src={contactUs}
                alt="Contact"
                className="w-full max-w-md lg:max-w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-sm text-justify">
                Welcome to{" "}
                <span className="font-semibold font-mono">E-Commerce</span>,
                where style meets quality. Explore our curated selection of
                apparel, accessories, footwear, and home essentials, all crafted
                to elevate your lifestyle.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul>
                <li>
                  <Link to="/" className="text-sm hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop/listing" className="text-sm hover:underline">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul>
                <li className="text-sm">Email: support@example.com</li>
                <li className="text-sm">Phone: +1 234 567 890</li>
                <li className="text-sm">
                  Address: 123 Main Street, City, Country
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400"
                >
                  <Facebook className="w-6 h-6 text-blue-700" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400"
                >
                  <Twitter className="w-6 h-6 text-sky-500" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400"
                >
                  <Instagram className="w-6 h-6 text-pink-500" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl hover:text-gray-400"
                >
                  <Linkedin className="w-6 h-6 text-blue-500" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 border-t pt-4">
            <p className="text-sm">
              &copy; 2025 E-Commerce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ShoppingFooter;
