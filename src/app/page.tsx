'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import button
import { Button } from '@mui/joy';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [showUrl, setShowUrl] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(10);

  const handleButtonClick = () => {
    setShowUrl(true);
    setCountdown(10);
    if (timerRef.current) clearTimeout(timerRef.current);
    // Countdown updater
    let secondsLeft = 10;
    const interval = setInterval(() => {
      secondsLeft--;
      setCountdown(secondsLeft);
      if (secondsLeft <= 0) clearInterval(interval);
    }, 1000);
    // Hide Link
    timerRef.current = setTimeout(() => {
      setShowUrl(false);
    }, 10000); // 10 seconds
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden flex flex-col items-center justify-start max-w-[100vw]">
      
      <Navbar current="home" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6 pt-32 sm:pt-24 md:pt-20 lg:pt-44 text-center">
        <div className="flex flex-col items-center leading-none">
          <h1 className="text-white text-[5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-medium tracking-tight leading-none mx-auto w-full px-2 montserratArabic" style={{ fontWeight: 'bold', letterSpacing: '-0.05em' }}>
            hören
          </h1>
          <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-bold tracking-widest uppercase">
            /ˈhøːʁən/
          </p>
          <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-light tracking-widest pt-8">
            Love above all.
          </p>
        </div>
        <div className="relative w-full min-h-[100px] flex flex-col items-center" style={{ marginTop: '8rem' }}>
          <AnimatePresence initial={false}>
          {!showUrl && (
              <motion.div
                key="button"
                initial={{ opacity: 0, y: 80, transition: { duration: 0.5 } }}
                animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full flex justify-center"
                style={{ position: "absolute", zIndex: !showUrl ? 2 : 1 }}
              >
                <Button
                  onClick={handleButtonClick}
                  variant="outlined"
                  sx={{
                    borderRadius: '6px',
                    border: '1px solid #a72420',
                    color: '#a72420',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    px: { xs: 2.5, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.2, md: 1.5 },
                    '&:hover': {
                      backgroundColor: '#a72420',
                      color: 'white',
                      borderColor: '#a72420',
                    },
                  }}
                >
                  Get Connected
                </Button>
              </motion.div>
            )}
            {showUrl && (
              <motion.div
                key="url"
                initial={{ opacity: 0, y: 80, transition: { duration: 0.5 } }}
                animate={{ opacity: 1, y: 0 , transition: { duration: 1 } }}
                exit={{ opacity: 0, y: -40}}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full flex flex-col items-center"
                style={{ position: "absolute", zIndex: showUrl ? 2 : 1 }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: '6px',
                    border: '1px solid #a72420',
                    color: '#a72420',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    px: { xs: 2.5, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.2, md: 1.5 },
                    // mt: 12,
                    '&:hover': {
                      backgroundColor: '#a72420',
                      color: 'white',
                      borderColor: '#a72420',
                    },
                  }}
                  onClick={() => window.open('https://chat.whatsapp.com/JsDeaPO060lEpQfzeOozXU', '_blank')}
                >
                  Invite Link
                </Button>
                <span className="text-xs text-white/60 mt-2">(Link will hide in {countdown} seconds)</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
