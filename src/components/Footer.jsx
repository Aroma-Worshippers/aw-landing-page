// Footer.jsx - Better typography and organized structure
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: MdEmail,
      text: "aromaworshippers@gmail.com",
      link: "mailto:aromaworshippers@gmail.com",
      label: "Email",
    },
    {
      icon: MdPhone,
      text: "+234 706 846 9754, +234 706 793 3625",
      link: null,
      label: "Phone",
    },
    {
      icon: FaInstagram,
      text: "Aroma Worshippers Music Ministry",
      link: "https://www.instagram.com/aromaworshippers?igsh=MXkxZ2tyZGltNDFlZA==",
      label: "Instagram",
    },
    {
      icon: FaFacebook,
      text: "@aromaworshippers",
      link: "https://www.facebook.com/share/1GC5cwEqzN/",
      label: "Facebook",
    },
    {
      icon: MdLocationOn,
      text: "Enugu, Nigeria",
      link: null,
      label: "Location",
    },
  ];

  const socialLinks = [
    {
      icon: FaYoutube,
      text: "@godsoracle",
      link: "https://youtube.com/@godsoracle?si=tYzbECHi8eCmP6Bd",
      label: "YouTube",
    },
    {
      icon: FaFacebook,
      text: "@aromaworshippers",
      link: "https://www.facebook.com/share/1GC5cwEqzN/",
      label: "Facebook",
    },
    {
      icon: FaInstagram,
      text: "Aroma Worshippers Music Ministry",
      link: "https://www.instagram.com/aromaworshippers?igsh=MXkxZ2tyZGltNDFlZA==",
      label: "Instagram",
    },
  ];

  return (
    <footer id="contact" className="mt-auto bg-green-950">
      {/* Main Footer Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl md:py-16">
        {/* Header Section */}
        <div className="flex flex-col justify-between mb-8 space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-white uppercase md:text-2xl">
              Contact Information
            </h2>
            <p className="mt-1 text-sm text-gray-300 md:text-base">
              For more details, please contact us
            </p>
          </div>
          <div>
            <img
              src="/assets/AW LOGO 2b 2.png"
              alt="Aroma Worshippers Logo"
              className="w-auto h-16 md:h-20"
              loading="lazy"
            />
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-8 py-8 border-t border-b border-green-800/50 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="mb-3 text-base font-semibold text-white uppercase md:text-lg">
              Get in Touch
            </h3>
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 group">
                <item.icon className="flex-shrink-0 mt-0.5 text-[#00B425] text-lg" />
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 transition-colors hover:text-[#00B425] hover:underline md:text-base"
                  >
                    {item.text}
                  </a>
                ) : (
                  <p className="text-sm text-gray-300 md:text-base">
                    {item.text}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="space-y-3">
            <h3 className="mb-3 text-base font-semibold text-white uppercase md:text-lg">
              Follow Us
            </h3>
            <div className="space-y-3">
              {socialLinks.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  <item.icon className="flex-shrink-0 text-[#00B425] text-lg" />
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 transition-colors hover:text-[#00B425] hover:underline md:text-base"
                  >
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-xs text-gray-400 md:text-sm">
            &copy; {currentYear} Aroma Worshippers Music Ministry. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
