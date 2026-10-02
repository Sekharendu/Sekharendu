# Hi, I'm Sekharendu 👋

Software engineer building **TypeScript/Node.js backends, RAG applications, and AI observability tools**.

I've worked on production backend services and fintech workflows at CloudKaptan. Outside work, I build and ship tools that let me explore retrieval, streaming, SDK design, and reliable LLM integrations. I like picking difficult problems, measuring what changes, and sharing what I learn.

[Portfolio](https://www.sekharendudey.com/) · [LinkedIn](https://www.linkedin.com/in/sekharendu-dey/) · [X](https://x.com/Sekharendu60107) · [Email](mailto:sekharendudey12@gmail.com)

## Selected projects

### [LocalCortex](https://github.com/Sekharendu/LocalCortex)

A fully local RAG application for chatting with PDF, Word, and Markdown documents. Includes dense and hybrid retrieval, streamed answers with sources, PostgreSQL chat history, and a Docker setup.

- Built a **113-question retrieval evaluation harness** using Recall@K and MRR.
- Improved **MRR from 0.912 to 0.952** through retrieval and embedding tuning.
- Tuned refusal thresholds and follow-up handling, eliminating nine false refusals in the evaluation.

**Stack:** TypeScript, Node.js, React, Ollama, Qdrant, PostgreSQL, Docker

[Repository](https://github.com/Sekharendu/LocalCortex) · [Project site](https://sekharendu.github.io/LocalCortex/)

### [Agnost AI Adapter](https://github.com/Sekharendu/Agnost-AI-Adapter)

A published npm package that adds observability to AI SDK calls through drop-in wrappers and JavaScript Proxies. Captures latency, token usage, model metadata, tool calls, streaming output, and failures while preserving existing SDK interfaces.

- Supports Vercel AI, OpenAI, Google GenAI, and Mastra.
- Dispatches telemetry asynchronously without waiting for delivery before returning the SDK response.
- Includes **48 automated tests**: 29 unit and 19 end-to-end, covering installation, streaming, error handling, Proxy passthrough, and telemetry format.

**Stack:** TypeScript, Node.js, JavaScript Proxies, AI SDKs, Vitest

[Repository](https://github.com/Sekharendu/Agnost-AI-Adapter) · [npm](https://www.npmjs.com/package/agnost-ai-adapter)

## Production experience

At **CloudKaptan**, I progressed from Software Engineer Apprentice to Software Engineer Trainee:

- Built a Node.js export API for **50,000+ records**, resolving heap-memory issues and improving CSV export speed by **65%**.
- Developed a multi-provider LLM layer with retries, circuit breakers, fallback routing, and AsyncLocalStorage-based per-tenant token, latency, and cost telemetry.
- Built record-transition workflows processing **1,000+ records concurrently** across eight lifecycle stages, and automated loan disbursement workflows supporting **$10M+ in quarterly origination volume**.

## Currently building

**[StreamMind](https://github.com/Sekharendu/StreamMind)** — an AI backend in progress, bringing together streaming, provider fallback, conversation history, retrieval, and observability. I'm working with TypeScript, Fastify, PostgreSQL, Redis, and pgvector.

## Core stack

| Area | Technologies |
| --- | --- |
| Backend | TypeScript, JavaScript, Node.js, Fastify, Express, REST APIs, SSE |
| AI & retrieval | Ollama, Vercel AI SDK, OpenAI SDK, Google GenAI, Qdrant, pgvector |
| Data & infrastructure | PostgreSQL, Redis, Docker, GitHub Actions |
| Frontend & testing | React, Tailwind CSS, Vitest |

## Writing & learning in public

I share engineering notes and project progress on [X](https://x.com/Sekharendu60107) and [dev.to](https://dev.to/sekharendu_dey/).

Recent writing includes **“Chunking: Getting the First Cut Right”** and **“Measuring Before Painting: Why My Dropdown Needed useLayoutEffect.”** You can find both through [my portfolio](https://www.sekharendudey.com/#blogs).

Away from the keyboard: cricket, the gym, running, anime, and non-fiction books.

## Let's connect

Based in India. **Open to remote backend and AI engineering opportunities with international teams.**

[Email me](mailto:sekharendudey12@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sekharendu-dey/) · [Book a call](https://cal.com/sekharendu-dey)
