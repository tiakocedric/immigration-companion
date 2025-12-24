-- Create site_content table for editable content
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_fr TEXT,
  value_en TEXT,
  content_type TEXT NOT NULL DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_images table for uploadable images
CREATE TABLE public.site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  alt_text_fr TEXT,
  alt_text_en TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table for editable testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location_fr TEXT,
  location_en TEXT,
  content_fr TEXT NOT NULL,
  content_en TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services table for editable services
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_fr TEXT NOT NULL,
  description_en TEXT NOT NULL,
  icon TEXT DEFAULT 'FileText',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create faq table for editable FAQ
CREATE TABLE public.faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_fr TEXT NOT NULL,
  question_en TEXT NOT NULL,
  answer_fr TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;

-- Public read policies (everyone can view content)
CREATE POLICY "Anyone can view site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Anyone can view site images" ON public.site_images FOR SELECT USING (true);
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active faq" ON public.faq FOR SELECT USING (is_active = true);

-- Admin manage policies
CREATE POLICY "Admins can manage site content" ON public.site_content FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage site images" ON public.site_images FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage faq" ON public.faq FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Update triggers
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_images_updated_at BEFORE UPDATE ON public.site_images FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON public.faq FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site content
INSERT INTO public.site_content (key, value_fr, value_en, content_type) VALUES
('hero_title', 'Votre immigration. Réglementée. Accompagnée.', 'Your immigration. Regulated. Supported.', 'text'),
('hero_subtitle', 'Consultant réglementé en immigration canadienne (CRIC) au service de vos projets migratoires avec rigueur, transparence et conformité.', 'Regulated Canadian Immigration Consultant (RCIC) serving your migration projects with rigor, transparency and compliance.', 'text'),
('consultant_name', 'Mimb Franklin', 'Mimb Franklin', 'text'),
('consultant_title', 'Consultant Réglementé en Immigration Canadienne', 'Regulated Canadian Immigration Consultant', 'text'),
('consultant_license', 'CICC #R000000', 'CICC #R000000', 'text'),
('about_title', 'À propos de Mimb Franklin', 'About Mimb Franklin', 'text'),
('about_description', 'Consultant réglementé en immigration canadienne avec plus de 10 ans d''expérience dans l''accompagnement de clients du monde entier.', 'Regulated Canadian immigration consultant with over 10 years of experience supporting clients from around the world.', 'text'),
('contact_phone', '(514) 462-7623', '(514) 462-7623', 'text'),
('contact_email', 'fmimb@yahoo.fr', 'fmimb@yahoo.fr', 'text'),
('contact_address', 'Montréal, Québec, Canada', 'Montreal, Quebec, Canada', 'text');

-- Insert default services
INSERT INTO public.services (title_fr, title_en, description_fr, description_en, icon, display_order) VALUES
('Résidence permanente', 'Permanent Residence', 'Accompagnement complet pour votre demande de résidence permanente au Canada.', 'Complete support for your permanent residence application in Canada.', 'Home', 1),
('Permis de travail', 'Work Permit', 'Obtention et renouvellement de permis de travail pour le Canada.', 'Obtaining and renewing work permits for Canada.', 'Briefcase', 2),
('Permis d''études', 'Study Permit', 'Assistance pour les demandes de permis d''études et extensions.', 'Assistance for study permit applications and extensions.', 'GraduationCap', 3),
('Visa visiteur', 'Visitor Visa', 'Demandes de visa de visiteur et super visa pour parents et grands-parents.', 'Visitor visa and super visa applications for parents and grandparents.', 'Plane', 4),
('Citoyenneté', 'Citizenship', 'Accompagnement pour les demandes de citoyenneté canadienne.', 'Support for Canadian citizenship applications.', 'Award', 5),
('Parrainage familial', 'Family Sponsorship', 'Réunification familiale et parrainage d''époux, enfants et parents.', 'Family reunification and sponsorship of spouses, children and parents.', 'Users', 6);

-- Insert default testimonials
INSERT INTO public.testimonials (name, location_fr, location_en, content_fr, content_en, rating, display_order) VALUES
('Marie-Claire D.', 'France → Canada', 'France → Canada', 'Grâce à M. Mimb, j''ai obtenu ma résidence permanente en moins de 8 mois. Son professionnalisme et sa rigueur m''ont rassurée tout au long du processus.', 'Thanks to Mr. Mimb, I obtained my permanent residence in less than 8 months. His professionalism and rigor reassured me throughout the process.', 5, 1),
('Jean-Pierre K.', 'Cameroun → Canada', 'Cameroon → Canada', 'Un accompagnement exceptionnel pour mon permis de travail. M. Mimb connaît parfaitement les procédures et m''a guidé avec expertise.', 'Exceptional support for my work permit. Mr. Mimb knows the procedures perfectly and guided me with expertise.', 5, 2),
('Sophie L.', 'Belgique → Canada', 'Belgium → Canada', 'Je recommande vivement les services de MIMB Immigration. Transparent, efficace et toujours disponible pour répondre à mes questions.', 'I highly recommend MIMB Immigration services. Transparent, efficient and always available to answer my questions.', 5, 3);

-- Insert default FAQ
INSERT INTO public.faq (question_fr, question_en, answer_fr, answer_en, display_order) VALUES
('Qu''est-ce qu''un consultant réglementé en immigration?', 'What is a regulated immigration consultant?', 'Un consultant réglementé en immigration canadienne (CRIC) est un professionnel autorisé par le Collège des consultants en immigration et en citoyenneté (CICC) à représenter des clients dans leurs démarches d''immigration au Canada.', 'A Regulated Canadian Immigration Consultant (RCIC) is a professional authorized by the College of Immigration and Citizenship Consultants (CICC) to represent clients in their immigration procedures to Canada.', 1),
('Combien de temps prend une demande de résidence permanente?', 'How long does a permanent residence application take?', 'Les délais varient selon le programme. En moyenne, comptez 6 à 12 mois pour Entrée express et 12 à 24 mois pour les autres programmes provinciaux.', 'Processing times vary by program. On average, expect 6 to 12 months for Express Entry and 12 to 24 months for other provincial programs.', 2),
('Quels documents sont nécessaires pour commencer?', 'What documents are needed to start?', 'Les documents de base incluent: passeport valide, diplômes et relevés de notes, attestations d''emploi, résultats de tests de langue (IELTS/TEF), et évaluation des diplômes (ECA).', 'Basic documents include: valid passport, diplomas and transcripts, employment certificates, language test results (IELTS/TEF), and credential assessment (ECA).', 3),
('Offrez-vous des consultations gratuites?', 'Do you offer free consultations?', 'Nous offrons une première évaluation gratuite de 15 minutes pour discuter de votre situation et déterminer les options qui s''offrent à vous.', 'We offer a free 15-minute initial assessment to discuss your situation and determine the options available to you.', 4);