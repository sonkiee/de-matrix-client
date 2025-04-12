import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShoppingCartIcon as PaypalIcon,
} from "lucide-react";
import {
  SiFacebook,
  SiX,
  SiInstagram,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

type FooterLinksProps = {
  href: string;
  children: React.ReactNode;
};

type SocialIconProps = {
  icon: React.ReactNode;
  href: string;
};

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Dematrix Technologies</h3>
            <p className="mb-4">
              Your one-stop solution for all mobile phone and gadget needs.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<SiFacebook className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<SiX className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<SiInstagram className="h-5 w-5" />} href="#" />
              <SocialIcon icon={<SiYoutube className="h-5 w-5" />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <FooterLink href="/shop">Shop</FooterLink>
              <FooterLink href="/swap">Swap</FooterLink>
              <FooterLink href="/repair">Repair</FooterLink>
              <FooterLink href="/book">Book a Repair</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Tech Street, Digital City, DC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@dematrixtech.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Subscribe to get updates on new products and special offers.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-blue-800 text-white border-blue-700 focus:border-blue-500"
              />
              <Button className="ml-2 bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-wrap justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold mb-2">Payment Methods</h4>
              <div className="flex space-x-4">
                <CreditCard className="h-8 w-8" />
                <PaypalIcon className="h-8 w-8" />
                {/* Add more payment icons as needed */}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-sm text-blue-300">
              © {new Date().getFullYear()} Dematrix Technologies. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <a
      href={href}
      className="bg-blue-800 hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: FooterLinksProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-blue-200 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
