/** Open-source contributions, pulled from the actual PRs on GitHub.
 *
 *  Star counts and line/file tallies are snapshots as of Oct 2026 — they
 *  drift as the upstream repos grow, so treat them as approximate. Every
 *  other value here is verbatim from the PR metadata. */

export type Contribution = {
  pr: string
  prUrl: string
  issue: string
  issueUrl: string
  issueTitle: string
  headline: string
  problem: string
  solution: string
  meta: string
}

export type OssProject = {
  id: string
  name: string
  tagline: string
  stars: string
  href: string
  /** What the project is. */
  about: string
  /** What I actually contributed to it. */
  myPart: string
  stats: { value: string; label: string }[]
  contributions: Contribution[]
}

export const ossProjects: OssProject[] = [
  {
    id: "prowler",
    name: "Prowler",
    tagline: "Cloud security & compliance, automated",
    stars: "14,992",
    href: "https://github.com/prowler-cloud/prowler",
    about:
      "The most widely used open-source cloud security platform — it audits AWS, Azure, GCP and Kubernetes against hundreds of checks and exports the findings as compliance reports. Deployments can offload those reports to S3-compatible object storage.",
    myPart:
      "A report-download failure that hit every non-AWS object store, root-caused to a single boto3 argument being forwarded verbatim.",
    stats: [
      { value: "14,992", label: "GitHub stars" },
      { value: "3", label: "files changed" },
      { value: "35", label: "lines added" },
      { value: "1", label: "issue fixed" },
    ],
    contributions: [
      {
        pr: "12517",
        prUrl: "https://github.com/prowler-cloud/prowler/pull/12517",
        issue: "12508",
        issueUrl: "https://github.com/prowler-cloud/prowler/issues/12508",
        issueTitle: "403 AccessDenied when downloading scan reports from non-AWS S3-compatible storage",
        headline: "Why every non-AWS object store 403'd on report downloads",
        problem:
          "Self-hosted deployments pointing at Hetzner, Ceph, MinIO or R2 got a 403 whenever they tried to download a scan report. The presigned URL was being signed with an empty X-Amz-Security-Token= parameter — botocore emits it for any value that isn't None, so long-lived access keys were signed as if they were temporary credentials. Uploads masked the bug entirely, because they sign headers rather than the query string.",
        solution:
          "Coerced the token at the boto3 boundary instead of changing the settings default — deployments routinely set that env var explicitly-but-empty, so a default change would have missed them. One line, plus unit tests with an exact-kwargs assertion proving real tokens still pass through untouched, and a changelog fragment.",
        meta: "+35 / −1 · 3 files · open",
      },
    ],
  },
  {
    id: "bernstein",
    name: "Bernstein",
    tagline: "Declarative governance for fleets of coding agents",
    stars: "1,202",
    href: "https://github.com/sipyourdrink-ltd/bernstein",
    about:
      "An orchestration framework that runs CLI coding agents — Claude Code, Codex, Gemini CLI and dozens more — in parallel, each in its own git worktree, while enforcing rules written declaratively rather than in code. No model sits in the coordination loop, so identical runs replay byte-for-byte, and every task carries signed lineage a reviewer can verify offline.",
    myPart:
      "The audit chain: making what the system decided — and the evidence behind it — survive a restart and stand up to a reviewer after the fact.",
    stats: [
      { value: "1,202", label: "GitHub stars" },
      { value: "2", label: "PRs merged" },
      { value: "965", label: "lines added" },
      { value: "10", label: "files changed" },
    ],
    contributions: [
      {
        pr: "3721",
        prUrl: "https://github.com/sipyourdrink-ltd/bernstein/pull/3721",
        issue: "3685",
        issueUrl: "https://github.com/sipyourdrink-ltd/bernstein/issues/3685",
        issueTitle: "Automatic stall kills leave a verdict with no reconstructable failure window",
        headline: "Proving what the run saw, not merely that it decided to kill",
        problem:
          "record_escalation_receipt already existed and mirrored a signed, spine-anchored receipt into the chain — but had no production caller. An automatic kill recorded a verdict and nothing else: the adjudication was provable, the evidence behind it was not.",
        solution:
          "Wired the signed escalation receipt into all three automatic stall-kill paths — heartbeat, simple-stall, profiled-stall — so a kill now leaves both a stall.verdict (the decision, pre-kill) and an escalation.receipt (the evidence, post-kill) on the HMAC audit chain.",
        meta: "+438 / −10 · 5 files · merged",
      },
      {
        pr: "3678",
        prUrl: "https://github.com/sipyourdrink-ltd/bernstein/pull/3678",
        issue: "3604",
        issueUrl: "https://github.com/sipyourdrink-ltd/bernstein/issues/3604",
        issueTitle: "Record stall.verdict before automatic worker kills",
        headline: "Making a kill decision survive a restart",
        problem:
          "Automatic stall kills were entirely off-chain. The decision lived in a time.monotonic()-keyed in-memory dictionary that did not survive a daemon restart, so after a crash there was no way to rebuild the escalation ladder — or to answer why a kill had been decided in the first place.",
        solution:
          "A new stall.verdict event written to the audit chain before every kill, carrying eight fields of the evidence that triggered it — detector, stall reason, measured heartbeat age or identical-snapshot count, threshold crossed. Wired into all three kill branches behind a lazy import and try/except, so a chain failure is loud but never delays the kill itself.",
        meta: "+527 · 5 files · merged",
      },
    ],
  },
]
