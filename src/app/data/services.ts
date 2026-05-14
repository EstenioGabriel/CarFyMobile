import { Wrench, CircleDashed, Zap, Fuel, Droplets, Sparkles, Truck, MapPin } from "lucide-react";

export type ServiceType = 'mechanic' | 'tire' | 'ev' | 'gas' | 'carwash' | 'detailing' | 'towing';

export interface ServiceComment {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface AutoService {
  id: string;
  name: string;
  type: ServiceType;
  lat: number;
  lng: number;
  address: string;
  rating: number;
  phone: string;
  whatsapp?: string;
  openNow: boolean;
  hours?: string;
  description?: string;
  comments?: ServiceComment[];
}

export const serviceTypeMap: Record<ServiceType, { label: string; icon: any; color: string; bg: string }> = {
  mechanic: { label: 'Oficina', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100' },
  tire: { label: 'Borracharia', icon: CircleDashed, color: 'text-gray-700', bg: 'bg-gray-200' },
  ev: { label: 'Eletroposto', icon: Zap, color: 'text-green-600', bg: 'bg-green-100' },
  gas: { label: 'Posto de Combustível', icon: Fuel, color: 'text-orange-500', bg: 'bg-orange-100' },
  carwash: { label: 'Lava Jato', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-100' },
  detailing: { label: 'Estética', icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-100' },
  towing: { label: 'Reboque', icon: Truck, color: 'text-red-600', bg: 'bg-red-100' },
};

export const MOCK_SERVICES: AutoService[] = [
  {
    id: '1',
    name: 'Oficina São João',
    type: 'mechanic',
    lat: -3.7318616,
    lng: -38.5266704,
    address: 'Centro, Fortaleza - CE',
    rating: 4.5,
    phone: '(85) 99999-1111',
    whatsapp: '5585999991111',
    openNow: true,
    hours: 'Seg a Sex: 08:00 - 18:00 | Sáb: 08:00 - 12:00',
    description: 'Especialistas em injeção eletrônica e motor. Atendimento rápido e de confiança.',
    comments: [
      { id: 'c1', author: 'Carlos Silva', rating: 5, text: 'Excelente serviço, resolveram o problema do meu carro no mesmo dia!', date: '2023-10-15' },
      { id: 'c2', author: 'Maria Oliveira', rating: 4, text: 'Preço justo e bom atendimento. Pessoal muito educado.', date: '2023-11-02' },
      { id: 'c1b', author: 'Tiago Freitas', rating: 5, text: 'Diagnóstico rápido e preciso. Meu carro estava com problema na injeção e saiu novo!', date: '2024-03-08' },
      { id: 'c1c', author: 'Fernanda Mota', rating: 4, text: 'Bom atendimento, mas tive que esperar um pouco. No final ficou ótimo.', date: '2024-04-22' }
    ]
  },
  {
    id: '2',
    name: 'Borracharia do Zé',
    type: 'tire',
    lat: -3.7350000,
    lng: -38.5200000,
    address: 'Aldeota, Fortaleza - CE',
    rating: 4.2,
    phone: '(85) 98888-2222',
    whatsapp: '5585988882222',
    openNow: true,
    hours: '24 horas',
    description: 'Consertos, balanceamento e alinhamento. Vendemos pneus novos e usados.',
    comments: [
      { id: 'c3', author: 'Pedro Santos', rating: 5, text: 'Me salvou de madrugada, muito rápido.', date: '2023-12-10' },
      { id: 'c3b', author: 'Luciana Barros', rating: 4, text: 'Furei o pneu na Aldeota e em 10 minutos já estava resolvido. Super indico!', date: '2024-01-14' },
      { id: 'c3c', author: 'Marcos Gomes', rating: 3, text: 'Serviço ok, preço um pouco acima da média, mas funciona bem.', date: '2024-02-28' }
    ]
  },
  {
    id: '3',
    name: 'Eletroposto Enel Shopping',
    type: 'ev',
    lat: -3.7400000,
    lng: -38.4900000,
    address: 'Papicu, Fortaleza - CE',
    rating: 4.8,
    phone: '0800 280 0120',
    openNow: true,
    hours: 'Todos os dias: 10:00 - 22:00',
    description: 'Carregamento rápido (DC) e semi-rápido (AC) localizado no estacionamento do shopping.',
    comments: [
      { id: 'c6a', author: 'Gustavo Neves', rating: 5, text: 'Ótimo ponto de recarga! Usei enquanto fazia compras, prático demais.', date: '2024-03-01' },
      { id: 'c6b', author: 'Isabela Costa', rating: 5, text: 'Carregador rápido funcionando perfeitamente. 80% em menos de 40 minutos.', date: '2024-04-10' },
      { id: 'c6c', author: 'Rafael Duarte', rating: 4, text: 'Bom local, mas às vezes fica ocupado no fim de semana. Vale a pena reservar horário.', date: '2024-05-02' }
    ]
  },
  {
    id: '4',
    name: 'Posto Estrela',
    type: 'gas',
    lat: -3.7500000,
    lng: -38.5300000,
    address: 'Fátima, Fortaleza - CE',
    rating: 4.0,
    phone: '(85) 3222-3333',
    openNow: true,
    hours: '24 horas',
    description: 'Combustível com qualidade garantida. Conveniência e caixa eletrônico 24h.',
    comments: [
      { id: 'c7a', author: 'Juliana Rocha', rating: 4, text: 'Posto sempre limpo e bem abastecido. Atendentes simpáticos.', date: '2024-02-18' },
      { id: 'c7b', author: 'Henrique Lima', rating: 4, text: 'Bom posto, gasolina de qualidade. A conveniência tem bons preços também.', date: '2024-03-25' },
      { id: 'c7c', author: 'Simone Araújo', rating: 3, text: 'Fila razoável nos horários de pico, mas o serviço é rápido.', date: '2024-04-30' }
    ]
  },
  {
    id: '5',
    name: 'Acqua Lava Jato',
    type: 'carwash',
    lat: -3.7250000,
    lng: -38.5400000,
    address: 'Meireles, Fortaleza - CE',
    rating: 4.6,
    phone: '(85) 97777-4444',
    whatsapp: '5585977774444',
    openNow: false,
    hours: 'Ter a Dom: 08:00 - 17:00',
    description: 'Lavagem completa, higienização interna e hidratação de bancos de couro.',
    comments: [
      { id: 'c4', author: 'Ana Paula', rating: 5, text: 'O carro saiu brilhando, impecável!', date: '2024-01-20' },
      { id: 'c4b', author: 'Diego Mendes', rating: 5, text: 'Higienização interna de altíssima qualidade. Cheiro de carro novo!', date: '2024-02-14' },
      { id: 'c4c', author: 'Camila Ferreira', rating: 4, text: 'Muito cuidadosos com o carro. Recomendo a lavagem completa, vale cada centavo.', date: '2024-04-05' }
    ]
  },
  {
    id: '6',
    name: 'Premium Auto Estética',
    type: 'detailing',
    lat: -3.7450000,
    lng: -38.5100000,
    address: 'Dionísio Torres, Fortaleza - CE',
    rating: 4.9,
    phone: '(85) 96666-5555',
    whatsapp: '5585966665555',
    openNow: true,
    hours: 'Seg a Sáb: 08:00 - 18:00',
    description: 'Polimento cristalizado, vitrificação e estética automotiva de alto padrão.',
    comments: [
      { id: 'c8a', author: 'Rodrigo Pinheiro', rating: 5, text: 'Vitrificação perfeita! O carro parece zero quilômetro. Profissionalismo total.', date: '2024-01-30' },
      { id: 'c8b', author: 'Beatriz Cavalcante', rating: 5, text: 'Melhor estética de Fortaleza sem dúvida. Resultado incrível no polimento.', date: '2024-03-12' },
      { id: 'c8c', author: 'Leandro Martins', rating: 5, text: 'Atendimento premium do início ao fim. Valeu cada real investido!', date: '2024-04-18' },
      { id: 'c8d', author: 'Priscila Azevedo', rating: 4, text: 'Excelente trabalho. Só o prazo foi um pouco longo, mas o resultado compensou.', date: '2024-05-07' }
    ]
  },
  {
    id: '7',
    name: 'Reboque Rápido 24h',
    type: 'towing',
    lat: -3.7600000,
    lng: -38.5500000,
    address: 'Parquelândia, Fortaleza - CE',
    rating: 4.7,
    phone: '(85) 95555-6666',
    whatsapp: '5585955556666',
    openNow: true,
    hours: '24 horas',
    description: 'Atendimento rápido em toda Fortaleza e região metropolitana. Preço justo e guincho plataforma.',
    comments: [
      { id: 'c5', author: 'Roberto Alves', rating: 5, text: 'Chegaram em menos de 30 minutos, recomendo.', date: '2024-02-05' },
      { id: 'c5b', author: 'Tatiane Sousa', rating: 5, text: 'Meu carro quebrou na BR e eles vieram rapidinho. Preço honesto e motorista muito atencioso.', date: '2024-03-19' },
      { id: 'c5c', author: 'Eduardo Farias', rating: 4, text: 'Ótimo serviço de reboque. Carro transportado com cuidado e segurança.', date: '2024-04-27' }
    ]
  },
  {
    id: '8',
    name: 'Mecânica Confiança',
    type: 'mechanic',
    lat: -3.7650000,
    lng: -38.5600000,
    address: 'Antônio Bezerra, Fortaleza - CE',
    rating: 4.3,
    phone: '(85) 94444-7777',
    whatsapp: '5585944447777',
    openNow: true,
    hours: 'Seg a Sex: 08:00 - 17:00',
    description: 'Especialistas em suspensão e freios.',
    comments: [
      { id: 'c9a', author: 'Fábio Nogueira', rating: 4, text: 'Trocaram as pastilhas de freio rapidinho. Preço bem razoável para a qualidade.', date: '2024-02-22' },
      { id: 'c9b', author: 'Renata Campos', rating: 5, text: 'Meu carro estava com barulho na suspensão e eles identificaram o problema na hora. Muito competentes!', date: '2024-04-01' },
      { id: 'c9c', author: 'Vinícius Teles', rating: 4, text: 'Serviço de qualidade, mecânicos experientes. Recomendo para quem mora no Antônio Bezerra.', date: '2024-05-10' }
    ]
  },
  {
    id: '9',
    name: 'Borracharia 24 Horas',
    type: 'tire',
    lat: -3.7800000,
    lng: -38.5300000,
    address: 'Montese, Fortaleza - CE',
    rating: 4.1,
    phone: '(85) 93333-8888',
    whatsapp: '5585933338888',
    openNow: true,
    hours: '24 horas',
    description: 'Consertos rápidos de pneus. Atendimento a domicílio para trocas.',
    comments: [
      { id: 'c10a', author: 'Adriana Lopes', rating: 4, text: 'Furei de madrugada e eles atenderam em casa em 20 minutos. Salvaram minha noite!', date: '2024-01-08' },
      { id: 'c10b', author: 'Sérgio Moura', rating: 5, text: 'Atendimento a domicílio excelente. Trocaram o pneu furado sem eu precisar sair de casa.', date: '2024-03-15' },
      { id: 'c10c', author: 'Karina Bastos', rating: 3, text: 'Serviço razoável, demorou um pouco mais do que o esperado, mas resolveu o problema.', date: '2024-05-03' }
    ]
  },
  {
    id: '10',
    name: 'Auto Center Messejana',
    type: 'mechanic',
    lat: -3.8300000,
    lng: -38.4900000,
    address: 'Messejana, Fortaleza - CE',
    rating: 4.7,
    phone: '(85) 92222-3333',
    whatsapp: '5585922223333',
    openNow: true,
    hours: 'Seg a Sex: 07:30 - 18:00 | Sáb: 08:00 - 12:00',
    description: 'Oficina completa com serviços de mecânica geral, ar condicionado e troca de óleo.',
    comments: [
      { id: 'c11a', author: 'Anderson Lima', rating: 5, text: 'Excelente oficina! Pessoal muito honesto e preço justo. Voltarei sempre.', date: '2024-02-10' },
      { id: 'c11b', author: 'Paula Regina', rating: 4, text: 'Bom atendimento e serviço de qualidade. Recomendo para revisão completa.', date: '2024-03-28' }
    ]
  },
  {
    id: '11',
    name: 'Lava Jato Express',
    type: 'carwash',
    lat: -3.7420000,
    lng: -38.5450000,
    address: 'Benfica, Fortaleza - CE',
    rating: 4.3,
    phone: '(85) 91111-2222',
    whatsapp: '5585911112222',
    openNow: true,
    hours: 'Seg a Sáb: 07:00 - 19:00 | Dom: 08:00 - 13:00',
    description: 'Lavagem rápida e eficiente. Aspiração interna incluída em todos os pacotes.',
    comments: [
      { id: 'c12a', author: 'Márcia Sousa', rating: 4, text: 'Serviço rápido e bem feito. Preço acessível e sempre têm promoções.', date: '2024-01-25' },
      { id: 'c12b', author: 'Ricardo Pontes', rating: 5, text: 'Melhor custo-benefício da região. Sempre lavo meu carro aqui!', date: '2024-04-12' }
    ]
  },
  {
    id: '12',
    name: 'Posto Dunas',
    type: 'gas',
    lat: -3.7150000,
    lng: -38.5100000,
    address: 'Praia de Iracema, Fortaleza - CE',
    rating: 4.4,
    phone: '(85) 3444-5555',
    openNow: true,
    hours: '24 horas',
    description: 'Posto à beira-mar com combustível aditivado. Conveniência completa e troca de óleo expressa.',
    comments: [
      { id: 'c13a', author: 'Luiz Fernando', rating: 4, text: 'Posto bem localizado, sempre paro aqui. Combustível de qualidade.', date: '2024-02-14' },
      { id: 'c13b', author: 'Amanda Costa', rating: 5, text: 'Atendimento impecável e conveniência com ótimos produtos. Vale a pena!', date: '2024-03-20' }
    ]
  },
  {
    id: '13',
    name: 'Guincho Auto Resgate',
    type: 'towing',
    lat: -3.7700000,
    lng: -38.5800000,
    address: 'Barra do Ceará, Fortaleza - CE',
    rating: 4.8,
    phone: '(85) 98888-7777',
    whatsapp: '5585988887777',
    openNow: true,
    hours: '24 horas - Plantão permanente',
    description: 'Guincho 24h com cobertura em toda Grande Fortaleza. Atendimento rápido em emergências.',
    comments: [
      { id: 'c14a', author: 'Bruno Oliveira', rating: 5, text: 'Quebrei na estrada e em 15 minutos estavam lá. Profissionais exemplares!', date: '2024-01-30' },
      { id: 'c14b', author: 'Cláudia Macedo', rating: 5, text: 'Atendimento perfeito! Muito cuidado com o veículo e preço justo.', date: '2024-03-05' }
    ]
  },
  {
    id: '14',
    name: 'Mega Auto Center',
    type: 'mechanic',
    lat: -3.8100000,
    lng: -38.5400000,
    address: 'José de Alencar, Fortaleza - CE',
    rating: 4.6,
    phone: '(85) 97777-8888',
    whatsapp: '5585977778888',
    openNow: true,
    hours: 'Seg a Sex: 08:00 - 18:00',
    description: 'Especializada em sistemas de freios, suspensão e alinhamento computadorizado.',
    comments: [
      { id: 'c15a', author: 'Danilo Ferreira', rating: 5, text: 'Fizeram alinhamento e balanceamento perfeitos. Carro ficou novo!', date: '2024-02-08' },
      { id: 'c15b', author: 'Vanessa Lima', rating: 4, text: 'Boa oficina, serviço de qualidade. Apenas achei o prazo um pouco longo.', date: '2024-04-02' }
    ]
  },
  {
    id: '15',
    name: 'Wash & Go',
    type: 'carwash',
    lat: -3.7380000,
    lng: -38.4950000,
    address: 'Cocó, Fortaleza - CE',
    rating: 4.5,
    phone: '(85) 96666-9999',
    whatsapp: '5585966669999',
    openNow: false,
    hours: 'Ter a Dom: 08:00 - 18:00',
    description: 'Lava jato ecológico com produtos biodegradáveis. Lavagem a seco disponível.',
    comments: [
      { id: 'c16a', author: 'Patrícia Nunes', rating: 5, text: 'Adoro o conceito ecológico! Lavagem impecável e preocupação com o meio ambiente.', date: '2024-01-22' },
      { id: 'c16b', author: 'Alexandre Santos', rating: 4, text: 'Ótimo serviço, carro fica brilhando. Preço um pouco alto mas vale a pena.', date: '2024-03-17' }
    ]
  },
  {
    id: '16',
    name: 'Posto Verde',
    type: 'gas',
    lat: -3.7900000,
    lng: -38.5200000,
    address: 'Parangaba, Fortaleza - CE',
    rating: 4.2,
    phone: '(85) 3333-4444',
    openNow: true,
    hours: '24 horas',
    description: 'Combustível de qualidade com programa de fidelidade. Troca de óleo e calibragem grátis.',
    comments: [
      { id: 'c17a', author: 'Fernando Dias', rating: 4, text: 'Bom posto com preços competitivos. Programa de pontos é vantajoso.', date: '2024-02-25' },
      { id: 'c17b', author: 'Cristina Almeida', rating: 4, text: 'Sempre abasteço aqui. Frentistas atenciosos e serviço rápido.', date: '2024-04-08' }
    ]
  },
  {
    id: '17',
    name: 'Borracharia Pneu Forte',
    type: 'tire',
    lat: -3.7550000,
    lng: -38.5650000,
    address: 'Jacarecanga, Fortaleza - CE',
    rating: 4.4,
    phone: '(85) 95555-3333',
    whatsapp: '5585955553333',
    openNow: true,
    hours: 'Seg a Sáb: 07:00 - 19:00 | Dom: 08:00 - 12:00',
    description: 'Venda e conserto de pneus. Alinhamento e balanceamento com equipamento digital.',
    comments: [
      { id: 'c18a', author: 'Roberto Machado', rating: 4, text: 'Bom preço nos pneus e serviço de qualidade. Recomendo!', date: '2024-03-02' },
      { id: 'c18b', author: 'Elaine Barbosa', rating: 5, text: 'Atendimento excelente! Explicaram tudo detalhadamente antes de fazer o serviço.', date: '2024-04-15' }
    ]
  },
  {
    id: '18',
    name: 'Eletroposto RioMar',
    type: 'ev',
    lat: -3.7460000,
    lng: -38.4820000,
    address: 'Papicu, Fortaleza - CE',
    rating: 4.9,
    phone: '0800 123 4567',
    openNow: true,
    hours: 'Todos os dias: 09:00 - 22:00',
    description: 'Estação de recarga rápida para veículos elétricos. 4 pontos de carregamento disponíveis.',
    comments: [
      { id: 'c19a', author: 'Leonardo Souza', rating: 5, text: 'Carregadores sempre funcionando! Aproveitei para fazer compras enquanto carregava.', date: '2024-02-18' },
      { id: 'c19b', author: 'Bianca Melo', rating: 5, text: 'Infraestrutura perfeita para carros elétricos. Carregamento super rápido.', date: '2024-04-03' }
    ]
  },
  {
    id: '19',
    name: 'Premium Detailing Studio',
    type: 'detailing',
    lat: -3.7280000,
    lng: -38.5150000,
    address: 'Aldeota, Fortaleza - CE',
    rating: 4.9,
    phone: '(85) 99999-8888',
    whatsapp: '5585999998888',
    openNow: true,
    hours: 'Seg a Sex: 08:00 - 19:00 | Sáb: 09:00 - 14:00',
    description: 'Estética automotiva premium. Cristalização, polimento técnico e proteção cerâmica.',
    comments: [
      { id: 'c20a', author: 'Adriano Costa', rating: 5, text: 'Trabalho impecável! O polimento ficou espetacular, parece carro novo.', date: '2024-01-19' },
      { id: 'c20b', author: 'Renata Freitas', rating: 5, text: 'Melhor estética de Fortaleza sem dúvida. Cuidado e atenção aos detalhes.', date: '2024-03-24' }
    ]
  },
  {
    id: '20',
    name: 'Auto Socorro Expresso',
    type: 'towing',
    lat: -3.7200000,
    lng: -38.5350000,
    address: 'Joaquim Távora, Fortaleza - CE',
    rating: 4.6,
    phone: '(85) 94444-5555',
    whatsapp: '5585944445555',
    openNow: true,
    hours: '24 horas - Atendimento imediato',
    description: 'Guincho e socorro mecânico 24h. Cobertura em Fortaleza e região metropolitana.',
    comments: [
      { id: 'c21a', author: 'Sandra Vieira', rating: 5, text: 'Muito rápidos! Chegaram em 20 minutos e resolveram na hora. Salvaram meu dia!', date: '2024-02-11' },
      { id: 'c21b', author: 'Antônio Carlos', rating: 4, text: 'Bom atendimento e preço justo. Recomendo para emergências.', date: '2024-04-06' }
    ]
  },
];
