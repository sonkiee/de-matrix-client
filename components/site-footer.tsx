import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Mail, Phone } from "lucide-react";

const footmyLinks = [
  {
    name: "Shop",
    links: [
      { name: "iPhones", href: "/shop/iphones" },
      { name: "Samsung", href: "/shop/samsung" },
      { name: "iPads", href: "/shop/ipads" },
      { name: "Accessories", href: "/shop/accessories" },
    ],
  },
  {
    name: "Store Services",
    links: [
      { name: "Repairs", href: "/services/repairs" },
      { name: "Trade In", href: "/services/trade-in" },
      { name: "Order Status", href: "/services/order-status" },
      { name: "Support", href: "/services/support" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t bg-gray-50 mt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Dematrix Technologies
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Gadgets, upgrades, and repairs — all in one place. Trusted
              products, fair pricing, and support you can rely on.
            </p>

            {/* Newsletter (optional) */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-900">
                Get deals in your inbox
              </p>
              <div className="mt-3 flex gap-2">
                <Input placeholder="Email address" className="bg-white" />
                <Button className="rounded-full">Join</Button>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {footmyLinks.map((section) => (
            <div key={section.name} className="flex flex-col gap-3">
              <h4 className="font-semibold text-sm text-gray-900">
                {section.name}
              </h4>

              <ul className="gap-2 flex flex-col">
                {section.links?.map((link) => (
                  <FooterLink key={link.name} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}

          {/* Visit us */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm text-gray-900">Visit us</h4>

            <div className="flex flex-col gap-3 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>123 Tech Street, Kaduna, NG</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+234 000 000 0000</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@dematrixtech.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Dematrix Technologies. All rights
            reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Sales Policy",
              "Legal",
              "Sitemap",
            ].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-500 hover:text-gray-800 text-sm transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}
