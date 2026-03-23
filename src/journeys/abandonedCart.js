export const abandonedCart = {
  id: 'abandoned-cart',
  title: { en: 'Abandoned Cart Recovery', ur: 'ادھوری ٹوکری کی بحالی' },
  subtitle: { en: 'AI re-engages retailer who left cart incomplete on the app', ur: 'AI اس ریٹیلر سے دوبارہ رابطہ کرتا ہے جس نے ایپ پر ٹوکری ادھوری چھوڑی' },
  icon: '🛒',
  hasBranch: true,
  branchLabels: {
    whatsapp: { en: '✅ Complete on WhatsApp', ur: '✅ واٹس ایپ پر مکمل کریں' },
    app: { en: '📱 Open Sahulat App', ur: '📱 ساہولت ایپ کھولیں' },
  },

  // Common steps — lock screen through branch point
  steps: [
    {
      id: 1,
      type: 'lockscreen',
      sender: 'system',
      description: 'Retailer\'s phone is idle — cart was abandoned 30 min ago',
    },
    {
      id: 2,
      type: 'lock-notification',
      sender: 'system',
      description: 'Push notification arrives on lock screen',
    },
    {
      id: 3,
      type: 'unlock',
      sender: 'system',
      description: 'Retailer taps notification — WhatsApp opens',
    },
    {
      id: 4,
      type: 'typing',
      sender: 'bot',
      description: 'Oris composing recovery message',
    },
    {
      id: 5,
      type: 'message',
      sender: 'bot',
      description: 'Oris sends full abandoned cart recovery message',
      content: {
        en: "Hey! 👋 You left 3 items in your Sahulat cart worth PKR 10,080.\n\nComplete now and get FREE delivery! 🚚\n\n🛒 Your items:\n• Lay's Masala ×3\n• Pepsi Cola 1.5L ×2\n• Kurkure Chutney ×4",
        ur: 'ہیلو! 👋 آپ نے ساہولت ٹوکری میں PKR 10,080 کے 3 آئٹمز چھوڑ دیے۔\n\nابھی مکمل کریں اور مفت ڈیلیوری پائیں! 🚚\n\n🛒 آپ کے آئٹمز:\n• لیز مسالہ ×3\n• پیپسی کولا 1.5L ×2\n• کرکرے چٹنی ×4',
      },
    },
    {
      id: 6,
      type: 'message',
      sender: 'bot',
      description: 'Oris asks how the retailer wants to complete their order',
      content: {
        en: 'How would you like to complete your order?',
        ur: 'آپ اپنا آرڈر کیسے مکمل کرنا چاہیں گے؟',
      },
      hasButtons: true,
      buttons: {
        en: ['Complete on WhatsApp', 'Open Sahulat App'],
        ur: ['واٹس ایپ پر مکمل کریں', 'ساہولت ایپ کھولیں'],
      },
    },
    {
      id: 7,
      type: 'branch',
      sender: 'system',
      description: 'Choose completion path: WhatsApp or Sahulat App',
    },
  ],

  branches: {
    // ─────────────────────────────────────────────
    // Path A — Complete on WhatsApp
    // ─────────────────────────────────────────────
    whatsapp: [
      {
        id: 'wa-1',
        type: 'message',
        sender: 'user',
        description: 'Retailer chooses to complete on WhatsApp',
        content: { en: 'Complete on WhatsApp', ur: 'واٹس ایپ پر مکمل کریں' },
        isButton: true,
      },
      {
        id: 'wa-2',
        type: 'typing',
        sender: 'bot',
        description: 'Oris preparing cart summary',
      },
      {
        id: 'wa-3',
        type: 'message',
        sender: 'bot',
        description: 'Cart summary with free delivery offer',
        content: {
          en: "Great! Here's your cart:\n\n💰 Total: PKR 10,080\n🚚 Delivery: FREE (abandoned cart offer!)\n\nConfirm order?",
          ur: 'بہت اچھا! یہ ہے آپ کی ٹوکری:\n\n💰 کل: PKR 10,080\n🚚 ڈیلیوری: مفت (ادھوری ٹوکری آفر!)\n\nآرڈر تصدیق کریں؟',
        },
        hasButton: true,
        buttonText: { en: 'Confirm Order ✅', ur: 'آرڈر تصدیق کریں ✅' },
      },
      {
        id: 'wa-4',
        type: 'message',
        sender: 'user',
        description: 'Retailer confirms order',
        content: '✅',
        isButton: true,
      },
      {
        id: 'wa-5',
        type: 'message',
        sender: 'bot',
        description: 'Order confirmed — with free delivery & bonus points',
        content: {
          en: 'Order confirmed! 🎉 #PKR-7845\n\n🚚 Free delivery saved you PKR 150!\n📅 Delivery: Today 4-6 PM\n\n🎁 Bonus: +50 loyalty points for completing!',
          ur: 'آرڈر تصدیق ہو گیا! 🎉 #PKR-7845\n\n🚚 مفت ڈیلیوری نے PKR 150 بچائے!\n📅 ڈیلیوری: آج شام 4-6\n\n🎁 بونس: مکمل کرنے پر +50 لائلٹی پوائنٹس!',
        },
        isSuccess: true,
      },
    ],

    // ─────────────────────────────────────────────
    // Path B — Open Sahulat App
    // ─────────────────────────────────────────────
    app: [
      {
        id: 'app-1',
        type: 'message',
        sender: 'user',
        description: 'Retailer chooses to open Sahulat App',
        content: { en: 'Open Sahulat App', ur: 'ساہولت ایپ کھولیں' },
        isButton: true,
      },
      {
        id: 'app-2',
        type: 'transition',
        sender: 'system',
        description: 'Phone transitions to Sahulat App with pre-filled cart',
        content: {
          to: 'sahulat',
          cart: [
            { name: "Lay's Masala", qty: 3, price: 3600 },
            { name: 'Pepsi Cola 1.5L', qty: 2, price: 2880 },
            { name: 'Kurkure Chutney', qty: 4, price: 3600 },
          ],
          total: 10080,
          voucher: 'FREEDEL',
          loyaltyPoints: 2450,
          pendingPoints: 50,
        },
        message: {
          sender: 'bot',
          content: {
            en: 'Opening Sahulat App with your cart... 📱',
            ur: 'آپ کی ٹوکری کے ساتھ ساہولت ایپ کھل رہی ہے... 📱',
          },
        },
      },
      {
        id: 'app-3',
        type: 'ui-action',
        sender: 'system',
        description: 'Free delivery voucher applied automatically',
        content: {
          action: 'apply-voucher',
          discount: 150,
          showLuckyWheel: false,
        },
      },
      {
        id: 'app-4',
        type: 'ui-action',
        sender: 'system',
        description: '"Complete Order" button pulses',
        content: { action: 'highlight-cta' },
      },
      {
        id: 'app-5',
        type: 'ui-action',
        sender: 'system',
        description: 'Order completed in Sahulat App',
        content: {
          action: 'order-success',
          orderNumber: 'PKR-7845',
          delivery: 'Today, 4-6 PM',
          pointsEarned: 50,
          totalPoints: 2500,
        },
      },
    ],
  },
}
