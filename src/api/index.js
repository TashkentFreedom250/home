// ── Freedom 250 — Data Layer ──────────────────────────────────────────────────

const TARGET_DATE = new Date('2026-06-10T00:00:00')

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
  }
}

// ── Procurement / Contracts ──────────────────────────────────────────────────

export function getContracts() {
  return [
    {
      id: 'venue',
      name: 'Venue',
      status: 'signed',
      statusLabel: 'Signed',
      icon: '🏟️',
      cost: '$10k',
      description: 'Uzexpocentre outdoor terrace & grounds — exclusive use, setup days included',
      nextStep: 'Coordinate setup days with event management team',
    },
    {
      id: 'av-stage',
      name: 'AV & Stage',
      status: 'signed',
      statusLabel: 'Signed',
      icon: '🎛️',
      cost: '$27k',
      description: 'Stage, LED screens, PA system, lighting rig, DJ booth',
      awardDate: '2026-04-10',
      nextStep: 'Finalize stage design & lighting plot',
    },
    {
      id: 'event-mgmt',
      name: 'Event Management',
      status: 'signed',
      statusLabel: 'Signed',
      icon: '📋',
      cost: '$38k',
      description: 'Full production — tent build, staffing, décor, day-of management',
      nextStep: 'Kickoff meeting — full scope review',
    },
    {
      id: 'power',
      name: 'Power',
      status: 'awarded',
      statusLabel: 'Agreed',
      icon: '⚡',
      cost: 'Included',
      description: 'Electrical company agreed to supply 400 kW to the venue',
      awardDate: '2026-04-18',
      nextStep: 'Confirm technical specs with AV team',
    },
    {
      id: 'artists',
      name: 'Artists',
      status: 'in-progress',
      statusLabel: 'Follow-up Mon',
      icon: '🎵',
      cost: 'TBD',
      description: 'Artist management follow-up on Monday to check for any outstanding issues.',
      nextStep: 'Follow up with artist management Monday May 4',
    },
    {
      id: 'decor',
      name: 'Décor',
      status: 'in-progress',
      statusLabel: 'Planning',
      icon: '🎨',
      cost: '~$13–14k',
      description: 'Check in with décor team to assess current progress and confirm design direction.',
      nextStep: 'Check in with décor team this week',
    },
  ]
}

// ── Budget ───────────────────────────────────────────────────────────────────

export function getBudget() {
  const sources = [
    { label: 'Current-year fundraising', amount: 80, type: 'raised',    note: 'Sponsor commitments + cash raise' },
    { label: 'Embassy carryover',        amount: 40, type: 'carryover', note: 'Unused from prior fiscal year'    },
  ]
  const breakdown = [
    { label: 'Venue',            amount: 10, status: 'signed'   },
    { label: 'AV & Stage',       amount: 27, status: 'signed'   },
    { label: 'Event Management', amount: 38, status: 'signed'   },
    { label: 'Décor',            amount: 14, status: 'planning' },
    { label: 'Alcohol',          amount: 2,  status: 'planning' },
    { label: 'Misc',             amount: 5,  status: 'planning' },
  ]
  const total      = sources.reduce((s, x) => s + x.amount, 0)
  const committed  = breakdown.filter(x => x.status === 'signed').reduce((s, x) => s + x.amount, 0)
  const planned    = breakdown.filter(x => x.status === 'planning').reduce((s, x) => s + x.amount, 0)
  const remaining  = Math.max(0, total - committed - planned)

  return {
    sources,
    breakdown,
    total,
    committed,
    planned,
    remaining,
    note: 'All figures in USD thousands.',
  }
}

// ── Quick Stats ──────────────────────────────────────────────────────────────

export function getStats() {
  const diff = Math.max(0, TARGET_DATE - new Date())
  const days = Math.floor(diff / 86_400_000)
  return {
    attendance: { value: '2,000+',     change: 'Expected guests'      },
    contracts:  { value: '4 of 6',     change: 'Contracts settled'    },
    daysLeft:   { value: String(days), change: 'Days to showtime'     },
    budget:     { value: '$120k',      change: 'Mission funding'      },
  }
}

// ── Progress / Workstreams ───────────────────────────────────────────────────

export function getProgress() {
  const initiatives = [
    { id: 1,  name: 'AV & Stage',             progress: 80, status: 'on-track', owner: 'AV Contractor',  deadline: 'Jun 8',  note: 'Contract signed. Stage design & lighting plot next.' },
    { id: 2,  name: 'Venue',                   progress: 75, status: 'on-track', owner: 'Chair',          deadline: 'Done',   note: 'Contract signed at $10k. Setup days locked in.' },
    { id: 3,  name: 'Event Management',        progress: 75, status: 'on-track', owner: 'Chair',          deadline: 'Done',   note: 'Contract signed at $38k. Kickoff meeting next.' },
    { id: 4,  name: 'Artists & Entertainment', progress: 65, status: 'on-track', owner: 'Events Team',    deadline: 'May 4',  note: '6 of 8 confirmed. Follow-up with artist mgmt Monday.' },
    { id: 5,  name: 'Power',                   progress: 90, status: 'ahead',    owner: 'Chair',          deadline: 'Done',   note: 'Electrical company agreed to supply 400 kW.' },
    { id: 6,  name: 'Program Rundown',         progress: 25, status: 'at-risk',  owner: 'Chair',          deadline: 'May 10', note: 'Draft needed for Ambassador review.' },
    { id: 7,  name: 'Guest List & CRM',        progress: 15, status: 'at-risk',  owner: 'Protocol Team',  deadline: 'May 25', note: 'VIP/VVIP list compilation just starting.' },
    { id: 8,  name: 'Food & Catering',         progress: 60, status: 'on-track', owner: 'Catering Team',  deadline: 'May 25', note: 'KFC & Coca-Cola confirmed. Uzbek station TBD.' },
    { id: 9,  name: 'Décor & Branding',        progress: 35, status: 'on-track', owner: 'Décor Team',     deadline: 'Jun 6',  note: 'Planning stage. Budget ~$13–14k. Check in this week.' },
    { id: 10, name: 'Security & Logistics',    progress: 20, status: 'on-track', owner: 'RSO',            deadline: 'Jun 8',  note: 'RSO meeting to be scheduled.' },
  ]
  const overall = Math.round(
    initiatives.reduce((sum, x) => sum + x.progress, 0) / initiatives.length
  )

  return {
    overall,
    initiatives,
    milestones: [
      { id: 1,  name: 'AV & Stage contract signed',        date: '2026-04-10', status: 'completed' },
      { id: 2,  name: 'KFC & Coca-Cola agreements signed', date: '2026-04-01', status: 'completed' },
      { id: 3,  name: 'Power agreed — 400 kW from utility',date: '2026-04-18', status: 'completed' },
      { id: 4,  name: '6 of 8 artists confirmed',          date: '2026-04-18', status: 'completed' },
      { id: 5,  name: 'Venue contract signed',             date: '2026-04-25', status: 'completed' },
      { id: 6,  name: 'Event Management contract signed',  date: '2026-04-28', status: 'completed' },
      { id: 7,  name: 'All artist contracts signed',       date: '2026-05-10', status: 'upcoming'  },
      { id: 8,  name: 'Program rundown complete draft',    date: '2026-05-10', status: 'upcoming'  },
      { id: 9,  name: 'All-vendor production meeting',     date: '2026-05-08', status: 'upcoming'  },
      { id: 10, name: 'VIP guest list finalized',          date: '2026-05-25', status: 'upcoming'  },
      { id: 11, name: 'Full technical rehearsal',          date: '2026-06-07', status: 'upcoming'  },
      { id: 12, name: '🇺🇸 FREEDOM 250 — SHOWTIME',        date: '2026-06-10', status: 'upcoming'  },
    ],
  }
}

// ── 8-Week Timeline ──────────────────────────────────────────────────────────

export function getTimeline() {
  return [
    {
      week: 1,
      label: 'Contract Awards & Kickoff',
      dates: 'Apr 14 – 20',
      phase: 'current',
      tasks: [
        { task: 'A/V contract signed',                                       status: 'completed',   critical: false },
        { task: 'Power negotiated with venue',                               status: 'completed',   critical: false },
        { task: '6 of 8 artists confirmed',                                  status: 'completed',   critical: false },
        { task: 'Hash out Event Management details & finalize scope',        status: 'in-progress', critical: true  },
        { task: 'Begin CRM — compile VIP / VVIP invite list',               status: 'in-progress', critical: true  },
        { task: 'Confirm venue contract signed',                             status: 'in-progress', critical: true  },
        { task: 'Source 2 replacement artists',                             status: 'not-started', critical: true  },
        { task: 'Schedule RSO security planning meeting',                   status: 'not-started', critical: true  },
      ],
    },
    {
      week: 2,
      label: 'Planning & Design',
      dates: 'Apr 21 – 27',
      phase: 'upcoming',
      tasks: [
        { task: 'Event Management kickoff meeting — full scope review',     status: 'not-started', critical: true  },
        { task: 'Finalize stage layout & lighting plot with AV contractor', status: 'not-started', critical: true  },
        { task: 'Finalize décor concept — arch, bunting, flags',           status: 'not-started', critical: false },
        { task: 'Food court layout & menu approval',                        status: 'not-started', critical: false },
        { task: 'VIP / VVIP zone layout & furniture plan',                 status: 'not-started', critical: false },
        { task: 'Begin distributing invitations',                           status: 'not-started', critical: false },
      ],
    },
    {
      week: 3,
      label: 'Pre-Production',
      dates: 'Apr 28 – May 4',
      phase: 'upcoming',
      tasks: [
        { task: 'Complete program rundown — full draft',                    status: 'not-started', critical: true  },
        { task: 'Confirm all remaining artist contracts',                   status: 'not-started', critical: true  },
        { task: 'Security walk-through at Uzexpocentre with RSO',          status: 'not-started', critical: true  },
        { task: 'Submit permit applications',                               status: 'not-started', critical: true  },
        { task: 'Contract photographer & videographer',                    status: 'not-started', critical: false },
      ],
    },
    {
      week: 4,
      label: 'Coordination Sprint',
      dates: 'May 5 – 11',
      phase: 'upcoming',
      tasks: [
        { task: 'All-vendor production meeting at Uzexpocentre',           status: 'not-started', critical: true  },
        { task: 'VIP / VVIP guest list first draft to Ambassador',         status: 'not-started', critical: false },
        { task: 'General admission RSVP deadline',                         status: 'not-started', critical: false },
        { task: 'Volunteer recruitment begins',                            status: 'not-started', critical: false },
      ],
    },
    {
      week: 5,
      label: 'Rehearsal Planning',
      dates: 'May 12 – 18',
      phase: 'upcoming',
      tasks: [
        { task: 'Full venue walkthrough — all vendors present',            status: 'not-started', critical: true  },
        { task: 'Technical rider review with all performers',              status: 'not-started', critical: true  },
        { task: 'LED screen content prepared (videos, logos, graphics)',   status: 'not-started', critical: false },
        { task: 'All décor materials ordered with delivery dates',        status: 'not-started', critical: false },
      ],
    },
    {
      week: 6,
      label: 'Final Lock',
      dates: 'May 19 – 25',
      phase: 'upcoming',
      tasks: [
        { task: 'VIP / VVIP guest list FINAL — no changes after this',    status: 'not-started', critical: true  },
        { task: 'Program rundown FINAL — Ambassador approved',             status: 'not-started', critical: true  },
        { task: 'All permits confirmed and in hand',                       status: 'not-started', critical: true  },
        { task: 'Emergency & weather contingency plan done',               status: 'not-started', critical: false },
      ],
    },
    {
      week: 7,
      label: 'Pre-Build',
      dates: 'May 26 – Jun 1',
      phase: 'upcoming',
      tasks: [
        { task: 'All décor delivered to Uzexpocentre',                    status: 'not-started', critical: true  },
        { task: 'AV equipment pre-check & staging',                       status: 'not-started', critical: true  },
        { task: 'Catering dry run — sample menus',                        status: 'not-started', critical: false },
        { task: 'Media accreditation deadline',                           status: 'not-started', critical: false },
      ],
    },
    {
      week: 8,
      label: 'Build Week & Showtime',
      dates: 'Jun 2 – 10',
      phase: 'upcoming',
      tasks: [
        { task: 'Jun 2–3: Stage construction',                            status: 'not-started', critical: true  },
        { task: 'Jun 4: Venue power live — full test',                    status: 'not-started', critical: true  },
        { task: 'Jun 5: AV, LED screens, lighting rig installed',        status: 'not-started', critical: true  },
        { task: 'Jun 6: Décor, food court, VIP zone full build-out',     status: 'not-started', critical: true  },
        { task: 'Jun 7: FULL TECHNICAL REHEARSAL',                        status: 'not-started', critical: true  },
        { task: 'Jun 8: DRESS REHEARSAL — complete run-through',         status: 'not-started', critical: true  },
        { task: 'Jun 9: Final checks, sound, catering load-in',          status: 'not-started', critical: true  },
        { task: 'Jun 10: 🇺🇸 FREEDOM 250 — SHOWTIME 🎉',                 status: 'not-started', critical: true  },
      ],
    },
  ]
}

// ── Program Rundown ──────────────────────────────────────────────────────────

export function getProgramRundown() {
  return {
    status: 'draft',
    lastUpdated: '2026-04-18',
    note: 'Draft — subject to change. Ambassador approval required by May 25.',
    blocks: [
      { time: '15:00', duration: '30 min', item: 'Venue opens — VIP / VVIP arrival & red carpet',            category: 'logistics'     },
      { time: '15:30', duration: '—',      item: 'General admission gates open',                              category: 'logistics'     },
      { time: '15:30', duration: '60 min', item: 'DJ warm-up set — American classics, Top 40',               category: 'entertainment' },
      { time: '16:30', duration: '5 min',  item: 'MC welcome & Freedom 250 introduction',                     category: 'ceremony'      },
      { time: '16:35', duration: '3 min',  item: '🇺🇿 National Anthem — Uzbekistan',                          category: 'ceremony'      },
      { time: '16:38', duration: '3 min',  item: '🇺🇸 National Anthem — United States',                       category: 'ceremony'      },
      { time: '16:41', duration: '15 min', item: "Ambassador's Welcoming Remarks",                            category: 'ceremony'      },
      { time: '16:56', duration: '10 min', item: 'Distinguished Guest Remarks',                               category: 'ceremony'      },
      { time: '17:06', duration: '10 min', item: 'America 250 Video Presentation',                            category: 'ceremony'      },
      { time: '17:16', duration: '4 min',  item: 'MC introduces Opening Act',                                 category: 'ceremony'      },
      { time: '17:20', duration: '30 min', item: '🎤 OPENING ACT — Live Performance',                        category: 'entertainment' },
      { time: '17:50', duration: '10 min', item: 'MC interlude — acknowledgments',                            category: 'ceremony'      },
      { time: '18:00', duration: '45 min', item: '🎤 HEADLINER — Main Performance',                          category: 'entertainment' },
      { time: '18:45', duration: '15 min', item: 'DJ transition set',                                         category: 'entertainment' },
      { time: '19:00', duration: '15 min', item: '🥂 Freedom 250 Toast & Anniversary Moment',                category: 'ceremony'      },
      { time: '19:15', duration: '75 min', item: 'DJ — open format, dance floor open',                        category: 'entertainment' },
      { time: '20:30', duration: '—',      item: 'Event closes — guest departure',                            category: 'logistics'     },
    ],
  }
}

// ── Actions ──────────────────────────────────────────────────────────────────

export function getActions() {
  return [
    { id: 1,  icon: '🎵', priority: 'high',   done: false, title: 'Follow up with Artist Management',   description: 'Check Monday May 4 for any outstanding issues, contract status, or problems with the artist lineup.', deadline: 'May 4'  },
    { id: 2,  icon: '🎖️', priority: 'high',   done: false, title: 'Follow up with Marine re: Color Guard', description: 'Confirm with Marine whether the color guard is confirmed and what is needed to finalize that piece.', deadline: 'May 4'  },
    { id: 3,  icon: '🎨', priority: 'high',   done: false, title: 'Check in with Decor Team',            description: 'See how the decor is progressing. Budget targeting $13–14k. Confirm design direction and delivery schedule.', deadline: 'May 5'  },
    { id: 4,  icon: '📨', priority: 'high',   done: false, title: 'CRM — Compile VIP Invite List',       description: 'Work with Protocol to build the VIP / VVIP guest list. Diplomats, officials, partners.', deadline: 'May 10' },
    { id: 5,  icon: '📝', priority: 'medium', done: false, title: 'Begin Program Rundown Draft',         description: 'First draft of minute-by-minute event flow. Required for Ambassador review by May 25.', deadline: 'May 10' },
    { id: 6,  icon: '🔒', priority: 'medium', done: false, title: 'Schedule RSO Security Meeting',       description: 'Coordinate with Regional Security Office — venue walk-through & safety plan.', deadline: 'May 8'  },
  ]
}

// ── Upcoming Events ──────────────────────────────────────────────────────────

export function getUpcomingEvents() {
  return [
    { id: 1, name: 'Event Management Detail Meeting',    date: '2026-04-25', type: 'In-Person', location: 'US Embassy',              attendees:   6 },
    { id: 2, name: 'Venue Contract Sign-off',            date: '2026-04-25', type: 'Internal',  location: 'Procurement',             attendees:   3 },
    { id: 3, name: 'AV Contractor Design Review',        date: '2026-04-25', type: 'In-Person', location: 'Uzexpocentre',            attendees:  12 },
    { id: 4, name: 'RSO Security Planning Meeting',      date: '2026-04-28', type: 'In-Person', location: 'US Embassy',              attendees:   8 },
    { id: 5, name: 'All-Vendor Production Meeting',      date: '2026-05-08', type: 'In-Person', location: 'Uzexpocentre',            attendees:  30 },
    { id: 6, name: 'Full Venue Walkthrough',             date: '2026-05-15', type: 'In-Person', location: 'Uzexpocentre',            attendees:  25 },
    { id: 7, name: 'Full Technical Rehearsal',           date: '2026-06-07', type: 'In-Person', location: 'Uzexpocentre',            attendees:  60 },
    { id: 8, name: '🇺🇸 FREEDOM 250 — SHOWTIME',         date: '2026-06-10', type: 'In-Person', location: 'Uzexpocentre, Tashkent', attendees: 2000 },
  ]
}

// ── Slack Channels ───────────────────────────────────────────────────────────

export function getSlackChannels() {
  return [
    { id: 1, name: '#freedom-250-general',  description: 'Main coordination — announcements, decisions, blockers',    members: 89,  activity: 'high'   },
    { id: 2, name: '#av-stage',             description: 'AV contractor comms, stage design, tech specs',             members: 18,  activity: 'high'   },
    { id: 3, name: '#event-management',     description: 'Event company coordination, staffing, décor execution',     members: 22,  activity: 'medium' },
    { id: 4, name: '#entertainment',        description: 'Artist negotiations, set lists, DJ, National Anthems',      members: 15,  activity: 'high'   },
    { id: 5, name: '#vip-protocol',         description: 'Guest list, CRM, red carpet, VVIP escort plan',             members: 20,  activity: 'medium' },
    { id: 6, name: '#food-vendors',         description: 'KFC, Coca-Cola, Uzbek food station, menus',                 members: 12,  activity: 'medium' },
    { id: 7, name: '#power-logistics',      description: 'Venue power specs, distribution, AV coordination',          members: 8,   activity: 'low'    },
    { id: 8, name: '#security-rso',         description: 'RSO coordination, perimeter plan, crowd management',        members: 11,  activity: 'low'    },
  ]
}

// ── Documents ────────────────────────────────────────────────────────────────

export function getDocuments() {
  return [
    { id: 1, type: 'doc',  title: 'Program Rundown (DRAFT)',       description: 'Minute-by-minute show flow — VIP arrival through close',              updated: '2026-04-18', category: 'Program'     },
    { id: 2, type: 'doc',  title: 'Venue Layout — Uzexpocentre',   description: 'Floor plan: stage, food court, VIP zones, Grand Entrance',            updated: '2026-04-10', category: 'Logistics'   },
    { id: 3, type: 'doc',  title: 'AV & Stage Technical Specs',    description: 'Stage dimensions, PA, LED specs, lighting plot, DJ rider',            updated: '2026-04-10', category: 'AV / Tech'   },
    { id: 4, type: 'doc',  title: 'VIP / VVIP Protocol Guide',     description: 'Red carpet, seating, catering menu, VVIP escort plan',               updated: '2026-04-05', category: 'Protocol'    },
    { id: 5, type: 'doc',  title: 'Vendor Contracts',              description: 'Signed agreements — AV, venue, KFC, Coca-Cola',                       updated: '2026-04-18', category: 'Procurement' },
    { id: 6, type: 'doc',  title: '8-Week Master Plan',            description: 'Week-by-week milestones, critical path, responsibilities',             updated: '2026-04-18', category: 'Planning'    },
    { id: 7, type: 'doc',  title: 'Security & Emergency Plan',     description: 'Perimeter, crowd management, medical, weather contingency',           updated: '2026-04-01', category: 'Security'    },
    { id: 8, type: 'link', title: 'America 250 Brand Guidelines',  description: 'Official brand colors, flag specs, logo usage',                       updated: '2026-03-15', category: 'Design'      },
  ]
}
