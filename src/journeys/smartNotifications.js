export const smartNotifications = {
  id: 'smart-notifications',
  title: { en: 'Smart Notifications', ur: 'سمارٹ نوٹیفیکیشنز' },
  subtitle: { en: 'AI-powered proactive outreach — delivery, restock, promos & more', ur: 'AI سے چلنے والا فعال رابطہ — ڈیلیوری، ری اسٹاک، پرومو اور مزید' },
  icon: '🔔',
  steps: [
    {
      id: 1,
      type: 'message',
      sender: 'bot',
      description: 'Delivery status update with tracking',
      content: {
        en: '🚛 Order #PKR-7842 update:\n\n✅ Packed and dispatched!\n📍 Current: LTAB Distribution Hub, Lahore\n🕐 ETA: Today 2:00 - 4:00 PM',
        ur: '🚛 آرڈر #PKR-7842 اپڈیٹ:\n\n✅ پیک اور روانہ ہو گیا!\n📍 موجودہ مقام: LTAB ڈسٹریبیوشن ہب، لاہور\n🕐 متوقع وقت: آج دوپہر 2:00 - 4:00',
      },
      hasButton: true,
      buttonText: { en: 'Track Delivery 📍', ur: 'ڈیلیوری ٹریک کریں 📍' },
      cardType: 'delivery',
    },
    {
      id: 2,
      type: 'message',
      sender: 'bot',
      description: 'AI restock suggestion based on ordering pattern',
      content: {
        en: "📊 Smart Restock Alert!\n\nBased on your history, you reorder Lay's Classic every 14 days.\nIt's been 13 days since your last order. ⏰\n\n🔄 Your usual order:\n• Lay's Classic ×5\n• Pepsi Cola 1.5L ×3\n\nShall I place this order?",
        ur: '📊 سمارٹ ری اسٹاک الرٹ!\n\nآپ کی تاریخ کے مطابق، آپ ہر 14 دن بعد لیز کلاسک دوبارہ آرڈر کرتے ہیں۔\nآپ کے آخری آرڈر کو 13 دن ہو گئے ہیں۔ ⏰\n\n🔄 آپ کا معمول کا آرڈر:\n• لیز کلاسک ×5\n• پیپسی کولا 1.5L ×3\n\nکیا میں یہ آرڈر دے دوں؟',
      },
      hasButtons: true,
      buttons: {
        en: ['Yes, reorder 🛒', 'Modify first ✏️'],
        ur: ['ہاں، دوبارہ آرڈر 🛒', 'پہلے ترمیم کریں ✏️'],
      },
      cardType: 'restock',
    },
    {
      id: 3,
      type: 'rich-card',
      sender: 'bot',
      description: 'Weekly store performance card',
      content: {
        header: { en: '📈 Weekly Store Performance', ur: '📈 ہفتہ وار اسٹور کارکردگی' },
        metrics: [
          { label: { en: 'Orders', ur: 'آرڈرز' }, value: '12', change: '+20% vs last week', positive: true },
          { label: { en: 'Revenue', ur: 'آمدنی' }, value: 'PKR 45,000', change: '+15%', positive: true },
          { label: { en: 'Top Seller', ur: 'سب سے زیادہ فروخت' }, value: { en: "Lay's Masala 🌶️", ur: 'لیز مسالہ 🌶️' }, change: null, positive: null },
          { label: { en: 'Trending', ur: 'ٹرینڈنگ' }, value: { en: 'Pepsi Cola ↗️', ur: 'پیپسی کولا ↗️' }, change: { en: 'in your area', ur: 'آپ کے علاقے میں' }, positive: true },
        ],
        tip: {
          en: '💡 Tip: Consider stocking up on Mountain Dew ahead of the summer season',
          ur: '💡 ٹپ: گرمیوں کے موسم سے پہلے ماؤنٹین ڈیو کا ذخیرہ بڑھانے پر غور کریں',
        },
      },
    },
    {
      id: 4,
      type: 'message',
      sender: 'bot',
      description: 'Festival promo — double loyalty points on beverages',
      content: {
        en: '🎊 SUMMER SPECIAL!\n\nDouble loyalty points on ALL beverages this week! 🥤\n\n⭐ Pepsi Cola 1.5L — 144 pts (normally 72)\n⭐ 7UP 1.5L — 120 pts (normally 60)\n⭐ Mountain Dew 500ml — 144 pts (normally 72)\n\nValid until Friday.',
        ur: '🎊 گرمیوں کی خصوصی پیشکش!\n\nاس ہفتے تمام مشروبات پر دوگنے لائلٹی پوائنٹس! 🥤\n\n⭐ پیپسی کولا 1.5L — 144 پوائنٹس (عام طور پر 72)\n⭐ 7UP 1.5L — 120 پوائنٹس (عام طور پر 60)\n⭐ ماؤنٹین ڈیو 500ml — 144 پوائنٹس (عام طور پر 72)\n\nجمعہ تک درست ہے۔',
      },
      hasButton: true,
      buttonText: { en: 'View All Promos 🎁', ur: 'تمام پرومو دیکھیں 🎁' },
      cardType: 'promo',
    },
    {
      id: 5,
      type: 'message',
      sender: 'bot',
      description: 'Payment due reminder with payment options',
      content: {
        en: '💳 Payment Reminder\n\nYour invoice #INV-2847 of PKR 23,500 is due in 3 days.',
        ur: '💳 ادائیگی یاددہانی\n\nآپ کا انوائس #INV-2847 جس کی رقم PKR 23,500 ہے، 3 دن میں واجب الادا ہے۔',
      },
      hasButtons: true,
      buttons: {
        en: ['Pay via JazzCash', 'Pay via EasyPaisa', 'Request Extension'],
        ur: ['جاز کیش سے ادا کریں', 'ایزی پیسہ سے ادا کریں', 'توسیع کی درخواست'],
      },
      cardType: 'payment',
    },
    {
      id: 6,
      type: 'nps',
      sender: 'bot',
      description: 'Post-delivery NPS survey',
      content: {
        en: 'How was your last delivery experience? Rate 1-5 ⭐',
        ur: 'آپ کی آخری ڈیلیوری کا تجربہ کیسا تھا؟ 1-5 ⭐ ریٹ کریں',
      },
      cardType: 'survey',
    },
  ],
}
