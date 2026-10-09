# Tom's Primer

Reading practice that follows *Alpha-Phonics: A Primer for Beginning Readers* by Samuel L. Blumenfeld, lesson by lesson, on the same chalkboard as Tom's Chalkboard. The child's name is set on first use, so friends can use it too.

- The child reads word columns and sentences aloud; a grown-up taps **✓ Read it** or **Needed help**.
- Words come only from lessons the book has already taught. Irregular words are boxed, as in the book. No pictures.
- The app never moves ahead on its own: teach each lesson from the book, then set it on the grown-ups page.
- Words that needed help come back after 1, 3, 7, 14 and 30 days.
- Each round ends with three words to write. A printable paper round includes a dictation page.

Lesson order and titles follow the book. The practice words and sentences are written for this app, not copied from it. To check that every sentence uses only what its lesson has taught:

```bash
python3 tools/check_book.py
```

## Run it

A static site with no build step:

```bash
python3 -m http.server 8781
```

On an iPad or iPhone, open the site in Safari and tap **Share → Add to Home Screen**.

## Sync

Uses the same Supabase functions as Tom's Chalkboard (`chalkboard_get` / `chalkboard_save`), stored under its own private key, so no extra tables are needed. Turn it on from the grown-ups page.

## Updating

Lesson content lives in `lessons.js`. After changing files, bump `VERSION` in `sw.js` so installed copies pick up the change.
