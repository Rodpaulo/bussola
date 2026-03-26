import { useState, useEffect } from "react";

// ─── PALETA DE CORES OFICIAL — BRAND BOOK BÚSSOLA ────────────────────────────
const BRAND = {
  ouro:       "#C4922A",  // Ouro Bússola (Primária) — CTAs, destaques, logótipo
  noite:      "#15120E",  // Fundo Noite — background dark
  carvao:     "#1C1915",  // Superfície Carvão — cards, componentes
  verde:      "#3D7A5E",  // Verde Compass — Parte II, sucesso
  roxo:       "#5C4E82",  // Roxo Profundo — Parte III, Ikigai, propósito
  areia:      "#EDE4D3",  // Areia Quente — texto principal sobre escuro
  areiaEsc:   "#C8BCA8",  // Areia escura — texto secundário
  mutado:     "#5A5040",  // Texto mutado, subtext
  borda:      "#2A2218",  // Bordas subtis
  bordaClara: "#3A3020",  // Bordas com mais presença
};

// ─── DADOS DO QUESTIONÁRIO ────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "wheel",
    partLabel: "Parte I",
    title: "Onde Estás Hoje",
    intro: "Avalia o teu nível actual de satisfação em cada área da vida. Sê honesto — esta é a tua bússola privada, não uma avaliação de desempenho.",
    accent: BRAND.ouro,
    questions: [
      { id: "w1", type: "scale", label: "Saúde & Energia", subtext: "Vitalidade física, qualidade do sono, os teus níveis de energia ao longo do dia" },
      { id: "w2", type: "scale", label: "Carreira & Trabalho", subtext: "Até que ponto a tua vida profissional actual te parece significativa, alinhada e com propósito" },
      { id: "w3", type: "scale", label: "Finanças", subtext: "O teu sentido de segurança, liberdade e paz em relação ao dinheiro" },
      { id: "w4", type: "scale", label: "Relações", subtext: "Quão nutrido e ligado te sentes com família, amigos e pessoas próximas" },
      { id: "w5", type: "scale", label: "Crescimento Pessoal", subtext: "O quanto estás a aprender, a evoluir e a tornar-te quem queres ser" },
      { id: "w6", type: "scale", label: "Diversão & Criatividade", subtext: "Alegria, leveza, beleza e expressão criativa na tua vida quotidiana" },
      { id: "w7", type: "scale", label: "Propósito & Significado", subtext: "O teu sentido de direcção, importância e razão de ser" },
      { id: "w8", type: "scale", label: "Ambiente & Espaço", subtext: "Até que ponto a tua casa, cidade e meio te apoiam em quem és" },
      { id: "w9", type: "textarea", label: "Qual destas áreas sentes ser mais urgente trabalhar agora?", subtext: "Não penses demasiado — vai com o que te vem primeiro." },
      { id: "w10", type: "textarea", label: "Qual área, se melhorada, teria o maior efeito em cadeia em tudo o resto?", subtext: "Pensa na peça que faz as outras mover-se." },
    ],
  },
  {
    id: "perma",
    partLabel: "Parte II",
    title: "Como Funcionas",
    intro: "Estas perguntas vão além da superfície — para perceber o que te move, o que te drena, e que possibilidades já existem na tua vida neste momento.",
    accent: BRAND.verde,
    questions: [
      { id: "p1", type: "textarea", label: "Descreve um momento recente em que estavas completamente absorto no que fazias.", subtext: "O que fazias? O que tornava aquilo tão envolvente?" },
      { id: "p2", type: "textarea", label: "Que tipo de actividade faz o tempo desaparecer para ti?", subtext: "Aquela coisa em que olhas para o relógio e passaram três horas." },
      { id: "p3", type: "textarea", label: "De que conquista dos últimos 12 meses te orgulhas mais — por menor que seja?", subtext: "Não precisa de impressionar ninguém além de ti." },
      { id: "p4", type: "textarea", label: "O que sentes inacabado ou não vivido e que te incomoda em silêncio?", subtext: "Aquilo que ainda não fizeste mas não consegues largar completamente." },
      { id: "p5", type: "textarea", label: "Em que pensas nos momentos de silêncio — a caminhar, antes de adormecer?", subtext: "Pensamentos que voltam sem seres convidado." },
      { id: "p6", type: "textarea", label: "Quem na tua vida acredita activamente no teu potencial?", subtext: "Pensa no que essa pessoa vê em ti que talvez tu não vejas." },
      {
        id: "p7", type: "choice", label: "As pessoas à tua volta, na maioria...", subtext: "Sê honesto. Isto é importante para o teu próximo capítulo.",
        choices: ["Desafiam-me a crescer e a ser mais", "Mantêm-me confortável e confirmam quem já sou", "Uma mistura — depende da pessoa", "Nenhum dos dois — sinto-me maioritariamente sozinho nisto"],
      },
      { id: "p8", type: "textarea", label: "O que te drena mais energia neste momento?", subtext: "Obrigações, pessoas, ambientes, hábitos — sê específico." },
      { id: "p9", type: "textarea", label: "Quais são os teus constrangimentos reais?", subtext: "Tempo, dinheiro, geografia, dependentes, saúde — lista o que genuinamente te limita hoje." },
      {
        id: "p10", type: "choice", label: "Numa semana típica, quantas horas podias realisticamente dedicar a um projecto pessoal?", subtext: "Sê realista, não aspiracional.",
        choices: ["Menos de 3 horas — a vida está muito cheia agora", "3 a 7 horas — algo é possível", "7 a 15 horas — tenho margem real", "Mais de 15 horas — posso comprometer-me a sério"],
      },
      { id: "p11", type: "scale", label: "Estado emocional actual", subtext: "1 = esgotado, preso, fechado  ·  10 = energizado, aberto, vivo" },
      { id: "p12", type: "textarea", label: "Qual é o maior medo que te impede de tentar algo novo?", subtext: "Falhar? O julgamento dos outros? Perder tempo? Outra coisa? Nomeia-o." },
    ],
  },
  {
    id: "ikigai",
    partLabel: "Parte III",
    title: "Para Onde Podes Ir",
    intro: "Agora mapeamos o território à frente. Estas perguntas revelam o cruzamento entre as tuas paixões, as tuas forças, o que o mundo precisa e o que podes ser recompensado por fazer.",
    accent: BRAND.roxo,
    questions: [
      { id: "i1", type: "textarea", label: "Se tivesses um sábado completamente livre, sem obrigações nem expectativas, como o passarias?", subtext: "Não o que 'devias' fazer — o que realmente farias." },
      { id: "i2", type: "textarea", label: "Sobre que temas podes ler, ver ou falar durante horas sem te aborrecer?", subtext: "Assuntos que sempre tiveram uma atracção magnética sobre ti." },
      { id: "i3", type: "textarea", label: "O que adoravas fazer em criança ou jovem adulto e que abandonaste entretanto?", subtext: "Actividades ou formas de ser que deixaste para trás." },
      { id: "i4", type: "textarea", label: "Para que te procuram sistematicamente, te pedem conselho ou te agradecem?", subtext: "Os outros vêem muitas vezes as nossas forças antes de nós." },
      { id: "i5", type: "textarea", label: "Que competências construíste ao longo dos anos de que te orgulhas em silêncio?", subtext: "Profissionais e pessoais — inclui as que consideras óbvias." },
      { id: "i6", type: "textarea", label: "O que te sai naturalmente e parece difícil para a maioria das pessoas?", subtext: "Coisas que fazes sem esforço e que os outros lutam para conseguir." },
      { id: "i7", type: "textarea", label: "Que problema no mundo te deixa genuinamente indignado ou triste?", subtext: "A injustiça, a lacuna ou o sofrimento de que não consegues desviar o olhar." },
      { id: "i8", type: "textarea", label: "Que tipo de pessoa mais queres ajudar ou servir?", subtext: "Um perfil específico, comunidade, fase de vida ou tipo de dificuldade." },
      { id: "i9", type: "textarea", label: "O que construirias ou criarias se soubesses que ia correr bem?", subtext: "Remove o medo do fracasso completamente. O que farias?" },
      {
        id: "i10", type: "choice", label: "Quão importante é o retorno financeiro do teu próximo projecto?", subtext: "Sê honesto sobre as tuas necessidades e os teus valores.",
        choices: ["Crítico — tem de gerar rendimento real", "Importante, mas secundário ao impacto e ao significado", "Seria bom ter, mas não é o ponto principal", "Irrelevante por agora — isto é sobre significado e expressão"],
      },
      { id: "i11", type: "textarea", label: "Que valor poderias criar para os outros que pagariam, te seguiriam ou dariam o seu tempo?", subtext: "Pensa no que poderias genuinamente oferecer ao mundo." },
      { id: "i12", type: "textarea", label: "Descreve a tua vida ideal daqui a 5 anos num parágrafo curto.", subtext: "Onde estás? O que fazes? Com quem estás? Como te sentes?" },
      { id: "i13", type: "textarea", label: "Qual é o projecto ou direcção que continua a voltar — mesmo que te assuste?", subtext: "A ideia a que continuas a regressar mas à qual ainda não te comprometeste completamente." },
    ],
  },
];

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `És um consultor de orientação de vida com profunda experiência em psicologia positiva (modelo PERMA), design de carreira, filosofia Ikigai e potencial humano. Recebes as respostas completas a um questionário de 35 perguntas de uma pessoa que procura clareza sobre o seu caminho.

REGRA CRÍTICA — QUALIDADE DO RELATÓRIO:
Nunca repitas nem parafrasees as respostas do utilizador. O teu papel é interpretar, sintetizar e revelar padrões que a pessoa não consegue ver sozinha. Um bom relatório surpreende — diz algo verdadeiro que a pessoa ainda não tinha conseguido articular. Se o utilizador disse "sinto-me perdido no trabalho", não escrevas "sentes-te perdido no trabalho". Escreve o que isso significa, o que revela, e o que sugere sobre o próximo passo. Vai sempre além do que foi dito.

REGRA CRÍTICA — ESPECIFICIDADE:
Nunca uses frases genéricas que poderiam aplicar-se a qualquer pessoa. Cada frase do relatório deve ser verdadeira especificamente para esta pessoa e falsa para a maioria das outras. Se consegues imaginar o mesmo parágrafo num relatório diferente, reescreve-o.

REGRA CRÍTICA — TOM:
Fala como um amigo inteligente que conhece bem a pessoa — directo, cálido, sem condescendência, sem elogios vazios. Não digas "que resposta interessante" nem "é admirável que". Vai directo ao ponto.

CONTEXTO CULTURAL PORTUGUÊS — aplica isto em todo o relatório:
- Escreve em português de Portugal. Usa a forma "tu" (não "você"). Sem brasileirismos.
- O mercado de trabalho português tem uma estrutura dual: sector público e grandes empresas oferecem estabilidade mas mobilidade limitada. O ecossistema de startups está a crescer (mais de 5.000 startups activas, €448M captados em 2024) mas os salários continuam abaixo da média europeia.
- Para adultos 30–50 anos: o guião social da "boa vida" (emprego estável, casa, família) foi muitas vezes seguido à custa da realização pessoal. Muitos estão agora a questionar isso — não é uma crise de meia-idade, é um despertar para possibilidades não vividas.
- Para jovens adultos 22–32 anos: a narrativa da "fuga de cérebros" é real e psicologicamente pesada. Desafia isto activamente quando o perfil da pessoa não o justifica.
- Constrangimentos reais em Portugal: custos de habitação em Lisboa e Porto, Segurança Social, AT — reconhece estes quando sugeres caminhos de projecto.
- O tom deve parecer uma carta de um amigo português inteligente que leva a pessoa a sério — directo, cálido, sem guru, sem auto-ajuda de aeroporto.

Devolve APENAS JSON válido. Sem markdown. Sem backticks. Sem preâmbulo. Usa exactamente esta estrutura:

{
  "situationProfile": "2 a 3 parágrafos a avaliar a situação actual com total especificidade. NÃO sejas genérico. Escreve em português de Portugal.",
  "ikigaiCompass": {
    "whatYouLove": "2 a 3 frases sobre as paixões e energizadores da pessoa",
    "whatYoureGoodAt": "2 a 3 frases sobre as forças e competências evidentes",
    "whatWorldNeeds": "2 a 3 frases sobre direcção de impacto com referência ao contexto português",
    "whatYouCanBeRewardedFor": "2 a 3 frases sobre criação de valor viável em Portugal"
  },
  "projectPaths": [
    {
      "rank": 1,
      "title": "Título curto e evocativo",
      "archetype": "Uma palavra de: Builder, Teacher, Maker, Connector, Explorer, Healer, Advocate, Creator, Curator, Strategist",
      "description": "2 a 3 frases concretas com contexto português",
      "whyItFitsYou": "2 a 3 frases baseadas nas respostas reais",
      "firstThreeSteps": ["Acção ESTA semana", "Acção ESTE mês", "Acção em 90 dias"]
    }
  ],
  "actionPlan": {
    "weeks1to4": "Foco e acções concretas para o primeiro mês",
    "weeks5to8": "O que consolidar e próximos movimentos",
    "weeks9to12": "O marco dos 3 meses"
  },
  "closingThought": "Um parágrafo final poderoso e honesto que fala directamente a esta pessoa. Em português de Portugal, tom de amigo inteligente."
}

Gera 3 a 5 caminhos de projecto. Faz do primeiro a oportunidade mais clara. Escreve TODO o relatório em português de Portugal.`;

// ─── ARCHETYPE MAPS ───────────────────────────────────────────────────────────

const archetypeLabels = {
  Builder: "Construtor", Teacher: "Professor", Maker: "Criador",
  Connector: "Conector", Explorer: "Explorador", Healer: "Curador",
  Advocate: "Defensor", Creator: "Criativo", Curator: "Curador", Strategist: "Estratega",
};

const archetypeColor = {
  Builder: BRAND.ouro, Teacher: BRAND.verde, Maker: BRAND.ouro,
  Connector: BRAND.verde, Explorer: BRAND.roxo, Healer: BRAND.verde,
  Advocate: BRAND.roxo, Creator: BRAND.ouro, Curator: BRAND.roxo, Strategist: BRAND.ouro,
};

// ─── COMPASS ROSE ─────────────────────────────────────────────────────────────

function CompassRose({ size = 120 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.43;
  const ri = size * 0.32, rm = size * 0.17;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={BRAND.ouro} strokeWidth="0.6" opacity="0.5" />
      <circle cx={cx} cy={cy} r={ri} fill="none" stroke={BRAND.ouro} strokeWidth="0.4" opacity="0.3" />
      <circle cx={cx} cy={cy} r={rm} fill="none" stroke={BRAND.ouro} strokeWidth="0.3" opacity="0.3" />
      <circle cx={cx} cy={cy} r={size * 0.025} fill={BRAND.ouro} opacity="0.8" />
      {[0,90,180,270].map(deg => {
        const rad = deg * Math.PI / 180;
        return <line key={deg}
          x1={cx + rm * Math.sin(rad)} y1={cy - rm * Math.cos(rad)}
          x2={cx + r * Math.sin(rad)} y2={cy - r * Math.cos(rad)}
          stroke={BRAND.ouro} strokeWidth="0.7" opacity="0.5" />;
      })}
      {[45,135,225,315].map(deg => {
        const rad = deg * Math.PI / 180;
        return <line key={deg}
          x1={cx + rm * Math.sin(rad)} y1={cy - rm * Math.cos(rad)}
          x2={cx + ri * Math.sin(rad)} y2={cy - ri * Math.cos(rad)}
          stroke={BRAND.ouro} strokeWidth="0.4" opacity="0.3" />;
      })}
      {/* North needle — gold */}
      <polygon points={`${cx},${cy - r * 0.9} ${cx - size*0.04},${cy} ${cx + size*0.04},${cy}`}
        fill={BRAND.ouro} opacity="0.9" />
      {/* South needle — muted */}
      <polygon points={`${cx},${cy + r * 0.9} ${cx - size*0.03},${cy} ${cx + size*0.03},${cy}`}
        fill={BRAND.areiaEsc} opacity="0.3" />
      {/* N label */}
      <text x={cx} y={cy - r * 0.9 - 5} textAnchor="middle" dominantBaseline="auto"
        fill={BRAND.ouro} fontSize={size * 0.07} fontFamily="'DM Sans', sans-serif"
        fontWeight="500" opacity="0.8" letterSpacing="1">N</text>
    </svg>
  );
}

// ─── RODA DA VIDA ─────────────────────────────────────────────────────────────

function WheelChart({ scores, labels }) {
  const cx = 150, cy = 150, r = 100;
  const n = scores.length;
  const toXY = (i, val) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const rv = (val / 10) * r;
    return { x: cx + rv * Math.cos(angle), y: cy + rv * Math.sin(angle) };
  };
  const toLabelPos = (i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + (r + 30) * Math.cos(angle), y: cy + (r + 30) * Math.sin(angle) };
  };
  const points = scores.map((s, i) => { const p = toXY(i, s || 0); return `${p.x},${p.y}`; }).join(" ");
  return (
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: "280px", display: "block", margin: "0 auto 12px" }}>
      {[2,4,6,8,10].map(ring => (
        <polygon key={ring}
          points={Array.from({ length: n }, (_, i) => { const p = toXY(i, ring); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke={BRAND.borda} strokeWidth={ring === 10 ? "0.8" : "0.5"} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const outer = toXY(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={BRAND.borda} strokeWidth="0.5" />;
      })}
      <polygon points={points} fill={`${BRAND.ouro}18`} stroke={BRAND.ouro} strokeWidth="1.5" strokeLinejoin="round" />
      {scores.map((s, i) => {
        const p = toXY(i, s || 0);
        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill={BRAND.noite} stroke={BRAND.ouro} strokeWidth="1.5" />
            <circle cx={p.x} cy={p.y} r="2" fill={BRAND.ouro} />
          </g>
        );
      })}
      {labels.map((label, i) => {
        const lp = toLabelPos(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill={BRAND.mutado} fontSize="9" fontFamily="'DM Sans', sans-serif">{label}</text>
        );
      })}
    </svg>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function SectionBlock({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "64px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
        <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <p style={{ fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", color: accent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{title}</p>
        <div style={{ flex: 1, height: "0.5px", background: BRAND.borda }} />
      </div>
      {children}
    </div>
  );
}

function Divider({ color = BRAND.ouro }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "52px 0" }}>
      <div style={{ flex: 1, height: "0.5px", background: BRAND.borda }} />
      <div style={{ width: "4px", height: "4px", background: color, borderRadius: "50%", opacity: 0.4 }} />
      <div style={{ flex: 1, height: "0.5px", background: BRAND.borda }} />
    </div>
  );
}

// ─── RESULTS VIEW ─────────────────────────────────────────────────────────────

function ResultsView({ result, answers, onRestart }) {
  const wheelIds = ["w1","w2","w3","w4","w5","w6","w7","w8"];
  const wheelLabels = ["Saúde","Carreira","Finanças","Relações","Crescimento","Criativ.","Propósito","Ambiente"];
  const wheelLabelsFull = ["Saúde & Energia","Carreira & Trabalho","Finanças","Relações","Crescimento Pessoal","Diversão & Criatividade","Propósito & Significado","Ambiente & Espaço"];
  const wheelScores = wheelIds.map(id => answers[id] || 0);

  const ikigaiItems = [
    { key: "whatYouLove", label: "O Que Amas", symbol: "♥", color: BRAND.ouro },
    { key: "whatYoureGoodAt", label: "No Que És Bom", symbol: "◆", color: BRAND.verde },
    { key: "whatWorldNeeds", label: "O Que o Mundo Precisa", symbol: "◎", color: BRAND.roxo },
    { key: "whatYouCanBeRewardedFor", label: "O Que Te Pode Recompensar", symbol: "✦", color: BRAND.ouro },
  ];

  const planPhases = [
    { key: "weeks1to4", label: "Semanas 1–4", sub: "Fundação", color: BRAND.ouro },
    { key: "weeks5to8", label: "Semanas 5–8", sub: "Momentum", color: BRAND.verde },
    { key: "weeks9to12", label: "Semanas 9–12", sub: "Marco", color: BRAND.roxo },
  ];

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "120px" }}>

      {/* Cabeçalho */}
      <div style={{ marginBottom: "80px", position: "relative" }}>
        <div style={{ position: "absolute", right: "-10px", top: "-20px", opacity: 0.06 }}>
          <CompassRose size={160} />
        </div>
        <p style={{ fontSize: "10px", letterSpacing: "4px", color: BRAND.mutado, textTransform: "uppercase", marginBottom: "20px", fontFamily: "'DM Sans', sans-serif" }}>
          Bússola · Relatório Pessoal
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 62px)", fontWeight: 300, lineHeight: 1.05, color: BRAND.areia, marginBottom: "20px" }}>
          O Teu Caminho<br /><em style={{ fontStyle: "italic", color: BRAND.ouro }}>Em Frente</em>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "48px", height: "1px", background: BRAND.ouro }} />
          <p style={{ fontSize: "12px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic", letterSpacing: "0.5px" }}>
            Encontra o teu norte.
          </p>
        </div>
      </div>

      {/* Roda da Vida */}
      <SectionBlock title="A Tua Roda da Vida" accent={BRAND.ouro}>
        <WheelChart scores={wheelScores} labels={wheelLabels} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "20px" }}>
          {wheelLabels.map((label, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 6px", background: BRAND.carvao, borderRadius: "6px", border: `0.5px solid ${BRAND.borda}` }}>
              <p style={{ fontSize: "22px", fontFamily: "'Cormorant Garamond', serif", color: BRAND.ouro, fontWeight: 500, lineHeight: 1 }}>{wheelScores[i]}</p>
              <p style={{ fontSize: "9px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", marginTop: "5px", letterSpacing: "0.3px" }}>{label}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Situação Actual */}
      <SectionBlock title="A Tua Situação Actual" accent={BRAND.ouro}>
        {result.situationProfile.split(/\n\n+/).map((para, i, arr) => (
          <p key={i} style={{ fontSize: "16px", lineHeight: 1.9, color: BRAND.areiaEsc, marginBottom: i < arr.length - 1 ? "22px" : 0, fontFamily: "'DM Sans', sans-serif" }}>
            {para.trim()}
          </p>
        ))}
      </SectionBlock>

      <Divider color={BRAND.verde} />

      {/* Bússola Ikigai */}
      <SectionBlock title="A Tua Bússola Ikigai" accent={BRAND.verde}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {ikigaiItems.map(item => (
            <div key={item.key} style={{
              padding: "22px", background: BRAND.carvao,
              border: `0.5px solid ${BRAND.borda}`, borderRadius: "8px",
              borderTop: `2px solid ${item.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <span style={{ color: item.color, fontSize: "12px" }}>{item.symbol}</span>
                <p style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: item.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{item.label}</p>
              </div>
              <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: BRAND.areiaEsc, fontFamily: "'DM Sans', sans-serif" }}>
                {result.ikigaiCompass[item.key]}
              </p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <Divider color={BRAND.roxo} />

      {/* Caminhos de Projecto */}
      <SectionBlock title="Os Teus Caminhos de Projecto" accent={BRAND.roxo}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {result.projectPaths.map((path, i) => {
            const pAccent = archetypeColor[path.archetype] || BRAND.ouro;
            const isTop = i === 0;
            return (
              <div key={i} style={{
                padding: "30px", background: BRAND.carvao,
                border: `0.5px solid ${isTop ? pAccent + "55" : BRAND.borda}`,
                borderRadius: "8px", position: "relative", overflow: "hidden",
              }}>
                {isTop && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: pAccent }} />}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase", color: pAccent, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    {isTop ? "✦ Recomendação Principal" : `Caminho ${i + 1}`}
                  </span>
                  <span style={{ fontSize: "10px", color: pAccent, padding: "3px 12px", border: `0.5px solid ${pAccent}44`, borderRadius: "20px", fontFamily: "'DM Sans', sans-serif" }}>
                    {archetypeLabels[path.archetype] || path.archetype}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, color: BRAND.areia, marginBottom: "14px", lineHeight: 1.2 }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: BRAND.areiaEsc, marginBottom: "14px", fontFamily: "'DM Sans', sans-serif" }}>
                  {path.description}
                </p>
                <p style={{ fontSize: "13px", lineHeight: 1.75, color: BRAND.mutado, marginBottom: "26px", fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>
                  Porque se adequa a ti: {path.whyItFitsYou}
                </p>
                <p style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase", color: pAccent, marginBottom: "16px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Primeiros Três Passos</p>
                {path.firstThreeSteps.map((step, j) => (
                  <div key={j} style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: j < 2 ? "12px" : 0 }}>
                    <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: `1px solid ${pAccent}55`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                      <span style={{ fontSize: "10px", color: pAccent, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{j + 1}</span>
                    </div>
                    <p style={{ fontSize: "14px", lineHeight: 1.7, color: BRAND.areiaEsc, fontFamily: "'DM Sans', sans-serif" }}>{step}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </SectionBlock>

      <Divider color={BRAND.ouro} />

      {/* Plano 90 Dias */}
      <SectionBlock title="O Teu Plano de 90 Dias" accent={BRAND.ouro}>
        {planPhases.map((phase, i) => (
          <div key={phase.key} style={{ display: "flex", gap: "24px", paddingBottom: i < 2 ? "36px" : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "32px", flexShrink: 0 }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: `1.5px solid ${phase.color}`, display: "flex", alignItems: "center", justifyContent: "center", background: `${phase.color}14` }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: phase.color }} />
              </div>
              {i < 2 && <div style={{ width: "1px", flex: 1, background: BRAND.borda, marginTop: "6px" }} />}
            </div>
            <div style={{ flex: 1, paddingTop: "5px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "8px" }}>
                <p style={{ fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase", color: phase.color, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{phase.label}</p>
                <p style={{ fontSize: "11px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>{phase.sub}</p>
              </div>
              <p style={{ fontSize: "15px", lineHeight: 1.85, color: BRAND.areiaEsc, fontFamily: "'DM Sans', sans-serif" }}>{result.actionPlan[phase.key]}</p>
            </div>
          </div>
        ))}
      </SectionBlock>

      {/* Pensamento Final */}
      <div style={{ borderLeft: `2px solid ${BRAND.ouro}`, paddingLeft: "28px", marginBottom: "64px", position: "relative" }}>
        <div style={{ position: "absolute", top: "-4px", left: "-5px", width: "8px", height: "8px", borderRadius: "50%", background: BRAND.ouro }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, fontStyle: "italic", lineHeight: 1.9, color: BRAND.areia }}>
          {result.closingThought}
        </p>
      </div>

      {/* Footer da marca */}
      <div style={{ textAlign: "center", marginBottom: "52px", opacity: 0.4 }}>
        <p style={{ fontSize: "10px", letterSpacing: "4px", color: BRAND.areiaEsc, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
          Bússola · Encontra o teu norte.
        </p>
      </div>

      {/* Botões */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button
          onClick={() => {
            const lines = ["BÚSSOLA — RELATÓRIO PESSOAL", "Encontra o teu norte.", "============================\n"];
            lines.push("RODA DA VIDA\n------------");
            wheelLabelsFull.forEach((l, i) => lines.push(`${l}: ${answers[wheelIds[i]] || "–"} / 10`));
            lines.push("\nA TUA SITUAÇÃO ACTUAL\n---------------------");
            lines.push(result.situationProfile);
            lines.push("\nBÚSSOLA IKIGAI\n--------------");
            lines.push(`O Que Amas:\n${result.ikigaiCompass.whatYouLove}\n`);
            lines.push(`No Que És Bom:\n${result.ikigaiCompass.whatYoureGoodAt}\n`);
            lines.push(`O Que o Mundo Precisa:\n${result.ikigaiCompass.whatWorldNeeds}\n`);
            lines.push(`O Que Te Pode Recompensar:\n${result.ikigaiCompass.whatYouCanBeRewardedFor}\n`);
            lines.push("CAMINHOS DE PROJECTO\n--------------------");
            result.projectPaths.forEach((p, i) => {
              lines.push(`\n${i + 1}. ${p.title} [${archetypeLabels[p.archetype] || p.archetype}]`);
              lines.push(p.description);
              lines.push(`\nPorque se adequa a ti: ${p.whyItFitsYou}`);
              lines.push("\nPrimeiros Três Passos:");
              p.firstThreeSteps.forEach((s, j) => lines.push(`  ${j+1}. ${s}`));
            });
            lines.push("\nPLANO DE 90 DIAS\n----------------");
            lines.push(`Semanas 1–4:\n${result.actionPlan.weeks1to4}\n`);
            lines.push(`Semanas 5–8:\n${result.actionPlan.weeks5to8}\n`);
            lines.push(`Semanas 9–12:\n${result.actionPlan.weeks9to12}\n`);
            lines.push("UM PENSAMENTO FINAL\n-------------------");
            lines.push(result.closingThought);
            const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "bussola-relatorio.txt"; a.click();
            URL.revokeObjectURL(url);
          }}
          style={{ padding: "13px 28px", background: BRAND.ouro, color: BRAND.noite, border: "none", borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", letterSpacing: "0.3px" }}
        >↓ Guardar Relatório</button>

        <button onClick={() => window.print()}
          style={{ padding: "13px 28px", background: "transparent", color: BRAND.areiaEsc, border: `0.5px solid ${BRAND.bordaClara}`, borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
        >⎙ Imprimir / PDF</button>

        <button onClick={onRestart}
          style={{ padding: "13px 28px", background: "transparent", color: BRAND.mutado, border: `0.5px solid ${BRAND.borda}`, borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
        >↺ Recomeçar</button>
      </div>
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function LifeCompass() {
  const [phase, setPhase] = useState("welcome");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(true);
  const [loadingTick, setLoadingTick] = useState(0);

  const currentSection = SECTIONS[sectionIdx];
  const currentQuestion = currentSection?.questions[questionIdx];
  const totalQ = SECTIONS.reduce((s, sec) => s + sec.questions.length, 0);
  const answeredCount = SECTIONS.slice(0, sectionIdx).reduce((s, sec) => s + sec.questions.length, 0) + questionIdx;
  const progressPct = totalQ > 0 ? (answeredCount / totalQ) * 100 : 0;
  const accent = currentSection?.accent || BRAND.ouro;

  useEffect(() => {
    if (phase === "processing") {
      const iv = setInterval(() => setLoadingTick(t => (t + 1) % 4), 600);
      return () => clearInterval(iv);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "question" && currentQuestion) {
      const saved = answers[currentQuestion.id];
      setCurrentAnswer(saved !== undefined ? saved : "");
    }
  }, [phase, sectionIdx, questionIdx]);

  const fade = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 280);
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    const v = currentAnswer;
    if (currentQuestion.type === "scale") return typeof v === "number" && v >= 1;
    if (currentQuestion.type === "choice") return typeof v === "string" && v.length > 0;
    if (currentQuestion.type === "textarea") return typeof v === "string" && v.trim().length > 3;
    return false;
  };

  const handleNext = () => {
    const newAnswers = { ...answers };
    if (currentQuestion && currentAnswer !== "" && currentAnswer !== undefined) {
      newAnswers[currentQuestion.id] = currentAnswer;
    }
    setAnswers(newAnswers);
    setVisible(false);
    setTimeout(() => {
      if (questionIdx < currentSection.questions.length - 1) {
        const nextQ = currentSection.questions[questionIdx + 1];
        setQuestionIdx(q => q + 1);
        setCurrentAnswer(newAnswers[nextQ.id] !== undefined ? newAnswers[nextQ.id] : "");
      } else if (sectionIdx < SECTIONS.length - 1) {
        setSectionIdx(s => s + 1);
        setQuestionIdx(0);
        setCurrentAnswer("");
        setPhase("section-intro");
      } else {
        setPhase("processing");
        generateResults(newAnswers);
      }
      setVisible(true);
    }, 280);
  };

  const handleBack = () => {
    const newAnswers = { ...answers };
    if (currentQuestion && currentAnswer !== "" && currentAnswer !== undefined) {
      newAnswers[currentQuestion.id] = currentAnswer;
    }
    setAnswers(newAnswers);
    setVisible(false);
    setTimeout(() => {
      if (questionIdx > 0) {
        const prevQ = currentSection.questions[questionIdx - 1];
        setQuestionIdx(q => q - 1);
        setCurrentAnswer(newAnswers[prevQ.id] !== undefined ? newAnswers[prevQ.id] : "");
      } else if (sectionIdx > 0) {
        const prevSection = SECTIONS[sectionIdx - 1];
        const prevQ = prevSection.questions[prevSection.questions.length - 1];
        setSectionIdx(s => s - 1);
        setQuestionIdx(prevSection.questions.length - 1);
        setCurrentAnswer(newAnswers[prevQ.id] !== undefined ? newAnswers[prevQ.id] : "");
        setPhase("question");
      } else {
        setPhase("welcome");
      }
      setVisible(true);
    }, 280);
  };

  const generateResults = async (allAnswers) => {
    setErrorMsg(null);
    const lines = ["AVALIAÇÃO BÚSSOLA — RESPOSTAS COMPLETAS\n"];
    SECTIONS.forEach(sec => {
      lines.push(`\n## ${sec.partLabel}: ${sec.title}`);
      sec.questions.forEach(q => {
        const a = allAnswers[q.id];
        if (a !== undefined && a !== "") {
          lines.push(`\nP: ${q.label}`);
          lines.push(`R: ${a}`);
        }
      });
    });

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: lines.join("\n") }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      const jsonMatch = text.match(/\{[\s\S]*\}/);
if (!jsonMatch) throw new Error("No JSON found");
const clean = jsonMatch[0];
const parsed = JSON.parse(clean);
      setResult(parsed);
      setPhase("results");
    } catch (err) {
      setErrorMsg("Algo correu mal ao gerar o teu relatório. Por favor tenta novamente.");
      setPhase("question");
      setSectionIdx(SECTIONS.length - 1);
      setQuestionIdx(SECTIONS[SECTIONS.length - 1].questions.length - 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: BRAND.noite, color: BRAND.areia, position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea { resize: none; }
        textarea::placeholder { color: #4A4030; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.bordaClara}; border-radius: 2px; }
        .b-fade { opacity: 1; transform: translateY(0); transition: opacity 0.28s ease, transform 0.28s ease; }
        .b-hidden { opacity: 0; transform: translateY(12px); }
        @keyframes b-spin { to { transform: rotate(360deg); } }
        @keyframes b-needle { 0%{transform:rotate(-8deg)} 50%{transform:rotate(8deg)} 100%{transform:rotate(-8deg)} }
      `}</style>

      {/* Ambient glows nas cores da marca */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `
          radial-gradient(ellipse at 8% 75%, ${BRAND.ouro}07 0%, transparent 45%),
          radial-gradient(ellipse at 92% 12%, ${BRAND.verde}05 0%, transparent 45%),
          radial-gradient(ellipse at 50% 95%, ${BRAND.roxo}04 0%, transparent 40%)
        `,
      }} />

      {/* Barra de progresso com cor da secção actual */}
      {phase === "question" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: BRAND.borda, zIndex: 100 }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: accent, transition: "width 0.5s ease, background 0.6s ease" }} />
        </div>
      )}

      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>

        {/* ── BOAS-VINDAS ── */}
        {phase === "welcome" && (
          <div className={`b-fade ${!visible ? "b-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px" }}>

            {/* Wordmark com rosa dos ventos */}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "64px" }}>
              <CompassRose size={56} />
              <div>
                <p style={{ fontSize: "24px", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: BRAND.ouro, letterSpacing: "5px", textTransform: "uppercase", lineHeight: 1 }}>Bússola</p>
                <p style={{ fontSize: "10px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", letterSpacing: "2px", marginTop: "5px" }}>Encontra o teu norte.</p>
              </div>
            </div>

            <p style={{ fontSize: "10px", letterSpacing: "3.5px", color: BRAND.mutado, textTransform: "uppercase", marginBottom: "20px", fontFamily: "'DM Sans', sans-serif" }}>
              Uma Avaliação de Orientação de Vida
            </p>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(50px, 9vw, 78px)", fontWeight: 300, lineHeight: 1.02, color: BRAND.areia, marginBottom: "28px" }}>
              Descobre<br /><em style={{ fontStyle: "italic", color: BRAND.ouro }}>o Teu Norte</em>
            </h1>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "32px" }}>
              <div style={{ width: "48px", height: "1px", background: BRAND.ouro }} />
              <p style={{ fontSize: "12px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
                O design da Bússola é deliberadamente anti-wellness.
              </p>
            </div>

            <p style={{ fontSize: "16px", lineHeight: 1.85, color: BRAND.areiaEsc, maxWidth: "500px", marginBottom: "12px", fontFamily: "'DM Sans', sans-serif" }}>
              Esta avaliação combina três frameworks baseados em ciência —
              a <strong style={{ color: BRAND.areia, fontWeight: 500 }}>Roda da Vida</strong>,
              o <strong style={{ color: BRAND.areia, fontWeight: 500 }}>modelo PERMA</strong> e
              o <strong style={{ color: BRAND.areia, fontWeight: 500 }}>Ikigai</strong> — para te dar uma
              imagem honesta de onde estás e um caminho concreto em frente.
            </p>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: BRAND.mutado, marginBottom: "52px", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
              35 perguntas · 3 partes · 20–30 minutos · Plano de acção personalizado por IA
            </p>

            {/* Secções */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "56px", maxWidth: "440px" }}>
              {SECTIONS.map((s) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 18px", background: BRAND.carvao, borderRadius: "6px", border: `0.5px solid ${BRAND.borda}`, borderLeft: `2px solid ${s.accent}` }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "10px", color: s.accent, letterSpacing: "2.5px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{s.partLabel}</span>
                    <span style={{ fontSize: "10px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif" }}> · </span>
                    <span style={{ fontSize: "14px", color: BRAND.areiaEsc, fontFamily: "'DM Sans', sans-serif" }}>{s.title}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", flexShrink: 0 }}>{s.questions.length} perguntas</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => fade(() => { setSectionIdx(0); setPhase("section-intro"); })}
              style={{ alignSelf: "flex-start", padding: "15px 42px", background: BRAND.ouro, color: BRAND.noite, border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.5px", cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.88"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              Começar a Avaliação →
            </button>
          </div>
        )}

        {/* ── INTRODUÇÃO DE SECÇÃO ── */}
        {phase === "section-intro" && currentSection && (
          <div className={`b-fade ${!visible ? "b-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1.5px solid ${currentSection.accent}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: currentSection.accent }} />
              </div>
              <p style={{ fontSize: "10px", letterSpacing: "3px", color: currentSection.accent, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                {currentSection.partLabel}
              </p>
            </div>

            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 7vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: BRAND.areia, marginBottom: "20px" }}>
              {currentSection.title}
            </h2>

            <div style={{ width: "36px", height: "1px", background: currentSection.accent, marginBottom: "28px" }} />

            <p style={{ fontSize: "16px", lineHeight: 1.85, color: BRAND.areiaEsc, maxWidth: "520px", marginBottom: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              {currentSection.intro}
            </p>
            <p style={{ fontSize: "12px", color: BRAND.mutado, marginBottom: "52px", fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
              {currentSection.questions.length} perguntas nesta parte
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              {sectionIdx > 0 && (
                <button
                  onClick={() => fade(() => {
                    const prev = SECTIONS[sectionIdx - 1];
                    setSectionIdx(s => s - 1);
                    setQuestionIdx(prev.questions.length - 1);
                    setCurrentAnswer(answers[prev.questions[prev.questions.length - 1].id] || "");
                    setPhase("question");
                  })}
                  style={{ padding: "14px 24px", background: "transparent", color: BRAND.mutado, border: `0.5px solid ${BRAND.borda}`, borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
                >← Voltar</button>
              )}
              <button
                onClick={() => fade(() => {
                  setQuestionIdx(0);
                  setCurrentAnswer(answers[currentSection.questions[0].id] || "");
                  setPhase("question");
                })}
                style={{ padding: "14px 36px", background: currentSection.accent, color: BRAND.noite, border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer", letterSpacing: "0.3px" }}
              >
                Começar {currentSection.partLabel} →
              </button>
            </div>
          </div>
        )}

        {/* ── PERGUNTA ── */}
        {phase === "question" && currentQuestion && (
          <div className={`b-fade ${!visible ? "b-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "100px" }}>

            {errorMsg && (
              <div style={{ padding: "14px 18px", background: "rgba(180,60,60,0.08)", border: "0.5px solid rgba(180,60,60,0.25)", borderRadius: "6px", marginBottom: "28px", fontSize: "14px", color: "#D08080", fontFamily: "'DM Sans', sans-serif" }}>
                {errorMsg}
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "52px" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: accent }} />
              <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif" }}>
                <span style={{ color: accent }}>{currentSection.partLabel}</span>
                {" · Pergunta "}{questionIdx + 1}{" de "}{currentSection.questions.length}
              </p>
            </div>

            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 4.5vw, 33px)", fontWeight: 400, lineHeight: 1.35, color: BRAND.areia, marginBottom: "14px" }}>
              {currentQuestion.label}
            </h3>
            <p style={{ fontSize: "13px", color: BRAND.mutado, marginBottom: "36px", lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
              {currentQuestion.subtext}
            </p>

            {/* Escala */}
            {currentQuestion.type === "scale" && (
              <div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button key={n} onClick={() => setCurrentAnswer(n)}
                      style={{
                        width: "50px", height: "50px", borderRadius: "6px",
                        border: `0.5px solid ${currentAnswer === n ? accent : (n <= (currentAnswer || 0) ? accent + "55" : BRAND.borda)}`,
                        background: currentAnswer === n ? accent : n <= (currentAnswer || 0) ? `${accent}10` : "transparent",
                        color: currentAnswer === n ? BRAND.noite : (n <= (currentAnswer || 0) ? accent : BRAND.mutado),
                        fontSize: "15px", fontFamily: "'Cormorant Garamond', serif",
                        cursor: "pointer", transition: "all 0.13s ease",
                        fontWeight: currentAnswer === n ? 600 : 300,
                      }}>
                      {n}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontSize: "11px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>Baixo</span>
                  <span style={{ fontSize: "11px", color: BRAND.mutado, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>Alto</span>
                </div>
              </div>
            )}

            {/* Escolha */}
            {currentQuestion.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {currentQuestion.choices.map((choice, i) => (
                  <button key={i} onClick={() => setCurrentAnswer(choice)}
                    style={{
                      padding: "16px 20px", textAlign: "left",
                      background: currentAnswer === choice ? `${accent}0E` : "transparent",
                      border: `0.5px solid ${currentAnswer === choice ? accent : BRAND.borda}`,
                      borderRadius: "6px",
                      color: currentAnswer === choice ? BRAND.areia : BRAND.areiaEsc,
                      fontSize: "14px", fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer", transition: "all 0.13s ease", lineHeight: 1.55,
                    }}>
                    <span style={{ color: currentAnswer === choice ? accent : BRAND.mutado, marginRight: "12px", fontSize: "10px" }}>
                      {currentAnswer === choice ? "◆" : "◇"}
                    </span>
                    {choice}
                  </button>
                ))}
              </div>
            )}

            {/* Área de texto */}
            {currentQuestion.type === "textarea" && (
              <textarea
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Toma o teu tempo..."
                style={{
                  width: "100%", minHeight: "150px", padding: "20px",
                  background: BRAND.carvao,
                  border: `0.5px solid ${currentAnswer && currentAnswer.trim().length > 3 ? accent + "66" : BRAND.borda}`,
                  borderRadius: "6px", color: BRAND.areia, fontSize: "15px",
                  fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75,
                  transition: "border-color 0.2s ease", outline: "none",
                }}
              />
            )}

            {/* Navegação */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "44px" }}>
              <button onClick={handleBack}
                style={{ padding: "12px 0", background: "transparent", color: BRAND.mutado, border: "none", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", letterSpacing: "0.3px" }}>
                ← Voltar
              </button>
              <button onClick={handleNext} disabled={!canProceed()}
                style={{
                  padding: "13px 34px",
                  background: canProceed() ? accent : BRAND.borda,
                  color: canProceed() ? BRAND.noite : BRAND.mutado,
                  border: "none", borderRadius: "4px", fontSize: "13.5px",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                  cursor: canProceed() ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease", opacity: canProceed() ? 1 : 0.4,
                  letterSpacing: "0.3px",
                }}>
                {questionIdx === currentSection.questions.length - 1 && sectionIdx === SECTIONS.length - 1
                  ? "Gerar a Minha Bússola →"
                  : "Continuar →"}
              </button>
            </div>
          </div>
        )}

        {/* ── A PROCESSAR ── */}
        {phase === "processing" && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ marginBottom: "48px", animation: "b-needle 3s ease-in-out infinite", transformOrigin: "center" }}>
              <CompassRose size={88} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 300, color: BRAND.areia, marginBottom: "14px", letterSpacing: "0.5px" }}>
              A mapear a tua bússola{".".repeat(loadingTick + 1)}
            </h2>
            <p style={{ fontSize: "13px", color: BRAND.mutado, maxWidth: "300px", lineHeight: 1.85, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>
              A analisar as tuas 35 respostas através da Roda da Vida, do modelo PERMA e do Ikigai.
            </p>
          </div>
        )}

        {/* ── RESULTADOS ── */}
        {phase === "results" && result && (
          <div className={`b-fade ${!visible ? "b-hidden" : ""}`}>
            <ResultsView result={result} answers={answers} onRestart={() => {
              setPhase("welcome"); setAnswers({}); setSectionIdx(0);
              setQuestionIdx(0); setCurrentAnswer(""); setResult(null); setErrorMsg(null);
            }} />
          </div>
        )}

      </div>
    </div>
  );
}
