const state = { protein: null, veg: [], flavor: null, combo: null, goal: null, step: "protein" };
const $ = (id) => document.getElementById(id);
const proteinObj = () => PROTEINS.find(p => p.id === state.protein);
const flavorObj = () => FLAVORS.find(f => f.id === state.flavor);
const vegObjs = () => state.veg.map(id => VEG.find(v => v.id === id)).filter(Boolean);
const isComplete = () => !!(state.protein && state.veg.length === 2 && state.flavor);
function mixPieces() {
  const bits = [];
  if (state.protein) bits.push({ emo: proteinObj().emo, name: proteinObj().name });
  vegObjs().forEach(v => bits.push({ emo: v.emo, name: v.name }));
  if (state.flavor) bits.push({ emo: flavorObj().emo, name: flavorObj().name });
  return bits;
}
function currentStep() {
  if (!state.protein) return "protein";
  if (state.veg.length < 2) return "veg";
  if (!state.flavor) return "flavor";
  return "done";
}
function renderProgress() {
  const step = currentStep();
  const items = [{ id: "protein", label: "Protein" }, { id: "veg", label: "Veggies" }, { id: "flavor", label: "Spices" }];
  const order = { protein: 0, veg: 1, flavor: 2, done: 3 };
  $("progress").innerHTML = items.map((item, i) => {
    const done = order[step] > i;
    const on = step === item.id;
    const canJump = done || item.id === "protein" || (item.id === "veg" && state.protein) || (item.id === "flavor" && state.veg.length === 2);
    const cls = "pip" + (on ? " on" : "") + (done ? " done" : "");
    return `<div class="${cls}"><button data-jump="${item.id}" ${canJump ? "" : "disabled"}><span class="n">${done ? "\u2713" : i + 1}</span> ${item.label}</button></div>`;
  }).join("");
}
function pickedRow() {
  const bits = [];
  if (state.protein) bits.push(`<span class="chip">${proteinObj().emo} ${proteinObj().name}</span>`);
  vegObjs().forEach(v => bits.push(`<span class="chip">${v.emo} ${v.name}</span>`));
  if (state.flavor) bits.push(`<span class="chip">${flavorObj().emo} ${flavorObj().name}</span>`);
  const labels = ["Protein", "Veg", "Veg", "Spices"];
  while (bits.length < 4) bits.push(`<span class="chip ghost">${labels[bits.length]}</span>`);
  return `<div class="picked">${bits.join("")}</div>`;
}
function renderStep() {
  const step = state.step === "done" ? "flavor" : state.step;
  const card = $("stepCard");
  if (step === "protein") {
    card.innerHTML = `<h2>\ud83e\udd69 Protein <span class="qty">Step 1 \u00b7 \u00bd lb</span></h2><p class="hint">Drag one into the pot, or tap it.</p>${pickedRow()}<div class="tiles three" id="proteinTiles"></div><div class="step-actions"><button class="btn btn-soft" id="surpriseBtn">Surprise Me</button></div>`;
    $("proteinTiles").innerHTML = PROTEINS.map(p => `<button class="tile ${state.protein === p.id ? "on" : ""}" data-kind="protein" data-id="${p.id}" data-emo="${p.emo}"><span class="emo">${p.emo}</span><span class="nm">${p.name}</span></button>`).join("");
  }
  if (step === "veg") {
    card.innerHTML = `<h2>\ud83e\udd66 Vegetables <span class="qty">Step 2 \u00b7 1 lb total</span></h2><p class="hint">Drag two vegetables into the pot, or tap them.</p>${pickedRow()}<div class="tiles three" id="vegTiles"></div><div class="step-actions"><button class="btn-tiny" data-jump="protein">\u2190 Change protein</button><button class="btn btn-primary ${state.veg.length === 2 ? "" : "hidden"}" id="nextFlavor">Next: spices \u2192</button></div>`;
    $("vegTiles").innerHTML = VEG.map(v => `<button class="tile ${state.veg.includes(v.id) ? "on" : ""}" data-kind="veg" data-id="${v.id}" data-emo="${v.emo}"><span class="emo">${v.emo}</span><span class="nm">${v.name}</span></button>`).join("");
  }
  if (step === "flavor") {
    card.innerHTML = `<h2>\ud83c\udf36 Flavor <span class="qty">Step 3 \u00b7 spices</span></h2><p class="hint">Drag a cuisine into the pot to season it.</p>${pickedRow()}<div class="tiles flavor-tiles" id="flavorTiles"></div><div class="step-actions"><button class="btn-tiny" data-jump="veg">\u2190 Change vegetables</button></div>`;
    $("flavorTiles").innerHTML = FLAVORS.map(f => `<button class="tile ${state.flavor === f.id ? "on" : ""}" data-kind="flavor" data-id="${f.id}" data-emo="${f.emo}"><span class="emo">${f.emo}</span><span class="nm">${f.name}</span></button>`).join("");
  }
}
function updatePot() {
  const bits = mixPieces();
  $("potMix").innerHTML = bits.map((b, i) => `<span class="i${i}" title="${b.name}">${b.emo}</span>`).join("");
  $("plate").classList.toggle("empty", bits.length === 0);
  $("fillDots").innerHTML = bits.map(b => `<span class="dot" title="${b.name}">${b.emo}</span>`).join("");
  if (!state.protein) $("potStatus").textContent = "Empty plate. Drag protein on.";
  else if (state.veg.length < 2) $("potStatus").textContent = "Protein's on. Add two vegetables.";
  else if (!state.flavor) $("potStatus").textContent = "Now drop on the spices.";
  else $("potStatus").textContent = "Dinner is served.";
}
function renderCombos() {
  const wrap = $("comboWrap");
  if (state.step !== "protein" && state.step !== "veg") { wrap.classList.add("hidden"); return; }
  let list = COMBOS.slice();
  if (state.protein) list = list.filter(c => c.protein === state.protein);
  if (!list.length) { wrap.classList.add("hidden"); return; }
  $("comboTitle").textContent = state.protein ? proteinObj().name + " selected. Delicious matches:" : "Or start from a finished pot";
  $("comboRow").innerHTML = list.slice(0, 4).map(c => {
    const pr = PROTEINS.find(p => p.id === c.protein);
    const fl = FLAVORS.find(f => f.id === c.flavor);
    return `<button class="combo" data-combo="${c.id}"><div class="c-emo">${c.emo}</div><div class="c-name">${c.name}</div><div class="c-meta">${pr.name} \u00b7 ${fl.name}</div></button>`;
  }).join("");
  wrap.classList.remove("hidden");
}
function applyCombo(id) {
  const c = COMBOS.find(x => x.id === id);
  if (!c) return;
  state.combo = id; state.protein = c.protein; state.veg = c.veg.slice(0, 2); state.flavor = c.flavor; state.step = "done";
  renderAll(); showResult();
}
function surprise() {
  let pool = COMBOS.slice();
  if (state.goal === "spicy") pool = pool.filter(c => FLAVORS.find(f => f.id === c.flavor).spicy);
  if (state.goal === "cheap") pool = pool.filter(c => ["eggs", "turkey", "chicken", "beef"].includes(c.protein));
  if (state.goal === "fast") pool = pool.filter(c => ["eggs", "shrimp", "salmon"].includes(c.protein));
  if (state.goal === "protein") pool = pool.filter(c => ["turkey", "shrimp", "salmon", "chicken"].includes(c.protein));
  if (state.goal === "delicious") pool = pool.filter(c => c.delicious >= 5);
  if (state.protein) pool = pool.filter(c => c.protein === state.protein);
  if (!pool.length) pool = COMBOS;
  applyCombo(pool[Math.floor(Math.random() * pool.length)].id);
}
function applyGoal(goal) {
  state.goal = goal;
  document.querySelectorAll(".goal").forEach(g => g.classList.toggle("on", g.dataset.goal === goal));
  $("builder").classList.add("show"); $("goals").classList.add("show");
  if (goal === "none" || goal === "delicious") { surprise(); return; }
  if (goal === "protein") state.protein = state.protein || "shrimp";
  if (goal === "veggies") state.veg = ["broccoli", "cabbage"];
  if (goal === "cheap") { state.protein = ["eggs", "turkey", "chicken"].includes(state.protein) ? state.protein : "eggs"; state.veg = ["cabbage", "onion"]; }
  if (goal === "fast") { state.protein = ["shrimp", "eggs", "salmon"].includes(state.protein) ? state.protein : "shrimp"; state.veg = ["spinach", "zucchini"]; }
  if (goal === "spicy") state.flavor = state.flavor || "cajun";
  state.step = currentStep() === "done" ? "flavor" : currentStep();
  renderAll();
  if (isComplete()) showResult();
}
function nutrition() {
  const p = proteinObj(); const vs = vegObjs();
  return {
    cal: Math.round(p.cal + vs.reduce((s, v) => s + v.cal, 0)),
    protein: Math.round(p.protein + vs.reduce((s, v) => s + v.protein, 0)),
    fiber: Math.round(vs.reduce((s, v) => s + v.fiber, 0) * 10) / 10,
    cost: (p.cost + vs.reduce((s, v) => s + v.cost, 0) + 0.40).toFixed(2),
    time: Math.max(p.time, 8) + 4
  };
}
function potName() {
  if (state.combo) { const c = COMBOS.find(x => x.id === state.combo); if (c) return { emo: c.emo, name: c.name }; }
  const match = COMBOS.find(c => c.protein === state.protein && c.flavor === state.flavor);
  if (match) return { emo: match.emo, name: match.name };
  return { emo: flavorObj().emo, name: flavorObj().name + " " + proteinObj().name + " Pot" };
}
function showResult() {
  if (!isComplete()) { $("result").classList.remove("show"); return; }
  const p = proteinObj(); const f = flavorObj(); const vs = vegObjs(); const n = nutrition(); const title = potName();
  $("recipeCard").innerHTML = `<div class="badge">Finished pot</div><h2>${title.emo} ${title.name}</h2><div class="dish-plate"><div class="plate"><div class="plate-food">${mixPieces().map((b, i) => `<span class="i${i}">${b.emo}</span>`).join("")}</div></div></div><div class="ing-list"><div class="ing"><b>${p.emo}</b> 8 oz ${p.name}</div>${vs.map(v => `<div class="ing"><b>${v.emo}</b> 8 oz ${v.name}</div>`).join("")}<div class="ing"><b>\ud83c\udf36</b> ${f.spices.join(" + ")}</div><div class="ing"><b>\ud83c\udf4b</b> ${f.finish} to finish</div></div><div class="steps"><div class="step"><span class="num">1</span><span>Brown the ${p.name.toLowerCase()}</span></div><div class="step"><span class="num">2</span><span>Add vegetables</span></div><div class="step"><span class="num">3</span><span>Add seasoning</span></div><div class="step"><span class="num">4</span><span>Cook 8\u201310 minutes</span></div><div class="step"><span class="num">5</span><span>Eat</span></div></div>`;
  $("gauges").innerHTML = `<div class="gauge"><div class="n">${n.cal}</div><div class="l">calories</div></div><div class="gauge"><div class="n">${n.protein}g</div><div class="l">protein</div></div><div class="gauge"><div class="n">${n.fiber}g</div><div class="l">fiber</div></div><div class="gauge"><div class="n">1 lb</div><div class="l">vegetables</div></div>`;
  $("extras").innerHTML = `<span>\ud83d\udcb0 Approx. $${n.cost}/pot</span><span>\ud83c\udf7d 1 huge meal / 2 normal meals</span><span>\u26a1 About ${n.time} minutes</span>`;
  $("result").classList.add("show");
  $("result").scrollIntoView({ behavior: "smooth", block: "start" });
}
function renderAll() { renderProgress(); renderStep(); updatePot(); renderCombos(); }
function applyItem(kind, id, fromDrop) {
  state.combo = null;
  if (kind === "protein") state.protein = id;
  if (kind === "veg") {
    if (!fromDrop && state.veg.includes(id)) state.veg = state.veg.filter(v => v !== id);
    else if (state.veg.includes(id)) {}
    else if (state.veg.length < 2) state.veg = [...state.veg, id];
    else state.veg = [state.veg[1], id];
  }
  if (kind === "flavor") state.flavor = id;
  const next = currentStep();
  state.step = next === "done" ? "flavor" : next;
  renderAll();
  if (isComplete()) showResult(); else $("result").classList.remove("show");
}
document.addEventListener("click", (e) => {
  if (window.__dragMoved) return;
  const jump = e.target.closest("[data-jump]");
  if (jump && !jump.disabled) {
    const to = jump.dataset.jump;
    if (to === "protein") state.step = "protein";
    if (to === "veg" && state.protein) state.step = "veg";
    if (to === "flavor" && state.veg.length === 2) state.step = "flavor";
    $("result").classList.remove("show"); renderAll(); return;
  }
  const tile = e.target.closest(".tile");
  if (tile) { applyItem(tile.dataset.kind, tile.dataset.id, false); return; }
  const combo = e.target.closest(".combo");
  if (combo) applyCombo(combo.dataset.combo);
});
const drag = { on: false, moved: false, kind: null, id: null, emo: "\ud83c\udf72", ghost: null };
function overPot(x, y) {
  const pot = $("potDrop"); if (!pot) return false;
  const r = pot.getBoundingClientRect();
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}
function endDrag(x, y) {
  const dropped = drag.moved && overPot(x, y);
  const kind = drag.kind, id = drag.id;
  if (drag.ghost) drag.ghost.remove();
  document.querySelectorAll(".pot-wrap").forEach(p => p.classList.remove("hot"));
  window.__dragMoved = drag.moved;
  setTimeout(() => { window.__dragMoved = false; }, 50);
  const didMove = drag.moved;
  drag.on = false; drag.moved = false; drag.ghost = null;
  if (dropped) applyItem(kind, id, true);
  return didMove;
}
document.addEventListener("pointerdown", (e) => {
  const tile = e.target.closest(".tile");
  if (!tile || e.button) return;
  drag.on = true; drag.moved = false; drag.kind = tile.dataset.kind; drag.id = tile.dataset.id;
  drag.emo = tile.dataset.emo || "\ud83c\udf72"; drag.startX = e.clientX; drag.startY = e.clientY;
});
document.addEventListener("pointermove", (e) => {
  if (!drag.on) return;
  const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
  if (!drag.moved && dist < 8) return;
  if (!drag.moved) {
    drag.moved = true;
    drag.ghost = document.createElement("div");
    drag.ghost.className = "drag-ghost";
    drag.ghost.textContent = drag.emo;
    document.body.appendChild(drag.ghost);
  }
  drag.ghost.style.left = e.clientX + "px";
  drag.ghost.style.top = e.clientY + "px";
  $("potDrop") && $("potDrop").classList.toggle("hot", overPot(e.clientX, e.clientY));
});
document.addEventListener("pointerup", (e) => { if (drag.on) endDrag(e.clientX, e.clientY); });
document.addEventListener("pointercancel", () => { if (drag.on) endDrag(-1, -1); });
$("startBtn").addEventListener("click", () => {
  $("builder").classList.add("show"); $("goals").classList.add("show");
  state.step = currentStep() === "done" ? "flavor" : currentStep();
  renderAll(); $("builder").scrollIntoView({ behavior: "smooth" });
});
$("againBtn").addEventListener("click", () => {
  state.protein = null; state.veg = []; state.flavor = null; state.combo = null; state.step = "protein";
  $("result").classList.remove("show"); renderAll(); $("builder").scrollIntoView({ behavior: "smooth" });
});
$("tweakBtn").addEventListener("click", () => {
  state.step = "protein"; $("result").classList.remove("show"); renderAll(); $("builder").scrollIntoView({ behavior: "smooth" });
});
document.querySelectorAll(".goal").forEach(btn => btn.addEventListener("click", () => applyGoal(btn.dataset.goal)));
document.addEventListener("click", (e) => {
  if (e.target.id === "surpriseBtn") surprise();
  if (e.target.id === "nextFlavor" && state.veg.length === 2) { state.step = "flavor"; renderAll(); }
});
renderAll();
