'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import button
import { Button } from '@mui/joy';

export default function Home() {
  const [showUrl, setShowUrl] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleButtonClick = () => {
    setShowUrl(true);
    if (timerRef.current) clearTimeout(timerRef.current);
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
      
      {/* <Navbar current="home" /> */}

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6 pt-32 sm:pt-24 md:pt-20 lg:pt-44 text-center">
        <div className="flex flex-col items-center leading-none">
          <h1 className="text-white text-[5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-medium tracking-tight leading-none mx-auto w-full px-2 font-montserrat" style={{ fontWeight: 'bold', letterSpacing: '-0.05em' }}>
            hören
          </h1>
          <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-bold tracking-widest uppercase">
            /ˈhøːʁən/
          </p>
          <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-light tracking-widest pt-8">
            Love above all.
          </p>
        </div>
        <div className="relative w-full min-h-[100px] flex flex-col items-center">
          <AnimatePresence initial={false}>
            {!showUrl && (
              <motion.div
                key="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full flex justify-center"
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
                    mb: 2,
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full flex flex-col items-center"
              >
                <a
                  href="https://chat.whatsapp.com/CaN2MyoGqTF1fu9e8YcEQS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl font-bold text-center mt-2 px-6 py-3 rounded-lg transition-colors duration-300"
                  style={{
                    background: 'rgba(26, 26, 26, 0.95)',
                    color: '#a72420',
                    border: '1px solid #a72420',
                    boxShadow: '0 2px 24px 0 #a7242040',
                  }}
                >
                 Invite Link
                </a>
                <span className="text-xs text-white/60 mt-2">(Link will hide in 10 seconds)</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
