# PRD — Abel & Merlyn Wedding Invitation

## Original Problem Statement
Bespoke, one-page (smooth-scroll) royal Kerala Christian wedding invitation for Abel Thomas Koshy & Merlyn Grace George. Maximalist, ornate, densely animated illuminated-manuscript aesthetic — gold leaf, jewel tones, filigree. Explicitly avoid AI-wedding-site cliches. Denomination (Syriac Orthodox Malankara) felt through motifs only, never stated.

## Architecture
- Frontend: React (CRA + craco), Tailwind, framer-motion, Lenis smooth scroll, embla carousel. All content in `src/config/weddingConfig.js`.
- Backend: FastAPI + MongoDB (motor). Routes under `/api`.
- Admin gate: password via `ADMIN_PASSWORD` env, sent as `X-Admin-Password` header.

## User Personas
- Guest (mobile, WhatsApp link): reads invite, RSVPs, plays inline games, leaves a blessing.
- Couple/Admin: reviews RSVPs and moderates blessings at `/admin`.

## Core Requirements (static)
- One-page narrative: Hero → Invitation (Hosea 2:19-20) → Couple → Journey (Engagement/Wedding/Reception) → Countdown → Dress Code → Gallery → 3 inline games → RSVP → Guestbook → Contact → Livestream → Footer.
- Site-wide motifs: custom gold cursor, mouse parallax, Golden Thread scroll progress, Two Rings converging, config-driven sticky nav.
- Add-to-Calendar per event (Google URL + .ics). Google Maps links + Plus Codes.

## Implemented (2026-06)
- All 13 sections + both scroll motifs + custom cursor + Lenis. (Verified 100% by testing agent, iteration_1.)
- Hero monogram seal reveal (self-drawing rope circle + light-sweep).
- Journey scroll-scrubbed gold rope path; 3 events with Maps + Add-to-Calendar menu (Google/Apple).
- 3 inline games: The Crowning (drag/tap), Light the Lamps (progressive verse reveal, Song of Solomon 8:6-7), SVG clip-path Jigsaw (date reveal).
- RSVP (Name + Guest Count) with crown confirmation, stored in Mongo. Guestbook instant post + flowing display. `/admin` login + edit/delete blessings + RSVP table.
- OG/meta tags for WhatsApp previews using monogram.
- Optional sections all ON; toggle via `sectionVisibility` in config (nav auto-updates).

## Backlog / Remaining (P1/P2)
- P1: Swap placeholder photos, real contact numbers, livestream link (all one-line config edits).
- P2: RSVP delete/export endpoint for admin housekeeping; basic rate-limit on public POSTs.
- P2: Replace stock mural/couple images with the couple's real photography.

## Notes
- Admin password: `abelsteffy2026` (change in `/app/backend/.env`).
- MOCKED: none. All flows live against MongoDB.
