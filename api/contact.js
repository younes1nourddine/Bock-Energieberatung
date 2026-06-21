export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { interesse, vorname, nachname, email, telefon, nachricht } = req.body || {};

  if (!interesse || !vorname || !nachname || !email) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'E-Mail-Versand ist nicht konfiguriert' });
  }

  const interesseLabels = {
    sanierungsfahrplan: 'Sanierungsfahrplan (iSFP)',
    energieausweis: 'Energieausweis',
    foerderberatung: 'Fördermittelberatung (BAFA / KfW)',
    sanierung: 'Energetische Sanierung / Baubegleitung',
    sonstiges: 'Allgemeine Frage',
  };

  const html = `
    <h2>Neue Kontaktanfrage über energieberatung-bock.de</h2>
    <p><strong>Interesse:</strong> ${interesseLabels[interesse] || interesse}</p>
    <p><strong>Name:</strong> ${vorname} ${nachname}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Telefon:</strong> ${telefon || '–'}</p>
    <p><strong>Nachricht:</strong><br>${(nachricht || '–').replace(/\n/g, '<br>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Energieberatung Bock Kontaktformular <onboarding@resend.dev>',
        to: ['younes1nourddine@gmail.com'],
        reply_to: email,
        subject: `Neue Anfrage: ${interesseLabels[interesse] || interesse} – ${vorname} ${nachname}`,
        html,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Resend error:', errText);
      return res.status(502).json({ error: 'E-Mail konnte nicht gesendet werden' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Serverfehler' });
  }
}
