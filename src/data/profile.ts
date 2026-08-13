export const profile = {
name: "Krishal Hriday",
  role: "AI/ML Engineer",
  tagline: "Machine learning and systems, researched and shipped end-to-end.",
  location: "Bengaluru, India",
  education: {
    school: "PES University",
    degree: "B.Tech in Computer Science",
    years: "2023 – 2027",
  },
  email: "krishal743@gmail.com",
  github: "https://github.com/Krishal743",
  linkedin: "https://www.linkedin.com/in/krishal-hriday-a83b283a7/",
  resume: "/resume.pdf",
  bio: [
    "I'm an AI/ML engineer and final-year Computer Science student at PES University (2023–2027). My work spans the full machine-learning lifecycle — I've researched how reliably LLMs use tools and published that work at IEEE ICWITE, built horizontal Kafka pipelines for image processing, and designed privacy-preserving federated learning systems.",
    "I care about building things that hold up: clean, well-tested code; reliable distributed systems; and ML systems that are evaluated as rigorously as they are trained. I'm genuinely curious about the details that make systems work in production.",
    "I'm open to AI/ML and software engineering roles, research collaborations, and internships — happy to talk about how I could contribute to your team's problems.",
  ],
} as const

export type Stat = {
  value: string
  label: string
}

export type SkillGroup = {
  name: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    name: "AI / ML",
    skills: [
      "PyTorch",
      "Large Language Models",
      "Federated Learning",
      "Prompt Engineering",
      "Knowledge Distillation",
      "Evaluation",
    ],
  },
  {
    name: "Distributed Systems",
    skills: ["Apache Kafka", "Streaming Pipelines", "Docker", "Containerization", "Reliability", "Fault Tolerance"],
  },
  {
    name: "Engineering",
    skills: ["Python", "TypeScript", "React", "Git", "Linux", "REST APIs", "System Design"],
  },
]