"use client";
import { signOut, useSession } from '@/auth-client';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session, "session")
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Profile</h1>
        <div className="mb-6">
          {session?.user?.image && (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}
          <p className="text-lg font-medium">{session?.user?.name || 'No name'}</p>
          <p className="text-sm text-gray-600">{session?.user?.email || 'No email'}</p>
        </div>
        <button
          onClick={() => signOut({fetchOptions:{
            onSuccess: () => {
              router.push("/login"); // redirect to login page
            },
          }})}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
