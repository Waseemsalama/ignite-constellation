import FeedList from "@/components/FeedList";

export default function MessagesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Global Messages</h1>
      <p className="text-gray-300 mb-6">All public capsules from around the world.</p>
      <FeedList publicOnly={true} />
    </div>
  );
}

