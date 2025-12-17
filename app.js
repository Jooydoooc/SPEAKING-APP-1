/* =========
   Version 2
   Pure HTML/CSS/JS
   ========= */

const STORAGE_KEY = "speaking_v2_profile";

/**
 * IMPORTANT FIX:
 * Sets MUST render from SETS (not user data).
 * If you already have sets.json, we load it into SETS at startup.
 */
let SETS = []; // populated from sets.json (preferred) OR fallback below

// Minimal fallback so the grid ALWAYS shows at least Set – 01
const FALLBACK_SETS = [
  {
    id: "set01",
    title: "Speaking Set – 01",
    summary: "Part 1 • Part 2 • Part 3",
    parts: {
      part1: { topics: [] },
      part2: { cueCard: { id: "p2_cc1", label: "Part 2", text: "Describe a place with a lot of trees.\nYou should say:\nWhere this place is located\nWhat kinds of trees or plants are there\nWhat people usually do in this place\nAnd explain how you feel when you spend time there", study: null, practice: null, samples: null } },
      part3: { questions: [] }
    }
  }
];

const screens = {
  login: document.getElementById("screenLogin"),
  menu: document.getElementById("screenMenu"),
  set: document.getElementById("screenSet"),
};

const topBar = document.getElementById("topBar");
const topRight = document.getElementById("topRight");

const loginForm = document.getElementById("loginForm");
const fullNameEl = document.getElementById("fullName");
const groupNameEl = document.getElementById("groupName");
const bandScoreEl = document.getElementById("bandScore");
const errName = document.getElementById("errName");
const errGroup = document.getElementById("errGroup");
const errBand = document.getElementById("errBand");
const loginHint = document.getElementById("loginHint");

const setsGrid = document.getElementById("setsGrid"); // ✅ must exist and be separate from topRight

const backToMenuBtn = document.getElementById("backToMenuBtn");
const setHeading = document.getElementById("setHeading");
const setSummary = document.getElementById("setSummary");

const partTabs = Array.from(document.querySelectorAll(".part-tab"));
const questionList = document.getElementById("questionList");
const qListSub = document.getElementById("qListSub");

const qLabel = document.getElementById("qLabel");
const qTopic = document.getElementById("qTopic");
const qText = document.getElementById("qText");
const tipLine = document.getElementById("tipLine");

const qTabs = Array.from(document.querySelectorAll(".q-tab"));
const panelStudy = document.getElementById("panelStudy");
const panelPractice = document.getElementById("panelPractice");
const panelSample = document.getElementById("panelSample");

let currentSet = null;
let currentPartKey = "part1";
let currentQuestion = null;

/* ---------- Utilities ---------- */

function setActiveScreen(key) {
  Object.values(screens).forEach((s) => s.classList.remove("screen-active"));
  screens[key].classList.add("screen-active");

  // Top header shows only after login
  topBar.hidden = (key === "login");
  window.scrollTo({ top: 0, behavior: "instant" });
}

function safeJsonParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[m]));
}

function isStep05(value) {
  const scaled = Math.round(value * 10);
  return scaled % 5 === 0;
}

function clearErrors() {
  errName.textContent = "";
  errGroup.textContent = "";
  errBand.textContent = "";
  loginHint.textContent = "";
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return safeJsonParse(raw);
}

/* ---------- Data Loading ---------- */

async function loadSetsIntoSETS() {
  // If you have sets.json in your project, this will load it.
  // If not found, it falls back to FALLBACK_SETS.
  try {
    const res = await fetch("sets.json", { cache: "no-store" });
    if (!res.ok) throw new Error("sets.json not found");
    const data = await res.json();
    const arr = Array.isArray(data?.sets) ? data.sets : [];
    SETS = arr.length ? arr : FALLBACK_SETS;
  } catch {
    SETS = FALLBACK_SETS;
  }
}

/* ---------- Header (User info ONLY) ---------- */

function renderHeader(profile) {
  // User info lives ONLY in the header/top area (topRight).
  topRight.innerHTML = `
    <div class="user-chip" id="userChip">
      <div>
        <div class="user-line">${escapeHtml(profile.name)}</div>
        <div class="user-sub">${escapeHtml(profile.group)}</div>
      </div>
      <div class="band-badge">Band ${Number(profile.band).toFixed(1)}</div>
      <button class="edit-mini" type="button" id="editInfoBtn">Edit info</button>
    </div>
  `;

  const editBtn = document.getElementById("editInfoBtn");
  editBtn.addEventListener("click", () => {
    const p = loadProfile();
    if (p) {
      fullNameEl.value = p.name ?? "";
      groupNameEl.value = p.group ?? "";
      bandScoreEl.value = (p.band ?? "").toString();
      loginHint.textContent = "Edit your info and press Start.";
    }
    clearErrors();
    setActiveScreen("login");
  });
}

/* ---------- Main Menu Rendering (FIXED) ---------- */

function renderMenu() {
  // Debug checklist:
  // ✅ setsGrid exists & is not inside userChip/topRight
  // ✅ called after login + on page load if user exists
  // ✅ uses SETS.map(...) — not user
  // ✅ CSS does not hide grid
  // ✅ click uses set id

  if (!setsGrid) return;

  setsGrid.innerHTML = "";

  const list = Array.isArray(SETS) ? SETS : [];
  if (!list.length) {
    setsGrid.innerHTML = `<div class="card"><b>No sets found.</b><div class="muted" style="margin-top:6px;">Check sets.json or SETS data.</div></div>`;
    return;
  }

  list.forEach((set) => {
    const card = document.createElement("div");
    card.className = "set-card";
    card.innerHTML = `
      <div>
        <div class="set-title">${escapeHtml(set.title)}</div>
        <div class="set-sub">${escapeHtml(set.summary || "Part 1 • Part 2 • Part 3")}</div>
      </div>
      <button class="set-open" type="button" data-open="${escapeHtml(set.id)}">Open</button>
    `;

    card.querySelector('[data-open]').addEventListener("click", (e) => {
      e.stopPropagation();
      openSet(set.id);
    });

    // whole card clickable too
    card.addEventListener("click", () => openSet(set.id));

    setsGrid.appendChild(card);
  });
}

/* ---------- Login ---------- */

function validateLoginInputs() {
  clearErrors();
  const name = fullNameEl.value.trim();
  const group = groupNameEl.value.trim();
  const bandRaw = bandScoreEl.value;

  let ok = true;

  if (!name) { errName.textContent = "Please enter your full name."; ok = false; }
  else if (name.length < 2) { errName.textContent = "Name looks too short — please enter a real name."; ok = false; }

  if (!group) { errGroup.textContent = "Please enter your group name (e.g., Even 4:30)."; ok = false; }

  const band = Number(bandRaw);
  if (bandRaw === "" || Number.isNaN(band)) { errBand.textContent = "Please enter your current band score (0–9)."; ok = false; }
  else if (band < 0 || band > 9) { errBand.textContent = "Band score must be between 0 and 9."; ok = false; }
  else if (!isStep05(band)) { errBand.textContent = "Use steps of 0.5 (e.g., 6.0, 6.5, 7.0)."; ok = false; }

  if (!ok) {
    loginHint.textContent = "Fix the highlighted fields and try again.";
    return { ok: false };
  }

  return { ok: true, profile: { name, group, band: Number(band.toFixed(1)) } };
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = validateLoginInputs();
  if (!v.ok) return;

  saveProfile(v.profile);
  renderHeader(v.profile);
  renderMenu(); // ✅ called after login
  setActiveScreen("menu");
});

/* ---------- Set Page ---------- */

function openSet(setId) {
  const set = (Array.isArray(SETS) ? SETS : []).find(s => s.id === setId);
  if (!set) return;

  currentSet = set;
  setHeading.textContent = set.title || "Speaking Set";
  setSummary.textContent = set.summary || "Part 1 • Part 2 • Part 3";

  setActivePart("part1");
  setActiveScreen("set");
}

backToMenuBtn.addEventListener("click", () => setActiveScreen("menu"));

partTabs.forEach((btn) => {
  btn.addEventListener("click", () => setActivePart(btn.dataset.part));
});

qTabs.forEach((btn) => {
  btn.addEventListener("click", () => setActiveQTab(btn.dataset.qtab));
});

function setActivePart(partKey) {
  currentPartKey = partKey;

  partTabs.forEach((b) => {
    const active = b.dataset.part === partKey;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active ? "true" : "false");
  });

  buildQuestionList();
  setFirstQuestion();
}

function getQuestionItemsForPart() {
  if (!currentSet) return [];

  const parts = currentSet.parts || {};

  if (currentPartKey === "part1") {
    const topics = parts.part1?.topics || [];
    const out = [];
    topics.forEach((t) => {
      (t.questions || []).forEach((q) => out.push({ topicTitle: t.title, question: q }));
    });
    return out;
  }

  if (currentPartKey === "part2") {
    const cc = parts.part2?.cueCard;
    return cc ? [{ topicTitle: "Cue Card", question: cc }] : [];
  }

  if (currentPartKey === "part3") {
    const qs = parts.part3?.questions || [];
    return qs.map(q => ({ topicTitle: "Discussion", question: q }));
  }

  return [];
}

function buildQuestionList() {
  questionList.innerHTML = "";
  const items = getQuestionItemsForPart();

  if (currentPartKey === "part1") qListSub.textContent = "Topics";
  else if (currentPartKey === "part2") qListSub.textContent = "Cue card";
  else qListSub.textContent = "Discussion";

  if (!items.length) {
    questionList.innerHTML = `<div class="muted" style="padding:12px;">No items yet for this part.</div>`;
    return;
  }

  items.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-item";
    btn.innerHTML = `
      <div class="q-item-title">${escapeHtml(item.question.label || `Q${idx + 1}`)}</div>
      <div class="q-item-sub">${escapeHtml(item.question.text.split("\n")[0])}</div>
    `;
    btn.addEventListener("click", () => selectQuestion(item.question));
    questionList.appendChild(btn);
  });
}

function setFirstQuestion() {
  const items = getQuestionItemsForPart();
  if (!items.length) {
    currentQuestion = null;
    qLabel.textContent = "—";
    qTopic.textContent = "—";
    qText.textContent = "No questions available.";
    panelStudy.innerHTML = "";
    panelPractice.innerHTML = "";
    panelSample.innerHTML = "";
    return;
  }
  selectQuestion(items[0].question);
}

function highlightSelectedQuestion() {
  const items = Array.from(document.querySelectorAll(".q-item"));
  items.forEach((el) => {
    const sub = el.querySelector(".q-item-sub")?.textContent || "";
    const isActive = currentQuestion && sub === currentQuestion.text.split("\n")[0];
    el.classList.toggle("active", isActive);
  });
}

function setActiveQTab(tabKey) {
  qTabs.forEach((b) => {
    const active = b.dataset.qtab === tabKey;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active ? "true" : "false");
  });

  panelStudy.classList.toggle("active", tabKey === "study");
  panelPractice.classList.toggle("active", tabKey === "practice");
  panelSample.classList.toggle("active", tabKey === "sample");
}

function selectQuestion(q) {
  currentQuestion = q;

  qLabel.textContent = q.label || "Question";
  qTopic.textContent =
    currentPartKey === "part1" ? getTopicTitleForQuestion(q.id) :
    currentPartKey === "part2" ? "Cue Card" : "Part 3";

  qText.textContent = q.text;
  tipLine.textContent = buildTipLine(q);

  renderStudy(q);
  renderPractice(q);
  renderSamples(q);

  highlightSelectedQuestion();
  setActiveQTab("study");
}

function getTopicTitleForQuestion(questionId) {
  const topics = currentSet?.parts?.part1?.topics || [];
  for (const t of topics) {
    for (const q of (t.questions || [])) {
      if (q.id === questionId) return t.title;
    }
  }
  return "—";
}

function buildTipLine(q) {
  const keys = (q.keyVocab || []).slice(0, 4);
  if (!keys.length) return "";
  return `Tip: try using at least one key word: ${keys.join(", ")}.`;
}

/* ---------- Content Renderers (same behavior; safe if some sets have minimal content) ---------- */

function makeSection(title, items, showMoreThreshold = 4) {
  const wrap = document.createElement("div");
  wrap.className = "section";

  const head = document.createElement("div");
  head.className = "section-title";
  head.innerHTML = `<div>${escapeHtml(title)}</div><div class="mini">${items.length} items</div>`;
  wrap.appendChild(head);

  const ul = document.createElement("ul");
  ul.className = "bullets";
  wrap.appendChild(ul);

  const initial = Math.min(items.length, showMoreThreshold);
  let expanded = false;

  function renderList() {
    ul.innerHTML = "";
    const count = expanded ? items.length : initial;
    for (let i = 0; i < count; i++) {
      const li = document.createElement("li");
      const it = items[i];
      li.innerHTML = `<b>${escapeHtml(it.t)}</b> <span class="explain">— ${escapeHtml(it.d)}</span>`;
      ul.appendChild(li);
    }
  }

  renderList();

  if (items.length > showMoreThreshold) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "show-more";
    btn.textContent = "Show more";
    btn.addEventListener("click", () => {
      expanded = !expanded;
      btn.textContent = expanded ? "Show less" : "Show more";
      renderList();
    });
    wrap.appendChild(btn);
  }

  return wrap;
}

function renderStudy(q) {
  panelStudy.innerHTML = "";
  const s = q.study;

  if (!s) {
    panelStudy.innerHTML = `<div class="muted">No study content for this item yet.</div>`;
    return;
  }

  panelStudy.appendChild(makeSection("Collocations", s.collocations || []));
  panelStudy.appendChild(makeSection("Topic vocabularies", s.vocab || []));
  panelStudy.appendChild(makeSection("Phrases", s.phrases || []));
  panelStudy.appendChild(makeSection("Examples", s.examples || []));
}

function renderPractice(q) {
  panelPractice.innerHTML = "";
  const p = q.practice;
  if (!p) {
    panelPractice.innerHTML = `<div class="muted">No practice tasks for this item yet.</div>`;
    return;
  }

  // Keep your existing practice UI if sets.json includes it.
  // If not, show a simple placeholder:
  panelPractice.innerHTML = `<div class="muted">Practice content is available when the set provides practice tasks.</div>`;
}

function renderSamples(q) {
  panelSample.innerHTML = "";
  const s = q.samples;
  if (!s) {
    panelSample.innerHTML = `<div class="muted">No sample answers for this item yet.</div>`;
    return;
  }

  const cards = [
    { title: "Natural & Simple Band 9", text: s.naturalSimple9 },
    { title: "Advanced & Academic Band 9", text: s.advancedAcademic9 },
    { title: "Fluent & Story-based Band 9", text: s.fluentStory9 }
  ];

  cards.forEach((c) => {
    const card = document.createElement("div");
    card.className = "sample-card";
    card.innerHTML = `
      <div class="sample-title">${escapeHtml(c.title)}</div>
      <div class="sample-text">${escapeHtml(c.text)}</div>
    `;
    panelSample.appendChild(card);
  });
}

/* ---------- Init ---------- */

async function initApp() {
  await loadSetsIntoSETS();

  const profile = loadProfile();
  if (profile && profile.name && profile.group && typeof profile.band === "number") {
    renderHeader(profile);
    renderMenu(); // ✅ called on page load if user exists
    setActiveScreen("menu");
  } else {
    loginHint.textContent = "Enter your details and press Start.";
    setActiveScreen("login");
  }
}

initApp();
