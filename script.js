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

  const welcomeText = "WELCOME TO CYBER SHIELD";
  let welcomeIndex = 0;

  function typeWelcome() {
    if (welcomeIndex < welcomeText.length) {
      welcomeElement.innerHTML += welcomeText.charAt(welcomeIndex);
      welcomeIndex++;
      setTimeout(typeWelcome, 65); // speed control
    }
  }
  typeWelcome();

  /* ================= ENTER BUTTON ================= */

  document.getElementById("enterBtn").addEventListener("click", function () {
    document.getElementById("matrixScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    // Add background class
    document.body.classList.add("main-bg");
  });

  /* ================= TEAM SECTION (FIXED) ================= */

  /* ================= TEAM SECTION (FINAL FIXED + SHAKE) ================= */

  const teamNames = document.querySelectorAll(".team-name");
  const card = document.querySelector(".profile-card");
  const profileImage = document.querySelector(".profile-img img");

  teamNames.forEach((member) => {
    member.addEventListener("mouseenter", () => activateMember(member));
    member.addEventListener("click", () => activateMember(member));
  });

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

function scanThreat() {
  let input = document.getElementById("urlInput").value;
  let progress = document.getElementById("progressBar");

  progress.style.width = "0%";

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
  } else {
    safeCount++;
    document.getElementById("result").innerHTML = "✅ SAFE";
  }

  // document.getElementById("totalScans").innerText = totalScans;
  animateCounter("totalScans", totalScans);
  document.getElementById("safeCountDisplay").innerText = safeCount;
  document.getElementById("riskCountDisplay").innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();
}

// loading bar
function startLoadingSimulation(callback) {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

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

  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      progressText.innerText = "Scan completed ✔";
      setTimeout(callback, 700);
    } else {
      width += 14;
      progressBar.style.width = width + "%";

      if (index < steps.length) {
        progressText.innerText = steps[index];
        index++;
      }
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

  // Progress bar animation
  startLoadingSimulation("emailLoadingText", function () {
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

  document.getElementById("totalScans").innerText = totalScans;
  document.getElementById("safeCountDisplay").innerText = safeCount;
  document.getElementById("riskCountDisplay").innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById("emailResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
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

  const progress = document.getElementById("spearProgressBar");
  progress.style.width = "0%";
  startLoadingSimulation("spearLoadingText", function () {
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

  document.getElementById("totalScans").innerText = totalScans;
  document.getElementById("safeCountDisplay").innerText = safeCount;
  document.getElementById("riskCountDisplay").innerText = riskCount;

  if (totalScans > 0) {
    document.getElementById("noDataText").style.display = "none";
  }

  updateChart();

  // Show result message
  const resultEl = document.getElementById("spearResult");
  resultEl.innerHTML = `${result.label} (Score: ${result.score})<br><small>${result.reasons.join(" • ")}</small>`;
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
