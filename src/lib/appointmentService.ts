import { supabase } from '@/integrations/supabase/client';

export type AppointmentStatus = 'EN_ATTENTE' | 'VALIDE' | 'REFUSE' | 'PROPOSITION_ENVOYEE' | 'PROPOSITION_ACCEPTEE';

export interface AppointmentData {
  id: string;
  name: string;
  email: string;
  country_code: string;
  phone_local: string;
  phone: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: string;
  status_enum: AppointmentStatus;
  proposed_date?: string;
  proposed_time?: string;
  proposal_token?: string;
  created_at: string;
}

const getSiteUrl = () => {
  return window.location.origin;
};

export const sendAppointmentEmail = async (
  type: 'submission' | 'validated' | 'refused' | 'proposal' | 'admin_new',
  appointment: Partial<AppointmentData>
) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-appointment-email', {
      body: {
        type,
        appointment: {
          id: appointment.id,
          name: appointment.name,
          email: appointment.email,
          country_code: appointment.country_code || '+1',
          phone_local: appointment.phone_local || appointment.phone || '',
          service_type: appointment.service_type,
          preferred_date: appointment.preferred_date,
          preferred_time: appointment.preferred_time,
          message: appointment.message,
          proposed_date: appointment.proposed_date,
          proposed_time: appointment.proposed_time,
          proposal_token: appointment.proposal_token,
        },
        siteUrl: getSiteUrl(),
      },
    });

    if (error) {
      console.error('Error sending email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to send email:', err);
    return { success: false, error: err };
  }
};

export const createAppointment = async (appointmentData: {
  name: string;
  email: string;
  country_code: string;
  phone_local: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
}) => {
  // Insert the appointment
  const { data, error } = await supabase.from('appointments').insert({
    name: appointmentData.name,
    email: appointmentData.email,
    phone: `${appointmentData.country_code} ${appointmentData.phone_local}`,
    country_code: appointmentData.country_code,
    phone_local: appointmentData.phone_local,
    service_type: appointmentData.service_type,
    preferred_date: appointmentData.preferred_date,
    preferred_time: appointmentData.preferred_time,
    message: appointmentData.message,
    status: 'pending',
    status_enum: 'EN_ATTENTE',
  }).select().single();

  if (error) {
    return { success: false, error };
  }

  // Send emails (client confirmation + admin notification)
  await sendAppointmentEmail('submission', data);
  await sendAppointmentEmail('admin_new', data);

  return { success: true, data };
};

export const validateAppointment = async (appointmentId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status: 'confirmed',
      status_enum: 'VALIDE' as AppointmentStatus
    })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) {
    return { success: false, error };
  }

  // Send validation email to client
  await sendAppointmentEmail('validated', data);

  return { success: true, data };
};

export const refuseAppointment = async (appointmentId: string) => {
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status: 'refused',
      status_enum: 'REFUSE' as AppointmentStatus
    })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) {
    return { success: false, error };
  }

  // Send refusal email to client
  await sendAppointmentEmail('refused', data);

  return { success: true, data };
};

export const proposeNewDate = async (
  appointmentId: string,
  proposedDate: string,
  proposedTime: string
) => {
  const proposalToken = crypto.randomUUID();
  
  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status: 'proposal_sent',
      status_enum: 'PROPOSITION_ENVOYEE' as AppointmentStatus,
      proposed_date: proposedDate,
      proposed_time: proposedTime,
      proposal_token: proposalToken,
    })
    .eq('id', appointmentId)
    .select()
    .single();

  if (error) {
    return { success: false, error };
  }

  // Send proposal email to client
  await sendAppointmentEmail('proposal', data);

  return { success: true, data };
};

export const getStatusLabel = (status_enum: AppointmentStatus): { label: string; color: string } => {
  const statusMap: Record<AppointmentStatus, { label: string; color: string }> = {
    'EN_ATTENTE': { label: 'En attente', color: 'bg-yellow-500/10 text-yellow-500' },
    'VALIDE': { label: 'Validé', color: 'bg-green-500/10 text-green-500' },
    'REFUSE': { label: 'Refusé', color: 'bg-red-500/10 text-red-500' },
    'PROPOSITION_ENVOYEE': { label: 'Proposition envoyée', color: 'bg-blue-500/10 text-blue-500' },
    'PROPOSITION_ACCEPTEE': { label: 'Proposition acceptée', color: 'bg-green-500/10 text-green-500' },
  };
  
  return statusMap[status_enum] || { label: status_enum, color: 'bg-gray-500/10 text-gray-500' };
};
