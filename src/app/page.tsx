'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormControl, FormLabel, Input, Button, Sheet } from '@mui/joy';
import { useRef, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // default styles

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      // Delay to let the animation/rendering complete before scrolling
      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center', // Scroll to center instead of top
        });
      }, 350); // Match or slightly exceed your motion.div transition duration
    }
  }, [showForm]);

  useEffect(() => {
    if (!showForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showForm]);
    
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/sheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }
      
      setSubmitSuccess(true);
      setEmail('');
      setPhone('');
      
      // Hide form after successful submission
      setTimeout(() => {
        setShowForm(false);
        // Reset success state after form is hidden
        setTimeout(() => setSubmitSuccess(false), 500);
      }, 20000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    setter(e.target.value);
  };

  return (
<div className="min-h-screen w-full text-white relative overflow-hidden flex flex-col items-center justify-start pt-32 sm:pt-24 md:pt-20 px-3 sm:px-6 md:px-8 lg:pt-44	text-center max-w-[100vw]">
{/* Content */}
    <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center space-y-4 sm:space-y-6">
      <div className="flex flex-col items-center leading-none">
        <h1 className="text-white text-[5rem] sm:text-[5.5rem] md:text-[6.5rem] lg:text-[8.5rem] font-medium tracking-tight leading-none mx-auto w-full px-2">
          HÖREN
        </h1>
        <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-bold tracking-widest uppercase">
          /ˈhøːʁən/
        </p>
        <p className="text-white text-sm sm:text-sm md:text-base lg:text-lg font-light tracking-widest pt-8">
          Love above all.
        </p>
      </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          variant="outlined"
          sx={{
            borderRadius: '6px',
            border: '1px solid #a72420',
            color: '#a72420',
            fontWeight: 600,
            textTransform: 'uppercase',
            pt: 30,
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


        <div ref={formRef} className="relative w-full min-h-[100px]">
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
                backgroundColor: 'rgba(10, 0, 0, 0.7)',
                backdropFilter: 'blur(8px)', 
                border: '1px solid rgba(255,255,255,0.15)',
                width: '90%',
                maxWidth: { xs: 350, sm: 400 },
                mx: 'auto',
                p: { xs: 3, sm: 4 },
                mb: { xs: 2, sm: 3 , lg: 120},
                borderRadius: '8px',
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
                      backgroundColor: 'rgba(10, 0, 0, 0.7)',
                      backdropFilter: 'blur(8px)', 
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      borderRadius: '5px',
                      '&::placeholder': {
                        color: 'rgba(255,255,255,0.5)',
                      },
                      '&:focus': {
                        borderColor: '#a72420',
                      },
                    }}
                  />
                </FormControl>

                <PhoneInput
                  country={'pt'}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputStyle={{
                    width: '100%',
                    backgroundColor: '#000',
                    border: '1px solid rgba(255,255,255,0.3)',
                    color: 'white',
                    borderRadius: '5px',
                    paddingLeft: '48px',
                    height: '40px',
                    fontSize: '14px',
                  }}
                  buttonStyle={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                  }}
                  dropdownStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    padding: '4px 0',
                    fontSize: '14px',
                    maxHeight: '250px',
                    overflowY: 'auto',
                  }}
                  containerStyle={{ width: '100%' }}
                  inputProps={{
                    required: true,
                    name: 'phone',
                  }}
                />



                <Button
                  type="submit"
                  variant="solid"
                  disabled={isSubmitting}
                  sx={{
                    borderRadius: '6px',
                    mt: { xs: 2, sm: 3 },             
                    backgroundColor: '#a72420',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#8a1d1a',
                    },
                    '&:disabled': {
                      backgroundColor: 'rgba(167, 36, 32, 0.5)',
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
                
                {submitSuccess && (
                  <div className="text-white-500 text-sm mt-2">
                  Thank you for joining us! Expect to be added to our community in the next few days. We’re excited to have you with us for the upcoming dances. :)
                </div>                
                )}
                
                {submitError && (
                  <div className="text-red-500 text-sm mt-2">
                    {submitError}
                  </div>
                )}
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
