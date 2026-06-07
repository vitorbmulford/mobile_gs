import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { alertsMock } from '@/data/alerts.mock';
import { regionsMock } from '@/data/regions.mock';
import type { AlertItem, RegionStatus, SimulationFormData } from '@/types/defense-shield';
import { STORAGE_KEYS } from '@/utils/storage';

interface DefenseShieldContextValue {
  alerts: AlertItem[];
  regions: RegionStatus[];
  activeAlerts: AlertItem[];
  resolvedAlerts: AlertItem[];
  criticalAlerts: AlertItem[];
  averageRisk: number;
  averageTemperature: number;
  averageHumidity: number;
  wildfireIndex: number;
  floodIndex: number;
  autonomousSystemsActive: number;
  monitoredAreas: number;
  systemStatus: 'Operacional' | 'Atencao';
  threatLevel: 'Baixo' | 'Medio' | 'Alto';
  markAlertResolved: (alertId: string) => void;
  createSimulationEvent: (formData: SimulationFormData) => void;
}

const DefenseShieldContext = createContext<DefenseShieldContextValue | null>(null);

function mergeStoredAlerts(
  resolvedIds: string[],
  storedSimulationAlerts: AlertItem[]
): AlertItem[] {
  const mergedAlerts = [...alertsMock, ...storedSimulationAlerts];
  const resolvedSet = new Set(resolvedIds);

  return mergedAlerts.map((alert) => ({
    ...alert,
    resolved: alert.resolved || resolvedSet.has(alert.id),
  }));
}

export function DefenseShieldProvider({ children }: React.PropsWithChildren) {
  const [alerts, setAlerts] = useState<AlertItem[]>(alertsMock);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    async function hydrateState() {
      try {
        const [resolvedIdsValue, simulationAlertsValue] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.resolvedAlertIds),
          AsyncStorage.getItem(STORAGE_KEYS.simulationAlerts),
        ]);

        const resolvedIds = resolvedIdsValue ? (JSON.parse(resolvedIdsValue) as string[]) : [];
        const storedSimulationAlerts = simulationAlertsValue
          ? (JSON.parse(simulationAlertsValue) as AlertItem[])
          : [];

        setAlerts(mergeStoredAlerts(resolvedIds, storedSimulationAlerts));
      } finally {
        setIsHydrated(true);
      }
    }

    hydrateState();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const resolvedIds = alerts.filter((alert) => alert.resolved).map((alert) => alert.id);
    const simulationAlerts = alerts.filter((alert) => alert.origin === 'simulation');

    AsyncStorage.multiSet([
      [STORAGE_KEYS.resolvedAlertIds, JSON.stringify(resolvedIds)],
      [STORAGE_KEYS.simulationAlerts, JSON.stringify(simulationAlerts)],
    ]).catch(() => {
      // This is a demo MVP, so we fail silently instead of interrupting the flow.
    });
  }, [alerts, isHydrated]);

  const value = useMemo(() => {
    const activeAlerts = alerts.filter((alert) => !alert.resolved);
    const resolvedAlerts = alerts.filter((alert) => alert.resolved);
    const criticalAlerts = activeAlerts.filter((alert) => alert.riskLevel === 'critical');
    const averageRisk = Math.round(
      regionsMock.reduce((sum, region) => sum + region.riskIndex, 0) / regionsMock.length
    );
    const averageTemperature = Math.round(
      regionsMock.reduce((sum, region) => sum + region.temperature, 0) / regionsMock.length
    );
    const averageHumidity = Math.round(
      regionsMock.reduce((sum, region) => sum + region.humidity, 0) / regionsMock.length
    );
    const wildfireIndex = 82;
    const floodIndex = 74;
    const systemStatus: DefenseShieldContextValue['systemStatus'] =
      criticalAlerts.length > 2 ? 'Atencao' : 'Operacional';
    const threatLevel: DefenseShieldContextValue['threatLevel'] =
      averageRisk >= 75 ? 'Alto' : averageRisk >= 50 ? 'Medio' : 'Baixo';

    return {
      alerts,
      regions: regionsMock,
      activeAlerts,
      resolvedAlerts,
      criticalAlerts,
      averageRisk,
      averageTemperature,
      averageHumidity,
      wildfireIndex,
      floodIndex,
      autonomousSystemsActive: 12,
      monitoredAreas: regionsMock.length,
      systemStatus,
      threatLevel,
      markAlertResolved: (alertId: string) => {
        setAlerts((currentAlerts) =>
          currentAlerts.map((alert) =>
            alert.id === alertId ? { ...alert, resolved: true } : alert
          )
        );
      },
      createSimulationEvent: (formData: SimulationFormData) => {
        const newAlert: AlertItem = {
          id: `sim-${Date.now()}`,
          title: formData.occurrenceName.trim(),
          eventType: formData.eventType as AlertItem['eventType'],
          region: formData.region,
          riskLevel: formData.severity as AlertItem['riskLevel'],
          source: 'Sensor IoT',
          timestamp: new Date().toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          recommendation: 'Validar a ocorrencia, priorizar revisao do operador e acompanhar a escalada.',
          description: formData.description.trim(),
          resolved: false,
          origin: 'simulation',
        };

        setAlerts((currentAlerts) => [newAlert, ...currentAlerts]);
      },
    };
  }, [alerts]);

  return (
    <DefenseShieldContext.Provider value={value}>{children}</DefenseShieldContext.Provider>
  );
}

export function useDefenseShield() {
  const context = useContext(DefenseShieldContext);

  if (!context) {
    throw new Error('useDefenseShield must be used within DefenseShieldProvider.');
  }

  return context;
}
