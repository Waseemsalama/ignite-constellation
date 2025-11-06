"use client";
import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          referralCode: ref || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      // Sign in the user after successful signup
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Account created but sign-in failed. Please try logging in.");
        setLoading(false);
        return;
      }

      router.push("/account");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create account</h1>
      <p className="text-gray-400 mb-6">
        Join the constellation and start earning points.
      </p>

      {!showPasswordForm ? (
        <div className="flex flex-col gap-3">
          <button className="btn" onClick={() => signIn("google")}>
            Continue with Google
          </button>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0A0E18] text-gray-400">OR</span>
            </div>
          </div>
          <button
            className="btn bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-black"
            onClick={() => setShowPasswordForm(true)}
          >
            Sign up with Email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="At least 6 characters"
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0f141b] rounded-lg text-white border border-gray-700 focus:border-primary focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" disabled={loading} className="btn w-full">
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() => setShowPasswordForm(false)}
            className="w-full text-sm text-gray-400 hover:text-white"
          >
            ← Back to OAuth options
          </button>
        </form>
      )}

      <p className="text-gray-400 mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
      {ref && (
        <p className="text-sm text-primary mt-2 text-center">
          Referral code detected! You'll get bonus points when you sign up.
        </p>
      )}
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <SignupContent />
    </Suspense>
  );
}
