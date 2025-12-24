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
  MessageSquare
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

export default function Admin() {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'appointments' | 'contacts' | 'photos'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

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
    const [appointmentsRes, contactsRes] = await Promise.all([
      supabase.from('appointments').select('*').order('created_at', { ascending: false }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    ]);

    if (appointmentsRes.data) setAppointments(appointmentsRes.data);
    if (contactsRes.data) setContacts(contactsRes.data);
    setLoadingData(false);
  };

  const fetchPhotos = async () => {
    const { data } = await supabase.storage.from('photos').list();
    if (data) {
      const urls = data.map(file => {
        const { data: urlData } = supabase.storage.from('photos').getPublicUrl(file.name);
        return urlData.publicUrl;
      });
      setPhotos(urls);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      toast.success('Statut mis à jour');
      fetchData();
    }
  };

  const updateContactStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);
    
    if (error) {
      toast.error('Erreur lors de la mise à jour');
    } else {
      toast.success('Statut mis à jour');
      fetchData();
    }
  };

  const deleteAppointment = async (id: string) => {
    const { error } = await supabase.from('appointments').delete().eq('id', id);
    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Rendez-vous supprimé');
      fetchData();
    }
  };

  const deleteContact = async (id: string) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) {
      toast.error('Erreur lors de la suppression');
    } else {
      toast.success('Message supprimé');
      fetchData();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    
    const { error } = await supabase.storage.from('photos').upload(fileName, file);
    
    if (error) {
      toast.error('Erreur lors du téléchargement');
    } else {
      toast.success('Photo téléchargée');
      fetchPhotos();
    }
    setUploading(false);
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
          <h1 className="text-2xl font-heading font-bold text-txt-primary mb-4">
            Accès refusé
          </h1>
          <p className="text-txt-secondary mb-6">
            Vous n'avez pas les droits administrateur.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-brand-red text-primary-foreground rounded-xl font-semibold hover:bg-brand-red/90 transition-colors"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-heading font-bold text-txt-primary">
            MIMB Admin
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-txt-secondary hover:text-txt-primary transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'appointments' 
                ? 'border-brand-red text-brand-red' 
                : 'border-transparent text-txt-secondary hover:text-txt-primary'
            }`}
          >
            <Calendar className="w-5 h-5" />
            Rendez-vous ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'contacts' 
                ? 'border-brand-red text-brand-red' 
                : 'border-transparent text-txt-secondary hover:text-txt-primary'
            }`}
          >
            <Mail className="w-5 h-5" />
            Messages ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === 'photos' 
                ? 'border-brand-red text-brand-red' 
                : 'border-transparent text-txt-secondary hover:text-txt-primary'
            }`}
          >
            <Image className="w-5 h-5" />
            Photos
          </button>
        </div>

        {loadingData ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
          </div>
        ) : (
          <>
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                {appointments.length === 0 ? (
                  <div className="text-center py-12 text-txt-secondary">
                    Aucun rendez-vous pour le moment
                  </div>
                ) : (
                  appointments.map((apt) => (
                    <div key={apt.id} className="bg-surface rounded-2xl p-6 border border-border">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-brand-red" />
                            <span className="font-semibold text-txt-primary">{apt.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              apt.status === 'confirmed' 
                                ? 'bg-green-500/10 text-green-500' 
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {apt.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-txt-secondary">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${apt.email}`} className="hover:text-brand-red">{apt.email}</a>
                          </div>
                          {apt.phone && (
                            <div className="flex items-center gap-3 text-txt-secondary">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${apt.phone}`} className="hover:text-brand-red">{apt.phone}</a>
                            </div>
                          )}
                          <div className="flex items-center gap-3 text-txt-secondary">
                            <Calendar className="w-4 h-4" />
                            <span>{apt.preferred_date} à {apt.preferred_time}</span>
                          </div>
                          <div className="text-txt-secondary">
                            <strong>Service:</strong> {apt.service_type}
                          </div>
                          {apt.message && (
                            <div className="flex items-start gap-3 text-txt-secondary">
                              <MessageSquare className="w-4 h-4 mt-1" />
                              <p>{apt.message}</p>
                            </div>
                          )}
                          <div className="text-xs text-txt-secondary">
                            Reçu le {new Date(apt.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'confirmed')}
                              className="flex items-center gap-1 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Confirmer
                            </button>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'pending')}
                              className="flex items-center gap-1 px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg hover:bg-yellow-500/20 transition-colors"
                            >
                              <Clock className="w-4 h-4" />
                              En attente
                            </button>
                          )}
                          <button
                            onClick={() => deleteAppointment(apt.id)}
                            className="flex items-center gap-1 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-4">
                {contacts.length === 0 ? (
                  <div className="text-center py-12 text-txt-secondary">
                    Aucun message pour le moment
                  </div>
                ) : (
                  contacts.map((contact) => (
                    <div key={contact.id} className="bg-surface rounded-2xl p-6 border border-border">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-brand-red" />
                            <span className="font-semibold text-txt-primary">{contact.name}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              contact.status === 'read' 
                                ? 'bg-green-500/10 text-green-500' 
                                : 'bg-blue-500/10 text-blue-500'
                            }`}>
                              {contact.status === 'read' ? 'Lu' : 'Non lu'}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-txt-secondary">
                            <Mail className="w-4 h-4" />
                            <a href={`mailto:${contact.email}`} className="hover:text-brand-red">{contact.email}</a>
                          </div>
                          {contact.phone && (
                            <div className="flex items-center gap-3 text-txt-secondary">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${contact.phone}`} className="hover:text-brand-red">{contact.phone}</a>
                            </div>
                          )}
                          <div className="flex items-start gap-3 text-txt-secondary">
                            <MessageSquare className="w-4 h-4 mt-1" />
                            <p>{contact.message}</p>
                          </div>
                          <div className="text-xs text-txt-secondary">
                            Reçu le {new Date(contact.created_at).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {contact.status === 'unread' && (
                            <button
                              onClick={() => updateContactStatus(contact.id, 'read')}
                              className="flex items-center gap-1 px-3 py-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500/20 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Marquer lu
                            </button>
                          )}
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="flex items-center gap-1 px-3 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'photos' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-2xl p-6 border border-border">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-brand-red/50 transition-colors">
                    <div className="flex flex-col items-center justify-center">
                      {uploading ? (
                        <Loader2 className="w-8 h-8 animate-spin text-brand-red" />
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-txt-secondary mb-2" />
                          <p className="text-sm text-txt-secondary">
                            Cliquez pour télécharger une photo
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((url, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden border border-border">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {photos.length === 0 && (
                  <div className="text-center py-12 text-txt-secondary">
                    Aucune photo téléchargée
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
