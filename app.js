/* =========================================================
   IELTS Speaking App — Version 2 (UI Upgrade)
   - Pure HTML/CSS/JS
   - Login (ONLY: name, group, band score)
   - Main Menu (Sets Hub)
   - Set page placeholder (route/screen)
========================================================= */

const STORAGE_KEY = "speaking_app_v2_profile";

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

const editInfoBtn = document.getElementById("editInfoBtn");
const setsGrid = document.getElementById("setsGrid");

const avatarLetters = document.getElementById("avatarLetters");
const profileName = document.getElementById("profileName");
const profileGroup = document.getElementById("profileGroup");
const profileBand = document.getElementById("profileBand");

const setHeading = document.getElementById("setHeading");
const setSummary = document.getElementById("setSummary");
const backToMenuBtn = document.getElementById("backToMenuBtn");

/* =========================================================
   Data: Sets Hub (expand anytime)
========================================================= */
const SPEAKING_SETS = [
  { id: "set01", title: "Speaking Set – 01", summary: "Part 1 / Part 2 / Part 3" },
  { id: "set02", title: "Speaking Set – 02", summary: "Part 1 / Part 2 / Part 3" },
  { id: "set03", title: "Speaking Set – 03", summary: "Part 1 / Part 2 / Part 3" },
  { id: "set04", title: "Speaking Set – 04", summary: "Part 1 / Part 2 / Part 3" },
];

/* =========================================================
   Utilities
========================================================= */
function safeJsonParse(raw) {
  try { return JSON.parse(raw); } catch { return null; }
}

function saveProfile(profile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

function loadProfile() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const data = safeJsonParse(raw);
  if (!data) return null;
  return data;
}

function isMultipleOfStep(value, step) {
  // handle floating point safely: multiply
  const scaled = Math.round(value * 10);
  const scaledStep = Math.round(step * 10);
  return scaled % scaledStep === 0;
}

function setActiveScreen(key) {
  Object.values(screens).forEach((s) => s.classList.remove("screen-active"));
  screens[key].classList.add("screen-active");

  // show top bar after login
  if (key === "login") {
    topBar.hidden = true;
    topRight.innerHTML = "";
  } else {
    topBar.hidden = false;
  }

  // simple scroll reset for mobile
  window.scrollTo({ top: 0, behavior: "instant" });
}

function initials(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "ST";
  const first = parts[0][0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/* =========================================================
   Validation (friendly error messages)
========================================================= */
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

  if (!name) {
    errName.textContent = "Please enter your full name.";
    ok = false;
  } else if (name.length < 2) {
    errName.textContent = "Name looks too short — please enter a real name.";
    ok = false;
  }

  if (!group) {
    errGroup.textContent = "Please enter your group name (e.g., Even 4:30).";
    ok = false;
  }

  const band = Number(bandRaw);
  if (bandRaw === "" || Number.isNaN(band)) {
    errBand.textContent = "Please enter your current band score (0–9).";
    ok = false;
  } else if (band < 0 || band > 9) {
    errBand.textContent = "Band score must be between 0 and 9.";
    ok = false;
  } else if (!isMultipleOfStep(band, 0.5)) {
    errBand.textContent = "Use steps of 0.5 (e.g., 6.0, 6.5, 7.0).";
    ok = false;
  }

  if (!ok) {
    loginHint.textContent = "Fix the highlighted fields and try again.";
    return { ok: false };
  }

  return {
    ok: true,
    profile: { name, group, band }
  };
}

/* =========================================================
   Main Menu Rendering
========================================================= */
function renderProfile(profile) {
  avatarLetters.textContent = initials(profile.name);
  profileName.textContent = profile.name;
  profileGroup.textContent = profile.group;
  profileBand.textContent = `Band ${Number(profile.band).toFixed(1)}`;

  // top right mini badge
  topRight.innerHTML = `
    <span class="top-mini">
      <span style="font-weight:800;">${escapeHtml(profile.name)}</span>
      <span class="muted" style="margin:0 8px;">•</span>
      <span class="muted">${escapeHtml(profile.group)}</span>
      <span class="muted" style="margin:0 8px;">•</span>
      <span style="font-weight:900; padding:6px 10px; border-radius:999px; border:1px solid rgba(37,99,235,.25); background:rgba(37,99,235,.10);">
        Band ${Number(profile.band).toFixed(1)}
      </span>
    </span>
  `;
}

function renderSets() {
  setsGrid.innerHTML = "";

  SPEAKING_SETS.forEach((s) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "set-card";
    card.setAttribute("aria-label", `Open ${s.title}`);

    card.innerHTML = `
      <div>
        <div class="set-title">${escapeHtml(s.title)}</div>
        <div class="set-sub">${escapeHtml(s.summary)}</div>
      </div>
      <div class="set-pill">Open →</div>
    `;

    card.addEventListener("click", () => openSet(s.id));
    setsGrid.appendChild(card);
  });
}

/* =========================================================
   Routing: open set / back
========================================================= */
function openSet(setId) {
  const s = SPEAKING_SETS.find(x => x.id === setId) || SPEAKING_SETS[0];
  setHeading.textContent = s.title;
  setSummary.textContent = s.summary;
  setActiveScreen("set");
}

backToMenuBtn.addEventListener("click", () => {
  setActiveScreen("menu");
});

/* =========================================================
   Login flow + Edit Info button
========================================================= */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const v = validateLoginInputs();
  if (!v.ok) return;

  saveProfile(v.profile);
  renderProfile(v.profile);
  renderSets();
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

/* =========================================================
   Escape HTML (safe rendering)
========================================================= */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[m]));
}

/* =========================================================
   Boot
========================================================= */
(function init() {
  const profile = loadProfile();

  // Pre-fill login if data exists (user asked: Edit info button later)
  if (profile && profile.name && profile.group && typeof profile.band === "number") {
    renderProfile(profile);
    renderSets();
    setActiveScreen("menu");
  } else {
    // Optional friendly hint on login
    loginHint.textContent = "Enter your details and press Start.";
    setActiveScreen("login");
  }
})();
