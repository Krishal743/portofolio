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
  index: number
  title: string
  kicker: string
  summary: string
  body: string[]
  tags: string[]
  year: string
  links: ProjectLink[]
  metrics?: ProjectMetric[]
}

// Extensible by design: append a new object here and Projects.tsx renders it.
// Replace placeholder metrics/links with your real numbers and URLs as they land.
export const projects: Project[] = [
  {
    id: "brittle-semantic-collapse",
    index: 1,
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
    links: [{ label: "GitHub", href: "https://github.com/Krishal743" }],
    metrics: [{ value: "ICWITE", label: "IEEE 2026 publication" }],
  },
  {
    id: "kafka-image-pipeline",
    index: 2,
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
    links: [{ label: "GitHub", href: "https://github.com/Krishal743" }],
  },
  {
    id: "fed-pekd",
    index: 3,
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
    links: [{ label: "GitHub", href: "https://github.com/Krishal743" }],
  },
]