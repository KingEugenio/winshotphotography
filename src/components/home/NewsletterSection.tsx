import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section
      id="newsletter-updates-section"
      className="w-full bg-[#2a2a2a] text-white py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-[#383838]"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Heading matching screenshot: FOLLOW OUR UPDATES */}
        <h2
          id="newsletter-heading"
          className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase mb-3 select-none"
        >
          FOLLOW OUR UPDATES
        </h2>

        {/* Subtitle matching screenshot: Subscribe to receive the hottest news and information about updates and future events! */}
        <p
          id="newsletter-subtitle"
          className="text-[#aaaaaa] text-xs sm:text-sm font-light tracking-wide max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-sans"
        >
          Subscribe to receive the hottest news and information about updates and future events!
        </p>

        {/* Subscription Form */}
        {status === 'success' ? (
          <div
            id="newsletter-success-notice"
            className="bg-[#383838] border border-white/20 p-6 max-w-md mx-auto flex flex-col items-center animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-3">
              <Check className="w-5 h-5" />
            </div>
            <p className="font-display text-xs tracking-[0.2em] uppercase font-semibold text-white mb-1">
              SUBSCRIPTION CONFIRMED
            </p>
            <p className="text-xs text-[#cccccc] font-sans">
              Thank you for following Winshot Photography. You will receive private dispatches and seasonal editorial updates.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-4 text-[11px] font-display tracking-widest text-[#aaaaaa] hover:text-white underline uppercase cursor-pointer"
            >
              Register Another Email
            </button>
          </div>
        ) : (
          <form
            id="newsletter-subscription-form"
            onSubmit={handleSubmit}
            className="flex flex-col items-center max-w-md mx-auto w-full"
          >
            {/* Input Box matching screenshot: dark fill, centered placeholder 'Your email *' */}
            <div className="relative w-full mb-4">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Your email *"
                required
                className="w-full bg-[#3e3e3e] text-white placeholder-[#999999] border border-[#555555] focus:border-white focus:outline-none px-6 py-3.5 text-center text-xs sm:text-sm font-sans tracking-wider transition-colors duration-200"
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777777] pointer-events-none hidden sm:block" />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-xs font-mono mb-3 tracking-wide">{errorMessage}</p>
            )}

            {/* Subscribe Button matching screenshot: light off-white button below input */}
            <button
              id="newsletter-subscribe-button"
              type="submit"
              disabled={status === 'loading'}
              className="cursor-pointer bg-[#deded9] hover:bg-white text-[#222222] font-display font-medium text-xs tracking-[0.25em] uppercase px-10 sm:px-12 py-3.5 sm:py-4 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {status === 'loading' ? 'PROCESSING...' : 'SUBSCRIBE'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
