-- Fix testimonials INSERT policy to explicitly allow anonymous users
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
CREATE POLICY "Anyone can submit testimonials" 
ON public.testimonials 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Fix contact_submissions INSERT policy to explicitly allow anonymous users
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);