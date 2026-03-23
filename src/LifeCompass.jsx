import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: "wheel",
    partLabel: "Part I",
    title: "Where You Stand Today",
    intro:
      "Rate your current level of satisfaction in each life domain. Be honest — this is your private compass, not a performance review.",
    accent: "#C4922A",
    questions: [
      { id: "w1", type: "scale", label: "Health & Energy", subtext: "Physical vitality, sleep quality, your energy levels throughout the day" },
      { id: "w2", type: "scale", label: "Career & Work", subtext: "How fulfilling, aligned, and purposeful your current professional life feels" },
      { id: "w3", type: "scale", label: "Finances", subtext: "Your sense of security, freedom, and peace around money" },
      { id: "w4", type: "scale", label: "Relationships", subtext: "How nourished and connected you feel with family, friends, and close ones" },
      { id: "w5", type: "scale", label: "Personal Growth", subtext: "How much you are learning, evolving, and becoming who you want to be" },
      { id: "w6", type: "scale", label: "Fun & Creativity", subtext: "Joy, play, beauty, and creative expression in your daily life" },
      { id: "w7", type: "scale", label: "Purpose & Meaning", subtext: "Your sense of direction, significance, and reason for being" },
      { id: "w8", type: "scale", label: "Environment & Space", subtext: "How much your home, city, and surroundings support who you are" },
      { id: "w9", type: "textarea", label: "Which of these areas feels most urgent to address right now?", subtext: "Don't overthink — go with your gut." },
      { id: "w10", type: "textarea", label: "Which area, if improved, would have the biggest ripple effect on everything else in your life?", subtext: "Think of the keystone domino." },
    ],
  },
  {
    id: "perma",
    partLabel: "Part II",
    title: "How You Operate",
    intro:
      "These questions go beneath the surface — to understand what drives you, what drains you, and what possibilities already exist in your life right now.",
    accent: "#5A9B7A",
    questions: [
      { id: "p1", type: "textarea", label: "Describe a recent moment when you were completely absorbed in what you were doing.", subtext: "What were you doing? What made it so engaging?" },
      { id: "p2", type: "textarea", label: "What type of activity makes time disappear for you?", subtext: "The thing where you look up and three hours have passed." },
      { id: "p3", type: "textarea", label: "What achievement in the last 12 months are you most proud of — however small?", subtext: "It doesn't need to impress anyone but you." },
      { id: "p4", type: "textarea", label: "What feels unfinished or unlived that quietly bothers you?", subtext: "The thing you haven't done yet but can't fully let go of." },
      { id: "p5", type: "textarea", label: "What do you find yourself thinking about in quiet moments — on walks, before sleep?", subtext: "Thoughts that return uninvited." },
      { id: "p6", type: "textarea", label: "Who in your life actively believes in your potential?", subtext: "Name them. Think about what they see in you that you might miss." },
      {
        id: "p7", type: "choice", label: "The people around you mostly...", subtext: "Be honest. This matters for your next chapter.",
        choices: ["Challenge me to grow and become more", "Keep me comfortable and affirm who I already am", "A mix — it depends on the person", "Neither — I feel mostly alone in this"],
      },
      { id: "p8", type: "textarea", label: "What drains your energy most right now?", subtext: "Obligations, people, environments, habits — be specific." },
      { id: "p9", type: "textarea", label: "What are your real constraints?", subtext: "Time, money, geography, dependents, health — list what genuinely limits you today." },
      {
        id: "p10", type: "choice", label: "On a typical week, how many hours could you realistically dedicate to a personal project?", subtext: "Be realistic, not aspirational.",
        choices: ["Fewer than 3 hours — life is very full right now", "3–7 hours — something is possible", "7–15 hours — I have real bandwidth", "15+ hours — I can commit seriously"],
      },
      { id: "p11", type: "scale", label: "Current emotional baseline", subtext: "1 = depleted, stuck, closed  ·  10 = energized, open, alive" },
      { id: "p12", type: "textarea", label: "What's the biggest fear that holds you back from trying something new?", subtext: "Failure? Judgment? Wasting time? Something else? Name it." },
    ],
  },
  {
    id: "ikigai",
    partLabel: "Part III",
    title: "Where You Could Go",
    intro:
      "Now we map the territory ahead. These questions reveal the intersection between your passions, your strengths, what the world needs, and what you can be rewarded for.",
    accent: "#8B7BAB",
    questions: [
      { id: "i1", type: "textarea", label: "If you had a completely free Saturday with no obligations or expectations, how would you spend it?", subtext: "Not what you 'should' do — what you'd actually do." },
      { id: "i2", type: "textarea", label: "What topics could you read about, watch, or talk about for hours without getting bored?", subtext: "Subjects that have always had a magnetic pull on you." },
      { id: "i3", type: "textarea", label: "What did you love doing as a child or young adult that you've since abandoned?", subtext: "Activities or modes of being you left behind." },
      { id: "i4", type: "textarea", label: "What do people consistently come to you for, ask your advice on, or thank you for?", subtext: "Others often see our strengths before we do." },
      { id: "i5", type: "textarea", label: "What skills have you built over the years that you're quietly proud of?", subtext: "Professional and personal — include the ones you take for granted." },
      { id: "i6", type: "textarea", label: "What comes naturally to you that seems hard for most people?", subtext: "Things you do effortlessly that others struggle with." },
      { id: "i7", type: "textarea", label: "What problem in the world genuinely makes you angry or sad?", subtext: "The injustice, gap, or suffering you can't look away from." },
      { id: "i8", type: "textarea", label: "Who is the kind of person you most want to help or serve?", subtext: "A specific person type, community, stage of life, or kind of struggle." },
      { id: "i9", type: "textarea", label: "What would you build or create if you knew it would succeed?", subtext: "Remove the fear of failure entirely. What would you make?" },
      {
        id: "i10", type: "choice", label: "How important is financial return from your next project?", subtext: "Be honest about your needs and your values.",
        choices: ["Critical — it must generate real income", "Important but secondary to impact and meaning", "Nice to have, but not the main point", "Irrelevant for now — this is about meaning and expression"],
      },
      { id: "i11", type: "textarea", label: "What value could you create for others that they'd pay for, follow you for, or give their time for?", subtext: "Think about what you could genuinely offer the world." },
      { id: "i12", type: "textarea", label: "Describe your ideal life in 5 years in a short paragraph.", subtext: "Where are you? What are you doing? Who are you with? How do you feel?" },
      { id: "i13", type: "textarea", label: "What's the one project or direction that keeps coming back to you — even if it scares you?", subtext: "The idea you keep returning to but haven't fully committed to yet." },
    ],
  },
];

const SYSTEM_PROMPT = `You are a masterful life direction consultant with deep expertise in positive psychology (PERMA model), career design, Ikigai philosophy, and human potential. You have received the complete responses to a 35-question life compass assessment from someone seeking clarity on their path forward.

Your task: produce a deeply personalized, concrete, honest, and actionable report. Be specific — reference the person's actual answers. Be honest — name contradictions and blind spots kindly. Be practical — every recommendation must be actionable.

Return ONLY valid JSON. No markdown. No backticks. No preamble. Use exactly this structure:

{
  "situationProfile": "2-3 paragraphs assessing their current situation with full specificity. Identify their strengths, tensions, and the underlying themes across their answers. Do NOT be generic.",
  "ikigaiCompass": {
    "whatYouLove": "2-3 sentences synthesizing their passions and energizers based on their actual answers",
    "whatYoureGoodAt": "2-3 sentences on their evident strengths and skills from their answers",
    "whatWorldNeeds": "2-3 sentences on the impact and service direction that fits this specific person",
    "whatYouCanBeRewardedFor": "2-3 sentences on viable value creation given their profile and constraints"
  },
  "projectPaths": [
    {
      "rank": 1,
      "title": "Short evocative title for this path",
      "archetype": "One word from: Builder, Teacher, Maker, Connector, Explorer, Healer, Advocate, Creator, Curator, Strategist",
      "description": "2-3 sentences describing what this project path is concretely and what form it could take in practice",
      "whyItFitsYou": "2-3 sentences explaining specifically why THIS path fits THIS person based on their actual answers",
      "firstThreeSteps": ["Concrete action to take THIS week", "Concrete action to take THIS month", "Concrete action to take in 90 days"]
    }
  ],
  "actionPlan": {
    "weeks1to4": "Specific focus and concrete actions for the first month — what to do, what to stop, what to start",
    "weeks5to8": "What to build on, what experiments to run, and next moves for weeks 5-8",
    "weeks9to12": "The 3-month milestone — what it should look like and how to know you're on track"
  },
  "closingThought": "One powerful, personal, honest closing paragraph that speaks directly to this person — acknowledge their specific situation and fear, and give them the honest push they need."
}

Generate exactly 3 to 5 project paths ordered from most to least recommended. Make path #1 the clearest, most actionable opportunity you see. Ground every recommendation in what they actually told you.`;

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const C = {
  bg: "#15120E",
  surface: "#1C1915",
  surfaceHover: "#23201A",
  border: "#2C2820",
  borderLight: "#3A3328",
  textPrimary: "#EDE4D3",
  textSecondary: "#9A8C7A",
  textMuted: "#5A5040",
};

// ─── WHEEL CHART ─────────────────────────────────────────────────────────────

function WheelChart({ scores, labels }) {
  const cx = 150, cy = 150, r = 105;
  const n = scores.length;
  const toXY = (i, val) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const rv = (val / 10) * r;
    return { x: cx + rv * Math.cos(angle), y: cy + rv * Math.sin(angle) };
  };
  const toLabel = (i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + (r + 30) * Math.cos(angle), y: cy + (r + 30) * Math.sin(angle) };
  };
  const points = scores.map((s, i) => { const p = toXY(i, s || 0); return `${p.x},${p.y}`; }).join(" ");

  return (
    <svg viewBox="0 0 300 300" style={{ width: "100%", maxWidth: "300px", display: "block", margin: "0 auto 8px" }}>
      {[2, 4, 6, 8, 10].map(ring => (
        <polygon key={ring}
          points={Array.from({ length: n }, (_, i) => { const p = toXY(i, ring); return `${p.x},${p.y}`; }).join(" ")}
          fill="none" stroke={C.border} strokeWidth="0.8"
        />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const outer = toXY(i, 10);
        return <line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={C.border} strokeWidth="0.8" />;
      })}
      <polygon points={points} fill="rgba(196,146,42,0.15)" stroke="#C4922A" strokeWidth="1.5" strokeLinejoin="round" />
      {scores.map((s, i) => { const p = toXY(i, s || 0); return <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#C4922A" />; })}
      {labels.map((label, i) => {
        const lp = toLabel(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fill={C.textMuted} fontSize="9.5" fontFamily="'DM Sans', sans-serif"
          >{label}</text>
        );
      })}
    </svg>
  );
}

// ─── SECTION WRAPPER ─────────────────────────────────────────────────────────

function SectionBlock({ title, accent, children }) {
  return (
    <div style={{ marginBottom: "60px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
        <p style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: accent, fontFamily: "'DM Sans', sans-serif" }}>{title}</p>
        <div style={{ flex: 1, height: "1px", background: C.border }} />
      </div>
      {children}
    </div>
  );
}

// ─── RESULTS VIEW ────────────────────────────────────────────────────────────

function ResultsView({ result, answers, onRestart }) {
  const wheelIds = ["w1","w2","w3","w4","w5","w6","w7","w8"];
  const wheelLabels = ["Health","Career","Finance","Relations","Growth","Creativity","Purpose","Space"];
  const wheelScores = wheelIds.map(id => answers[id] || 0);

  const archetypeColor = {
    Builder: "#C4922A", Teacher: "#5A9B7A", Maker: "#C4922A", Connector: "#5A9B7A",
    Explorer: "#8B7BAB", Healer: "#5A9B7A", Advocate: "#8B7BAB", Creator: "#C4922A",
    Curator: "#8B7BAB", Strategist: "#C4922A",
  };

  const ikigaiItems = [
    { key: "whatYouLove", label: "What You Love", symbol: "♥", color: "#C4922A" },
    { key: "whatYoureGoodAt", label: "What You're Good At", symbol: "◆", color: "#5A9B7A" },
    { key: "whatWorldNeeds", label: "What The World Needs", symbol: "◎", color: "#8B7BAB" },
    { key: "whatYouCanBeRewardedFor", label: "What Rewards You", symbol: "✦", color: "#C4922A" },
  ];

  const planPhases = [
    { key: "weeks1to4", label: "Weeks 1–4", sub: "Foundation" },
    { key: "weeks5to8", label: "Weeks 5–8", sub: "Momentum" },
    { key: "weeks9to12", label: "Weeks 9–12", sub: "Milestone" },
  ];

  return (
    <div style={{ paddingTop: "80px", paddingBottom: "120px" }}>
      {/* Report header */}
      <div style={{ marginBottom: "72px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "3px", color: C.textMuted, textTransform: "uppercase", marginBottom: "18px", fontFamily: "'DM Sans', sans-serif" }}>
          Life Compass · Personal Report
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 7vw, 68px)", fontWeight: 300, lineHeight: 1.05, color: C.textPrimary, marginBottom: "24px" }}>
          Your Path<br /><em style={{ fontStyle: "italic" }}>Forward</em>
        </h1>
        <div style={{ width: "40px", height: "1.5px", background: "#C4922A" }} />
      </div>

      {/* Life Balance Snapshot */}
      <SectionBlock title="Life Balance Snapshot" accent="#C4922A">
        <WheelChart scores={wheelScores} labels={wheelLabels} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", marginTop: "20px" }}>
          {wheelLabels.map((label, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "18px", fontFamily: "'Cormorant Garamond', serif", color: "#C4922A", fontWeight: 500 }}>{wheelScores[i]}</p>
              <p style={{ fontSize: "10px", color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Situation Profile */}
      <SectionBlock title="Your Current Situation" accent="#C4922A">
        {result.situationProfile.split(/\n\n+/).map((para, i, arr) => (
          <p key={i} style={{ fontSize: "16px", lineHeight: 1.85, color: C.textSecondary, marginBottom: i < arr.length - 1 ? "20px" : 0, fontFamily: "'DM Sans', sans-serif" }}>
            {para.trim()}
          </p>
        ))}
      </SectionBlock>

      {/* Ikigai Compass */}
      <SectionBlock title="Your Ikigai Compass" accent="#5A9B7A">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {ikigaiItems.map(item => (
            <div key={item.key} style={{ padding: "20px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "11px" }}>
                <span style={{ color: item.color, fontSize: "13px" }}>{item.symbol}</span>
                <p style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: item.color, fontFamily: "'DM Sans', sans-serif" }}>{item.label}</p>
              </div>
              <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>
                {result.ikigaiCompass[item.key]}
              </p>
            </div>
          ))}
        </div>
      </SectionBlock>

      {/* Project Paths */}
      <SectionBlock title="Your Project Paths" accent="#8B7BAB">
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {result.projectPaths.map((path, i) => {
            const pAccent = archetypeColor[path.archetype] || "#C4922A";
            const isTop = i === 0;
            return (
              <div key={i} style={{
                padding: "28px",
                background: C.surface,
                border: `1px solid ${isTop ? pAccent + "55" : C.border}`,
                borderRadius: "8px",
                position: "relative",
                overflow: "hidden",
              }}>
                {isTop && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: pAccent }} />}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: pAccent, fontFamily: "'DM Sans', sans-serif" }}>
                    {isTop ? "✦ Top Recommendation" : `Path ${i + 1}`}
                  </span>
                  <span style={{ fontSize: "10px", color: C.textMuted, padding: "3px 10px", border: `1px solid ${C.borderLight}`, borderRadius: "20px", fontFamily: "'DM Sans', sans-serif" }}>
                    {path.archetype}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: 500, color: C.textPrimary, marginBottom: "12px" }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: C.textSecondary, marginBottom: "14px", fontFamily: "'DM Sans', sans-serif" }}>
                  {path.description}
                </p>
                <p style={{ fontSize: "13.5px", lineHeight: 1.75, color: C.textMuted, marginBottom: "24px", fontStyle: "italic", fontFamily: "'DM Sans', sans-serif" }}>
                  Why it fits you: {path.whyItFitsYou}
                </p>
                <p style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: pAccent, marginBottom: "14px", fontFamily: "'DM Sans', sans-serif" }}>First Three Steps</p>
                {path.firstThreeSteps.map((step, j) => (
                  <div key={j} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: j < 2 ? "10px" : 0 }}>
                    <span style={{ fontSize: "11px", color: pAccent, fontWeight: 600, minWidth: "18px", marginTop: "3px", fontFamily: "'DM Sans', sans-serif" }}>{j + 1}.</span>
                    <p style={{ fontSize: "14px", lineHeight: 1.65, color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{step}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </SectionBlock>

      {/* 90-Day Action Plan */}
      <SectionBlock title="Your 90-Day Runway" accent="#C4922A">
        {planPhases.map((phase, i) => (
          <div key={phase.key} style={{ display: "flex", gap: "24px", paddingBottom: i < 2 ? "32px" : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "28px", flexShrink: 0 }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#C4922A", marginTop: "4px" }} />
              {i < 2 && <div style={{ width: "1px", flex: 1, background: C.border, marginTop: "8px" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#C4922A", marginBottom: "4px", fontFamily: "'DM Sans', sans-serif" }}>{phase.label}</p>
              <p style={{ fontSize: "12px", color: C.textMuted, marginBottom: "10px", fontFamily: "'DM Sans', sans-serif" }}>{phase.sub}</p>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{result.actionPlan[phase.key]}</p>
            </div>
          </div>
        ))}
      </SectionBlock>

      {/* Closing Thought */}
      <div style={{ borderLeft: "2px solid #C4922A", paddingLeft: "28px", marginBottom: "64px" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: 300, fontStyle: "italic", lineHeight: 1.85, color: C.textPrimary }}>
          {result.closingThought}
        </p>
      </div>

      {/* Download / Export buttons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
        <button
          onClick={() => {
            // Build plain-text version of the report
            const lines = [];
            lines.push("LIFE COMPASS — PERSONAL REPORT");
            lines.push("================================\n");

            lines.push("LIFE BALANCE SCORES");
            lines.push("-------------------");
            const wLabels = ["Health & Energy","Career & Work","Finances","Relationships","Personal Growth","Fun & Creativity","Purpose & Meaning","Environment & Space"];
            const wIds = ["w1","w2","w3","w4","w5","w6","w7","w8"];
            wLabels.forEach((l, i) => { lines.push(`${l}: ${answers[wIds[i]] || "–"} / 10`); });
            lines.push("");

            lines.push("SITUATION PROFILE");
            lines.push("-----------------");
            lines.push(result.situationProfile);
            lines.push("");

            lines.push("YOUR IKIGAI COMPASS");
            lines.push("-------------------");
            lines.push(`What You Love:\n${result.ikigaiCompass.whatYouLove}\n`);
            lines.push(`What You're Good At:\n${result.ikigaiCompass.whatYoureGoodAt}\n`);
            lines.push(`What The World Needs:\n${result.ikigaiCompass.whatWorldNeeds}\n`);
            lines.push(`What Rewards You:\n${result.ikigaiCompass.whatYouCanBeRewardedFor}\n`);

            lines.push("PROJECT PATHS");
            lines.push("-------------");
            result.projectPaths.forEach((p, i) => {
              lines.push(`\n${i + 1}. ${p.title} [${p.archetype}]`);
              lines.push(p.description);
              lines.push(`\nWhy it fits you: ${p.whyItFitsYou}`);
              lines.push(`\nFirst Three Steps:`);
              p.firstThreeSteps.forEach((s, j) => lines.push(`  ${j+1}. ${s}`));
            });
            lines.push("");

            lines.push("90-DAY ACTION PLAN");
            lines.push("------------------");
            lines.push(`Weeks 1–4 (Foundation):\n${result.actionPlan.weeks1to4}\n`);
            lines.push(`Weeks 5–8 (Momentum):\n${result.actionPlan.weeks5to8}\n`);
            lines.push(`Weeks 9–12 (Milestone):\n${result.actionPlan.weeks9to12}\n`);

            lines.push("A FINAL THOUGHT");
            lines.push("---------------");
            lines.push(result.closingThought);

            const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = "life-compass-report.txt"; a.click();
            URL.revokeObjectURL(url);
          }}
          style={{ padding: "12px 24px", background: "#C4922A", color: C.bg, border: "none", borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer" }}
        >
          ↓ Download as .txt
        </button>

        <button
          onClick={() => window.print()}
          style={{ padding: "12px 24px", background: "transparent", color: C.textSecondary, border: `1px solid ${C.borderLight}`, borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
        >
          ⎙ Print / Save as PDF
        </button>

        <button
          onClick={onRestart}
          style={{ padding: "12px 24px", background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: "4px", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
        >
          ↺ Start Over
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function LifeCompass() {
  const [phase, setPhase] = useState("welcome"); // welcome | section-intro | question | processing | results
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
  const accent = currentSection?.accent || "#C4922A";

  // Loading animation
  useEffect(() => {
    if (phase === "processing") {
      const iv = setInterval(() => setLoadingTick(t => (t + 1) % 4), 600);
      return () => clearInterval(iv);
    }
  }, [phase]);

  // Load saved answer when question changes
  useEffect(() => {
    if (phase === "question" && currentQuestion) {
      const saved = answers[currentQuestion.id];
      setCurrentAnswer(saved !== undefined ? saved : "");
    }
  }, [phase, sectionIdx, questionIdx]);

  const fade = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 270);
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
    }, 270);
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
    }, 270);
  };

  const generateResults = async (allAnswers) => {
    setErrorMsg(null);
    const lines = ["LIFE COMPASS ASSESSMENT — COMPLETE RESPONSES\n"];
    SECTIONS.forEach(sec => {
      lines.push(`\n## ${sec.partLabel}: ${sec.title}`);
      sec.questions.forEach(q => {
        const a = allAnswers[q.id];
        if (a !== undefined && a !== "") {
          lines.push(`\nQ: ${q.label}`);
          lines.push(`A: ${a}`);
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
      const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
      setPhase("results");
    } catch (err) {
      setErrorMsg("Something went wrong generating your report. Please try again.");
      setPhase("question");
      setSectionIdx(SECTIONS.length - 1);
      setQuestionIdx(SECTIONS[SECTIONS.length - 1].questions.length - 1);
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.textPrimary, position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea { resize: none; }
        textarea::placeholder { color: #4A4030; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3A3020; border-radius: 2px; }
        .lc-fade { opacity: 1; transform: translateY(0); transition: opacity 0.27s ease, transform 0.27s ease; }
        .lc-hidden { opacity: 0; transform: translateY(10px); }
        @keyframes lc-spin { to { transform: rotate(360deg); } }
        @keyframes lc-pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 15% 60%, rgba(196,146,42,0.05) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(90,155,122,0.04) 0%, transparent 55%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Progress bar */}
      {phase === "question" && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: C.border, zIndex: 100 }}>
          <div style={{ height: "100%", width: `${progressPct}%`, background: accent, transition: "width 0.5s ease, background 0.5s ease" }} />
        </div>
      )}

      <div style={{ maxWidth: "660px", margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>

        {/* ── WELCOME ── */}
        {phase === "welcome" && (
          <div className={`lc-fade ${!visible ? "lc-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "3.5px", color: C.textMuted, textTransform: "uppercase", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif" }}>
              A Life Compass Assessment
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(56px, 9vw, 84px)", fontWeight: 300, lineHeight: 1.02, color: C.textPrimary, marginBottom: "36px" }}>
              Find Your<br /><em style={{ fontStyle: "italic", color: "#C4922A" }}>Direction</em>
            </h1>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: C.textSecondary, maxWidth: "500px", marginBottom: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              This assessment layers three evidence-based frameworks — the <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Wheel of Life</strong>, the <strong style={{ color: C.textPrimary, fontWeight: 500 }}>PERMA model</strong>, and <strong style={{ color: C.textPrimary, fontWeight: 500 }}>Ikigai</strong> — to give you a clear picture of where you stand today and a concrete path forward.
            </p>
            <p style={{ fontSize: "14px", lineHeight: 1.7, color: C.textMuted, marginBottom: "48px", fontFamily: "'DM Sans', sans-serif" }}>
              35 questions · 3 parts · 20–30 minutes · Personalized AI-generated action plan
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "52px", maxWidth: "440px" }}>
              {SECTIONS.map(s => (
                <div key={s.id} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: s.accent, marginTop: "6px", flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: "10px", color: s.accent, letterSpacing: "2px", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{s.partLabel} · </span>
                    <span style={{ fontSize: "14px", color: C.textSecondary, fontFamily: "'DM Sans', sans-serif" }}>{s.title}</span>
                    <span style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}> — {s.questions.length} questions</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => fade(() => { setSectionIdx(0); setPhase("section-intro"); })}
              style={{ alignSelf: "flex-start", padding: "15px 38px", background: "#C4922A", color: C.bg, border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, letterSpacing: "0.3px", cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.target.style.opacity = "0.88"}
              onMouseLeave={e => e.target.style.opacity = "1"}
            >
              Begin the Assessment →
            </button>
          </div>
        )}

        {/* ── SECTION INTRO ── */}
        {phase === "section-intro" && currentSection && (
          <div className={`lc-fade ${!visible ? "lc-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "80px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "3px", color: currentSection.accent, textTransform: "uppercase", marginBottom: "24px", fontFamily: "'DM Sans', sans-serif" }}>
              {currentSection.partLabel}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 60px)", fontWeight: 300, lineHeight: 1.1, color: C.textPrimary, marginBottom: "28px" }}>
              {currentSection.title}
            </h2>
            <p style={{ fontSize: "16px", lineHeight: 1.8, color: C.textSecondary, maxWidth: "520px", marginBottom: "16px", fontFamily: "'DM Sans', sans-serif" }}>
              {currentSection.intro}
            </p>
            <p style={{ fontSize: "13px", color: C.textMuted, marginBottom: "52px", fontFamily: "'DM Sans', sans-serif" }}>
              {currentSection.questions.length} questions in this part
            </p>
            <div style={{ display: "flex", gap: "14px" }}>
              {sectionIdx > 0 && (
                <button
                  onClick={() => fade(() => {
                    const prev = SECTIONS[sectionIdx - 1];
                    setSectionIdx(s => s - 1);
                    setQuestionIdx(prev.questions.length - 1);
                    setCurrentAnswer(answers[prev.questions[prev.questions.length - 1].id] || "");
                    setPhase("question");
                  })}
                  style={{ padding: "14px 24px", background: "transparent", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}
                >← Back</button>
              )}
              <button
                onClick={() => fade(() => {
                  setQuestionIdx(0);
                  setCurrentAnswer(answers[currentSection.questions[0].id] || "");
                  setPhase("question");
                })}
                style={{ padding: "14px 32px", background: currentSection.accent, color: C.bg, border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: "pointer" }}
              >
                Begin {currentSection.partLabel} →
              </button>
            </div>
          </div>
        )}

        {/* ── QUESTION ── */}
        {phase === "question" && currentQuestion && (
          <div className={`lc-fade ${!visible ? "lc-hidden" : ""}`}
            style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "80px", paddingBottom: "100px" }}>

            {errorMsg && (
              <div style={{ padding: "14px 18px", background: "rgba(180,60,60,0.1)", border: "1px solid rgba(180,60,60,0.3)", borderRadius: "6px", marginBottom: "28px", fontSize: "14px", color: "#E88", fontFamily: "'DM Sans', sans-serif" }}>
                {errorMsg}
              </div>
            )}

            <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: C.textMuted, marginBottom: "52px", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: accent }}>{currentSection.partLabel}</span> · Question {questionIdx + 1} of {currentSection.questions.length}
            </p>

            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 4.5vw, 34px)", fontWeight: 400, lineHeight: 1.3, color: C.textPrimary, marginBottom: "12px" }}>
              {currentQuestion.label}
            </h3>
            <p style={{ fontSize: "14px", color: C.textMuted, marginBottom: "36px", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
              {currentQuestion.subtext}
            </p>

            {/* Scale */}
            {currentQuestion.type === "scale" && (
              <div>
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <button key={n} onClick={() => setCurrentAnswer(n)}
                      style={{ width: "48px", height: "48px", borderRadius: "6px", border: `1.5px solid ${currentAnswer === n ? accent : (n <= (currentAnswer || 0) ? accent + "44" : C.border)}`, background: currentAnswer === n ? accent : "transparent", color: currentAnswer === n ? C.bg : (n <= (currentAnswer || 0) ? accent : C.textMuted), fontSize: "15px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.13s ease", fontWeight: currentAnswer === n ? 500 : 400 }}>
                      {n}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>Low</span>
                  <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'DM Sans', sans-serif" }}>High</span>
                </div>
              </div>
            )}

            {/* Choice */}
            {currentQuestion.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {currentQuestion.choices.map((choice, i) => (
                  <button key={i} onClick={() => setCurrentAnswer(choice)}
                    style={{ padding: "15px 20px", textAlign: "left", background: currentAnswer === choice ? `${accent}18` : "transparent", border: `1.5px solid ${currentAnswer === choice ? accent : C.border}`, borderRadius: "6px", color: currentAnswer === choice ? C.textPrimary : C.textSecondary, fontSize: "14.5px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "all 0.13s ease", lineHeight: 1.5 }}>
                    {choice}
                  </button>
                ))}
              </div>
            )}

            {/* Textarea */}
            {currentQuestion.type === "textarea" && (
              <textarea
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                placeholder="Take your time..."
                style={{ width: "100%", minHeight: "150px", padding: "18px", background: C.surface, border: `1.5px solid ${currentAnswer && currentAnswer.trim().length > 3 ? accent + "55" : C.border}`, borderRadius: "6px", color: C.textPrimary, fontSize: "15px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, transition: "border-color 0.2s ease", outline: "none" }}
              />
            )}

            {/* Nav */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "40px" }}>
              <button onClick={handleBack}
                style={{ padding: "12px 18px", background: "transparent", color: C.textMuted, border: "none", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                ← Back
              </button>
              <button onClick={handleNext} disabled={!canProceed()}
                style={{ padding: "13px 30px", background: canProceed() ? accent : C.border, color: canProceed() ? C.bg : C.textMuted, border: "none", borderRadius: "4px", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, cursor: canProceed() ? "pointer" : "not-allowed", transition: "all 0.2s ease", opacity: canProceed() ? 1 : 0.5 }}>
                {questionIdx === currentSection.questions.length - 1 && sectionIdx === SECTIONS.length - 1
                  ? "Generate My Compass →"
                  : "Continue →"}
              </button>
            </div>
          </div>
        )}

        {/* ── PROCESSING ── */}
        {phase === "processing" && (
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", border: `1px solid ${C.borderLight}`, borderTop: "1.5px solid #C4922A", borderRadius: "50%", animation: "lc-spin 2s linear infinite", marginBottom: "48px" }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", fontWeight: 300, color: C.textPrimary, marginBottom: "16px" }}>
              Mapping your compass{".".repeat(loadingTick + 1)}
            </h2>
            <p style={{ fontSize: "14px", color: C.textMuted, maxWidth: "340px", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif" }}>
              Analyzing your 35 responses across the Wheel of Life, PERMA, and Ikigai frameworks to build your personalized path forward.
            </p>
          </div>
        )}

        {/* ── RESULTS ── */}
        {phase === "results" && result && (
          <div className={`lc-fade ${!visible ? "lc-hidden" : ""}`}>
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
