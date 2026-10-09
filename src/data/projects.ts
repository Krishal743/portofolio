export type ProjectLink = {
  label: string
  href: string
}

export type ProjectMetric = {
  value: string
  label: string
}

export type Project = {
  id: string
  title: string
  kicker: string
  summary: string
  body: string[]
  tags: string[]
  year: string
  links: ProjectLink[]
  metrics?: ProjectMetric[]
}

// Ordered flagship-first, not chronologically. The case number shown in the
// UI is derived from array position in Projects.tsx, so reordering here is
// all it takes to renumber.
export const projects: Project[] = [
  {
    id: "enterprise-promptops",
    title: "Enterprise AI Operations Triage",
    kicker: "Product · LLM Ops & Evaluation",
    summary:
      "End-to-end retrieval-augmented triage for service tickets — with the evaluation harness, red-team suite, and tracing built in from the start rather than bolted on after.",
    body: [
      "Most LLM demos stop at \"the model answered.\" This one starts from the harder question: *how do you know it answered correctly, every time, after you change the prompt?* A supervisor describes a fault, a local TF-IDF index ranks the knowledge articles by symptom — exact diagnostic-code matches win, and a hazard rule forces specialist review for anything like battery heat or ineffective brakes — and Ollama drafts a structured assignment, priority, explanation, citations, and customer reply using only the retrieved articles.",
      "Every response is checked before it goes anywhere: missing or unsupported citations route to human review, and only a supervisor approval moves a ticket to simulated dispatch. Langfuse records retrieval and generation traces, latency, token use, and prompt version, so a failure can be reconstructed rather than guessed at. Prompt v1 and v2 compare side by side.",
      "The quality gate is the part I'd defend hardest — a 50-case golden dataset covering routine, ambiguous, safety, missing-evidence, tone, injection, and out-of-scope inputs; eight dedicated red-team cases; and a Promptfoo job in CI that runs all of them through the live service path and fails the build. FastAPI, Streamlit, SQLite, Docker Compose, self-hosted Langfuse.",
    ],
    tags: ["RAG", "Evaluation", "Red-Teaming", "Langfuse", "FastAPI", "Ollama", "Docker", "Promptfoo"],
    year: "2026",
    links: [
      { label: "GitHub", href: "https://github.com/Krishal743/Enterprise-PromptOps-AI-Enablement-Harness" },
      {
        label: "Guide",
        href: "https://krishal743.github.io/Enterprise-PromptOps-AI-Enablement-Harness/",
      },
    ],
    metrics: [
      { value: "50", label: "golden eval cases" },
      { value: "8", label: "red-team attacks" },
      { value: "12", label: "indexed knowledge articles" },
      { value: "3", label: "reusable prompt templates" },
    ],
  },
  {
    id: "brittle-semantic-collapse",
    title: "Brittle Semantic Collapse Under Perturbation",
    kicker: "Research · IEEE ICWITE 2026",
    summary:
      "Reliability study of LLM tool-use under input perturbation — mapping how tool selection degrades and where the failure is semantic, not syntactic.",
    body: [
      "Tool-use is how language models become agents, yet a single rephrased instruction can silently reroute a call to the wrong tool — or none at all. This work frames that fragility as *brittle semantic collapse*: the representation of a tool's purpose narrowing under perturbation until the model no longer recognises it.",
      "The study systematically perturbs tool-use prompts, evaluates collapse across models and tool schemas, and surfaces the conditions under which reliability holds. Published at IEEE ICWITE 2026.",
    ],
    tags: ["LLMs", "Tool-Use Reliability", "Prompt Perturbation", "PyTorch", "Evaluation"],
    year: "2025",
    links: [
      { label: "GitHub", href: "https://github.com/Krishal743/Brittle-Semantic-Collapse-Under-Perturbation" },
    ],
    metrics: [{ value: "ICWITE", label: "IEEE 2026 publication" }],
  },
  {
    id: "ai-podcast-clipper",
    title: "AI Podcast Clipper",
    kicker: "Product · ML Pipeline SaaS",
    summary:
      "Turns a full episode into vertical short-form clips — transcribed, scored for engagement, cropped to whoever is speaking, and subtitled, on a GPU pipeline with billing and a job queue.",
    body: [
      "Clipping a podcast by hand means watching the whole thing. This runs four models in sequence instead: whisperX transcribes, an LLM picks the moments worth cutting — stories, questions, reactions — LR-ASD tracks the active speaker so the crop follows a face rather than a fixed centre, and ffmpeg renders 1080×1920 clips with burned-in subtitles.",
      "The interesting engineering is everything around the models. Rendering happens on Modal serverless GPUs (NVIDIA L40S), long jobs go through an Inngest queue so a request never blocks, and the product shell is real: Auth.js credentials, credit-based Stripe billing with a mock mode for demos, Prisma, and S3 for uploads and rendered clips. Next.js 15 and React 19 on the front, FastAPI on the back.",
    ],
    tags: ["Next.js", "FastAPI", "Modal", "whisperX", "Gemini", "Inngest", "Stripe", "S3"],
    year: "2025",
    links: [{ label: "GitHub", href: "https://github.com/Krishal743/Ai-podcast-clipper" }],
    metrics: [
      { value: "1080×1920", label: "vertical output" },
      { value: "L40S", label: "serverless GPU rendering" },
    ],
  },
  {
    id: "fed-pekd",
    title: "Fed-PEKD",
    kicker: "Research · Federated Learning",
    summary:
      "Privacy-preserving federated learning that decouples knowledge transfer from raw gradient sharing.",
    body: [
      "Federated learning keeps data on-device but leaks signal through gradients. Fed-PEKD reworks the exchange: private ensemble knowledge distillation carries the teacher's generalisation to clients without transmitting the examples or the raw updates those examples produced.",
      "The approach balances privacy, communication cost, and accuracy — targeting settings where data is too sensitive to move but too sparse to ignore.",
    ],
    tags: ["Federated Learning", "Knowledge Distillation", "Privacy", "PyTorch", "Differential Privacy"],
    year: "2024",
    links: [{ label: "GitHub", href: "https://github.com/Krishal743/Fed-PEKD" }],
  },
  {
    id: "kafka-image-pipeline",
    title: "Distributed Image Processing Pipeline",
    kicker: "Systems · Apache Kafka",
    summary:
      "Horizontally-scalable streaming pipeline that ingests, transforms, and stores images at throughput far beyond a single worker.",
    body: [
      "A single-process image pipeline is fast until it isn't. This project builds a producer–consumer architecture on Apache Kafka: images stream into topics, workers consume and process in parallel, and results fan back out through well-defined partitions.",
      "The result is a pipeline that scales by adding consumers rather than rewriting code — with backpressure, idempotent processing, and observability built in as first-class concerns.",
    ],
    tags: ["Apache Kafka", "Python", "OpenCV", "Docker", "Streaming", "Concurrency"],
    year: "2024",
    links: [
      { label: "GitHub", href: "https://github.com/Krishal743/Distributed-Image-Processing-with-Kafka" },
    ],
  },
  {
    id: "kafka-spark-monitoring",
    title: "Real-time Server Monitoring",
    kicker: "Systems · Kafka + Spark",
    summary:
      "Four machines streaming CPU, memory, network, and disk into Kafka, with Spark windowed aggregation flagging anomalies across the fleet.",
    body: [
      "Monitoring that only tells you after the incident isn't monitoring. A producer publishes simulated server metrics to four separate Kafka topics — one per resource — two independent consumers drain them to disk, and Spark jobs run window-based aggregations over the raw streams to surface abnormal patterns while they're still abnormal.",
      "The four roles run on separate machines over a ZeroTier virtual network rather than localhost, which is the point: partitioning, consumer assignment, and cross-host delivery are the actual subjects, not incidental setup. Python for the producer and consumers, Spark for the windowing.",
    ],
    tags: ["Apache Kafka", "Apache Spark", "Python", "ZeroTier", "Windowed Aggregation", "Anomaly Detection"],
    year: "2025",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Krishal743/Distributed-Server-Monitoring-with-Kafka-Spark",
      },
    ],
    metrics: [
      { value: "4", label: "Kafka topics" },
      { value: "4", label: "monitored resources" },
    ],
  },
  {
    id: "federated-fraud-detection",
    title: "Federated Fraud Detection",
    kicker: "Research · Privacy-Preserving ML",
    summary:
      "Banks collaboratively train a fraud detector without ever moving a raw transaction — with groundwork laid for encrypting the updates themselves.",
    body: [
      "Banks want each other's fraud patterns and are legally barred from having each other's data. Federated learning splits the difference: each institution trains locally, only parameters come back to a central aggregator, and the averaged global model ships back out. Collective intelligence, no raw records leaving the building.",
      "The pipeline is deliberately modular — datasets are preprocessed, sharded into simulated banks, then run through per-bank local training and federated training so the two are directly comparable on the Credit Card Fraud and PaySim datasets. Homomorphic encryption for the update channel is scoped and stubbed as the next step, not claimed as done.",
    ],
    tags: ["Federated Learning", "Homomorphic Encryption", "PyTorch", "Privacy", "Fraud Detection"],
    year: "2025",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Krishal743/fraud-detection-with-homomorphic-encryption",
      },
    ],
    metrics: [
      { value: "2", label: "benchmark datasets" },
      { value: "0", label: "raw records shared" },
    ],
  },
]
