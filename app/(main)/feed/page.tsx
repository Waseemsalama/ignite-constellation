import FeedList from "@/components/FeedList";

export default function FeedPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Your Feed</h1>
      <p className="text-gray-300 mb-6">Capsules from users you follow.</p>
      <FeedList publicOnly={false} />
    </div>
  );
}

