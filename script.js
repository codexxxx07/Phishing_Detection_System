document.addEventListener("DOMContentLoaded", function () {
  /* ================= MATRIX RAIN ================= */

  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  let fontSize = 14;
  let columns = canvas.width / fontSize;
  let drops = [];

  for (let i = 0; i < columns; i++) drops[i] = 1;

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff99";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      let text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
        drops[i] = 0;

      drops[i]++;
    }
  }

  setInterval(drawMatrix, 33);

  window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  });

  /* ================= WELCOME TYPING EFFECT ================= */

  const welcomeElement = document.getElementById("welcomeTyping");

  const welcomeText = "WELCOME TO CYBER SHIELD...";
  let welcomeIndex = 0;

  function typeWelcome() {
    if (welcomeIndex < welcomeText.length) {
      welcomeElement.innerHTML += welcomeText.charAt(welcomeIndex);
      welcomeIndex++;
      setTimeout(typeWelcome, 80); // speed control
    }
  }
  typeWelcome();

  /* ================= ENTER BUTTON ================= */

  document.getElementById("enterBtn").addEventListener("click", function () {
    document.getElementById("matrixScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    // Add background class
    document.body.classList.add("main-bg");
    typeHomeText();
  });

  function typeHomeText() {
    const text = "Protecting College Students in Real-Time";
    const element = document.getElementById("homeTyping");

    let index = 0;
    element.innerHTML = "";

    function typing() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typing, 60);
      }
    }

    typing();
  }

  /* ================= TEAM SECTION (FIXED) ================= */

  /* ================= TEAM SECTION (FINAL FIXED + SHAKE) ================= */

  const teamNames = document.querySelectorAll(".team-name");
  const card = document.querySelector(".profile-card");
  const profileImage = document.querySelector(".profile-img img");

  teamNames.forEach((member) => {
    member.addEventListener("mouseenter", () => activateMember(member));
    member.addEventListener("click", () => activateMember(member));
  });

  const sidebar = document.getElementById("dashboardSidebar");
  const sidebarToggle = document.getElementById("dashboardSidebarToggle");
  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  function activateMember(member) {
    const image = document.getElementById("memberImage");
    const name = document.getElementById("memberName");
    const role = document.getElementById("memberRole");
    const desc = document.getElementById("memberDesc");

    const insta = document.getElementById("instaLink");
    const linkedin = document.getElementById("linkedinLink");
    const github = document.getElementById("githubLink");

    // Blur out
    [image, name, role, desc].forEach((el) => el.classList.add("blur-out"));

    card.classList.add("animate");

    setTimeout(() => {
      // Update content
      image.src = member.dataset.img;
      name.innerText = member.dataset.name;
      role.innerText = member.dataset.role;
      desc.innerText = member.dataset.desc;

      insta.href = member.dataset.insta || "#";
      linkedin.href = member.dataset.linkedin || "#";
      github.href = member.dataset.github || "#";

      [image, name, role, desc].forEach((el) => {
        el.classList.remove("blur-out");
        el.classList.add("blur-in");
      });

      // SHAKE RESET + REAPPLY
      profileImage.style.animation = "none";
      card.style.animation = "none";

      void profileImage.offsetWidth; // force reflow
      void card.offsetWidth;

      profileImage.style.animation = "shakeBeat 0.5s ease";
      card.style.animation = "shakeBeat 0.5s ease";
    }, 250);

    teamNames.forEach((n) => n.classList.remove("active"));
    member.classList.add("active");
  }
});

/* ================= SCROLL + LOOP TYPING EFFECT ================= */

const typingElement = document.getElementById("typingTitle");
const teamSection = document.getElementById("teamSection");

const texts = [
  "MEET THE SQUAD !!!",
  "WE HACK IDEAS,CRAFT CODES,CONQUER SYSTEMS...",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingStarted = false;

function typeLoop() {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1500);
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  let speed = isDeleting ? 50 : 120;
  setTimeout(typeLoop, speed);
}

window.addEventListener("scroll", function () {
  const sectionTop = teamSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100 && !typingStarted) {
    typingStarted = true;
    typeLoop();
  }
});

/* ================= SCAN SYSTEM ================= */

let safeCount = 0;
let riskCount = 0;
let totalScans = 0;
let lastRiskStatus = "Safe";
let lastRiskLevelPercent = 0;
let currentMeterPercent = 0;

function scanThreat() {
  let input = document.getElementById("urlInput").value;
  let progress = document.getElementById("progressBar");

  progress.style.width = "0%";
  const percentEl = document.getElementById("progressPercent");
  if (percentEl) percentEl.innerText = "0%";

  const analyzingText = document.getElementById("analyzingText");
  if (analyzingText) analyzingText.style.display = "block";
  startLoadingSimulation(function () {
    analyze(input);
  });
}

function analyze(input) {
  totalScans++;

  let suspiciousWords = ["login", "verify", "update", "secure", "account"];
  let risk = false;

  if (input.includes("@") || input.length > 50) {
    risk = true;
  }

  suspiciousWords.forEach((word) => {
    if (input.toLowerCase().includes(word)) {
      risk = true;
    }
  });

  if (risk) {
    riskCount++;
    document.getElementById("result").innerHTML =
      "⚠ HIGH RISK PHISHING DETECTED";
    lastRiskStatus = "Phishing";
    lastRiskLevelPercent = mapStatusToPercent("Phishing");
    addLogEntry(input || "-", "Phishing", lastRiskLevelPercent);
  } else {
    safeCount++;
    document.getElementById("result").innerHTML = "✅ SAFE";
    lastRiskStatus = "Safe";
    lastRiskLevelPercent = mapStatusToPercent("Safe");
    addLogEntry(input || "-", "Safe", lastRiskLevelPercent);
  }

  // document.getElementById("totalScans").innerText = totalScans;
  animateCounter("totalScans", totalScans);
  animateCounter("safeCountDisplay", safeCount);
  animateCounter("riskCountDisplay", riskCount);

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
  updateRiskUI();
  const analyzingText = document.getElementById("analyzingText");
  if (analyzingText) analyzingText.style.display = "none";
}

// loading bar
function startLoadingSimulation(idOrCb, callback) {
  const cb = typeof idOrCb === "function" ? idOrCb : callback;
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  const progressPercent = document.getElementById("progressPercent");
  const meter = document.getElementById("riskMeter");
  const analyzingText = document.getElementById("analyzingText");
  const panel = document.getElementById("analysisPanel");
  if (meter) meter.classList.add("pulsing");
  if (analyzingText) analyzingText.style.display = "block";
  if (panel) panel.classList.add("scanning");

  const steps = [
    "🔐 Logging into secure node...",
    "🌐 Establishing encrypted tunnel...",
    "🛡 Checking phishing signatures...",
    "🧠 Running AI threat engine...",
    "🔄 Rechecking anomalies...",
    "⚡ Almost done...",
    "✅ Scan completed.",
  ];

  let width = 0;
  let index = 0;

  progressBar.style.width = "0%";
  progressText.innerText = "";
  if (progressPercent) progressPercent.innerText = "0%";

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      progressText.innerText = "Scan completed ✔";
      if (progressPercent) progressPercent.innerText = "100%";
      setTimeout(() => {
        if (meter) meter.classList.remove("pulsing");
        if (analyzingText) analyzingText.style.display = "none";
        if (panel) panel.classList.remove("scanning");
        if (typeof cb === "function") cb();
      }, 700);
    } else {
      width += 14;
      progressBar.style.width = width + "%";
      if (progressPercent) progressPercent.innerText = Math.min(width, 100) + "%";

      if (index < steps.length) {
        progressText.innerText = steps[index];
        index++;
      }
    }
  }, 500);
}

// Reusable cyber progress animation for phishing modules
function animateCyberProgress(barId, percentId, onComplete) {
  const bar = document.getElementById(barId);
  const percent = percentId ? document.getElementById(percentId) : null;
  if (!bar) {
    if (typeof onComplete === "function") onComplete();
    return;
  }
  bar.style.width = "0%";
  if (percent) percent.innerText = "0%";
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      if (percent) percent.innerText = "100%";
      if (typeof onComplete === "function") setTimeout(onComplete, 100);
    } else {
      width += 14;
      bar.style.width = width + "%";
      if (percent) percent.innerText = Math.min(width, 100) + "%";
    }
  }, 500);
}

/* ================= CHART ================= */

let chartCtx = document.getElementById("threatChart").getContext("2d");

let threatChart = new Chart(chartCtx, {
  type: "doughnut",
  data: {
    labels: ["Safe", "Risk"],
    datasets: [
      {
        data: [1, 1],
        backgroundColor: ["#00ff99", "#ff0033"],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: { color: "#00ff99" },
      },
    },
  },
});

function updateChart() {
  threatChart.data.datasets[0].data = [safeCount, riskCount];
  threatChart.update();
}

/* ================= RISK UI ================= */
function updateRiskUI(){
  const meter = document.getElementById("riskMeter");
  const meterValue = document.getElementById("meterValue");
  const badge = document.getElementById("riskStatusBadge");
  const detail = document.getElementById("riskStatusDetail");
  const pillPercent = document.getElementById("riskLevelPercent");

  if (meter) {
    const accent = lastRiskStatus === "Phishing" ? "#ff3355" :
                   lastRiskStatus === "Suspicious" ? "#ffd166" : "#00ff99";
    meter.style.setProperty("--accent", accent);
    animateMeterTo(lastRiskLevelPercent, meter, meterValue, pillPercent);
  } else {
    if (meterValue) meterValue.textContent = lastRiskLevelPercent + "%";
    if (pillPercent) pillPercent.textContent = lastRiskLevelPercent + "%";
  }

  if (badge) {
    badge.classList.remove("status-safe","status-suspicious","status-phishing");
    if (lastRiskStatus === "Phishing") {
      badge.textContent = "Phishing";
      badge.classList.add("status-phishing");
      if (detail) detail.textContent = "High risk indicators detected";
    } else if (lastRiskStatus === "Suspicious") {
      badge.textContent = "Suspicious";
      badge.classList.add("status-suspicious");
      if (detail) detail.textContent = "Review recommended";
    } else {
      badge.textContent = "Safe";
      badge.classList.add("status-safe");
      if (detail) detail.textContent = "No active threats";
    }
  }
}

/* ================= Helpers ================= */
function mapStatusToPercent(status, score){
  if (status === "Phishing") {
    const base = typeof score === "number" ? Math.max(score, 85) : 85;
    return Math.min(100, base);
  }
  if (status === "Suspicious") {
    const base = typeof score === "number" ? score : 50;
    return Math.max(40, Math.min(60, base));
  }
  // Safe
  const base = typeof score === "number" ? score : 0;
  return Math.min(10, Math.max(0, base));
}

function addLogEntry(url, status, percent){
  const tbody = document.getElementById("logsBody");
  if (!tbody) return;
  const tr = document.createElement("tr");
  const ts = new Date().toLocaleString();
  const cls = status.toLowerCase();
  tr.className = `new ${cls}`;
  tr.innerHTML = `<td>${escapeHtml(url)}</td><td>${status}</td><td>${percent}%</td><td>${ts}</td>`;
  tbody.prepend(tr);
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
  }[m]));
}
function animateMeterTo(target, meterEl, valueEl, pillEl){
  const start = currentMeterPercent;
  const end = target;
  const duration = 600;
  const startTime = performance.now();
  function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }
  function frame(now){
    const t = Math.min(1, (now - startTime) / duration);
    const eased = start + (end - start) * easeOutCubic(t);
    meterEl.style.setProperty("--risk", eased);
    if (valueEl) valueEl.textContent = Math.round(eased) + "%";
    if (pillEl) pillEl.textContent = Math.round(eased) + "%";
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      currentMeterPercent = end;
    }
  }
  requestAnimationFrame(frame);
}

function animateMeterTo(target, meterEl, valueEl, pillEl){
  const start = currentMeterPercent;
  const end = target;
  const duration = 600;
  const startTime = performance.now();
  function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }
  function frame(now){
    const t = Math.min(1, (now - startTime) / duration);
    const eased = start + (end - start) * easeOutCubic(t);
    meterEl.style.setProperty("--risk", eased);
    if (valueEl) valueEl.textContent = Math.round(eased) + "%";
    if (pillEl) pillEl.textContent = Math.round(eased) + "%";
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      currentMeterPercent = end;
    }
  }
  requestAnimationFrame(frame);
}
// ================= EMAIL PHISHING CARD CLICK =================
document.querySelectorAll(".card").forEach((card) => {
  if (card.textContent.trim() === "Email Phishing") {
    card.addEventListener("click", () => {
      document.getElementById("scanner").style.display = "none";
      document.getElementById("emailScanner").style.display = "block";
    });
  }
});

// Show URL scanner again
window.showUrlScanner = function () {
  document.getElementById("emailScanner").style.display = "none";
  document.getElementById("scanner").style.display = "block";
  document.getElementById("emailProgressBar").style.width = "0%";
  document.getElementById("emailResult").innerHTML = "";
};

// ================= EMAIL ANALYSIS ENGINE =================
function normalizeEmail(addr) {
  const m = String(addr).match(
    /<?([A-Z0-9._%+-]+)@([A-Z0-9.-]+\.[A-Z]{2,})>?/i,
  );
  if (!m) return null;
  return { local: m[1].toLowerCase(), domain: m[2].toLowerCase() };
}

function getBaseDomain(host) {
  if (!host) return null;
  const parts = host.split(".").filter(Boolean);
  if (parts.length <= 2) return host;
  return parts.slice(-2).join(".");
}

function tokenSimilarity(a, b) {
  a = (a || "").toLowerCase();
  b = (b || "").toLowerCase();
  if (!a || !b) return 0;
  if (a === b) return 1;
  const bigrams = (s) => {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
    return set;
  };
  const A = bigrams(a),
    B = bigrams(b);
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

// High‑value brands (same as Node version)
const HIGH_VALUE_BRANDS = [
  "microsoft.com",
  "office.com",
  "live.com",
  "google.com",
  "gmail.com",
  "apple.com",
  "icloud.com",
  "amazon.com",
  "paypal.com",
  "okta.com",
  "duo.com",
];

// ================= SCAN EMAIL =================
function scanEmail() {
  const from = document.getElementById("emailFrom").value;
  const subject = document.getElementById("emailSubject").value;
  const body = document.getElementById("emailBody").value;

  animateCyberProgress("emailProgressBar", "emailProgressPercent", function () {
    const result = analyzeEmailContent(from, subject, body);
    displayEmailResult(result);
  });
}

function analyzeEmailContent(from, subject, body) {
  let score = 0;
  const reasons = [];

  // 1. Parse From
  const fromParsed = normalizeEmail(from);
  if (!fromParsed) {
    score += 15;
    reasons.push("Invalid or missing From address");
  }

  // 2. Domain checks
  if (fromParsed) {
    const fromBase = getBaseDomain(fromParsed.domain);

    // Compare with known brands
    for (const brand of HIGH_VALUE_BRANDS) {
      const brandBase = getBaseDomain(brand);
      const sim = tokenSimilarity(fromBase, brandBase);
      if (sim > 0.55 && fromBase !== brandBase) {
        score += 20;
        reasons.push(
          `From domain looks like ${brandBase} but is actually ${fromBase}`,
        );
        break;
      }
    }

    // Check for suspicious TLDs
    const tld = fromParsed.domain.split(".").pop();
    const suspiciousTLDs = [
      "zip",
      "mov",
      "top",
      "xyz",
      "click",
      "country",
      "kim",
      "gq",
      "tk",
      "cf",
    ];
    if (suspiciousTLDs.includes(tld)) {
      score += 8;
      reasons.push(`From domain uses risky TLD .${tld}`);
    }
  }

  // 3. Urgency keywords in subject/body
  const urgentPatterns = [
    /\burgent\b/i,
    /\bimmediately\b/i,
    /\baction required\b/i,
    /\baccount (?:locked|suspended)\b/i,
    /\bverify\b/i,
    /\breset\b/i,
    /\bsecurity alert\b/i,
    /\bunauthorized\b/i,
  ];
  const urgentHits = urgentPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (urgentHits >= 2) {
    score += 12;
    reasons.push(`Urgency/threat language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 6;
    reasons.push("Some urgency/threat language");
  }

  // 4. Credential‑related keywords
  const credPatterns = [
    /\bpassword\b/i,
    /\bpasscode\b/i,
    /\bOTP\b/i,
    /\b2fa\b/i,
    /\bmfa\b/i,
    /\blog\s*in\b/i,
    /\bsign\s*in\b/i,
    /\bverify (?:your )?identity\b/i,
  ];
  const credHits = credPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (credHits >= 2) {
    score += 18;
    reasons.push(`Credential/OTP language (${credHits} indicators)`);
  } else if (credHits === 1) {
    score += 10;
    reasons.push("Possible credential/OTP language");
  }

  // 5. Payment/invoice keywords
  const payPatterns = [
    /\binvoice\b/i,
    /\bwire\b/i,
    /\bACH\b/i,
    /\bpayment\b/i,
    /\bgift card\b/i,
    /\bcrypto\b/i,
  ];
  const payHits = payPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (payHits >= 2) {
    score += 10;
    reasons.push(`Payment/invoice lure (${payHits} indicators)`);
  } else if (payHits === 1) {
    score += 5;
    reasons.push("Possible payment/invoice lure");
  }

  // 6. Extract URLs from body and check them
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length >= 3) score += 5;

  for (const u of urls) {
    try {
      const url = new URL(u);
      const host = url.hostname.toLowerCase();
      const base = getBaseDomain(host);
      if (fromParsed && base && getBaseDomain(fromParsed.domain) !== base) {
        score += 6;
        reasons.push(`Link domain (${base}) differs from sender domain`);
        break; // one is enough
      }
    } catch (e) {}
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Determine label
  let label, safeInc, riskInc;
  if (score >= 50) {
    label = "⚠ HIGH RISK – Phishing Indicators Found";
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 20) {
    label = "⚠ SUSPICIOUS – Review Carefully";
    riskInc = 1; // treat as risky for dashboard simplicity
    safeInc = 0;
  } else {
    label = "✅ SAFE – No obvious signs";
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayEmailResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  animateCounter("totalScans", totalScans);
  animateCounter("safeCountDisplay", safeCount);
  animateCounter("riskCountDisplay", riskCount);

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
  lastRiskStatus =
    result.label.includes("HIGH RISK") ? "Phishing" :
    result.label.includes("SUSPICIOUS") ? "Suspicious" : "Safe";
  lastRiskLevelPercent = mapStatusToPercent(lastRiskStatus, result.score);
  updateRiskUI();

  // Show result message
  const resultEl = document.getElementById("emailResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
  addLogEntry("email://"+(normalizeEmail(document.getElementById("emailFrom").value)?.domain || "-"), lastRiskStatus, lastRiskLevelPercent);
}

// ================= SPEAR PHISHING CARD CLICK =================
document.querySelectorAll(".card").forEach((card) => {
  if (card.textContent.trim() === "Spear Phishing") {
    card.addEventListener("click", () => {
      document.getElementById("scanner").style.display = "none";
      document.getElementById("emailScanner").style.display = "none";
      document.getElementById("spearScanner").style.display = "block";
    });
  }
});

// Extend showUrlScanner to also hide spear scanner
const originalShowUrlScanner = window.showUrlScanner;
window.showUrlScanner = function () {
  document.getElementById("emailScanner").style.display = "none";
  document.getElementById("spearScanner").style.display = "none";
  document.getElementById("scanner").style.display = "block";
  document.getElementById("emailProgressBar").style.width = "0%";
  document.getElementById("spearProgressBar").style.width = "0%";
  document.getElementById("emailResult").innerHTML = "";
  document.getElementById("spearResult").innerHTML = "";
};

// ================= SPEAR PHISHING SCAN =================
function scanSpear() {
  const from = document.getElementById("spearFrom").value;
  const to = document.getElementById("spearTo").value;
  const recipientName = document
    .getElementById("spearName")
    .value.trim()
    .toLowerCase();
  const subject = document.getElementById("spearSubject").value;
  const body = document.getElementById("spearBody").value;

  animateCyberProgress("spearProgressBar", "spearProgressPercent", function () {
    const result = analyzeSpearContent(from, to, recipientName, subject, body);
    displaySpearResult(result);
  });
}

function analyzeSpearContent(from, to, recipientName, subject, body) {
  let score = 0;
  const reasons = [];

  // 1. Parse sender
  const fromParsed = normalizeEmail(from);
  if (!fromParsed) {
    score += 15;
    reasons.push("Invalid or missing From address");
  }

  // 2. Check if sender domain is suspicious (same as email scanner)
  if (fromParsed) {
    const fromBase = getBaseDomain(fromParsed.domain);
    for (const brand of HIGH_VALUE_BRANDS) {
      const brandBase = getBaseDomain(brand);
      const sim = tokenSimilarity(fromBase, brandBase);
      if (sim > 0.55 && fromBase !== brandBase) {
        score += 20;
        reasons.push(
          `From domain looks like ${brandBase} but is actually ${fromBase}`,
        );
        break;
      }
    }

    const tld = fromParsed.domain.split(".").pop();
    const suspiciousTLDs = [
      "zip",
      "mov",
      "top",
      "xyz",
      "click",
      "country",
      "kim",
      "gq",
      "tk",
      "cf",
    ];
    if (suspiciousTLDs.includes(tld)) {
      score += 8;
      reasons.push(`From domain uses risky TLD .${tld}`);
    }
  }

  // 3. Check for personalization (key for spear phishing)
  const fullText = (subject + " " + body).toLowerCase();
  if (recipientName && fullText.includes(recipientName)) {
    // Personalization present – less risky
    reasons.push("Email includes recipient’s name (good)");
  } else {
    // No personalization – could still be spear if other signs exist, but we flag it
    score += 10;
    reasons.push(
      "Email does not contain recipient’s name (lack of personalization)",
    );
  }

  // Check for personalized greeting patterns
  const greetingPatterns = [
    new RegExp(`\\bdear\\s+${recipientName}\\b`, "i"),
    new RegExp(`\\bhi\\s+${recipientName}\\b`, "i"),
    new RegExp(`\\bhello\\s+${recipientName}\\b`, "i"),
  ];
  let hasGreeting = false;
  for (const pat of greetingPatterns) {
    if (pat.test(fullText)) {
      hasGreeting = true;
      break;
    }
  }
  if (!hasGreeting && recipientName) {
    // No greeting with name, suspicious if other signs present
    score += 5;
    reasons.push("No personalized greeting found");
  }

  // 4. Urgency keywords (same as email scanner)
  const urgentPatterns = [
    /\burgent\b/i,
    /\bimmediately\b/i,
    /\baction required\b/i,
    /\baccount (?:locked|suspended)\b/i,
    /\bverify\b/i,
    /\breset\b/i,
    /\bsecurity alert\b/i,
    /\bunauthorized\b/i,
  ];
  const urgentHits = urgentPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (urgentHits >= 2) {
    score += 12;
    reasons.push(`Urgency/threat language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 6;
    reasons.push("Some urgency/threat language");
  }

  // 5. Credential keywords
  const credPatterns = [
    /\bpassword\b/i,
    /\bpasscode\b/i,
    /\bOTP\b/i,
    /\b2fa\b/i,
    /\bmfa\b/i,
    /\blog\s*in\b/i,
    /\bsign\s*in\b/i,
    /\bverify (?:your )?identity\b/i,
  ];
  const credHits = credPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (credHits >= 2) {
    score += 18;
    reasons.push(`Credential/OTP language (${credHits} indicators)`);
  } else if (credHits === 1) {
    score += 10;
    reasons.push("Possible credential/OTP language");
  }

  // 6. Payment/invoice keywords
  const payPatterns = [
    /\binvoice\b/i,
    /\bwire\b/i,
    /\bACH\b/i,
    /\bpayment\b/i,
    /\bgift card\b/i,
    /\bcrypto\b/i,
  ];
  const payHits = payPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (payHits >= 2) {
    score += 10;
    reasons.push(`Payment/invoice lure (${payHits} indicators)`);
  } else if (payHits === 1) {
    score += 5;
    reasons.push("Possible payment/invoice lure");
  }

  // 7. Check for internal vs external (if to domain matches org – we don't have orgDomains list, so skip)

  // 8. Extract URLs and check mismatch (similar to email scanner)
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length >= 3) score += 5;

  for (const u of urls) {
    try {
      const url = new URL(u);
      const host = url.hostname.toLowerCase();
      const base = getBaseDomain(host);
      if (fromParsed && base && getBaseDomain(fromParsed.domain) !== base) {
        score += 6;
        reasons.push(`Link domain (${base}) differs from sender domain`);
        break;
      }
    } catch (e) {}
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Determine label (thresholds may differ for spear)
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = "⚠ HIGH RISK – Spear Phishing Indicators Strong";
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = "⚠ SUSPICIOUS – Targeted Email? Review Carefully";
    riskInc = 1;
    safeInc = 0;
  } else {
    label = "✅ SAFE – Low Risk of Spear Phishing";
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displaySpearResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  animateCounter("totalScans", totalScans);
  animateCounter("safeCountDisplay", safeCount);
  animateCounter("riskCountDisplay", riskCount);

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
  lastRiskStatus =
    result.label.includes("HIGH RISK") ? "Phishing" :
    result.label.includes("SUSPICIOUS") ? "Suspicious" : "Safe";
  lastRiskLevelPercent = mapStatusToPercent(lastRiskStatus, result.score);
  updateRiskUI();

  // Show result message
  const resultEl = document.getElementById("spearResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
  addLogEntry("email://"+(normalizeEmail(document.getElementById("spearFrom").value)?.domain || "-"), lastRiskStatus, lastRiskLevelPercent);
}

// ================= WHALING CARD CLICK =================
document.querySelectorAll(".card").forEach((card) => {
  if (card.textContent.trim() === "Whaling") {
    card.addEventListener("click", () => {
      document.getElementById("scanner").style.display = "none";
      document.getElementById("emailScanner").style.display = "none";
      document.getElementById("spearScanner").style.display = "none";
      document.getElementById("whalingScanner").style.display = "block";
    });
  }
});

// Extend showUrlScanner to also hide whaling scanner
const originalShowUrlScanner1 = window.showUrlScanner;
window.showUrlScanner = function () {
  document.getElementById("emailScanner").style.display = "none";
  document.getElementById("spearScanner").style.display = "none";
  document.getElementById("whalingScanner").style.display = "none";
  document.getElementById("scanner").style.display = "block";
  document.getElementById("emailProgressBar").style.width = "0%";
  document.getElementById("spearProgressBar").style.width = "0%";
  document.getElementById("whaleProgressBar").style.width = "0%";
  document.getElementById("emailResult").innerHTML = "";
  document.getElementById("spearResult").innerHTML = "";
  document.getElementById("whaleResult").innerHTML = "";
};

// ================= WHALING SCAN =================
function scanWhaling() {
  const from = document.getElementById("whaleFrom").value;
  const to = document.getElementById("whaleTo").value;
  const targetName = document
    .getElementById("whaleTargetName")
    .value.trim()
    .toLowerCase();
  const targetRole = document
    .getElementById("whaleTargetRole")
    .value.trim()
    .toLowerCase();
  const subject = document.getElementById("whaleSubject").value;
  const body = document.getElementById("whaleBody").value;

  animateCyberProgress("whaleProgressBar", "whaleProgressPercent", function () {
    const result = analyzeWhalingContent(
      from,
      to,
      targetName,
      targetRole,
      subject,
      body,
    );
    displayWhalingResult(result);
  });
}

function analyzeWhalingContent(
  from,
  to,
  targetName,
  targetRole,
  subject,
  body,
) {
  let score = 0;
  const reasons = [];

  // 1. Parse sender
  const fromParsed = normalizeEmail(from);
  if (!fromParsed) {
    score += 15;
    reasons.push("Invalid or missing From address");
  }

  // 2. Sender domain checks (same as before)
  if (fromParsed) {
    const fromBase = getBaseDomain(fromParsed.domain);
    for (const brand of HIGH_VALUE_BRANDS) {
      const brandBase = getBaseDomain(brand);
      const sim = tokenSimilarity(fromBase, brandBase);
      if (sim > 0.55 && fromBase !== brandBase) {
        score += 20;
        reasons.push(
          `From domain looks like ${brandBase} but is actually ${fromBase}`,
        );
        break;
      }
    }

    const tld = fromParsed.domain.split(".").pop();
    const suspiciousTLDs = [
      "zip",
      "mov",
      "top",
      "xyz",
      "click",
      "country",
      "kim",
      "gq",
      "tk",
      "cf",
    ];
    if (suspiciousTLDs.includes(tld)) {
      score += 8;
      reasons.push(`From domain uses risky TLD .${tld}`);
    }
  }

  // 3. Check if sender is impersonating an internal executive
  //    We don't have an org domain list, but we can check if sender domain matches recipient domain
  const toParsed = normalizeEmail(to);
  if (fromParsed && toParsed) {
    const fromBase = getBaseDomain(fromParsed.domain);
    const toBase = getBaseDomain(toParsed.domain);
    if (fromBase !== toBase) {
      score += 15;
      reasons.push(
        `Sender domain (${fromBase}) differs from recipient domain (${toBase}) – external sender`,
      );
    } else {
      // Internal, but might be impersonating a C-level
      // We'll add points if the display name or local part suggests executive
    }
  }

  // 4. Executive role in subject/body
  const fullText = (subject + " " + body).toLowerCase();
  const executiveRoles = [
    "ceo",
    "cfo",
    "cto",
    "coo",
    "president",
    "director",
    "executive",
    "vp",
    "vice president",
  ];
  const roleHits = executiveRoles.filter((r) => fullText.includes(r)).length;
  if (roleHits > 0) {
    score += 10;
    reasons.push(
      `Executive role mentioned (${roleHits} times) – could be targeting authority`,
    );
  }

  // 5. Check if target's name is in the email (personalization)
  if (targetName && fullText.includes(targetName)) {
    // Personalized – could be legit or carefully crafted
    reasons.push("Email contains target’s name");
  } else if (targetName) {
    score += 8;
    reasons.push(
      "Email does not contain target’s name (lack of personalization for executive)",
    );
  }

  // 6. Check if target's role is in the email
  if (targetRole && fullText.includes(targetRole)) {
    reasons.push("Email mentions target’s role");
  } else if (targetRole) {
    score += 6;
    reasons.push(
      "Email does not mention target’s role (missed opportunity for personalization)",
    );
  }

  // 7. Urgency / authority language (whaling often uses urgent directives)
  const urgentPatterns = [
    /\burgent\b/i,
    /\bimmediately\b/i,
    /\baction required\b/i,
    /\bcomply\b/i,
    /\bmandatory\b/i,
    /\bdeadline\b/i,
    /\bconfidential\b/i,
  ];
  const urgentHits = urgentPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (urgentHits >= 2) {
    score += 12;
    reasons.push(`Urgency/authority language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 6;
    reasons.push("Some urgency/authority language");
  }

  // 8. Credential keywords (often present in whaling)
  const credPatterns = [
    /\bpassword\b/i,
    /\bwire\b/i,
    /\btransfer\b/i,
    /\bpayment\b/i,
    /\bconfidential\b/i,
    /\bsecret\b/i,
    /\bproprietary\b/i,
  ];
  const credHits = credPatterns.filter(
    (r) => r.test(subject) || r.test(body),
  ).length;
  if (credHits >= 2) {
    score += 15;
    reasons.push(`Sensitive keywords (${credHits} indicators)`);
  } else if (credHits === 1) {
    score += 8;
    reasons.push("Possible sensitive content");
  }

  // 9. Attachments (though we don't have file input, we can check for attachment mentions)
  if (/\battach\b/i.test(fullText) || /\battachment\b/i.test(fullText)) {
    score += 5;
    reasons.push("Email mentions an attachment (common in whaling)");
  }

  // 10. URL checks (same as before)
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length >= 3) score += 5;

  for (const u of urls) {
    try {
      const url = new URL(u);
      const host = url.hostname.toLowerCase();
      const base = getBaseDomain(host);
      if (fromParsed && base && getBaseDomain(fromParsed.domain) !== base) {
        score += 6;
        reasons.push(`Link domain (${base}) differs from sender domain`);
        break;
      }
    } catch (e) {}
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds (higher due to executive focus)
  let label, safeInc, riskInc;
  if (score >= 65) {
    label = "⚠ HIGH RISK – Whaling Indicators Strong";
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 35) {
    label = "⚠ SUSPICIOUS – Potential Executive Targeting";
    riskInc = 1;
    safeInc = 0;
  } else {
    label = "✅ SAFE – Low Risk of Whaling";
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayWhalingResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  animateCounter("totalScans", totalScans);
  animateCounter("safeCountDisplay", safeCount);
  animateCounter("riskCountDisplay", riskCount);

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
  lastRiskStatus =
    result.label.includes("HIGH RISK") ? "Phishing" :
    result.label.includes("SUSPICIOUS") ? "Suspicious" : "Safe";
  lastRiskLevelPercent = mapStatusToPercent(lastRiskStatus, result.score);
  updateRiskUI();

  // Show result message
  const resultEl = document.getElementById("whaleResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
  addLogEntry("email://"+(normalizeEmail(document.getElementById("whaleFrom").value)?.domain || "-"), lastRiskStatus, lastRiskLevelPercent);
}

// ================= SMISHING CARD CLICK =================
document.querySelectorAll(".card").forEach((card) => {
  if (card.textContent.trim() === "Smishing") {
    card.addEventListener("click", () => {
      document.getElementById("scanner").style.display = "none";
      document.getElementById("emailScanner").style.display = "none";
      document.getElementById("spearScanner").style.display = "none";
      document.getElementById("whalingScanner").style.display = "none";
      document.getElementById("smishingScanner").style.display = "block";
    });
  }
});

// Extend showUrlScanner to also hide smishing scanner
window.showUrlScanner = function () {
  document.getElementById("emailScanner").style.display = "none";
  document.getElementById("spearScanner").style.display = "none";
  document.getElementById("whalingScanner").style.display = "none";
  document.getElementById("smishingScanner").style.display = "none";
  document.getElementById("scanner").style.display = "block";
  document.getElementById("emailProgressBar").style.width = "0%";
  document.getElementById("spearProgressBar").style.width = "0%";
  document.getElementById("whaleProgressBar").style.width = "0%";
  document.getElementById("smsProgressBar").style.width = "0%";
  document.getElementById("emailResult").innerHTML = "";
  document.getElementById("spearResult").innerHTML = "";
  document.getElementById("whaleResult").innerHTML = "";
  document.getElementById("smsResult").innerHTML = "";
};

// ================= SMISHING SCAN =================
function scanSmishing() {
  const sender = document.getElementById("smsSender").value;
  const recipient = document.getElementById("smsRecipient").value;
  const body = document.getElementById("smsBody").value;

  animateCyberProgress("smsProgressBar", "smsProgressPercent", function () {
    const result = analyzeSmishingContent(sender, recipient, body);
    displaySmishingResult(result);
  });
}

function analyzeSmishingContent(sender, recipient, body) {
  let score = 0;
  const reasons = [];
  const fullText = body.toLowerCase();

  // 1. Check for suspicious sender patterns
  if (sender) {
    // If sender is a short code or generic name (e.g., "Bank", "Amazon"), flag it
    const genericNames = [
      "bank",
      "amazon",
      "paypal",
      "apple",
      "google",
      "microsoft",
      "netflix",
      "irs",
    ];
    const isGeneric = genericNames.some((name) =>
      sender.toLowerCase().includes(name),
    );
    if (isGeneric) {
      score += 10;
      reasons.push("Sender uses a generic brand name (common in smishing)");
    }

    // Check if sender is a phone number (simple regex: contains digits, no @)
    const isPhoneNumber =
      /^[\d\+\-\(\)\s]+$/.test(sender.replace(/[^0-9+]/g, "")) &&
      sender.replace(/[^0-9]/g, "").length >= 10;
    if (!isPhoneNumber && !isGeneric) {
      // Possibly an alphanumeric sender ID – could be legit but less common
      score += 5;
      reasons.push("Sender is not a standard phone number (could be spoofed)");
    }
  } else {
    score += 5;
    reasons.push("No sender information provided");
  }

  // 2. Check for urgency keywords (common in smishing)
  const urgentPatterns = [
    /\burgent\b/i,
    /\bimmediately\b/i,
    /\baction required\b/i,
    /\blocked\b/i,
    /\bsuspended\b/i,
    /\bverify\b/i,
    /\bconfirm\b/i,
    /\bclaim\b/i,
    /\bprize\b/i,
    /\bwon\b/i,
    /\bgift\b/i,
  ];
  const urgentHits = urgentPatterns.filter((r) => r.test(body)).length;
  if (urgentHits >= 2) {
    score += 12;
    reasons.push(`Urgency/scarcity language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 6;
    reasons.push("Some urgency/scarcity language");
  }

  // 3. Check for links (URLs) – smishing almost always includes a link
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length > 0) {
    score += 10;
    reasons.push("Message contains a link (common in smishing)");

    // Check for URL shorteners (very suspicious in SMS)
    const shorteners = [
      "bit.ly",
      "tinyurl.com",
      "t.co",
      "goo.gl",
      "rebrand.ly",
      "ow.ly",
      "is.gd",
      "buff.ly",
      "cutt.ly",
      "shorturl.at",
    ];
    for (const u of urls) {
      try {
        const url = new URL(u);
        const host = url.hostname.toLowerCase();
        if (shorteners.some((s) => host.includes(s))) {
          score += 12;
          reasons.push(
            `Link uses URL shortener (${host}) – highly suspicious in SMS`,
          );
          break;
        }
      } catch (e) {}
    }
  } else {
    // No links – less likely smishing, but could still be a scam
    score -= 5; // reduce score slightly
    reasons.push("No links in message (less typical for smishing)");
  }

  // 4. Check for requests for personal info (passwords, SSN, etc.)
  const sensitivePatterns = [
    /\bpassword\b/i,
    /\bssn\b/i,
    /\bsocial security\b/i,
    /\bcredit card\b/i,
    /\bpin\b/i,
    /\baccount number\b/i,
    /\bverify your identity\b/i,
    /\bupdate your information\b/i,
    /\bclick here\b/i,
  ];
  const sensitiveHits = sensitivePatterns.filter((r) => r.test(body)).length;
  if (sensitiveHits >= 2) {
    score += 15;
    reasons.push(
      `Requests sensitive information (${sensitiveHits} indicators)`,
    );
  } else if (sensitiveHits === 1) {
    score += 8;
    reasons.push("Possible request for sensitive information");
  }

  // 5. Check for misspellings or odd grammar (common in smishing)
  const misspellingPatterns = [
    /\baccout\b/i,
    /\bverifiy\b/i,
    /\bconfrim\b/i,
    /\brecieve\b/i,
    /\bpaypal\b(?![a-z])/i,
    /\bamazon\b(?![a-z])/i, // legitimate brand names but could be used in smishing
  ];
  const misspellHits = misspellingPatterns.filter((r) => r.test(body)).length;
  if (misspellHits > 0) {
    score += 8;
    reasons.push("Possible misspellings or odd phrasing");
  }

  // 6. Check if sender appears to be a known brand but has slight variation
  //    We don't have a full list, but we can check for common brand names in the sender field
  const brandNames = [
    "paypal",
    "amazon",
    "apple",
    "google",
    "microsoft",
    "netflix",
    "bank",
    "irs",
  ];
  const senderLower = (sender || "").toLowerCase();
  for (const brand of brandNames) {
    if (
      senderLower.includes(brand) &&
      !senderLower.endsWith(".com") &&
      senderLower !== brand
    ) {
      // e.g., "Paypa1", "Amaz0n"
      score += 15;
      reasons.push(`Sender impersonates "${brand}" with a variation`);
      break;
    }
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds for smishing
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = "⚠ HIGH RISK – Smishing Indicators Strong";
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = "⚠ SUSPICIOUS – Potential SMS Scam";
    riskInc = 1;
    safeInc = 0;
  } else {
    label = "✅ SAFE – Low Risk of Smishing";
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displaySmishingResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  animateCounter("totalScans", totalScans);
  animateCounter("safeCountDisplay", safeCount);
  animateCounter("riskCountDisplay", riskCount);

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
  lastRiskStatus =
    result.label.includes("HIGH RISK") ? "Phishing" :
    result.label.includes("SUSPICIOUS") ? "Suspicious" : "Safe";
  lastRiskLevelPercent = mapStatusToPercent(lastRiskStatus, result.score);
  updateRiskUI();

  // Show result message
  const resultEl = document.getElementById("smsResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
  addLogEntry("sms://"+(document.getElementById("smsSender").value || "-"), lastRiskStatus, lastRiskLevelPercent);
}

// ================= VISHING CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'Vishing') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide vishing scanner
const originalShowUrlScanner2 = window.showUrlScanner; // preserve previous if any
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
};

// ================= VISHING SCAN =================
function scanVishing() {
  const callerId = document.getElementById('vishCallerId').value;
  const claimedIdentity = document.getElementById('vishClaimedIdentity').value;
  const callPurpose = document.getElementById('vishCallPurpose').value;
  const details = document.getElementById('vishDetails').value;

  animateCyberProgress('vishProgressBar', 'vishProgressPercent', function () {
    const result = analyzeVishingContent(callerId, claimedIdentity, callPurpose, details);
    displayVishingResult(result);
  });
}

function analyzeVishingContent(callerId, claimedIdentity, callPurpose, details) {
  let score = 0;
  const reasons = [];
  const fullText = (callPurpose + ' ' + details).toLowerCase();

  // 1. Check for suspicious caller ID (spoofed, international, hidden)
  if (callerId) {
    const hasInternationalPrefix = /^\+|^00/.test(callerId);
    if (hasInternationalPrefix) {
      score += 10;
      reasons.push('Caller ID shows international prefix (common in vishing)');
    }
    if (/unknown|blocked|private|restricted/i.test(callerId)) {
      score += 12;
      reasons.push('Caller ID is hidden/spoofed');
    }
  } else {
    score += 5;
    reasons.push('No caller ID provided');
  }

  // 2. Check for impersonation of authority
  const authorityList = [
    'irs', 'tax', 'social security', 'ssa', 'fbi', 'police', 'sheriff',
    'bank', 'credit union', 'paypal', 'amazon', 'apple', 'microsoft',
    'utility', 'electric company', 'water company', 'tech support'
  ];
  const claimedLower = (claimedIdentity || '').toLowerCase();
  let impersonated = false;
  for (const auth of authorityList) {
    if (claimedLower.includes(auth)) {
      impersonated = true;
      score += 15;
      reasons.push(`Caller claims to be from ${auth} – high impersonation risk`);
      break;
    }
  }
  if (!impersonated && claimedIdentity) {
    score += 5;
    reasons.push('Caller claims an identity but not a recognized authority');
  }

  // 3. Check for urgency/threats
  const urgencyPatterns = [
    /\burgent\b/i, /\bimmediately\b/i, /\baction required\b/i,
    /\barrest\b/i, /\bwarrant\b/i, /\blawsuit\b/i, /\bsue\b/i,
    /\bdisconnect\b/i, /\bshut off\b/i, /\bterminate\b/i,
    /\byour account.*suspended\b/i, /\byour computer.*virus\b/i
  ];
  const urgencyHits = urgencyPatterns.filter(r => r.test(fullText)).length;
  if (urgencyHits >= 2) {
    score += 15;
    reasons.push(`Urgency/threat language (${urgencyHits} indicators)`);
  } else if (urgencyHits === 1) {
    score += 7;
    reasons.push('Some urgency/threat language');
  }

  // 4. Check for requests for sensitive information
  const sensitivePatterns = [
    /\bsocial security\b/i, /\bssn\b/i, /\bcredit card\b/i,
    /\bbank account\b/i, /\brouting number\b/i, /\bpin\b/i,
    /\bpassword\b/i, /\bverify your identity\b/i, /\bconfirm your details\b/i,
    /\bgift card\b/i, /\bitunes card\b/i, /\bgoogle play card\b/i
  ];
  const sensitiveHits = sensitivePatterns.filter(r => r.test(fullText)).length;
  if (sensitiveHits >= 2) {
    score += 20;
    reasons.push(`Requests sensitive information (${sensitiveHits} indicators)`);
  } else if (sensitiveHits === 1) {
    score += 10;
    reasons.push('Possible request for sensitive information');
  }

  // 5. Check for payment demands
  const paymentPatterns = [
    /\bpay\b/i, /\bwire\b/i, /\btransfer\b/i, /\bmoney\b/i,
    /\bfine\b/i, /\bfee\b/i, /\btax\b/i, /\bbill\b/i,
    /\bitunes card\b/i, /\bgoogle play card\b/i, /\bgift card\b/i
  ];
  const paymentHits = paymentPatterns.filter(r => r.test(fullText)).length;
  if (paymentHits >= 2) {
    score += 15;
    reasons.push(`Payment demands (${paymentHits} indicators)`);
  } else if (paymentHits === 1) {
    score += 7;
    reasons.push('Possible payment demand');
  }

  // 6. Check for common vishing lures in call purpose
  const commonLures = [
    'suspended', 'locked', 'compromised', 'fraud', 'virus', 'infected',
    'refund', 'prize', 'won', 'lottery', 'inheritance', 'relative in trouble'
  ];
  const purposeLower = (callPurpose || '').toLowerCase();
  for (const lure of commonLures) {
    if (purposeLower.includes(lure)) {
      score += 8;
      reasons.push(`Call purpose "${lure}" is a common vishing lure`);
      break;
    }
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds for vishing
  let label, safeInc, riskInc;
  if (score >= 65) {
    label = '⚠ HIGH RISK – Vishing Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 35) {
    label = '⚠ SUSPICIOUS – Potential Voice Scam';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of Vishing';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayVishingResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('vishResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

// ================= CLONE PHISHING CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'Clone Phishing') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'none';
      document.getElementById('cloneScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide clone scanner
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('cloneScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('cloneProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
  document.getElementById('cloneResult').innerHTML = '';
};

// ================= CLONE PHISHING SCAN =================
function scanClone() {
  const from = document.getElementById('cloneFrom').value;
  const subject = document.getElementById('cloneSubject').value;
  const body = document.getElementById('cloneBody').value;

  animateCyberProgress('cloneProgressBar', 'cloneProgressPercent', function () {
    const result = analyzeCloneContent(from, subject, body);
    displayCloneResult(result);
  });
}

function analyzeCloneContent(from, subject, body) {
  let score = 0;
  const reasons = [];
  const fullText = (subject + ' ' + body).toLowerCase();

  // 1. Parse sender (same as before)
  const fromParsed = normalizeEmail(from);
  if (!fromParsed) {
    score += 15;
    reasons.push('Invalid or missing From address');
  } else {
    // Brand impersonation
    const fromBase = getBaseDomain(fromParsed.domain);
    for (const brand of HIGH_VALUE_BRANDS) {
      const brandBase = getBaseDomain(brand);
      const sim = tokenSimilarity(fromBase, brandBase);
      if (sim > 0.55 && fromBase !== brandBase) {
        score += 20;
        reasons.push(`From domain looks like ${brandBase} but is actually ${fromBase}`);
        break;
      }
    }
    // Suspicious TLD
    const tld = fromParsed.domain.split('.').pop();
    const suspiciousTLDs = ['zip', 'mov', 'top', 'xyz', 'click', 'country', 'kim', 'gq', 'tk', 'cf'];
    if (suspiciousTLDs.includes(tld)) {
      score += 8;
      reasons.push(`From domain uses risky TLD .${tld}`);
    }
  }

  // 2. Check for reply/forward indicators (key for clone phishing)
  const replyIndicators = [
    /^re:/i, /^fwd:/i, /^fw:/i,            // subject prefixes
    />.*wrote:/i,                           // quoted text marker
    /on.*wrote:/i,                           // "On [date] wrote:"
    /---original message---/i,
    /from:.*sent:/i
  ];
  let replyHits = 0;
  for (const pattern of replyIndicators) {
    if (pattern.test(subject) || pattern.test(body)) {
      replyHits++;
    }
  }
  if (replyHits >= 1) {
    score += 15;
    reasons.push('Email contains reply/forward indicators (common in clone phishing)');
  } else {
    // No reply indicators – less likely clone, but still possible
    reasons.push('No obvious reply/forward markers');
  }

  // 3. Check for presence of links (cloned emails often replace original links with malicious ones)
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length > 0) {
    score += 10;
    reasons.push(`Email contains ${urls.length} link(s) – verify they are legitimate`);

    // Check for mismatched domains vs sender
    for (const u of urls) {
      try {
        const url = new URL(u);
        const host = url.hostname.toLowerCase();
        const base = getBaseDomain(host);
        if (fromParsed && base && getBaseDomain(fromParsed.domain) !== base) {
          score += 8;
          reasons.push(`Link domain (${base}) differs from sender domain`);
          break;
        }
      } catch (e) {}
    }
  } else {
    reasons.push('No links found – less typical for clone phishing');
  }

  // 4. Check for attachment mentions
  if (/\battach\b/i.test(fullText) || /\battachment\b/i.test(fullText)) {
    score += 8;
    reasons.push('Email mentions an attachment – could be malicious');
  }

  // 5. Urgency keywords (common in phishing)
  const urgentPatterns = [
    /\burgent\b/i, /\bimmediately\b/i, /\baction required\b/i,
    /\bverify\b/i, /\bupdate\b/i, /\bsecurity\b/i
  ];
  const urgentHits = urgentPatterns.filter(r => r.test(fullText)).length;
  if (urgentHits >= 2) {
    score += 10;
    reasons.push(`Urgency language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 5;
    reasons.push('Some urgency language');
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds for clone phishing
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = '⚠ HIGH RISK – Clone Phishing Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = '⚠ SUSPICIOUS – Potential Clone Email';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of Clone Phishing';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayCloneResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('cloneResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

// ================= QUISHING CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'Quishing') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'none';
      document.getElementById('cloneScanner').style.display = 'none';
      document.getElementById('quishingScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide quishing scanner
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('cloneScanner').style.display = 'none';
  document.getElementById('quishingScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('cloneProgressBar').style.width = '0%';
  document.getElementById('quishProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
  document.getElementById('cloneResult').innerHTML = '';
  document.getElementById('quishResult').innerHTML = '';
};

// ================= QUISHING SCAN =================
function scanQuishing() {
  const from = document.getElementById('quishFrom').value;
  const subject = document.getElementById('quishSubject').value;
  const body = document.getElementById('quishBody').value;

  animateCyberProgress('quishProgressBar', 'quishProgressPercent', function () {
    const result = analyzeQuishingContent(from, subject, body);
    displayQuishingResult(result);
  });
}

function analyzeQuishingContent(from, subject, body) {
  let score = 0;
  const reasons = [];
  const fullText = (subject + ' ' + body).toLowerCase();

  // 1. QR code references (key indicator)
  const qrPatterns = [
    /\bqr\b/i,
    /\bqr code\b/i,
    /\bscan\s*(?:the\s*)?code\b/i,
    /\bscan\s*(?:the\s*)?qr\b/i,
    /\buse your camera\b/i,
    /\bscan to\b/i
  ];
  const qrHits = qrPatterns.filter(p => p.test(fullText)).length;
  if (qrHits >= 2) {
    score += 25;
    reasons.push(`Multiple QR code references (${qrHits} indicators) – high quishing risk`);
  } else if (qrHits === 1) {
    score += 15;
    reasons.push('Contains QR code reference – verify the source');
  }

  // 2. Check for links (QR codes often lead to malicious URLs)
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = body.match(urlRegex) || [];
  if (urls.length > 0) {
    score += 10;
    reasons.push(`Contains ${urls.length} link(s) – could be behind QR`);

    // Check for URL shorteners (common in quishing)
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'rebrand.ly', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'shorturl.at'];
    for (const u of urls) {
      try {
        const url = new URL(u);
        const host = url.hostname.toLowerCase();
        if (shorteners.some(s => host.includes(s))) {
          score += 12;
          reasons.push(`Link uses URL shortener (${host}) – hides destination`);
          break;
        }
      } catch (e) {}
    }
  }

  // 3. Sender analysis (impersonation)
  const fromParsed = normalizeEmail(from);
  if (!fromParsed) {
    score += 15;
    reasons.push('Invalid or missing From address');
  } else {
    const fromBase = getBaseDomain(fromParsed.domain);
    // Brand impersonation
    for (const brand of HIGH_VALUE_BRANDS) {
      const brandBase = getBaseDomain(brand);
      const sim = tokenSimilarity(fromBase, brandBase);
      if (sim > 0.55 && fromBase !== brandBase) {
        score += 20;
        reasons.push(`From domain looks like ${brandBase} but is actually ${fromBase}`);
        break;
      }
    }
    // Suspicious TLD
    const tld = fromParsed.domain.split('.').pop();
    const suspiciousTLDs = ['zip', 'mov', 'top', 'xyz', 'click', 'country', 'kim', 'gq', 'tk', 'cf'];
    if (suspiciousTLDs.includes(tld)) {
      score += 8;
      reasons.push(`From domain uses risky TLD .${tld}`);
    }
  }

  // 4. Urgency keywords
  const urgentPatterns = [
    /\burgent\b/i, /\bimmediately\b/i, /\baction required\b/i,
    /\bverify\b/i, /\bupdate\b/i, /\bsecurity alert\b/i
  ];
  const urgentHits = urgentPatterns.filter(r => r.test(fullText)).length;
  if (urgentHits >= 2) {
    score += 12;
    reasons.push(`Urgency language (${urgentHits} indicators)`);
  } else if (urgentHits === 1) {
    score += 6;
    reasons.push('Some urgency language');
  }

  // 5. Payment/invoice keywords
  const payPatterns = [
    /\binvoice\b/i, /\bpayment\b/i, /\bwire\b/i, /\btransfer\b/i,
    /\bgift card\b/i, /\bcrypto\b/i, /\bbitcoin\b/i
  ];
  const payHits = payPatterns.filter(r => r.test(fullText)).length;
  if (payHits >= 2) {
    score += 10;
    reasons.push(`Payment/invoice language (${payHits} indicators)`);
  } else if (payHits === 1) {
    score += 5;
    reasons.push('Possible payment reference');
  }

  // 6. Check for mismatched domain between sender and any links
  if (fromParsed && urls.length > 0) {
    for (const u of urls) {
      try {
        const url = new URL(u);
        const host = url.hostname.toLowerCase();
        const base = getBaseDomain(host);
        if (base && getBaseDomain(fromParsed.domain) !== base) {
          score += 8;
          reasons.push(`Link domain (${base}) differs from sender domain`);
          break;
        }
      } catch (e) {}
    }
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds for quishing
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = '⚠ HIGH RISK – Quishing Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = '⚠ SUSPICIOUS – Potential QR Code Scam';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of Quishing';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayQuishingResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('quishResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

// ================= ANGLER PHISHING CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'Angler Phishing') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'none';
      document.getElementById('cloneScanner').style.display = 'none';
      document.getElementById('quishingScanner').style.display = 'none';
      document.getElementById('anglerScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide angler scanner
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('cloneScanner').style.display = 'none';
  document.getElementById('quishingScanner').style.display = 'none';
  document.getElementById('anglerScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('cloneProgressBar').style.width = '0%';
  document.getElementById('quishProgressBar').style.width = '0%';
  document.getElementById('anglerProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
  document.getElementById('cloneResult').innerHTML = '';
  document.getElementById('quishResult').innerHTML = '';
  document.getElementById('anglerResult').innerHTML = '';
};

// ================= ANGLER PHISHING SCAN =================
function scanAngler() {
  const platform = document.getElementById('anglerPlatform').value;
  const handle = document.getElementById('anglerHandle').value;
  const claim = document.getElementById('anglerClaim').value;
  const message = document.getElementById('anglerMessage').value;

  animateCyberProgress('anglerProgressBar', 'anglerProgressPercent', function () {
    const result = analyzeAnglerContent(platform, handle, claim, message);
    displayAnglerResult(result);
  });
}

function analyzeAnglerContent(platform, handle, claim, message) {
  let score = 0;
  const reasons = [];
  const fullText = (claim + ' ' + message).toLowerCase();

  // 1. Check for platform selection
  if (!platform) {
    score += 5;
    reasons.push('No platform selected');
  }

  // 2. Analyze handle for impersonation patterns
  const claimLower = claim.toLowerCase();
  const handleLower = handle.toLowerCase();
  const knownBrands = ['amazon', 'paypal', 'apple', 'google', 'microsoft', 'netflix', 'bank', 'support', 'customer service'];

  // Check if handle contains brand names but might be suspicious
  for (const brand of knownBrands) {
    if (handleLower.includes(brand)) {
      // Check if it's an exact match or common impersonation
      if (handleLower === brand || handleLower === brand + 'support' || handleLower === 'support' + brand) {
        // Could be legitimate, but still possible fake
        reasons.push(`Handle appears to be ${brand}`);
      } else {
        // Likely impersonation (e.g., @amaz0n_support)
        score += 20;
        reasons.push(`Handle "${handle}" looks like impersonation of ${brand}`);
        break;
      }
    }
  }

  // 3. Check for urgency in message
  const urgencyPatterns = [
    /\burgent\b/i, /\bimmediately\b/i, /\bproblem\b/i, /\bissue\b/i,
    /\blocked\b/i, /\bsuspended\b/i, /\bunauthorized\b/i, /\bsecurity breach\b/i
  ];
  const urgencyHits = urgencyPatterns.filter(r => r.test(message)).length;
  if (urgencyHits >= 2) {
    score += 12;
    reasons.push(`Urgency/problem language (${urgencyHits} indicators)`);
  } else if (urgencyHits === 1) {
    score += 6;
    reasons.push('Some urgency/problem language');
  }

  // 4. Requests for sensitive information
  const sensitivePatterns = [
    /\bpassword\b/i, /\bssn\b/i, /\bcredit card\b/i, /\bpin\b/i,
    /\bverify your account\b/i, /\bconfirm your identity\b/i,
    /\blogin\b/i, /\bsign in\b/i, /\bclick here\b/i
  ];
  const sensitiveHits = sensitivePatterns.filter(r => r.test(message)).length;
  if (sensitiveHits >= 2) {
    score += 18;
    reasons.push(`Requests sensitive information (${sensitiveHits} indicators)`);
  } else if (sensitiveHits === 1) {
    score += 10;
    reasons.push('Possible request for sensitive info');
  }

  // 5. Links in message (common in angler phishing)
  const urlRegex = /\bhttps?:\/\/[^\s<>"')]+/gi;
  const urls = message.match(urlRegex) || [];
  if (urls.length > 0) {
    score += 10;
    reasons.push(`Message contains ${urls.length} link(s)`);

    // Check for URL shorteners
    const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'rebrand.ly', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'shorturl.at'];
    for (const u of urls) {
      try {
        const url = new URL(u);
        const host = url.hostname.toLowerCase();
        if (shorteners.some(s => host.includes(s))) {
          score += 10;
          reasons.push(`Link uses URL shortener (${host}) – hides destination`);
          break;
        }
      } catch (e) {}
    }
  }

  // 6. Check for requests to move to DM/private chat
  if (/\bdm\b/i.test(message) || /\bprivate message\b/i.test(message) || /\bpm me\b/i.test(message)) {
    score += 15;
    reasons.push('Asks to move conversation to private/DM (common tactic)');
  }

  // 7. Check for grammar/spelling issues (simple indicator)
  const commonTypos = [
    'verifiy', 'acount', 'recieve', 'immediatly', 'supportt', 'custommer'
  ];
  for (const typo of commonTypos) {
    if (message.toLowerCase().includes(typo)) {
      score += 5;
      reasons.push(`Possible typo: "${typo}"`);
      break;
    }
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds for angler phishing
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = '⚠ HIGH RISK – Angler Phishing Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = '⚠ SUSPICIOUS – Potential Social Media Scam';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of Angler Phishing';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayAnglerResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('anglerResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

// ================= HTTPS PHISHING CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'HTTPS Phishing') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'none';
      document.getElementById('cloneScanner').style.display = 'none';
      document.getElementById('quishingScanner').style.display = 'none';
      document.getElementById('anglerScanner').style.display = 'none';
      document.getElementById('httpsScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide https scanner
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('cloneScanner').style.display = 'none';
  document.getElementById('quishingScanner').style.display = 'none';
  document.getElementById('anglerScanner').style.display = 'none';
  document.getElementById('httpsScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('cloneProgressBar').style.width = '0%';
  document.getElementById('quishProgressBar').style.width = '0%';
  document.getElementById('anglerProgressBar').style.width = '0%';
  document.getElementById('httpsProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
  document.getElementById('cloneResult').innerHTML = '';
  document.getElementById('quishResult').innerHTML = '';
  document.getElementById('anglerResult').innerHTML = '';
  document.getElementById('httpsResult').innerHTML = '';
};

// ================= HTTPS PHISHING SCAN =================
function scanHttps() {
  const url = document.getElementById('httpsUrl').value;
  const context = document.getElementById('httpsContext').value;

  if (!url) {
    alert('Please enter a URL to scan');
    return;
  }

  animateCyberProgress('httpsProgressBar', 'httpsProgressPercent', function () {
    const result = analyzeHttpsContent(url, context);
    displayHttpsResult(result);
  });
}

function analyzeHttpsContent(url, context) {
  let score = 0;
  const reasons = [];
  const fullText = (url + ' ' + context).toLowerCase();

  // 1. Basic URL parsing
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    score += 30;
    reasons.push('Invalid URL format');
    return { score: Math.min(100, score), reasons, label: '⚠ INVALID URL', safeInc: 0, riskInc: 1 };
  }

  const protocol = parsedUrl.protocol;
  const hostname = parsedUrl.hostname.toLowerCase();
  const path = parsedUrl.pathname.toLowerCase();
  const tld = hostname.split('.').pop();

  // 2. Check if HTTPS is used (legitimate but could be fake)
  if (protocol !== 'https:') {
    score += 20;
    reasons.push('URL does not use HTTPS (less secure)');
  } else {
    reasons.push('URL uses HTTPS (common in phishing to appear legitimate)');
    // Still add small risk because phishing sites use HTTPS
    score += 5;
  }

  // 3. IP address in hostname
  if (net && net.isIP) {
    // Use net.isIP if available (Node.js), but in browser we need a simple regex
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(hostname)) {
      score += 25;
      reasons.push('Hostname is an IP address (highly suspicious)');
    }
  } else {
    // Simple IP check for browser
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipRegex.test(hostname)) {
      score += 25;
      reasons.push('Hostname is an IP address (highly suspicious)');
    }
  }

  // 4. Suspicious TLDs
  const suspiciousTLDs = ['zip', 'mov', 'top', 'xyz', 'click', 'country', 'kim', 'gq', 'tk', 'cf'];
  if (suspiciousTLDs.includes(tld)) {
    score += 10;
    reasons.push(`Uses risky TLD .${tld}`);
  }

  // 5. Domain similarity to known brands
  const fromBase = getBaseDomain(hostname);
  for (const brand of HIGH_VALUE_BRANDS) {
    const brandBase = getBaseDomain(brand);
    const sim = tokenSimilarity(fromBase, brandBase);
    if (sim > 0.55 && fromBase !== brandBase) {
      score += 25;
      reasons.push(`Domain looks similar to ${brandBase} but is actually ${fromBase}`);
      break;
    }
  }

  // 6. URL shorteners
  const shorteners = ['bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'rebrand.ly', 'ow.ly', 'is.gd', 'buff.ly', 'cutt.ly', 'shorturl.at'];
  if (shorteners.some(s => hostname.includes(s))) {
    score += 15;
    reasons.push('URL uses a shortener (hides destination)');
  }

  // 7. Keywords in path
  const suspiciousKeywords = ['login', 'signin', 'verify', 'secure', 'account', 'update', 'reset', 'auth', 'session'];
  const pathHits = suspiciousKeywords.filter(k => path.includes(k)).length;
  if (pathHits > 0) {
    score += pathHits * 5;
    reasons.push(`Path contains suspicious keywords: ${suspiciousKeywords.filter(k => path.includes(k)).join(', ')}`);
  }

  // 8. Check for @ symbol in URL (common trick)
  if (url.includes('@')) {
    score += 15;
    reasons.push('URL contains @ symbol (may hide real domain)');
  }

  // 9. Check for multiple subdomains (e.g., secure-login.paypal.com.evil.com)
  const subdomainCount = hostname.split('.').length - 2;
  if (subdomainCount > 2) {
    score += 10;
    reasons.push(`Many subdomains (${subdomainCount}) – could be hiding real domain`);
  }

  // 10. Context analysis if provided
  if (context) {
    // Urgency keywords
    const urgentPatterns = [
      /\burgent\b/i, /\bimmediately\b/i, /\baction required\b/i,
      /\bverify\b/i, /\bupdate\b/i, /\bsecurity alert\b/i
    ];
    const urgentHits = urgentPatterns.filter(r => r.test(context)).length;
    if (urgentHits >= 2) {
      score += 10;
      reasons.push(`Context contains urgency language (${urgentHits} indicators)`);
    } else if (urgentHits === 1) {
      score += 5;
      reasons.push('Context contains some urgency language');
    }

    // Check if context mentions brands
    for (const brand of HIGH_VALUE_BRANDS) {
      if (context.toLowerCase().includes(brand.split('.')[0])) {
        reasons.push(`Context mentions ${brand.split('.')[0]} – could be lure`);
        break;
      }
    }
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds
  let label, safeInc, riskInc;
  if (score >= 65) {
    label = '⚠ HIGH RISK – HTTPS Phishing Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = '⚠ SUSPICIOUS – Potential HTTPS Scam';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of HTTPS Phishing';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayHttpsResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('httpsResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

// ================= EVIL TWIN CARD CLICK =================
document.querySelectorAll('.card').forEach(card => {
  if (card.textContent.trim() === 'Evil Twin') {
    card.addEventListener('click', () => {
      document.getElementById('scanner').style.display = 'none';
      document.getElementById('emailScanner').style.display = 'none';
      document.getElementById('spearScanner').style.display = 'none';
      document.getElementById('whalingScanner').style.display = 'none';
      document.getElementById('smishingScanner').style.display = 'none';
      document.getElementById('vishingScanner').style.display = 'none';
      document.getElementById('cloneScanner').style.display = 'none';
      document.getElementById('quishingScanner').style.display = 'none';
      document.getElementById('anglerScanner').style.display = 'none';
      document.getElementById('httpsScanner').style.display = 'none';
      document.getElementById('evilTwinScanner').style.display = 'block';
    });
  }
});

// Extend showUrlScanner to also hide evil twin scanner
window.showUrlScanner = function() {
  document.getElementById('emailScanner').style.display = 'none';
  document.getElementById('spearScanner').style.display = 'none';
  document.getElementById('whalingScanner').style.display = 'none';
  document.getElementById('smishingScanner').style.display = 'none';
  document.getElementById('vishingScanner').style.display = 'none';
  document.getElementById('cloneScanner').style.display = 'none';
  document.getElementById('quishingScanner').style.display = 'none';
  document.getElementById('anglerScanner').style.display = 'none';
  document.getElementById('httpsScanner').style.display = 'none';
  document.getElementById('evilTwinScanner').style.display = 'none';
  document.getElementById('scanner').style.display = 'block';
  document.getElementById('emailProgressBar').style.width = '0%';
  document.getElementById('spearProgressBar').style.width = '0%';
  document.getElementById('whaleProgressBar').style.width = '0%';
  document.getElementById('smsProgressBar').style.width = '0%';
  document.getElementById('vishProgressBar').style.width = '0%';
  document.getElementById('cloneProgressBar').style.width = '0%';
  document.getElementById('quishProgressBar').style.width = '0%';
  document.getElementById('anglerProgressBar').style.width = '0%';
  document.getElementById('httpsProgressBar').style.width = '0%';
  document.getElementById('evilProgressBar').style.width = '0%';
  document.getElementById('emailResult').innerHTML = '';
  document.getElementById('spearResult').innerHTML = '';
  document.getElementById('whaleResult').innerHTML = '';
  document.getElementById('smsResult').innerHTML = '';
  document.getElementById('vishResult').innerHTML = '';
  document.getElementById('cloneResult').innerHTML = '';
  document.getElementById('quishResult').innerHTML = '';
  document.getElementById('anglerResult').innerHTML = '';
  document.getElementById('httpsResult').innerHTML = '';
  document.getElementById('evilResult').innerHTML = '';
};

// ================= EVIL TWIN SCAN =================
function scanEvilTwin() {
  const ssid = document.getElementById('evilSsid').value;
  const security = document.getElementById('evilSecurity').value;
  const signal = document.getElementById('evilSignal').value;
  const duplicate = document.getElementById('evilDuplicate').value;
  const publicPlace = document.getElementById('evilPublicPlace').value;
  const details = document.getElementById('evilDetails').value;

  if (!ssid) {
    alert('Please enter the Wi‑Fi SSID');
    return;
  }

  animateCyberProgress('evilProgressBar', 'evilProgressPercent', function () {
    const result = analyzeEvilTwinContent(ssid, security, signal, duplicate, publicPlace, details);
    displayEvilTwinResult(result);
  });
}

function analyzeEvilTwinContent(ssid, security, signal, duplicate, publicPlace, details) {
  let score = 0;
  const reasons = [];
  const ssidLower = ssid.toLowerCase();
  const detailsLower = details.toLowerCase();

  // 1. SSID matches common public Wi‑Fi names (often spoofed)
  const commonSsids = [
    'starbucks', 'att', 'xfinity', 'google', 'free wifi', 'public wifi',
    'airport', 'hotel', 'cafe', 'coffee', 'guest', 'customer'
  ];
  for (const common of commonSsids) {
    if (ssidLower.includes(common)) {
      score += 10;
      reasons.push(`SSID matches common public network name (“${common}”) – often targeted by evil twins`);
      break;
    }
  }

  // 2. Check for suspicious SSID naming (typos, extra characters)
  const typoPatterns = [
    /starbuks/i, /startbucks/i, /xfininty/i, /gooogle/i, /f ree/i, /wiffi/i
  ];
  for (const pattern of typoPatterns) {
    if (pattern.test(ssid)) {
      score += 15;
      reasons.push(`SSID contains possible typo (“${ssid}”) – may be fake`);
      break;
    }
  }

  // 3. Security type analysis
  if (security === 'open') {
    score += 25;
    reasons.push('Network is open (no password) – typical for evil twins');
  } else if (security === 'wep') {
    score += 20;
    reasons.push('Uses WEP (outdated and easily cracked)');
  } else if (security === 'wpa' || security === 'wpa2') {
    // Slight risk if it's a public place and open would be expected
    if (publicPlace === 'yes') {
      score += 5;
      reasons.push('Uses WPA/WPA2, which is better, but in public places evil twins may still exist');
    }
  } else if (security === 'wpa3') {
    // WPA3 is modern, less likely to be evil twin unless it's a very sophisticated attack
    score -= 5; // reduce risk
    reasons.push('Uses WPA3 (strong security)');
  }

  // 4. Duplicate SSID presence
  if (duplicate === 'yes') {
    score += 30;
    reasons.push('You have seen multiple networks with the same SSID – classic evil twin sign');
  } else if (duplicate === 'unsure') {
    score += 10;
    reasons.push('Not sure if duplicates exist – check carefully');
  }

  // 5. Public place context
  if (publicPlace === 'yes') {
    score += 10;
    reasons.push('You are in a public location – evil twins are common here');
  }

  // 6. Signal strength
  if (signal === 'strong' && duplicate === 'yes') {
    // If there's a duplicate with strong signal, could be the fake one placed nearby
    score += 10;
    reasons.push('Strong signal with duplicate – possible rogue access point close by');
  } else if (signal === 'weak' && publicPlace === 'yes') {
    score += 5;
    reasons.push('Weak signal in public place – might be a fake placed at a distance');
  }

  // 7. Check details for keywords like "login page", "password", "credit card"
  const suspiciousDetails = [
    /login page/i, /enter password/i, /credit card/i, /payment/i,
    /verify identity/i, /update account/i, /billing/i
  ];
  for (const pattern of suspiciousDetails) {
    if (pattern.test(detailsLower)) {
      score += 15;
      reasons.push('Details mention sensitive requests (common after connecting)');
      break;
    }
  }

  // 8. Captive portal mention
  if (/captive portal|sign in to network|accept terms/i.test(detailsLower)) {
    score += 10;
    reasons.push('Mentions captive portal – could be used to steal credentials');
  }

  // Normalize score (0-100)
  score = Math.min(100, Math.max(0, score));

  // Label thresholds
  let label, safeInc, riskInc;
  if (score >= 60) {
    label = '⚠ HIGH RISK – Evil Twin Indicators Strong';
    riskInc = 1;
    safeInc = 0;
  } else if (score >= 30) {
    label = '⚠ SUSPICIOUS – Potential Rogue Wi‑Fi';
    riskInc = 1;
    safeInc = 0;
  } else {
    label = '✅ SAFE – Low Risk of Evil Twin';
    safeInc = 1;
    riskInc = 0;
  }

  return { score, reasons, label, safeInc, riskInc };
}

function displayEvilTwinResult(result) {
  // Update dashboard counters
  totalScans += 1;
  safeCount += result.safeInc;
  riskCount += result.riskInc;

  document.getElementById('totalScans').innerText = totalScans;
  document.getElementById('safeCountDisplay').innerText = safeCount;
  document.getElementById('riskCountDisplay').innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById('noDataText').style.display = 'none';
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById('evilResult');
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(' • ')}</small>`;
}

/*----------------------Scrolling Effect----------------------*/

const fadeSections = document.querySelectorAll(".fade-section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

fadeSections.forEach((section) => {
  observer.observe(section);
});

function animateCounter(id, target) {
  let count = 0;
  const speed = 20;
  const increment = Math.ceil(target / 30);

  const interval = setInterval(() => {
    count += increment;

    if (count >= target) {
      document.getElementById(id).innerText = target;
      clearInterval(interval);
    } else {
      document.getElementById(id).innerText = count;
    }
  }, speed);
}
