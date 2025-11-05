"use client";

export default function ShareToTikTok({ mediaUrl, caption }: { mediaUrl: string; caption: string }) {
  const share = async () => {
    // @ts-ignore — ShareKit injected by script
    if (window.TikTokShare) {
      // Open TikTok composer with media + text
      // @ts-ignore
      window.TikTokShare.open({ mediaType: "video", mediaUrl, text: caption });
      await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: "tiktok" }),
      });
      alert("Shared! You earned points ✨");
    } else {
      alert("TikTok ShareKit not loaded. Try again.");
    }
  };

  return (
    <button
      onClick={share}
      className="px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-400 font-semibold"
    >
      Share on TikTok
    </button>
  );
}

