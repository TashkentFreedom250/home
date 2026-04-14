// ── Data layer ────────────────────────────────────────────────────────────────
// Swap these mock functions for real fetch() calls when a backend is ready.
// All functions are synchronous for now; make them async/Promise-returning when
// you wire up an actual API.

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

export function getStats() {
  return {
    volunteers: { value: 12_847, change: '+342',  trend: 'up' },
    events:     { value:    142, change: '+8',    trend: 'up' },
    states:     { value:     47, change: '+3',    trend: 'up' },
    cities:     { value:    847, change: '+23',   trend: 'up' },
  }
}

export function getSlackChannels() {
  return [
    { id: 1, name: '#freedom-250-general',  description: 'Main coordination and announcements',         members: 892, activity: 'high'   },
    { id: 2, name: '#event-planning',        description: 'Event logistics and venue coordination',      members: 234, activity: 'high'   },
    { id: 3, name: '#volunteer-hub',         description: 'Volunteer recruitment and coordination',      members: 567, activity: 'medium' },
    { id: 4, name: '#media-press',           description: 'Media outreach and press coordination',       members: 123, activity: 'medium' },
    { id: 5, name: '#state-leads',           description: 'State chapter coordinators only',             members:  94, activity: 'high'   },
    { id: 6, name: '#fundraising',           description: 'Fundraising campaigns and donor relations',   members:  78, activity: 'low'    },
    { id: 7, name: '#design-brand',          description: 'Brand assets, templates, and design review',  members:  55, activity: 'medium' },
    { id: 8, name: '#tech-platform',         description: 'Digital platform build and bug reports',      members:  41, activity: 'high'   },
  ]
}

export function getDocuments() {
  return [
    { id: 1, type: 'doc',  title: 'Event Planning Guide',       description: 'Complete guide for organizing local Freedom 250 events', updated: '2026-02-15', category: 'Planning'    },
    { id: 2, type: 'doc',  title: 'Press Kit',                  description: 'Media assets, logos, and press release templates',       updated: '2026-02-10', category: 'Media'       },
    { id: 3, type: 'doc',  title: 'Volunteer Handbook',         description: 'Everything volunteers need to know to get started',      updated: '2026-01-28', category: 'Volunteers'  },
    { id: 4, type: 'link', title: 'Brand Guidelines',           description: 'Official colors, fonts, logo usage rules',               updated: '2026-01-15', category: 'Design'      },
    { id: 5, type: 'doc',  title: 'State Chapter Toolkit',      description: 'Resources for state-level organizers',                   updated: '2026-02-01', category: 'Planning'    },
    { id: 6, type: 'link', title: 'Social Media Templates',     description: 'Ready-to-use templates for all major platforms',         updated: '2026-02-20', category: 'Media'       },
  ]
}

export function getProgress() {
  return {
    overall: 58,
    initiatives: [
      { id: 1, name: 'Event Planning & Logistics',  progress: 72, status: 'on-track', owner: 'Events Team',       deadline: 'Apr 2026' },
      { id: 2, name: 'Volunteer Recruitment',        progress: 85, status: 'ahead',    owner: 'Volunteer Coord.',  deadline: 'May 2026' },
      { id: 3, name: 'State Chapter Setup',          progress: 94, status: 'ahead',    owner: 'National Coord.',   deadline: 'Mar 2026' },
      { id: 4, name: 'Media & Press Strategy',       progress: 45, status: 'at-risk',  owner: 'Media Team',        deadline: 'May 2026' },
      { id: 5, name: 'Fundraising Goals',            progress: 38, status: 'at-risk',  owner: 'Finance Team',      deadline: 'Jun 2026' },
      { id: 6, name: 'Educational Programs',         progress: 60, status: 'on-track', owner: 'Education Team',    deadline: 'Apr 2026' },
      { id: 7, name: 'Digital Platform Launch',      progress: 55, status: 'on-track', owner: 'Tech Team',         deadline: 'Mar 2026' },
      { id: 8, name: 'Merchandise & Brand',          progress: 90, status: 'ahead',    owner: 'Brand Team',        deadline: 'Feb 2026' },
    ],
    milestones: [
      { id: 1, name: 'National Kickoff Announcement',  date: '2025-10-15', status: 'completed' },
      { id: 2, name: 'All 50 State Chapters Active',   date: '2026-01-01', status: 'completed' },
      { id: 3, name: 'Volunteer Target: 10,000',       date: '2026-02-01', status: 'completed' },
      { id: 4, name: 'Digital Platform Launch',        date: '2026-03-01', status: 'upcoming'  },
      { id: 5, name: 'National Media Campaign Begins', date: '2026-04-01', status: 'upcoming'  },
      { id: 6, name: 'Final Event Confirmations',      date: '2026-05-01', status: 'upcoming'  },
      { id: 7, name: 'Freedom 250 Day!',               date: '2026-06-10', status: 'upcoming'  },
    ],
  }
}

export function getActions() {
  return [
    { id: 1, title: 'Register as a Volunteer',  description: 'Join 12,000+ Americans making history',               priority: 'high',   cta: 'Sign Up Now',    icon: '🙋' },
    { id: 2, title: 'Host a Local Event',        description: 'Bring the celebration to your community',             priority: 'high',   cta: 'Get Started',    icon: '🎉' },
    { id: 3, title: 'Spread the Word',           description: 'Share Freedom 250 on social media',                   priority: 'medium', cta: 'Share Now',      icon: '📢' },
    { id: 4, title: 'Support the Mission',       description: 'Help fund events across all 50 states',               priority: 'medium', cta: 'Donate',         icon: '❤️' },
    { id: 5, title: 'Join a State Chapter',      description: 'Connect with organizers in your state',               priority: 'medium', cta: 'Find Chapter',   icon: '🗺️' },
    { id: 6, title: 'Become a Sponsor',          description: 'Partnership opportunities for businesses & orgs',     priority: 'low',    cta: 'Learn More',     icon: '🤝' },
  ]
}

export function getUpcomingEvents() {
  return [
    { id: 1, name: 'Northeast Regional Planning Call', date: '2026-02-20', type: 'Virtual',   location: 'Zoom',               attendees:    45 },
    { id: 2, name: 'Texas Chapter Kickoff',            date: '2026-02-25', type: 'In-Person', location: 'Austin, TX',          attendees:   120 },
    { id: 3, name: 'Media Training Workshop',          date: '2026-03-05', type: 'Virtual',   location: 'Zoom',               attendees:    67 },
    { id: 4, name: 'National Volunteer Summit',        date: '2026-03-15', type: 'Hybrid',    location: 'Washington, DC',     attendees:   340 },
    { id: 5, name: 'Freedom 250 Day Celebration',      date: '2026-06-10', type: 'In-Person', location: 'Nationwide',         attendees: 50_000 },
  ]
}
