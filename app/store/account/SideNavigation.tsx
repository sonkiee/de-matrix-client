import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Heart,
  Home,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";

const SideNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="hidden lg:block">
      <nav className="flex flex-col gap-2">
        <Button
          variant={activeTab === "profile" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("profile")}
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
        <Button
          variant={activeTab === "orders" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("orders")}
        >
          <ShoppingBag className="h-4 w-4" />
          Orders
        </Button>
        <Button
          variant={activeTab === "addresses" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("addresses")}
        >
          <Home className="h-4 w-4" />
          Addresses
        </Button>
        <Button
          variant={activeTab === "payment" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("payment")}
        >
          <CreditCard className="h-4 w-4" />
          Payment Methods
        </Button>
        <Button
          variant={activeTab === "wishlist" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("wishlist")}
        >
          <Heart className="h-4 w-4" />
          Wishlist
        </Button>
        <Button
          variant={activeTab === "settings" ? "default" : "ghost"}
          className="justify-start gap-2"
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </nav>
    </div>
  );
};

export default SideNavigation;
