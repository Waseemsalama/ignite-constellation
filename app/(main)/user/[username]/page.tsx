import ProfileCard from "@/components/ProfileCard";

export default function UserProfilePage({ params }: { params: { username: string } }) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <ProfileCard username={params.username} />
    </div>
  );
}

