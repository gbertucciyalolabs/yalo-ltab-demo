export const abandonedCart = {
  id: 'abandoned-cart',
  title: { en: 'Abandoned Cart Recovery', ur: 'ادھوری ٹوکری کی بحالی' },
  subtitle: { en: 'AI re-engages retailer who left cart incomplete on the app', ur: 'AI اس ریٹیلر سے دوبارہ رابطہ کرتا ہے جس نے ایپ پر ٹوکری ادھوری چھوڑی' },
  icon: '🛒',
  steps: [
    {
      id: 1,
      type: 'sahulat-browse',
      sender: 'system',
      description: 'Retailer browses Sahulat App product grid',
      content: {
        view: 'browse',
      },
    },
    {
      id: 2,
      type: 'sahulat-add',
      sender: 'system',
      description: 'Retailer adds 3 items to cart',
      content: {
        cart: [
          { name: "Lay's Masala", qty: 3, price: 3600 },
          { name: 'Pepsi Cola 1.5L', qty: 2, price: 2880 },
          { name: 'Kurkure Chutney', qty: 4, price: 3600 },
        ],
        total: 10080,
        itemCount: 3,
      },
    },
    {
      id: 3,
      type: 'sahulat-abandon',
      sender: 'system',
      description: 'Retailer stops — cart left incomplete',
      content: {
        action: 'abandon',
      },
    },
    {
      id: 4,
      type: 'time-skip',
      sender: 'system',
      description: '30 minutes pass — AI detects abandoned cart',
      content: {
        label: '⏰ 30 minutes later...',
      },
    },
    {
      id: 5,
      type: 'notification',
      sender: 'system',
      description: 'Push notification from WhatsApp',
      content: {
        title: 'LTAB PepsiCo 🤖',
        message: {
          en: "Don't forget your cart! 🛒 You have items waiting.",
          ur: 'اپنی ٹوکری نہ بھولیں! 🛒 آپ کے آئٹمز انتظار کر رہے ہیں۔',
        },
      },
    },
    {
      id: 6,
      type: 'transition',
      sender: 'system',
      description: 'Switch to WhatsApp — Oris recovery message',
      content: { to: 'whatsapp' },
      message: {
        sender: 'bot',
        content: {
          en: "Hey! 👋 You left 3 items in your Sahulat cart worth PKR 10,080.\n\nComplete now and get FREE delivery! 🚚\n\n🛒 Your items:\n• Lay's Masala ×3\n• Pepsi Cola 1.5L ×2\n• Kurkure Chutney ×4",
          ur: 'ہیلو! 👋 آپ نے ساہولت ٹوکری میں PKR 10,080 کے 3 آئٹمز چھوڑ دیے۔\n\nابھی مکمل کریں اور مفت ڈیلیوری پائیں! 🚚\n\n🛒 آپ کے آئٹمز:\n• لیز مسالہ ×3\n• پیپسی کولا 1.5L ×2\n• کرکرے چٹنی ×4',
        },
      },
    },
    {
      id: 7,
      type: 'message',
      sender: 'bot',
      description: 'Oris offers two completion options',
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
      id: 8,
      type: 'message',
      sender: 'user',
      description: 'Retailer chooses WhatsApp',
      content: { en: 'Complete on WhatsApp', ur: 'واٹس ایپ پر مکمل کریں' },
      isButton: true,
    },
    {
      id: 9,
      type: 'message',
      sender: 'bot',
      description: 'Oris shows cart with free delivery offer',
      content: {
        en: "Great! Here's your cart:\n\n💰 Total: PKR 10,080\n🚚 Delivery: FREE (abandoned cart offer!)\n\nConfirm order?",
        ur: 'بہت اچھا! یہ ہے آپ کی ٹوکری:\n\n💰 کل: PKR 10,080\n🚚 ڈیلیوری: مفت (ادھوری ٹوکری آفر!)\n\nآرڈر تصدیق کریں؟',
      },
      hasButton: true,
      buttonText: { en: 'Confirm Order ✅', ur: 'آرڈر تصدیق کریں ✅' },
    },
    {
      id: 10,
      type: 'message',
      sender: 'user',
      description: 'Retailer confirms',
      content: '✅',
      then: {
        type: 'message',
        sender: 'bot',
        content: {
          en: 'Order confirmed! 🎉 #PKR-7845\n\n🚚 Your free delivery saved you PKR 150!\n📅 Delivery: Today 4-6 PM\n\n🎁 Bonus: +50 loyalty points for completing!',
          ur: 'آرڈر تصدیق ہو گیا! 🎉 #PKR-7845\n\n🚚 آپ کی مفت ڈیلیوری نے PKR 150 بچائے!\n📅 ڈیلیوری: آج شام 4-6\n\n🎁 بونس: مکمل کرنے پر +50 لائلٹی پوائنٹس!',
        },
        isSuccess: true,
      },
    },
  ],
}
