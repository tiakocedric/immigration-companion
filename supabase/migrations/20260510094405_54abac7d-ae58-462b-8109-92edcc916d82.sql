-- Table for users who want to be notified when site is back online
CREATE TABLE public.maintenance_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  notified BOOLEAN NOT NULL DEFAULT false,
  notified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.maintenance_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
CREATE POLICY "Anyone can subscribe to maintenance updates"
ON public.maintenance_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view subscribers
CREATE POLICY "Admins can view maintenance subscribers"
ON public.maintenance_subscribers
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update / delete
CREATE POLICY "Admins can update maintenance subscribers"
ON public.maintenance_subscribers
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete maintenance subscribers"
ON public.maintenance_subscribers
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_maintenance_subscribers_email ON public.maintenance_subscribers(email);
CREATE INDEX idx_maintenance_subscribers_notified ON public.maintenance_subscribers(notified);