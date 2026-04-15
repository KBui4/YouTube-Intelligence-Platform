"use client";
import Link from "next/link";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/app/components/ui/card";

import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-pink-600",
  description: "text-gray-600",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full bg-pink-600 hover:bg-pink-700 text-white",
  prompt: "mt-4 text-center text-sm text-gray-600",
  link: "ml-2 text-pink-600 hover:text-pink-700 font-medium",
};

export function SigninForm() {
  return (
    <div className={styles.container}>
      <form>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign In</CardTitle>
            <CardDescription className={styles.description}>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.content}>
            <div className={styles.fieldGroup}>
              <Label className="text-gray-700" htmlFor="email">
                Email
              </Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label className="text-gray-700" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </CardContent>

          <CardFooter className={styles.footer}>
            <Button className={styles.button}>Sign In</Button>
          </CardFooter>
        </Card>

        <div className={styles.prompt}>
          Don&apos;t have an account?
          <Link className={styles.link} href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}