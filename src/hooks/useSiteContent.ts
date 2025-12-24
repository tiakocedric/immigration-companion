import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface SiteContent {
  key: string;
  value_fr: string | null;
  value_en: string | null;
}

interface SiteImage {
  key: string;
  image_url: string;
  alt_text_fr: string | null;
  alt_text_en: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  location_fr: string | null;
  location_en: string | null;
  content_fr: string;
  content_en: string;
  rating: number;
  display_order: number;
  is_active: boolean;
}

export interface Service {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

export interface FAQ {
  id: string;
  question_fr: string;
  question_en: string;
  answer_fr: string;
  answer_en: string;
  display_order: number;
  is_active: boolean;
}

export function useSiteContent() {
  const queryClient = useQueryClient();

  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;
      return data as SiteContent[];
    },
  });

  const { data: images, isLoading: imagesLoading } = useQuery({
    queryKey: ['site-images'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_images').select('*');
      if (error) throw error;
      return data as SiteImage[];
    },
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Testimonial[];
    },
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as Service[];
    },
  });

  const { data: faq, isLoading: faqLoading } = useQuery({
    queryKey: ['faq'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faq')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data as FAQ[];
    },
  });

  const getContent = (key: string, language: 'fr' | 'en'): string => {
    const item = content?.find((c) => c.key === key);
    if (!item) return '';
    return (language === 'fr' ? item.value_fr : item.value_en) || '';
  };

  const getImage = (key: string): string | null => {
    const item = images?.find((i) => i.key === key);
    return item?.image_url || null;
  };

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['site-content'] });
    queryClient.invalidateQueries({ queryKey: ['site-images'] });
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    queryClient.invalidateQueries({ queryKey: ['services'] });
    queryClient.invalidateQueries({ queryKey: ['faq'] });
  };

  return {
    content,
    images,
    testimonials,
    services,
    faq,
    getContent,
    getImage,
    invalidateAll,
    isLoading: contentLoading || imagesLoading || testimonialsLoading || servicesLoading || faqLoading,
  };
}
