---
title: "Week 22: SDK, Talk, OSS"
publishDate: "2024-05-28"
author: "amir"
---

Quick update on what we shipped this week at Unbody.

## TypeScript SDK v2.0

We completely rewrote our TypeScript SDK from scratch. The new version features full type inference, tree-shakeable modules, and a much cleaner API surface. Upgrade guide is live in the docs.

Key improvements:
- 60% smaller bundle size
- Automatic retry with exponential backoff
- Streaming support for large responses
- Better error messages with actionable suggestions

## Conference Talk

I gave a talk at the AI Engineers meetup about semantic search patterns. Covered the tradeoffs between dense vs sparse retrieval and when hybrid approaches make sense. Slides are up on our blog.

## Open Source Contributions

We merged 12 community PRs this week. Huge thanks to everyone contributing. Special shoutout to @devuser for the improved caching layer—it cut our test suite time by 40%.

## What's Next

Next week we're focusing on the dashboard redesign. Early mockups look promising. Stay tuned.
