// Tom's Primer: reading practice that follows Alpha-Phonics lesson by lesson.
// The child reads each word and sentence aloud; a grown-up marks it.
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uniq = a => [...new Set(a)];
const plain = w => w.replace(/-/g, '');
const DAY = 864e5;
const startOfDay = () => new Date().setHours(0, 0, 0, 0);

const childName = () => (state.childName || '').trim();
const greet = s => childName() ? `${s}, ${childName()}!` : `${s}!`;

/* ---------- the book ---------- */
function parseBook(text) {
  const out = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line[0] === '#') {
      const [n, title] = line.slice(1).split('|').map(s => s.trim());
      out.push({ n, title, note: '', groups: [], irr: [], sent: [] });
    } else if (line[0] === '?') out[out.length - 1].note = line.slice(1).trim();
    else if (line[0] === '>') out[out.length - 1].sent.push(line.slice(1).trim());
    else {
      const at = line.indexOf(':');
      let label = line.slice(0, at).trim();
      const words = line.slice(at + 1).trim().split(/\s+/);
      if (label === '!') { out[out.length - 1].irr.push(...words); continue; }
      const syl = label.startsWith('~');
      if (syl) label = label.slice(1).trim();
      out[out.length - 1].groups.push({ label, words, syl, pairs: label === 'pairs' });
    }
  }
  return out;
}
const LESSONS = parseBook(window.PRIMER_BOOK);
const IDX = Object.fromEntries(LESSONS.map((L, i) => [L.n, i]));
// Each word's spelling family, for highlighting review words too.
const FAMILY = {};
for (const L of LESSONS) for (const g of L.groups) for (const w of g.words) if (!(w in FAMILY)) FAMILY[w] = g.label;
// Review lessons practice the words of a span of earlier lessons.
const REVIEW_RANGES = { 10: ['1', '9'], 14: ['1', '13'], 32: ['29', '31'], 56: ['43', '55'], 70: ['58', '69'], 80: ['72', '79'], 96: ['87', '95'] };
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k);

const cur = () => IDX[state.lesson] ?? 0;
const lessonName = i => `Lesson ${LESSONS[i].n}`;
const irrOf = i => uniq([...LESSONS[i].irr, ...(state.extraIrr[LESSONS[i].n] || [])]);
const hidden = w => !!state.hidden[w];
const isIrr = w => LESSONS.some((L, j) => j <= cur() && irrOf(j).includes(w));

// Which lessons' words a lesson practices: its own, or for a sentence or review
// lesson, the word lessons it follows.
function focusOf(i) {
  const L = LESSONS[i], rr = REVIEW_RANGES[L.n];
  if (rr) return uniq([...range(IDX[rr[0]], IDX[rr[1]]).filter(j => LESSONS[j].groups.length), ...(L.groups.length ? [i] : [])]);
  if (L.groups.length) return [i];
  const out = [];
  for (let j = i - 1; j >= 0; j--) {
    const M = LESSONS[j];
    if (REVIEW_RANGES[M.n]) { out.push(...focusOf(j)); continue; }
    if (M.groups.length) out.push(j);
    else if (out.length) break;
  }
  return out.length ? uniq(out) : [i];
}

/* ---------- saved progress ---------- */
function defaultState() {
  return {
    childName: '', lesson: '', size: 'normal', hear: true,
    cards: {}, cleared: 0, recent: {}, famUse: {}, sentSeen: [], hidden: {}, extraIrr: {},
    sessions: [], total: 0, updatedAt: 0,
  };
}
function normalize(s) {
  const d = defaultState();
  if (!s || typeof s !== 'object') return d;
  const out = Object.assign(d, s);
  for (const k of ['cards', 'recent', 'famUse', 'hidden', 'extraIrr']) if (!out[k] || typeof out[k] !== 'object' || Array.isArray(out[k])) out[k] = {};
  for (const k of ['sentSeen', 'sessions']) if (!Array.isArray(out[k])) out[k] = [];
  if (out.lesson && !(out.lesson in IDX)) out.lesson = '';
  if (!['short', 'normal', 'long'].includes(out.size)) out.size = 'normal';
  return out;
}

const LS_KEY = 'toms-primer-v1';
const CODE_KEY = 'toms-primer-sync-code';
const CFG = window.CHALKBOARD_CONFIG || {};
const syncAvailable = !!(CFG.supabaseUrl && CFG.supabaseKey && window.crypto?.subtle);
function loadLocal() { try { const t = localStorage.getItem(LS_KEY); return t ? JSON.parse(t) : null; } catch (e) { return null; } }
function saveLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {} }
let state = normalize(loadLocal());
const sync = { code: '', key: '', status: 'off', lastAt: 0, saving: false, dirty: false, error: '' };
try { sync.code = localStorage.getItem(CODE_KEY) || ''; } catch (e) {}

/* ---------- sync (same Supabase functions as Tom's Chalkboard, its own private key) ---------- */
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function newCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const raw = [...bytes].map(b => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
  return `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8)}`;
}
function cleanCode(c) {
  const raw = String(c).toUpperCase().replace(/[^A-Z0-9]/g, '');
  return raw.length === 12 ? `${raw.slice(0, 4)}-${raw.slice(4, 8)}-${raw.slice(8)}` : '';
}
async function keyFor(code) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('toms-primer:' + code));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
async function rpc(fn, body) {
  const res = await fetch(`${CFG.supabaseUrl}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    // New-style publishable keys (sb_publishable_…) go only in the apikey header; legacy anon JWTs also go in Authorization.
    headers: Object.assign({ apikey: CFG.supabaseKey, 'Content-Type': 'application/json' }, CFG.supabaseKey.startsWith('sb_') ? {} : { Authorization: `Bearer ${CFG.supabaseKey}` }),
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${fn} failed (${res.status})`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
async function pushRemote() {
  if (!sync.key) return;
  if (sync.saving) { sync.dirty = true; return; }
  sync.saving = true;
  try { await rpc('chalkboard_save', { p_key: sync.key, p_data: state }); sync.status = 'ok'; sync.lastAt = Date.now(); sync.error = ''; }
  catch (e) { sync.status = 'error'; sync.error = navigator.onLine === false ? 'offline' : String(e.message || e); }
  sync.saving = false;
  if (screen === 'parent') render();
  if (sync.dirty) { sync.dirty = false; pushRemote(); }
}
async function pullRemote() {
  if (!sync.key) return;
  try {
    const remote = await rpc('chalkboard_get', { p_key: sync.key });
    sync.status = 'ok'; sync.lastAt = Date.now(); sync.error = '';
    if (remote && (remote.updatedAt || 0) > (state.updatedAt || 0)) {
      state = normalize(remote);
      saveLocal();
    } else if (!remote || (state.updatedAt || 0) > (remote.updatedAt || 0)) pushRemote();
  } catch (e) { sync.status = 'error'; sync.error = navigator.onLine === false ? 'offline' : String(e.message || e); }
  if (screen === 'home' || screen === 'parent') render();
}
async function startSync(code) {
  sync.code = code;
  try { localStorage.setItem(CODE_KEY, code); } catch (e) {}
  sync.key = await keyFor(code);
  sync.status = 'syncing';
  await pullRemote();
}
function stopSync() {
  sync.code = ''; sync.key = ''; sync.status = 'off';
  try { localStorage.removeItem(CODE_KEY); } catch (e) {}
}
function save() { state.updatedAt = Date.now(); saveLocal(); pushRemote(); }
function initSync() {
  if (!syncAvailable) return;
  if (sync.code) startSync(sync.code);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') pullRemote(); });
  window.addEventListener('online', () => pullRemote());
}

/* ---------- speech: only after "needed help", so the child sounds words out first ---------- */
const canSpeak = 'speechSynthesis' in window;
const VOICE_KEY = 'toms-primer-voice';
let voices = [];
function loadVoices() {
  try { voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); } catch (e) { voices = []; }
  if (screen === 'parent') render();
}
function savedVoiceName() { try { return localStorage.getItem(VOICE_KEY) || ''; } catch (e) { return ''; } }
const NICE_VOICES = ['Samantha', 'Ava', 'Karen', 'Moira', 'Serena', 'Daniel', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny'];
function chosenVoice() {
  const name = savedVoiceName();
  const exact = name && voices.find(v => v.name === name);
  if (exact) return exact;
  const score = v => (/enhanced|premium|natural/i.test(v.name) ? 0 : 1);
  for (const p of NICE_VOICES) {
    const hits = voices.filter(v => v.name.startsWith(p)).sort((a, b) => score(a) - score(b));
    if (hits.length) return hits[0];
  }
  return null;
}
function say(t) {
  if (!canSpeak || !t) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t), v = chosenVoice();
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = 0.8;
    speechSynthesis.speak(u);
  } catch (e) {}
}
const spokenWord = w => w.split('/').map(plain).join(', ');

/* ---------- building a round ---------- */
const SIZES = { short: { cols: 2, words: 4, sents: 2 }, normal: { cols: 3, words: 5, sents: 3 }, long: { cols: 4, words: 6, sents: 5 } };
const REVIEW_DAYS = [1, 3, 7, 14, 30];
const famKey = (n, label) => `${n}|${label}`;

function sample(list, n) { return shuffle(list).slice(0, n); }
// Keep the book's order inside a family, so the column still reads like a rhyme list.
function sampleInOrder(list, n) { const s = new Set(sample(list, n)); return list.filter(w => s.has(w)); }

function reviewPool(i, focus) {
  const lo = Math.min(...focus), seen = new Set();
  const pool = [];
  for (let j = 0; j < lo; j++) {
    const weight = j >= lo - 25 ? 3 : 1;
    for (const g of LESSONS[j].groups) {
      if (g.syl || g.pairs) continue;
      for (const w of g.words) if (!hidden(w) && !seen.has(w)) { seen.add(w); for (let k = 0; k < weight; k++) pool.push(w); }
    }
    for (const w of irrOf(j)) if (!hidden(w) && !seen.has(w)) { seen.add(w); pool.push(w); }
  }
  return pool;
}

function buildRound() {
  const i = cur(), L = LESSONS[i], focus = focusOf(i), size = SIZES[state.size];
  const sentOnly = !L.groups.length;
  const pages = [];
  const used = new Set();

  // Practice again first: words missed in earlier rounds that are due today, then a few older words.
  const due = Object.entries(state.cards).filter(([, c]) => c.due <= Date.now()).sort((a, b) => a[1].due - b[1].due).map(([w]) => w);
  const rev = due.slice(0, size.words);
  rev.forEach(w => used.add(w));
  for (const w of shuffle(reviewPool(i, focus))) { if (rev.length >= size.words) break; if (!used.has(w)) { rev.push(w); used.add(w); } }
  if (rev.length) pages.push({ type: 'col', kind: 'review', label: due.length ? 'Practice again' : 'Review', items: rev.map(w => ({ w, r: null, card: !!state.cards[w] })) });

  // Families from this lesson, the least-practiced first.
  const fams = focus.flatMap(j => LESSONS[j].groups.map(g => ({ ...g, n: LESSONS[j].n, words: g.words.filter(w => !hidden(w)) }))).filter(g => g.words.length);
  const nCols = sentOnly ? Math.max(1, size.cols - 1) : size.cols;
  const chosen = shuffle(fams).sort((a, b) => (state.famUse[famKey(a.n, a.label)] || 0) - (state.famUse[famKey(b.n, b.label)] || 0)).slice(0, nCols);
  chosen.sort((a, b) => fams.indexOf(a) - fams.indexOf(b));
  for (const g of chosen) {
    const per = g.syl ? 8 : size.words;
    const items = sampleInOrder(g.words, per).filter(w => !used.has(w));
    items.forEach(w => used.add(w));
    if (items.length) pages.push({ type: 'col', kind: g.syl ? 'syl' : g.pairs ? 'pairs' : 'new', label: g.label, n: g.n, items: items.map(w => ({ w, r: null })) });
  }

  // The lesson's irregular words, boxed as in the book.
  const irr = uniq(focus.flatMap(irrOf)).filter(w => !hidden(w) && !used.has(w));
  if (irr.length) pages.push({ type: 'col', kind: 'tricky', label: 'Tricky words', items: sample(irr, size.words).map(w => ({ w, r: null })) });

  // Sentences the book has made readable by now; this lesson's first, then recent ones.
  const nS = sentOnly ? size.sents + 2 : size.sents;
  const seen = new Set(state.sentSeen);
  const pool = [];
  for (let j = 0; j <= i; j++) for (const s of LESSONS[j].sent) {
    const near = j === i || focus.includes(j) ? 8 : j >= i - 12 ? 3 : 0.4;
    pool.push({ s, n: LESSONS[j].n, wt: near * (seen.has(s) ? 0.15 : 1) });
  }
  const sents = [];
  while (sents.length < nS && pool.length) {
    let r = Math.random() * pool.reduce((t, p) => t + p.wt, 0), k = 0;
    while (k < pool.length - 1 && (r -= pool[k].wt) > 0) k++;
    sents.push(pool.splice(k, 1)[0]);
  }
  for (const s of sents) pages.push({ type: 'sent', text: s.s, n: s.n, r: null, flags: [] });

  return { lesson: L.n, pages, p: 0, i: 0, helped: false, focusN: focus.map(j => LESSONS[j].n) };
}

/* ---------- marking ---------- */
let screen = 'home', sess = null, confirmWipe = false, wiped = false, addMsg = '';

function cardResult(w, ok) {
  const c = state.cards[w];
  if (!ok) { state.cards[w] = { box: 0, due: startOfDay() + DAY, misses: (c?.misses || 0) + 1, lesson: state.lesson }; return; }
  if (!c || c.due > Date.now()) return;
  c.box++;
  if (c.box >= REVIEW_DAYS.length) { delete state.cards[w]; state.cleared++; }
  else c.due = startOfDay() + REVIEW_DAYS[c.box] * DAY;
}
function noteLesson(ok) {
  const r = state.recent[state.lesson] || (state.recent[state.lesson] = []);
  r.push(ok ? 1 : 0);
  if (r.length > 40) r.splice(0, r.length - 40);
}
function readyToMoveOn() {
  const r = state.recent[state.lesson] || [];
  return r.length >= 20 && r.filter(Boolean).length / r.length >= 0.9;
}

function page() { return sess.pages[sess.p]; }
function mark(ok) {
  const pg = page();
  if (pg.type === 'col') {
    const it = pg.items[sess.i];
    it.r = ok;
    if (pg.kind !== 'syl') cardResult(it.w, ok);
    if (pg.kind !== 'review') noteLesson(ok);
    if (!ok) { sess.helped = true; render(); if (state.hear) say(spokenWord(it.w)); return; }
  } else {
    pg.r = ok;
    pg.flags.forEach(w => cardResult(w, false));
    if (!ok) { sess.helped = true; render(); return; }
  }
  advance();
}
function advance() {
  sess.helped = false;
  const pg = page();
  if (pg.type === 'col' && sess.i < pg.items.length - 1) sess.i++;
  else if (sess.p < sess.pages.length - 1) { sess.p++; sess.i = 0; }
  else return finish();
  render();
}
function finish() {
  const words = sess.pages.filter(p => p.type === 'col' && p.kind !== 'syl').flatMap(p => p.items);
  const sents = sess.pages.filter(p => p.type === 'sent');
  const missed = uniq([...words.filter(it => it.r === false).map(it => it.w), ...sents.flatMap(p => p.flags)]);
  for (const p of sess.pages) if (p.type === 'col' && p.n) state.famUse[famKey(p.n, p.label)] = (state.famUse[famKey(p.n, p.label)] || 0) + 1;
  state.sentSeen = uniq([...sents.map(p => p.text), ...state.sentSeen]).slice(0, 40);
  const ok = words.filter(it => it.r).length;
  state.total += ok;
  state.sessions.unshift({ d: new Date().toISOString(), lesson: sess.lesson, n: words.length, ok, sn: sents.length, sok: sents.filter(p => p.r).length, missed });
  state.sessions = state.sessions.slice(0, 60);
  sess.summary = { ok, n: words.length, sok: sents.filter(p => p.r).length, sn: sents.length, missed, write: pickWriting() };
  screen = 'done';
  save(); render();
}
// Alpha-Phonics pairs reading with writing: three of today's words to write down.
function pickWriting() {
  const fresh = sess.pages.filter(p => p.type === 'col' && p.kind === 'new').flatMap(p => p.items.map(it => plain(it.w)));
  return sample(fresh.length ? fresh : sess.pages.filter(p => p.type === 'col').flatMap(p => p.items.map(it => plain(it.w.split('/')[0]))), 3);
}

function startRound() { sess = buildRound(); screen = 'play'; render(); }

/* ---------- drawing ---------- */
const app = document.getElementById('app');
const speakerIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path d="M19.5 5.5a9 9 0 0 1 0 13"/></svg>';
const starSvg = on => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1L3.2 9.3l6.1-.9z" fill="${on ? 'var(--yellow)' : 'none'}" stroke="${on ? 'var(--yellow)' : 'var(--chalk-dim)'}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
function fmtDate(iso) { try { return new Date(iso).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }); } catch (e) { return ''; } }

// Shown only after "needed help": the spelling pattern of the word's family, in yellow chalk.
function highlight(w, label) {
  const word = plain(w), lab = (label || '').toLowerCase();
  const m = lab.match(/^([aeiou])-e$/);
  if (m) {
    const v = word.match(new RegExp(`^(.*)(${m[1]})([^aeiou]+)(e)$`, 'i'));
    if (v) return `${esc(v[1])}<span class="hl">${esc(v[2])}</span>${esc(v[3])}<span class="hl">${esc(v[4])}</span>`;
  }
  const pat = lab.replace(/ end$/, '').replace(/[^a-z']/g, '');
  const at = pat && pat.length <= 4 ? word.toLowerCase().lastIndexOf(pat) : -1;
  if (at < 0) return esc(word);
  return `${esc(word.slice(0, at))}<span class="hl">${esc(word.slice(at, at + pat.length))}</span>${esc(word.slice(at + pat.length))}`;
}
function wordHtml(it, pg, now) {
  const w = it.w;
  if (pg.kind === 'pairs') return `<span class="pair">${w.split('/').map(x => `<span>${esc(x)}</span>`).join('')}</span>`;
  const body = now && sess.helped ? highlight(w, pg.kind === 'new' ? pg.label : FAMILY[w]) : esc(plain(w));
  const syl = now && w.includes('-') ? `<span class="syl">${esc(w)}</span>` : '';
  return pg.kind === 'tricky' || (pg.kind === 'review' && isIrr(w)) ? `${syl}<span class="boxed">${body}</span>` : `${syl}${body}`;
}

function renderHome() {
  const i = state.lesson ? cur() : -1;
  const today = new Date().toDateString();
  const todayN = state.sessions.filter(s => new Date(s.d).toDateString() === today).reduce((t, s) => t + s.ok, 0);
  const due = Object.values(state.cards).filter(c => c.due <= Date.now()).length;
  if (!childName() || i < 0) return `
  <header class="top"><h1>${esc(greet('Hello'))}</h1><button class="link" data-act="parent">For grown-ups</button></header>
  <form class="name-form" id="setup-form">
    <p class="meta">This primer follows Alpha-Phonics by Samuel Blumenfeld, lesson by lesson. A grown-up sits alongside and marks each word as it is read aloud.</p>
    <label for="child-name">Who's reading?</label>
    <input id="child-name" class="pick name-input" maxlength="24" value="${esc(state.childName)}" autocomplete="off" required>
    <label for="setup-lesson">Which lesson is the book on?</label>
    ${lessonSelect('setup-lesson', i < 0 ? 0 : i)}
    <div class="row-btns"><button class="start" type="submit">Let's read</button></div>
  </form>`;
  const L = LESSONS[i];
  const prev = focusOf(i).flatMap(j => LESSONS[j].groups.filter(g => !g.syl).flatMap(g => g.words)).filter(w => !hidden(w));
  return `
  <header class="top"><h1>${esc(greet('Hello'))}</h1><button class="link" data-act="parent">For grown-ups</button></header>
  <section class="lesson-card">
    <span class="num">${lessonName(i)}</span>
    <span class="title">${esc(L.title)}</span>
    ${prev.length ? `<div class="preview" aria-label="Some words from this lesson">${sample(prev, 6).map(w => `<span>${esc(plain(w.split('/')[0]))}</span>`).join('')}</div>` : ''}
  </section>
  <button class="start" data-act="start">Start reading</button>
  <p class="meta">${due ? `${due} word${due === 1 ? '' : 's'} to practice again today. ` : ''}${todayN ? `${todayN} words read today. ` : ''}${state.total} words read since the start.</p>`;
}

function lessonSelect(id, sel) {
  return `<select id="${id}" class="pick lesson-pick">${LESSONS.map((L, j) => `<option value="${esc(L.n)}" ${j === sel ? 'selected' : ''}>${esc(L.n)}. ${esc(L.title)}</option>`).join('')}</select>`;
}

function renderPlay() {
  const pg = page();
  const ticks = sess.pages.map((p, j) => {
    let cls = j === sess.p ? 'now' : '';
    if (j < sess.p) { const rs = p.type === 'col' ? p.items.map(it => it.r) : [p.r]; cls = rs.every(Boolean) ? 'done' : 'some'; }
    return `<span class="${cls}"></span>`;
  }).join('');
  const label = pg.type === 'sent' ? 'Read the sentence' : pg.kind === 'review' ? pg.label : pg.kind === 'tricky' ? 'Tricky words' : pg.kind === 'syl' ? 'Syllables' : `Lesson ${pg.n}`;
  let body, buttons;
  if (pg.type === 'col') {
    const head = pg.kind === 'review' ? `<span class="fam review">${esc(pg.label)}</span>` : pg.kind === 'tricky' ? `<span class="fam tricky">Read carefully: these don't follow the rule</span>` : /^[a-z' -]{1,6}$/i.test(pg.label) && !['pairs', 'in', 'a', 'I'].includes(pg.label) ? `<span class="fam">${esc(pg.label.replace(/ end$/, ''))}</span>` : '';
    body = `${head}<ol class="col">${pg.items.map((it, j) => {
      const now = j === sess.i;
      const cls = now ? 'now' : it.r === true ? 'ok' : it.r === false ? 'miss' : '';
      const markTxt = it.r === true ? '✓' : it.r === false ? '•' : '';
      return `<li class="${cls}"><span class="arrow" aria-hidden="true">▸</span><span class="w">${wordHtml(it, pg, now)}</span><span class="mark" aria-hidden="true">${now ? '' : markTxt}</span></li>`;
    }).join('')}</ol>`;
    buttons = sess.helped
      ? `<p class="hint">${pg.kind === 'tricky' ? 'A tricky word: say it together, then read it again.' : 'Sound it out together, letter by letter.'}</p>
         <div class="mark-row">${canSpeak && state.hear ? `<button class="say" data-act="hear">${speakerIcon} Hear it</button>` : ''}<button class="yes" data-act="next" id="next">Next</button></div>`
      : `<div class="mark-row"><button class="yes" data-act="yes" id="yes">✓ Read it</button><button class="helped" data-act="help">Needed help</button></div>
         ${sess.p === 0 && sess.i === 0 ? '<p class="grownup-tip">Grown-up: tap ✓ when the word is read aloud without help.</p>' : ''}`;
  } else {
    const toks = pg.text.split(/\s+/);
    body = `<p class="sentence ${pg.r ? 'done-s' : ''}">${toks.map((t, j) => {
      const raw = t.replace(/^[^A-Za-z']+|[^A-Za-z']+$/g, ''), w = raw in FAMILY || isIrr(raw) ? raw : raw.toLowerCase();
      return `<button class="tok ${pg.flags.includes(w) ? 'flag' : ''}" data-act="flag" data-w="${esc(w)}">${esc(t)}</button>`;
    }).join(' ')}</p>`;
    buttons = sess.helped
      ? `<div class="mark-row">${canSpeak && state.hear ? `<button class="say" data-act="hear">${speakerIcon} Hear it</button>` : ''}<button class="yes" data-act="next" id="next">Next</button></div>`
      : `<div class="mark-row"><button class="yes" data-act="yes" id="yes">✓ Read it</button><button class="helped" data-act="help">Needed help</button></div>
         <p class="grownup-tip">Tap any word that tripped them up. It will come back for practice.</p>`;
  }
  return `
  <div class="play-top">
    <div class="ticks" aria-label="Page ${sess.p + 1} of ${sess.pages.length}">${ticks}</div>
    <span class="page-label">${esc(label)}</span>
  </div>
  <div class="page" id="page">${body}</div>
  ${buttons}
  <button class="link" data-act="home" style="align-self:flex-start">Stop and go home</button>`;
}

const CHEERS = [
  ['Splendid reading', 'Every letter pulled its weight today.'],
  ['Well read', 'Those words had nowhere to hide.'],
  ['Bravo', 'Sound by sound, word by word.'],
  ['Hooray', 'The chalkboard is impressed.'],
];
const KEEP_GOING = [
  ['Good work', 'Hard words are how reading grows. They will come back to practice.'],
  ['Well done for sticking with it', 'Tricky ones today; easier ones tomorrow.'],
];
function renderDone() {
  const s = sess.summary, all = s.n + s.sn, good = s.ok + s.sok;
  if (!s.cheer) s.cheer = shuffle(good / Math.max(1, all) >= 0.8 ? CHEERS : KEEP_GOING)[0];
  const stars = sess.pages.map(p => p.type === 'col' ? p.items.every(it => it.r) : p.r);
  return `
  <h1>${esc(greet(s.cheer[0]))}</h1>
  <p class="cheer">${esc(s.cheer[1])}</p>
  <div class="stars">${stars.map(starSvg).join('')}</div>
  <p class="meta">${s.ok} of ${s.n} words and ${s.sok} of ${s.sn} sentences read without help.</p>
  ${s.missed.length ? `<section><h2>Coming back tomorrow</h2><div class="done-words">${s.missed.map(w => `<span class="miss">${esc(plain(w.split('/')[0]))}</span>`).join('')}</div></section>` : ''}
  ${s.write.length ? `<section class="write"><h2>Now write</h2><p class="note">On paper or a slate: a grown-up says each word, and the reader writes it, saying each sound. Then check it together.</p><div class="words">${s.write.map(w => `<span>${esc(w)}</span>`).join('')}</div></section>` : ''}
  ${readyToMoveOn() ? `<p class="note ready">Grown-up: almost every word in this lesson is read without help. When the book lesson is done, move on from the grown-ups page.</p>` : ''}
  <div class="row-btns"><button class="start" data-act="start">Read again</button><button class="ghost" data-act="home">Home</button></div>`;
}

function renderParent() {
  const i = cur(), L = LESSONS[i], next = LESSONS[i + 1];
  const r = state.recent[state.lesson] || [];
  const focus = focusOf(i);
  const fams = focus.flatMap(j => LESSONS[j].groups.map(g => ({ ...g, n: LESSONS[j].n })));
  const extra = state.extraIrr[L.n] || [];
  const cards = Object.entries(state.cards).sort((a, b) => a[1].due - b[1].due);
  const when = d => { const days = Math.round((d - startOfDay()) / DAY); return days <= 0 ? 'today' : days === 1 ? 'tomorrow' : `in ${days} days`; };
  const sizeNames = { short: 'Short', normal: 'Normal', long: 'Long' };
  return `
  <header class="top"><h1>For grown-ups</h1><button class="ghost" data-act="home">${childName() ? `Back to ${esc(childName())}` : 'Back'}</button></header>
  <section>
    <h2>Lesson</h2>
    ${lessonSelect('lesson-pick', i)}
    ${next ? `<div class="row-btns"><button class="ghost" data-act="next-lesson">Move on to lesson ${esc(next.n)}</button><span class="note">${esc(next.title)}</span></div>` : ''}
    <p class="note">${r.length ? `${r.filter(Boolean).length} of the last ${r.length} lesson words read without help.` : 'No words read in this lesson yet.'} ${readyToMoveOn() ? '<span class="ready">Ready to move on once the book lesson is done.</span>' : ''}</p>
    <p class="note">The app never moves ahead on its own. Teach each new lesson from the book first, then set it here.</p>
    ${L.note ? `<p class="tutor">${esc(L.note)}</p>` : ''}
  </section>
  <section>
    <h2>Words in this round's lesson</h2>
    <p class="note">${focus.length > 1 || focus[0] !== i ? `Lesson ${esc(L.n)} has no new words, so rounds use the words from lesson${focus.length > 1 ? 's' : ''} ${focus.map(j => LESSONS[j].n).join(', ')}. ` : ''}Tap a word to leave it out of rounds; tap again to bring it back.</p>
    ${fams.map(g => `<div class="fam-row"><strong>${esc(g.syl ? 'syllables' : g.label)}</strong><div class="chips">${g.words.map(w => `<button class="chip ${hidden(w) ? 'off' : ''}" data-act="hide" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div></div>`).join('')}
  </section>
  <section>
    <h2>Tricky (boxed) words</h2>
    <p class="note">Irregular words appear in boxes, as in the book. These come from the teacher's notes. Add any other boxed words from lesson ${esc(L.n)}'s page: they'll show up in this lesson's rounds and in review afterwards.</p>
    <div class="chips">${L.irr.map(w => `<button class="chip irr ${hidden(w) ? 'off' : ''}" data-act="hide" data-w="${esc(w)}">${esc(w)}</button>`).join('')}${extra.map(w => `<button class="chip irr" data-act="unbox" data-w="${esc(w)}" aria-label="Remove ${esc(w)}">${esc(w)}<small>×</small></button>`).join('')}${!L.irr.length && !extra.length ? '<span class="note">None yet for this lesson.</span>' : ''}</div>
    <form class="row-btns" id="box-form"><input id="box-words" class="pick" placeholder="said, again" autocomplete="off" autocapitalize="none" spellcheck="false"><button class="ghost" type="submit">Add</button>${addMsg ? `<span class="note">${esc(addMsg)}</span>` : ''}</form>
  </section>
  <section>
    <h2>Practice again</h2>
    <p class="note">A word that needed help comes back the next day, then after 3, 7, 14 and 30 days while it keeps being read without help.${state.cleared ? ` ${state.cleared} learned for good so far.` : ''}</p>
    ${cards.length ? `<ul class="list">${cards.slice(0, 20).map(([w, c]) => `<li><span>${esc(plain(w))} <button class="link" data-act="drop-card" data-w="${esc(w)}">remove</button></span><span>${when(c.due)} · step ${c.box + 1} of ${REVIEW_DAYS.length}</span></li>`).join('')}</ul>${cards.length > 20 ? `<p class="note">and ${cards.length - 20} more</p>` : ''}` : '<p class="note">Nothing yet.</p>'}
  </section>
  <section>
    <h2>Recent rounds</h2>
    ${state.sessions.length ? `<ul class="list">${state.sessions.slice(0, 8).map(s => `<li><span>${fmtDate(s.d)} · lesson ${esc(s.lesson)}${s.missed.length ? ` · needed help: ${s.missed.slice(0, 5).map(w => esc(plain(w))).join(', ')}` : ''}</span><span>${s.ok}/${s.n} words · ${s.sok}/${s.sn} sentences</span></li>`).join('')}</ul>` : '<p class="note">No rounds yet.</p>'}
  </section>
  <section>
    <h2>Settings</h2>
    <form class="name-form" id="name-form"><label for="child-name">Reader's name</label><div class="row-btns"><input id="child-name" class="pick name-input" maxlength="24" value="${esc(state.childName)}" autocomplete="off"><button class="ghost" type="submit">Save</button></div></form>
    <div class="row-btns"><span>Round length</span><div class="seg">${Object.keys(SIZES).map(k => `<button data-act="size" data-v="${k}" aria-pressed="${state.size === k}">${sizeNames[k]}</button>`).join('')}</div></div>
    <p class="note">${{ short: 'About 15 words and 2 sentences.', normal: 'About 20 words and 3 sentences.', long: 'About 30 words and 5 sentences.' }[state.size]} Sentence lessons swap a word column for more sentences.</p>
    ${canSpeak ? `<div class="row-btns"><span>“Hear it” after help</span><div class="seg"><button data-act="hear-set" data-v="1" aria-pressed="${state.hear}">On</button><button data-act="hear-set" data-v="0" aria-pressed="${!state.hear}">Off</button></div></div>
    <p class="note">Words are never read out before the child tries them. Sounding out comes first; the voice only plays after “Needed help”.</p>
    <div class="row-btns"><label for="voice">Voice</label>
      <select id="voice" class="pick">${['', ...voices.map(v => v.name)].map(nm => `<option value="${esc(nm)}" ${nm === savedVoiceName() ? 'selected' : ''}>${nm ? esc(nm) : `Automatic${chosenVoice() ? ` (${esc(chosenVoice().name)})` : ''}`}</option>`).join('')}</select></div>` : ''}
  </section>
  <section>
    <h2>Paper practice</h2>
    <p class="note">Print a round to read away from the screen: word columns, sentences, and a page of words for dictation.</p>
    <div class="row-btns"><button class="ghost" data-act="print">Print a paper round</button></div>
  </section>
  ${renderSync()}
  <section>
    <h2>Start over</h2>
    <p class="note">Clears the practice-again list, scores and recent rounds. Keeps the name, lesson, added boxed words and settings.</p>
    <div class="row-btns">${confirmWipe ? `<button class="ghost danger" data-act="wipe-yes">Yes, erase progress</button><button class="link" data-act="wipe-no">Cancel</button>` : `<button class="ghost danger" data-act="wipe">Reset progress</button>`}</div>
    ${wiped ? '<p class="note">Progress cleared.</p>' : ''}
  </section>
  <p class="note">Lesson order and titles follow <em>Alpha-Phonics: A Primer for Beginning Readers</em> by Samuel L. Blumenfeld. Practice words and sentences are written for this app, using only what each lesson has taught. Use it alongside the book, not instead of it.</p>`;
}

function renderSync() {
  if (!syncAvailable) return '';
  if (!sync.code) return `
  <section>
    <h2>Sync between devices</h2>
    <p class="note">Progress is saved on this device. Turn on sync to share it with another iPad, phone or laptop.</p>
    <div class="row-btns"><button class="ghost" data-act="sync-new">Turn on sync</button></div>
    <div class="row-btns">
      <label for="join-code">Already have a code?</label>
      <input id="join-code" class="pick code-input" placeholder="ABCD-EFGH-JKMN" autocomplete="off" autocapitalize="characters" spellcheck="false">
      <button class="ghost" data-act="sync-join">Join</button>
    </div>
    ${sync.error === 'bad-code' ? '<p class="note danger-text">That code should be 12 letters and numbers, like ABCD-EFGH-JKMN.</p>' : ''}
  </section>`;
  const when = sync.lastAt ? new Date(sync.lastAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : '';
  const status = sync.status === 'ok' ? `Synced${when ? ' at ' + when : ''}.`
    : sync.status === 'syncing' ? 'Syncing…'
    : sync.error === 'offline' ? 'Offline. Progress is safe on this device and will sync when you are back online.'
    : `Could not sync (${esc(sync.error)}). Progress is safe on this device.`;
  return `
  <section>
    <h2>Sync between devices</h2>
    <p class="note">Type this code into the grown-ups page on another device. Keep it private.</p>
    <div class="row-btns"><strong class="sync-code" id="sync-code">${esc(sync.code)}</strong><button class="ghost" data-act="sync-copy">Copy</button></div>
    <p class="note">${status}</p>
    <div class="row-btns"><button class="ghost" data-act="sync-now">Sync now</button><button class="link" data-act="sync-off">Stop syncing on this device</button></div>
  </section>`;
}

function printRound() {
  const r = buildRound();
  const cols = r.pages.filter(p => p.type === 'col');
  const dict = sample(cols.filter(p => p.kind === 'new').flatMap(p => p.items.map(it => plain(it.w))), 6);
  document.getElementById('print').innerHTML = `
  <div class="pp-head"><h1>${esc(childName() || 'Reading')} · Lesson ${esc(r.lesson)}</h1><span>${new Date().toLocaleDateString()}</span></div>
  <div class="pp-cols">${cols.map(p => `<div class="pp-col">${p.kind === 'new' && p.label.length <= 6 ? `<span class="fam">${esc(p.label)}</span>` : ''}${p.items.map(it => `<span>${p.kind === 'tricky' ? `<span class="boxed">${esc(plain(it.w))}</span>` : esc(it.w.split('/').map(plain).join('   '))}</span>`).join('')}</div>`).join('')}</div>
  <ol class="pp-sent">${r.pages.filter(p => p.type === 'sent').map(p => `<li>${esc(p.text)}</li>`).join('')}</ol>
  ${dict.length ? `<div class="pp-dict"><h2>Dictation</h2><p>Grown-up: say each word. The reader writes it on the line.</p><ol>${dict.map(w => `<li>${esc(w)}<span class="pp-line"></span></li>`).join('')}</ol></div>` : ''}`;
  window.print();
}

function render() {
  app.innerHTML = screen === 'play' ? renderPlay() : screen === 'done' ? renderDone() : screen === 'parent' ? renderParent() : renderHome();
  if (screen === 'play') (document.getElementById('next') || document.getElementById('yes'))?.focus({ preventScroll: true });
}

/* ---------- events ---------- */
app.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const act = b.dataset.act, w = b.dataset.w;
  if (act === 'start') startRound();
  else if (act === 'yes') mark(true);
  else if (act === 'help') mark(false);
  else if (act === 'next') advance();
  else if (act === 'hear') { const pg = page(); say(pg.type === 'col' ? spokenWord(pg.items[sess.i].w) : pg.text); }
  else if (act === 'flag') { const pg = page(); if (!w) return; pg.flags = pg.flags.includes(w) ? pg.flags.filter(x => x !== w) : [...pg.flags, w]; render(); }
  else if (act === 'home') { screen = 'home'; confirmWipe = false; wiped = false; addMsg = ''; render(); }
  else if (act === 'parent') { screen = 'parent'; render(); }
  else if (act === 'next-lesson') { const nx = LESSONS[cur() + 1]; if (nx) { state.lesson = nx.n; save(); render(); } }
  else if (act === 'hide') { if (state.hidden[w]) delete state.hidden[w]; else state.hidden[w] = true; save(); render(); }
  else if (act === 'unbox') { const n = state.lesson; state.extraIrr[n] = (state.extraIrr[n] || []).filter(x => x !== w); if (!state.extraIrr[n].length) delete state.extraIrr[n]; addMsg = ''; save(); render(); }
  else if (act === 'drop-card') { delete state.cards[w]; save(); render(); }
  else if (act === 'size') { state.size = b.dataset.v; save(); render(); }
  else if (act === 'hear-set') { state.hear = b.dataset.v === '1'; save(); render(); }
  else if (act === 'print') printRound();
  else if (act === 'sync-new') { startSync(newCode()); render(); }
  else if (act === 'sync-join') {
    const code = cleanCode(document.getElementById('join-code')?.value || '');
    if (!code) { sync.error = 'bad-code'; render(); return; }
    sync.error = ''; startSync(code); render();
  }
  else if (act === 'sync-now') { sync.status = 'syncing'; render(); pullRemote(); }
  else if (act === 'sync-off') { stopSync(); render(); }
  else if (act === 'sync-copy') {
    navigator.clipboard?.writeText(sync.code).then(() => { b.textContent = 'Copied'; }, () => {
      const rg = document.createRange(); rg.selectNodeContents(document.getElementById('sync-code'));
      const sel = getSelection(); sel.removeAllRanges(); sel.addRange(rg);
    });
  }
  else if (act === 'wipe') { confirmWipe = true; wiped = false; render(); }
  else if (act === 'wipe-no') { confirmWipe = false; render(); }
  else if (act === 'wipe-yes') {
    const keep = { childName: state.childName, lesson: state.lesson, size: state.size, hear: state.hear, hidden: state.hidden, extraIrr: state.extraIrr };
    state = Object.assign(defaultState(), keep);
    confirmWipe = false; wiped = true; sess = null;
    save(); render();
  }
});
app.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'setup-form') {
    state.childName = (document.getElementById('child-name')?.value || '').trim().slice(0, 24);
    state.lesson = document.getElementById('setup-lesson').value;
  } else if (e.target.id === 'name-form') {
    state.childName = (document.getElementById('child-name')?.value || '').trim().slice(0, 24);
  } else if (e.target.id === 'box-form') {
    const words = (document.getElementById('box-words').value || '').split(/[\s,]+/).map(s => s.trim()).filter(s => /^[A-Za-z'’-]+$/.test(s)).map(s => s.replace('’', "'"));
    if (!words.length) return;
    const n = state.lesson;
    state.extraIrr[n] = uniq([...(state.extraIrr[n] || []), ...words]);
    addMsg = `Added ${words.join(', ')}.`;
  } else return;
  save(); render();
});
app.addEventListener('change', e => {
  if (e.target.id === 'lesson-pick') { state.lesson = e.target.value; addMsg = ''; save(); render(); return; }
  if (e.target.id !== 'voice') return;
  try { if (e.target.value) localStorage.setItem(VOICE_KEY, e.target.value); else localStorage.removeItem(VOICE_KEY); } catch (err) {}
  render();
  say('How does this voice sound?');
});
// Keyboard for grown-ups on a laptop: Enter or → marks read; H or Backspace marks "needed help".
document.addEventListener('keydown', e => {
  if (screen !== 'play' || e.target.closest?.('input, select')) return;
  if (sess.helped) { if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); advance(); } return; }
  if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); mark(true); }
  else if (e.key === 'h' || e.key === 'H' || e.key === 'Backspace') { e.preventDefault(); mark(false); }
});

render();
initSync();
if (canSpeak) { loadVoices(); try { speechSynthesis.addEventListener('voiceschanged', loadVoices); } catch (e) {} }
