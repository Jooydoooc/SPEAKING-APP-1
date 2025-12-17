module.exports = async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed. Use POST." });
    }

    // Parse body safely
    let body = req.body;
    if (!body) body = {};
    if (typeof body === "string") {
      try { body = JSON.parse(body); } catch { body = {}; }
    }

    const submission = {
      studentName: String(body.studentName || "").trim(),
      group: String(body.group || "").trim(),
      part: String(body.part || "").trim(),
      topic: String(body.topic || "").trim(),
      question: String(body.question || "").trim(),
      notes: String(body.notes || "").trim(),
      createdAt: new Date().toISOString()
    };

    if (!submission.studentName || !submission.part || !submission.question) {
      return res.status(400).json({
        ok: false,
        error: "Missing required fields: studentName, part, question"
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message =
      `🎙️ IELTS Speaking Submission\n` +
      `👤 Student: ${submission.studentName}\n` +
      (submission.group ? `👥 Group: ${submission.group}\n` : "") +
      `🧩 Part: ${submission.part}\n` +
      (submission.topic ? `🏷️ Topic: ${submission.topic}\n` : "") +
      `❓ Question:\n${submission.question}\n\n` +
      (submission.notes ? `📝 Notes:\n${submission.notes}\n\n` : "") +
      `🕒 Time: ${submission.createdAt}`;

    // Send to Telegram only if env vars exist
    if (token && chatId) {
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });

      const tgData = await tgRes.json();
      if (!tgRes.ok || !tgData.ok) {
        return res.status(500).json({
          ok: false,
          error: "Telegram send failed",
          telegram: tgData
        });
      }
    }

    return res.status(200).json({ ok: true, received: submission });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Server error",
      details: String(err?.message || err)
    });
  }
};
