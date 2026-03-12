"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { SigninData, signinSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signin } from "@/actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninPage() {
  const query = useSearchParams();
  const callback = query.get("callbackUrl") || query.get("callback");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  console.log("callback url", callback);

  const form = useForm<SigninData>({
    resolver: zodResolver(signinSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const url = callback && callback.startsWith("/") ? callback : "/account";

  const { execute, isExecuting } = useAction(signin, {
    onSuccess(data) {
      console.log("Action Success:", data);
      toast.success("Signed in successfully!");

      router.replace(url);
      router.refresh();
    },
    onError(error) {
      toast.error(error.error.serverError);
    },
  });

  return (
    <div className=" flex min-h-screen flex-col items-center justify-center py-8">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login to Your Account</h1>
          <p className="text-muted-foreground">
            Enter your email and password to access your account
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(execute)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button disabled={isExecuting} type="submit" className="w-full">
              {isExecuting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            Google
          </Button>
          <Button variant="outline" className="w-full">
            Facebook
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
