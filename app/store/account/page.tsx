"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Heart,
  Home,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner";
import { useUser } from "@/queries/user";
import SideNavigation from "./SideNavigation";
import MobileNavigation from "./MobileNavigation";
import ProfileSection from "./ProfileSection";
import OrdersSection from "./OrdersSection";
import AddressesSection from "./AddressesSection";
import WishListSection from "./WishListSection";
import SettingsSection from "./SettingsSection";
import { PaymentMethodsSection } from "./PaymentMethodsSection";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const { data } = useUser();

  const user = data?.user;

  console.log("User fetched", user);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Profile updated", {
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Password updated", {
      description: "Your password has been changed successfully.",
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container px-8 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="font-medium text-foreground">My Account</span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Account</h1>
            <Button variant="outline" className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Sidebar Navigation */}
            <SideNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Mobile Navigation */}
            <MobileNavigation
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {/* Main Content */}
            <div>
              {/* Profile Section */}
              <ProfileSection
                user={user}
                activeTab={activeTab}
                showPassword={showPassword}
                handleSaveProfile={handleSaveProfile}
                handleSavePassword={handleSavePassword}
                setShowPassword={setShowPassword}
              />

              {/* Orders Section */}
              <OrdersSection activeTab={activeTab} />

              {/* Addresses Section */}
              <AddressesSection activeTab={activeTab} />

              {/* Payment Methods Section */}
              <PaymentMethodsSection activeTab={activeTab} />

              {/* Wishlist Section */}
              <WishListSection activeTab={activeTab} />

              {/* Settings Section */}
              <SettingsSection activeTab={activeTab} />

              {/* Mobile "More" Tab Content */}
              {activeTab === "more" && (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="flex h-24 flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("addresses")}
                        >
                          <Home className="h-6 w-6" />
                          <span>Addresses</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex h-24 flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("payment")}
                        >
                          <CreditCard className="h-6 w-6" />
                          <span>Payment</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex h-24 flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("wishlist")}
                        >
                          <Heart className="h-6 w-6" />
                          <span>Wishlist</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex h-24 flex-col items-center justify-center gap-2"
                          onClick={() => setActiveTab("settings")}
                        >
                          <Settings className="h-6 w-6" />
                          <span>Settings</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
