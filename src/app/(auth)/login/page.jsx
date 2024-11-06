"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodString } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Copyright, Eye, EyeOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "@/actions/login";

function LoginPage() {
  const [isemailfocused, setIsEmailFocused] = useState(false);
  const [ispassfocused, setIsPassFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const formSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "email is required" })
      .min(2, { message: "username should be atleast two character" }),

    password: z
      .string()
      .nonempty({ message: "Password is required." })
      .min(6, { message: "Password must be at least 6 characters." }),
  });

  const handleSubmit = (values) => {
    login(values);
  };

  const img = "/images/logo.svg";

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <Image alt="Logo" src={img} width={700} height={500} />
        </div>

        <p className="text-sm text-center">
          StaffingManager is currently in closed preview testing!
          <Link href="/" className="text-blue-500 hover:underline p-1">
            join our <br className="text-center" />
            waitlist
          </Link>
        </p>

        <hr className="mt-6 borber border-gray-400" />

        <Form {...form} className="flex items-center">
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-6 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="text-red-500 text-sm/[20px] px-1">*</span>
                    Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <Input
                        {...field}
                        placeholder={isemailfocused ? "" : "Enter your email"}
                        className={`pl-10 focus:border-blue-500 border-gray-300`}
                      />
                    </div>
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
                  <FormLabel>
                    <span className="text-red-500 text-sm/[20px] px-1">*</span>
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock
                        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                      <Input
                        {...field}
                        placeholder="Enter Password"
                        className={`pl-10 border border-white ${
                          ispassfocused ? "border-blue-500" : "border-gray-300"
                        }`}
                        type={showPassword ? "text" : "password"}
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <Eye size={20} />
                        ) : (
                          <EyeOff size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="text-white bg-blue-700 w-full p-2 rounded-lg border text-md"
            >
              Login
            </button>

            {/* <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      {...field}
                      className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:border-blue-500 focus:outline-none transition duration-200 cursor-pointer"
                    />
                  </FormControl>
                  <FormLabel className="mb-1">Keep me logged in</FormLabel>
                </FormItem>
              )}
            />

            <div className="">
              <Link href="" className="text-blue-500 text-sm">
                Forget Password?
              </Link>
            </div>

            <hr className="mt-6 borber border-gray-400" />

            <div className="flex flex-row items-center justify-center text-sm">
              <Copyright size={20} className="pr-2 mt-4" />
              <p className="mt-4">
                2024 Central Scribe Software, all rights reserved
              </p>
            </div> */}
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
