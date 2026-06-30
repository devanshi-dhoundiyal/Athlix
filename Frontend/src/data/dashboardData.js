export const childSummary = {
  name: 'Arjun Sharma',
  age: 10,
  condition: 'Cerebral palsy',
  sessionsCompleted: 12,
  overallScore: 74,
  streakDays: 8,
  xp: 340,
  xpToNext: 500,
  level: 4,
  currentSport: { icon: '🏸', name: 'Adaptive Badminton' },
};

export const progressStats = [
  { name: 'Balance', val: 62 },
  { name: 'Coordination', val: 81 },
  { name: 'Reaction Time', val: 78 },
  { name: 'Flexibility', val: 55 },
];

export const weeklyActivity = [
  { day: 'M', val: 40 },
  { day: 'T', val: 65 },
  { day: 'W', val: 30 },
  { day: 'T', val: 80 },
  { day: 'F', val: 55 },
  { day: 'S', val: 90 },
  { day: 'S', val: 0 },
];

export const latestRecommendation = {
  icon: '🏸',
  name: 'Adaptive Badminton',
  match: 92,
};

export const upcomingSessions = [
  { day: '02', month: 'Jul', name: 'Badminton — Footwork drills', time: '4:00 PM · Coach Vikram', badge: 'Tomorrow' },
  { day: '04', month: 'Jul', name: 'Balance & core therapy', time: '10:00 AM · Dr. Meera', badge: 'In 3 days' },
  { day: '06', month: 'Jul', name: 'Swimming — intro session', time: '5:30 PM · Coach Anita', badge: 'In 5 days' },
];

export const achievements = [
  { icon: '🥇', name: 'First Session', locked: false },
  { icon: '🔥', name: '7-Day Streak', locked: false },
  { icon: '⚡', name: 'Quick Reflexes', locked: false },
  { icon: '🎯', name: 'Perfect Aim', locked: false },
  { icon: '🏆', name: 'Champion', locked: true },
  { icon: '💎', name: '30-Day Streak', locked: true },
  { icon: '🌟', name: 'All-Rounder', locked: true },
  { icon: '👑', name: 'Sport Master', locked: true },
];

export const quickActions = [
  { icon: '📷', label: 'New Assessment', to: '/assessment' },
  { icon: '🏅', label: 'View Sports', to: '/recommendations' },
  { icon: '🥽', label: 'Start Training', to: '/arena' },
  { icon: '⚙️', label: 'Settings', to: '/settings' },
];
