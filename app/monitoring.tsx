import * as Location from 'expo-location';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { FilterChip } from '@/components/filter-chip';
import { RegionStatusCard } from '@/components/region-status-card';
import { ScreenContainer } from '@/components/screen-container';
import { useDefenseShield } from '@/contexts/defense-shield-context';
import { useAppTheme } from '@/contexts/theme-context';
import type { RegionCategory } from '@/types/defense-shield';

type MonitoringFilter = 'all' | RegionCategory;

export default function MonitoringScreen() {
  const { theme } = useAppTheme();
  const { regions } = useDefenseShield();
  const [filter, setFilter] = useState<MonitoringFilter>('all');
  const [locationStatus, setLocationStatus] = useState('Localizacao ainda nao solicitada.');
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(
    null
  );
  const [cityLabel, setCityLabel] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const filteredRegions = useMemo(() => {
    if (filter === 'all') {
      return regions;
    }

    return regions.filter((region) => region.category === filter);
  }, [filter, regions]);

  async function handleUseMyLocation() {
    try {
      setIsLoadingLocation(true);
      setLocationStatus('Solicitando permissao...');
      setCityLabel(null);

      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocationStatus('Permissao negada. Habilite o acesso a localizacao para usar este recurso.');
        setCoordinates(null);
        return;
      }

      setLocationStatus('Buscando coordenadas do GPS...');
      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const nextCoordinates = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
      };

      setCoordinates(nextCoordinates);

      try {
        const addresses = await Location.reverseGeocodeAsync(nextCoordinates);
        const firstAddress = addresses[0];

        if (firstAddress) {
          const locationParts = [
            firstAddress.city,
            firstAddress.region,
            firstAddress.country,
          ].filter(Boolean);

          setCityLabel(locationParts.join(', ') || null);
        }
      } catch {
        setCityLabel(null);
      }

      setLocationStatus('Leitura nativa de GPS concluida.');
    } catch {
      setLocationStatus('Nao foi possivel obter a localizacao do dispositivo neste momento.');
      setCoordinates(null);
      setCityLabel(null);
    } finally {
      setIsLoadingLocation(false);
    }
  }

  return (
    <ScreenContainer
      eyebrow="Vigilancia da missao"
      subtitle="Cinco regioes monitoradas conectam operacoes terrestres, infraestrutura critica e simulacao espacial."
      title="Monitoramento">
      <View style={styles.filters}>
        <FilterChip label="Todas" onPress={() => setFilter('all')} selected={filter === 'all'} />
        <FilterChip label="Terra" onPress={() => setFilter('earth')} selected={filter === 'earth'} />
        <FilterChip
          label="Infraestrutura"
          onPress={() => setFilter('critical-infrastructure')}
          selected={filter === 'critical-infrastructure'}
        />
        <FilterChip label="Espaco" onPress={() => setFilter('space')} selected={filter === 'space'} />
      </View>

      <View
        style={[
          styles.locationCard,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}>
        <Text style={[styles.locationTitle, { color: theme.colors.text }]}>Geolocalizacao do dispositivo</Text>
        <Text style={[styles.locationText, { color: theme.colors.textMuted }]}>
          Use o GPS nativo para demonstrar a integracao com recursos do dispositivo via Expo Location.
        </Text>
        <Button
          label="Usar minha localizacao"
          onPress={handleUseMyLocation}
          variant="primary"
        />
        {isLoadingLocation ? <ActivityIndicator color={theme.colors.primary} /> : null}
        <Text style={[styles.locationText, { color: theme.colors.textMuted }]}>{locationStatus}</Text>
        {cityLabel ? (
          <Text style={[styles.locationStrong, { color: theme.colors.text }]}>Cidade: {cityLabel}</Text>
        ) : null}
        {coordinates ? (
          <View style={styles.locationMetrics}>
            <Text style={[styles.locationStrong, { color: theme.colors.text }]}>
              Latitude: {coordinates.latitude.toFixed(3)}
            </Text>
            <Text style={[styles.locationStrong, { color: theme.colors.text }]}>
              Longitude: {coordinates.longitude.toFixed(3)}
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.list}>
        {filteredRegions.map((region) => (
          <RegionStatusCard key={region.id} region={region} />
        ))}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  locationCard: {
    gap: 12,
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  locationStrong: {
    fontSize: 14,
    fontWeight: '700',
  },
  locationMetrics: {
    gap: 6,
  },
  list: {
    gap: 14,
  },
});
