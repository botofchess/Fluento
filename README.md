# Fluento — Ultra-Premium AI Fluency App

Fluento is a luxury-grade mobile experience for mastering spoken, written, and thinking fluency with a chess-like progression loop.

## What is now implemented (real interactive scaffold)
- **Stateful rating engine** with ELO-like updates after speaking, writing, and simulation sessions.
- **Interactive AI Speaking Coach** with transcript input, analysis, correction, native rewrite, filler detection, and score deltas.
- **Interactive Writing Master Lab** with multi-metric scoring and three rewrite styles.
- **AI Debate/Interview Simulator** that evaluates confidence, argument structure, vocabulary sophistication, and professionalism.
- **Data-rich dashboard** with dynamic ratings, streak stats, words mastered, generated daily plan, and leaderboard.
- **Elite Vocabulary Builder** with mastery actions that update profile progression.

## Architecture
- `src/ai/fluencyEngine.ts`: local deterministic AI-scoring layer (replaceable by backend APIs later)
- `src/state/FluentoContext.tsx`: global app state + rating updates + personalization plan generation
- `src/screens/*`: product modules for dashboard, coach, writing lab, simulation, vocabulary

## Run locally
```bash
npm install
npm run start
```

## Next integration step
Swap local scoring functions with cloud AI endpoints for:
- real-time speech recognition streaming
- phoneme-level pronunciation grading
- LLM rewrite and coaching prompts
- secure user auth + cloud sync
