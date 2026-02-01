import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

type CreateAppointmentBody = {
  appointment: {
    name: string;
    email: string;
    country_code?: string;
    phone_local?: string;
    service_type: string;
    preferred_date: string;
    preferred_time: string;
    message?: string;
  };
  siteUrl?: string;
};

const getEnv = (key: string) => {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
};

serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const { appointment, siteUrl }: CreateAppointmentBody = await req.json();

    if (!appointment?.name || !appointment?.email || !appointment?.service_type || !appointment?.preferred_date || !appointment?.preferred_time) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const supabase = createClient(
      getEnv("SUPABASE_URL"),
      getEnv("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: { persistSession: false },
      }
    );

    const countryCode = appointment.country_code || "+1";
    const phoneLocal = appointment.phone_local || "";

    console.log("[create-appointment] inserting appointment", {
      name: appointment.name,
      email: appointment.email,
      service_type: appointment.service_type,
      preferred_date: appointment.preferred_date,
      preferred_time: appointment.preferred_time,
    });

    const { data, error } = await supabase
      .from("appointments")
      .insert({
        name: appointment.name,
        email: appointment.email,
        phone: `${countryCode} ${phoneLocal}`.trim(),
        country_code: countryCode,
        phone_local: phoneLocal,
        service_type: appointment.service_type,
        preferred_date: appointment.preferred_date,
        preferred_time: appointment.preferred_time,
        message: appointment.message,
        status: "pending",
        status_enum: "EN_ATTENTE",
      })
      .select()
      .single();

    if (error) {
      console.error("[create-appointment] insert error", error);
      return new Response(JSON.stringify({ error: error.message, code: error.code }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Send emails (client confirmation + admin notification)
    const invokeEmail = async (type: "submission" | "admin_new") => {
      const res = await supabase.functions.invoke("send-appointment-email", {
        body: {
          type,
          appointment: {
            id: data.id,
            name: data.name,
            email: data.email,
            country_code: data.country_code || "+1",
            phone_local: data.phone_local || data.phone || "",
            service_type: data.service_type,
            preferred_date: data.preferred_date,
            preferred_time: data.preferred_time,
            message: data.message,
            proposed_date: data.proposed_date,
            proposed_time: data.proposed_time,
            proposal_token: data.proposal_token,
          },
          siteUrl,
        },
      });

      if (res.error) {
        console.error(`[create-appointment] email error (${type})`, res.error);
      }
    };

    await Promise.all([invokeEmail("submission"), invokeEmail("admin_new")]);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    console.error("[create-appointment] unexpected error", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});
