export default {
  slug: 'go2-pro-clearance-bench',
  title: 'Go2 PRO Clearance Bench',
  group: 'Unitree Go2 PRO',
  color: '#327046',
  tagline: {
    en: 'Check the space swept by an entire path, including between waypoints.',
    pt: 'Analise o espaço percorrido pelo trajeto inteiro, inclusive entre pontos.',
  },
  description:
    'EN: Continuous-path clearance prototype; Unitree Go2 PRO roadmap. PT: Protótipo de análise contínua de espaço livre em trajetos; plano para o Unitree Go2 PRO.',
  topics: [
    'unitree-go2',
    'robotics',
    'geometry',
    'collision-detection',
    'accessibility',
    'javascript',
  ],
  setting: {
    key: 'marginM',
    label: {
      en: 'Additional margin (m)',
      pt: 'Margem adicional (m)',
    },
    min: 0,
    max: 5,
    step: 0.05,
  },
};
