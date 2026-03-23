import { journeys } from '../journeys/index.js'

export default function ControlPanel({
  currentJourneyIndex,
  setCurrentJourneyIndex,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onReset,
  lang,
  setLang,
  atBranchPoint,
  onBranchChoice,
  currentStepDescription,
  journey,
}) {
  const t = (f) => typeof f === 'object' && f?.en !== undefined ? (f[lang] ?? f.en) : f

  return (
    <div style={{
      width: '300px', minWidth: '300px', height: '100%',
      background: '#0f0f23', display: 'flex', flexDirection: 'column',
      padding: '20px 16px', gap: '16px',
      borderRight: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #7C3AED, #5B21B6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', fontWeight: 900, color: 'white',
          boxShadow: '0 4px 14px rgba(124, 58, 237, 0.4)',
        }}>Y</div>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>yalo</div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Commerce AI</div>
        </div>
      </div>

      {/* Language toggle */}
      <div style={{ display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '4px' }}>
        {['en', 'ur'].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            flex: 1, padding: '6px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            fontSize: l === 'ur' ? '14px' : '12px', fontWeight: 700,
            background: lang === l ? 'linear-gradient(135deg, #7C3AED, #6D28D9)' : 'transparent',
            color: lang === l ? 'white' : 'rgba(255,255,255,0.4)', transition: 'all 0.2s',
            fontFamily: l === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit',
          }}>
            {l === 'en' ? 'EN' : 'اردو'}
          </button>
        ))}
      </div>

      {/* Journey selector */}
      <div style={{ overflow: 'auto', flex: '1 1 0', minHeight: 0 }}>
        {/* Retailer section */}
        <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
          🛒 Retailer
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
          {journeys.filter(j => !j.isSeller).map((j, _) => {
            const i = journeys.indexOf(j)
            return (
              <button
                key={j.id}
                onClick={() => { setCurrentJourneyIndex(i); onReset() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  background: i === currentJourneyIndex ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(91,33,182,0.15))' : 'transparent',
                  borderLeft: i === currentJourneyIndex ? '2px solid #7C3AED' : '2px solid transparent',
                }}
              >
                <span style={{ fontSize: '15px', flexShrink: 0 }}>{j.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '12px', fontWeight: 700,
                    color: i === currentJourneyIndex ? '#C4B5FD' : 'rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {i + 1}. {t(j.title)}
                  </div>
                  {i === currentJourneyIndex && (
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px', lineHeight: 1.3 }}>
                      {t(j.subtitle)}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Seller section divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(13,148,136,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            🧑‍💼 Seller (SalesMate)
          </div>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {journeys.filter(j => j.isSeller).map((j, _) => {
            const i = journeys.indexOf(j)
            return (
              <button
                key={j.id}
                onClick={() => { setCurrentJourneyIndex(i); onReset() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 12px', borderRadius: '10px', border: 'none',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  background: i === currentJourneyIndex ? 'linear-gradient(135deg, rgba(13,148,136,0.25), rgba(6,95,70,0.15))' : 'transparent',
                  borderLeft: i === currentJourneyIndex ? '2px solid #0D9488' : '2px solid transparent',
                }}
              >
                <span style={{ fontSize: '15px', flexShrink: 0 }}>{j.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: '12px', fontWeight: 700,
                    color: i === currentJourneyIndex ? '#5EEAD4' : 'rgba(255,255,255,0.6)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>
                    {i + 1}. {t(j.title)}
                  </div>
                  {i === currentJourneyIndex && (
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '1px', lineHeight: 1.3 }}>
                      {t(j.subtitle)}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Step indicator */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Progress</span>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#C4B5FD' }}>
            {currentStep} / {totalSteps}
            {atBranchPoint && <span style={{ fontSize: '10px', color: '#A78BFA', marginLeft: '6px' }}>branch</span>}
          </span>
        </div>
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(currentStep / Math.max(totalSteps, 1)) * 100}%`,
            background: 'linear-gradient(90deg, #7C3AED, #A78BFA)',
            borderRadius: '2px', transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Step description */}
      {currentStepDescription && (
        <div style={{
          background: 'rgba(124, 58, 237, 0.08)', borderRadius: '10px',
          padding: '12px', border: '1px solid rgba(124, 58, 237, 0.15)', flex: '0 0 auto',
        }}>
          <div style={{ fontSize: '10px', color: '#7C3AED', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>
            Step {currentStep}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
            {currentStepDescription}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

        {/* Branch selection (Journey 4 only, when at branch point) */}
        {atBranchPoint && journey?.branchLabels ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '11px', color: '#A78BFA', fontWeight: 700, textAlign: 'center', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Choose completion path:
            </div>
            <button
              onClick={() => onBranchChoice('whatsapp')}
              style={{
                padding: '12px', background: 'linear-gradient(135deg, rgba(37,211,102,0.2), rgba(37,211,102,0.12))',
                border: '1px solid rgba(37,211,102,0.4)', borderRadius: '12px',
                color: '#25D366', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', textAlign: 'center',
                direction: lang === 'ur' ? 'rtl' : 'ltr',
                fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit',
              }}
            >
              {t(journey.branchLabels.whatsapp)}
            </button>
            <button
              onClick={() => onBranchChoice('app')}
              style={{
                padding: '12px', background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.12))',
                border: '1px solid rgba(124,58,237,0.4)', borderRadius: '12px',
                color: '#C4B5FD', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s', textAlign: 'center',
                direction: lang === 'ur' ? 'rtl' : 'ltr',
                fontFamily: lang === 'ur' ? "'Noto Nastaliq Urdu', serif" : 'inherit',
              }}
            >
              {t(journey.branchLabels.app)}
            </button>
          </div>
        ) : (
          /* Normal Next button */
          <button
            onClick={onNext}
            disabled={currentStep >= totalSteps}
            style={{
              padding: '14px',
              background: currentStep >= totalSteps ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #7C3AED, #6D28D9)',
              border: 'none', borderRadius: '12px',
              color: currentStep >= totalSteps ? 'rgba(255,255,255,0.3)' : 'white',
              fontSize: '14px', fontWeight: 700,
              cursor: currentStep >= totalSteps ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s', letterSpacing: '0.3px',
              boxShadow: currentStep >= totalSteps ? 'none' : '0 4px 20px rgba(124, 58, 237, 0.4)',
            }}
            onMouseEnter={e => { if (currentStep < totalSteps) e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)' }}
          >
            {currentStep >= totalSteps ? '✓ Journey Complete' : 'Next Step ▶'}
          </button>
        )}

        {/* Prev + Reset */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onPrev}
            disabled={currentStep <= 0}
            style={{
              flex: 1, padding: '10px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px',
              color: currentStep <= 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.6)',
              fontSize: '13px', fontWeight: 600,
              cursor: currentStep <= 0 ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
            }}
          >
            ◀ Prev
          </button>
          <button
            onClick={onReset}
            style={{
              flex: 1, padding: '10px',
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '10px', color: 'rgba(255,255,255,0.6)',
              fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            ↺ Reset
          </button>
        </div>

        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.6 }}>
          → Next &nbsp;|&nbsp; ← Prev &nbsp;|&nbsp; R Reset &nbsp;|&nbsp; 1-9 Jump &nbsp;|&nbsp; F Fullscreen
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', textAlign: 'center' }}>
        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
          Powered by <span style={{ color: '#7C3AED', fontWeight: 700 }}>Yalo AI</span>
        </div>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.1)', marginTop: '2px' }}>
          LTAB PepsiCo Pakistan Demo
        </div>
      </div>
    </div>
  )
}
