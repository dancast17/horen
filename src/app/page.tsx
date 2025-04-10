'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { email, phone });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
    <div className="min-h-screen w-full text-white relative overflow-hidden flex flex-col items-center justify-center px-3 sm:px-6 md:px-8 text-center max-w-[100vw]">
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
        <h1 className="text-white text-[5rem] sm:text-[6rem] md:text-[7rem] lg:text-[9rem] font-extrabold tracking-tight leading-none mx-auto w-full px-2">
          HÖREN
        </h1>
        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-widest uppercase">/ˈhøːʁən/</p>
        <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg tracking-widest max-w-md mx-auto">Love above all.
        </p>

        <Button
          onClick={() => setShowForm(!showForm)}
          variant="outlined"
          sx={{
            borderRadius: '4px',
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


        <div className="relative w-full min-h-[100px]">
          <AnimatePresence mode="wait">
            {showForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                style={{ width: '100%', position: 'absolute', left: 0, right: 0 }}
          >
            <Sheet
              component="div"
              variant="outlined"
              sx={{
                backgroundColor: '#0a0000',
                border: '1px solid rgba(255,255,255,0.15)',
                width: '90%',
                maxWidth: { xs: 350, sm: 400 },
                mx: 'auto',
                p: { xs: 3, sm: 4 },
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                <FormControl>
                  <FormLabel sx={{ color: 'white', textTransform: 'uppercase', fontSize: 12 }}>
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange(e, setEmail)}
                    placeholder="your@email.com"
                    required
                    sx={{
                      backgroundColor: '#000',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      borderRadius: '4px',
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                      '&:focus': {
                        borderColor: '#a72420',
                      },
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
                    onChange={(e) => handleInputChange(e, setPhone)}
                    placeholder="+351 912 345 678"
                    required
                    sx={{
                      backgroundColor: '#000',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      borderRadius: '4px',
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                      '&:focus': {
                        borderColor: '#a72420',
                      },
                    }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  variant="solid"
                  sx={{
                    mt: { xs: 2, sm: 3 },
                    backgroundColor: '#a72420',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#8a1d1a',
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </Sheet>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
