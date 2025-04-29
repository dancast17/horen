"use client";
"use client";
import Image from "next/image";
import Navbar from '@/components/Navbar';
import { useState, useCallback, useEffect } from "react";

const flyers = [
  {
    src: "https://imgproxy.ra.co/_/quality:100/aHR0cHM6Ly9pbWFnZXMucmEuY28vNDZiMjJhZDE0M2UyMDkxNjIxZTI3NmVmZTBkOTY4NWIwYzNhZmVmMS5wbmc=",
    alt: "Party Flyer"
  }
];

export default function Parties() {
  const [modalOpen, setModalOpen] = useState(false);

  // Close modal on ESC
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  // Trap scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <main className="min-h-screen w-full bg-black text-white flex flex-col items-center px-2 pt-12 relative">
      <Navbar current="parties" />
      <h1 className="text-4xl font-bold mb-8 text-[#a72420] tracking-tight text-center mt-12">Parties</h1>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        {flyers.map((flyer, idx) => (
          <div key={idx} className="overflow-hidden shadow-lg bg-[#18181b] border border-[#a72420]/30 flex flex-col items-center p-2">
            <Image
              src={flyer.src}
              alt={flyer.alt}
              width={800}
              height={1200}
              className="object-contain w-full h-auto max-h-[80vh] cursor-zoom-in select-none"
              priority={idx === 0}
              onClick={openModal}
              style={{ background: "#222" }}
            />
            <div className="mt-2 text-center text-sm text-white/70">{flyer.alt}</div>
          </div>
        ))}
      </div>
      {/* Modal/Lightbox */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fade-in"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <div className="relative flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white bg-[#a72420] rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold hover:bg-[#8a1d1a] transition"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <Image
              src={flyers[0].src}
              alt={flyers[0].alt}
              width={1200}
              height={1800}
              className="object-contain max-w-[95vw] max-h-[90vh] bg-black"
              priority
              style={{ background: "#222" }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
