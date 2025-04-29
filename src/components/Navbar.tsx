"use client";
import Link from "next/link";
import Button from "@mui/joy/Button";
import { useState } from "react";

export default function Navbar({ current }: { current: "home" | "parties" }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 right-0 w-full flex justify-end items-center px-4 py-4 z-50 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
      {/* Overlay when menu is open */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="flex items-center gap-2 z-50">
        {/* Desktop links */}
        {current === "home" && (
          <Link href="/parties" className="hidden sm:inline-block">
            <Button
              variant="outlined"
              sx={{
                borderRadius: '6px',
                border: '1px solid #a72420',
                color: '#a72420',
                fontWeight: 600,
                textTransform: 'uppercase',
                px: 2.5,
                py: 1,
                '&:hover': {
                  backgroundColor: '#a72420',
                  color: 'white',
                  borderColor: '#a72420',
                },
              }}
            >
              Parties
            </Button>
          </Link>
        )}
        {current === "parties" && (
          <Link href="/" className="hidden sm:inline-block">
            <Button
              variant="outlined"
              sx={{
                borderRadius: '6px',
                border: '1px solid #a72420',
                color: '#a72420',
                fontWeight: 600,
                textTransform: 'uppercase',
                px: 2.5,
                py: 1,
                '&:hover': {
                  backgroundColor: '#a72420',
                  color: 'white',
                  borderColor: '#a72420',
                },
              }}
            >
              Home
            </Button>
          </Link>
        )}
        {/* Mobile hamburger */}
        <div className="sm:hidden">
          <button
            className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-[#a72420] transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#a72420] my-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#a72420] transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
          {open && (
            <div className="fixed top-0 right-0 w-52 h-full bg-[#18181b] border-l border-[#a72420] shadow-lg z-50 flex flex-col pt-20 px-6 animate-fade-in">
              {current === "home" && (
                <Link
                  href="/parties"
                  className="block px-4 py-3 text-[#a72420] hover:bg-[#a72420] hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl">•</span>
                  <span className="text-lg font-semibold">Parties</span>
                </Link>
              )}
              {current === "parties" && (
                <Link
                  href="/"
                  className="block px-4 py-3 text-[#a72420] hover:bg-[#a72420] hover:text-white rounded-lg transition-colors duration-200 flex items-center gap-3"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-xl">•</span>
                  <span className="text-lg font-semibold">Home</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
