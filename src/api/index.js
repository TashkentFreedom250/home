// ── Data layer ────────────────────────────────────────────────────────────────
// Swap these mock functions for real fetch() calls when a backend is ready.

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

export function getEventDetails() {
  return {
    name:       'Freedom 250 Celebration',
    host:       'US Embassy Tashkent',
    date:       '2026-06-10',
    location:   'Uzexpocentre Outdoor Terrace & Grounds',
    city:       'Tashkent, Uzbekistan',
    attendance: '2,000+',
    description:
      "A massive outdoor festival celebrating America's 250th Anniversary, transforming the Uzexpocentre grounds into a turnkey concert and high-end celebration space featuring live musical performances, speeches, and video presentations.",
    highlights: [
      {
        icon: '🎤',
        title: 'Live Concert & Entertainment',
        detail:
          '12m × 10m outdoor stage with a curated lineup of locally based acts, opening act, headliner, National Anthem performances (US & Uzbekistan), and a DJ spinning American Top 40, Classic Rock, and Pop.',
      },
      {
        icon: '🍔',
        title: 'Main Food Court',
        detail:
          'Bistro-lit terrace with picnic-style seating. American fast-food partners KFC and Coca-Cola plus an Uzbek Ethnic Food station decorated with traditional Ikat and Adras fabrics.',
      },
      {
        icon: '🏛️',
        title: 'Immersive Freedom 250 Décor',
        detail:
          'Branded "Grand Entrance" archway, red-white-blue pleated bunting around the venue perimeter, and "America 250" flags throughout the grounds.',
      },
      {
        icon: '⭐',
        title: 'Exclusive VIP / VVIP Experience',
        detail:
          'Red-carpet arrival, luxury lounge seating, premium outdoor carpeting, shaded high-peak marquees, elegant plated catering, hors d\'oeuvres, and professional waitstaff.',
      },
    ],
    technology: [
      'High-resolution LED IMAG screens',
      'Intelligent stage lighting',
      'Festival-grade PA system',
    ],
  }
}

export function getStats() {
  return {
    attendance:  { value: '2,000+',  change: 'Expected guests'  },
    performers:  { value: '3+',      change: 'Acts confirmed'   },
    vendors:     { value: '4',       change: 'KFC · Coke + more'},
    vipZones:    { value: '2',       change: 'VIP & VVIP zones' },
  }
}

export function getSlackChannels() {
  return [
    { id: 1, name: '#freedom-250-general',  description: 'Main coordination and announcements for all teams',         members: 89,  activity: 'high'   },
    { id: 2, name: '#event-logistics',      description: 'Venue setup, stage, AV, and day-of operations',             members: 34,  activity: 'high'   },
    { id: 3, name: '#entertainment',        description: 'Performer scheduling, DJ sets, and National Anthem coord.',  members: 18,  activity: 'high'   },
    { id: 4, name: '#vip-protocol',         description: 'VIP/VVIP guest management, red carpet, and catering',       members: 22,  activity: 'medium' },
    { id: 5, name: '#food-vendors',         description: 'KFC, Coca-Cola, and Uzbek Food station coordination',       members: 15,  activity: 'medium' },
    { id: 6, name: '#decor-branding',       description: 'Bunting, flags, Grand Entrance arch, and signage',          members: 12,  activity: 'medium' },
    { id: 7, name: '#media-press',          description: 'Photography, videography, and press access',                members: 20,  activity: 'low'    },
    { id: 8, name: '#security-logistics',   description: 'Perimeter security, crowd management, and emergency plan',  members: 11,  activity: 'medium' },
  ]
}

export function getDocuments() {
  return [
    { id: 1, type: 'doc',  title: 'Event Run-of-Show',           description: 'Full minute-by-minute schedule for June 10th, including sound checks, speeches, and performances', updated: '2026-03-10', category: 'Planning'       },
    { id: 2, type: 'doc',  title: 'Venue Layout & Map',          description: 'Uzexpocentre floor plan showing stage, food court, VIP zones, and entrance archway positions',     updated: '2026-03-01', category: 'Logistics'      },
    { id: 3, type: 'doc',  title: 'VIP Guest Protocol Guide',    description: 'Red-carpet procedures, seating assignments, catering menus, and VVIP escort instructions',          updated: '2026-02-20', category: 'Protocol'       },
    { id: 4, type: 'doc',  title: 'Performer & DJ Brief',        description: 'Stage specs, sound requirements, set lists, and National Anthem cues for all musical acts',         updated: '2026-03-05', category: 'Entertainment'  },
    { id: 5, type: 'link', title: 'Brand & Décor Guidelines',    description: 'Official Freedom 250 color palette, flag specs, bunting dimensions, and archway branding rules',    updated: '2026-02-15', category: 'Design'         },
    { id: 6, type: 'doc',  title: 'Catering & Vendor Contracts', description: 'Signed agreements with KFC, Coca-Cola, and Uzbek food station operator including menu approvals',  updated: '2026-02-10', category: 'Vendors'        },
  ]
}

export function getProgress() {
  return {
    overall: 62,
    initiatives: [
      { id: 1, name: 'Venue & Stage Construction',     progress: 75, status: 'on-track', owner: 'Logistics Team',    deadline: 'Jun 2026' },
      { id: 2, name: 'Performer & Entertainment',      progress: 80, status: 'ahead',    owner: 'Events Team',       deadline: 'May 2026' },
      { id: 3, name: 'VIP / VVIP Experience Setup',    progress: 65, status: 'on-track', owner: 'Protocol Team',     deadline: 'May 2026' },
      { id: 4, name: 'Food Court & Vendor Contracts',  progress: 90, status: 'ahead',    owner: 'Catering Team',     deadline: 'Apr 2026' },
      { id: 5, name: 'Décor & Branding Installation',  progress: 50, status: 'on-track', owner: 'Design Team',       deadline: 'Jun 2026' },
      { id: 6, name: 'AV, LED & Stage Technology',     progress: 60, status: 'on-track', owner: 'Tech / AV Team',    deadline: 'May 2026' },
      { id: 7, name: 'Guest Invitations & RSVPs',      progress: 40, status: 'at-risk',  owner: 'Protocol Team',     deadline: 'May 2026' },
      { id: 8, name: 'Security & Crowd Management',    progress: 45, status: 'on-track', owner: 'Security Team',     deadline: 'Jun 2026' },
    ],
    milestones: [
      { id: 1, name: 'Venue Contract Signed — Uzexpocentre',  date: '2026-01-15', status: 'completed' },
      { id: 2, name: 'KFC & Coca-Cola Vendor Agreements',      date: '2026-02-01', status: 'completed' },
      { id: 3, name: 'Stage & AV Equipment Contracted',        date: '2026-02-15', status: 'completed' },
      { id: 4, name: 'Headliner & All Performers Confirmed',   date: '2026-03-30', status: 'upcoming'  },
      { id: 5, name: 'VIP Guest List Finalized',               date: '2026-04-30', status: 'upcoming'  },
      { id: 6, name: 'Full Venue Walkthrough & Tech Check',    date: '2026-05-15', status: 'upcoming'  },
      { id: 7, name: 'Grand Entrance & Décor Setup Complete',  date: '2026-06-08', status: 'upcoming'  },
      { id: 8, name: '🇺🇸  Freedom 250 Celebration — SHOWTIME', date: '2026-06-10', status: 'upcoming'  },
    ],
  }
}

export function getActions() {
  return [
    { id: 1, title: 'RSVP for the Event',          description: 'Secure your spot at the Uzexpocentre for June 10th',           priority: 'high',   cta: 'RSVP Now',     icon: '🎟️' },
    { id: 2, title: 'Request VIP Access',           description: 'Apply for VIP or VVIP zone — red carpet, premium catering',    priority: 'high',   cta: 'Apply',        icon: '⭐' },
    { id: 3, title: 'Nominate a Performer',         description: 'Suggest locally-based artists with diplomatic collaboration',   priority: 'medium', cta: 'Submit',       icon: '🎤' },
    { id: 4, title: 'Volunteer at the Event',       description: 'Join the team making June 10th run perfectly',                  priority: 'medium', cta: 'Sign Up',      icon: '🙋' },
    { id: 5, title: 'Share on Social Media',        description: 'Spread the word about Freedom 250 in Tashkent',                priority: 'medium', cta: 'Share Now',    icon: '📢' },
    { id: 6, title: 'Become a Sponsor',             description: 'Brand your organization in the food court or VIP zone',        priority: 'low',    cta: 'Learn More',   icon: '🤝' },
  ]
}

export function getUpcomingEvents() {
  return [
    { id: 1, name: 'Freedom 250 Celebration',           date: '2026-06-10', type: 'In-Person', location: 'Uzexpocentre, Tashkent', attendees: 2000 },
    { id: 2, name: 'Grand Entrance & Décor Setup',       date: '2026-06-08', type: 'In-Person', location: 'Uzexpocentre, Tashkent', attendees:   50 },
    { id: 3, name: 'Full Venue Walkthrough & Tech Check',date: '2026-05-15', type: 'In-Person', location: 'Uzexpocentre, Tashkent', attendees:   30 },
    { id: 4, name: 'VIP Guest List Deadline',            date: '2026-04-30', type: 'Virtual',   location: 'Internal',               attendees:    8 },
    { id: 5, name: 'Performer & DJ Coordination Call',   date: '2026-04-15', type: 'Virtual',   location: 'Zoom',                   attendees:   12 },
  ]
}
