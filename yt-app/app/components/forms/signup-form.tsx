"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Check, X } from "lucide-react";
import { hasAuthSession, signUpWithApi } from "@/app/auth/api";

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
  title: "text-3xl font-bold text-gray-900",
  description: "text-gray-600",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full bg-gray-900 hover:bg-black text-white",
  prompt: "mt-4 text-center text-sm text-gray-600",
  link: "ml-2 text-gray-900 hover:text-black font-medium",
};

const passwordRequirements = [
  {
    label: "At least 8 characters",
    isValid: (value: string) => value.length >= 8,
  },
  {
    label: "At least 1 capital letter",
    isValid: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "At least 1 special character",
    isValid: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

function validatePassword(password: string) {
  return passwordRequirements.find((requirement) => !requirement.isValid(password))?.label || "";
}

export function SignupForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasAuthSession()) {
      router.replace("/");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    try {
      await signUpWithApi(email, password);
      toast.success("Account created.");
      router.replace("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to create account";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className={styles.header}>
            <CardTitle className={styles.title}>Sign Up</CardTitle>
            <CardDescription className={styles.description}>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.content}>
            {error && (
              <p className="text-red-600 text-sm mb-2">{error}</p>
            )}

            <div className={styles.fieldGroup}>
              <Label className="text-gray-700" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className={styles.fieldGroup}>
              <Label className="text-gray-700" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              />
              <div className="space-y-1 pt-1">
                {passwordRequirements.map((requirement) => {
                  const met = requirement.isValid(password);

                  return (
                    <div
                      key={requirement.label}
                      className={`flex items-center gap-2 text-sm ${
                        met ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {met ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <X className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>{requirement.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>

          <CardFooter className={styles.footer}>
            <Button className={styles.button} disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </CardFooter>
        </Card>

        <div className={styles.prompt}>
          Have an account?
          <Link className={styles.link} href="/signin">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
