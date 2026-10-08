/* Scout pricing — edit the numbers in SCOUT_PRICING and commit. Nothing else needs to change.
 *
 * plans[].annual       Scout's price per year in US dollars.
 * plans[].marketAvg    Average annual price of comparable AI SDR platforms at this level
 *                      (Oct 2026 research, see README). Drives the "competition average" line
 *                      and the banner. Set compare:false to hide all comparisons.
 * plans[].from         true shows "from" before the price (custom-quoted plans).
 * offers.trial         Free trial length and call allowance.
 * offers.intro         Intro offer: price per month, number of months, call allowance per month.
 */
var SCOUT_PRICING = {
  compare: true,
  offers: {
    trial: { days: 30, calls: 150 },
    intro: { monthly: 120, months: 3, callsPerMonth: 300, convertsTo: "Field" }
  },
  plans: [
    {
      name: "Field", annual: 15000, marketAvg: 27000, from: false, popular: false,
      for: "One rep working their own territory.",
      features: ["Outbound calls with voicemail drop", "Red / Yellow / Green scoring", "Live warm transfer to the rep", "Microsoft 365 email and calendar", "Automatic Friday report"],
      limits: ["1 Scout profile · 1 rep", "1,500 calls / month", "2,500 active email contacts / month"]
    },
    {
      name: "Team", annual: 31500, marketAvg: 57000, from: false, popular: true,
      for: "A sales team sharing one target list.",
      features: ["Everything in Field", "Routes each account to the right rep", "Salesforce or HubSpot sync", "API access", "Team-level Friday report"],
      limits: ["1 Scout profile · up to 5 reps", "6,000 calls / month", "10,000 active email contacts / month"]
    },
    {
      name: "Territory", annual: 51500, marketAvg: 94000, from: true, popular: false,
      for: "Several verticals or regions at once.",
      features: ["Everything in Team", "A Scout profile per vertical or region", "Local caller ID per territory", "Target-list research agent (on the roadmap)", "Dedicated onboarding"],
      limits: ["Multiple Scout profiles · unlimited reps", "10,000 calls / month", "24,000 active email contacts / month"]
    }
  ]
};

(function () {
  var cfg = SCOUT_PRICING;
  var tiers = document.getElementById("tiers");
  var banner = document.getElementById("premium");
  var offers = document.getElementById("offers");
  var bAnnual = document.getElementById("bAnnual");
  var bMonthly = document.getElementById("bMonthly");
  var monthly = false;

  function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function planByName(n) { for (var i = 0; i < cfg.plans.length; i++) if (cfg.plans[i].name === n) return cfg.plans[i]; return cfg.plans[0]; }

  if (banner) {
    if (cfg.compare) {
      var prem = cfg.plans.map(function (p) { return p.marketAvg / p.annual - 1; });
      var lo = Math.round(Math.min.apply(null, prem) * 100), hi = Math.round(Math.max.apply(null, prem) * 100);
      banner.innerHTML = "The competition averages <b>" + (lo === hi ? lo : lo + "–" + hi) + "% more</b> than Scout at every plan level";
    } else {
      banner.hidden = true;
    }
  }

  if (offers) {
    var t = cfg.offers.trial, it = cfg.offers.intro, after = planByName(it.convertsTo);
    offers.innerHTML =
      '<article class="offer">' +
        '<span class="pill">Free trial</span>' +
        '<h3>' + t.days + ' days free</h3>' +
        '<p>Scout works a slice of your real list for ' + t.days + ' days. See the calls, the scores and the handoffs before you pay anything.</p>' +
        '<p class="offer-lim">Up to ' + t.calls.toLocaleString("en-US") + ' calls · Field features · 1 rep</p>' +
        '<a class="btn" href="#contact">Start a free trial</a>' +
      '</article>' +
      '<article class="offer">' +
        '<span class="pill">Intro offer</span>' +
        '<h3>' + money(it.monthly) + '/mo for ' + it.months + ' months</h3>' +
        '<p>Run Scout for a full quarter at an intro rate, then move to Scout ' + esc(after.name) + ' at ' + money(after.annual / 12) + '/mo billed annually, or any other plan.</p>' +
        '<p class="offer-lim">Up to ' + it.callsPerMonth.toLocaleString("en-US") + ' calls / month · Field features · 1 rep</p>' +
        '<a class="btn ghost" href="#contact">Claim the intro rate</a>' +
      '</article>';
  }

  function render() {
    if (!tiers) return;
    tiers.innerHTML = cfg.plans.map(function (p) {
      var shown = monthly ? p.annual / 12 : p.annual;
      var save = p.marketAvg - p.annual;
      var vs = cfg.compare
        ? '<div class="vs"><span>Competition average: <s>' + money(p.marketAvg) + (p.from ? "+" : "") + ' / yr</s></span>' +
          '<span class="save">You keep about ' + money(save) + ' / yr (' + Math.round(save / p.marketAvg * 100) + '% less)</span></div>'
        : "";
      return '<article class="tier' + (p.popular ? " pop" : "") + '">' +
        '<div class="tier-top">' + (p.popular ? '<span class="pill">Most teams start here</span>' : "") +
        '<h3>Scout ' + esc(p.name) + '</h3><p class="for">' + esc(p.for) + '</p></div>' +
        '<div class="price"><span class="amt">' + (p.from ? "<small>from </small>" : "") + money(shown) + '</span>' +
        '<span class="per">' + (monthly ? "per month, billed annually" : "per year") + '</span></div>' +
        vs +
        '<ul>' + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + '</ul>' +
        '<div class="lim">' + p.limits.map(function (l) { return "<span>" + esc(l) + "</span>"; }).join("") + '</div>' +
        '<a class="btn' + (p.popular ? "" : " ghost") + '" href="#contact">Talk to us about ' + esc(p.name) + '</a>' +
        '</article>';
    }).join("");
  }
  function setPeriod(m) {
    monthly = m;
    bAnnual.setAttribute("aria-pressed", String(!m));
    bMonthly.setAttribute("aria-pressed", String(m));
    render();
  }
  if (bAnnual && bMonthly) {
    bAnnual.addEventListener("click", function () { setPeriod(false); });
    bMonthly.addEventListener("click", function () { setPeriod(true); });
  }
  render();

  var head = document.querySelector(".head");
  var toggle = document.querySelector(".nav-toggle");
  if (head && toggle) {
    toggle.addEventListener("click", function () {
      var open = head.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    head.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () { head.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); });
    });
  }
})();
