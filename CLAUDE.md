# Tradie Radar — Claude Code Context

## Project Overview

**Tradie Radar** (tradieradar.co.uk) is an AI-powered live call answering service for tradespeople in South London. When a tradesperson can't answer, calls forward automatically to Tradie Radar after ~2 rings via conditional call forwarding — the AI answers live while the caller is still on the line.

**Price:** £99/month  
**Phase 1 focus:** Missed call capture → qualified lead. No booking, no marketplace.

---

## MANDATORY IMPLEMENTATION PROCESS

### 🚨 CRITICAL: Before ANY coding task:
1. **STOP and EXPLAIN FIRST** — Always explain what you're about to build and why
2. **GET APPROVAL** — Wait for explicit approval before writing any code
3. **ASK CLARIFYING QUESTIONS** — If anything is unclear about requirements
4. **CHECK THE PRINCIPLE** — Does this directly serve Phase 1 (missed call capture)?

### 🔄 For Every Feature Implementation (TEST-DRIVEN DEVELOPMENT MANDATORY):
1. **Explain** the purpose and technical approach
2. **Wait** for explicit approval — DO NOT PROCEED WITHOUT THIS
3. **Write tests FIRST** — Define expected behaviour before any implementation
4. **Build incrementally** — Small pieces that make tests pass
5. **Test immediately** — Verify each piece works before moving on
6. **Refactor** — Optimise once tests are passing
7. **Document** with clear comments

### 🧪 MANDATORY TDD SEQUENCE:
1. **Before coding:** Write tests that define the expected behaviour
2. **Red phase:** Run tests (they should fail initially)
3. **Green phase:** Write minimal code to make tests pass
4. **Refactor phase:** Improve code while keeping tests green
5. **Repeat** for each small increment

**NO CODE WITHOUT TESTS FIRST — THIS IS NON-NEGOTIABLE**

### 💬 Communication Requirements:
- Explain technical decisions in plain terms, not jargon
- Flag any decisions affecting timeline or cost
- Suggest simpler alternatives when complexity arises
- Always check: does this directly serve the tradesperson getting fewer missed calls?

### ⛔ VIOLATION OF THIS PROCESS IS NOT ALLOWED
If you catch yourself coding without explaining first, STOP and follow the process.

---

## Core Product Mechanics

- Tradesperson sets up **conditional call forwarding** on their mobile: if unanswered after ~2 rings, call diverts to their assigned Tradie Radar number
- The AI (Retell) **answers live** — the caller is still on the line, no voicemail, no callback delay
- AI **qualifies** the caller against the tradesperson's custom golden goose criteria
- **Golden goose jobs** (large scope, commercial, emergency, retainer) → instant SMS alert to tradesperson with caller summary
- **Low-value calls** → handled politely, lead data captured, tradesperson not interrupted

**KEY DIFFERENTIATOR:** The caller never knows they're not speaking to the tradesperson's office. The experience is seamless.

### ⚠️ Language Rules (enforced everywhere — code, comments, copy):
| ✅ Use | ❌ Never use |
|---|---|
| "answers your phone when you can't" | "calls back", "callback" |
| "picks up within 2 rings" | "returns missed calls" |
| "every call gets answered live" | "AI-powered callback system" |
| "know which calls are worth dropping tools for" | "maximise your income" |
| "answers live, within 2 rings" | "calls back within 60 seconds" |

---

## Technical Stack

| Layer | Tool | Role |
|---|---|---|
| Voice AI | **Retell AI** | Agent config, live call handling, post-call data extraction |
| Telephony | **Twilio** | One number per customer, E.164 normalisation, conditional forwarding |
| Workflow automation | **n8n** | Webhook ingestion, lead classification, Airtable writes, SMS routing |
| Data storage | **Airtable** | Customers + Calls tables, linked records, Single Select fields |
| LLM in agent | **Claude Haiku** | Cost-efficient, good instruction-following, low latency |
| Landing page | **tradieradar.co.uk** | Static site (Vercel) |
| Design | **Canva** | Flyers |

### Twilio
- One Twilio number provisioned per customer
- Calls forwarded from tradesperson's mobile to their assigned Twilio number
- Phone number normalisation to **E.164 format** implemented
- Conditional call forwarding is set up on the tradesperson's mobile (not Twilio-side)

### Retell AI
- British English receptionist voice
- Structured post-call data extraction: caller details, job specs, urgency, lead tier
- Custom system prompt per customer encoding their golden goose criteria
- Lead qualification happens **in Retell** (conversational context) — n8n only routes based on Retell's output
- Webhook event: `call_analyzed` (filter on this event type only)
- Webhook payload nesting: `body.call` (not top-level)

### n8n Workflows
- Receives webhook from Retell on `call_analyzed` event
- Extracts lead tier / golden goose flag from Retell's structured output
- Writes call record to Airtable (Calls table, linked to customer)
- If golden goose: fires SMS alert to tradesperson via Twilio
- Error handling: Gmail notification on workflow failure
- Timestamp conversion: Retell timestamps need converting before Airtable write

### Airtable
- **Customers table:** one record per tradesperson (name, Twilio number, golden goose criteria, active status)
- **Calls table:** one record per call (linked to customer, caller details, job summary, lead tier, timestamp)
- Fields use **Single Select** type aligned to Retell's extraction schema (lead tier values must match exactly)
- Linked records between Calls → Customers

### Known Resolved Issues (do not reintroduce)
- Webhook payload structure: data is nested under `body.call`, not at top level
- Event type filtering: process `call_analyzed` events only, ignore others
- Timestamp: convert from Retell format before writing to Airtable
- Airtable Single Select: field values must match schema exactly (case-sensitive)
- Phone number format: normalise to E.164 before any Twilio/Airtable operations

---

## Landing Page (tradieradar.co.uk)

### Tech
- Static HTML/CSS/JS
- Deployed to Vercel as static site (no build step)
- **Deploy command:** `vercel --prod --yes`
- **Framework preset:** Other (static, not Next.js)
- **Output directory:** `.` (root)

### Messaging Principles
- **Primary hook:** Fear of missing a golden goose job (£5k+ contract, commercial client, emergency callout)
- **Secondary hook:** Filtering — "know which calls are worth dropping tools for"
- Lead with loss framing, not feature framing
- ROI is the closer: one recovered job = months/years of service paid
- No tech jargon. No "AI-powered". Steve is a "knuckle dragger" — write for him.
- Local trust signal: "I live on [street in Clapham]"

### Hero Structure
Rotating headline format:
> *"Somewhere in your missed calls is..."*
- ...a property manager with 40 units to maintain
- ...a £50k commercial contract
- ...a customer who'll recommend you to everyone they know
- ...the last job you'll ever need to chase
- ...the one that changes everything

### Page Structure
1. **Hero** — rotating headline + primary CTA (Text AUDIT)
2. **Two problems. One solution.** — golden goose fear + call filtering use cases
3. **How it works** — 3-step: forward → AI answers → SMS alert (use live answer language)
4. **ROI proof** — one job pays for years of service
5. **Social proof** — Steve's story
6. **Pricing** — £99/month, 30-day money-back guarantee
7. **CTA** — "Text AUDIT to [number]" for free missed call audit

### CTA
- Primary: **Text AUDIT to [number]** → free missed call audit
- All CTAs lead to this same action in Phase 1
- No booking calendar on landing page in Phase 1

---

## Customer Onboarding (Phase 1 — Manual)

Each new customer requires:
1. **Questionnaire** — capture their golden goose criteria (job types, size thresholds, commercial vs residential preference)
2. **Provision Twilio number** — assign one number per customer
3. **Configure Retell agent** — write golden goose criteria directly into system prompt
4. **Set up n8n workflow** — link customer's Twilio number to their Airtable record and SMS destination
5. **Call forwarding setup** — instruct tradesperson to configure conditional forwarding on their mobile to their Twilio number
6. **Test call** — run end-to-end test before going live

---

## Go-to-Market Context (for messaging/copy tasks)

- **Primary channel:** Two-sided flyers placed on trade van door handles with branded carpenter's pencils attached
- **Target areas:** Abbeville Village, Clapham Old Town, Northcote Road, Screwfix Brixton
- **Volume:** 50 vans per Saturday morning session (8–10am)
- **Flyer sides:** Side 1 = golden goose fear; Side 2 = "know which calls are worth dropping tools for"
- **Targeting:** Trade-type agnostic for distribution; let response data guide future targeting
- **Secondary:** In-person at builder's merchants (Screwfix Brixton — 7:30–9am Saturdays)
- **12-week goal:** 40–50 customers → £3,960–4,950 MRR

### ICP
- Plumbers, heating engineers, electricians (strongest structural fit)
- Sole traders and small operators (1–5 employees)
- South London
- Overloaded/capacity-constrained segment (35–45% of trades per research)
- Pain point: fear of missing golden goose, not desire to take on more volume

---

## Phase 1 Success Metrics

| Metric | Target |
|---|---|
| Flyers placed/week | 50 |
| Flyer → text response rate | 25–30% |
| Overall flyer → customer conversion | 10–12% by Week 12 |
| Customers by Week 12 | 40–50 |
| Monthly churn | <5% |
| MRR by Week 12 | £3,960–4,950 |

**Model validation gate:** 12+ customers by Week 8 → continue scaling. <6 by Week 8 → revisit messaging/pricing/ICP.

---

## Phase 2+ (NOT current focus — do not build for these)

- Demand re-routing / overflow marketplace ("TradieRadar Network")
- Review funnel upsell (£49/month)
- Calendar/booking integration
- Geographic expansion (Birmingham, Manchester, etc.)

---

## Environment Variables

```env
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=

# Retell AI
RETELL_API_KEY=
RETELL_WEBHOOK_SECRET=

# Airtable
AIRTABLE_API_KEY=
AIRTABLE_BASE_ID=
AIRTABLE_CUSTOMERS_TABLE=
AIRTABLE_CALLS_TABLE=

# n8n
N8N_WEBHOOK_URL=

# App
APP_URL=https://tradieradar.co.uk
```

---

## Tech Debt Tracker

### 🚨 MANDATORY: Add items here when making quick decisions or skipping something for speed

- [ ] Retell agent latency — currently 2000ms+. Levers: LLM model selection, prompt length, infrastructure choice
- [ ] n8n error alerting — Gmail fallback in place; consider more robust dead-letter handling at scale
- [ ] Airtable field schema validation — currently fails silently if Single Select value doesn't match; add explicit validation in n8n before write
- [ ] Multi-customer n8n routing — current workflow assumes single customer; needs parameterisation for scale
- [ ] Twilio number provisioning — currently manual; automate via Twilio API when customer count justifies it
- [ ] Retell system prompt versioning — no change history on per-customer prompts; track manually for now
- [ ] Onboarding questionnaire — not yet built; currently ad-hoc via conversation

**RULE: Every shortcut taken must be documented here.**

---

## Key Principles for Claude Code

1. **Phase 1 only.** Don't over-engineer for Phase 2–3 features.
2. **Live answer, not callback.** Enforce correct language everywhere — in code comments, copy, and documentation.
3. **Lead qualification belongs in Retell.** n8n only routes; it doesn't re-classify.
4. **Manual onboarding is correct for now.** Don't automate the customer setup process until there are 20+ customers.
5. **Copy deliverables as copy, not embedded in HTML** — unless building the full page.
6. **Be ROI-focused.** One recovered job = months/years of service. Frame everything this way.
7. **No jargon.** Write for a plumber, not a product manager.
8. **Saturday-constrained execution.** Strategies and builds must fit weekend availability. Prefer async automation over manual steps.