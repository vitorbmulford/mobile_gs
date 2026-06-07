# DefenseShield Orbital Intelligence

Mobile MVP em `React Native + Expo` para a Global Solution 2026.1 da FIAP, com foco em monitoramento orbital, prevenção de desastres e gestão de riscos com dados simulados.

## Proposta de MVP

O aplicativo funciona como a central mobile do projeto `DefenseShield Orbital Intelligence`. Ele reúne alertas simulados, regiões monitoradas, indicadores de risco e um fluxo de cadastro de ocorrências para demonstrar como uma plataforma inspirada na economia espacial poderia apoiar decisões rápidas na Terra e em cenários futuros, como bases lunares.

Este MVP foi pensado para ser viável academicamente:

- usa `Expo Router` para navegação
- usa `Context API` para tema e dados globais
- usa `useState` e `useEffect` em telas e providers
- usa `AsyncStorage` para persistência local
- usa gráficos próprios com `react-native-svg`
- usa dados mockados, sem integrações complexas

## Telas e funcionalidades

### `app/index.tsx`

- apresenta o nome do projeto e o slogan
- resume a solução do grupo
- mostra cards com:
  - áreas monitoradas
  - alertas ativos
  - risco médio
  - sistemas autônomos ativos
- oferece atalhos para `Dashboard` e `Simulation`

### `app/dashboard.tsx`

- mostra gráfico de alertas por tipo
- mostra risco por região
- mostra evolução de risco nos últimos dias
- mostra cards de status `low`, `medium`, `high` e `critical`

### `app/alerts.tsx`

- lista alertas simulados
- permite filtrar por `all`, `active` e `resolved`
- permite marcar um alerta como resolvido
- persiste os resolvidos no `AsyncStorage`

### `app/monitoring.tsx`

- exibe as regiões:
  - Amazônia
  - área costeira
  - usina solar
  - porto estratégico
  - base lunar simulada
- mostra status, temperatura, umidade, índice de risco, fonte e atualização
- permite filtrar por `earth`, `critical-infrastructure` e `space`

### `app/simulation.tsx`

- traz formulário com validação
- campos:
  - nome da ocorrência
  - tipo de risco
  - região
  - severidade
  - descrição
- salva o evento como novo alerta
- persiste eventos criados no `AsyncStorage`

### `app/settings.tsx`

- alterna entre tema claro e escuro
- persiste a preferência localmente
- mostra visão do projeto
- mostra os integrantes do grupo

## Estrutura de pastas

```text
app/
  _layout.tsx
  index.tsx
  dashboard.tsx
  alerts.tsx
  monitoring.tsx
  simulation.tsx
  settings.tsx
components/
  alert-card.tsx
  bottom-nav.tsx
  button.tsx
  chart-section.tsx
  filter-chip.tsx
  form-field.tsx
  metric-card.tsx
  region-status-card.tsx
  risk-card.tsx
  screen-container.tsx
constants/
  theme.ts
contexts/
  defense-shield-context.tsx
  theme-context.tsx
data/
  alerts.mock.ts
  regions.mock.ts
  riskMetrics.mock.ts
types/
  defense-shield.ts
utils/
  storage.ts
```

## Dados mockados

`data/alerts.mock.ts`

- queimadas com fonte satelital
- enchentes com API climática
- falha operacional com sensor IoT
- anomalia climática com drone

`data/regions.mock.ts`

- regiões terrestres
- infraestrutura crítica
- ambiente espacial simulado

`data/riskMetrics.mock.ts`

- alertas por tipo
- risco por região
- tendência temporal
- cards de severidade
- integrantes do grupo

## Fluxo de navegação

1. Home apresenta a solução e os indicadores principais.
2. Dashboard mostra a leitura executiva do risco.
3. Alerts trata o fluxo operacional de incidentes.
4. Monitoring detalha regiões e fontes simuladas.
5. Simulation cria novas ocorrências.
6. Settings centraliza preferências e contexto do projeto.

O app usa uma barra inferior própria em todas as telas para manter navegação simples e direta.

## Componentes principais

- `ScreenContainer`: estrutura visual, animação de entrada e fundo temático
- `BottomNav`: navegação com `Expo Router`
- `MetricCard`: indicadores da Home
- `RiskCard`: status por severidade
- `AlertCard`: item de alerta com ação de resolver
- `ChartSection`: gráficos de barras, distribuição e tendência
- `RegionStatusCard`: bloco de monitoramento por região
- `Button`, `FilterChip` e `FormField`: base reutilizável de interação

## Bibliotecas usadas

- `expo`
- `expo-router`
- `@expo/vector-icons`
- `@react-native-async-storage/async-storage`
- `react-native-svg`

## Como cada requisito obrigatório foi atendido

- `React Native + Expo`: projeto baseado em `expo ~54.0.34`
- `Expo Router`: rotas em `app/` com `Stack` no `_layout.tsx`
- `useState`: usado em filtros, formulário e controle de tema
- `useEffect`: usado em animações, hidratação e persistência
- `Context API`: `ThemeModeProvider` e `DefenseShieldProvider`
- `AsyncStorage`: tema, alertas resolvidos e eventos simulados
- `Formulário com validação`: tela `simulation.tsx`
- `Dashboards/gráficos`: `ChartSection` com `react-native-svg`
- `Componentização`: cards, botões, filtros, layout e gráficos desacoplados
- `UI coerente com tema espacial`: paleta azul profunda, cartões de dashboard e linguagem de central orbital

## Diferenciais entregues

- `TypeScript`
- tema claro/escuro
- dados mockados estruturados
- animação simples de entrada
- persistência real do MVP

## Observação importante

Este projeto é um protótipo funcional acadêmico. Ele simula dados satelitais, sensores IoT, drones e recomendações automatizadas para demonstrar a proposta da solução sem depender de integrações reais complexas.

## Integrantes

- Vitor Bebiano Mulford | RM: 555026

- Lorenzo Hayashi Mangini | RM: 554901

- Milton Cezar Bacanieski | RM: 555206


- Victório Maia Bastelli | RM: 554723

## Execução

```bash
npm install
npx expo start
```
