# 🛰️ DefenseShield Orbital Intelligence

> **Transformando dados espaciais em inteligência para proteger o futuro.**

O **DefenseShield Orbital Intelligence** é um MVP mobile desenvolvido com **React Native + Expo** para a **Global Solution 2026.1 da FIAP**.

A aplicação simula uma central orbital de monitoramento capaz de consolidar informações provenientes de satélites, sensores, drones e sistemas autônomos para apoiar a prevenção de desastres, monitoramento ambiental e gestão de riscos.

O projeto demonstra como tecnologias inspiradas pela indústria espacial podem gerar impactos positivos na Terra por meio de uma plataforma moderna, acessível e orientada à tomada de decisão.

---

# 🚀 Objetivo da Solução

Governos, empresas e organizações precisam monitorar grandes volumes de dados provenientes de:

* Satélites
* Sensores IoT
* Drones
* Infraestruturas críticas
* Sistemas autônomos
* Dados climáticos e ambientais

Quando essas informações ficam dispersas, a identificação de riscos se torna mais lenta, aumentando impactos operacionais, ambientais e econômicos.

O **DefenseShield Orbital Intelligence** atua como uma plataforma central de monitoramento e apoio à decisão, reunindo indicadores estratégicos, alertas simulados e dashboards inteligentes para auxiliar respostas rápidas a eventos críticos.

Neste MVP acadêmico, todos os dados são simulados para representar o funcionamento esperado da solução em um ambiente real.

---

# 🏗️ Arquitetura da Solução

O DefenseShield Orbital Intelligence simula um fluxo completo de monitoramento:

1. Coleta de dados simulados provenientes de satélites, sensores IoT, drones e APIs climáticas
2. Processamento e classificação dos eventos monitorados
3. Consolidação dos dados em dashboards executivos e ambientais
4. Geração de alertas operacionais
5. Apoio à tomada de decisão através do aplicativo mobile

Todo o fluxo foi projetado para representar uma futura plataforma escalável voltada à economia espacial e ao monitoramento inteligente de riscos.

---

# 🎯 Público-Alvo

A solução foi idealizada para:

* Defesa Civil
* Órgãos governamentais
* Empresas de energia
* Operadores logísticos
* Administradores de infraestrutura crítica
* Organizações ambientais
* Futuras operações espaciais
* Bases lunares e estações espaciais comerciais

---

# 📱 Funcionalidades

## Dashboard Executivo

Visão estratégica para tomada de decisão:

* Alertas ativos
* Alertas resolvidos
* Risco médio geral
* Sistemas autônomos em operação
* Distribuição de alertas por categoria
* Evolução temporal dos riscos

## Dashboard Ambiental

Monitoramento climático e ambiental:

* Temperatura média
* Umidade média
* Índice de queimadas
* Índice de enchentes
* Região mais crítica
* Comparação de risco entre regiões
* Tendências ambientais

## Gestão de Alertas

* Visualização de alertas simulados
* Filtro por status
* Marcação de alertas resolvidos
* Persistência local

## Monitoramento de Regiões

Monitoramento de áreas simuladas:

* Amazônia
* Área costeira
* Usina solar
* Porto estratégico
* Base lunar simulada

Com informações de:

* Temperatura
* Umidade
* Índice de risco
* Fonte dos dados
* Última atualização

## Cadastro de Ocorrências

Formulário com validação para:

* Nome da ocorrência
* Tipo de risco
* Região
* Severidade
* Descrição

## Geolocalização

Utilização de recurso nativo do dispositivo:

* Solicitação de permissão
* Captura de latitude e longitude
* Identificação da localização do usuário

## Personalização

* Tema claro
* Tema escuro
* Persistência de preferências

---

# 🌌 Relação com a Indústria Espacial

O projeto está diretamente relacionado aos conceitos da indústria espacial moderna:

* Dados satelitais para observação terrestre
* Sensoriamento remoto
* Inteligência Artificial aplicada à análise de riscos
* Sistemas autônomos e robótica
* Economia espacial
* Infraestrutura orbital

A proposta demonstra como tecnologias desenvolvidas para aplicações espaciais podem ser utilizadas para solucionar problemas reais enfrentados por governos, empresas e organizações na Terra.

---

# 🌍 Objetivos de Desenvolvimento Sustentável (ODS)

## ODS 9 — Indústria, Inovação e Infraestrutura

O projeto promove o desenvolvimento de soluções tecnológicas voltadas para infraestrutura inteligente, resiliente e inovadora.

## ODS 11 — Cidades e Comunidades Sustentáveis

A plataforma auxilia na prevenção de riscos e no monitoramento de áreas urbanas e estratégicas, contribuindo para cidades mais preparadas e sustentáveis.

## ODS 13 — Ação Contra a Mudança Global do Clima

O sistema enfatiza monitoramento climático, prevenção de desastres e análise de indicadores ambientais relacionados às mudanças climáticas.

---

# 🛠️ Tecnologias Utilizadas

* React Native
* Expo
* Expo Router
* TypeScript
* Context API
* AsyncStorage
* React Native SVG
* Expo Location
* Expo Vector Icons

---

# 📂 Estrutura do Projeto

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

# 📊 Como os Requisitos da Disciplina Foram Atendidos

| Requisito           | Implementação                           |
| ------------------- | --------------------------------------- |
| React Native + Expo | Aplicação desenvolvida com Expo SDK     |
| Expo Router         | Navegação baseada em arquivos           |
| useState            | Filtros, formulários e estados locais   |
| useEffect           | Persistência, carregamento e animações  |
| Context API         | Estado global para tema e dados         |
| AsyncStorage        | Persistência local                      |
| Formulários         | Cadastro de ocorrências                 |
| Dashboards          | Dashboard Executivo e Ambiental         |
| Gráficos            | React Native SVG                        |
| Componentização     | Componentes reutilizáveis               |
| UI Espacial         | Central orbital com radar e indicadores |

---

# 🖼️ Capturas de Tela

## Home

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 15 PM" src="https://github.com/user-attachments/assets/d0cf7456-9a0c-46c5-989c-8548f5380edd" />

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 16 PM" src="https://github.com/user-attachments/assets/2d93ea00-d9cf-41a3-a7bf-e3ac43dee558" />

---

## Dashboard Executivo

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 16 PM (1)" src="https://github.com/user-attachments/assets/8098102c-7ad4-4721-a4e1-b54df95a97ec" />

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 16 PM (2)" src="https://github.com/user-attachments/assets/08288f8a-4ef5-47bd-82d9-af41231cf50d" />

---

## Dashboard Ambiental

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 16 PM (3)" src="https://github.com/user-attachments/assets/1c938579-f80b-409d-bd43-debb1bbfe958" />

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM" src="https://github.com/user-attachments/assets/efc13798-7b51-4eac-bdd8-8ec304813b15" />

---

## Alertas

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM (1)" src="https://github.com/user-attachments/assets/e8c58e81-238a-4d68-bb11-75a06d97ab52" />

---

## Monitoramento

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM (2)" src="https://github.com/user-attachments/assets/4363449a-9eef-4f9e-a8e5-66925b6de8c2" />

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM (2)" src="https://github.com/user-attachments/assets/810eb239-27b2-4ea8-a4fa-a43c933d50cb" />

---

## Simulação

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM (4)" src="https://github.com/user-attachments/assets/a84f5fb1-adb0-4c0e-9cd2-f5327229c4ed" />

---

<img width="739" height="1600" alt="WhatsApp Image 2026-06-07 at 3 09 17 PM (5)" src="https://github.com/user-attachments/assets/b056405d-b2c3-4f23-9e43-281ca84e1166" />

---

# 🔮 Evoluções Futuras

Possíveis evoluções da plataforma:

* Integração com APIs reais de observação terrestre
* Integração com serviços meteorológicos em tempo real
* Notificações Push
* Integração com serviços Cloud
* Machine Learning para análise preditiva
* Monitoramento de infraestruturas espaciais reais
* Controle de missões autônomas

---

# 👨‍💻 Integrantes

* **Vitor Bebiano Mulford** | RM: 555026
* **Lorenzo Hayashi Mangini** | RM: 554901
* **Milton Cezar Bacanieski** | RM: 555206
* **Victório Maia Bastelli** | RM: 554723

---

# ⚙️ Instalação e Execução

```bash
npm install
npx expo start
```

---

# 📌 Observação

Este projeto é um **protótipo funcional acadêmico** desenvolvido para a Global Solution 2026.1.

A aplicação simula monitoramento ambiental, dados satelitais, sistemas autônomos e análise de riscos para demonstrar o potencial de tecnologias inspiradas pela indústria espacial, sem depender de integrações reais complexas ou infraestrutura externa.
