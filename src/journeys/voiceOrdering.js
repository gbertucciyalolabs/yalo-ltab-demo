export const voiceOrdering = {
  id: 'voice-ordering',
  title: { en: 'Voice Message Ordering', ur: 'وائس میسج آرڈرنگ' },
  subtitle: { en: 'Retailer orders via voice note — Oris transcribes & confirms', ur: 'ریٹیلر وائس نوٹ سے آرڈر دیتا ہے — اوریس ٹرانسکرائب اور تصدیق کرتا ہے' },
  icon: '🎤',
  steps: [
    {
      id: 1,
      type: 'message',
      sender: 'bot',
      description: 'Oris welcome message',
      content: {
        en: 'Welcome to LTAB PepsiCo! 👋\n\nI\'m Oris, your AI ordering assistant.\n\nSend me a message, voice note, or photo to get started!',
        ur: 'LTAB PepsiCo میں خوش آمدید! 👋\n\nمیں اوریس ہوں، آپ کا AI آرڈرنگ اسسٹنٹ۔\n\nشروع کرنے کے لیے مجھے پیغام، وائس نوٹ، یا تصویر بھیجیں!',
      },
    },
    {
      id: 2,
      type: 'typing',
      sender: 'user',
      description: 'Retailer is composing message',
      content: null,
    },
    {
      id: 3,
      type: 'voice',
      sender: 'user',
      description: 'Retailer sends voice note with order',
      content: {
        duration: '0:11',
        caption: {
          en: "5× Lay's Classic, 3× Pepsi 1.5L, 2× Aquafina",
          ur: 'مجھے 5 کارٹن لیز کلاسک، 3 کارٹن پیپسی 1.5 لیٹر، اور 2 پیک آکوافینا چاہیے',
        },
      },
    },
    {
      id: 4,
      type: 'typing',
      sender: 'bot',
      description: 'Oris processing voice message',
      content: null,
    },
    {
      id: 5,
      type: 'message',
      sender: 'bot',
      description: 'Oris transcribes & summarizes order',
      content: {
        en: '🎤 I heard your order:\n\n📦 5× Lay\'s Classic — PKR 6,000\n📦 3× Pepsi Cola 1.5L — PKR 4,320\n📦 2× Aquafina 1.5L (6-pack) — PKR 720\n\n💰 Total: PKR 11,040\n\nShall I confirm this order?',
        ur: '🎤 میں نے آپ کا آرڈر سنا:\n\n📦 5× لیز کلاسک — PKR 6,000\n📦 3× پیپسی کولا 1.5L — PKR 4,320\n📦 2× ایکوافینا 1.5L (6-پیک) — PKR 720\n\n💰 کل: PKR 11,040\n\nکیا میں یہ آرڈر تصدیق کروں؟',
      },
    },
    {
      id: 6,
      type: 'message',
      sender: 'user',
      description: 'Retailer confirms',
      content: '✅',
    },
    {
      id: 7,
      type: 'typing',
      sender: 'bot',
      description: 'Oris processing confirmation',
      content: null,
    },
    {
      id: 8,
      type: 'message',
      sender: 'bot',
      description: 'Order confirmed with details',
      content: {
        en: 'Order confirmed! 🎉\n\n🧾 Order #PKR-7842\n📅 Delivery: Tomorrow, 10 AM - 12 PM\n🚛 Via: LTAB Distributor Hub Lahore\n\nThank you! I\'ll notify you when it ships. 📱',
        ur: 'آرڈر تصدیق ہو گیا! 🎉\n\n🧾 آرڈر #PKR-7842\n📅 ڈیلیوری: کل، صبح 10 - دوپہر 12\n🚛 بذریعہ: LTAB ڈسٹریبیوٹر ہب لاہور\n\nشکریہ! جب شپ ہو جائے گا تو میں آپ کو مطلع کروں گا۔ 📱',
      },
      isSuccess: true,
    },
  ],
}
