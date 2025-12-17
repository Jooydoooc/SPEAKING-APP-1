const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* =========================================================
   SPEAKING SETS (General + Your Speaking Set 01)
========================================================= */
const SETS = [
  {
    id: "general",
    title: "General Practice (Built-in)",
    part1: [
      {
        topic: "Technology",
        questions: [
          { q: "Do you use social media every day?", sample: sampleP1("Yes, I do. I check it a few times a day mainly to stay in the loop and reply to messages. That said, I try to keep it under control so it doesn’t turn into a bad habit.", ["stay in the loop","keep it under control","bad habit"], ["To be honest","That said"]) },
          { q: "What apps do you use most often?", sample: sampleP1("Probably messaging apps and a couple of study tools. They’re convenient because I can organise my day, contact people instantly, and learn on the go.", ["learn on the go","organise my day","contact people instantly"], ["Probably","because"]) }
        ]
      }
    ],
    part2: [
      {
        q: "Describe a teacher who influenced you.\nYou should say:\n- who the teacher was\n- what they taught\n- what they did differently\nand explain why you still remember them.",
        sample: sampleP2(
          "I’d like to talk about a teacher who genuinely shaped the way I learn. It was my English teacher at high school, and what made her stand out was the fact that she didn’t just teach grammar—she taught confidence.\n\nFirst of all, she used a very practical approach. Instead of forcing us to memorise rules, she got us to speak in short, realistic situations, like ordering food or giving opinions. Over time, that consistent exposure helped me become more fluent and less afraid of making mistakes.\n\nAnother thing I appreciated was her feedback style. She corrected errors, but she did it in a supportive way—she would highlight one or two key issues, such as verb forms or pronunciation endings, and then give a simple drill. As a result, my progress felt measurable rather than overwhelming.\n\nOverall, I still remember her because she created a positive atmosphere and pushed us to improve step by step. If I ever become a teacher, I’d definitely adopt that same method.",
          ["practical approach","consistent exposure","supportive way","positive atmosphere","step by step"],
          ["First of all","Over time","As a result","Overall"]
        )
      }
    ],
    part3: [
      {
        q: "How might technology change education in the future?",
        sample: sampleP3(
          "I think technology will reshape education quite dramatically. For one thing, lessons will become more personalised because platforms can track students’ strengths and weaknesses and adapt tasks accordingly. That means learners won’t move at the same pace; instead, they’ll follow individual learning paths.\n\nHowever, there’s also a downside. If schools rely too heavily on devices, students may become easily distracted and their attention span could shrink. So, in my view, the best solution is a balanced model: use technology for feedback and practice, but keep teachers at the centre to guide and motivate learners.",
          ["personalised lessons","individual learning paths","rely too heavily","balanced model"],
          ["For one thing","However","So, in my view"]
        )
      }
    ],
    study: {
      vocab: ["community", "local facilities", "public transport", "peaceful atmosphere", "urban lifestyle", "rural area"],
      collocations: ["a tight-knit community", "a rapid pace of life", "a well-developed area", "easy access to", "a relaxing environment"],
      phrases: ["To be honest, ...", "That said, ...", "From my perspective, ...", "It depends, but generally ..."],
      paraphrase: [
        ["important", "crucial / vital"],
        ["popular", "widespread / common"],
        ["problem", "issue / challenge"],
        ["improve", "enhance / boost"]
      ],
      grammar: [
        "Use 'used to' for past habits: I used to live in a quieter area.",
        "Use conditionals: If there were more parks, I would go outside more often.",
        "Use relative clauses: There’s a park which is popular with families."
      ]
    }
  },

  // ✅ Your Speaking Set 01
  {
    id: "set01",
    title: "🌿 Speaking Set – 01 (Nature & Greenery)",
    part1: [
      {
        topic: "🏙️ Hometown / Area You Live In",
        questions: [
          { q: "What kind of place is your hometown?", sample: sampleP1(
            "My hometown is fairly calm and family-oriented. It’s not a huge city, but it’s well-organised and comfortable, with decent transport and a friendly atmosphere. I’d say it’s a great place to grow up.",
            ["family-oriented","well-organised","friendly atmosphere","a great place to grow up"],
            ["I’d say","To be honest"]
          )},
          { q: "Are there many trees or parks in your area?", sample: sampleP1(
            "Yes, there are quite a few parks and small green spaces. They’re not massive, but they make the neighbourhood feel fresher and less stressful, especially after a long day.",
            ["green spaces","feel fresher","less stressful","after a long day"],
            ["Yes","especially"]
          )},
          { q: "How has your hometown changed over the years?", sample: sampleP1(
            "It has changed a lot—mainly in terms of infrastructure. There are more roads, new buildings, and better facilities than before. On the downside, some green areas have been replaced, so it feels a bit more crowded now.",
            ["in terms of","infrastructure","better facilities","green areas","a bit more crowded"],
            ["mainly","On the downside"]
          )},
          { q: "Do you think your hometown is a good place for young people to live?", sample: sampleP1(
            "Overall, yes, especially for students or young families. The cost of living is reasonable and life is relatively safe. That said, if someone wants more job opportunities and entertainment, a bigger city might be a better fit.",
            ["cost of living","reasonably priced","relatively safe","job opportunities","a better fit"],
            ["Overall","That said"]
          )}
        ]
      },
      {
        topic: "🌱 Plants",
        questions: [
          { q: "Do you like being around places with a lot of trees or greenery?", sample: sampleP1(
            "Definitely. Being surrounded by greenery instantly improves my mood. It’s relaxing, and it helps me clear my head when I feel stressed or tired.",
            ["surrounded by greenery","improves my mood","clear my head","feel stressed"],
            ["Definitely","To be honest"]
          )},
          { q: "Have you ever planted a tree or a flower yourself?", sample: sampleP1(
            "Yes, I’ve planted a couple of flowers at home. It’s surprisingly satisfying because you can actually see the progress, and it makes the place feel more alive.",
            ["surprisingly satisfying","see the progress","feel more alive"],
            ["Yes","because"]
          )},
          { q: "Why do you think people like to grow plants at home?", sample: sampleP1(
            "I think it’s because plants create a calm atmosphere and make a home look cosy. Also, taking care of something small can reduce stress and give people a sense of responsibility.",
            ["calm atmosphere","look cosy","reduce stress","sense of responsibility"],
            ["I think","Also"]
          )},
          { q: "Are there any famous gardens or parks in your city?", sample: sampleP1(
            "Yes, there’s a well-known central park that people often visit at weekends. It’s popular because it’s clean, safe, and perfect for walking, jogging, or simply relaxing.",
            ["well-known","at weekends","perfect for","simply relaxing"],
            ["Yes","because"]
          )}
        ]
      }
    ],
    part2: [
      {
        q: "🌳 Describe a place with a lot of trees.\nYou should say:\n- Where this place is located\n- What kinds of trees or plants are there\n- What people usually do in this place\n- And explain how you feel when you spend time there",
        sample: sampleP2(
          "I’d like to describe a place with a lot of trees that I really enjoy. It’s a large park on the outskirts of my city, and it’s one of the few places where you can genuinely feel close to nature.\n\nIn terms of plants, the park has tall poplar trees and plenty of pine trees, so the air feels fresh and slightly cool even on warm days. There are also colourful flowerbeds and small bushes along the walking paths, which makes the area look well-maintained.\n\nPeople usually go there to unwind. Some visitors jog or cycle, while others sit on benches and chat with friends. Families often bring children because it’s safe and spacious, and you can see lots of people taking photos, especially in spring.\n\nPersonally, I feel calm and mentally refreshed whenever I spend time there. It helps me switch off from daily pressure, and I always leave with more energy and a better mood.",
          ["on the outskirts","feel close to nature","well-maintained","unwind","mentally refreshed","switch off","daily pressure"],
          ["In terms of","For example","Personally","whenever"]
        )
      }
    ],
    part3: [
      {
        q: "Why do people like spending time in natural places?",
        sample: sampleP3(
          "I think people are drawn to natural places because they provide a break from noise and routine. Nature helps people slow down, breathe fresh air, and reduce stress. Also, being outdoors can improve mood and make people feel more balanced.",
          ["a break from","reduce stress","improve mood","feel more balanced"],
          ["I think","Also"]
        )
      },
      {
        q: "Do you think it’s important to plant more trees in cities?",
        sample: sampleP3(
          "Yes, it’s extremely important. Trees improve air quality, provide shade, and make urban areas more liveable. They also reduce heat in summer and create more pleasant public spaces. In the long run, that’s beneficial for both health and the environment.",
          ["air quality","more liveable","public spaces","in the long run","beneficial"],
          ["Yes","In the long run"]
        )
      },
      {
        q: "How can governments encourage people to protect green areas?",
        sample: sampleP3(
          "Governments can start by raising awareness through campaigns and school programmes. They can also enforce stricter laws against illegal cutting and littering. On top of that, giving communities small incentives—like free seedlings or local awards—can make people feel responsible and involved.",
          ["raise awareness","enforce stricter laws","On top of that","small incentives","feel responsible"],
          ["start by","also","On top of that"]
        )
      },
      {
        q: "What differences do you notice between rural and urban environments in terms of greenery?",
        sample: sampleP3(
          "In rural areas, greenery is usually natural and widespread—you see fields, forests, and open land. In cities, green spaces are often planned, like parks or small gardens, and they’re limited because land is expensive. So, overall, rural areas feel more open and breathable, while cities rely on organised green zones.",
          ["widespread","open land","green spaces","planned","limited","organised green zones"],
          ["In contrast","So, overall"]
        )
      }
    ],
    study: {
      vocab: [
        "greenery", "urban environment", "rural area", "air quality", "public spaces",
        "flowerbeds", "walking paths", "shade", "heat", "well-maintained"
      ],
      collocations: [
        "a calm atmosphere", "feel close to nature", "improve air quality", "reduce stress",
        "switch off from", "public green spaces", "plant more trees", "fresh air", "daily pressure"
      ],
      phrases: [
        "To be honest, ...", "That said, ...", "Overall, ...", "In the long run, ...",
        "In terms of ...", "Personally, ...", "On the downside, ..."
      ],
      paraphrase: [
        ["many", "a large number of / plenty of"],
        ["important", "essential / crucial"],
        ["good place", "ideal location / great option"],
        ["changed", "developed / transformed"],
        ["popular", "well-known / widely visited"]
      ],
      grammar: [
        "Use contrast: Some areas are greener, whereas others are more crowded.",
        "Use conditionals: If cities planted more trees, air quality would improve.",
        "Use relative clauses: There’s a park which is perfect for jogging.",
        "Use emphasis: What I really like is the fresh air and quiet atmosphere."
      ]
    }
  }
];

/* =========================================================
   Helpers for Sample objects
========================================================= */
function sampleP1(text, collocations=[], phrases=[]){
  return { text, collocations, phrases };
}
function sampleP2(text, collocations=[], phrases=[]){
  return { text, collocations, phrases };
}
function sampleP3(text, collocations=[], phrases=[]){
  return { text, collocations, phrases };
}

/* =========================================================
   Login/Profile
========================================================= */
const loginOverlay = $("#loginOverlay");
const appContainer = $("#appContainer");
const profileLine = $("#profileLine");

const loginName = $("#loginName");
const loginGroup = $("#loginGroup");
const loginLevel = $("#loginLevel");
const loginStatus = $("#loginStatus");

const startBtn = $("#startBtn");
const demoBtn = $("#demoBtn");
const logoutBtn = $("#logoutBtn");
const editProfileBtn = $("#editProfileBtn");

function setLoginStatus(t){ loginStatus.textContent = t; }

function getProfile(){
  try{
    const raw = localStorage.getItem("band8_profile");
    return raw ? JSON.parse(raw) : null;
  }catch{
    return null;
  }
}
function saveProfile(p){
  localStorage.setItem("band8_profile", JSON.stringify(p));
}
function clearProfile(){
  localStorage.removeItem("band8_profile");
}
function renderProfileLine(){
  const p = getProfile();
  if(!p){ profileLine.textContent = "—"; return; }
  const parts = [
    `👤 ${p.name}`,
    p.group ? `👥 ${p.group}` : null,
    p.level ? `📈 ${p.level}` : null
  ].filter(Boolean);
  profileLine.textContent = parts.join(" • ");
}
function showLogin(prefill=false){
  loginOverlay.style.display = "flex";
  appContainer.style.visibility = "hidden";
  appContainer.style.pointerEvents = "none";

  const p = getProfile();
  if (prefill && p){
    loginName.value = p.name || "";
    loginGroup.value = p.group || "";
    if (p.level) loginLevel.value = p.level;
  }
  setLoginStatus("Ready.");
}
function hideLogin(){
  loginOverlay.style.display = "none";
  appContainer.style.visibility = "visible";
  appContainer.style.pointerEvents = "auto";
  renderProfileLine();
}
function ensureLogin(){
  const p = getProfile();
  if(!p || !p.name){
    showLogin(true);
  }else{
    hideLogin();
  }
}

startBtn.addEventListener("click", () => {
  const name = loginName.value.trim();
  const group = loginGroup.value.trim();
  const level = loginLevel.value;

  if(!name){
    setLoginStatus("❌ Please enter your name.");
    return;
  }

  saveProfile({ name, group, level });
  setLoginStatus("✅ Saved. Starting...");
  hideLogin();
});

demoBtn.addEventListener("click", () => {
  loginName.value = "Student";
  loginGroup.value = "Group A";
  loginLevel.value = "Band 5.5 - 6.0";
  setLoginStatus("Demo filled. Press Start.");
});

logoutBtn.addEventListener("click", () => {
  clearProfile();
  showLogin(false);
  renderProfileLine();
});

editProfileBtn.addEventListener("click", () => {
  showLogin(true);
});

ensureLogin();

/* =========================================================
   Tabs
========================================================= */
let currentTab = "part1";
$$(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".tab").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    $$(".panel").forEach(p => p.classList.remove("active"));
    currentTab = btn.dataset.tab;
    $("#tab-" + currentTab).classList.add("active");
  });
});

/* =========================================================
   Set Selector
========================================================= */
const setSelect = $("#setSelect");
let currentSet = null;

function fillSetSelect(){
  setSelect.innerHTML = "";
  SETS.forEach((s, i) => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.title;
    setSelect.appendChild(opt);
  });

  const saved = localStorage.getItem("band8_set") || SETS[0].id;
  setSelect.value = saved;
  currentSet = SETS.find(x => x.id === setSelect.value) || SETS[0];
}
fillSetSelect();

setSelect.addEventListener("change", () => {
  localStorage.setItem("band8_set", setSelect.value);
  currentSet = SETS.find(x => x.id === setSelect.value) || SETS[0];
  rebuildAllForSet();
});

/* =========================================================
   Chips & switches
========================================================= */
const STARTERS = [
  "To be honest, …",
  "Well, I’d say …",
  "It depends, but generally …",
  "Actually, …",
  "From my perspective, …",
  "If I’m not mistaken, …"
];
const LINKING = [
  "On the one hand…",
  "On the other hand…",
  "That said, …",
  "In the long run, …",
  "A good example is …",
  "Overall, I’d argue that …"
];
const GRAMMAR_SWITCHES = [
  "Past habit: used to / would",
  "Speculation: might / likely",
  "Contrast: whereas / while",
  "Conditional: If…, would…",
  "Relative clause: which/who/that",
  "Cause: because / therefore"
];

function renderChips(container, items) {
  container.innerHTML = "";
  items.forEach(txt => {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.textContent = txt;
    chip.addEventListener("click", () => chip.classList.toggle("active"));
    container.appendChild(chip);
  });
}
function renderSwitches(container) {
  container.innerHTML = "";
  GRAMMAR_SWITCHES.forEach(label => {
    const el = document.createElement("div");
    el.className = "switch";
    el.textContent = label;
    el.addEventListener("click", () => el.classList.toggle("active"));
    container.appendChild(el);
  });
}
renderChips($("#p1Chips"), STARTERS);
renderSwitches($("#p1Switches"));
renderChips($("#p3Chips"), LINKING);
renderSwitches($("#p3Switches"));

/* =========================================================
   Countdown Overlay
========================================================= */
const countdownOverlay = $("#countdownOverlay");
const countdownTitle = $("#countdownTitle");
const countdownNumber = $("#countdownNumber");
const countdownSub = $("#countdownSub");

function showCountdown({title="Get ready", sub="Speak clearly.", seconds=3}){
  return new Promise((resolve) => {
    countdownTitle.textContent = title;
    countdownSub.textContent = sub;
    countdownOverlay.style.display = "flex";
    countdownOverlay.setAttribute("aria-hidden", "false");

    let n = seconds;
    countdownNumber.textContent = String(n);

    const t = setInterval(() => {
      n -= 1;
      if (n <= 0){
        clearInterval(t);
        countdownOverlay.style.display = "none";
        countdownOverlay.setAttribute("aria-hidden", "true");
        resolve();
      } else {
        countdownNumber.textContent = String(n);
      }
    }, 850);
  });
}

/* =========================================================
   Timer helper
========================================================= */
function formatMMSS(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}
function createTimer(displayEl) {
  let t = 0;
  let interval = null;
  return {
    start(seconds, onEnd){
      this.stop();
      t = seconds;
      displayEl.textContent = formatMMSS(t);
      interval = setInterval(() => {
        t -= 1;
        displayEl.textContent = formatMMSS(Math.max(t,0));
        if (t <= 0) {
          this.stop();
          if (onEnd) onEnd();
        }
      }, 1000);
    },
    stop(){
      if (interval) clearInterval(interval);
      interval = null;
    }
  };
}

/* =========================================================
   PART 1 (Set-based)
========================================================= */
const p1Topic = $("#p1Topic");
const p1Question = $("#p1Question");
const p1QText = $("#p1QText");
const p1TimerEl = $("#p1Timer");
const p1Timer = createTimer(p1TimerEl);

function fillSelect(selectEl, items, labelFn){
  selectEl.innerHTML = "";
  items.forEach((item, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = labelFn ? labelFn(item, i) : String(item);
    selectEl.appendChild(opt);
  });
}

function rebuildPart1(){
  const topics = currentSet.part1 || [];
  fillSelect(p1Topic, topics, (t)=>t.topic);
  p1Topic.value = "0";
  rebuildP1Questions();
}

function rebuildP1Questions(){
  const topics = currentSet.part1 || [];
  const t = topics[Number(p1Topic.value)] || {questions:[]};
  fillSelect(p1Question, t.questions, (_, i)=>`Q${i+1}`);
  p1Question.value = "0";
  p1QText.textContent = t.questions[0]?.q || "—";
}

p1Topic.addEventListener("change", rebuildP1Questions);
p1Question.addEventListener("change", () => {
  const t = (currentSet.part1 || [])[Number(p1Topic.value)];
  p1QText.textContent = t?.questions?.[Number(p1Question.value)]?.q || "—";
});

$("#p1NextBtn").addEventListener("click", () => {
  const t = (currentSet.part1 || [])[Number(p1Topic.value)];
  if (!t || !t.questions?.length) return;
  const next = (Number(p1Question.value) + 1) % t.questions.length;
  p1Question.value = String(next);
  p1QText.textContent = t.questions[next].q;
});

$("#p1StartBtn").addEventListener("click", async () => {
  $("#p1StartBtn").disabled = true;
  $("#p1StopBtn").disabled = false;

  await showCountdown({
    title: "Part 1",
    sub: "Use 1 collocation + 1 grammar switch.",
    seconds: 3
  });

  p1Timer.start(35, () => {
    $("#p1StartBtn").disabled = false;
    $("#p1StopBtn").disabled = true;
  });
});

$("#p1StopBtn").addEventListener("click", () => {
  p1Timer.stop();
  $("#p1StartBtn").disabled = false;
  $("#p1StopBtn").disabled = true;
  p1TimerEl.textContent = "00:35";
});

/* =========================================================
   PART 2 (Set-based)
========================================================= */
const p2Question = $("#p2Question");
const p2QText = $("#p2QText");
const p2TimerEl = $("#p2Timer");
const p2Timer = createTimer(p2TimerEl);
const p2Notes = $("#p2Notes");
const savedPreview = $("#savedPreview");

function notesKey() {
  const setId = currentSet?.id || "set";
  const cardIndex = Number(p2Question.value || 0);
  return `band8_notes_${setId}_card_${cardIndex}`;
}
function refreshSavedPreview() {
  const val = localStorage.getItem(notesKey());
  savedPreview.textContent = val ? val : "No saved notes yet.";
}

function renderBundles(){
  const b = currentSet.study || {};
  const wrap = $("#p2Bundles");
  wrap.innerHTML = "";

  const mk = (title, list) => {
    const box = document.createElement("div");
    box.className = "ending";
    const safe = (list || []).slice(0, 7).join(" • ");
    box.innerHTML = `<b>${title}</b><div class="muted small" style="margin-top:6px">${safe || "—"}</div>`;
    return box;
  };

  wrap.appendChild(mk("Collocations", b.collocations || []));
  wrap.appendChild(mk("Phrases", b.phrases || []));
  wrap.appendChild(mk("Topic vocabulary", b.vocab || []));
}

function rebuildPart2(){
  const cards = currentSet.part2 || [];
  fillSelect(p2Question, cards, (_, i)=>`Card ${i+1}`);
  p2Question.value = "0";
  p2QText.textContent = cards[0]?.q || "—";
  renderBundles();
  refreshSavedPreview();
}

p2Question.addEventListener("change", () => {
  const cards = currentSet.part2 || [];
  p2QText.textContent = cards[Number(p2Question.value)]?.q || "—";
  refreshSavedPreview();
});

$("#p2SaveNotes").addEventListener("click", () => {
  localStorage.setItem(notesKey(), p2Notes.value.trim());
  refreshSavedPreview();
});
$("#p2LoadNotes").addEventListener("click", () => {
  const val = localStorage.getItem(notesKey());
  p2Notes.value = val ? val : "";
  refreshSavedPreview();
});

$("#p2StartPrepBtn").addEventListener("click", async () => {
  $("#p2StopBtn").disabled = false;
  await showCountdown({ title:"Part 2 Prep", sub:"Write keywords only.", seconds: 3 });
  p2Timer.start(60, () => {});
});

$("#p2StartSpeakBtn").addEventListener("click", async () => {
  $("#p2StopBtn").disabled = false;
  await showCountdown({ title:"Part 2 Speak", sub:"Story + details + reflection.", seconds: 3 });
  p2Timer.start(120, () => { $("#p2StopBtn").disabled = true; });
});

$("#p2StopBtn").addEventListener("click", () => {
  p2Timer.stop();
  $("#p2StopBtn").disabled = true;
  p2TimerEl.textContent = "01:00";
});

/* =========================================================
   PART 3 (Set-based)
========================================================= */
const p3Question = $("#p3Question");
const p3QText = $("#p3QText");
const p3TimerEl = $("#p3Timer");
const p3Timer = createTimer(p3TimerEl);

function rebuildPart3(){
  const qs = currentSet.part3 || [];
  fillSelect(p3Question, qs, (_, i)=>`Q${i+1}`);
  p3Question.value = "0";
  p3QText.textContent = qs[0]?.q || "—";
}

p3Question.addEventListener("change", () => {
  const qs = currentSet.part3 || [];
  p3QText.textContent = qs[Number(p3Question.value)]?.q || "—";
});
$("#p3NextBtn").addEventListener("click", () => {
  const qs = currentSet.part3 || [];
  if (!qs.length) return;
  const next = (Number(p3Question.value) + 1) % qs.length;
  p3Question.value = String(next);
  p3QText.textContent = qs[next].q;
});
$("#p3StartBtn").addEventListener("click", async () => {
  $("#p3StartBtn").disabled = true;
  $("#p3StopBtn").disabled = false;
  await showCountdown({ title:"Part 3", sub:"Opinion + example + conclusion.", seconds: 3 });
  p3Timer.start(60, () => {
    $("#p3StartBtn").disabled = false;
    $("#p3StopBtn").disabled = true;
  });
});
$("#p3StopBtn").addEventListener("click", () => {
  p3Timer.stop();
  $("#p3StartBtn").disabled = false;
  $("#p3StopBtn").disabled = true;
  p3TimerEl.textContent = "01:00";
});

/* =========================================================
   STUDY (Set-based)
========================================================= */
function pill(text, icon){
  const el = document.createElement("div");
  el.className = "pill";
  el.innerHTML = `${icon ? `<i class="${icon}"></i>` : ""} ${escapeHtml(text)}`;
  return el;
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

const exCollocQ = $("#exCollocQ");
const exCollocA = $("#exCollocA");
const exParaQ = $("#exParaQ");
const exParaA = $("#exParaA");

let currentExColloc = null;
let currentExPara = null;

function buildStudy(){
  const s = currentSet.study || {};
  const vocabWrap = $("#studyVocab");
  const collocWrap = $("#studyCollocations");
  const phraseWrap = $("#studyPhrases");
  const paraWrap = $("#studyParaphrase");
  const gramWrap = $("#studyGrammar");

  vocabWrap.innerHTML = "";
  collocWrap.innerHTML = "";
  phraseWrap.innerHTML = "";
  paraWrap.innerHTML = "";
  gramWrap.innerHTML = "";

  (s.vocab || []).forEach(v => vocabWrap.appendChild(pill(v, "fa-solid fa-tag")));
  (s.collocations || []).forEach(c => collocWrap.appendChild(pill(c, "fa-solid fa-link")));
  (s.phrases || []).forEach(p => phraseWrap.appendChild(pill(p, "fa-solid fa-quote-left")));

  (s.paraphrase || []).forEach(([a,b]) => {
    const item = document.createElement("div");
    item.className = "para-item";
    item.innerHTML = `<b>${escapeHtml(a)}</b> <span>→</span> ${escapeHtml(b)}`;
    paraWrap.appendChild(item);
  });

  (s.grammar || []).forEach(g => {
    const li = document.createElement("li");
    li.textContent = g;
    gramWrap.appendChild(li);
  });

  newCollocationExercise();
  newParaphraseExercise();
}

function newCollocationExercise(){
  const s = currentSet.study || {};
  const list = (s.collocations || []);
  if (!list.length){
    exCollocQ.textContent = "No collocations in this set.";
    exCollocA.textContent = "Answer: —";
    return;
  }

  const target = list[Math.floor(Math.random() * list.length)];
  const words = target.split(" ");
  const blankIndex = Math.max(0, Math.min(words.length - 1, Math.floor(words.length / 2)));
  const answerWord = words[blankIndex];
  const qWords = words.slice();
  qWords[blankIndex] = "_____";
  currentExColloc = { target, answerWord };

  exCollocQ.textContent = qWords.join(" ");
  exCollocA.textContent = "Answer: —";
}
function newParaphraseExercise(){
  const s = currentSet.study || {};
  const list = (s.paraphrase || []);
  if (!list.length){
    exParaQ.textContent = "No paraphrases in this set.";
    exParaA.textContent = "Answer: —";
    return;
  }
  const [a,b] = list[Math.floor(Math.random() * list.length)];
  currentExPara = { a, b };
  exParaQ.textContent = `Paraphrase: "${a}" → ?`;
  exParaA.textContent = "Answer: —";
}

$("#exCollocNew").addEventListener("click", newCollocationExercise);
$("#exCollocShow").addEventListener("click", () => {
  if (!currentExColloc) return;
  exCollocA.textContent = `Answer: ${currentExColloc.target}`;
});
$("#exParaNew").addEventListener("click", newParaphraseExercise);
$("#exParaShow").addEventListener("click", () => {
  if (!currentExPara) return;
  exParaA.textContent = `Answer: ${currentExPara.b}`;
});

/* =========================================================
   PRONUNCIATION
========================================================= */
const CHUNKS = [
  { text: "To be honest, I’m not really into it.", hint: "Stress: HON-est • REAL-ly • IN-to" },
  { text: "I’d say it’s a double-edged sword.", hint: "Stress: SAY • DOU-ble • EDGE • SWORD" },
  { text: "What I mean is, it depends on the situation.", hint: "Linking: mean_is • depends_on" },
  { text: "In the long run, it can be beneficial.", hint: "Stress: LONG run • ben-E-fi-cial" },
  { text: "That’s an interesting question — let me think.", hint: "Intonation: INTEResting QUES-tion" }
];
const ENDINGS = [
  "worked /t/ vs word /d/ — keep the last sound!",
  "best, next, asked — final clusters (st / kst / skt)",
  "think /θ/ vs sink /s/ — tongue between teeth",
  "world /wɜːld/ — don’t drop the /ld/",
  "students — pronounce the final /ts/ clearly"
];

let chunkIndex = 0;
function renderChunk() {
  const c = CHUNKS[chunkIndex];
  $("#chunkText").textContent = c.text;
  $("#chunkHint").textContent = c.hint;
}
$("#chunkNext").addEventListener("click", () => {
  chunkIndex = (chunkIndex + 1) % CHUNKS.length;
  renderChunk();
});
$("#chunkSlow").addEventListener("click", () => {
  const t = $("#chunkText").textContent;
  $("#chunkText").textContent = t.replaceAll(" ", "   ");
  setTimeout(renderChunk, 900);
});
renderChunk();

const endingsList = $("#endingsList");
endingsList.innerHTML = "";
ENDINGS.forEach(e => {
  const div = document.createElement("div");
  div.className = "ending";
  div.textContent = e;
  endingsList.appendChild(div);
});

const intonationModes = $("#intonationModes");
["Neutral", "Excited", "Skeptical", "Polite"].forEach(m => {
  const chip = document.createElement("div");
  chip.className = "chip";
  chip.textContent = m;
  chip.addEventListener("click", () => {
    $$("#intonationModes .chip").forEach(x => x.classList.remove("active"));
    chip.classList.add("active");
    $("#intonationSentence").textContent =
      m === "Excited" ? "I guess it’s fine!" :
      m === "Skeptical" ? "I guess it’s fine…?" :
      m === "Polite" ? "I guess it’s fine, to be honest." :
      "I guess it’s fine.";
  });
  intonationModes.appendChild(chip);
});

/* =========================================================
   FLUENCY
========================================================= */
const fluencyPrompts = [
  "Do you think technology makes people’s lives better or worse?",
  "Should students do homework every day?",
  "Is it better to live in a big city or a small town?",
  "Why do people find it difficult to learn English?",
  "How has social media changed communication?"
];

const fluencyQuestion = $("#fluencyQuestion");
const fluencyQText = $("#fluencyQText");
const fluencyTimerEl = $("#fluencyTimer");
const fluencyTimer = createTimer(fluencyTimerEl);

function rebuildFluency(){
  fluencyQuestion.innerHTML = "";
  fluencyPrompts.forEach((_, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = `Prompt ${i+1}`;
    fluencyQuestion.appendChild(opt);
  });
  fluencyQuestion.value = "0";
  fluencyQText.textContent = fluencyPrompts[0];
}
rebuildFluency();

fluencyQuestion.addEventListener("change", () => {
  fluencyQText.textContent = fluencyPrompts[Number(fluencyQuestion.value)];
});
$("#fluencyNextBtn").addEventListener("click", () => {
  const next = (Number(fluencyQuestion.value) + 1) % fluencyPrompts.length;
  fluencyQuestion.value = String(next);
  fluencyQText.textContent = fluencyPrompts[next];
});
$("#fluencyStartBtn").addEventListener("click", async () => {
  $("#fluencyStartBtn").disabled = true;
  $("#fluencyStopBtn").disabled = false;
  await showCountdown({ title:"Fluency", sub:"No long pauses. Keep going.", seconds: 3 });
  fluencyTimer.start(30, () => {
    $("#fluencyStartBtn").disabled = false;
    $("#fluencyStopBtn").disabled = true;
  });
});
$("#fluencyStopBtn").addEventListener("click", () => {
  fluencyTimer.stop();
  $("#fluencyStartBtn").disabled = false;
  $("#fluencyStopBtn").disabled = true;
  fluencyTimerEl.textContent = "00:30";
});

const checklistWrap = $("#fluencyChecklist");
checklistWrap.innerHTML = "";
[
  "I used sentence stress (content words stronger).",
  "I used at least one collocation naturally.",
  "I used 1–2 grammar switches.",
  "I gave a clear example.",
  "I avoided long pauses (used fillers / rephrasing)."
].forEach((t) => {
  const row = document.createElement("label");
  row.className = "check";
  row.innerHTML = `<input type="checkbox" /> <span>${escapeHtml(t)}</span>`;
  checklistWrap.appendChild(row);
});

/* =========================================================
   Recording (Safari-friendly)
========================================================= */
let mediaRecorder = null;
let recordedChunks = [];
let currentBlobUrl = null;
let chosenMime = null;
let chosenExt = "webm";

const audioArea = $("#audioArea");
const recStartBtn = $("#recStartBtn");
const recStopBtn = $("#recStopBtn");
const recClearBtn = $("#recClearBtn");

function chooseMimeType(){
  const candidates = [
    { mime: "audio/mp4", ext: "m4a" },
    { mime: "audio/mp4;codecs=mp4a.40.2", ext: "m4a" },
    { mime: "audio/webm;codecs=opus", ext: "webm" },
    { mime: "audio/webm", ext: "webm" }
  ];

  for (const c of candidates){
    if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c.mime)){
      return c;
    }
  }
  // fallback: let browser decide
  return { mime: "", ext: "webm" };
}

function clearRecordingUI() {
  audioArea.innerHTML = `<div class="muted">No recording yet.</div>`;
  if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
  currentBlobUrl = null;
  recClearBtn.disabled = true;
}

async function startRecording() {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Microphone recording is not supported in this browser.");
    return;
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recordedChunks = [];

  const chosen = chooseMimeType();
  chosenMime = chosen.mime;
  chosenExt = chosen.ext;

  try{
    mediaRecorder = chosenMime ? new MediaRecorder(stream, { mimeType: chosenMime }) : new MediaRecorder(stream);
  }catch{
    mediaRecorder = new MediaRecorder(stream);
    chosenMime = "";
    chosenExt = "webm";
  }

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    stream.getTracks().forEach(t => t.stop());

    const blobType = chosenMime || (recordedChunks[0]?.type || "audio/webm");
    const blob = new Blob(recordedChunks, { type: blobType });
    const url = URL.createObjectURL(blob);
    currentBlobUrl = url;

    audioArea.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "audio-item";

    const fileName = `speaking.${chosenExt}`;

    wrap.innerHTML = `
      <div style="flex:1; min-width:220px;">
        <div class="muted small">Your recording (${escapeHtml(blobType)})</div>
        <audio controls src="${url}"></audio>
      </div>
      <div class="audio-actions">
        <a class="btn ghost big" href="${url}" download="${fileName}">
          <i class="fa-solid fa-download"></i> Download
        </a>
      </div>
    `;
    audioArea.appendChild(wrap);
    recClearBtn.disabled = false;
  };

  mediaRecorder.start();
}

recStartBtn.addEventListener("click", async () => {
  try {
    recStartBtn.disabled = true;
    recStopBtn.disabled = false;
    await startRecording();
  } catch (e) {
    recStartBtn.disabled = false;
    recStopBtn.disabled = true;
    alert("Recording failed. Please allow microphone access or try Chrome/Edge.");
    console.error(e);
  }
});

recStopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  recStartBtn.disabled = false;
  recStopBtn.disabled = true;
});

recClearBtn.addEventListener("click", clearRecordingUI);
clearRecordingUI();

/* =========================================================
   Reset notes
========================================================= */
$("#resetBtn").addEventListener("click", () => {
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("band8_notes_")) localStorage.removeItem(k);
  });
  p2Notes.value = "";
  refreshSavedPreview();
});

/* =========================================================
   Sample Answer Modal
========================================================= */
const sampleModal = $("#sampleModal");
const sampleTitle = $("#sampleTitle");
const sampleKicker = $("#sampleKicker");
const sampleMeta = $("#sampleMeta");
const sampleText = $("#sampleText");
const sampleCollocations = $("#sampleCollocations");
const samplePhrases = $("#samplePhrases");
const closeSampleBtn = $("#closeSampleBtn");
const closeSampleBtn2 = $("#closeSampleBtn2");
const copySampleBtn = $("#copySampleBtn");

function openSampleModal({title, meta, text, collocations=[], phrases=[]}){
  sampleTitle.textContent = title || "Model Answer";
  sampleMeta.textContent = meta || "";
  sampleText.textContent = text || "—";

  sampleCollocations.innerHTML = "";
  samplePhrases.innerHTML = "";
  (collocations || []).forEach(c => sampleCollocations.appendChild(pill(c, "fa-solid fa-link")));
  (phrases || []).forEach(p => samplePhrases.appendChild(pill(p, "fa-solid fa-quote-left")));

  sampleModal.style.display = "flex";
  sampleModal.setAttribute("aria-hidden","false");
}
function closeSample(){
  sampleModal.style.display = "none";
  sampleModal.setAttribute("aria-hidden","true");
}
closeSampleBtn.addEventListener("click", closeSample);
closeSampleBtn2.addEventListener("click", closeSample);
sampleModal.addEventListener("click", (e) => {
  if (e.target === sampleModal) closeSample();
});
copySampleBtn.addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(sampleText.textContent || "");
    copySampleBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied`;
    setTimeout(()=>copySampleBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`, 900);
  }catch{
    alert("Copy failed. Please copy manually.");
  }
});

/* =========================================================
   Submit to Teacher + show Band 9 sample
========================================================= */
const submitBtn = $("#submitBtn");
const submitStatus = $("#submitStatus");
function setSubmitStatus(text) { submitStatus.textContent = text; }

function getCurrentContext(){
  if (currentTab === "part1") {
    const t = (currentSet.part1 || [])[Number(p1Topic.value)];
    const item = t?.questions?.[Number(p1Question.value)] || null;
    return {
      part: "Part 1",
      question: item?.q || p1QText.textContent.trim(),
      sample: item?.sample || null,
      key: `p1-${p1Topic.value}-${p1Question.value}`
    };
  }
  if (currentTab === "part2") {
    const item = (currentSet.part2 || [])[Number(p2Question.value)] || null;
    return {
      part: "Part 2",
      question: item?.q || p2QText.textContent.trim(),
      notes: p2Notes.value.trim(),
      sample: item?.sample || null,
      key: `p2-${p2Question.value}`
    };
  }
  if (currentTab === "part3") {
    const item = (currentSet.part3 || [])[Number(p3Question.value)] || null;
    return {
      part: "Part 3",
      question: item?.q || p3QText.textContent.trim(),
      sample: item?.sample || null,
      key: `p3-${p3Question.value}`
    };
  }
  if (currentTab === "study") {
    return { part: "Study", question: "Study activity", key: "study" };
  }
  if (currentTab === "pron") {
    return { part: "Pronunciation", question: $("#chunkText").textContent.trim(), key: "pron" };
  }
  if (currentTab === "fluency") {
    return { part: "Fluency", question: fluencyQText.textContent.trim(), key: `flu-${fluencyQuestion.value}` };
  }
  return { part: "Unknown", question: "", key: "unknown" };
}

async function submitCurrentTask() {
  const profile = getProfile();
  if (!profile || !profile.name) {
    setSubmitStatus("❌ Please login first.");
    showLogin(true);
    return;
  }

  const ctx = getCurrentContext();
  if (!ctx.question) {
    setSubmitStatus("❌ No question found to submit.");
    return;
  }

  submitBtn.disabled = true;
  setSubmitStatus("⏳ Submitting...");

  try {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        setId: currentSet.id,
        setTitle: currentSet.title,
        questionKey: ctx.key,
        studentName: profile.name,
        group: profile.group || "",
        level: profile.level || "",
        part: ctx.part,
        question: ctx.question,
        notes: ctx.notes || ""
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setSubmitStatus("❌ Submit failed. Check API/env vars.");
      console.error("Submit error:", data);
    } else {
      setSubmitStatus("✅ Submitted successfully!");

      // show sample answer after submit (if available)
      if (ctx.sample?.text){
        openSampleModal({
          title: "Band 9 Model Answer",
          meta: `${currentSet.title} • ${ctx.part}`,
          text: ctx.sample.text,
          collocations: ctx.sample.collocations || [],
          phrases: ctx.sample.phrases || []
        });
      } else {
        openSampleModal({
          title: "Model Answer",
          meta: `${currentSet.title} • ${ctx.part}`,
          text: "No sample answer for this item yet. Add it to the set data inside app.js.",
          collocations: [],
          phrases: []
        });
      }
    }
  } catch (e) {
    setSubmitStatus("❌ Network error. Try again.");
    console.error(e);
  } finally {
    submitBtn.disabled = false;
  }
}

submitBtn.addEventListener("click", submitCurrentTask);
setSubmitStatus("Ready.");
renderProfileLine();

/* =========================================================
   Build everything for selected set
========================================================= */
function rebuildAllForSet(){
  // clear timers
  p1Timer.stop(); p2Timer.stop(); p3Timer.stop(); fluencyTimer.stop();
  $("#p1StartBtn").disabled = false; $("#p1StopBtn").disabled = true; p1TimerEl.textContent = "00:35";
  $("#p2StopBtn").disabled = true; p2TimerEl.textContent = "01:00";
  $("#p3StartBtn").disabled = false; $("#p3StopBtn").disabled = true; p3TimerEl.textContent = "01:00";
  $("#fluencyStartBtn").disabled = false; $("#fluencyStopBtn").disabled = true; fluencyTimerEl.textContent = "00:30";

  // rebuild parts
  rebuildPart1();
  rebuildPart2();
  rebuildPart3();
  buildStudy();
}
rebuildAllForSet();
