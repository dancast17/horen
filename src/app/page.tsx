'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState<number>(0);
  const [circlePositions, setCirclePositions] = useState<{ x: number; y: number; baseX: number; baseY: number }[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const generateCirclePositions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * (width < 640 ? 0.3 : 0.2);
      
      const positions = Array.from({ length: 12 }, (_, i) => {
        // Create two rings of circles
        const ring = i < 6 ? 0 : 1;
        const angleIndex = i % 6;
        const angle = (angleIndex * Math.PI * 2) / 6;
        const ringRadius = radius * (ring === 0 ? 1 : 0.6);
        return {
          x: centerX + Math.cos(angle) * ringRadius,
          y: centerY + Math.sin(angle) * ringRadius,
          baseX: centerX + Math.cos(angle) * ringRadius,
          baseY: centerY + Math.sin(angle) * ringRadius,
        };
      });
      setCirclePositions(positions);
    };

    let currentTime = 0;
    const animate = () => {
      currentTime += 0.005;
      setTime(currentTime);
      animationRef.current = requestAnimationFrame(animate);
    };

    generateCirclePositions();
    window.addEventListener('resize', generateCirclePositions);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', generateCirclePositions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
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
              x: pos.baseX + Math.sin(time + i * 0.5) * (i < 6 ? 60 : 40),
              y: pos.baseY + Math.cos(time * 1.3 + i * 0.5) * (i < 6 ? 60 : 40),
              scale: 1 + Math.sin(time * 0.8 + i) * 0.2,
              opacity: 0.3 + Math.sin(time + i * 0.5) * 0.1,
            }}
            transition={{ type: 'tween', duration: 0.1, ease: 'linear' }}
            className="absolute w-[60vw] h-[60vw] sm:w-[30vw] sm:h-[30vw] blur-[100px] sm:blur-[80px] pointer-events-none"
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
        <h1 className="text-white text-[6rem] sm:text-[8rem] lg:text-[10rem] font-extrabold tracking-tight leading-none mx-auto">
          HÖREN
        </h1>
        <p className="text-white text-xs sm:text-sm md:text-lg tracking-widest uppercase">/ˈhøːʁən/</p>
        <p className="text-white text-xs sm:text-sm md:text-lg tracking-widest">Love above all.
        </p>


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
