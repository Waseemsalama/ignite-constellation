import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-12">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">Constellation</h3>
            <p className="text-sm text-gray-400">Light up the sky with your stories.</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Links</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/constellation" className="text-gray-400 hover:text-primary">Constellation</Link></li>
              <li><Link href="/leaderboard" className="text-gray-400 hover:text-primary">Leaderboard</Link></li>
              <li><Link href="/messages" className="text-gray-400 hover:text-primary">Messages</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Account</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/account" className="text-gray-400 hover:text-primary">Dashboard</Link></li>
              <li><Link href="/points" className="text-gray-400 hover:text-primary">Points</Link></li>
              <li><Link href="/invite" className="text-gray-400 hover:text-primary">Invite</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2024 Ignite Constellation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

