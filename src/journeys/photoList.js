export const photoList = {
  id: 'photo-list',
  title: { en: 'Photo List Ordering', ur: 'فوٹو لسٹ آرڈرنگ' },
  subtitle: { en: 'Retailer sends handwritten list — AI reads & matches products', ur: 'ریٹیلر ہاتھ سے لکھی فہرست بھیجتا ہے — AI پڑھ کر پروڈکٹس ملاتا ہے' },
  icon: '📸',
  steps: [
    {
      id: 1,
      type: 'message',
      sender: 'bot',
      description: 'Oris prompts for photo',
      content: {
        en: 'Hi! 👋\n\nSend me a photo of your shopping list and I\'ll process it instantly 📸\n\nHandwritten lists, typed notes — anything works!',
        ur: 'ہیلو! 👋\n\nاپنی خریداری کی فہرست کی تصویر بھیجیں اور میں فوری پروسیس کروں گا 📸\n\nہاتھ سے لکھی یا ٹائپ کی فہرستیں — سب قابل قبول ہیں!',
      },
    },
    {
      id: 2,
      type: 'photo',
      sender: 'user',
      description: 'Retailer sends handwritten shopping list',
      content: {
        items: [
          "Lay's Masala × 10",
          'Kurkure × 5',
          'Mountain Dew 500ml × 8',
          '7UP 1.5L × 3',
        ],
      },
    },
    {
      id: 3,
      type: 'typing',
      sender: 'bot',
      description: 'Oris reading and analyzing the photo',
      content: null,
    },
    {
      id: 4,
      type: 'message',
      sender: 'bot',
      description: 'Oris matches products from the list',
      content: {
        en: '📋 I\'ve read your list! Here\'s what I matched:\n\n1. Lay\'s Masala 🌶️ × 10 — PKR 12,000\n2. Kurkure Chutney × 5 — PKR 4,500\n3. Mountain Dew 500ml × 8 — PKR 11,520\n4. 7UP 1.5L × 3 — PKR 3,600\n\n💰 Subtotal: PKR 31,620',
        ur: '📋 میں نے آپ کی فہرست پڑھ لی! یہ ہے جو میں نے ملایا:\n\n1. لیز مسالہ 🌶️ × 10 — PKR 12,000\n2. کرکرے چٹنی × 5 — PKR 4,500\n3. ماؤنٹین ڈیو 500ml × 8 — PKR 11,520\n4. 7UP 1.5L × 3 — PKR 3,600\n\n💰 ذیلی کل: PKR 31,620',
      },
    },
    {
      id: 5,
      type: 'message',
      sender: 'bot',
      description: 'Oris offers upsell with promo',
      content: {
        en: '🎉 Special offer!\n\nBuy 2+ packs of Aquafina and get 1 FREE. 💧\n\nWant to add some to your order?',
        ur: '🎉 خصوصی آفر!\n\n2 یا زیادہ پیک ایکوافینا خریدیں اور 1 مفت پائیں۔ 💧\n\nکیا آپ اپنے آرڈر میں شامل کرنا چاہیں گے؟',
      },
    },
    {
      id: 6,
      type: 'message',
      sender: 'user',
      description: 'Retailer says yes to Aquafina',
      content: { en: 'Yes, 3 packs of Aquafina', ur: 'ہاں 3 پیک ایکوافینا' },
      isUrdu: false,
    },
    {
      id: 7,
      type: 'typing',
      sender: 'bot',
      description: 'Oris adding items',
      content: null,
    },
    {
      id: 8,
      type: 'message',
      sender: 'bot',
      description: 'Updated cart with Aquafina + promo',
      content: {
        en: 'Added! ✅\n\n3× Aquafina 1.5L — PKR 1,080\n🎁 1× Aquafina FREE (saved PKR 360!)\n\n💰 New Total: PKR 32,700',
        ur: 'شامل کر دیا! ✅\n\n3× ایکوافینا 1.5L — PKR 1,080\n🎁 1× ایکوافینا مفت (PKR 360 کی بچت!)\n\n💰 نیا کل: PKR 32,700',
      },
      hasButton: true,
      buttonText: { en: 'Place Order ✓', ur: 'آرڈر دیں ✓' },
    },
    {
      id: 9,
      type: 'message',
      sender: 'bot',
      description: 'Order placed confirmation',
      content: {
        en: 'Order placed! 🎉 #PKR-7843\n\n📅 Delivery: Tomorrow 2-4 PM\n💪 You saved PKR 360 with today\'s promo!\n\n⭐ +317 loyalty points earned!',
        ur: 'آرڈر دے دیا گیا! 🎉 #PKR-7843\n\n📅 ڈیلیوری: کل دوپہر 2-4\n💪 آج کے پرومو سے آپ نے PKR 360 بچائے!\n\n⭐ +317 لائلٹی پوائنٹس کمائے!',
      },
      isSuccess: true,
    },
  ],
}
