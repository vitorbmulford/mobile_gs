export type ThemeMode = 'light' | 'dark';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type AlertType =
  | 'Wildfire'
  | 'Flood'
  | 'Operational Failure'
  | 'Climate Anomaly';

export type AlertSource = 'Satellite' | 'IoT Sensor' | 'Drone' | 'Weather API';

export type RegionCategory = 'earth' | 'critical-infrastructure' | 'space';

export interface AlertItem {
  id: string;
  title: string;
  eventType: AlertType;
  region: string;
  riskLevel: RiskLevel;
  source: AlertSource;
  timestamp: string;
  recommendation: string;
  description: string;
  resolved: boolean;
  origin: 'mock' | 'simulation';
}

export interface RegionStatus {
  id: string;
  name: string;
  category: RegionCategory;
  status: string;
  temperature: number;
  humidity: number;
  riskIndex: number;
  source: string;
  updatedAt: string;
  summary: string;
}

export interface ChartDatum {
  label: string;
  value: number;
  color?: string;
}

export interface RiskStatusMetric {
  label: string;
  count: number;
  tone: RiskLevel;
  description: string;
}

export interface SimulationFormData {
  occurrenceName: string;
  eventType: AlertType | '';
  region: string;
  severity: RiskLevel | '';
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
}
