"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCard,
  Heart,
  Home,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  ChevronRight,
  Edit,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

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

            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 gap-2">
                  <TabsTrigger
                    value="profile"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="orders"
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span className="hidden sm:inline">Orders</span>
                  </TabsTrigger>
                  <TabsTrigger value="more" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span className="hidden sm:inline">More</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Main Content */}
            <div>
              {/* Profile Section */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="flex flex-col items-center gap-4 rounded-lg border p-6 sm:flex-row">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="/placeholder.svg?height=80&width=80&text=JD"
                        alt="John Doe"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                      <h2 className="text-xl font-semibold">John Doe</h2>
                      <p className="text-muted-foreground">
                        john.doe@example.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Member since January 2023
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your personal details here.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSaveProfile}>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">First Name</Label>
                            <Input id="first-name" defaultValue="John" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Last Name</Label>
                            <Input id="last-name" defaultValue="Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              defaultValue="john.doe@example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              defaultValue="(123) 456-7890"
                            />
                          </div>
                          <div className="space-y-2 sm:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                              id="bio"
                              className="h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Tell us a bit about yourself"
                            ></textarea>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                      <CardDescription>
                        Update your password to keep your account secure.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSavePassword}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">
                              Current Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="current-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="button"
                                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                  {showPassword
                                    ? "Hide password"
                                    : "Show password"}
                                </span>
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                              id="new-password"
                              type="password"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                              Confirm New Password
                            </Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                          <Button type="submit">Update Password</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Orders Section */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        View and manage your orders.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="rounded-lg border">
                            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">
                                    Order #{123456 + i}
                                  </span>
                                  <Badge
                                    variant={
                                      i === 0
                                        ? "default"
                                        : i === 1
                                        ? "secondary"
                                        : "outline"
                                    }
                                  >
                                    {i === 0
                                      ? "Delivered"
                                      : i === 1
                                      ? "Shipped"
                                      : "Processing"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Placed on{" "}
                                  {i === 0
                                    ? "May 15, 2023"
                                    : i === 1
                                    ? "June 2, 2023"
                                    : "June 10, 2023"}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">
                                  ${(99.99 + i * 50).toFixed(2)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {3 - i} items
                                </p>
                              </div>
                            </div>
                            <Separator />
                            <div className="p-4">
                              <div className="flex flex-wrap gap-4">
                                {[...Array(3 - i)].map((_, j) => (
                                  <div
                                    key={j}
                                    className="relative h-16 w-16 overflow-hidden rounded-md border"
                                  >
                                    <Image
                                      src={`/placeholder.svg?height=64&width=64&text=Item${
                                        j + 1
                                      }`}
                                      alt={`Item ${j + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between p-4">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/order/${123456 + i}`}>
                                  View Details
                                </Link>
                              </Button>
                              {i === 0 && <Button size="sm">Buy Again</Button>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">View All Orders</Button>
                    </CardFooter>
                  </Card>
                </div>
              )}

              {/* Addresses Section */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Shipping Addresses</CardTitle>
                        <CardDescription>
                          Manage your shipping addresses.
                        </CardDescription>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="relative rounded-lg border p-4">
                          <Badge className="absolute right-2 top-2">
                            Default
                          </Badge>
                          <div className="space-y-1">
                            <h3 className="font-medium">Home</h3>
                            <p className="text-sm">John Doe</p>
                            <p className="text-sm">123 Main Street</p>
                            <p className="text-sm">San Francisco, CA 94107</p>
                            <p className="text-sm">United States</p>
                            <p className="text-sm">(123) 456-7890</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="relative rounded-lg border p-4">
                          <div className="space-y-1">
                            <h3 className="font-medium">Work</h3>
                            <p className="text-sm">John Doe</p>
                            <p className="text-sm">456 Market Street</p>
                            <p className="text-sm">San Francisco, CA 94105</p>
                            <p className="text-sm">United States</p>
                            <p className="text-sm">(123) 456-7890</p>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Billing Addresses</CardTitle>
                        <CardDescription>
                          Manage your billing addresses.
                        </CardDescription>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-lg border p-4">
                        <Badge className="mb-2">Same as shipping</Badge>
                        <div className="space-y-1">
                          <h3 className="font-medium">Home</h3>
                          <p className="text-sm">John Doe</p>
                          <p className="text-sm">123 Main Street</p>
                          <p className="text-sm">San Francisco, CA 94107</p>
                          <p className="text-sm">United States</p>
                          <p className="text-sm">(123) 456-7890</p>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Payment Methods Section */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>
                          Manage your payment methods.
                        </CardDescription>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Payment Method
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-16 rounded bg-muted">
                                <Image
                                  src="/placeholder.svg?height=40&width=64&text=VISA"
                                  alt="Visa"
                                  width={64}
                                  height={40}
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  Visa ending in 4242
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Expires 05/2025
                                </p>
                              </div>
                            </div>
                            <Badge>Default</Badge>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-16 rounded bg-muted">
                                <Image
                                  src="/placeholder.svg?height=40&width=64&text=MC"
                                  alt="Mastercard"
                                  width={64}
                                  height={40}
                                />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  Mastercard ending in 5678
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Expires 08/2024
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                            >
                              <Edit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1 text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Wishlist Section */}
              {activeTab === "wishlist" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>
                        Items you've saved for later.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="group relative rounded-lg border"
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <Image
                                src={`/placeholder.svg?height=300&width=300&text=Item${
                                  i + 1
                                }`}
                                alt={`Wishlist item ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <Button
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">
                                  Remove from wishlist
                                </span>
                              </Button>
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium">
                                {i === 0
                                  ? "Wireless Earbuds"
                                  : i === 1
                                  ? "Smart Watch"
                                  : i === 2
                                  ? "Bluetooth Speaker"
                                  : "Power Bank"}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {i === 0
                                  ? "Apple"
                                  : i === 1
                                  ? "Samsung"
                                  : i === 2
                                  ? "JBL"
                                  : "Anker"}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="font-semibold">
                                  ${(49.99 + i * 20).toFixed(2)}
                                </span>
                                <Button size="sm">Add to Cart</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings Section */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>
                        Manage your account preferences.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about your account activity.
                            </p>
                          </div>
                          <div className="flex h-6 items-center">
                            <input
                              id="email-notifications"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Order Updates</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about your orders.
                            </p>
                          </div>
                          <div className="flex h-6 items-center">
                            <input
                              id="order-updates"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              defaultChecked
                            />
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Marketing Emails</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive emails about new products and promotions.
                            </p>
                          </div>
                          <div className="flex h-6 items-center">
                            <input
                              id="marketing-emails"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                          </div>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">
                              Two-Factor Authentication
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account.
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            Enable
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Delete Account</h3>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all your data.
                            </p>
                          </div>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

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
