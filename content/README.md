# Content pipeline

The concept library lives in `praxis-concept-library.xlsx`. Everything in this
folder beside it is either the tool that reads it or the JSON it produces.

## The loop

1. Edit the library in Google Sheets.
2. **File → Download → Microsoft Excel (.xlsx)**.
3. Upload it into this folder on GitHub, replacing the existing file.
4. The **Export content library** workflow runs on its own. Watch the Actions tab.
5. Green → `concepts.json`, `books.json` and `index.json` are committed.
   Red → open the run; the errors are on its summary page in plain language.
6. Publish from GoDaddy.

Nothing here needs to run on anyone's laptop.

## What ships

Only rows with status **Done**. Stubs and drafts stay invisible to the site, so
the library can be authored in the open.

## What the export refuses

It writes nothing at all if any Done row:

- is missing a required field for its tier
- uses a Domain, Type, Difficulty or Identity Tag that is not on the Vocabulary sheet
- points at a Book ID that does not exist
- is Discovery tier but carries a Praxis Exercise
- has a Discriminate Scenario containing its own concept name
- has a Mechanism with no `->` arrows, so Map It cannot be generated

Warnings never block. The common one is a Related Concept pointing at a row that
is still a stub — that edge appears on its own once the row is finished.

## Files

| File | What it is |
| --- | --- |
| `praxis-concept-library.xlsx` | The authoring workbook. A snapshot of the Sheet, not the master. |
| `export_library.py` | Reads the workbook, validates it, writes the JSON. |
| `concepts.json` | Finished concepts. Keyed by Praxis ID (`01.01`). |
| `books.json` | The 133 books, each with the concepts that reference it. |
| `index.json` | Counts, identity → concept map, domain → concept map, scenario pool. |

## Not yet wired

`site/index.html` still carries its own inline `DATA` array. These JSON files are
produced but nothing reads them yet — connecting the site to them is a separate
change.
