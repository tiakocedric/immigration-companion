import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { 
  Calendar, 
  Mail, 
  LogOut, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Upload,
  Image,
  Loader2,
  Phone,
  User,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  Star,
  Plus,
  Edit,
  Save,
  X
} from 'lucide-react';

interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status: string;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface SiteContent {
  id: string;
  key: string;
  value_fr: string;
  value_en: string;
  content_type: string;
}

interface Testimonial {
  id: string;
  name: string;
  location_fr: string;
  location_en: string;
  content_fr: string;
  content_en: string;
  rating: number;
  display_order: number;
  is_active: boolean;
}

interface Service {
  id: string;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}

interface FAQ {
  id: string;
  question_fr: string;
  question_en: string;
  answer_fr: string;
  answer_en: string;
  display_order: number;
  is_active: boolean;
}

type Tab = 'appointments' | 'contacts' | 'content' | 'services' | 'testimonials' | 'faq' | 'photos';

export default function Admin() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faq, setFaq] = useState<FAQ[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<{name: string, url: string}[]>([]);
  const [editingContent, setEditingContent] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchData();
      fetchPhotos();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    setLoadingData(true);
    const [appointmentsRes, contactsRes, contentRes, servicesRes, testimonialsRes, faqRes] = await Promise.all([
      supabase.from('appointments').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('site_content').select('*').order('key'),
      supabase.from('services').select('*').order('display_order'),
      supabase.from('testimonials').select('*').order('display_order'),
      supabase.from('faq').select('*').order('display_order'),
    ]);

    if (appointmentsRes.data) setAppointments(appointmentsRes.data);
    if (contactsRes.data) setContacts(contactsRes.data);
    if (contentRes.data) setSiteContent(contentRes.data);
    if (servicesRes.data) setServices(servicesRes.data);
    if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
    if (faqRes.data) setFaq(faqRes.data);
    setLoadingData(false);
  };

  const fetchPhotos = async () => {
    const { data } = await supabase.storage.from('photos').list();
    if (data) {
      const photosWithUrls = data.map(file => {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(file.name);
        return { name: file.name, url: urlData.publicUrl };
      });
      setPhotos(photosWithUrls);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('appointments').update({ status }).eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Mis à jour'); fetchData(); }
  };

  const updateContactStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('contact_submissions').update({ status }).eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Mis à jour'); fetchData(); }
  };

  const deleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Supprimé'); fetchData(); }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Supprimé'); fetchData(); }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    if (error) toast.error('Erreur'); else { toast.success('Photo téléchargée'); fetchPhotos(); }
    setUploading(false);
  };

  const deletePhoto = async (name: string) => {
    const { error } = await supabase.storage.from('photos').remove([name]);
    if (error) toast.error('Erreur'); else { toast.success('Photo supprimée'); fetchPhotos(); }
  };

  const setAsProfilePhoto = async (url: string) => {
    const existing = await supabase.from('site_images').select('*').eq('key', 'consultant_photo').maybeSingle();
    if (existing.data) {
      await supabase.from('site_images').update({ image_url: url }).eq('key', 'consultant_photo');
    } else {
      await supabase.from('site_images').insert({ key: 'consultant_photo', image_url: url, alt_text_fr: 'Photo du consultant', alt_text_en: 'Consultant photo' });
    }
    toast.success('Photo de profil mise à jour');
  };

  const updateContent = async (id: string, valueFr: string, valueEn: string) => {
    const { error } = await supabase.from('site_content').update({ value_fr: valueFr, value_en: valueEn }).eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Contenu mis à jour'); fetchData(); setEditingContent(null); }
  };

  const updateService = async (service: Service) => {
    const { error } = await supabase.from('services').update(service).eq('id', service.id);
    if (error) toast.error('Erreur'); else { toast.success('Service mis à jour'); fetchData(); setEditingContent(null); }
  };

  const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Service supprimé'); fetchData(); }
  };

  const updateTestimonial = async (testimonial: Testimonial) => {
    const { error } = await supabase.from('testimonials').update(testimonial).eq('id', testimonial.id);
    if (error) toast.error('Erreur'); else { toast.success('Témoignage mis à jour'); fetchData(); setEditingContent(null); }
  };

  const deleteTestimonial = async (id: string) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('Témoignage supprimé'); fetchData(); }
  };

  const addTestimonial = async () => {
    const { error } = await supabase.from('testimonials').insert({
      name: 'Nouveau client',
      location_fr: 'Pays → Canada',
      location_en: 'Country → Canada',
      content_fr: 'Votre témoignage ici...',
      content_en: 'Your testimonial here...',
      rating: 5,
      display_order: testimonials.length + 1,
    });
    if (error) toast.error('Erreur'); else { toast.success('Témoignage ajouté'); fetchData(); }
  };

  const updateFaq = async (item: FAQ) => {
    const { error } = await supabase.from('faq').update(item).eq('id', item.id);
    if (error) toast.error('Erreur'); else { toast.success('FAQ mise à jour'); fetchData(); setEditingContent(null); }
  };

  const deleteFaq = async (id: string) => {
    const { error } = await supabase.from('faq').delete().eq('id', id);
    if (error) toast.error('Erreur'); else { toast.success('FAQ supprimée'); fetchData(); }
  };

  const addFaq = async () => {
    const { error } = await supabase.from('faq').insert({
      question_fr: 'Nouvelle question?',
      question_en: 'New question?',
      answer_fr: 'Réponse ici...',
      answer_en: 'Answer here...',
      display_order: faq.length + 1,
    });
    if (error) toast.error('Erreur'); else { toast.success('FAQ ajoutée'); fetchData(); }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-txt-primary mb-4">Accès refusé</h1>
          <p className="text-txt-secondary mb-6">Vous n'avez pas les droits administrateur.</p>
          <button onClick={handleLogout} className="px-6 py-3 bg-brand-red text-primary-foreground rounded-xl font-semibold hover:bg-brand-red/90 transition-colors">
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'appointments', label: 'Rendez-vous', icon: <Calendar className="w-5 h-5" />, count: appointments.length },
    { id: 'contacts', label: 'Messages', icon: <Mail className="w-5 h-5" />, count: contacts.length },
    { id: 'content', label: 'Contenu', icon: <Settings className="w-5 h-5" /> },
    { id: 'services', label: 'Services', icon: <FileText className="w-5 h-5" /> },
    { id: 'testimonials', label: 'Témoignages', icon: <Star className="w-5 h-5" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-5 h-5" /> },
    { id: 'photos', label: 'Photos', icon: <Image className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-txt-primary">MIMB Admin</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-txt-secondary hover:text-txt-primary text-sm">← Voir le site</a>
            <button onClick={handleLogout} className="flex items-center gap-2 text-txt-secondary hover:text-txt-primary transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-brand-red text-primary-foreground' : 'text-txt-secondary hover:bg-muted'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && <span className="text-xs">({tab.count})</span>}
            </button>
          ))}
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
          </div>
        ) : (
          <>
            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-center py-12 text-txt-secondary">Aucun rendez-vous</div>
                ) : appointments.map((apt) => (
                  <div key={apt.id} className="bg-surface rounded-2xl p-6 border border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-brand-red" />
                          <span className="font-semibold text-txt-primary">{apt.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${apt.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                            {apt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                        </div>
                        <div className="text-sm text-txt-secondary space-y-1">
                          <p><Mail className="w-4 h-4 inline mr-2" />{apt.email}</p>
                          {apt.phone && <p><Phone className="w-4 h-4 inline mr-2" />{apt.phone}</p>}
                          <p><Calendar className="w-4 h-4 inline mr-2" />{apt.preferred_date} à {apt.preferred_time}</p>
                          <p><strong>Service:</strong> {apt.service_type}</p>
                          {apt.message && <p><MessageSquare className="w-4 h-4 inline mr-2" />{apt.message}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {apt.status === 'pending' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'confirmed')} className="flex items-center gap-1 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status === 'confirmed' && (
                          <button onClick={() => updateAppointmentStatus(apt.id, 'pending')} className="flex items-center gap-1 px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20">
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => deleteAppointment(apt.id)} className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-txt-secondary">Aucun message</div>
                ) : contacts.map((contact) => (
                  <div key={contact.id} className="bg-surface rounded-2xl p-6 border border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-brand-red" />
                          <span className="font-semibold text-txt-primary">{contact.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${contact.status === 'read' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {contact.status === 'read' ? 'Lu' : 'Non lu'}
                          </span>
                        </div>
                        <div className="text-sm text-txt-secondary space-y-1">
                          <p><Mail className="w-4 h-4 inline mr-2" />{contact.email}</p>
                          {contact.phone && <p><Phone className="w-4 h-4 inline mr-2" />{contact.phone}</p>}
                          <p className="mt-2">{contact.message}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {contact.status === 'unread' && (
                          <button onClick={() => updateContactStatus(contact.id, 'read')} className="px-3 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => deleteContact(contact.id)} className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Content Tab */}
            {activeTab === 'content' && (
              <div className="space-y-4">
                {siteContent.map((item) => (
                  <div key={item.id} className="bg-surface rounded-2xl p-6 border border-border">
                    {editingContent === item.id ? (
                      <div className="space-y-4">
                        <p className="font-semibold text-txt-primary capitalize">{item.key.replace(/_/g, ' ')}</p>
                        <div>
                          <label className="text-sm text-txt-secondary">Français</label>
                          <textarea value={editForm.value_fr || ''} onChange={(e) => setEditForm({ ...editForm, value_fr: e.target.value })} className="w-full mt-1 px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        </div>
                        <div>
                          <label className="text-sm text-txt-secondary">English</label>
                          <textarea value={editForm.value_en || ''} onChange={(e) => setEditForm({ ...editForm, value_en: e.target.value })} className="w-full mt-1 px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => updateContent(item.id, editForm.value_fr, editForm.value_en)} className="px-4 py-2 bg-brand-red text-primary-foreground rounded-lg flex items-center gap-2">
                            <Save className="w-4 h-4" /> Sauvegarder
                          </button>
                          <button onClick={() => setEditingContent(null)} className="px-4 py-2 bg-muted text-txt-primary rounded-lg">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-txt-primary capitalize mb-2">{item.key.replace(/_/g, ' ')}</p>
                          <p className="text-sm text-txt-secondary"><span className="font-medium">FR:</span> {item.value_fr}</p>
                          <p className="text-sm text-txt-secondary"><span className="font-medium">EN:</span> {item.value_en}</p>
                        </div>
                        <button onClick={() => { setEditingContent(item.id); setEditForm({ value_fr: item.value_fr, value_en: item.value_en }); }} className="p-2 text-txt-secondary hover:text-brand-red">
                          <Edit className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-4">
                {services.map((service) => (
                  <div key={service.id} className="bg-surface rounded-2xl p-6 border border-border">
                    {editingContent === service.id ? (
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm text-txt-secondary">Titre FR</label>
                            <input type="text" value={editForm.title_fr || ''} onChange={(e) => setEditForm({ ...editForm, title_fr: e.target.value })} className="w-full mt-1 px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                          </div>
                          <div>
                            <label className="text-sm text-txt-secondary">Titre EN</label>
                            <input type="text" value={editForm.title_en || ''} onChange={(e) => setEditForm({ ...editForm, title_en: e.target.value })} className="w-full mt-1 px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-txt-secondary">Description FR</label>
                          <textarea value={editForm.description_fr || ''} onChange={(e) => setEditForm({ ...editForm, description_fr: e.target.value })} className="w-full mt-1 px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={2} />
                        </div>
                        <div>
                          <label className="text-sm text-txt-secondary">Description EN</label>
                          <textarea value={editForm.description_en || ''} onChange={(e) => setEditForm({ ...editForm, description_en: e.target.value })} className="w-full mt-1 px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={2} />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => updateService({ ...service, ...editForm })} className="px-4 py-2 bg-brand-red text-primary-foreground rounded-lg flex items-center gap-2">
                            <Save className="w-4 h-4" /> Sauvegarder
                          </button>
                          <button onClick={() => setEditingContent(null)} className="px-4 py-2 bg-muted text-txt-primary rounded-lg"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-txt-primary">{service.title_fr}</p>
                          <p className="text-sm text-txt-secondary">{service.description_fr}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingContent(service.id); setEditForm(service); }} className="p-2 text-txt-secondary hover:text-brand-red"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => deleteService(service.id)} className="p-2 text-txt-secondary hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <button onClick={addTestimonial} className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-txt-secondary hover:border-brand-red hover:text-brand-red transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Ajouter un témoignage
                </button>
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-surface rounded-2xl p-6 border border-border">
                    {editingContent === t.id ? (
                      <div className="space-y-4">
                        <input type="text" value={editForm.name || ''} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Nom" className="w-full px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                        <div className="grid sm:grid-cols-2 gap-4">
                          <input type="text" value={editForm.location_fr || ''} onChange={(e) => setEditForm({ ...editForm, location_fr: e.target.value })} placeholder="Localisation FR" className="w-full px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                          <input type="text" value={editForm.location_en || ''} onChange={(e) => setEditForm({ ...editForm, location_en: e.target.value })} placeholder="Location EN" className="w-full px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                        </div>
                        <textarea value={editForm.content_fr || ''} onChange={(e) => setEditForm({ ...editForm, content_fr: e.target.value })} placeholder="Témoignage FR" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        <textarea value={editForm.content_en || ''} onChange={(e) => setEditForm({ ...editForm, content_en: e.target.value })} placeholder="Testimonial EN" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        <div className="flex gap-2">
                          <button onClick={() => updateTestimonial({ ...t, ...editForm })} className="px-4 py-2 bg-brand-red text-primary-foreground rounded-lg flex items-center gap-2"><Save className="w-4 h-4" /> Sauvegarder</button>
                          <button onClick={() => setEditingContent(null)} className="px-4 py-2 bg-muted text-txt-primary rounded-lg"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-txt-primary">{t.name}</p>
                          <p className="text-sm text-brand-red">{t.location_fr}</p>
                          <p className="text-sm text-txt-secondary mt-2">"{t.content_fr}"</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingContent(t.id); setEditForm(t); }} className="p-2 text-txt-secondary hover:text-brand-red"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => deleteTestimonial(t.id)} className="p-2 text-txt-secondary hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-4">
                <button onClick={addFaq} className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-txt-secondary hover:border-brand-red hover:text-brand-red transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" /> Ajouter une FAQ
                </button>
                {faq.map((item) => (
                  <div key={item.id} className="bg-surface rounded-2xl p-6 border border-border">
                    {editingContent === item.id ? (
                      <div className="space-y-4">
                        <input type="text" value={editForm.question_fr || ''} onChange={(e) => setEditForm({ ...editForm, question_fr: e.target.value })} placeholder="Question FR" className="w-full px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                        <input type="text" value={editForm.question_en || ''} onChange={(e) => setEditForm({ ...editForm, question_en: e.target.value })} placeholder="Question EN" className="w-full px-4 py-2 bg-background border border-border rounded-xl text-txt-primary" />
                        <textarea value={editForm.answer_fr || ''} onChange={(e) => setEditForm({ ...editForm, answer_fr: e.target.value })} placeholder="Réponse FR" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        <textarea value={editForm.answer_en || ''} onChange={(e) => setEditForm({ ...editForm, answer_en: e.target.value })} placeholder="Answer EN" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-txt-primary" rows={3} />
                        <div className="flex gap-2">
                          <button onClick={() => updateFaq({ ...item, ...editForm })} className="px-4 py-2 bg-brand-red text-primary-foreground rounded-lg flex items-center gap-2"><Save className="w-4 h-4" /> Sauvegarder</button>
                          <button onClick={() => setEditingContent(null)} className="px-4 py-2 bg-muted text-txt-primary rounded-lg"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-txt-primary">{item.question_fr}</p>
                          <p className="text-sm text-txt-secondary mt-2">{item.answer_fr}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingContent(item.id); setEditForm(item); }} className="p-2 text-txt-secondary hover:text-brand-red"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => deleteFaq(item.id)} className="p-2 text-txt-secondary hover:text-red-500"><Trash2 className="w-5 h-5" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Photos Tab */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-brand-red/50 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      {uploading ? <Loader2 className="w-8 h-8 animate-spin text-brand-red" /> : (
                        <>
                          <Upload className="w-8 h-8 text-txt-secondary mb-2" />
                          <p className="text-sm text-txt-secondary">Télécharger une photo</p>
                        </>
                      )}
                    </div>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.name} className="relative group">
                      <div className="aspect-square rounded-xl overflow-hidden border border-border">
                        <img src={photo.url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                        <button onClick={() => setAsProfilePhoto(photo.url)} className="p-2 bg-brand-red text-white rounded-lg" title="Utiliser comme photo de profil">
                          <User className="w-4 h-4" />
                        </button>
                        <button onClick={() => deletePhoto(photo.name)} className="p-2 bg-red-500 text-white rounded-lg" title="Supprimer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {photos.length === 0 && <div className="text-center py-12 text-txt-secondary">Aucune photo</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
