-- Create enum for appointment status
CREATE TYPE public.appointment_status AS ENUM (
  'EN_ATTENTE',
  'VALIDE',
  'REFUSE',
  'PROPOSITION_ENVOYEE',
  'PROPOSITION_ACCEPTEE'
);

-- Add new columns to appointments table
ALTER TABLE public.appointments
ADD COLUMN country_code text DEFAULT '+1',
ADD COLUMN phone_local text,
ADD COLUMN proposed_date text,
ADD COLUMN proposed_time text,
ADD COLUMN proposal_token uuid,
ADD COLUMN status_enum appointment_status DEFAULT 'EN_ATTENTE';

-- Migrate existing phone data (extract country code if present, otherwise default)
UPDATE public.appointments 
SET phone_local = COALESCE(phone, ''),
    country_code = '+1';

-- Update the status column to use the new enum (keep old text column for compatibility)
-- We'll use status_enum going forward

-- Create index for faster lookups
CREATE INDEX idx_appointments_status_enum ON public.appointments(status_enum);
CREATE INDEX idx_appointments_proposal_token ON public.appointments(proposal_token) WHERE proposal_token IS NOT NULL;