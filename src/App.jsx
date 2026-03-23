import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'
import ControlPanel from './components/ControlPanel.jsx'
import PhoneMockup from './components/PhoneMockup.jsx'
import WhatsAppChat from './components/WhatsAppChat.jsx'
import SahulatApp from './components/SahulatApp.jsx'
import { journeys } from './journeys/index.js'

export default function App() {
  const [journeyIndex, setJourneyIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)  // 0 = before any step shown
  const [showTyping, setShowTyping] = useState(false)
  const [phoneView, setPhoneView] = useState('whatsapp') // 'whatsapp' | 'sahulat'
  const [transitionState, setTransitionState] = useState('none')
  const [notification, setNotification] = useState(null)
  const [lang, setLang] = useState('en')
  const [sahulatState, setSahulatState] = useState({
    view: 'browse',
    cartItems: [],
    voucherApplied: false,
    voucherCode: '',
    discount: 0,
    loyaltyPoints: 2450,
    pendingPoints: 0,
    ctaPulsing: false,
    showLuckyWheel: false,
    orderDetails: null,
    showAbandoned: false,
    showTimeSkip: false,
  })

  const typingTimerRef = useRef(null)
  const notifTimerRef = useRef(null)
  const journey = journeys[journeyIndex]
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f
  const totalSteps = journey.steps.length

  // Get steps visible so far
  const visibleSteps = journey.steps.slice(0, stepIndex).filter(s =>
    s.type !== 'typing' && s.type !== 'time-skip'
  )

  // Reset when journey changes
  const handleReset = useCallback(() => {
    clearTimeout(typingTimerRef.current)
    clearTimeout(notifTimerRef.current)
    setStepIndex(0)
    setShowTyping(false)
    setPhoneView('whatsapp')
    setTransitionState('none')
    setNotification(null)
    setSahulatState({
      view: 'browse',
      cartItems: [],
      voucherApplied: false,
      voucherCode: '',
      discount: 0,
      loyaltyPoints: 2450,
      pendingPoints: 0,
      ctaPulsing: false,
      showLuckyWheel: false,
      orderDetails: null,
      showAbandoned: false,
      showTimeSkip: false,
    })
  }, [])

  useEffect(() => {
    handleReset()
  }, [journeyIndex])

  // Process a step's side effects
  const processStepEffects = useCallback((step) => {
    if (!step) return

    setShowTyping(false)

    // --- Typing steps ---
    if (step.type === 'typing') {
      setShowTyping(true)
      return
    }

    // --- Transition to Sahulat ---
    if (step.type === 'transition' && step.content?.to === 'sahulat') {
      setTransitionState('exiting')
      setTimeout(() => {
        setPhoneView('sahulat')
        const cart = step.content.cart || []
        setSahulatState(prev => ({
          ...prev,
          view: 'cart',
          cartItems: cart,
          voucherCode: step.content.voucher || '',
          loyaltyPoints: step.content.loyaltyPoints || 2450,
          pendingPoints: step.content.pendingPoints || 0,
        }))
        setTransitionState('entering')
        setTimeout(() => setTransitionState('none'), 500)
      }, 400)
      return
    }

    // --- Transition to WhatsApp ---
    if (step.type === 'transition' && step.content?.to === 'whatsapp') {
      // Show notification first, then switch
      if (step.content?.to === 'whatsapp') {
        setTransitionState('none')
      }
      setPhoneView('whatsapp')
      return
    }

    // --- Notification ---
    if (step.type === 'notification') {
      setPhoneView('whatsapp')
      setNotification({ title: step.content.title, message: step.content.message })
      clearTimeout(notifTimerRef.current)
      notifTimerRef.current = setTimeout(() => setNotification(null), 4000)
      return
    }

    // --- Sahulat browse ---
    if (step.type === 'sahulat-browse') {
      setPhoneView('sahulat')
      setSahulatState(prev => ({ ...prev, view: 'browse', cartItems: [], showAbandoned: false }))
      return
    }

    // --- Sahulat add items ---
    if (step.type === 'sahulat-add') {
      setPhoneView('sahulat')
      setSahulatState(prev => ({ ...prev, view: 'browse', cartItems: step.content.cart || [] }))
      return
    }

    // --- Sahulat abandon ---
    if (step.type === 'sahulat-abandon') {
      setSahulatState(prev => ({ ...prev, showAbandoned: true }))
      return
    }

    // --- Time skip ---
    if (step.type === 'time-skip') {
      setSahulatState(prev => ({ ...prev, showTimeSkip: true }))
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = setTimeout(() => {
        setSahulatState(prev => ({ ...prev, showTimeSkip: false, showAbandoned: false }))
      }, 1800)
      return
    }

    // --- UI Actions (Sahulat) ---
    if (step.type === 'ui-action') {
      const { action } = step.content

      if (action === 'apply-voucher') {
        setSahulatState(prev => ({
          ...prev,
          voucherApplied: true,
          discount: step.content.discount || 870,
          showLuckyWheel: step.content.showLuckyWheel || false,
        }))
      }

      if (action === 'highlight-cta') {
        setSahulatState(prev => ({ ...prev, ctaPulsing: true }))
      }

      if (action === 'order-success') {
        setSahulatState(prev => ({
          ...prev,
          view: 'success',
          ctaPulsing: false,
          showLuckyWheel: false,
          orderDetails: {
            orderNumber: step.content.orderNumber,
            delivery: step.content.delivery,
            pointsEarned: step.content.pointsEarned,
            totalPoints: step.content.totalPoints,
          },
        }))
      }
      return
    }
  }, [])

  const handleNext = useCallback(() => {
    if (stepIndex >= totalSteps) return
    clearTimeout(typingTimerRef.current)
    const step = journey.steps[stepIndex]
    processStepEffects(step)
    setStepIndex(prev => prev + 1)

    if (step?.type === 'typing') {
      const nextStep = journey.steps[stepIndex + 1]
      if (nextStep && stepIndex + 1 < totalSteps) {
        typingTimerRef.current = setTimeout(() => {
          processStepEffects(nextStep)
          setStepIndex(prev => prev + 1)
        }, 950)
      }
    }
  }, [stepIndex, totalSteps, journey, processStepEffects])

  const handlePrev = useCallback(() => {
    if (stepIndex <= 0) return
    // Reset and replay up to stepIndex - 1
    const newIndex = stepIndex - 1

    // Full reset then re-apply
    clearTimeout(typingTimerRef.current)
    clearTimeout(notifTimerRef.current)
    setShowTyping(false)
    setPhoneView('whatsapp')
    setTransitionState('none')
    setNotification(null)
    setSahulatState({
      view: 'browse',
      cartItems: [],
      voucherApplied: false,
      voucherCode: '',
      discount: 0,
      loyaltyPoints: 2450,
      pendingPoints: 0,
      ctaPulsing: false,
      showLuckyWheel: false,
      orderDetails: null,
      showAbandoned: false,
      showTimeSkip: false,
    })

    // Re-apply all steps synchronously up to newIndex
    let pView = 'whatsapp'
    let pSahulat = {
      view: 'browse', cartItems: [], voucherApplied: false, voucherCode: '',
      discount: 0, loyaltyPoints: 2450, pendingPoints: 0,
      ctaPulsing: false, showLuckyWheel: false, orderDetails: null,
      showAbandoned: false, showTimeSkip: false,
    }

    for (let i = 0; i < newIndex; i++) {
      const s = journey.steps[i]
      if (s.type === 'transition' && s.content?.to === 'sahulat') {
        pView = 'sahulat'
        pSahulat = { ...pSahulat, view: 'cart', cartItems: s.content.cart || [], voucherCode: s.content.voucher || '', loyaltyPoints: s.content.loyaltyPoints || 2450, pendingPoints: s.content.pendingPoints || 0 }
      }
      if (s.type === 'transition' && s.content?.to === 'whatsapp') { pView = 'whatsapp' }
      if (s.type === 'sahulat-browse') { pView = 'sahulat'; pSahulat = { ...pSahulat, view: 'browse', cartItems: [] } }
      if (s.type === 'sahulat-add') { pView = 'sahulat'; pSahulat = { ...pSahulat, cartItems: s.content.cart || [] } }
      if (s.type === 'sahulat-abandon') { pSahulat = { ...pSahulat, showAbandoned: true } }
      if (s.type === 'notification') { pView = 'whatsapp' }
      if (s.type === 'ui-action') {
        if (s.content.action === 'apply-voucher') pSahulat = { ...pSahulat, voucherApplied: true, discount: s.content.discount || 870, showLuckyWheel: s.content.showLuckyWheel || false }
        if (s.content.action === 'highlight-cta') pSahulat = { ...pSahulat, ctaPulsing: true }
        if (s.content.action === 'order-success') pSahulat = { ...pSahulat, view: 'success', ctaPulsing: false, showLuckyWheel: false, orderDetails: { orderNumber: s.content.orderNumber, delivery: s.content.delivery, pointsEarned: s.content.pointsEarned, totalPoints: s.content.totalPoints } }
      }
    }

    setPhoneView(pView)
    setSahulatState(pSahulat)
    setStepIndex(newIndex)

    // Show typing if last visible step is a typing step
    const lastStep = journey.steps[newIndex - 1]
    setShowTyping(lastStep?.type === 'typing')
  }, [stepIndex, journey])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return

      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev() }
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); handleReset() }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); document.documentElement.requestFullscreen?.() }
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1
        if (idx < journeys.length) { setJourneyIndex(idx) }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNext, handlePrev, handleReset])

  // Determine what to show in the phone
  const renderPhoneContent = () => {
    if (phoneView === 'sahulat') {
      return (
        <SahulatApp
          view={sahulatState.view}
          cartItems={sahulatState.cartItems}
          voucherApplied={sahulatState.voucherApplied}
          voucherCode={sahulatState.voucherCode}
          discount={sahulatState.discount}
          loyaltyPoints={sahulatState.loyaltyPoints}
          pendingPoints={sahulatState.pendingPoints}
          ctaPulsing={sahulatState.ctaPulsing}
          showLuckyWheel={sahulatState.showLuckyWheel}
          orderDetails={sahulatState.orderDetails}
          showAbandoned={sahulatState.showAbandoned}
          showTimeSkip={sahulatState.showTimeSkip}
        />
      )
    }

    return (
      <WhatsAppChat
        visibleSteps={visibleSteps}
        showTyping={showTyping}
        notification={notification}
        lang={lang}
      />
    )
  }

  // Compute notification for WhatsApp view from abandoned cart step 5
  const activeNotification = phoneView === 'whatsapp' ? notification : null

  return (
    <div className="app-layout">
      <ControlPanel
        currentJourneyIndex={journeyIndex}
        setCurrentJourneyIndex={(i) => { setJourneyIndex(i) }}
        currentStep={stepIndex}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        lang={lang}
        setLang={setLang}
      />

      <div className="app-stage">
        {/* Journey label */}
        <div className="journey-label">
          {journey.icon} Journey {journeyIndex + 1}: {t(journey.title)}
        </div>

        <PhoneMockup transitionState={transitionState}>
          {renderPhoneContent()}
        </PhoneMockup>
      </div>
    </div>
  )
}
