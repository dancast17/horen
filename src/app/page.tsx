'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circlePositions, setCirclePositions] = useState<{ x: number; y: number }[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const generateCirclePositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const positions = Array.from({ length: 6 }, (_, i) => ({
        x: (i % 3) * width * 0.33 + width * 0.1,
        y: Math.floor(i / 3) * height * 0.5 + height * 0.2,
      }));
      setCirclePositions(positions);
    };

    generateCirclePositions();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', generateCirclePositions);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', generateCirclePositions);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, phone });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white relative overflow-hidden flex flex-col items-center justify-center px-4 text-center">
      {/* Background animated circles */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 overflow-hidden bg-black">
        {circlePositions.map((pos, i) => (
          <motion.div
            key={i}
            initial={{ x: pos.x, y: pos.y, scale: 1, opacity: 0.2 }}
            animate={{
              x: pos.x + (mousePosition.x - pos.x) * 0.1,
              y: pos.y + (mousePosition.y - pos.y) * 0.1,
              scale: 1 + (Math.abs(mousePosition.x - pos.x) + Math.abs(mousePosition.y - pos.y)) * 0.0003,
              opacity: 0.3 + (Math.abs(mousePosition.x - pos.x) + Math.abs(mousePosition.y - pos.y)) * 0.0001,
            }}
            transition={{ type: 'spring', stiffness: 40, damping: 15 }}
            className="absolute w-[30vw] h-[30vw] blur-[80px] pointer-events-none"
            style={{
              backgroundColor: 'rgba(199, 60, 47, 0.5)',
              borderRadius: '9999px',
              left: 0,
              top: 0,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center space-y-6">
        <h1 className="text-white text-[6.5rem] sm:text-[8rem] lg:text-[10rem] font-extrabold tracking-tight leading-none mx-auto">
          HÖREN
        </h1>
        <p className="text-white text-xs sm:text-sm md:text-lg tracking-widest uppercase">/ˈhøːʁən/</p>

        <Button
          onClick={() => setShowForm(!showForm)}
          variant="outlined"
          sx={{
            borderRadius: 0,
            border: '1px solid #a72420',
            color: '#a72420',
            fontWeight: 600,
            textTransform: 'uppercase',
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.5 },
            marginBottom: '1rem',
            '&:hover': {
              backgroundColor: '#a72420',
              color: 'white',
              borderColor: '#a72420',
            },
          }}
        >
          Get Connected
        </Button>


        {showForm && (
          <Sheet
            variant="outlined"
            sx={{
              backgroundColor: '#0a0000',
              border: '1px solid rgba(255,255,255,0.15)',
              width: '100%',
              maxWidth: 400,
              p: 4,
              borderRadius: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FormControl>
                <FormLabel sx={{ color: 'white', textTransform: 'uppercase', fontSize: 12 }}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  sx={{
                    backgroundColor: '#000',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: 0,
                    '&::placeholder': { color: 'rgba(255,255,255,0.5)' },
                    '&:focus': { outline: '2px solid #a72420' },
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ color: 'white', textTransform: 'uppercase', fontSize: 12 }}>
                  Phone
                </FormLabel>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+351 912 345 678"
                  required
                  sx={{
                    backgroundColor: '#000',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: 0,
                    '&::placeholder': { color: 'rgba(255,255,255,0.5)' },
                    '&:focus': { outline: '2px solid #a72420' },
                  }}
                />
              </FormControl>

              <Button type="submit" variant="outlined" sx={{
                borderRadius: 0,
                borderColor: '#a72420',
                color: '#a72420',
                fontWeight: 600,
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: '#a72420',
                  color: 'black',
                  borderColor: '#a72420',
                },
              }}>
                Submit
              </Button>
            </form>
          </Sheet>
        )}
      </div>
    </div>
  );
}
