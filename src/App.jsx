import { useEffect, useMemo, useState } from 'react'

const TOTAL_STEPS = 7

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  territoryInterest: '',
  cityStateOther: '',
  referralSource: '',
  ownedBusiness: '',
  businessType: '',
  professionalBackground: '',
  teamManagement: '',
  ownerType: '',
  liquidCapital: '',
  financing: '',
  creditScore: '',
  fddReviewed: '',
  marketConnections: '',
  marketWhy: '',
  timeline: '',
  training: '',
  franchiseWhy: '',
  first50plan: '',
  outreach: '',
}

const statCards = [
  { value: '500,000+', label: 'gallons delivered' },
  { value: '24+', label: 'territories awarded' },
  { value: '$1M+', label: 'Charleston revenue' },
]

const aboutSources = [
  'Instagram / TikTok',
  'YouTube (Codie Sanchez, Bright Innovates, etc.)',
  'Podcast',
  'Franchise Expo / Trade Show',
  'Referral from existing franchisee',
  'News / Press (CNBC, local news, etc.)',
  'Google Search',
  'LinkedIn',
  'Other',
]

const territoryOptions = [
  'Charleston, SC (HQ market)',
  'Austin, TX',
  'Chandler / East Valley, AZ',
  'Rhode Island',
  'Florida - East Coast',
  'Florida - West Coast',
  'Georgia',
  'North Carolina',
  "Other - my market isn't listed",
]

const marketConnectionOptions = [
  'Yes - I live there or have strong local ties',
  "Somewhat - I know the area but don't live there",
  "No - but I've researched it and I'm ready to relocate or travel",
]

const backgroundOptions = [
  'Corporate/W-2 Employee',
  'Business Owner',
  'Military/Veteran',
  'Sales/Marketing Professional',
  'Operations/Logistics',
  'Other',
]

const managementOptions = [
  'Yes - managed 1-5 people',
  'Yes - managed 5+ people',
  "No, but I'm ready to learn",
]

const ownerOptions = ['Owner-Operator', 'Semi-Absentee', 'Not sure yet']

const capitalOptions = [
  'Under $50,000',
  '$50,000-$75,000',
  '$75,000-$100,000',
  '$100,000-$150,000',
  '$150,000+',
]

const financingOptions = ['Yes', 'No', 'Need more information']
const creditOptions = ['Yes', 'No', 'Not sure']
const fddOptions = [
  'Yes, for another franchise',
  'Yes, for Juiced Fuel',
  'No, this is my first time',
]
const timelineOptions = [
  'As soon as possible (1-3 months)',
  '3-6 months',
  '6-12 months',
  'Just exploring for now',
]
const trainingOptions = [
  'Yes',
  "I'd need to travel but can make it work",
  'This would be difficult',
]
const outreachOptions = [
  "Yes, that's my strength",
  "I'm willing to do it",
  "I'd prefer not to",
]

function getScorecard(form) {
  const items = []

  if (form.liquidCapital) {
    if (form.liquidCapital === 'Under $50,000') {
      items.push({
        name: 'Liquid capital',
        status: 'red',
        points: 0,
        reason: 'Current liquid capital is below the typical starting range.',
      })
    } else if (form.liquidCapital === '$50,000-$75,000') {
      items.push({
        name: 'Liquid capital',
        status: 'yellow',
        points: 5,
        reason: 'Capital could work with financing, but it is still a tight range.',
      })
    } else {
      items.push({
        name: 'Liquid capital',
        status: 'green',
        points: 10,
        reason: 'Capital range lines up with a stronger launch position.',
      })
    }
  }

  if (form.creditScore) {
    if (form.creditScore === 'Yes') {
      items.push({
        name: 'Credit readiness',
        status: 'green',
        points: 10,
        reason: 'Credit readiness supports financing flexibility.',
      })
    } else if (form.creditScore === 'Not sure') {
      items.push({
        name: 'Credit readiness',
        status: 'yellow',
        points: 5,
        reason: 'Credit score needs confirmation before moving forward.',
      })
    } else {
      items.push({
        name: 'Credit readiness',
        status: 'yellow',
        points: 5,
        reason: 'Credit readiness may need improvement before launch.',
      })
    }
  }

  if (form.ownerType) {
    if (form.ownerType === 'Owner-Operator') {
      items.push({
        name: 'Owner type',
        status: 'green',
        points: 10,
        reason: 'Hands-on ownership is a strong fit for early growth.',
      })
    } else if (form.ownerType === 'Not sure yet') {
      items.push({
        name: 'Owner type',
        status: 'yellow',
        points: 5,
        reason: 'Ownership style needs more clarity before the next step.',
      })
    } else {
      items.push({
        name: 'Owner type',
        status: 'yellow',
        points: 0,
        reason: 'Juiced Fuel prefers owner-operators in the early stages.',
      })
    }
  }

  if (form.timeline) {
    if (
      form.timeline === 'As soon as possible (1-3 months)' ||
      form.timeline === '3-6 months'
    ) {
      items.push({
        name: 'Launch timeline',
        status: 'green',
        points: 10,
        reason: 'Launch timing suggests serious near-term intent.',
      })
    } else if (form.timeline === '6-12 months') {
      items.push({
        name: 'Launch timeline',
        status: 'yellow',
        points: 5,
        reason: 'Timing works, though it points to a slower decision window.',
      })
    } else {
      items.push({
        name: 'Launch timeline',
        status: 'yellow',
        points: 0,
        reason: 'The application reads as exploratory rather than launch-ready.',
      })
    }
  }

  if (form.training) {
    if (form.training === 'Yes') {
      items.push({
        name: 'Training availability',
        status: 'green',
        points: 10,
        reason: 'Training availability supports a smoother onboarding process.',
      })
    } else if (form.training === "I'd need to travel but can make it work") {
      items.push({
        name: 'Training availability',
        status: 'yellow',
        points: 5,
        reason: 'Travel takes planning, but the commitment is there.',
      })
    } else {
      items.push({
        name: 'Training availability',
        status: 'red',
        points: 0,
        reason: 'Charleston training is currently a required part of launch prep.',
      })
    }
  }

  if (form.outreach) {
    if (form.outreach === "Yes, that's my strength") {
      items.push({
        name: 'Community outreach',
        status: 'green',
        points: 10,
        reason: 'Grassroots selling strength is a great signal for launch success.',
      })
    } else if (form.outreach === "I'm willing to do it") {
      items.push({
        name: 'Community outreach',
        status: 'yellow',
        points: 5,
        reason: 'Willingness is helpful, even if outreach is not yet a core strength.',
      })
    } else {
      items.push({
        name: 'Community outreach',
        status: 'red',
        points: 0,
        reason: 'Direct local outreach is essential in the early days of growth.',
      })
    }
  }

  if (form.ownedBusiness === 'Yes') {
    items.push({
      name: 'Business experience',
      status: 'green',
      points: 10,
      reason: 'Prior ownership experience can shorten the learning curve.',
    })
  }

  if (form.professionalBackground === 'Military/Veteran') {
    items.push({
      name: 'Veteran bonus',
      status: 'green',
      points: 5,
      reason: 'Veteran leadership background is a strong culture fit.',
    })
  }

  const totalPoints = items.reduce((sum, item) => sum + item.points, 0)
  const redFlags = items.filter((item) => item.status === 'red')
  const yellowFlags = items.filter((item) => item.status === 'yellow')

  let rating = 'Potential Fit - Needs Discussion'
  let tone = 'orange'
  let message =
    "Thanks for your interest! We'll review your application and may reach out with some follow-up questions."

  if (redFlags.length > 0 || totalPoints < 30) {
    rating = 'Not Qualified at This Time'
    tone = 'red'
    message =
      'Thanks for your interest in Juiced Fuel! Based on your answers, this may not be the right time - but we encourage you to revisit when your situation changes. In the meantime, follow us on social media for updates.'
  } else if (totalPoints >= 50) {
    rating = 'Strong Candidate'
    tone = 'green'
    message =
      "We'd love to set up a call with our team. You'll be hearing from us within 48 hours."
  }

  const reasons = [
    ...redFlags.slice(0, 2).map((item) => item.reason),
    ...yellowFlags.slice(0, 2).map((item) => item.reason),
  ]

  return {
    totalPoints,
    rating,
    tone,
    message,
    items,
    explanation:
      reasons[0] ||
      'Your answers show solid alignment across the most important launch criteria.',
  }
}

function validateStep(step, form) {
  const nextErrors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (step === 1) {
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.'
    if (!form.email.trim()) nextErrors.email = 'Email address is required.'
    else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!form.territoryInterest) {
      nextErrors.territoryInterest = 'Please choose a target territory.'
    }
    if (
      form.territoryInterest === "Other - my market isn't listed" &&
      !form.cityStateOther.trim()
    ) {
      nextErrors.cityStateOther = 'Please tell us what city/state you want.'
    }
    if (!form.referralSource) {
      nextErrors.referralSource = 'Please tell us how you heard about Juiced Fuel.'
    }
  }

  if (step === 2) {
    if (!form.ownedBusiness) nextErrors.ownedBusiness = 'Please choose an option.'
    if (form.ownedBusiness === 'Yes' && !form.businessType.trim()) {
      nextErrors.businessType = 'Tell us what type of business you owned.'
    }
    if (!form.professionalBackground) {
      nextErrors.professionalBackground = 'Please select your background.'
    }
    if (!form.teamManagement) {
      nextErrors.teamManagement = 'Please select your team management experience.'
    }
    if (!form.ownerType) nextErrors.ownerType = 'Please choose your ownership style.'
  }

  if (step === 3) {
    if (!form.liquidCapital) nextErrors.liquidCapital = 'Please select your capital range.'
    if (!form.financing) nextErrors.financing = 'Please select a financing answer.'
    if (!form.creditScore) nextErrors.creditScore = 'Please select your credit readiness.'
    if (!form.fddReviewed) nextErrors.fddReviewed = 'Please let us know your FDD experience.'
  }

  if (step === 4) {
    if (!form.marketConnections) {
      nextErrors.marketConnections = 'Please choose your connection to the market.'
    }
    if (!form.marketWhy.trim()) {
      nextErrors.marketWhy = 'Tell us why this market stands out to you.'
    }
    if (!form.timeline) nextErrors.timeline = 'Please choose a launch timeline.'
    if (!form.training) nextErrors.training = 'Please select a training answer.'
  }

  if (step === 5) {
    if (!form.franchiseWhy.trim()) {
      nextErrors.franchiseWhy = 'Please share your reason for applying.'
    } else if (form.franchiseWhy.trim().length < 50) {
      nextErrors.franchiseWhy = 'Please give us a bit more detail - at least 50 characters.'
    }
    if (!form.first50plan.trim()) {
      nextErrors.first50plan = 'Please share your rough game plan.'
    }
    if (!form.outreach) nextErrors.outreach = 'Please choose an outreach answer.'
  }

  return nextErrors
}

function App() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [meterProgress, setMeterProgress] = useState(0)

  const scorecard = useMemo(() => getScorecard(form), [form])

  useEffect(() => {
    if (step === 6 && !submitted) {
      const frame = requestAnimationFrame(() => {
        setMeterProgress(Math.min((scorecard.totalPoints / 65) * 100, 100))
      })
      return () => cancelAnimationFrame(frame)
    }

    setMeterProgress(0)
    return undefined
  }, [step, scorecard.totalPoints, submitted])

  const stepProgress = step === 0 ? 0 : ((step + 1) / TOTAL_STEPS) * 100

  const scoreTone = {
    green: {
      badge:
        'border-emerald-300 bg-emerald-50 text-emerald-700 shadow-emerald-100/80',
      ring: '#059669',
      panel: 'border-emerald-200 bg-emerald-50/80',
    },
    orange: {
      badge:
        'border-orange-300 bg-orange-50 text-orange-700 shadow-orange-100/80',
      ring: '#F97316',
      panel: 'border-orange-200 bg-orange-50/80',
    },
    red: {
      badge: 'border-red-300 bg-red-50 text-red-700 shadow-red-100/80',
      ring: '#DC2626',
      panel: 'border-red-200 bg-red-50/80',
    },
  }[scorecard.tone]

  const setField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      if (!current[field]) return current
      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleNext = () => {
    const nextErrors = validateStep(step, form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setErrors({})
    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1))
  }

  const handleBack = () => {
    setErrors({})
    setStep((current) => Math.max(current - 1, 0))
  }

  return (
    <div className="min-h-screen bg-[#FFF9F4] text-[#1A1A1A]">
      <style>{`
        @keyframes stepEnter {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes confettiFall {
          0% { transform: translate3d(0, -18vh, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate3d(var(--drift), 110vh, 0) rotate(720deg); opacity: 0; }
        }
        .animate-step-enter { animation: stepEnter 420ms ease both; }
        .confetti-piece { animation: confettiFall var(--duration) linear infinite; }
      `}</style>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,107,26,0.12),transparent_24%),radial-gradient(circle_at_top_left,rgba(255,107,26,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(26,26,26,0.06),transparent_28%)]" />
        <div className="absolute -right-10 top-16 h-40 w-40 rounded-full bg-[#FF6B1A]/12 blur-3xl sm:h-56 sm:w-56" />
        <div className="absolute left-0 top-72 h-32 w-32 rounded-full bg-[#ffd9c4] blur-3xl sm:h-48 sm:w-48" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-3 pb-6 pt-4 sm:px-5 sm:pt-6 lg:px-8">
          <header className="mb-4 rounded-[30px] border border-white/70 bg-white/88 px-4 py-4 shadow-[0_20px_80px_rgba(26,26,26,0.07)] backdrop-blur sm:mb-6 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#1A1A1A] text-white shadow-lg shadow-[#FF6B1A]/20">
                  <FuelPumpIcon />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#1A1A1A]/45">
                    Franchise Application
                  </p>
                  <h1 className="text-xl font-bold uppercase tracking-[0.14em] sm:text-2xl">
                    JUICED <span className="text-[#FF6B1A]">FUEL</span>
                  </h1>
                </div>
              </div>
              {!submitted && (
                <div className="hidden rounded-full border border-[#1A1A1A]/8 bg-[#FFF5EE] px-4 py-2 text-sm font-medium text-[#1A1A1A]/75 sm:block">
                  Step {step + 1} of {TOTAL_STEPS}
                </div>
              )}
            </div>

            {!submitted && (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/45">
                  <span>Qualification Progress</span>
                  <span>{Math.round(stepProgress)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#1A1A1A]/7">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF6B1A] via-[#ffa36f] to-[#ffcfb6] transition-all duration-500"
                    style={{ width: `${stepProgress}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
                  {Array.from({ length: TOTAL_STEPS }, (_, index) => {
                    const active = index === step
                    const done = index < step
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-all ${
                            active
                              ? 'border-[#FF6B1A] bg-[#FF6B1A] text-white shadow-lg shadow-[#FF6B1A]/30'
                              : done
                                ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                                : 'border-[#1A1A1A]/10 bg-[#fff8f2] text-[#1A1A1A]/45'
                          }`}
                        >
                          {index + 1}
                        </div>
                        {index < TOTAL_STEPS - 1 && (
                          <div
                            className={`hidden h-[2px] flex-1 rounded-full sm:block ${
                              done ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/10'
                            }`}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </header>

          <main className="flex-1">
            <section
              key={submitted ? 'confirmation' : `step-${step}`}
              className="animate-step-enter rounded-[34px] border border-white/70 bg-white/92 shadow-[0_24px_90px_rgba(26,26,26,0.08)] backdrop-blur"
            >
              {submitted ? (
                <ConfirmationScreen />
              ) : (
                <div className="relative px-4 pb-8 pt-5 sm:px-8 sm:pb-10 sm:pt-8">
                  {step === 0 && <WelcomeStep />}
                  {step === 1 && (
                    <StepLayout
                      eyebrow="Step 2"
                      title="About You"
                      description="A few basics so we know who is interested and where you want to grow."
                    >
                      <div className="grid gap-5 md:grid-cols-2">
                        <TextInput label="Full Name" value={form.fullName} onChange={(value) => setField('fullName', value)} error={errors.fullName} required />
                        <TextInput label="Email Address" type="email" value={form.email} onChange={(value) => setField('email', value)} error={errors.email} required />
                        <TextInput label="Phone Number" type="tel" value={form.phone} onChange={(value) => setField('phone', value)} error={errors.phone} required />
                        <SelectInput label="Which Juiced Fuel territory are you interested in?" value={form.territoryInterest} onChange={(value) => setField('territoryInterest', value)} options={territoryOptions} error={errors.territoryInterest} required />
                      </div>
                      {form.territoryInterest === "Other - my market isn't listed" && (
                        <TextInput label="What city/state are you interested in?" value={form.cityStateOther} onChange={(value) => setField('cityStateOther', value)} error={errors.cityStateOther} required />
                      )}
                      <SelectInput label="How did you hear about Juiced Fuel?" value={form.referralSource} onChange={(value) => setField('referralSource', value)} options={aboutSources} error={errors.referralSource} required />
                    </StepLayout>
                  )}

                  {step === 2 && (
                    <StepLayout
                      eyebrow="Step 3"
                      title="Background & Experience"
                      description="We’re looking for operators who can lead locally, learn fast, and build community trust."
                    >
                      <RadioCards label="Have you ever owned a business before?" value={form.ownedBusiness} onChange={(value) => { setField('ownedBusiness', value); if (value === 'No') setField('businessType', '') }} options={['Yes', 'No']} error={errors.ownedBusiness} />
                      {form.ownedBusiness === 'Yes' && (
                        <TextInput label="If yes, what type of business?" value={form.businessType} onChange={(value) => setField('businessType', value)} error={errors.businessType} placeholder="Example: retail, logistics, agency, home services" />
                      )}
                      <SelectInput label="What is your current professional background?" value={form.professionalBackground} onChange={(value) => setField('professionalBackground', value)} options={backgroundOptions} error={errors.professionalBackground} />
                      <RadioCards label="Do you have experience managing a team?" value={form.teamManagement} onChange={(value) => setField('teamManagement', value)} options={managementOptions} error={errors.teamManagement} />
                      <RadioCards label="Are you looking to be a hands-on owner-operator or an investor/semi-absentee?" value={form.ownerType} onChange={(value) => setField('ownerType', value)} options={ownerOptions} error={errors.ownerType} />
                      <FlagHints items={[
                        form.professionalBackground === 'Military/Veteran' ? { tone: 'green', text: 'Veteran background is a strong alignment signal for the Juiced Fuel team.' } : null,
                        form.ownerType === 'Owner-Operator' ? { tone: 'green', text: 'Owner-operators tend to build the strongest territories. This is a great signal.' } : null,
                        form.ownerType === 'Semi-Absentee' ? { tone: 'yellow', text: 'Semi-absentee ownership is possible, but the brand prefers hands-on operators early.' } : null,
                      ].filter(Boolean)} />
                    </StepLayout>
                  )}

                  {step === 3 && (
                    <StepLayout
                      eyebrow="Step 4"
                      title="Financial Readiness"
                      description="Straight talk: this is the step that filters most applicants. We need to know you can launch strong. All information is kept confidential."
                    >
                      <SelectInput label="What is your estimated liquid capital available for investment?" value={form.liquidCapital} onChange={(value) => setField('liquidCapital', value)} options={capitalOptions} error={errors.liquidCapital} />
                      <RadioCards label="Are you open to financing options (e.g., truck leasing)?" value={form.financing} onChange={(value) => setField('financing', value)} options={financingOptions} error={errors.financing} />
                      <RadioCards label="Do you have a minimum credit score of 680+?" value={form.creditScore} onChange={(value) => setField('creditScore', value)} options={creditOptions} error={errors.creditScore} />
                      <RadioCards label="Have you reviewed a Franchise Disclosure Document (FDD) before?" value={form.fddReviewed} onChange={(value) => setField('fddReviewed', value)} options={fddOptions} error={errors.fddReviewed} />
                      <FlagHints items={[
                        form.liquidCapital === 'Under $50,000' ? { tone: 'red', text: 'Under $50K is currently below the expected starting range for franchise fee plus truck costs.' } : null,
                        form.liquidCapital === '$50,000-$75,000' ? { tone: 'yellow', text: 'This range may still work with financing, but it is a tighter starting position.' } : null,
                        form.creditScore === 'No' || form.creditScore === 'Not sure' ? { tone: 'yellow', text: 'Credit readiness may need follow-up before moving to the next phase.' } : null,
                      ].filter(Boolean)} />
                    </StepLayout>
                  )}

                  {step === 4 && (
                    <StepLayout
                      eyebrow="Step 5"
                      title="Market & Availability"
                      description="Market conviction matters. We want to see both local enthusiasm and realistic readiness."
                    >
                      <RadioCards label="Do you have existing personal or business connections in your target market?" value={form.marketConnections} onChange={(value) => setField('marketConnections', value)} options={marketConnectionOptions} error={errors.marketConnections} />
                      <TextAreaInput label="Why does your target market excite you?" value={form.marketWhy} onChange={(value) => setField('marketWhy', value)} error={errors.marketWhy} rows={4} placeholder="Share local demand, personal ties, growth potential, or why you believe Juiced Fuel can win there." />
                      <SelectInput label="When are you looking to launch?" value={form.timeline} onChange={(value) => setField('timeline', value)} options={timelineOptions} error={errors.timeline} />
                      <RadioCards label="Training happens at our Charleston, SC headquarters (typically 3-5 days). Can you make that work?" value={form.training} onChange={(value) => setField('training', value)} options={trainingOptions} error={errors.training} />
                      <FlagHints items={[
                        form.timeline === 'Just exploring for now' ? { tone: 'yellow', text: 'Exploratory timing can still be a fit, but it usually points to a slower path.' } : null,
                        form.training === 'This would be difficult' ? { tone: 'red', text: 'In-person training at headquarters is a required part of launch readiness.' } : null,
                      ].filter(Boolean)} />
                    </StepLayout>
                  )}

                  {step === 5 && (
                    <StepLayout
                      eyebrow="Step 6"
                      title='The "Why" Question'
                      description="Last step before we review. This is where we see if the values match - not just the numbers."
                    >
                      <TextAreaInput label="Why do you want to be a Juiced Fuel franchisee?" value={form.franchiseWhy} onChange={(value) => setField('franchiseWhy', value)} error={errors.franchiseWhy} rows={5} helper={`${form.franchiseWhy.trim().length}/50 minimum characters`} />
                      <TextAreaInput label="How would you get your first 50 customers in your market? Give us your rough game plan." value={form.first50plan} onChange={(value) => setField('first50plan', value)} error={errors.first50plan} rows={4} placeholder="Example: I'd partner with local marinas, hit up HOA communities, sponsor a little league team..." />
                      <RadioCards label="Are you comfortable with door-to-door or direct community outreach in the early days?" value={form.outreach} onChange={(value) => setField('outreach', value)} options={outreachOptions} error={errors.outreach} />
                      <FlagHints items={[
                        form.outreach === "I'd prefer not to" ? { tone: 'red', text: 'Early traction depends heavily on grassroots local outreach and community presence.' } : null,
                      ].filter(Boolean)} />
                    </StepLayout>
                  )}

                  {step === 6 && (
                    <StepLayout
                      eyebrow="Step 7"
                      title="Summary & Submission"
                      description="Here’s how your current application stacks up based on the operational signals Juiced Fuel cares about most."
                    >
                      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                        <div className="rounded-[28px] border border-[#1A1A1A]/10 bg-[#FFF9F4] p-5 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A1A]/45">Applicant Snapshot</p>
                              <h3 className="mt-1 text-2xl font-bold text-[#1A1A1A]">{form.fullName || 'Prospective Franchisee'}</h3>
                            </div>
                            <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]/55 shadow-sm">
                              Ready to submit
                            </div>
                          </div>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <SummaryItem label="Location" value={form.territoryInterest === "Other - my market isn't listed" ? form.cityStateOther : form.territoryInterest} />
                            <SummaryItem label="Capital Range" value={form.liquidCapital} />
                            <SummaryItem label="Timeline" value={form.timeline} />
                            <SummaryItem label="Owner Type" value={form.ownerType} />
                            <SummaryItem label="Training" value={form.training} />
                            <SummaryItem label="Outreach" value={form.outreach} />
                          </div>
                        </div>

                        <div className={`rounded-[28px] border p-6 shadow-sm ${scoreTone.panel}`}>
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A1A]/50">Qualification Score</p>
                          <div className="mt-5 flex flex-col items-center gap-4 text-center">
                            <ScoreRing percent={meterProgress} value={scorecard.totalPoints} color={scoreTone.ring} />
                            <div className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${scoreTone.badge}`}>
                              {scorecard.rating}
                            </div>
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#1A1A1A]/40">
                              {scorecard.totalPoints}/65 points
                            </p>
                            <p className="max-w-md text-sm leading-7 text-[#1A1A1A]/70">{scorecard.explanation}</p>
                            <p className="rounded-2xl bg-white/70 px-4 py-3 text-sm leading-7 text-[#1A1A1A]/75">{scorecard.message}</p>
                          </div>
                          <div className="mt-6 grid gap-3">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#1A1A1A]/50">What we're evaluating</p>
                            {scorecard.items.map((item) => (
                              <div key={item.name} className="flex items-start justify-between gap-3 rounded-2xl bg-white/80 px-4 py-3">
                                <div>
                                  <p className="font-semibold text-[#1A1A1A]">{item.name}</p>
                                  <p className="text-sm text-[#1A1A1A]/60">{item.reason}</p>
                                </div>
                                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${
                                  item.status === 'green'
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : item.status === 'yellow'
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-red-100 text-red-700'
                                }`}>
                                  +{item.points}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </StepLayout>
                  )}

                  <WizardFooter step={step} onBack={handleBack} onNext={handleNext} onSubmit={() => setSubmitted(true)} />
                </div>
              )}
            </section>
          </main>

          <footer className="mt-6 pb-1 text-center text-sm font-medium text-[#1A1A1A]/55">
            Juiced Fuel © 2026 | Powered by Jatotech
          </footer>
        </div>
      </div>
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <div className="inline-flex rounded-full border border-[#FF6B1A]/20 bg-[#FF6B1A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#FF6B1A]">
          Franchise Application
        </div>
        <h2 className="mt-5 max-w-2xl text-[2.2rem] font-bold leading-[1.02] tracking-[-0.05em] text-[#1A1A1A] sm:text-5xl">
          We're not for everyone. And that's the point.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[#1A1A1A]/70 sm:text-lg">
          Juiced Fuel is the nation's first B2C fuel delivery franchise. We've delivered 500,000+ gallons, awarded 24+ territories, and crossed $1M in Charleston revenue. We're growing fast, but we're selective about who carries this brand. This application takes about 5 minutes. If you're serious, let's see if we're a match.
        </p>
        <button
          type="button"
          className="mt-7 min-h-14 rounded-[22px] bg-[#FF6B1A] px-7 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-[#FF6B1A]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e85d10] focus:outline-none focus:ring-4 focus:ring-[#FF6B1A]/25"
        >
          Start Application
        </button>
        <div className="mt-7 grid gap-3 sm:max-w-xl sm:grid-cols-3">
          {statCards.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-[#1A1A1A]/8 bg-white px-4 py-4 shadow-sm">
              <p className="text-2xl font-bold tracking-[-0.04em] text-[#FF6B1A]">{stat.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#1A1A1A]/55">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-[#1A1A1A]/10 bg-[linear-gradient(180deg,#1A1A1A,#2a211c)] p-5 text-white shadow-[0_30px_70px_rgba(26,26,26,0.18)] sm:p-6">
        <div className="rounded-[24px] border border-[#FFB387]/20 bg-[linear-gradient(180deg,rgba(255,107,26,0.18),rgba(255,255,255,0.05))] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#FFD1B6]">What Caroline is really looking for</p>
          <p className="mt-4 text-base leading-8 text-white/92 sm:text-lg">
            Coachable. Present. Willing to hustle in your market. Ready to treat this like your business, not a side project.
          </p>
        </div>
      </div>
    </div>
  )
}

function StepLayout({ eyebrow, title, description, children }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#FF6B1A]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em] text-[#1A1A1A] sm:text-4xl">{title}</h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-[#1A1A1A]/68 sm:text-base">{description}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  )
}

function TextInput({ label, value, onChange, error, required, type = 'text', placeholder }) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`min-h-14 w-full rounded-[22px] border bg-[#fffdfa] px-4 py-3 text-base text-[#1A1A1A] outline-none transition-all duration-200 placeholder:text-[#1A1A1A]/35 focus:border-[#FF6B1A] focus:bg-white focus:ring-4 focus:ring-[#FF6B1A]/15 ${
          error ? 'border-red-300' : 'border-[#1A1A1A]/12'
        }`}
      />
      <FieldError error={error} />
    </label>
  )
}

function SelectInput({ label, value, onChange, options, error, required }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return undefined

    const originalOverflow = document.body.style.overflow
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className="block">
      <FieldLabel label={label} required={required} />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`min-h-14 w-full rounded-[22px] border bg-[#fffdfa] px-4 py-3 text-base text-[#1A1A1A] outline-none transition-all duration-200 focus:border-[#FF6B1A] focus:bg-white focus:ring-4 focus:ring-[#FF6B1A]/15 ${
          error ? 'border-red-300' : 'border-[#1A1A1A]/12'
        }`}
      >
        <span className="flex items-center justify-between gap-4">
          <span className={`text-left ${value ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]/35'}`}>
            {value || 'Select an option'}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-[#1A1A1A]/45" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <FieldError error={error} />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1A1A1A]/45 p-3 sm:p-6">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative max-h-[82vh] w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,#fffaf6,#ffffff)] shadow-[0_30px_90px_rgba(26,26,26,0.22)]">
            <div className="border-b border-[#1A1A1A]/8 px-5 py-4 sm:px-6">
              <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-[#1A1A1A]/10" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FF6B1A]">
                    Choose One
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-[#1A1A1A]">
                    {label}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-[#1A1A1A]/10 bg-white px-3 py-2 text-sm font-medium text-[#1A1A1A]/60 transition-all hover:border-[#FF6B1A] hover:text-[#FF6B1A]"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="max-h-[58vh] overflow-y-auto px-4 py-4 sm:px-5">
              <div className="grid gap-3">
                {options.map((option) => {
                  const selected = value === option
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        onChange(option)
                        setIsOpen(false)
                      }}
                      className={`group relative overflow-hidden rounded-[24px] border px-4 py-4 text-left transition-all duration-200 ${
                        selected
                          ? 'border-[#FF6B1A] bg-[linear-gradient(135deg,#fff1e7,#ffffff)] shadow-[0_18px_40px_rgba(255,107,26,0.14)]'
                          : 'border-[#1A1A1A]/10 bg-white hover:-translate-y-0.5 hover:border-[#FF6B1A]/35 hover:shadow-[0_14px_30px_rgba(26,26,26,0.07)]'
                      }`}
                    >
                      <span
                        className={`absolute inset-x-0 top-0 h-1 ${
                          selected ? 'bg-[#FF6B1A]' : 'bg-transparent'
                        }`}
                      />
                      <span className="flex items-center justify-between gap-4">
                        <span className="text-sm font-semibold leading-6 text-[#1A1A1A] sm:text-base">
                          {option}
                        </span>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? 'border-[#FF6B1A] bg-[#FF6B1A] text-white'
                              : 'border-[#1A1A1A]/10 bg-[#fff8f2] text-transparent'
                          }`}
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                            <path d="m5 12 4.2 4.2L19 6.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TextAreaInput({ label, value, onChange, error, rows = 4, placeholder, helper }) {
  return (
    <label className="block">
      <FieldLabel label={label} />
      <textarea
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-[22px] border bg-[#fffdfa] px-4 py-3 text-base text-[#1A1A1A] outline-none transition-all duration-200 placeholder:text-[#1A1A1A]/35 focus:border-[#FF6B1A] focus:bg-white focus:ring-4 focus:ring-[#FF6B1A]/15 ${
          error ? 'border-red-300' : 'border-[#1A1A1A]/12'
        }`}
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <FieldError error={error} />
        {helper ? <span className="text-sm text-[#1A1A1A]/45">{helper}</span> : null}
      </div>
    </label>
  )
}

function RadioCards({ label, value, onChange, options, error }) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`group relative overflow-hidden rounded-[26px] border text-left transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[#FF6B1A]/15 ${
                selected
                  ? 'border-[#FF6B1A] bg-[linear-gradient(135deg,#fff1e7,#ffffff)] shadow-[0_18px_40px_rgba(255,107,26,0.16)]'
                  : 'border-[#1A1A1A]/12 bg-[linear-gradient(180deg,#fffdfa,#fff7f0)] hover:border-[#FF6B1A]/35 hover:shadow-[0_14px_30px_rgba(26,26,26,0.06)]'
              }`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-1 transition-all ${
                  selected ? 'bg-[#FF6B1A]' : 'bg-transparent group-hover:bg-[#FF6B1A]/30'
                }`}
              />
              <span className="flex min-h-16 items-center justify-between gap-3 px-4 py-4">
                <span className="pr-2">
                  <span className="block text-sm font-semibold leading-6 text-[#1A1A1A]">
                    {option}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#1A1A1A]/45">
                    Tap to select this answer
                  </span>
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${
                    selected
                      ? 'border-[#FF6B1A] bg-[#FF6B1A] text-white shadow-md shadow-[#FF6B1A]/25'
                      : 'border-[#1A1A1A]/12 bg-white text-transparent group-hover:border-[#FF6B1A]/40'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="m5 12 4.2 4.2L19 6.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </span>
            </button>
          )
        })}
      </div>
      <FieldError error={error} />
    </div>
  )
}

function FlagHints({ items }) {
  if (!items.length) return null

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item.text}
          className={`rounded-2xl border px-4 py-3 text-sm leading-7 ${
            item.tone === 'green'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : item.tone === 'yellow'
                ? 'border-orange-200 bg-orange-50 text-orange-800'
                : 'border-red-200 bg-red-50 text-red-800'
          }`}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}

function WizardFooter({ step, onBack, onNext, onSubmit }) {
  return (
    <div className="sticky bottom-0 z-20 mt-8 rounded-[28px] border border-[#1A1A1A]/10 bg-white/96 px-3 py-3 shadow-[0_-10px_40px_rgba(26,26,26,0.05)] backdrop-blur sm:px-4 sm:py-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className={`min-h-14 w-full rounded-[22px] border px-5 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF6B1A]/15 sm:min-h-12 sm:w-auto ${
            step === 0
              ? 'invisible'
              : 'border-[#1A1A1A]/12 bg-white text-[#1A1A1A] hover:-translate-y-0.5 hover:border-[#FF6B1A]/35'
          }`}
        >
          Back
        </button>
        {step < TOTAL_STEPS - 1 ? (
          <button
            type="button"
            onClick={onNext}
            className="min-h-14 w-full rounded-[22px] bg-[#FF6B1A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#FF6B1A]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e85d10] focus:outline-none focus:ring-4 focus:ring-[#FF6B1A]/25 sm:min-h-12 sm:w-auto"
          >
            {step === 0 ? 'Start Application' : 'Next Step'}
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="min-h-14 w-full rounded-[22px] bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1A1A1A]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black focus:outline-none focus:ring-4 focus:ring-[#1A1A1A]/15 sm:min-h-12 sm:w-auto"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  )
}

function ScoreRing({ percent, value, color }) {
  const radius = 74
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (percent / 100) * circumference
  const scoreLabel = value >= 50 ? 'STRONG' : value >= 30 ? 'REVIEW' : 'LOW'

  return (
    <div className="relative flex h-52 w-52 items-center justify-center">
      <svg className="h-52 w-52 -rotate-90" viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r={radius} stroke="rgba(26,26,26,0.08)" strokeWidth="14" fill="none" />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke={color}
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-black tracking-[0.16em] text-[#1A1A1A]">{scoreLabel}</div>
        <div className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#1A1A1A]/45">Qualification Score</div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="rounded-[22px] border border-[#1A1A1A]/8 bg-white px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/45">{label}</p>
      <p className="mt-2 text-base font-semibold text-[#1A1A1A]">{value || 'Not provided'}</p>
    </div>
  )
}

function ConfirmationScreen() {
  const pieces = Array.from({ length: 18 }, (_, index) => ({
    id: index,
    left: `${5 + index * 5}%`,
    delay: `${(index % 6) * 0.3}s`,
    duration: `${4 + (index % 4)}s`,
    drift: `${(index % 2 === 0 ? 1 : -1) * (20 + index * 2)}px`,
    color: ['#FF6B1A', '#1A1A1A', '#FFB387'][index % 3],
  }))

  return (
    <div className="relative overflow-hidden px-5 py-16 text-center sm:px-8 sm:py-24">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-0 h-4 w-3 rounded-full"
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animationDelay: piece.delay,
            animationDuration: piece.duration,
            '--drift': piece.drift,
          }}
        />
      ))}
      <div className="mx-auto max-w-2xl rounded-[34px] border border-[#1A1A1A]/10 bg-[#FFF9F4] px-6 py-10 shadow-[0_24px_70px_rgba(26,26,26,0.08)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FF6B1A] text-white shadow-lg shadow-[#FF6B1A]/30">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#FF6B1A]">Application Received</p>
        <h2 className="mt-3 text-4xl font-bold tracking-[-0.05em] text-[#1A1A1A]">Keep an eye on your inbox.</h2>
        <p className="mt-4 text-base leading-8 text-[#1A1A1A]/68">
          Your franchise pre-qualification form has been received. If your profile feels aligned, the Juiced Fuel team will follow up with warmth, clarity, and next steps.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://instagram.com/juicedfuel" target="_blank" rel="noreferrer" className="rounded-full border border-[#1A1A1A]/10 bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 transition-all hover:border-[#FF6B1A] hover:text-[#FF6B1A]">
            Follow on Instagram
          </a>
          <a href="https://juicedfuel.com" target="_blank" rel="noreferrer" className="rounded-full border border-[#1A1A1A]/10 bg-white px-4 py-2 text-sm font-medium text-[#1A1A1A]/70 transition-all hover:border-[#FF6B1A] hover:text-[#FF6B1A]">
            Visit juicedfuel.com
          </a>
        </div>
      </div>
    </div>
  )
}

function FieldLabel({ label, required }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="text-sm font-semibold text-[#1A1A1A]">{label}</span>
      {required ? (
        <span className="rounded-full bg-[#FF6B1A]/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF6B1A]">
          Required
        </span>
      ) : null}
    </div>
  )
}

function FieldError({ error }) {
  if (!error) return null
  return <p className="mt-2 text-sm font-medium text-red-600">{error}</p>
}

function FuelPumpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M7 21v-3m0-9V5.5A1.5 1.5 0 0 1 8.5 4h5A1.5 1.5 0 0 1 15 5.5V21m-8-8h8m-8 0v5h8v-5m5-5v8a2 2 0 0 1-2 2h-1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m16 6 2 2m0 0 1.5 1.5A2 2 0 0 1 20 10.9V12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default App
