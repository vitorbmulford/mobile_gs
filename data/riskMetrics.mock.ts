import type { ChartDatum, RiskStatusMetric, TeamMember } from '@/types/defense-shield';

export const alertsByTypeMock: ChartDatum[] = [
  { label: 'Wildfire', value: 8, color: '#F87171' },
  { label: 'Flood', value: 6, color: '#38BDF8' },
  { label: 'Ops', value: 4, color: '#FB923C' },
  { label: 'Climate', value: 7, color: '#FACC15' },
];

export const regionalRiskMock: ChartDatum[] = [
  { label: 'Amazon', value: 91, color: '#F87171' },
  { label: 'Coast', value: 73, color: '#FB923C' },
  { label: 'Solar', value: 48, color: '#FACC15' },
  { label: 'Port', value: 39, color: '#4ADE80' },
  { label: 'Lunar', value: 67, color: '#38BDF8' },
];

export const riskTrendMock: ChartDatum[] = [
  { label: 'D-6', value: 41 },
  { label: 'D-5', value: 46 },
  { label: 'D-4', value: 44 },
  { label: 'D-3', value: 58 },
  { label: 'D-2', value: 64 },
  { label: 'D-1', value: 72 },
  { label: 'Today', value: 68 },
];

export const riskStatusMock: RiskStatusMetric[] = [
  { label: 'Low Risk', count: 4, tone: 'low', description: 'Stable sectors under baseline surveillance.' },
  { label: 'Medium Risk', count: 6, tone: 'medium', description: 'Requires scheduled review and predictive watch.' },
  { label: 'High Risk', count: 5, tone: 'high', description: 'Operational attention required within the current shift.' },
  { label: 'Critical Risk', count: 2, tone: 'critical', description: 'Immediate response and escalation protocols active.' },
];

export const teamMembersMock: TeamMember[] = [
  { name: 'Lorenzo Hayashi Mangini', role: 'Data analysis and strategic monitoring' },
  { name: 'Victorio Bastelli', role: 'Product vision and command workflows' },
  { name: 'Vitor Bebiano', role: 'Mobile development and MVP integration' },
  { name: 'Milton Cezar', role: 'Operational scenarios and defense intelligence' },
];

export const navigationTargets = [
  { href: '/', label: 'Home', icon: 'home-outline' },
  { href: '/dashboard', label: 'Dashboard', icon: 'chart-donut' },
  { href: '/alerts', label: 'Alerts', icon: 'alert-circle-outline' },
  { href: '/monitoring', label: 'Monitoring', icon: 'radar' },
  { href: '/simulation', label: 'Simulation', icon: 'satellite-uplink' },
  { href: '/settings', label: 'Settings', icon: 'cog-outline' },
] as const;
