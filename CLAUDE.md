# ASU Website Instructions

## Project

This is the website for Asian Student Union / ASU. It should be beautiful, modern, warm, cultural, student-friendly, mobile-first, and easy for future officers to maintain.

## Stack

- Astro
- TypeScript
- Tailwind CSS
- React islands only for interactive components
- Motion for React only when animation improves UX
- No traditional backend unless explicitly approved
- Event data should be read-only from a safe external source

## Design sources

- Follow `docs/DESIGN_SYSTEM.md`
- Homepage design comes from Google Stitch and should be matched closely
- Other pages may be designed by Claude Code, but must stay consistent with the homepage

## Workflow rules

- Do not one-shot the whole site
- Before major edits, inspect relevant files and propose a plan
- Use plan mode for pages, architecture, security, and event-data work
- Wait for approval before editing large sections
- Make small, reviewable changes
- Do not rewrite unrelated files
- Do not add dependencies without approval
- Run `npm run build` after implementation when available
- Summarize changed files and what should be visually reviewed

## Security rules

- Never expose credentials, API keys, private sheet IDs, service account files, or write tokens in frontend code
- Event data must be public-read only
- Do not create public write endpoints for events
- Do not add `doPost()` or event-editing routes unless explicitly approved
