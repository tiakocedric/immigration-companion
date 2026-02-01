import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const ADMIN_EMAIL = "fmimb@yahoo.fr";
const CC_EMAIL = "tiako1998@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface EmailRequest {
  type: 'submission' | 'validated' | 'refused' | 'proposal' | 'admin_new';
  appointment: {
    id: string;
    name: string;
    email: string;
    country_code: string;
    phone_local: string;
    service_type: string;
    preferred_date: string;
    preferred_time: string;
    message?: string;
    proposed_date?: string;
    proposed_time?: string;
    proposal_token?: string;
  };
  siteUrl?: string;
}

const getEmailContent = (type: string, appointment: EmailRequest['appointment'], siteUrl?: string) => {
  const phone = `${appointment.country_code} ${appointment.phone_local}`;
  const proposalLink = siteUrl ? `${siteUrl}?token=${appointment.proposal_token}&action=respond` : '';
  
  switch (type) {
    case 'submission':
      return {
        subject: "Votre demande de rendez-vous a été reçue - MIMB Immigration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
              Demande de rendez-vous reçue
            </h1>
            <p>Bonjour <strong>${appointment.name}</strong>,</p>
            <p>Votre demande de rendez-vous a bien été reçue et est <strong>en attente de validation</strong>.</p>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Récapitulatif</h3>
              <p><strong>Service:</strong> ${appointment.service_type}</p>
              <p><strong>Date souhaitée:</strong> ${appointment.preferred_date}</p>
              <p><strong>Créneau:</strong> ${appointment.preferred_time}</p>
              ${appointment.message ? `<p><strong>Message:</strong> ${appointment.message}</p>` : ''}
            </div>
            <p>Nous vous contacterons sous 24h pour confirmer votre rendez-vous.</p>
            <p style="color: #666;">
              Cordialement,<br/>
              <strong>MIMB Immigration Consulting</strong>
            </p>
          </div>
        `,
      };
      
    case 'validated':
      return {
        subject: "✅ Votre rendez-vous est confirmé - MIMB Immigration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #22c55e; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
              Rendez-vous confirmé
            </h1>
            <p>Bonjour <strong>${appointment.name}</strong>,</p>
            <p>Nous avons le plaisir de vous confirmer votre rendez-vous !</p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
              <h3 style="margin-top: 0; color: #22c55e;">Détails du rendez-vous</h3>
              <p><strong>📅 Date:</strong> ${appointment.preferred_date}</p>
              <p><strong>🕐 Heure:</strong> ${appointment.preferred_time}</p>
              <p><strong>📋 Service:</strong> ${appointment.service_type}</p>
            </div>
            <p>Nous vous attendons avec les documents nécessaires pour votre consultation.</p>
            <p style="color: #666;">
              Cordialement,<br/>
              <strong>MIMB Immigration Consulting</strong>
            </p>
          </div>
        `,
      };
      
    case 'refused':
      return {
        subject: "Information sur votre demande de rendez-vous - MIMB Immigration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #ef4444; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">
              Demande de rendez-vous non confirmée
            </h1>
            <p>Bonjour <strong>${appointment.name}</strong>,</p>
            <p>Nous avons le regret de vous informer que votre demande de rendez-vous n'a pas pu être confirmée pour le créneau demandé.</p>
            <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
              <p><strong>Date demandée:</strong> ${appointment.preferred_date}</p>
              <p><strong>Créneau:</strong> ${appointment.preferred_time}</p>
            </div>
            <p>N'hésitez pas à soumettre une nouvelle demande avec un autre créneau qui vous convient.</p>
            <p style="color: #666;">
              Cordialement,<br/>
              <strong>MIMB Immigration Consulting</strong>
            </p>
          </div>
        `,
      };
      
    case 'proposal':
      return {
        subject: "📅 Nouvelle proposition de date - MIMB Immigration",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
              Nouvelle proposition de créneau
            </h1>
            <p>Bonjour <strong>${appointment.name}</strong>,</p>
            <p>Le créneau que vous aviez demandé n'est malheureusement pas disponible. Nous vous proposons une nouvelle date :</p>
            <div style="background: #fef3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>❌ Date initiale:</strong> ${appointment.preferred_date} à ${appointment.preferred_time}</p>
              <p><strong>✅ Nouvelle proposition:</strong> ${appointment.proposed_date} à ${appointment.proposed_time}</p>
            </div>
            <p>Pour accepter ou refuser cette proposition, veuillez répondre à cet email ou nous contacter directement.</p>
            <p style="color: #666;">
              Cordialement,<br/>
              <strong>MIMB Immigration Consulting</strong>
            </p>
          </div>
        `,
      };
      
    case 'admin_new':
      return {
        subject: `🆕 Nouveau RDV à valider - ${appointment.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #B8860B; border-bottom: 2px solid #B8860B; padding-bottom: 10px;">
              Nouveau rendez-vous à valider
            </h1>
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Informations client</h3>
              <p><strong>👤 Nom:</strong> ${appointment.name}</p>
              <p><strong>📧 Email:</strong> ${appointment.email}</p>
              <p><strong>📱 Téléphone:</strong> ${phone}</p>
              <p><strong>📋 Service:</strong> ${appointment.service_type}</p>
              <p><strong>📅 Date souhaitée:</strong> ${appointment.preferred_date}</p>
              <p><strong>🕐 Créneau:</strong> ${appointment.preferred_time}</p>
              ${appointment.message ? `<p><strong>💬 Message:</strong> ${appointment.message}</p>` : ''}
            </div>
            <p>
              <a href="${siteUrl}/admin" style="display: inline-block; background: #B8860B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
                Accéder au panel admin
              </a>
            </p>
          </div>
        `,
      };
      
    default:
      return { subject: '', html: '' };
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, appointment, siteUrl }: EmailRequest = await req.json();
    
    console.log(`Sending ${type} email for appointment:`, appointment.id);
    
    const emailContent = getEmailContent(type, appointment, siteUrl);
    
    if (!emailContent.subject) {
      throw new Error(`Invalid email type: ${type}`);
    }

    // Determine recipients
    let to: string[];
    let cc: string[] = [CC_EMAIL];
    
    if (type === 'admin_new') {
      to = [ADMIN_EMAIL];
    } else {
      to = [appointment.email];
    }

    const result = await resend.emails.send({
      from: "MIMB Immigration <support@mimbimmigration.com>",
      to,
      cc,
      subject: emailContent.subject,
      html: emailContent.html,
    });

    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
