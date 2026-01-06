export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { brand, site, tg, category, volume } = req.body;
  
  // Твои данные из BotFather и userinfobot
  const BOT_TOKEN = '8205126675:AAHBlxRa4vkE6eE6B59lr86fCbCiLBo5rf4';
  const CHAT_ID = '301441718';

  const text = `
🚀 **Новая заявка на Бета-тест THYSS**
━━━━━━━━━━━━━━━━━━
🏢 **Бренд:** ${brand}
🌐 **Сайт/Соцсети:** ${site}
👤 **Контакт:** ${tg}
🏷 **Категория:** ${category}
📊 **Оборот:** ${volume}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      throw new Error('TG API Error');
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}