#!/usr/bin/env python3
"""Check lessons.js against the Alpha-Phonics order.

1. Every word in a sentence must be known by that sentence's lesson
   (taught in that lesson or an earlier one, or a regular ending of such a word).
2. Every practice word must use only spellings the book has taught by its lesson.

Run: python3 tools/check_book.py
"""
import re, sys, pathlib

SRC = (pathlib.Path(__file__).resolve().parent.parent / 'lessons.js').read_text()
TEXT = SRC.split('`')[1]


def lesson_key(n):
    return float(n.replace('a', '.5'))


lessons = []
for line in TEXT.splitlines():
    line = line.strip()
    if not line:
        continue
    if line.startswith('#'):
        num, title = [s.strip() for s in line[1:].split('|', 1)]
        lessons.append({'n': num, 'k': lesson_key(num), 'title': title, 'groups': [], 'irr': [], 'sent': []})
    elif line.startswith('?'):
        continue
    elif line.startswith('>'):
        lessons[-1]['sent'].append(line[1:].strip())
    else:
        label, words = line.split(':', 1)
        words = words.split()
        if label.strip() == '!':
            lessons[-1]['irr'] += words
        else:
            lessons[-1]['groups'].append((label.strip(), words))

# Grapheme rules: (regex on the plain lowercase word, lesson where the book teaches it)
RULES = [
    (r'h', 2), (r'[dw]', 4), (r'l', 7), (r'[bcgjf]', 8), (r'[prvyz]', 9), (r'ck|qu', 11), (r'(?<!c)k', 14),
    (r'[eio]', 15), (r'(?<!q)u', 15), (r'ph', 19), (r'th', 21), (r'sh', 29), (r'ch', 30), (r'wh', 31),
    (r"n't", 36), (r'ng', 41), (r'nt$', 43), (r'er', 45), (r'n[kc]$|nch$', 46), (r'(ct|ft|pt|xt)$', 48),
    (r'(sk|sp|st)$', 49), (r'l[bdfk]$', 50), (r'l[mpt]$', 51), (r'mp$', 52), (r'tch', 53), (r'dge', 54), (r'n[cs]e$', 55),
    (r'^bl|^br', 58), (r'^cl|^cr', 59), (r'^dr|^dw', 60), (r'^fl|^fr', 61), (r'^gl|^gr|^gw', 62), (r'^pl|^pr', 63),
    (r'^sl', 64), (r'^shr|^sm|^sn', 65), (r'^sp', 66), (r'^st', 67), (r'^sw|^sc|^sk', 68), (r'^tr|^thr|^tw', 69),
    (r'(?<![aeiou])a[^aeiouy]e$', 72), (r'ai', 75), (r'ay|ey$', 77), (r'ei', 79), (r'au|aw', 83), (r'ar', 85),
    (r'ee', 87), (r'ea', 89), (r'(?<![aeiou])e[^aeiouy]e$', 91), (r'ie', 92), (r'[^aeiou]y$', 93), (r'ies$', 95),
    (r'(?<![aeiou])i[^aeiouy]e$', 98), (r'(?<!e)igh', 100), (r'ough|augh', 101), (r'(?<![aeiou])o[^aeiouy]e$', 103), (r'oa', 105), (r'ow', 106),
    (r'ol[dt]$|oll$|ost$', 107), (r'oo', 109), (r'ould', 111), (r'ou(?!gh|ld)', 112), (r'oy|oi', 114), (r'(?<![aeiouq])u[^aeiouy]e$', 115),
    (r'(?<!q)u[ei]', 116), (r'ew|eu', 117), (r'ir(?!e$)|(?<![oq])ur(?!e$)|or(?!e$)|ear[nltcd]', 118), (r'[^aeiou]le$', 119), (r'stle$', 119), (r'tion|sion|cial|cious|sure|ture|cean', 121),
    (r'^kn', 122), (r'mb$|bt$', 123), (r'^gh|^rh', 124), (r'^wr', 125), (r'sten$|ften$', 126), (r'^chr|^chor(?!e)|^ps|chool|^ech|mach|^char[ab]|orch', 127),
    (r'[^aeiou]y[^aeiouw]|^gym', 128),
]
# Spellings the rules can't see (or misread), checked by hand.
OK_ANYWAY = {'the', 'she', 'he', 'me', 'we', 'be', 'a', 'I', 'have', 'are', 'there', 'where', 'were', 'gone', 'done', 'one', 'come', 'some',
             'none', 'once', 'love', 'dove', 'glove', 'shove', 'move', 'whole', 'give', 'live', 'awe', 'ache', 'doll', "aren't", "weren't", 'thyme', 'eye', 'into'}


def needs(word):
    best, why = 1, 'a'
    for w in word.lower().split('-'):
        for pat, n in RULES:
            if re.search(pat, w) and n > best:
                best, why = n, pat
    return best, why


errors = []
seen = []
for L in lessons:
    for label, words in L['groups']:
        if label.startswith('~'):
            continue
        for tok in words:
            for w in tok.split('/'):
                if w in OK_ANYWAY:
                    continue
                n, why = needs(w)
                if n > L['k']:
                    errors.append(f"Lesson {L['n']}: word '{w}' uses /{why}/ (lesson {n})")

# Vocabulary by lesson
base = {}  # word -> lesson key where known


def add(w, k):
    w = w.lower().replace('-', '')
    if w not in base or base[w] > k:
        base[w] = k


for L in lessons:
    for label, words in L['groups']:
        if label.startswith('~'):
            continue
        for tok in words:
            for w in tok.split('/'):
                add(w, L['k'])
    for w in L['irr']:
        add(w, L['k'])


def known_at(word):
    """Earliest lesson where this word (or a regular ending of a known word) can be read."""
    w = word.lower()
    cands = []
    if w in base:
        cands.append(base[w])

    def stem(s, k_end):
        if s in base:
            cands.append(max(base[s], k_end))
    if w.endswith("'s"):
        stem(w[:-2], 25)
    if w.endswith('s'):
        stem(w[:-1], 25)
    if w.endswith('es'):
        stem(w[:-2], 25)
    if w.endswith('ies'):
        stem(w[:-3] + 'y', 95)
    for suf, k in (('ing', 41), ('er', 45), ('ed', 97)):
        if w.endswith(suf):
            s = w[:-len(suf)]
            stem(s, k)
            stem(s + 'e', max(k, 72))
            if len(s) > 2 and s[-1] == s[-2]:
                stem(s[:-1], k)
    if w.endswith('ly'):
        stem(w[:-2], 93)
    return min(cands) if cands else None


for L in lessons:
    for s in L['sent']:
        for raw in re.findall(r"[A-Za-z][A-Za-z'’]*", s):
            raw = raw.replace('’', "'")
            k = known_at(raw)
            if k is None:
                errors.append(f"Lesson {L['n']}: '{raw}' is not taught anywhere — in: {s}")
            elif k > L['k']:
                errors.append(f"Lesson {L['n']}: '{raw}' is not taught until lesson {k:g} — in: {s}")

print(f"{len(lessons)} lessons, {len(base)} words, {sum(len(L['sent']) for L in lessons)} sentences")
for e in errors:
    print(' ✗', e)
sys.exit(1 if errors else 0)
