// Reçoit une demande de réservation et l'envoie par e-mail au restaurant via Resend.
// Variables d'environnement : RESEND_API_KEY, RESERVATION_TO_EMAIL, RESERVATION_FROM_EMAIL (optionnelle).

type Reservation = {
  name: string;
  phone: string;
  guests: string;
  date: string;
  service: string;
  message?: string;
};

const clean = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const data: Reservation = {
    name: clean(body?.name, 100),
    phone: clean(body?.phone, 30),
    guests: clean(body?.guests, 10),
    date: clean(body?.date, 20),
    service: clean(body?.service, 40),
    message: clean(body?.message, 1000),
  };

  if (!data.name || !data.phone || !data.guests || !data.date || !data.service) {
    return Response.json({ error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.RESERVATION_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const rows = [
    ["Nom", data.name],
    ["Téléphone", data.phone],
    ["Couverts", data.guests],
    ["Date", data.date],
    ["Service", data.service],
    ["Message", data.message || "—"],
  ]
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESERVATION_FROM_EMAIL ?? "Rond de Carotte <onboarding@resend.dev>",
      to: [to],
      subject: `Réservation — ${data.name}, ${data.guests} pers., ${data.date} (${data.service})`,
      html: `<h2>Nouvelle demande de réservation</h2><table cellpadding="6">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
