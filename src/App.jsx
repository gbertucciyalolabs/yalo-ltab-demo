import { useState, useEffect, useCallback } from 'react'
import './App.css'
import ControlPanel from './components/ControlPanel.jsx'
import PhoneMockup from './components/PhoneMockup.jsx'
import WhatsAppChat from './components/WhatsAppChat.jsx'
import SahulatApp from './components/SahulatApp.jsx'
import LockScreen from './components/LockScreen.jsx'
import { journeys } from './journeys/index.js'

// useRef imported via destructuring below
import { useRef } from 'react'

const SAHULAT_RESET = {
  view: 'browse', cartItems: [], voucherApplied: false, voucherCode: '',
  discount: 0, loyaltyPoints: 2450, pendingPoints: 0,
  ctaPulsing: false, showLuckyWheel: false, orderDetails: null,
  showAbandoned: false, showTimeSkip: false,
}

export default function App() {
  const [journeyIndex, setJourneyIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [showTyping, setShowTyping] = useState(false)
  const [phoneView, setPhoneView] = useState('whatsapp') // 'whatsapp' | 'sahulat' | 'lockscreen'
  const [transitionState, setTransitionState] = useState('none')
  const [notification, setNotification] = useState(null)
  const [showLockNotification, setShowLockNotification] = useState(false)
  const [cartBranch, setCartBranch] = useState(null) // 'whatsapp' | 'app' | null
  const [lang, setLang] = useState('en')
  const [sahulatState, setSahulatState] = useState(SAHULAT_RESET)

  const typingTimerRef = useRef(null)
  const notifTimerRef = useRef(null)
  const journey = journeys[journeyIndex]
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f

  // Compute effective steps — appends branch steps once a branch is chosen
  const effectiveSteps = (journey.hasBranch && journey.branches && cartBranch)
    ? [...journey.steps, ...(journey.branches[cartBranch] || [])]
    : journey.steps

  const totalSteps = effectiveSteps.length

  // Are we waiting at the branch point?
  const atBranchPoint = !!(journey.hasBranch && !cartBranch && stepIndex >= journey.steps.length)

  // Steps visible in the WhatsApp chat
  const NON_CHAT = new Set(['typing', 'time-skip', 'branch', 'lockscreen', 'lock-notification', 'unlock', 'sahulat-browse', 'sahulat-add', 'sahulat-abandon'])
  const visibleSteps = effectiveSteps.slice(0, stepIndex).filter(s => !NON_CHAT.has(s.type))

  // Step description for the sidebar (uses effective steps)
  const currentStepData = effectiveSteps[stepIndex - 1]

  // ─── Reset ───────────────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    clearTimeout(typingTimerRef.current)
    clearTimeout(notifTimerRef.current)
    setStepIndex(0)
    setShowTyping(false)
    setPhoneView(journey.steps[0]?.type === 'lockscreen' ? 'lockscreen' : 'whatsapp')
    setTransitionState('none')
    setNotification(null)
    setShowLockNotification(false)
    setCartBranch(null)
    setSahulatState(SAHULAT_RESET)
  }, [journey])

  useEffect(() => { handleReset() }, [journeyIndex])

  // ─── Process step side-effects ────────────────────────────────────────────────
  const processStepEffects = useCallback((step) => {
    if (!step) return
    setShowTyping(false)

    if (step.type === 'typing') { setShowTyping(true); return }

    if (step.type === 'lockscreen') { setPhoneView('lockscreen'); setShowLockNotification(false); return }
    if (step.type === 'lock-notification') { setPhoneView('lockscreen'); setShowLockNotification(true); return }
    if (step.type === 'unlock') { setPhoneView('whatsapp'); setShowLockNotification(false); return }
    if (step.type === 'branch') { /* handled by atBranchPoint */ return }

    if (step.type === 'transition' && step.content?.to === 'sahulat') {
      setTransitionState('exiting')
      setTimeout(() => {
        setPhoneView('sahulat')
        setSahulatState(prev => ({
          ...prev,
          view: 'cart',
          cartItems: step.content.cart || [],
          voucherCode: step.content.voucher || '',
          loyaltyPoints: step.content.loyaltyPoints || 2450,
          pendingPoints: step.content.pendingPoints || 0,
        }))
        setTransitionState('entering')
        setTimeout(() => setTransitionState('none'), 500)
      }, 400)
      return
    }

    if (step.type === 'transition' && step.content?.to === 'whatsapp') {
      setTransitionState('none')
      setPhoneView('whatsapp')
      return
    }

    if (step.type === 'notification') {
      setPhoneView('whatsapp')
      setNotification({ title: step.content.title, message: step.content.message })
      clearTimeout(notifTimerRef.current)
      notifTimerRef.current = setTimeout(() => setNotification(null), 4000)
      return
    }

    if (step.type === 'sahulat-browse') {
      setPhoneView('sahulat')
      setSahulatState(prev => ({ ...prev, view: 'browse', cartItems: [], showAbandoned: false }))
      return
    }

    if (step.type === 'sahulat-add') {
      setPhoneView('sahulat')
      setSahulatState(prev => ({ ...prev, view: 'browse', cartItems: step.content.cart || [] }))
      return
    }

    if (step.type === 'sahulat-abandon') {
      setSahulatState(prev => ({ ...prev, showAbandoned: true }))
      return
    }

    if (step.type === 'time-skip') {
      setSahulatState(prev => ({ ...prev, showTimeSkip: true }))
      clearTimeout(typingTimerRef.current)
      typingTimerRef.current = setTimeout(() => {
        setSahulatState(prev => ({ ...prev, showTimeSkip: false, showAbandoned: false }))
      }, 1800)
      return
    }

    if (step.type === 'ui-action') {
      const { action } = step.content
      if (action === 'apply-voucher') {
        setSahulatState(prev => ({
          ...prev, voucherApplied: true,
          discount: step.content.discount || 870,
          showLuckyWheel: step.content.showLuckyWheel || false,
        }))
      }
      if (action === 'highlight-cta') {
        setSahulatState(prev => ({ ...prev, ctaPulsing: true }))
      }
      if (action === 'order-success') {
        setSahulatState(prev => ({
          ...prev, view: 'success', ctaPulsing: false, showLuckyWheel: false,
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

  // ─── Next ─────────────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    // Block if at branch point with no choice made
    if (journey.hasBranch && !cartBranch && stepIndex >= journey.steps.length) return

    const steps = (journey.hasBranch && journey.branches && cartBranch)
      ? [...journey.steps, ...(journey.branches[cartBranch] || [])]
      : journey.steps
    const total = steps.length

    if (stepIndex >= total) return
    clearTimeout(typingTimerRef.current)

    const step = steps[stepIndex]
    processStepEffects(step)
    setStepIndex(prev => prev + 1)

    if (step?.type === 'typing') {
      const nextStep = steps[stepIndex + 1]
      if (nextStep && stepIndex + 1 < total) {
        typingTimerRef.current = setTimeout(() => {
          processStepEffects(nextStep)
          setStepIndex(prev => prev + 1)
        }, 950)
      }
    }
  }, [stepIndex, journey, cartBranch, processStepEffects])

  // ─── Branch choice ────────────────────────────────────────────────────────────
  const handleBranchChoice = useCallback((branch) => {
    setCartBranch(branch)
  }, [])

  // ─── Prev ─────────────────────────────────────────────────────────────────────
  const handlePrev = useCallback(() => {
    if (stepIndex <= 0) return
    const newIndex = stepIndex - 1

    clearTimeout(typingTimerRef.current)
    clearTimeout(notifTimerRef.current)
    setShowTyping(false)
    setTransitionState('none')
    setNotification(null)

    // If going back into or before the branch point, clear branch choice
    let newCartBranch = cartBranch
    if (journey.hasBranch && cartBranch && newIndex <= journey.steps.length) {
      newCartBranch = null
    }

    const stepsToReplay = (journey.hasBranch && newCartBranch && journey.branches)
      ? [...journey.steps, ...(journey.branches[newCartBranch] || [])]
      : journey.steps

    // Compute initial view from journey start
    let pView = stepsToReplay[0]?.type === 'lockscreen' ? 'lockscreen' : 'whatsapp'
    let pShowLockNotif = false
    let pSahulat = { ...SAHULAT_RESET }

    for (let i = 0; i < newIndex; i++) {
      const s = stepsToReplay[i]
      if (s.type === 'lockscreen') { pView = 'lockscreen'; pShowLockNotif = false }
      if (s.type === 'lock-notification') { pView = 'lockscreen'; pShowLockNotif = true }
      if (s.type === 'unlock') { pView = 'whatsapp'; pShowLockNotif = false }
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
    setShowLockNotification(pShowLockNotif)
    setSahulatState(pSahulat)
    setCartBranch(newCartBranch)
    setStepIndex(newIndex)

    const lastStep = stepsToReplay[newIndex - 1]
    setShowTyping(lastStep?.type === 'typing')
  }, [stepIndex, journey, cartBranch])

  // ─── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      if (e.key === 'ArrowRight') { e.preventDefault(); handleNext() }
      if (e.key === 'ArrowLeft') { e.preventDefault(); handlePrev() }
      if (e.key === 'r' || e.key === 'R') { e.preventDefault(); handleReset() }
      if (e.key === 'f' || e.key === 'F') { e.preventDefault(); document.documentElement.requestFullscreen?.() }
      if (e.key >= '1' && e.key <= '5') {
        const idx = parseInt(e.key) - 1
        if (idx < journeys.length) setJourneyIndex(idx)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleNext, handlePrev, handleReset])

  // ─── Phone content ─────────────────────────────────────────────────────────────
  const renderPhoneContent = () => {
    if (phoneView === 'lockscreen') {
      return <LockScreen showNotification={showLockNotification} lang={lang} />
    }

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

  return (
    <div className="app-layout">
      <ControlPanel
        currentJourneyIndex={journeyIndex}
        setCurrentJourneyIndex={(i) => setJourneyIndex(i)}
        currentStep={stepIndex}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrev={handlePrev}
        onReset={handleReset}
        lang={lang}
        setLang={setLang}
        atBranchPoint={atBranchPoint}
        onBranchChoice={handleBranchChoice}
        currentStepDescription={currentStepData?.description}
        journey={journey}
      />

      <div className="app-stage">
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
