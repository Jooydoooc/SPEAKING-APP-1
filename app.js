const STORAGE_KEY = "speaking_v2_profile";

const screens = {
  login: document.getElementById("screenLogin"),
  menu: document.getElementById("screenMenu"),
  set: document.getElementById("screenSet")
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

const editInfoBtn = document.getElementById("editInfoBtn");
const setsGrid = document.getElementById("setsGrid");

const avatarLetters = document.getElementById("avatarLetters");
const profileName = document.getElementById("profileName");
const profileGroup = document.getElementById("profileGroup");
const profileBand = document.getElementById("profileBand");

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

let APP_DATA = null;
let currentSet = null;
let currentPartKey = "part1";
let currentQuestion = null;

function setActiveScreen(key) {
  Object.values(screens).forEach((s) => s.classList.remove("screen-active"));
  screens[key].classList.add("screen-active");

  if (key === "login") {
    topBar.hidden = true;
    topRight.innerHTML = "";
  } else {
    topBar.hidden = false;
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

function safeJsonParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  return safeJsonParse(raw);
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "ST";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
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

function renderProfile(profile) {
  avatarLetters.textContent = initials(profile.name);
  profileName.textContent = profile.name;
  profileGroup.textContent = profile.group;
  profileBand.textContent = `Band ${Number(profile.band).toFixed(1)}`;

  topRight.innerHTML = `
    <span class="top-mini" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
      <span style="font-weight:900;">${escapeHtml(profile.name)}</span>
      <span class="muted">•</span>
      <span class="muted">${escapeHtml(profile.group)}</span>
      <span class="muted">•</span>
      <span style="font-weight:1000; padding:6px 10px; border-radius:999px; border:1px solid rgba(37,99,235,.25); background:rgba(37,99,235,.10);">
        Band ${Number(profile.band).toFixed(1)}
      </span>
    </span>
  `;
}

async function loadSets() {
  const res = await fetch("sets.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load sets.json");
  return res.json();
}

function renderSetsHub() {
  setsGrid.innerHTML = "";
  const sets = (APP_DATA?.sets || []);

  sets.forEach((s) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "set-card";
    btn.innerHTML = `
      <div>
        <div class="set-title">${escapeHtml(s.title)}</div>
        <div class="set-sub">${escapeHtml(s.summary || "")}</div>
      </div>
      <div class="set-pill">Open →</div>
    `;
    btn.addEventListener("click", () => openSet(s.id));
    setsGrid.appendChild(btn);
  });
}

function openSet(setId) {
  const s = (APP_DATA?.sets || []).find(x => x.id === setId);
  if (!s) return;

  currentSet = s;
  setHeading.textContent = s.title;
  setSummary.textContent = s.summary || "";

  setActivePart("part1");
  setActiveScreen("set");
}

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

function getQuestionItemsForPart() {
  if (!currentSet) return [];

  if (currentPartKey === "part1") {
    const topics = currentSet.parts.part1.topics || [];
    const out = [];
    topics.forEach((t) => {
      (t.questions || []).forEach((q) => out.push({ topicTitle: t.title, question: q }));
    });
    return out;
  }

  if (currentPartKey === "part2") {
    const cc = currentSet.parts.part2.cueCard;
    return cc ? [{ topicTitle: "Cue Card", question: cc }] : [];
  }

  if (currentPartKey === "part3") {
    const qs = currentSet.parts.part3.questions || [];
    return qs.map(q => ({ topicTitle: "Discussion", question: q }));
  }

  return [];
}

function buildQuestionList() {
  questionList.innerHTML = "";
  const items = getQuestionItemsForPart();

  if (currentPartKey === "part1") qListSub.textContent = "Topics 1–2";
  else if (currentPartKey === "part2") qListSub.textContent = "Cue card";
  else qListSub.textContent = "Discussion questions";

  items.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "q-item";
    btn.innerHTML = `
      <div class="q-item-title">${escapeHtml(item.question.label || `Q${idx+1}`)}</div>
      <div class="q-item-sub">${escapeHtml(item.question.text.split("\n")[0])}</div>
    `;
    btn.addEventListener("click", () => selectQuestion(item.question));
    questionList.appendChild(btn);
  });
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
  qTopic.textContent = currentPartKey === "part1"
    ? getTopicTitleForQuestion(q.id)
    : (currentPartKey === "part2" ? "Cue Card" : "Part 3");

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
    panelStudy.innerHTML = `<div class="muted">No study content yet.</div>`;
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
    panelPractice.innerHTML = `<div class="muted">No practice tasks yet.</div>`;
    return;
  }

  const grid = document.createElement("div");
  grid.className = "practice-grid";

  grid.appendChild(renderGapFilling(p.gapFilling || []));
  grid.appendChild(renderDefinition(p.definition || []));
  grid.appendChild(renderMatching(p.matching || []));
  grid.appendChild(renderMakingSentences(p.makingSentences, q.keyVocab || []));

  panelPractice.appendChild(grid);
}

function renderGapFilling(items) {
  const box = document.createElement("div");
  box.className = "task";
  box.innerHTML = `
    <div class="task-head">
      <div>
        <div class="task-title">Gap filling</div>
        <div class="task-sub">Type the missing word.</div>
      </div>
    </div>
  `;

  const wrap = document.createElement("div");
  wrap.className = "inline";

  items.forEach((it, idx) => {
    const row = document.createElement("div");
    row.className = "section";
    row.style.margin = "0";
    row.innerHTML = `
      <div class="tiny muted">Item ${idx + 1}</div>
      <div style="font-weight:900; margin:6px 0 8px;">${escapeHtml(it.prompt)}</div>
      <div class="row">
        <input type="text" placeholder="Your answer" data-gap="${idx}" />
        <button class="small-btn primary" type="button" data-check="${idx}">Check</button>
      </div>
      <div class="feedback" data-fb="${idx}">—</div>
    `;
    wrap.appendChild(row);
  });

  box.appendChild(wrap);

  box.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-check]");
    if (!btn) return;
    const idx = Number(btn.dataset.check);
    const input = box.querySelector(`input[data-gap="${idx}"]`);
    const fb = box.querySelector(`.feedback[data-fb="${idx}"]`);
    const user = (input.value || "").trim().toLowerCase();
    const ans = String(items[idx].answer || "").trim().toLowerCase();
    if (!user) { fb.textContent = "Please type an answer."; return; }
    fb.textContent = (user === ans)
      ? "Correct."
      : `Not quite. Suggested answer: ${items[idx].answer}`;
  });

  return box;
}

function renderDefinition(items) {
  const box = document.createElement("div");
  box.className = "task";
  box.innerHTML = `
    <div class="task-head">
      <div>
        <div class="task-title">Definition</div>
        <div class="task-sub">Choose the correct meaning.</div>
      </div>
    </div>
  `;

  const wrap = document.createElement("div");
  wrap.className = "inline";

  items.forEach((it, idx) => {
    const row = document.createElement("div");
    row.className = "section";
    row.style.margin = "0";
    const opts = it.choices.map((c, i) => `<option value="${i}">${escapeHtml(c)}</option>`).join("");
    row.innerHTML = `
      <div class="tiny muted">Item ${idx + 1}</div>
      <div style="font-weight:1000; margin:6px 0;">${escapeHtml(it.term)}</div>
      <div class="row">
        <select data-def="${idx}">
          <option value="">Select…</option>
          ${opts}
        </select>
        <button class="small-btn primary" type="button" data-checkdef="${idx}">Check</button>
      </div>
      <div class="feedback" data-fbdef="${idx}">—</div>
    `;
    wrap.appendChild(row);
  });

  box.appendChild(wrap);

  box.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-checkdef]");
    if (!btn) return;
    const idx = Number(btn.dataset.checkdef);
    const sel = box.querySelector(`select[data-def="${idx}"]`);
    const fb = box.querySelector(`.feedback[data-fbdef="${idx}"]`);
    const v = sel.value;
    if (v === "") { fb.textContent = "Please choose an option."; return; }
    fb.textContent = (Number(v) === Number(items[idx].answerIndex))
      ? "Correct."
      : `Not quite. Suggested answer: ${items[idx].choices[items[idx].answerIndex]}`;
  });

  return box;
}

function renderMatching(items) {
  const box = document.createElement("div");
  box.className = "task";
  box.innerHTML = `
    <div class="task-head">
      <div>
        <div class="task-title">Matching</div>
        <div class="task-sub">Match each phrase to the correct meaning.</div>
      </div>
    </div>
  `;

  const wrap = document.createElement("div");
  wrap.className = "inline";

  items.forEach((it, idx) => {
    const row = document.createElement("div");
    row.className = "section";
    row.style.margin = "0";
    const opts = it.rightChoices.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
    row.innerHTML = `
      <div class="tiny muted">Item ${idx + 1}</div>
      <div style="font-weight:1000; margin:6px 0;">${escapeHtml(it.left)}</div>
      <div class="row">
        <select data-match="${idx}">
          <option value="">Select…</option>
          ${opts}
        </select>
      </div>
      <div class="feedback" data-fbmatch="${idx}">—</div>
    `;
    wrap.appendChild(row);
  });

  const actions = document.createElement("div");
  actions.className = "row";
  actions.innerHTML = `
    <button class="small-btn primary" type="button" id="checkMatchingBtn">Check all</button>
    <button class="small-btn" type="button" id="resetMatchingBtn">Reset</button>
  `;

  box.appendChild(wrap);
  box.appendChild(actions);

  box.querySelector("#checkMatchingBtn").addEventListener("click", () => {
    items.forEach((it, idx) => {
      const sel = box.querySelector(`select[data-match="${idx}"]`);
      const fb = box.querySelector(`.feedback[data-fbmatch="${idx}"]`);
      const v = sel.value;
      if (!v) { fb.textContent = "Choose an option."; return; }
      fb.textContent = (v === it.answer) ? "Correct." : `Not quite. Suggested answer: ${it.answer}`;
    });
  });

  box.querySelector("#resetMatchingBtn").addEventListener("click", () => {
    items.forEach((_, idx) => {
      const sel = box.querySelector(`select[data-match="${idx}"]`);
      const fb = box.querySelector(`.feedback[data-fbmatch="${idx}"]`);
      sel.value = "";
      fb.textContent = "—";
    });
  });

  return box;
}

function renderMakingSentences(cfg, fallbackKeys) {
  const box = document.createElement("div");
  box.className = "task";

  if (!cfg) {
    box.innerHTML = `
      <div class="task-head">
        <div>
          <div class="task-title">Making sentences</div>
          <div class="task-sub">No task available.</div>
        </div>
      </div>
    `;
    return box;
  }

  const must = Array.isArray(cfg.mustUseAny) ? cfg.mustUseAny : (fallbackKeys || []);
  const tips = Array.isArray(cfg.tips) ? cfg.tips : [];

  box.innerHTML = `
    <div class="task-head">
      <div>
        <div class="task-title">Making sentences</div>
        <div class="task-sub">Write one sentence. The app will give suggestions.</div>
      </div>
    </div>
  `;

  const section = document.createElement("div");
  section.className = "section";
  section.style.margin = "0";

  const chips = must.slice(0, 10).map(w => `<span class="chip">${escapeHtml(w)}</span>`).join("");

  const tipsHtml = tips.length
    ? `<ul class="bullets">${tips.map(t => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
    : "";

  section.innerHTML = `
    <div style="font-weight:1000; margin-bottom:8px;">${escapeHtml(cfg.prompt || "Write one sentence.")}</div>
    <div class="tiny muted">Try to include at least one key word:</div>
    <div class="keychips">${chips}</div>
    <div style="margin-top:10px;">
      <textarea id="sentenceInput" placeholder="Type your sentence here..."></textarea>
    </div>
    <div class="row" style="margin-top:10px;">
      <button class="small-btn primary" type="button" id="checkSentenceBtn">Check</button>
      <button class="small-btn" type="button" id="clearSentenceBtn">Clear</button>
    </div>
    <div class="feedback" id="sentenceFeedback">—</div>
    <div class="outline">${tipsHtml}</div>
  `;

  box.appendChild(section);

  const input = section.querySelector("#sentenceInput");
  const fb = section.querySelector("#sentenceFeedback");

  section.querySelector("#checkSentenceBtn").addEventListener("click", () => {
    const user = (input.value || "").trim();
    const result = checkSentence(user, must);
    fb.textContent = result;
  });

  section.querySelector("#clearSentenceBtn").addEventListener("click", () => {
    input.value = "";
    fb.textContent = "—";
  });

  return box;
}

function checkSentence(sentence, mustUseAny) {
  if (!sentence) return "Please write a sentence first.";

  const raw = sentence;
  let s = raw.trim();

  const notes = [];
  const improvements = [];

  // Basic format checks
  if (!/^[A-Z]/.test(s)) {
    notes.push("Start with a capital letter.");
    s = s.charAt(0).toUpperCase() + s.slice(1);
  }

  if (!/[.!?]$/.test(s)) {
    notes.push("End with punctuation (., !, or ?).");
    s = s + ".";
  }

  const words = s.replace(/[^\w\s'-]/g, "").split(/\s+/).filter(Boolean);
  if (words.length < 6) notes.push("Your sentence is a bit short. Add one detail (where/why/how).");

  // Key vocabulary check
  const lower = s.toLowerCase();
  const keyHits = (mustUseAny || []).filter(k => lower.includes(String(k).toLowerCase()));
  if (!keyHits.length && (mustUseAny || []).length) {
    notes.push("Try using at least one key word from the list.");
  }

  // Common grammar/usage heuristics
  const commonFixes = [
    { bad: /\bpeoples\b/gi, good: "people", note: "Use “people” (not “peoples”) in most cases." },
    { bad: /\binformations\b/gi, good: "information", note: "“Information” is uncountable." },
    { bad: /\bmore better\b/gi, good: "better", note: "Avoid double comparatives (say “better”)." },
    { bad: /\bdiscuss about\b/gi, good: "discuss", note: "Say “discuss something” (no “about”)." },
    { bad: /\bvery very\b/gi, good: "really", note: "Avoid repeating intensifiers; try “really” or be specific." }
  ];
  commonFixes.forEach(f => {
    if (f.bad.test(s)) {
      notes.push(f.note);
      s = s.replace(f.bad, f.good);
    }
  });

  // Simple subject-verb agreement hint (best-effort)
  const svaHints = [
    { pattern: /\b(he|she|it)\s+(go|do|have|live|like)\b/i, hint: "With he/she/it, add -s: goes/does/has/lives/likes." }
  ];
  svaHints.forEach(h => {
    if (h.pattern.test(raw)) notes.push(h.hint);
  });

  // Unnatural phrasing hints (best-effort)
  if (/\ba lots of\b/i.test(raw)) notes.push("Use “a lot of” or “many” (not “a lots of”).");
  if (/(because because|and and)/i.test(raw)) notes.push("Avoid repeating the same connector.");

  // Suggest improvements (style)
  if (words.length >= 6) {
    improvements.push("Consider adding one reason with “because/since” or one example.");
  }
  if (keyHits.length) {
    improvements.push(`Nice: you used key word(s): ${keyHits.slice(0, 3).join(", ")}.`);
  }

  const improved = s;

  const lines = [];
  if (!notes.length) {
    lines.push("Looks good. Here’s a slightly polished version:");
    lines.push(`Improved: ${improved}`);
    return lines.join("\n");
  }

  lines.push("Suggestions:");
  notes.slice(0, 6).forEach(n => lines.push(`- ${n}`));
  if (improvements.length) {
    improvements.slice(0, 2).forEach(i => lines.push(`- ${i}`));
  }
  lines.push("");
  lines.push(`Improved: ${improved}`);

  return lines.join("\n");
}

function renderSamples(q) {
  panelSample.innerHTML = "";
  const s = q.samples;
  if (!s) {
    panelSample.innerHTML = `<div class="muted">No sample answers yet.</div>`;
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

partTabs.forEach((btn) => {
  btn.addEventListener("click", () => setActivePart(btn.dataset.part));
});

qTabs.forEach((btn) => {
  btn.addEventListener("click", () => setActiveQTab(btn.dataset.qtab));
});

backToMenuBtn.addEventListener("click", () => {
  setActiveScreen("menu");
});

editInfoBtn.addEventListener("click", () => {
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

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = validateLoginInputs();
  if (!v.ok) return;

  saveProfile(v.profile);
  renderProfile(v.profile);
  renderSetsHub();
  setActiveScreen("menu");
});

function initApp() {
  loadSets()
    .then((data) => {
      APP_DATA = data;

      const profile = loadProfile();
      if (profile && profile.name && profile.group && typeof profile.band === "number") {
        renderProfile(profile);
        renderSetsHub();
        setActiveScreen("menu");
      } else {
        loginHint.textContent = "Enter your details and press Start.";
        setActiveScreen("login");
      }
    })
    .catch(() => {
      loginHint.textContent = "Could not load learning content. Please check sets.json is uploaded.";
      setActiveScreen("login");
    });
}

initApp();
