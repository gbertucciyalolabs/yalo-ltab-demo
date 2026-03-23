export const endOfDaySummary = {
  id: 'end-of-day-summary',
  title: { en: 'End-of-Day Summary', ur: 'دن کے اختتام کا خلاصہ' },
  subtitle: { en: 'SalesMate wraps the day with AI performance insights & tomorrow preview', ur: 'SalesMate AI بصیرت اور کل کے پیش نظارہ کے ساتھ دن کا اختتام کرتا ہے' },
  icon: '🌅',
  isSeller: true,
  steps: [
    {
      id: 1,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate preparing end-of-day summary',
    },
    {
      id: 2,
      type: 'message',
      sender: 'bot',
      description: 'SalesMate greets rep at end of day',
      content: {
        en: "Great work today, Ahmed! 🌅\n\nYou've completed your route. Here's your **daily performance summary** powered by AI.",
        ur: 'آج بہت اچھا کام کیا، احمد! 🌅\n\nآپ نے اپنا روٹ مکمل کر لیا۔ یہ ہے آپ کی **روزانہ کارکردگی کا خلاصہ** AI کی مدد سے۔',
      },
    },
    {
      id: 3,
      type: 'rich-card',
      sender: 'bot',
      description: "Today's performance vs target",
      content: {
        header: { en: "📊 Today's Performance", ur: '📊 آج کی کارکردگی' },
        metrics: [
          { label: { en: 'Stores Visited', ur: 'وزٹ اسٹورز' }, value: '8/8', change: { en: '100% ✅', ur: '100% ✅' }, positive: true },
          { label: { en: 'Revenue', ur: 'آمدنی' }, value: 'PKR 47,850', change: { en: '+6% vs target', ur: 'ہدف سے +6%' }, positive: true },
          { label: { en: 'Orders Placed', ur: 'آرڈرز' }, value: '16', change: { en: '+2 bonus orders', ur: '+2 بونس آرڈرز' }, positive: true },
          { label: { en: 'Compliance Avg', ur: 'کمپلائنس اوسط' }, value: '86%', progress: 86, positive: true },
        ],
        tip: {
          en: '🎉 You hit your revenue target! Bonus: +PKR 2,000 incentive added to your account.',
          ur: '🎉 آپ نے اپنا آمدنی ہدف پورا کیا! بونس: +PKR 2,000 انسینٹو آپ کے اکاؤنٹ میں شامل ہو گئی۔',
        },
      },
    },
    {
      id: 4,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate compiling weekly trend',
    },
    {
      id: 5,
      type: 'rich-card',
      sender: 'bot',
      description: "Weekly performance trend",
      content: {
        header: { en: "📈 This Week's Trend", ur: '📈 اس ہفتے کا رجحان' },
        metrics: [
          { label: { en: 'Monday', ur: 'پیر' }, value: 'PKR 41,200', progress: 82, positive: true },
          { label: { en: 'Tuesday', ur: 'منگل' }, value: 'PKR 44,800', progress: 90, positive: true },
          { label: { en: 'Wednesday', ur: 'بدھ' }, value: 'PKR 39,600', progress: 79, positive: false },
          { label: { en: 'Thursday', ur: 'جمعرات' }, value: 'PKR 47,850', progress: 96, positive: true },
        ],
        tip: {
          en: '📊 Week avg: PKR 43,363 — +8% above your monthly average. Keep it up! 🚀',
          ur: '📊 ہفتہ اوسط: PKR 43,363 — آپ کے ماہانہ اوسط سے +8% اوپر۔ ایسے ہی چلتے رہیں! 🚀',
        },
      },
    },
    {
      id: 6,
      type: 'typing',
      sender: 'bot',
      description: "SalesMate preparing tomorrow's preview",
    },
    {
      id: 7,
      type: 'message',
      sender: 'bot',
      description: "Tomorrow's preview and targets",
      content: {
        en: "Tomorrow's preview 👀:\n\n📅 **Friday, March 24**\n🎯 Target: PKR 48,000 (Fri premium)\n🗺️ 9 stores — DHA & Johar Town\n\n⭐ **Opportunities:**\n• 2 high-value accounts due for reorder\n• Friday promo: +15 pts/carton all SKUs\n\nSee you at 8 AM! 👋",
        ur: 'کل کا پیش نظارہ 👀:\n\n📅 **جمعہ، 24 مارچ**\n🎯 ہدف: PKR 48,000 (جمعہ پریمیم)\n🗺️ 9 اسٹورز — DHA اور جوہر ٹاؤن\n\n⭐ **مواقع:**\n• 2 ہائی ویلیو اکاؤنٹس آج دوبارہ آرڈر کے لیے بقایا\n• جمعہ پرومو: تمام SKUs پر +15 پوائنٹس/کارٹن\n\nصبح 8 بجے ملتے ہیں! 👋',
      },
      hasButton: true,
      buttonText: { en: 'Log out ✅', ur: 'لاگ آؤٹ ✅' },
    },
    {
      id: 8,
      type: 'message',
      sender: 'user',
      description: 'Rep logs out for the day',
      content: { en: 'Log out ✅', ur: 'لاگ آؤٹ ✅' },
      isButton: true,
    },
    {
      id: 9,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate sending closing message',
    },
    {
      id: 10,
      type: 'message',
      sender: 'bot',
      description: 'Motivational closing message',
      content: {
        en: "Logged out successfully. 🌙\n\nExcellent field work today, Ahmed! You're ranked **#1 in your region** this week. 🏆\n\nRest well — see you tomorrow! 💪",
        ur: 'کامیابی سے لاگ آؤٹ ہو گئے۔ 🌙\n\nآج کا فیلڈ ورک بہترین تھا، احمد! آپ اس ہفتے **اپنے علاقے میں #1** پر ہیں۔ 🏆\n\nآرام کریں — کل ملتے ہیں! 💪',
      },
      isSuccess: true,
    },
  ],
}
