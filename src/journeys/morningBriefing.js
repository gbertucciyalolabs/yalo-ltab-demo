export const morningBriefing = {
  id: 'morning-briefing',
  title: { en: 'Morning Briefing', ur: 'صبح کی بریفنگ' },
  subtitle: { en: 'SalesMate AI primes the rep with route intelligence & daily targets', ur: 'SalesMate AI نمائندے کو روٹ انٹیلیجنس اور روزانہ اہداف سے آگاہ کرتا ہے' },
  icon: '☀️',
  isSeller: true,
  steps: [
    {
      id: 1,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate composing morning briefing',
    },
    {
      id: 2,
      type: 'message',
      sender: 'bot',
      description: 'SalesMate greets rep with daily summary',
      content: {
        en: "Good morning, Ahmed! ☀️\n\nHere's your briefing for **Monday, March 23**.\n\n📋 Today: 8 store visits\n🎯 Target: PKR 45,000 revenue\n📍 Area: Gulberg & Model Town, Lahore",
        ur: 'خیر صبح، احمد! ☀️\n\nپیر، 23 مارچ کی بریفنگ:\n\n📋 آج: 8 اسٹور وزٹ\n🎯 ہدف: PKR 45,000 آمدنی\n📍 علاقہ: گلبرگ اور ماڈل ٹاؤن، لاہور',
      },
    },
    {
      id: 3,
      type: 'rich-card',
      sender: 'bot',
      description: "Yesterday's performance vs today's targets",
      content: {
        header: { en: '📊 Yesterday vs Today', ur: '📊 کل بنام آج' },
        metrics: [
          { label: { en: 'Visits Done', ur: 'وزٹ مکمل' }, value: '7/8', change: { en: '88% hit rate', ur: '88% کامیابی' }, positive: true },
          { label: { en: 'Revenue', ur: 'آمدنی' }, value: 'PKR 41,200', change: { en: '91% of target', ur: 'ہدف کا 91%' }, positive: true },
          { label: { en: 'Orders', ur: 'آرڈرز' }, value: '14', change: { en: '+3 vs avg', ur: 'اوسط سے +3' }, positive: true },
          { label: { en: "Today's Goal", ur: 'آج کا ہدف' }, value: 'PKR 45,000', change: { en: '⭐ Bonus at PKR 50k', ur: '⭐ PKR 50k پر بونس' }, positive: true },
        ],
        tip: {
          en: "💡 You're 2nd in your team! Push 3 more orders today to reach #1",
          ur: '💡 آپ اپنی ٹیم میں دوسرے نمبر پر ہیں! #1 تک پہنچنے کے لیے 3 مزید آرڈر کریں',
        },
      },
    },
    {
      id: 4,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate compiling priority store list',
    },
    {
      id: 5,
      type: 'message',
      sender: 'bot',
      description: "Priority stores with AI-ranked route",
      content: {
        en: "🗺️ **Today's Priority Stores** (AI-ranked):\n\n1️⃣ Al-Farooq General — Gulberg III\n   ⚠️ Out-of-stock risk: Pepsi 1.5L\n2️⃣ Ahmed Traders — MM Alam Rd\n   💰 High-value reorder due today\n3️⃣ Raza Stores — Model Town\n   📦 New SKU listing opportunity\n\n⏱️ Best visit window: 9–11 AM",
        ur: '🗺️ **آج کے ترجیحی اسٹور** (AI ترتیب):\n\n1️⃣ الفاروق جنرل — گلبرگ III\n   ⚠️ پیپسی 1.5L اسٹاک ختم ہونے کا خطرہ\n2️⃣ احمد ٹریڈرز — ایم ایم عالم روڈ\n   💰 آج بڑا ری آرڈر واجب الادا\n3️⃣ رضا اسٹورز — ماڈل ٹاؤن\n   📦 نئی SKU لسٹنگ کا موقع\n\n⏱️ بہترین وزٹ وقت: صبح 9–11',
      },
      hasButton: true,
      buttonText: { en: 'Start Route 🗺️', ur: 'روٹ شروع کریں 🗺️' },
    },
    {
      id: 6,
      type: 'message',
      sender: 'user',
      description: 'Rep confirms and starts route',
      content: { en: 'Start Route 🗺️', ur: 'روٹ شروع کریں 🗺️' },
      isButton: true,
    },
    {
      id: 7,
      type: 'typing',
      sender: 'bot',
      description: 'SalesMate activating navigation',
    },
    {
      id: 8,
      type: 'message',
      sender: 'bot',
      description: 'Route activated with first stop details',
      content: {
        en: "Route activated! 📍\n\n🏪 First stop: **Al-Farooq General Store**\n📏 Distance: 2.3 km — 8 min drive\n\nTip: Prioritize Pepsi 1.5L stock check on arrival. They typically order 4–6 cartons. 💪",
        ur: 'روٹ چالو! 📍\n\n🏪 پہلا اسٹور: **الفاروق جنرل اسٹور**\n📏 فاصلہ: 2.3 کلومیٹر — 8 منٹ ڈرائیو\n\nٹپ: پہنچنے پر Pepsi 1.5L اسٹاک چیک کو ترجیح دیں۔ وہ عام طور پر 4–6 کارٹن آرڈر کرتے ہیں۔ 💪',
      },
    },
  ],
}
