export async function groqSuggest(texto) {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions"; 
  const API_KEY = "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";
  const body = {
    model: "llama-3.1-8b-instant", 
    messages: [
      { role: "system", content: "Eres un asistente que sugiere mejoras a eventos priorizados." },
      { role: "user", content: `Dame recomendaciones breves para optimizar este evento: ${texto}` },
    ],
    temperature: 0.2,
  };

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Error al consultar Groq");
  const data = await res.json();
  const choice = data?.choices?.[0]?.message?.content || "";
  return choice;
}
