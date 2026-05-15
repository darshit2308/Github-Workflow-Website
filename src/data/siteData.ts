// ── Site-wide configuration ─────────────────────────────────
export const SITE = {
  name: "Darshit Khandelwal",
  email: "darshit2308@gmail.com",
  github: "https://github.com/darshit2308",
  githubHandle: "darshit2308",
  timezone: "IST (UTC +5:30)",
  mentorship: "LFDT Mentorship 2026",
  project: "Hiero: GitHub Workflow App",
  issueUrl:
    "https://github.com/LF-Decentralized-Trust-Mentorships/mentorship-program/issues/73",
  mentor: "Sophie Bulloch (exploreriii)",
  archPlanPdf: "/documents/Hiero_Shared_SDK_Automations_Architecture_Plan_5_Page.pdf",
  applicationPdf: "/documents/sophie.pdf",
  taskSolutionPdf: "/documents/taskSolution.pdf",
  preInterviewTaskPdf: "/documents/Pre-Interview Task - Hiero Workflow App (1).pdf",
  finalPdf: "/documents/final (2).pdf",
};

// ── Hero stats ──────────────────────────────────────────────
export const HERO_STATS = [
  { value: "13+", label: "Merged PRs" },
  { value: "5", label: "Repositories" },
  { value: "2", label: "Working Prototypes" },
  { value: "1", label: "Architecture Plan" },
];

// ── Contribution categories ─────────────────────────────────
export interface Contribution {
  id: string;
  repo: string;
  repoUrl: string;
  prs: { number: string; url: string; status: "merged" | "open" }[];
  title: string;
  description: string;
  tags: string[];
}

export const CONTRIBUTION_CATEGORIES = [
  {
    id: "workflow",
    label: "Workflow Automation & Bot Architecture",
    icon: "⚙️",
    color: "#2E75B6",
  },
  {
    id: "debugging",
    label: "Systems Debugging & Protocol Correctness",
    icon: "🔍",
    color: "#2E7D32",
  },
  {
    id: "analytics",
    label: "Ecosystem Analytics & Telemetry",
    icon: "📊",
    color: "#6A1B9A",
  },
  {
    id: "review-queue",
    label: "Review Queue Automation Architecture",
    icon: "📋",
    color: "#B71C1C",
  },
];

export const CONTRIBUTIONS: Contribution[] = [
  {
    id: "c1",
    repo: "hiero-sdk-cpp",
    repoUrl: "https://github.com/hiero-ledger/hiero-sdk-cpp",
    prs: [
      {
        number: "#1246",
        url: "https://github.com/hiero-ledger/hiero-sdk-cpp/pull/1246",
        status: "merged",
      },
      {
        number: "#1365",
        url: "https://github.com/hiero-ledger/hiero-sdk-cpp/pull/1365",
        status: "merged",
      },
      {
        number: "#1409",
        url: "https://github.com/hiero-ledger/hiero-sdk-cpp/pull/1409",
        status: "merged",
      },
      {
        number: "#1468",
        url: "https://github.com/hiero-ledger/hiero-sdk-cpp/pull/1468",
        status: "merged",
      },
      {
        number: "#1494",
        url: "https://github.com/hiero-ledger/hiero-sdk-cpp/pull/1494",
        status: "merged",
      },
    ],
    title: "/assign & /unassign command hardening",
    description:
      "Implemented the /unassign command with strict permission validation, removed TOCTOU race conditions, revalidated stale label state, removed rigid label friction, and added assignment-cap bypass for top contributors.",
    tags: ["workflow", "Probot", "GitHub Actions", "TOCTOU fix"],
  },
  {
    id: "c2",
    repo: "hiero-did-sdk-js",
    repoUrl: "https://github.com/hiero-ledger/hiero-did-sdk-js",
    prs: [
      {
        number: "#57",
        url: "https://github.com/hiero-ledger/hiero-did-sdk-js/pull/57",
        status: "merged",
      },
    ],
    title: "Hedera mirror node timeout diagnostics",
    description:
      "Improved observability in Hedera mirror node polling, adding structured timeout diagnostics and vitest isolation for distributed system debugging.",
    tags: ["debugging", "distributed systems", "vitest"],
  },
  {
    id: "c3",
    repo: "heka-identity-platform",
    repoUrl: "https://github.com/hiero-ledger/heka-identity-platform",
    prs: [
      {
        number: "#22",
        url: "https://github.com/hiero-ledger/heka-identity-platform/pull/22",
        status: "merged",
      },
      {
        number: "#25",
        url: "https://github.com/hiero-ledger/heka-identity-platform/pull/25",
        status: "merged",
      },
      {
        number: "#69",
        url: "https://github.com/hiero-ledger/heka-identity-platform/pull/69",
        status: "open",
      },
    ],
    title: "OID4VCI correctness & wallet DID persistence",
    description:
      "Resolved complex issues in OID4VCI credential flows and API routing, corrected production API bugs, and currently addressing wallet DID persistence and shared Admin wallet ID alignment.",
    tags: ["debugging", "OID4VCI", "W3C VC", "identity"],
  },
  {
    id: "c4",
    repo: "hiero-hackers/analytics",
    repoUrl: "https://github.com/hiero-hackers/analytics",
    prs: [
      {
        number: "#158",
        url: "https://github.com/hiero-hackers/analytics/pull/158",
        status: "merged",
      },
    ],
    title: "Maintainer telemetry enhancements",
    description:
      "Contributed baseline telemetry for repository health and workflow visibility, enabling data-driven decision-making for maintainers. Closes Issue #131.",
    tags: ["analytics", "telemetry", "maintainer tooling"],
  },
  {
    id: "c5",
    repo: "hiero-sdk-python",
    repoUrl: "https://github.com/hiero-ledger/hiero-sdk-python",
    prs: [
      {
        number: "#2242",
        url: "https://github.com/hiero-ledger/hiero-sdk-python/pull/2242",
        status: "open",
      },
      {
        number: "#2254",
        url: "https://github.com/hiero-ledger/hiero-sdk-python/pull/2254",
        status: "open",
      },
      {
        number: "#2262",
        url: "https://github.com/hiero-ledger/hiero-sdk-python/pull/2262",
        status: "open",
      },
    ],
    title: "Review queue automation — Phase 1 label sync",
    description:
      "Designed a 4-phase iterative implementation plan for automating the Python SDK's review queue. Submitted Phase 1 implementing foundation and label sync with mentor feedback integration.",
    tags: ["review-queue", "automation", "label sync"],
  },
];

// ── Architecture comparison ─────────────────────────────────
export const ARCH_BEFORE_AFTER = {
  before: {
    title: "Current: Per-Repo Scripts",
    subtitle: "Fragmented, duplicated, hard to maintain",
    points: [
      "Multiple workflow files per repo to align",
      "Similar PRs across 12+ repositories for one logic fix",
      "Limited, repository-local feature toggles",
      "Audit trail split across workflow runs",
      "Runner-scoped workflow permissions",
      "Higher coordination cost at scale",
    ],
  },
  after: {
    title: "Proposed: Hybrid App Architecture",
    subtitle: "Centralised logic, local control, safe rollout",
    points: [
      "App installation + lightweight repo config",
      "Single centralised service update + controlled rollout",
      ".github/hiero-workflow.yml feature toggles",
      "Centralised decision logs + repo-visible status",
      "App-scoped permissions with explicit handoff",
      "Lower coordination cost with staged rollout",
    ],
  },
};

// ── Security safeguards ─────────────────────────────────────
export interface SecuritySafeguard {
  id: string;
  title: string;
  icon: string;
  threat: string;
  mitigation: string;
}

export const SECURITY_SAFEGUARDS: SecuritySafeguard[] = [
  {
    id: "s1",
    title: "PR Injection Mitigation",
    icon: "🛡️",
    threat: "pull_request_target abuse with elevated access on fork PRs",
    mitigation:
      "App intercepts webhook externally, evaluates in isolated env, passes only sanitized params to Actions via repository_dispatch.",
  },
  {
    id: "s2",
    title: "Least-Privilege Permissions",
    icon: "🔐",
    threat: "Over-permissioned tokens or PATs with repo-wide write access",
    mitigation:
      "GitHub App operates under restrictive cryptographic bounds. Read/Write Issues & PRs; Read-only Metadata & Contents. No secrets access.",
  },
  {
    id: "s3",
    title: "Webhook Verification",
    icon: "✅",
    threat: "Payload spoofing or unauthorized API triggers",
    mitigation:
      "HMAC-SHA256 signature verification on every incoming webhook. Failed validation = immediate drop before processing.",
  },
  {
    id: "s4",
    title: "Infinite Loop Protection",
    icon: "🔄",
    threat: "Bot reacting to its own automated comments causing feedback loops",
    mitigation:
      "Actor-type validations and explicit bot guards prevent self-triggering, reducing rate-limit exhaustion and runaway execution.",
  },
  {
    id: "s5",
    title: "Race Condition Handling",
    icon: "⚡",
    threat: "Multiple /assign comments arriving simultaneously causing conflicts",
    mitigation:
      "Async task queue keyed by issue number ensures state mutations are processed sequentially and predictably.",
  },
  {
    id: "s6",
    title: "Non-Repudiation & Auditability",
    icon: "📝",
    threat: "Opaque automated decisions with no maintainer visibility",
    mitigation:
      "Unified structured audit trail: which user triggered, which .yml rule evaluated, what the final action was.",
  },
  {
    id: "s7",
    title: "Trust Boundary Enforcement",
    icon: "🚧",
    threat: "Malicious actors spamming comments to exhaust API limits or inject Markdown",
    mitigation:
      "Strict schema validation of payloads. Unexpected fields rejected. repository_dispatch receives only neutralized inputs.",
  },
  {
    id: "s8",
    title: "Fail-Safe Degradation",
    icon: "🔧",
    threat: "Total App outage blocking critical repository operations",
    mitigation:
      "System degrades gracefully into manual state. Maintainers retain all native GitHub UI abilities. Never blocks critical ops.",
  },
];

// ── Prototypes ──────────────────────────────────────────────
export interface Prototype {
  id: string;
  name: string;
  repoUrl: string;
  demoUrl: string;
  focus: string;
  features: string[];
  description: string;
}

export const PROTOTYPES: Prototype[] = [
  {
    id: "p1",
    name: "hiero-workflow-probot",
    repoUrl: "https://github.com/darshit2308/hiero-workflow-probot",
    demoUrl: "https://www.youtube.com/watch?v=J2CxOuN65ps",
    focus: "Orchestration & Dynamic Configuration",
    features: [
      "Reads .github/hiero-workflow.yml config per repository",
      "Auto-label PRs based on file paths",
      "PR size warnings for large changesets",
      "Milestone tracking automation",
      "Greeting messages for new contributors",
    ],
    description:
      "Tests how a centralized app interacts with repository-level configuration. Proves orchestration behavior can be driven from one config file instead of custom application code in each repo.",
  },
  {
    id: "p2",
    name: "heiro-probot-official",
    repoUrl: "https://github.com/darshit2308/heiro-probot-official",
    demoUrl: "https://www.youtube.com/watch?v=1l5AqbGxl5o",
    focus: "Porting Hiero's Business Logic",
    features: [
      "Full /assign and /unassign command pipeline",
      "Skill-tier progression checks",
      "Assignment limit enforcement",
      "Runs entirely through Octokit API",
      "Ported from C++ SDK's on-comment logic",
    ],
    description:
      "Validates that Hiero's tightly coupled workflow scripts can survive outside GitHub Actions. Successfully ported the C++ SDK's on-comment logic into a Node.js Probot environment.",
  },
];

// ── Implementation timeline ─────────────────────────────────
export interface Milestone {
  id: string;
  phase: string;
  dates: string;
  title: string;
  focus: string;
  deliverables: string[];
  highlight?: boolean;
}

export const MILESTONES: Milestone[] = [
  {
    id: "m1",
    phase: "Milestone 1",
    dates: "Jun 15 – Jul 15",
    title: "Core Orchestration & Config Layer",
    focus:
      "Finalise hiero-workflow.yml schema. Build central Probot event router and dynamic config reader.",
    deliverables: [
      "Repositories can install the App",
      "App correctly parses feature toggles per repository",
    ],
  },
  {
    id: "m2",
    phase: "Milestone 2",
    dates: "Jul 16 – Aug 23",
    title: "Hybrid Pipeline & Production Hardening",
    focus:
      "Build dispatcher bridge for hybrid architecture. Implement PR validation engine (DCO, GPG, merge conflicts).",
    deliverables: [
      "Hybrid dispatcher bridge functional",
      "PR validation runs end-to-end",
      "90%+ test coverage on core mutations",
    ],
  },
  {
    id: "m-mid",
    phase: "Midterm",
    dates: "Aug 24 – 31",
    title: "Official Midterm Evaluation",
    focus:
      "Live demonstration of hybrid PR pipeline and issue assignment logic running in hiero-hackers sandbox.",
    deliverables: ["Live demo to mentor", "Midterm report submitted"],
    highlight: true,
  },
  {
    id: "m3",
    phase: "Milestone 3",
    dates: "Sep 1 – 30",
    title: "Audit Logging & Observability",
    focus:
      "Implement deterministic structured audit log. Build maintainer-facing diagnostics for workflow decisions.",
    deliverables: [
      "Transparent, queryable audit trails operational",
      "Maintainer diagnostics dashboard",
    ],
  },
  {
    id: "m4",
    phase: "Milestone 4",
    dates: "Oct 1 – 31",
    title: "Canary Rollout & Hardening",
    focus:
      "Deploy App to hiero-sdk-cpp as live canary. Monitor rate limits, verify webhook signatures, resolve edge cases.",
    deliverables: [
      "App runs safely on canary repo for 30 days",
      "No dropped webhook events or blocked PRs",
    ],
  },
  {
    id: "m5",
    phase: "Milestone 5",
    dates: "Nov 1 – 14",
    title: "Stretch Goals: Stale Assignment & Extensibility",
    focus:
      "If core stability achieved, implement cron-driven stale assignment worker and document extension hooks.",
    deliverables: [
      "Working stale-issue sweeper",
      "Documented plugin architecture",
    ],
  },
  {
    id: "m-final",
    phase: "Final",
    dates: "Nov 15 – 30",
    title: "Final Evaluation & Handoff",
    focus:
      "Deliver cross-organization adoption guides and maintainer documentation. Execute final handoff demonstration.",
    deliverables: [
      "Adoption guides delivered",
      "Final demo and handoff complete",
    ],
    highlight: true,
  },
];

// ── Hackathon wins / broader experience ─────────────────────
export const ACHIEVEMENTS = [
  {
    name: "VeilPad",
    result: "🥇 1st Place",
    url: "https://devfolio.co/projects/veilpad-2991",
    description: "Decentralized identity and privacy platform",
  },
  {
    name: "Arden",
    result: "🏆 Track Winner",
    url: "https://taikai.network/swellchain/hackathons/Swell-City-Buildathon/projects/cma45ss5e0c8dne4ug62e5j1g/idea",
    description: "Restaking infrastructure — Swell City Buildathon",
  },
  {
    name: "Resume Autofiller Extension",
    result: "🏆 Winter Hackathon Winner",
    url: "https://github.com/darshit2308/Job-Extension-Autofiller",
    description:
      "Browser extension that automatically detects and intelligently fills job application forms with resume data.",
  },
];

// ── Navigation sections ─────────────────────────────────────
export const NAV_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "thesis", label: "Thesis" },
  { id: "contributions", label: "Contributions" },
  { id: "architecture", label: "Architecture" },
  { id: "security", label: "Security" },
  { id: "prototypes", label: "Prototypes" },
  { id: "timeline", label: "Timeline" },
  { id: "questions", label: "Task Answers" },
];
