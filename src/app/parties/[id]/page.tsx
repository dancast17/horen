"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PARTY_IMAGES, PARTY_PASSWORDS } from '@/constants/gallery';

export default function PartyGallery() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const partyId = params.id as string;
  const images = PARTY_IMAGES[partyId as keyof typeof PARTY_IMAGES] || [];
  const partyPassword = PARTY_PASSWORDS[partyId as keyof typeof PARTY_PASSWORDS];

  useEffect(() => {
    const authData = sessionStorage.getItem(`party-auth-${partyId}`);
    if (authData) {
      const { timestamp } = JSON.parse(authData);
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem(`party-auth-${partyId}`);
      }
    }
  }, [partyId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === partyPassword) {
      sessionStorage.setItem(`party-auth-${partyId}`, JSON.stringify({
        authenticated: true,
        timestamp: Date.now()
      }));
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="bg-[#18181b] p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-[#a72420]">Enter Gallery</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-[#27272a] border border-[#3f3f46] rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#a72420]"
                placeholder="Enter the party password"
                required
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#a72420] text-white py-2 px-4 rounded-md hover:bg-[#8c1d1a] transition-colors"
            >
              Enter Gallery
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/parties" className="text-sm text-gray-400 hover:text-white">
              ← Back to Parties
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
                  <Link 
            href="/parties"
            className="fixed top-4 right-4 text-sm text-gray-400 hover:text-white border border-gray-700 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors z-50"
            >
            ← Back to Parties
          </Link>
        <div className="flex justify-between items-center mb-8 mt-12">
          <h1 className="text-4xl font-bold text-[#a72420]">
            {partyId.replace(/-/g, ' ').toUpperCase()}
          </h1>

        </div>

        <div className="w-full px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 auto-rows-[10px]">
                {images.map((image, index) => {
                // Random height between 20 and 40 (adjust these values as needed)
                const rowSpan = Math.floor(Math.random() * 20) + 20;
                return (
                    <div 
                    key={index} 
                    className="w-full"
                    style={{ gridRowEnd: `span ${rowSpan}` }}
                    >
                    <div className="relative h-full w-full">
                        <Image
                        src={image}
                        alt={`Party image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 200vw, (max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                        className="w-full h-full object-cover"
                        priority={index < 6}
                        />
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
      </div>
    </div>
  );
}
