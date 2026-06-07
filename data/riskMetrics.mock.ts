import type { ChartDatum, RiskStatusMetric, TeamMember } from '@/types/defense-shield';

export const alertsByTypeMock: ChartDatum[] = [
  { label: 'Queimada', value: 8, color: '#F87171' },
  { label: 'Enchente', value: 6, color: '#38BDF8' },
  { label: 'Operac.', value: 4, color: '#FB923C' },
  { label: 'Clima', value: 7, color: '#FACC15' },
];

export const regionalRiskMock: ChartDatum[] = [
  { label: 'Amazonia', value: 91, color: '#F87171' },
  { label: 'Costeira', value: 73, color: '#FB923C' },
  { label: 'Solar', value: 48, color: '#FACC15' },
  { label: 'Porto', value: 39, color: '#4ADE80' },
  { label: 'Lunar', value: 67, color: '#38BDF8' },
];

export const riskTrendMock: ChartDatum[] = [
  { label: 'D-6', value: 41 },
  { label: 'D-5', value: 46 },
  { label: 'D-4', value: 44 },
  { label: 'D-3', value: 58 },
  { label: 'D-2', value: 64 },
  { label: 'D-1', value: 72 },
  { label: 'Hoje', value: 68 },
];

export const incidentTrendMock: ChartDatum[] = [
  { label: 'D-6', value: 5 },
  { label: 'D-5', value: 7 },
  { label: 'D-4', value: 6 },
  { label: 'D-3', value: 8 },
  { label: 'D-2', value: 10 },
  { label: 'D-1', value: 9 },
  { label: 'Hoje', value: 11 },
];

export const environmentalTrendMock: ChartDatum[] = [
  { label: 'Seg', value: 52 },
  { label: 'Ter', value: 55 },
  { label: 'Qua', value: 60 },
  { label: 'Qui', value: 64 },
  { label: 'Sex', value: 59 },
  { label: 'Sab', value: 67 },
  { label: 'Dom', value: 70 },
];

export const environmentalRankingMock: ChartDatum[] = [
  { label: 'Amazonia', value: 91, color: '#F87171' },
  { label: 'Area Costeira', value: 73, color: '#FB923C' },
  { label: 'Base Lunar Simulada', value: 67, color: '#FACC15' },
  { label: 'Usina Solar Orbital', value: 48, color: '#38BDF8' },
  { label: 'Porto Estrategico', value: 39, color: '#4ADE80' },
];

export const environmentalIndicatorsMock: ChartDatum[] = [
  { label: 'Indice de Queimadas', value: 82, color: '#F87171' },
  { label: 'Indice de Enchentes', value: 74, color: '#38BDF8' },
  { label: 'Estresse do Ar', value: 63, color: '#FACC15' },
  { label: 'Calor Estrutural', value: 57, color: '#FB923C' },
];

export const riskStatusMock: RiskStatusMetric[] = [
  { label: 'Risco Baixo', count: 4, tone: 'low', description: 'Setores estaveis sob vigilancia de rotina.' },
  { label: 'Risco Medio', count: 6, tone: 'medium', description: 'Exige revisao programada e observacao preditiva.' },
  { label: 'Risco Alto', count: 5, tone: 'high', description: 'Exige atencao operacional dentro do turno atual.' },
  { label: 'Risco Critico', count: 2, tone: 'critical', description: 'Protocolos de resposta imediata e escalonamento ativos.' },
];

export const teamMembersMock: TeamMember[] = [
  {
    name: 'Vitor Bebiano Mulford',
    role: 'Desenvolvimento mobile e integracao do MVP',
    rm: '555026',
  },
  {
    name: 'Lorenzo Hayashi Mangini',
    role: 'Analise de dados e monitoramento estrategico',
    rm: '554901',
  },
  {
    name: 'Milton Cezar Bacanieski',
    role: 'Cenarios operacionais e inteligencia de defesa',
    rm: '555206',
  },
  {
    name: 'Victorio Maia Bastelli',
    role: 'Visao de produto e fluxos de comando',
    rm: '554723',
  },
];

export const navigationTargets = [
  { href: '/', label: 'Inicio', subtitle: 'Visao geral da central', icon: 'home-outline' },
  {
    href: '/dashboard',
    label: 'Dashboard Executivo',
    subtitle: 'Indicadores para decisao rapida',
    icon: 'chart-box-outline',
  },
  {
    href: '/environmental-dashboard',
    label: 'Dashboard Ambiental',
    subtitle: 'Risco climatico e ambiental',
    icon: 'earth',
  },
  {
    href: '/alerts',
    label: 'Alertas',
    subtitle: 'Incidentes e tratativas',
    icon: 'alert-circle-outline',
  },
  {
    href: '/monitoring',
    label: 'Monitoramento',
    subtitle: 'Regioes e geolocalizacao',
    icon: 'radar',
  },
  {
    href: '/simulation',
    label: 'Simulacao',
    subtitle: 'Cadastro de ocorrencias',
    icon: 'satellite-uplink',
  },
  {
    href: '/settings',
    label: 'Configuracoes',
    subtitle: 'Tema e informacoes do projeto',
    icon: 'cog-outline',
  },
] as const;
