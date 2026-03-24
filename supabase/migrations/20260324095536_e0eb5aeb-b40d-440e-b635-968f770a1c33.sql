
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_fr text NOT NULL,
  title_en text NOT NULL,
  excerpt_fr text NOT NULL DEFAULT '',
  excerpt_en text NOT NULL DEFAULT '',
  content_fr text NOT NULL DEFAULT '',
  content_en text NOT NULL DEFAULT '',
  category_fr text NOT NULL DEFAULT '',
  category_en text NOT NULL DEFAULT '',
  image_url text DEFAULT '',
  read_time integer DEFAULT 5,
  is_published boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
ON public.blog_posts FOR SELECT
TO public
USING (is_published = true);

CREATE POLICY "Admins can manage blog posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
