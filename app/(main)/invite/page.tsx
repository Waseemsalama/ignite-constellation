"use client";
import { useState, useEffect } from "react";

export default function InvitePage() {
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/referral")
      .then((res) => res.json())
      .then((data) => setReferralCode(data.code || ""))
      .catch(() => {});
  }, []);

  const referralLink = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Invite Friends</h1>
      <p className="text-gray-300 mb-6">Share your referral link to earn points when friends join.</p>
      <div className="p-4 bg-[#0f141b] rounded-lg mb-4">
        <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
        <p className="text-2xl font-bold text-primary">{referralCode}</p>
      </div>
      <div className="p-4 bg-[#0f141b] rounded-lg mb-4">
        <p className="text-sm text-gray-400 mb-2">Your Referral Link</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 bg-black rounded text-white"
          />
          <button onClick={copyToClipboard} className="btn">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

