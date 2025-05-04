"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-transparent pointer-events-none">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center">
          <Link
            href="https://www.instagram.com/horen.ong"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#a72420] hover:text-red-500 transition-colors pointer-events-auto"
          >
            <Image
              src="/instagram-logo.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="w-6 h-6"
              style={{ filter: 'invert(1)' }} // This will make the icon visible
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}