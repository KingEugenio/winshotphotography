import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { FormspreeBookingForm } from './FormspreeBookingForm';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialPackage?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService,
  initialPackage,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white text-black p-6 sm:p-10 my-8 shadow-2xl border border-neutral-300 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-500 hover:text-black transition-colors p-2 cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-8 pr-8">
          <span className="font-display text-[10px] tracking-[0.3em] uppercase text-neutral-500">
            WINSHOT PHOTOGRAPHY RESERVATION
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-[0.15em] uppercase text-black mt-1">
            SESSION BOOKING FORM
          </h2>
          <div className="w-10 h-[2px] bg-black mx-auto mt-3 mb-2" />
          <p className="text-xs text-neutral-600 font-sans">
            Fill in your preferred date and session details. Your request is sent securely via Formspree.
          </p>
        </div>

        {/* Formspree Form */}
        <FormspreeBookingForm
          initialService={initialService}
          initialPackage={initialPackage}
          onSuccess={() => {
            // keep open to see confirmation or let user close
          }}
        />
      </div>
    </div>
  );
};
