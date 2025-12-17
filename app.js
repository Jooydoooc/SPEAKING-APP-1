const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

/* -----------------------------
   Data (editable)
--------------------------------*/
const DATA = {
  topics: [
    {
      name: "Technology",
      p1: [
        "Do you use social media every day?",
        "What apps do you use most often?",
        "Do you think technology makes life easier?",
        "Do you prefer studying online or in a classroom?"
      ],
      p2: [
        "Describe a piece of technology that you use a lot.\nYou should say:\n- what it is\n- how you use it\n- why it is useful\nand explain how it affects your daily life.",
        "Describe a time when technology caused a problem for you.\nYou should say:\n- what happened\n- what you did\n- how you felt\nand explain what you learned from the experience."
      ],
      p3: [
        "Do you think people are becoming less social because of technology?",
        "Should schools limit students’ screen time? Why/why not?",
        "How might technology change education in the future?"
      ],
      bundles: {
        collocations: ["digital distraction", "screen addiction", "privacy concerns", "boost productivity", "social isolation"],
        phrases: ["It depends on how you use it.", "I’m a bit on the fence.", "It’s a double-edged sword.", "From my perspective…", "To be honest…"],
        paraphrase: ["children → youngsters/adolescents", "harmful → damaging/detrimental", "popular → widespread/common", "improve → enhance/boost", "problem → issue/challenge"]
      }
    },
    {
      name: "Education",
      p1: [
        "What kind of learner are you?",
        "What subject did you enjoy at school?",
        "Do you prefer studying alone or with others?",
        "How often do you read in English?"
      ],
      p2: [
        "Describe a teacher who influenced you.\nYou should say:\n- who the teacher was\n- what they taught\n- what they did differently\nand explain why you still remember them.",
        "Describe a time you learned something useful outside school.\nYou should say:\n- what it was\n- how you learned it\n- why it was useful\nand explain how it helped you."
      ],
      p3: [
        "What makes a good teacher in your opinion?",
        "Do exams accurately measure ability? Why/why not?",
        "How can schools help students think critically?"
      ],
      bundles: {
        collocations: ["hands-on practice", "academic pressure", "learning outcomes", "critical thinking", "study routine"],
        phrases: ["What I find helpful is…", "In the long run…", "It really depends on the learner.", "One key factor is…", "I’d argue that…"],
        paraphrase: ["important → crucial/vital", "hard → challenging/tough", "learn → pick up/acquire", "teacher → educator/instructor", "skill → ability/competency"]
      }
    },
    {
      name: "Health & Lifestyle",
      p1: [
        "Do you exercise regularly?",
        "What do you do to relax?",
        "Do you prefer home-cooked food or eating out?",
        "How important is sleep for you?"
      ],
      p2: [
        "Describe a healthy habit you developed.\nYou should say:\n- what it is\n- when you started it\n- how you keep it\nand explain how it improved your life.",
        "Describe a time you felt stressed.\nYou should say:\n- why you were stressed\n- what you did\n- who helped you\nand explain what you learned."
      ],
      p3: [
        "Why do people struggle to keep healthy habits?",
        "Should governments do more to promote healthy living?",
        "How has modern life changed people’s health?"
      ],
      bundles: {
        collocations: ["balanced diet", "mental well-being", "build stamina", "manage stress", "healthy routine"],
        phrases: ["It’s all about consistency.", "I try to strike a balance.", "To be fair…", "That said…", "Overall, I’d say…"],
        paraphrase: ["stress → pressure/anxiety", "healthy → beneficial/wholesome", "tired → exhausted/drained", "improve → enhance/upgrade", "bad → harmful/negative"]
      }
    }
  ],
  p1Starters: [
    "To be honest, …",
    "Well, I’d say …",
    "It depends, but generally …",
    "Actually, …",
    "From my perspective, …",
    "I’m not really into it, but …"
  ],
  p3Linking: [
    "On the one hand…",
    "On the other hand…",
    "That said, …",
    "In the long run, …",
    "A good example is …",
    "Overall, I’d argue that …"
  ],
  grammarSwitches: [
    { label: "Past experience: used to / once" },
    { label: "Speculation: might / likely" },
    { label: "Contrast: whereas / while" },
    { label: "Conditional: If…, would…" },
    { label: "Relative clause: which/who/that" },
    { label: "Cause: because / therefore" }
  ],
  chunks: [
    { text: "To be honest, I’m not really into it.", hint: "Stress: HON-est • REAL-ly • IN-to" },
    { text: "I’d say it’s a double-edged sword.", hint: "Stress: SAY • DOU-ble • EDGE • SWORD" },
    { text: "What I mean is, it depends on the situation.", hint: "Linking: mean_is • depends_on" },
    { text: "In the long run, it can be beneficial.", hint: "Stress: LONG run • ben-E-fi-cial" },
    { text: "That’s an interesting question — let me think.", hint: "Intonation: INTEResting QUES-tion" }
  ],
  endings: [
    "worked /t/ vs word /d/ — keep the last sound!",
    "best, next, asked — final clusters (st / kst / skt)",
    "think /θ/ vs sink /s/ — tongue between teeth",
    "world /wɜːld/ — don’t drop the /ld/",
    "students — pronounce the final /ts/ clearly"
  ],
  fluencyPrompts: [
    "Do you think technology makes people’s lives better or worse?",
    "Should students do homework every day?",
    "Is it better to live in a big city or a small town?",
    "Why do people find it difficult to learn English?",
    "How has social media changed communication?"
  ],
  fluencyChecklist: [
    "I used sentence stress (content words stronger).",
    "I used at least one collocation naturally.",
    "I used 1–2 grammar switches.",
    "I gave a clear example.",
    "I avoided long pauses (used fillers / rephrasing)."
  ]
};

/* -----------------------------
   Login/Profile (Required)
--------------------------------*/
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

/* -----------------------------
   General helpers
--------------------------------*/
function fillSelect(selectEl, items) {
  selectEl.innerHTML = "";
  items.forEach((item, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = item;
    selectEl.appendChild(opt);
  });
}
function fillTopicSelect(selectEl) {
  selectEl.innerHTML = "";
  DATA.topics.forEach((t, i) => {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = t.name;
    selectEl.appendChild(opt);
  });
}

/* -----------------------------
   Tabs
--------------------------------*/
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

/* -----------------------------
   Chips & switches
--------------------------------*/
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
  DATA.grammarSwitches.forEach(sw => {
    const el = document.createElement("div");
    el.className = "switch";
    el.textContent = sw.label;
    el.addEventListener("click", () => el.classList.toggle("active"));
    container.appendChild(el);
  });
}

/* -----------------------------
   Timer
--------------------------------*/
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

/* -----------------------------
   Part 1
--------------------------------*/
const p1Topic = $("#p1Topic");
const p1Question = $("#p1Question");
const p1QText = $("#p1QText");
const p1TimerEl = $("#p1Timer");
const p1Timer = createTimer(p1TimerEl);

fillTopicSelect(p1Topic);
renderChips($("#p1Chips"), DATA.p1Starters);
renderSwitches($("#p1Switches"));

function loadP1Questions() {
  const t = DATA.topics[Number(p1Topic.value)];
  fillSelect(p1Question, t.p1.map((_, idx) => `Q${idx+1}`));
  p1Question.value = "0";
  p1QText.textContent = t.p1[0];
}
p1Topic.addEventListener("change", loadP1Questions);
p1Question.addEventListener("change", () => {
  const t = DATA.topics[Number(p1Topic.value)];
  p1QText.textContent = t.p1[Number(p1Question.value)];
});
$("#p1NextBtn").addEventListener("click", () => {
  const t = DATA.topics[Number(p1Topic.value)];
  const next = (Number(p1Question.value) + 1) % t.p1.length;
  p1Question.value = String(next);
  p1QText.textContent = t.p1[next];
});
$("#p1StartBtn").addEventListener("click", () => {
  $("#p1StartBtn").disabled = true;
  $("#p1StopBtn").disabled = false;
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
loadP1Questions();

/* -----------------------------
   Part 2
--------------------------------*/
const p2Topic = $("#p2Topic");
const p2Question = $("#p2Question");
const p2QText = $("#p2QText");
const p2TimerEl = $("#p2Timer");
const p2Timer = createTimer(p2TimerEl);
const p2Notes = $("#p2Notes");
const savedPreview = $("#savedPreview");

fillTopicSelect(p2Topic);

function renderBundles() {
  const t = DATA.topics[Number(p2Topic.value)];
  const b = t.bundles;
  const wrap = $("#p2Bundles");
  wrap.innerHTML = "";

  const makeBlock = (title, list) => {
    const box = document.createElement("div");
    box.className = "ending";
    box.innerHTML = `<b>${title}</b><div class="muted small" style="margin-top:6px">${list.join(" • ")}</div>`;
    return box;
  };

  wrap.appendChild(makeBlock("Collocations", b.collocations));
  wrap.appendChild(makeBlock("Safe Phrases", b.phrases));
  wrap.appendChild(makeBlock("Paraphrase", b.paraphrase));
}

function loadP2Questions() {
  const t = DATA.topics[Number(p2Topic.value)];
  fillSelect(p2Question, t.p2.map((_, idx) => `Card ${idx+1}`));
  p2Question.value = "0";
  p2QText.textContent = t.p2[0];
  renderBundles();
  refreshSavedPreview();
}
p2Topic.addEventListener("change", loadP2Questions);
p2Question.addEventListener("change", () => {
  const t = DATA.topics[Number(p2Topic.value)];
  p2QText.textContent = t.p2[Number(p2Question.value)];
});

function notesKey() {
  const topicName = DATA.topics[Number(p2Topic.value)].name;
  const cardIndex = Number(p2Question.value);
  return `band8_notes_${topicName}_card_${cardIndex}`;
}
function refreshSavedPreview() {
  const val = localStorage.getItem(notesKey());
  savedPreview.textContent = val ? val : "No saved notes yet.";
}
$("#p2SaveNotes").addEventListener("click", () => {
  localStorage.setItem(notesKey(), p2Notes.value.trim());
  refreshSavedPreview();
});
$("#p2LoadNotes").addEventListener("click", () => {
  const val = localStorage.getItem(notesKey());
  p2Notes.value = val ? val : "";
  refreshSavedPreview();
});

$("#p2StartPrepBtn").addEventListener("click", () => {
  $("#p2StopBtn").disabled = false;
  p2Timer.start(60, () => {});
});
$("#p2StartSpeakBtn").addEventListener("click", () => {
  $("#p2StopBtn").disabled = false;
  p2Timer.start(120, () => {
    $("#p2StopBtn").disabled = true;
  });
});
$("#p2StopBtn").addEventListener("click", () => {
  p2Timer.stop();
  $("#p2StopBtn").disabled = true;
  p2TimerEl.textContent = "01:00";
});
loadP2Questions();

/* -----------------------------
   Part 3
--------------------------------*/
const p3Topic = $("#p3Topic");
const p3Question = $("#p3Question");
const p3QText = $("#p3QText");
const p3TimerEl = $("#p3Timer");
const p3Timer = createTimer(p3TimerEl);

fillTopicSelect(p3Topic);
renderChips($("#p3Chips"), DATA.p3Linking);
renderSwitches($("#p3Switches"));

function loadP3Questions() {
  const t = DATA.topics[Number(p3Topic.value)];
  fillSelect(p3Question, t.p3.map((_, idx) => `Q${idx+1}`));
  p3Question.value = "0";
  p3QText.textContent = t.p3[0];
}
p3Topic.addEventListener("change", loadP3Questions);
p3Question.addEventListener("change", () => {
  const t = DATA.topics[Number(p3Topic.value)];
  p3QText.textContent = t.p3[Number(p3Question.value)];
});
$("#p3NextBtn").addEventListener("click", () => {
  const t = DATA.topics[Number(p3Topic.value)];
  const next = (Number(p3Question.value) + 1) % t.p3.length;
  p3Question.value = String(next);
  p3QText.textContent = t.p3[next];
});
$("#p3StartBtn").addEventListener("click", () => {
  $("#p3StartBtn").disabled = true;
  $("#p3StopBtn").disabled = false;
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
loadP3Questions();

/* -----------------------------
   Pronunciation
--------------------------------*/
let chunkIndex = 0;
function renderChunk() {
  const c = DATA.chunks[chunkIndex];
  $("#chunkText").textContent = c.text;
  $("#chunkHint").textContent = c.hint;
}
$("#chunkNext").addEventListener("click", () => {
  chunkIndex = (chunkIndex + 1) % DATA.chunks.length;
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
DATA.endings.forEach(e => {
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

/* -----------------------------
   Fluency
--------------------------------*/
const fluencyQuestion = $("#fluencyQuestion");
const fluencyQText = $("#fluencyQText");
const fluencyTimerEl = $("#fluencyTimer");
const fluencyTimer = createTimer(fluencyTimerEl);

fillSelect(fluencyQuestion, DATA.fluencyPrompts.map((_, i) => `Prompt ${i+1}`));
fluencyQText.textContent = DATA.fluencyPrompts[0];

fluencyQuestion.addEventListener("change", () => {
  fluencyQText.textContent = DATA.fluencyPrompts[Number(fluencyQuestion.value)];
});
$("#fluencyNextBtn").addEventListener("click", () => {
  const next = (Number(fluencyQuestion.value) + 1) % DATA.fluencyPrompts.length;
  fluencyQuestion.value = String(next);
  fluencyQText.textContent = DATA.fluencyPrompts[next];
});
$("#fluencyStartBtn").addEventListener("click", () => {
  $("#fluencyStartBtn").disabled = true;
  $("#fluencyStopBtn").disabled = false;
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
DATA.fluencyChecklist.forEach((t) => {
  const row = document.createElement("label");
  row.className = "check";
  row.innerHTML = `<input type="checkbox" /> <span>${t}</span>`;
  checklistWrap.appendChild(row);
});

/* -----------------------------
   Recording (Part 2)
--------------------------------*/
let mediaRecorder = null;
let recordedChunks = [];
let currentBlobUrl = null;

const audioArea = $("#audioArea");
const recStartBtn = $("#recStartBtn");
const recStopBtn = $("#recStopBtn");
const recClearBtn = $("#recClearBtn");

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

  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };
  mediaRecorder.onstop = () => {
    stream.getTracks().forEach(t => t.stop());
    const blob = new Blob(recordedChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(blob);
    currentBlobUrl = url;

    audioArea.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "audio-item";
    wrap.innerHTML = `
      <div style="flex:1; min-width:220px;">
        <div class="muted small">Your recording</div>
        <audio controls src="${url}"></audio>
      </div>
      <div class="audio-actions">
        <a class="btn ghost" href="${url}" download="speaking.webm">Download</a>
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
  } catch {
    recStartBtn.disabled = false;
    recStopBtn.disabled = true;
    alert("Microphone permission denied or recording failed.");
  }
});
recStopBtn.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
  recStartBtn.disabled = false;
  recStopBtn.disabled = true;
});
recClearBtn.addEventListener("click", clearRecordingUI);
clearRecordingUI();

/* -----------------------------
   Reset notes
--------------------------------*/
$("#resetBtn").addEventListener("click", () => {
  Object.keys(localStorage).forEach(k => {
    if (k.startsWith("band8_notes_")) localStorage.removeItem(k);
  });
  p2Notes.value = "";
  refreshSavedPreview();
});

/* -----------------------------
   SUBMIT TO TEACHER (API)
--------------------------------*/
const submitBtn = $("#submitBtn");
const submitStatus = $("#submitStatus");
function setSubmitStatus(text) { submitStatus.textContent = text; }

function getCurrentContext() {
  if (currentTab === "part1") {
    const topic = DATA.topics[Number(p1Topic.value)].name;
    return { part: "Part 1", topic, question: p1QText.textContent.trim(), notes: "" };
  }
  if (currentTab === "part2") {
    const topic = DATA.topics[Number(p2Topic.value)].name;
    return { part: "Part 2", topic, question: p2QText.textContent.trim(), notes: p2Notes.value.trim() };
  }
  if (currentTab === "part3") {
    const topic = DATA.topics[Number(p3Topic.value)].name;
    return { part: "Part 3", topic, question: p3QText.textContent.trim(), notes: "" };
  }
  if (currentTab === "fluency") {
    return { part: "Fluency", topic: "", question: fluencyQText.textContent.trim(), notes: "" };
  }
  if (currentTab === "pron") {
    return { part: "Pronunciation Practice", topic: "", question: $("#chunkText").textContent.trim(), notes: "" };
  }
  return { part: "Unknown", topic: "", question: "", notes: "" };
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
        studentName: profile.name,
        group: profile.group || "",
        level: profile.level || "",
        part: ctx.part,
        topic: ctx.topic,
        question: ctx.question,
        notes: ctx.notes
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setSubmitStatus("❌ Submit failed. Check API/env vars.");
      console.error("Submit error:", data);
    } else {
      setSubmitStatus("✅ Submitted successfully!");
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
