-- Add status column to testimonials for approval workflow
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending';

-- Update existing testimonials to be approved
UPDATE public.testimonials SET status = 'approved' WHERE status = 'pending';

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

-- Create new policies
-- Anyone can view approved and active testimonials
CREATE POLICY "Anyone can view approved testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_active = true AND status = 'approved');

-- Anyone can submit a testimonial
CREATE POLICY "Anyone can submit testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

-- Admins can view all testimonials (including pending)
CREATE POLICY "Admins can view all testimonials" 
ON public.testimonials 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update testimonials
CREATE POLICY "Admins can update testimonials" 
ON public.testimonials 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete testimonials
CREATE POLICY "Admins can delete testimonials" 
ON public.testimonials 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));