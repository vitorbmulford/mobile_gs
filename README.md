# DefenseShield Orbital Intelligence

O DefenseShield Orbital Intelligence e um MVP mobile desenvolvido com `React Native + Expo` para a Global Solution 2026.1 da FIAP. O aplicativo simula uma central orbital de monitoramento que consolida riscos ambientais, operacionais e territoriais inspirados em tecnologias da industria espacial.

## Objetivo da Solucao

Governos, empresas e organizacoes precisam monitorar grandes volumes de dados vindos de satelites, sensores IoT, drones, servicos climaticos e sistemas autonomos. Quando essas informacoes ficam dispersas, a tomada de decisao se torna mais lenta, a resposta a riscos perde eficiencia e aumentam os impactos operacionais, ambientais e economicos.

O DefenseShield Orbital Intelligence atua como uma plataforma central de monitoramento e apoio a decisao. Neste MVP academico, o app concentra alertas simulados, regioes monitoradas, dashboards, geolocalizacao e recomendacoes operacionais para demonstrar como uma solucao inspirada na economia espacial pode apoiar a prevencao e a resposta a incidentes na Terra e em cenarios futuros de operacao orbital.

## Funcionalidades

- Dashboard Executivo
- Dashboard Ambiental
- Gestao de alertas com resolucao local
- Monitoramento de regioes com filtros
- Cadastro de ocorrencias com validacao
- Geolocalizacao nativa com Expo Location
- Tema claro e escuro
- Persistencia local com AsyncStorage

## Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- Context API
- AsyncStorage
- React Native SVG
- Expo Location

## Relacao com a Industria Espacial

O projeto e inspirado diretamente em conceitos da industria espacial:

- dados satelitais para observacao territorial
- sensoriamento remoto para analise ambiental
- inteligencia artificial como apoio a decisao
- sistemas autonomos, como drones e rovers
- economia espacial, em que tecnologias orbitais geram valor pratico na Terra

O MVP demonstra como tecnologias associadas ao setor espacial podem gerar beneficios concretos para defesa civil, monitoramento de infraestrutura critica e gestao de riscos climaticos.

## ODS Relacionados

### ODS 9 - Industria, Inovacao e Infraestrutura

O aplicativo propoe uma plataforma digital de monitoramento voltada a infraestrutura mais inteligente, resiliente e inovadora.

### ODS 11 - Cidades e Comunidades Sustentaveis

A solucao ajuda a antecipar ameacas ambientais e melhorar a preparacao de cidades, portos e territorios sensiveis.

### ODS 13 - Acao Contra a Mudanca Global do Clima

O MVP enfatiza monitoramento climatico, indicadores de queimadas e enchentes e visibilidade antecipada de riscos para prevencao de desastres.

## Estrutura do Projeto

```text
app/
  _layout.tsx
  index.tsx
  dashboard.tsx
  environmental-dashboard.tsx
  alerts.tsx
  monitoring.tsx
  simulation.tsx
  settings.tsx
components/
  alert-card.tsx
  bottom-nav.tsx
  button.tsx
  chart-section.tsx
  dashboard-switcher.tsx
  filter-chip.tsx
  form-field.tsx
  metric-card.tsx
  orbital-radar.tsx
  region-status-card.tsx
  risk-card.tsx
  screen-container.tsx
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

## Dashboards

### Dashboard Executivo

Voltado para leitura rapida e tomada de decisao, com:

- alertas ativos
- alertas resolvidos
- risco medio geral
- sistemas autonomos em operacao
- distribuicao de alertas por tipo
- evolucao temporal de riscos e incidentes

### Dashboard Ambiental

Voltado para monitoramento climatico e ambiental, com:

- temperatura media
- umidade media
- indice de queimadas
- indice de enchentes
- regiao mais critica
- comparacao de risco entre regioes
- tendencia ambiental
- ranking das areas monitoradas

## Recurso Nativo do Dispositivo

A tela de Monitoramento integra `expo-location` para demonstrar uso de recurso nativo do dispositivo:

- solicita permissao em primeiro plano
- obtem latitude e longitude
- tenta identificar cidade e regiao por geocodificacao reversa
- usa as coordenadas como fallback quando necessario

Isso reforca a aderencia tecnica a rubrica sem adicionar complexidade desnecessaria ao MVP.

## Home e Experiencia Visual

A Home foi reforcada para melhorar apresentacao, impacto visual e percepcao de acabamento:

- radar orbital animado
- status geral do sistema
- nivel de ameaca resumido
- ultimos alertas criticos
- atalhos para os dois dashboards

## Persistencia e Escopo de MVP

O projeto mantem o escopo academico de forma intencional:

- sem integracao real com AWS
- sem IA real
- sem satelites reais
- sem drones reais
- sem backend complexo

Todos os dados permanecem simulados, estruturados localmente e persistidos apenas quando necessario com AsyncStorage.

## Como a Rubrica Obrigatoria Foi Atendida

- `React Native + Expo`: implementado com Expo SDK 54
- `Expo Router`: rotas baseadas em arquivos dentro de `app/`
- `useState`: usado em filtros, geolocalizacao, formulario e interacoes de interface
- `useEffect`: usado em hidratacao de tema, persistencia e animacao do radar
- `Context API`: providers globais para tema e dados da solucao
- `AsyncStorage`: persistencia de tema, alertas resolvidos e eventos criados
- `Formulario com validacao`: implementado em `app/simulation.tsx`
- `Dashboards / graficos`: dois dashboards distintos com graficos em `react-native-svg`
- `Componentizacao`: blocos reutilizaveis em toda a interface
- `UI coerente com tema espacial`: visual de central orbital, radar, indicadores e linguagem de monitoramento

## Integrantes

- Vitor Bebiano Mulford | RM 555026
- Lorenzo Hayashi Mangini | RM 554901
- Milton Cezar Bacanieski | RM 555206
- Victorio Maia Bastelli | RM 554723

## Instalacao e Execucao

```bash
npm install
npx expo start
```

## Observacao

Este projeto e um prototipo funcional academico. Ele simula sinais satelitais, monitoramento ambiental, sistemas autonomos e recomendacoes inspiradas em inteligencia para ilustrar um cenario integrado da Global Solution com um MVP solido, funcional e realista.
