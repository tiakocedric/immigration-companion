-- Drop the existing policy and recreate it to explicitly allow anonymous inserts
DROP POLICY IF EXISTS "Anyone can submit appointments" ON public.appointments;

-- Create a new policy that explicitly allows both authenticated and anonymous users to insert
CREATE POLICY "Anyone can submit appointments" 
ON public.appointments 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);