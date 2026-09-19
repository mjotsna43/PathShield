function findRoutes() {
  const source = document.getElementById("source").value.trim();
  const destination = document.getElementById("destination").value.trim();
  const error = document.getElementById("error");
  const button = document.getElementById("findBtn");

  if (!source || !destination) {
    error.textContent = "⚠️ Please enter both source and destination.";
    return;
  }

  if (source.toLowerCase() === destination.toLowerCase()) {
    error.textContent = "⚠️ Source and destination cannot be the same.";
    return;
  }

  error.textContent = "";

  // Show analyzing animation
  button.disabled = true;
  button.textContent = "🔄 Analyzing Routes...";

  document.getElementById("simulation").innerHTML =
    `<strong>🔍 Analyzing Safe Routes...</strong><br>
     Checking CCTV coverage, risk points, lighting and help points...`;

  // Simulate route analysis
  setTimeout(() => {

    document.querySelector(".map-start").innerHTML =
      `📍 <span>${source}</span>`;

    document.querySelector(".map-end").innerHTML =
      `🏁 <span>${destination}</span>`;
    const confidence = document.getElementById("confidenceLevel");
const confidenceText = document.getElementById("confidenceText");
const warning = document.getElementById("unknownWarning");

// Demo confidence logic
if (
  source.toLowerCase().includes("unknown") ||
  destination.toLowerCase().includes("unknown")
) {
  confidence.textContent = "LOW CONFIDENCE";
  confidence.className = "confidence-low";

  confidenceText.textContent =
    "Limited safety information is available for this area.";

  warning.style.display = "block";
}
else {
  confidence.textContent = "HIGH CONFIDENCE";
  confidence.className = "high";

  confidenceText.textContent =
    "Based on multiple safety data sources.";

  warning.style.display = "none";
}
    document.getElementById("simulation").innerHTML =
      `<strong>🛡️ Routes analyzed successfully</strong><br>
       3 route options found from <b>${source}</b> to <b>${destination}</b>.
       <br><br>
       🟢 Safety factors analyzed: CCTV • Lighting • Risk Points • Help Points`;

    button.disabled = false;
    button.textContent = "Find Safe Routes";

    document.querySelector(".routes").scrollIntoView({
      behavior: "smooth"
    });

  }, 1800);
}

/* Route Details */

function showDetails(route) {

  if (route === "safe") {
    alert(
      "🛡️ SAFEST ROUTE\n\n" +
      "Safety Score: 91/100\n" +
      "📹 CCTV Coverage: 85%\n" +
      "💡 Well-lit roads\n" +
      "⚠️ Low reported risk\n" +
      "🏪 4 safe help points\n" +
      "🟢 Confidence: HIGH"
    );
  }

  else if (route === "fast") {
    alert(
      "⚡ FASTEST ROUTE\n\n" +
      "Safety Score: 68/100\n" +
      "⚠️ 2 risk points\n" +
      "📹 Low CCTV coverage\n" +
      "🚶 One isolated stretch\n" +
      "🟡 Confidence: MEDIUM"
    );
  }

  else {
    alert(
      "⚖️ BALANCED ROUTE\n\n" +
      "Safety Score: 82/100\n" +
      "📹 CCTV Coverage: 70%\n" +
      "💡 Good lighting\n" +
      "👥 High crowd presence\n" +
      "🟢 Confidence: HIGH"
    );
  }
}


/* Route Safety Simulator */
function simulate() {
  let safeScore = 91;
  let balancedScore = 82;
  let fastScore = 68;

  let lighting = 24;
  let cctv = 22;
  let risk = 23;
  let help = 22;

  let message = "🟢 Normal conditions";

  if (document.getElementById("cctvToggle").checked) {
    safeScore -= 12;
    balancedScore -= 10;

    cctv -= 12;

    message = "⚠️ CCTV unavailable — safety scores reduced";
  }

  if (document.getElementById("roadToggle").checked) {
    safeScore -= 10;
    balancedScore -= 8;

    help -= 5;

    message = "🚧 Road closed — alternate route recommended";
  }

  if (document.getElementById("riskToggle").checked) {
    safeScore -= 15;
    balancedScore -= 12;
    fastScore -= 10;

    risk -= 15;

    message = "🚨 New risk reported — safer route recommended";
  }

  safeScore = Math.max(0, safeScore);
  balancedScore = Math.max(0, balancedScore);
  fastScore = Math.max(0, fastScore);

  lighting = Math.max(0, lighting);
  cctv = Math.max(0, cctv);
  risk = Math.max(0, risk);
  help = Math.max(0, help);

  // Update route cards
  document.getElementById("safeScore").textContent =
    `${safeScore}/100`;

  document.getElementById("balancedScore").textContent =
    `${balancedScore}/100`;

  document.getElementById("fastScore").textContent =
    `${fastScore}/100`;

  // Update explanation
  document.getElementById("safeBreakdown").innerHTML = `
    <p>💡 Lighting: <strong>${lighting}/25</strong></p>
    <p>📹 CCTV: <strong>${cctv}/25</strong></p>
    <p>🚨 Risk Level: <strong>${risk}/25</strong></p>
    <p>🏪 Help Points: <strong>${help}/25</strong></p>
  `;

  // Update simulator
  document.getElementById("simulation").innerHTML =
    `<strong>🔄 Simulation Result</strong><br>
     🛡️ Safest: ${safeScore}/100 &nbsp;
     ⚖️ Balanced: ${balancedScore}/100 &nbsp;
     ⚡ Fastest: ${fastScore}/100
     <br><br>
     ${message}`;
}

/* Group-Safe Route */
function findExit() {
  const place = document.getElementById("place").value;
  const result = document.getElementById("exitResult");

  const exits = {
    "College":
      "🚪 Exit B — CCTV + security desk nearby",

    "Shopping Mall":
      "🚪 Exit A — CCTV + security staff nearby",

    "Metro Station":
      "🚪 Exit C — Well-lit + help point nearby",

    "Bus Station":
      "🚪 Exit B — CCTV + public help point"
  };

  result.innerHTML =
    `<strong>🛡️ Recommended Safe Exit</strong><br>
     ${exits[place]}`;
}
function selectRoute(route) {
  // Remove previous selection
  document.querySelectorAll(".route-card").forEach(card => {
    card.classList.remove("selected");
  });

  // Select clicked route
  if (route === "safe") {
    document.querySelector(".route-card:nth-child(1)")
      .classList.add("selected");

    document.getElementById("simulation").innerHTML =
      `<strong>🛡️ Safest Route Selected</strong><br>
       Safety Score: 91/100 • ETA: 12 min • CCTV: 85%`;
  }

  else if (route === "fast") {
    document.querySelector(".route-card:nth-child(2)")
      .classList.add("selected");

    document.getElementById("simulation").innerHTML =
      `<strong>⚡ Fastest Route Selected</strong><br>
       Safety Score: 68/100 • ETA: 8 min • 2 risk points`;
  }

  else {
    document.querySelector(".route-card:nth-child(3)")
      .classList.add("selected");

    document.getElementById("simulation").innerHTML =
      `<strong>⚖️ Balanced Route Selected</strong><br>
       Safety Score: 82/100 • ETA: 10 min • CCTV: 70%`;
  }
}
function markerInfo(type) {
  const box = document.getElementById("markerInfo");

  if (type === "risk") {
    box.innerHTML =
      "⚠️ <b>Reported Risk Point</b><br>" +
      "Poor lighting + 2 recent reports";
  }

  else if (type === "cctv") {
    box.innerHTML =
      "📹 <b>CCTV Coverage</b><br>" +
      "Camera coverage available in this area";
  }

  else {
    box.innerHTML =
      "🟢 <b>Safe Help Point</b><br>" +
      "Verified shop / emergency assistance nearby";
  }
}
function helpInfo(type) {
  const box = document.getElementById("helpInfo");

  if (type === "shop") {
    box.innerHTML =
      "🏪 <b>Verified Safe Shop</b><br>" +
      "Open • 0.3 km away<br>Emergency assistance available";
  }

  else if (type === "pharmacy") {
    box.innerHTML =
      "💊 <b>Pharmacy</b><br>" +
      "Open • 0.5 km away<br>Basic medical assistance";
  }

  else {
    box.innerHTML =
      "⛽ <b>Petrol Station</b><br>" +
      "Open 24/7 • 0.7 km away<br>Public help point";
  }
}
function touristInfo() {
  const box = document.getElementById("touristInfo");

  box.innerHTML =
    "📍 <b>Tourist Spot</b><br>" +
    "Popular public location<br>" +
    "🟢 Nearby CCTV & help points";

  box.style.display = "block";
}
function changeMapTime(time) {
  const map = document.querySelector(".map");

  // Remove previous time
  map.classList.remove(
    "morning",
    "afternoon",
    "evening",
    "night"
  );

  // Add selected time
  map.classList.add(time);
}
function changeBackground(time) {
  document.body.classList.remove(
    "morning",
    "afternoon",
    "evening",
    "night"
  );

  document.body.classList.add(time);
}