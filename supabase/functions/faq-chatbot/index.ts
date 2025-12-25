import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Tu es l'assistant virtuel de MIMBIMMIGRATION CONSULTANCY INC., un cabinet de conseil en immigration canadienne dirigé par Mimb Franklin, consultant réglementé membre du CICC.

INFORMATIONS SUR LE CABINET:
- Nom: MIMBIMMIGRATION CONSULTANCY INC.
- Consultant: Mimb Franklin, Consultant CRIC réglementé
- Téléphone: (514) 462-7623
- Email: fmimb@yahoo.fr
- Localisation: Montréal, Québec, Canada
- Horaires: Lundi au Vendredi, 9h-17h EST
- Langues: Français et Anglais

SERVICES OFFERTS:
1. Résidence permanente (Entrée Express, travailleurs qualifiés, parrainage familial, programmes provinciaux)
2. Permis de travail (EIMT, mobilité francophone, transferts intra-entreprises)
3. Permis d'études (CAQ, permis d'études, PTPD)
4. Visas visiteurs (visa visiteur, super visa, prolongations)
5. Protection et asile

FAQ COURANTES:
- Délai résidence permanente: 6 mois (Entrée Express) à 12-24 mois (autres programmes)
- Offre d'emploi: Pas toujours nécessaire, dépend du programme
- Vérification statut: Registre public du CICC
- Services bilingues: Oui, français et anglais

INSTRUCTIONS:
- Réponds de manière professionnelle, concise et amicale
- Si on te demande des conseils juridiques spécifiques, recommande de prendre rendez-vous avec le consultant
- Guide les visiteurs vers le formulaire de rendez-vous pour des questions détaillées
- Réponds dans la langue de la question (français ou anglais)
- Maximum 3-4 phrases par réponse`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes. Veuillez réessayer dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporairement indisponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || "Désolé, je n'ai pas pu générer une réponse.";

    return new Response(JSON.stringify({ message: assistantMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});