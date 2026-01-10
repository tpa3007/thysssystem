export default async function handler(req, res) {
  // Разрешаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Извлекаем данные, которые приходят из твоего App.jsx (formData)
  const { brand, site, tg, name, volume } = req.body;
  
  // ТОКЕН и ID (вставь свои данные)
  const BOT_TOKEN = '8205126675:AAHBlxRa4vkE6eE6B59lr86fCbCiLBo5rf4';
  const CHAT_ID = '301441718';

  // Форматируем сообщение для Telegram (Markdown)
  const text = `
🚀 *Новая заявка: Бета-тест THYSS*
━━━━━━━━━━━━━━━━━━
👤 *Имя:* ${name || 'Не указано'}
🏢 *Бренд:* ${brand || 'Не указано'}
🌐 *Сайт:* ${site || 'Не указано'}
📱 *Telegram:* ${tg || 'Не указано'}
📊 *Оборот:* ${volume || 'Не выбран'}
━━━━━━━━━━━━━━━━━━
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

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true });
    } else {
      console.error('TG Error:', data);
      return res.status(500).json({ success: false, error: data.description });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }

}
