// ── Freedom 250 — Data Layer ──────────────────────────────────────────────────
// All event data in one place. Swap for real API endpoints when ready.

const TARGET_DATE = new Date('2026-06-10T00:00:00')
const TODAY       = new Date('2026-04-14')  // pin for consistent demo; remove in prod

export function getCountdown() {
  const diff = Math.max(0, TARGET_DATE - new Date())
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  /    60_000),
    seconds: Math.floor((diff %    60_000)  /     1_000),
  }
}

// ── Event Overview ───────────────────────────────────────────────────────────

export function getEventDetails() {
  return {
    name:       'Freedom 250 Celebration',
    host:       'US Embassy Tashkent',
    date:       '2026-06-10',
    location:   'Outdoor Terrace & Grounds, Uzexpocentre',
    city:       'Tashkent, Uzbekistan',
    attendance: '2,000+',
    description:
      "A massive outdoor festival celebrating America's 250th Anniversary. " +
      "The Uzexpocentre grounds will be transformed into a turnkey concert and " +
      "high-end celebration space featuring live musical performances, speeches, " +
      "and video presentations.",
    highlights: [
      {
        icon: '🎤',
        title: 'Live Concert',
        detail: '12m × 10m stage, curated local acts with diplomatic collaboration history, opening act + headliner, DJ spinning Top 40 / Classic Rock / Pop.',
      },
      {
        icon: '🍔',
        title: 'Food Court',
        detail: 'Bistro-lit terrace with picnic seating. KFC, Coca-Cola, plus an Uzbek Ethnic Food station with traditional Ikat and Adras fabrics.',
      },
      {
        icon: '🏛️',
        title: 'Freedom 250 Décor',
        detail: 'Grand Entrance archway, red-white-blue pleated bunting around the full venue perimeter, "America 250" flags.',
      },
      {
        icon: '⭐',
        title: 'VIP / VVIP',
        detail: "Red-carpet arrival, luxury lounge, premium carpeting, shaded high-peak marquees, plated hors d'oeuvres, professional waitstaff.",
      },
    ],
  }
}

// ── Procurement / Contracts ──────────────────────────────────────────────────

export function getContracts() {
  return [
    {
      id: 'av-stage',
      name: 'AV & Stage',
      status: 'awarded',
      statusLabel: 'Awarded',
      icon: '🎛️',
      description: 'Audio visual, LED IMAG screens, 12m×10m stage, intelligent lighting, festival-grade PA, DJ booth',
      awardDate: '2026-04-10',
      deliverables: [
        '12m × 10m outdoor stage with truss',
        'High-resolution LED IMAG screens (2)',
        'Intelligent stage lighting rig',
        'Festival-grade PA system',
        'DJ booth & monitoring',
        'Backup AV components',
      ],
      nextStep: 'Finalize stage design & lighting plot by Apr 25',
    },
    {
      id: 'event-mgmt',
      name: 'Event Management',
      status: 'in-progress',
      statusLabel: 'Awarding Soon',
      icon: '📋',
      description: 'Full event production — coordination, staffing, décor installation, Grand Entrance arch, day-of management',
      targetAward: '2026-04-21',
      deliverables: [
        'Event coordination & production management',
        'On-site staffing (50+ crew)',
        'Grand Entrance branded archway',
        'Décor: bunting, flags, signage, Ikat station styling',
        'Day-of stage management',
        'Vendor load-in / strike coordination',
      ],
      nextStep: 'Evaluate final proposals; target award by Apr 21',
    },
    {
      id: 'artists',
      name: 'Artists & Entertainment',
      status: 'in-progress',
      statusLabel: 'In Discussions',
      icon: '🎵',
      description: 'Headliner, opening act, DJ, and National Anthem performers (US + Uzbekistan anthems)',
      targetAward: '2026-04-28',
      deliverables: [
        'Headliner act (1) — 45-minute set',
        'Opening act (1) — 30-minute set',
        'DJ — warm-up + open-format sets (3+ hours total)',
        'National Anthem: Republic of Uzbekistan vocalist',
        'National Anthem: United States vocalist',
      ],
      nextStep: 'Confirm headliner MOU; shortlist opening act by Apr 21',
    },
    {
      id: 'power',
      name: 'Power & Generator',
      status: 'not-started',
      statusLabel: 'Not Yet Sourced',
      icon: '⚡',
      description: 'Primary + backup generators for stage, AV, lighting, food court, and VIP areas',
      targetAward: '2026-04-21',
      deliverables: [
        'Primary generator (sufficient for full stage + AV + lighting)',
        'Backup / redundancy generator',
        'Distribution panels & breaker boxes',
        'Cable runs to stage, food court, VIP',
        'On-site power technician during event',
      ],
      nextStep: 'Source vendors & request quotes immediately — CRITICAL',
    },
  ]
}

// ── 8-Week Countdown Timeline ────────────────────────────────────────────────

export function getTimeline() {
  return [
    {
      week: 1,
      label: 'Contract Awards & Kickoff',
      dates: 'Apr 14 – 20',
      phase: 'current',
      tasks: [
        { task: 'Award Event Management contract',                              status: 'in-progress', critical: true  },
        { task: 'Source & contract power/generator vendor',                     status: 'not-started', critical: true  },
        { task: 'Finalize artist contracts — headliner + opening act',          status: 'in-progress', critical: true  },
        { task: 'Confirm DJ booking & contract',                                status: 'in-progress', critical: false },
        { task: 'Begin drafting minute-by-minute program rundown',              status: 'not-started', critical: true  },
        { task: 'Compile initial guest list (VIP, VVIP, General)',              status: 'not-started', critical: false },
        { task: 'Design invitations — digital & printed versions',              status: 'not-started', critical: false },
        { task: 'Schedule security planning meeting with RSO',                  status: 'not-started', critical: true  },
      ],
    },
    {
      week: 2,
      label: 'Planning & Design',
      dates: 'Apr 21 – 27',
      phase: 'upcoming',
      tasks: [
        { task: 'Event Management company kickoff meeting',                     status: 'not-started', critical: true  },
        { task: 'Finalize stage design & layout with AV contractor',            status: 'not-started', critical: true  },
        { task: 'Lighting plot & sound design review',                          status: 'not-started', critical: false },
        { task: 'Finalize décor concept — Grand Entrance arch, bunting, flags', status: 'not-started', critical: false },
        { task: 'Food court layout & menu approval (KFC, Coke, Uzbek station)', status: 'not-started', critical: false },
        { task: 'VIP / VVIP zone layout & furniture plan',                      status: 'not-started', critical: false },
        { task: 'Select & confirm MC / host',                                   status: 'not-started', critical: false },
        { task: 'Begin distributing invitations',                               status: 'not-started', critical: false },
      ],
    },
    {
      week: 3,
      label: 'Pre-Production',
      dates: 'Apr 28 – May 4',
      phase: 'upcoming',
      tasks: [
        { task: 'Complete minute-by-minute program rundown — FULL DRAFT',       status: 'not-started', critical: true  },
        { task: "Draft Ambassador's welcoming remarks",                         status: 'not-started', critical: false },
        { task: 'Approve performer set lists — opening act & headliner',        status: 'not-started', critical: false },
        { task: 'Confirm National Anthem performers (US + Uzbekistan)',          status: 'not-started', critical: true  },
        { task: 'Create vendor load-in & strike schedule',                      status: 'not-started', critical: false },
        { task: 'Security walk-through at Uzexpocentre with RSO',               status: 'not-started', critical: true  },
        { task: 'Contract photographer & videographer',                         status: 'not-started', critical: false },
        { task: 'Submit permit applications to Tashkent city authorities',      status: 'not-started', critical: true  },
      ],
    },
    {
      week: 4,
      label: 'Coordination Sprint',
      dates: 'May 5 – 11',
      phase: 'upcoming',
      tasks: [
        { task: 'All-vendor production meeting (AV, Event Mgmt, Catering, Power)', status: 'not-started', critical: true  },
        { task: 'Power infrastructure test at venue',                            status: 'not-started', critical: true  },
        { task: 'General admission RSVP deadline',                               status: 'not-started', critical: false },
        { task: 'First draft VIP / VVIP guest list for Ambassador review',       status: 'not-started', critical: false },
        { task: 'Launch social media countdown campaign',                        status: 'not-started', critical: false },
        { task: 'Begin volunteer recruitment',                                   status: 'not-started', critical: false },
        { task: 'Arrange medical / first-aid coverage',                          status: 'not-started', critical: false },
        { task: 'Finalize transportation & parking plan',                        status: 'not-started', critical: false },
      ],
    },
    {
      week: 5,
      label: 'Rehearsal Planning',
      dates: 'May 12 – 18',
      phase: 'upcoming',
      tasks: [
        { task: 'Full venue walkthrough — all vendors present',                  status: 'not-started', critical: true  },
        { task: 'Review technical riders with all performers',                   status: 'not-started', critical: true  },
        { task: 'Create sound-check schedule for all acts',                      status: 'not-started', critical: false },
        { task: 'Prepare & load LED screen content (videos, logos, graphics)',   status: 'not-started', critical: false },
        { task: 'Confirm all décor materials ordered and delivery dates',        status: 'not-started', critical: false },
        { task: 'Finalize waste management & cleanup plan',                      status: 'not-started', critical: false },
      ],
    },
    {
      week: 6,
      label: 'Final Lock',
      dates: 'May 19 – 25',
      phase: 'upcoming',
      tasks: [
        { task: 'VIP / VVIP guest list FINALIZED — no changes after this',       status: 'not-started', critical: true  },
        { task: 'VVIP protocol briefing for all staff',                          status: 'not-started', critical: true  },
        { task: 'Program rundown FINAL — approved by Ambassador',                status: 'not-started', critical: true  },
        { task: 'Distribute rehearsal schedule to all parties',                  status: 'not-started', critical: false },
        { task: 'All Tashkent city permits confirmed & in hand',                 status: 'not-started', critical: true  },
        { task: 'Emergency & weather contingency plan finalized',                status: 'not-started', critical: false },
        { task: "Ambassador's speech finalized & loaded to teleprompter",        status: 'not-started', critical: false },
      ],
    },
    {
      week: 7,
      label: 'Pre-Build',
      dates: 'May 26 – Jun 1',
      phase: 'upcoming',
      tasks: [
        { task: 'All décor materials delivered to Uzexpocentre',                 status: 'not-started', critical: true  },
        { task: 'AV equipment pre-check & staging in warehouse',                 status: 'not-started', critical: true  },
        { task: 'Generator delivered & power testing at venue',                  status: 'not-started', critical: true  },
        { task: 'Catering dry run — all vendors prepare sample menus',           status: 'not-started', critical: false },
        { task: 'Volunteer briefing & role assignments distributed',             status: 'not-started', critical: false },
        { task: 'Media accreditation deadline',                                  status: 'not-started', critical: false },
      ],
    },
    {
      week: 8,
      label: 'Build Week & Showtime',
      dates: 'Jun 2 – 10',
      phase: 'upcoming',
      tasks: [
        { task: 'Jun 2–3: Stage construction at Uzexpocentre',                  status: 'not-started', critical: true  },
        { task: 'Jun 4: Primary & backup generators installed, power live',      status: 'not-started', critical: true  },
        { task: 'Jun 5: AV, LED screens, lighting rig installed',               status: 'not-started', critical: true  },
        { task: 'Jun 6: Décor, food court, VIP zone full build-out',            status: 'not-started', critical: true  },
        { task: 'Jun 7: FULL TECHNICAL REHEARSAL — all systems, all acts',      status: 'not-started', critical: true  },
        { task: 'Jun 8: DRESS REHEARSAL — complete run-through, final punch',   status: 'not-started', critical: true  },
        { task: 'Jun 9: Final inspection, sound checks, catering load-in',      status: 'not-started', critical: true  },
        { task: 'Jun 10: 🇺🇸 FREEDOM 250 — SHOWTIME 🎉',                       status: 'not-started', critical: true  },
      ],
    },
  ]
}

// ── Draft Program Rundown ────────────────────────────────────────────────────

export function getProgramRundown() {
  return {
    status: 'draft',
    lastUpdated: '2026-04-14',
    note: 'Subject to change. Final version requires Ambassador approval by May 25.',
    blocks: [
      { time: '15:00', duration: '30 min', item: 'Venue opens — VIP / VVIP early arrival & red carpet',               category: 'logistics'     },
      { time: '15:30', duration: '—',      item: 'General admission gates open',                                       category: 'logistics'     },
      { time: '15:30', duration: '60 min', item: 'DJ warm-up set — American classics, Top 40, crowd build',           category: 'entertainment' },
      { time: '16:30', duration: '5 min',  item: 'MC welcome & Freedom 250 introduction',                              category: 'ceremony'      },
      { time: '16:35', duration: '3 min',  item: '🇺🇿  National Anthem — Republic of Uzbekistan',                      category: 'ceremony'      },
      { time: '16:38', duration: '3 min',  item: '🇺🇸  National Anthem — United States of America',                    category: 'ceremony'      },
      { time: '16:41', duration: '15 min', item: "Ambassador's Welcoming Remarks",                                     category: 'ceremony'      },
      { time: '16:56', duration: '10 min', item: 'Distinguished Guest Remarks (Uzbek officials)',                       category: 'ceremony'      },
      { time: '17:06', duration: '10 min', item: 'America 250 Video Presentation — LED screens',                       category: 'ceremony'      },
      { time: '17:16', duration: '4 min',  item: 'MC introduces Opening Act',                                          category: 'ceremony'      },
      { time: '17:20', duration: '30 min', item: '🎤  OPENING ACT — Live Performance',                                category: 'entertainment' },
      { time: '17:50', duration: '10 min', item: 'MC interlude — sponsor acknowledgments, cultural moment',            category: 'ceremony'      },
      { time: '18:00', duration: '45 min', item: '🎤  HEADLINER — Main Performance',                                  category: 'entertainment' },
      { time: '18:45', duration: '15 min', item: 'DJ transition set',                                                  category: 'entertainment' },
      { time: '19:00', duration: '15 min', item: '🥂  Freedom 250 Toast & Anniversary Celebration Moment',             category: 'ceremony'      },
      { time: '19:15', duration: '75 min', item: 'DJ set — open format American hits, dance floor open',               category: 'entertainment' },
      { time: '20:30', duration: '—',      item: 'Event closes — orderly guest departure begins',                      category: 'logistics'     },
    ],
  }
}

// ── Progress / Workstreams ───────────────────────────────────────────────────

export function getStats() {
  return {
    attendance:  { value: '2,000+',  change: 'Expected guests' },
    contracts:   { value: '1 of 4',  change: 'Awarded'         },
    daysLeft:    { value: '56',      change: 'Until showtime'  },
    critical:    { value: '4',       change: 'Actions this wk' },
  }
}

export function getProgress() {
  return {
    overall: 28,
    initiatives: [
      { id: 1, name: 'AV & Stage',              progress: 70, status: 'ahead',    owner: 'AV Contractor',   deadline: 'Jun 8',  note: 'Contract awarded. Design & lighting plot next.' },
      { id: 2, name: 'Event Management',         progress: 25, status: 'at-risk',  owner: 'Chair (You)',     deadline: 'Apr 21', note: 'Evaluating proposals. Must award by Apr 21.' },
      { id: 3, name: 'Artists & Entertainment',   progress: 35, status: 'on-track', owner: 'Events Team',     deadline: 'Apr 28', note: 'Headliner in discussions. Opening act TBD.' },
      { id: 4, name: 'Power & Generator',         progress: 5,  status: 'at-risk',  owner: 'Chair (You)',     deadline: 'Apr 21', note: 'Not yet sourced. CRITICAL — source immediately.' },
      { id: 5, name: 'Program Rundown',           progress: 10, status: 'at-risk',  owner: 'Chair (You)',     deadline: 'May 25', note: 'Draft needed by end of Week 3. Ambassador approval by May 25.' },
      { id: 6, name: 'Guest List & Invitations',  progress: 5,  status: 'on-track', owner: 'Protocol Team',   deadline: 'May 25', note: 'Compilation not started. Invitations need design.' },
      { id: 7, name: 'Food & Catering',           progress: 40, status: 'on-track', owner: 'Catering Team',   deadline: 'May 25', note: 'KFC & Coca-Cola confirmed. Uzbek station vendor needed.' },
      { id: 8, name: 'Décor & Branding',          progress: 15, status: 'on-track', owner: 'Design Team',     deadline: 'Jun 6',  note: 'Concept phase. Pending Event Mgmt award for execution.' },
      { id: 9, name: 'VIP / VVIP Protocol',       progress: 15, status: 'on-track', owner: 'Protocol Team',   deadline: 'May 25', note: 'Red carpet, marquees, catering plan in early stages.' },
      { id: 10, name: 'Security & Logistics',     progress: 10, status: 'on-track', owner: 'RSO / Security',  deadline: 'Jun 8',  note: 'RSO meeting needed this week to start planning.' },
    ],
    milestones: [
      { id: 1, name: 'AV & Stage contract awarded',                date: '2026-04-10', status: 'completed' },
      { id: 2, name: 'KFC & Coca-Cola vendor agreements',          date: '2026-04-01', status: 'completed' },
      { id: 3, name: 'Event Management contract awarded',          date: '2026-04-21', status: 'upcoming'  },
      { id: 4, name: 'Power vendor secured',                       date: '2026-04-21', status: 'upcoming'  },
      { id: 5, name: 'All artist contracts signed',                date: '2026-04-28', status: 'upcoming'  },
      { id: 6, name: 'Program rundown complete draft',             date: '2026-05-04', status: 'upcoming'  },
      { id: 7, name: 'All-vendor production meeting',              date: '2026-05-08', status: 'upcoming'  },
      { id: 8, name: 'VIP guest list finalized',                   date: '2026-05-25', status: 'upcoming'  },
      { id: 9, name: 'Program rundown — Ambassador approved',      date: '2026-05-25', status: 'upcoming'  },
      { id: 10, name: 'Full technical rehearsal',                  date: '2026-06-07', status: 'upcoming'  },
      { id: 11, name: 'Dress rehearsal & final walk-through',      date: '2026-06-08', status: 'upcoming'  },
      { id: 12, name: '🇺🇸  FREEDOM 250 — SHOWTIME',               date: '2026-06-10', status: 'upcoming'  },
    ],
  }
}

// ── Slack Channels ───────────────────────────────────────────────────────────

export function getSlackChannels() {
  return [
    { id: 1, name: '#freedom-250-general',  description: 'Main coordination — announcements, decisions, blockers',    members: 89,  activity: 'high'   },
    { id: 2, name: '#av-stage',             description: 'AV contractor comms, stage design, tech specs, LED content', members: 18,  activity: 'high'   },
    { id: 3, name: '#event-management',     description: 'Event company coordination, staffing, décor execution',     members: 22,  activity: 'medium' },
    { id: 4, name: '#entertainment',        description: 'Artist negotiations, set lists, DJ, National Anthems',       members: 15,  activity: 'high'   },
    { id: 5, name: '#vip-protocol',         description: 'Guest list, red carpet, VIP catering, VVIP escort plan',    members: 20,  activity: 'medium' },
    { id: 6, name: '#food-vendors',         description: 'KFC, Coca-Cola, Uzbek Food station, menu approvals',        members: 12,  activity: 'medium' },
    { id: 7, name: '#power-logistics',      description: 'Generator sourcing, power distribution, cable runs',        members: 8,   activity: 'low'    },
    { id: 8, name: '#security-rso',         description: 'RSO coordination, perimeter plan, crowd management',        members: 11,  activity: 'low'    },
  ]
}

// ── Documents ────────────────────────────────────────────────────────────────

export function getDocuments() {
  return [
    { id: 1, type: 'doc',  title: 'Program Rundown (DRAFT)',         description: 'Minute-by-minute show flow — VIP arrival through event close',              updated: '2026-04-14', category: 'Program'       },
    { id: 2, type: 'doc',  title: 'Venue Layout — Uzexpocentre',     description: 'Floor plan: stage, food court, VIP zones, Grand Entrance, power runs',      updated: '2026-04-10', category: 'Logistics'     },
    { id: 3, type: 'doc',  title: 'AV & Stage Technical Specs',       description: 'Stage dimensions, PA coverage, LED specs, lighting plot, DJ booth rider',   updated: '2026-04-10', category: 'AV / Tech'     },
    { id: 4, type: 'doc',  title: 'VIP / VVIP Protocol Guide',        description: 'Red carpet procedure, seating chart, catering menu, VVIP escort plan',     updated: '2026-04-05', category: 'Protocol'      },
    { id: 5, type: 'doc',  title: 'Vendor & Catering Contracts',      description: 'Signed agreements — KFC, Coca-Cola, Uzbek Food station operator',          updated: '2026-04-01', category: 'Procurement'   },
    { id: 6, type: 'doc',  title: '8-Week Countdown Master Plan',     description: 'Week-by-week milestones, critical path, and responsibility matrix',        updated: '2026-04-14', category: 'Planning'      },
    { id: 7, type: 'link', title: 'America 250 Brand Guidelines',     description: 'Official brand colors, flag specs, logo usage, bunting standards',          updated: '2026-03-15', category: 'Design'        },
    { id: 8, type: 'doc',  title: 'Security & Emergency Plan',        description: 'Perimeter, crowd management, medical, weather contingency, evacuation',    updated: '2026-04-01', category: 'Security'      },
  ]
}

// ── Actions ──────────────────────────────────────────────────────────────────

export function getActions() {
  return [
    { id: 1, title: 'Award Event Management Contract',  description: 'Evaluate final proposals and sign — blocks décor, staffing, and day-of ops',  priority: 'high',   cta: 'Review Bids',   icon: '📋', deadline: 'Apr 21' },
    { id: 2, title: 'Secure Power / Generator Vendor',  description: 'Source quotes, select vendor, sign contract — no power = no show',             priority: 'high',   cta: 'Source Now',    icon: '⚡', deadline: 'Apr 21' },
    { id: 3, title: 'Finalize Headliner Contract',      description: 'Close MOU with headliner artist, confirm 45-min set, technical rider',        priority: 'high',   cta: 'Follow Up',     icon: '🎤', deadline: 'Apr 21' },
    { id: 4, title: 'Schedule RSO Security Meeting',    description: 'Coordinate with Regional Security Office for venue walk-through & plan',       priority: 'high',   cta: 'Schedule',      icon: '🔒', deadline: 'Apr 18' },
    { id: 5, title: 'Draft Program Rundown',            description: 'First draft of minute-by-minute event flow — VIP arrival through close',       priority: 'medium', cta: 'Start Draft',   icon: '📝', deadline: 'Apr 27' },
    { id: 6, title: 'Begin Guest List Compilation',     description: 'Coordinate with Protocol for VIP, VVIP, diplomatic corps, general guest lists', priority: 'medium', cta: 'Start List',    icon: '📨', deadline: 'Apr 27' },
  ]
}

// ── Upcoming Events ──────────────────────────────────────────────────────────

export function getUpcomingEvents() {
  return [
    { id: 1, name: 'RSO Security Planning Meeting',       date: '2026-04-18', type: 'In-Person', location: 'US Embassy',               attendees:   8 },
    { id: 2, name: 'Event Management Contract Award',     date: '2026-04-21', type: 'Internal',  location: 'Procurement',              attendees:   4 },
    { id: 3, name: 'AV Contractor Design Review',         date: '2026-04-25', type: 'In-Person', location: 'Uzexpocentre',             attendees:  12 },
    { id: 4, name: 'All-Vendor Production Meeting',       date: '2026-05-08', type: 'In-Person', location: 'Uzexpocentre',             attendees:  30 },
    { id: 5, name: 'Full Venue Walkthrough',              date: '2026-05-15', type: 'In-Person', location: 'Uzexpocentre',             attendees:  25 },
    { id: 6, name: 'Full Technical Rehearsal',            date: '2026-06-07', type: 'In-Person', location: 'Uzexpocentre',             attendees:  60 },
    { id: 7, name: 'Dress Rehearsal & Final Walk-through',date: '2026-06-08', type: 'In-Person', location: 'Uzexpocentre',             attendees:  60 },
    { id: 8, name: '🇺🇸  FREEDOM 250 — SHOWTIME',         date: '2026-06-10', type: 'In-Person', location: 'Uzexpocentre, Tashkent',  attendees: 2000 },
  ]
}
