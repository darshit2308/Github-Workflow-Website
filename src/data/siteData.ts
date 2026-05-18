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
  // Updated to the new full architecture document
  archPlanPdf: "/documents/full-architecture.pdf",
  fivePagePdf: "/documents/5-page.pdf",
  applicationPdf: "/documents/sophie.pdf",
  taskSolutionPdf: "/documents/taskSolution.pdf",
  preInterviewTaskPdf: "/documents/taskSolution.pdf",
};

// ── Hero stats ──────────────────────────────────────────────
export const HERO_STATS = [
  { value: "13+", label: "Merged PRs" },
  { value: "5", label: "Repositories" },
  { value: "2", label: "Working Prototypes" },
  { value: "7", label: "Phased Roadmap" },
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

// ── Architecture comparison — updated for V2 GitHub App framing ────────
export const ARCH_BEFORE_AFTER = {
  before: {
    title: "Old Framing: Fragmented Scripts",
    subtitle: "Per-repo scripts, Actions-centred, migration-first thinking",
    points: [
      "Shared GitHub Action / canary treated as the product centre",
      "Python review-sync first because the canary worked — not because architecture was right",
      "Migration timeline placed before architecture in the document",
      "Config was mainly a file for extracted constants",
      "Dry-run and canary presented as architectural choices",
      "Goal was V1.5 with more functionality, not a properly structured V2",
    ],
  },
  after: {
    title: "New Framing: GitHub App with Clean Pipeline",
    subtitle: "Architecture first. Shell before modules. Correctness over speed.",
    points: [
      "GitHub App is the product centre — Actions and canaries are compatibility/testing paths only",
      "/assign is the first slice: smallest scope, forces the full 8-stage pipeline, mentor-identified",
      "Architecture section comes first; testing, canary, and migration appear after",
      "Config is the policy surface: feature flags, thresholds, doc links, labels — schema-validated",
      "Dry-run and canary are validation techniques, not architecture",
      "Ship V2 with one robust module, grow capability one module at a time",
    ],
  },
};

// ── Pipeline components ─────────────────────────────────────
export interface PipelineComponent {
  id: string;
  name: string;
  icon: string;
  shortRole: string;
  responsibility: string;
  highlight?: boolean;
}

export const PIPELINE_COMPONENTS: PipelineComponent[] = [
  {
    id: "pc1",
    name: "Webhook Listener",
    icon: "📡",
    shortRole: "Trust boundary",
    responsibility:
      "Receives GitHub webhook events over HTTPS. Verifies HMAC-SHA256 signature, installation ID, repository membership, event type, delivery ID, and basic payload shape. Rejects malformed or unauthorised payloads immediately — before any routing logic runs.",
  },
  {
    id: "pc2",
    name: "Event Normalizer",
    icon: "🔄",
    shortRole: "Stable event model",
    responsibility:
      "Converts raw GitHub webhook payloads into a stable internal NormalizedEvent model. Downstream policy modules never depend directly on raw webhook shape, so GitHub API changes require only normalizer updates.",
  },
  {
    id: "pc3",
    name: "Router",
    icon: "🗺️",
    shortRole: "Declarative routing",
    responsibility:
      "Maps normalized events and parsed commands (e.g. /assign, /unassign, /blocked) to named product routes. Routes are registered declaratively; adding a new command does not require changes to the listener or dispatcher.",
  },
  {
    id: "pc4",
    name: "Dispatcher",
    icon: "⚡",
    shortRole: "Module orchestrator",
    responsibility:
      "Loads validated config for the target repository, selects the correct policy module from a module registry, calls it with the normalized event context, and forwards approved operations to the executor. Handles module-not-found, config-invalid, and policy-error paths without crashing.",
    highlight: true,
  },
  {
    id: "pc5",
    name: "Config Engine",
    icon: "⚙️",
    shortRole: "Policy surface",
    responsibility:
      "Loads .github/hiero-automation.yml via the GitHub API. Validates against a versioned JSON schema. Applies safe conservative defaults. Exposes only typed, validated settings to modules. Rejects unknown high-risk fields; warns on unknown low-risk fields.",
    highlight: true,
  },
  {
    id: "pc6",
    name: "Policy Modules",
    icon: "🧩",
    shortRole: "Pure decision functions",
    responsibility:
      "Small, independent modules with no cross-module coupling. Each module is a pure decision function: receives a validated event context and config, returns a list of approved operations. Modules do not call GitHub directly. Current planned: Assignment, PR Quality, Issue Lifecycle, PR Lifecycle, Progression, Review Process.",
  },
  {
    id: "pc7",
    name: "Executor",
    icon: "🚀",
    shortRole: "GitHub API writer",
    responsibility:
      "Executes approved operations against the GitHub API using installation-scoped tokens. Enforces idempotency via known-bot markers and delivery-ID tracking. Handles rate limiting with exponential back-off. Records actual mutation results for the audit log.",
  },
  {
    id: "pc8",
    name: "Audit Logger",
    icon: "📋",
    shortRole: "First-class component",
    responsibility:
      "Records every decision in a structured, append-only format: event context, config version used, selected policy module, intended operations, actual API results, and failure reasons. Enforces 90-day retention. Every event produces an audit record — even no-op decisions.",
    highlight: true,
  },
];

// ── Boundary zones ──────────────────────────────────────────
export const BOUNDARY_ZONES = [
  {
    id: "bz1",
    zone: "GitHub App",
    icon: "🤖",
    color: "#2563eb",
    stays: "Webhook listener, event normalizer, router, dispatcher, policy modules, executor, audit logging.",
    reason: "This is the final product and the place where reusable automation behavior belongs.",
  },
  {
    id: "bz2",
    zone: "Repository Config",
    icon: "📄",
    color: "#7c3aed",
    stays: "Labels, teams, thresholds, guide URLs, enabled modules, schedules, waiver labels, and policy choices.",
    reason: "SDKs need policy control without forking code.",
  },
  {
    id: "bz3",
    zone: "SDK Repo Workflows",
    icon: "🔧",
    color: "#16a34a",
    stays: "Build, test, release workflows, repo-specific CI, runner-controlled jobs, artifact handling, harden-runner, checkout, secrets.",
    reason: "Not every workflow is an app workflow. Some should remain local forever. These define the security boundary and event context for each repository.",
  },
  {
    id: "bz4",
    zone: "GitHub Actions Adapter",
    icon: "🔌",
    color: "#d97706",
    stays: "Optional adapter/canary for testing or transition.",
    reason: "Useful for validation, but Sophie's feedback says it should not drive the architecture.",
  },
  {
    id: "bz5",
    zone: "Human Maintainer Control",
    icon: "👤",
    color: "#dc2626",
    stays: "Approvals, overrides, disabling modules, reviewing rollout, and incident decisions.",
    reason: "Automation should reduce maintenance load, not remove accountability.",
  },
];

// ── Security threats (new 7-threat model from §7.1) ─────────
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
    title: "Forged Webhook",
    icon: "🛡️",
    threat: "Attacker sends a crafted payload to the listener endpoint to trigger unauthorized automation.",
    mitigation:
      "HMAC-SHA256 signature verification before any processing. Reject on mismatch — no routing logic runs on an unverified payload.",
  },
  {
    id: "s2",
    title: "Replayed Delivery",
    icon: "🔁",
    threat: "Attacker replays a valid, previously processed delivery ID to trigger duplicate side-effects.",
    mitigation:
      "24-hour delivery ID deduplication window with an atomic claim pattern (Redis SET NX or Postgres unique constraint). Duplicate deliveries are skipped before any non-idempotent actions.",
  },
  {
    id: "s3",
    title: "Config Injection",
    icon: "⚠️",
    threat: "A repo config attempts to expand permissions or inject behavior beyond its allowed policy surface.",
    mitigation:
      "Schema validation on every config load. Unknown high-risk fields cause the module to fail closed. Unknown low-risk fields emit a deprecation warning in the audit log.",
  },
  {
    id: "s4",
    title: "Comment Injection",
    icon: "💬",
    threat: "Malicious /assign target or command with crafted arguments designed to trigger unintended writes.",
    mitigation:
      "Strict command parser. Arguments validated against known patterns only. No dynamic code evaluation — config cannot inject behavior.",
  },
  {
    id: "s5",
    title: "Duplicate Writes",
    icon: "⚡",
    threat: "Retries or concurrent deliveries produce double comments, double labels, or conflicting assignment state.",
    mitigation:
      "Idempotency keys and known-bot marker checks before any GitHub write. Executor verifies current GitHub state before re-attempting any mutation after a partial success.",
  },
  {
    id: "s6",
    title: "Module Coupling",
    icon: "🔗",
    threat: "A growing module starts referencing internals of another module, creating brittle cross-module dependencies.",
    mitigation:
      "Policy modules are pure functions with no module-to-module imports. The Dispatcher mediates all cross-module data via the normalized event context. Enforced at the architectural level.",
  },
  {
    id: "s7",
    title: "Over-broad Permissions",
    icon: "🔐",
    threat: "App receives an installation token with write access to unrelated resources, violating least-privilege.",
    mitigation:
      "Minimum necessary GitHub App permissions. Installation-scoped tokens only, derived from private keys stored in a secure vault. Permissions documented per module before any write pilot.",
  },
  {
    id: "s8",
    title: "Fail-Closed by Default",
    icon: "🔒",
    threat: "When the dedup store or config source is unreachable, the app might proceed and cause inconsistent state.",
    mitigation:
      "If the dedup store is unreachable, the system fails closed: no non-idempotent changes are performed. Events are enqueued for manual reconciliation and an alert is emitted.",
  },
];

// ── /assign guard matrix ─────────────────────────────────────
export const ASSIGN_GUARDS = [
  {
    guard: "Issue open?",
    default: "Required",
    configOverride: "Not configurable",
    failureAction: "Reject silently",
  },
  {
    guard: "Not already assigned?",
    default: "Enforced",
    configOverride: "max_assignments: N",
    failureAction: "Reject + comment",
  },
  {
    guard: "Account age check",
    default: "Disabled",
    configOverride: "min_account_age_days",
    failureAction: "Reject + comment",
  },
  {
    guard: "Prerequisite issues",
    default: "Disabled",
    configOverride: "prerequisites: []",
    failureAction: "Reject + comment",
  },
  {
    guard: "Blocking labels",
    default: "in-progress",
    configOverride: "block_labels: []",
    failureAction: "Reject + comment",
  },
  {
    guard: "Waiver permission",
    default: "None",
    configOverride: "waiver_team",
    failureAction: "Skip guard",
  },
  {
    guard: "Maintainer override",
    default: "By team",
    configOverride: "maintainer_team",
    failureAction: "Skip all guards",
  },
];

// ── Prototypes ──────────────────────────────────────────────
export interface Prototype {
  id: string;
  name: string;
  repoUrl: string;
  demoUrl: string;
  focus: string;
  pipelineProof: string;
  features: string[];
  description: string;
}

export const PROTOTYPES: Prototype[] = [
  {
    id: "p1",
    name: "hiero-workflow-probot",
    repoUrl: "https://github.com/darshit2308/hiero-workflow-probot",
    demoUrl: "https://www.youtube.com/watch?v=J2CxOuN65ps",
    focus: "Config Engine Proof",
    pipelineProof: "Validates the Config Engine concept: a single .github/hiero-workflow.yml drives per-repo behavior without forking code.",
    features: [
      "Reads .github/hiero-workflow.yml config per repository",
      "Auto-label PRs based on file paths",
      "PR size warnings for large changesets",
      "Milestone tracking automation",
      "Greeting messages for new contributors",
    ],
    description:
      "Proves that config-driven orchestration can be driven from one schema-validated file instead of custom application code in each repo — the core premise of the Config Engine component.",
  },
  {
    id: "p2",
    name: "heiro-probot-official",
    repoUrl: "https://github.com/darshit2308/heiro-probot-official",
    demoUrl: "https://www.youtube.com/watch?v=1l5AqbGxl5o",
    focus: "/assign Pipeline Proof",
    pipelineProof: "Validates the first product slice: /assign command forces the full pipeline path — webhook → parse → policy → write → audit.",
    features: [
      "Full /assign and /unassign command pipeline",
      "Skill-tier progression checks",
      "Assignment limit enforcement",
      "Runs entirely through Octokit API",
      "Ported from C++ SDK's on-comment logic",
    ],
    description:
      "Validates that Hiero's tightly coupled workflow scripts can survive outside GitHub Actions. Successfully ported the C++ SDK's on-comment logic into a Node.js Probot environment — proving the first product slice works end-to-end.",
  },
];

// ── Phased delivery (7 phases from §9, with exit criteria) ──
export interface Phase {
  id: string;
  phase: string;
  label: string;
  dates: string;
  build: string;
  exitCriteria: string[];
  highlight?: boolean;
}

export const PHASES: Phase[] = [
  {
    id: "ph0",
    phase: "Phase 0",
    label: "Architecture Agreement",
    dates: "Pre Jun 15",
    build: "Agree on the eight-component pipeline. Align on /assign as first slice. Confirm config model direction with mentor.",
    exitCriteria: [
      "Mentor and maintainer agree on the pipeline architecture and /assign as the correct starting slice",
      "No upstream SDK depends on candidate repos yet",
    ],
  },
  {
    id: "ph1",
    phase: "Phase 1",
    label: "App Shell",
    dates: "Jun 15 – Jul 15",
    build: "Webhook listener with signature verification. Event normalizer. Router with declarative route registration. Dispatcher with module registry. Config engine with schema validation. Audit logger. No policy modules yet.",
    exitCriteria: [
      "Synthetic webhook events route correctly through all pipeline stages",
      "Audit records are produced for every event",
      "Security tests pass",
      "Config schema validation tests pass",
    ],
  },
  {
    id: "ph2",
    phase: "Phase 2",
    label: "/assign Minimal",
    dates: "Jul 16 – Aug 10",
    build: "Assignment Policy: issue eligibility, assignment write, explanatory comment, audit event. No guards yet — guards come in Phase 3. Sandbox end-to-end test.",
    exitCriteria: [
      "Works in sandbox with no duplicate writes",
      "Failure paths produce clear audit records",
      "Fixture parity established against at least 3 Python and 3 C++ golden cases",
    ],
  },
  {
    id: "ph3",
    phase: "Phase 3",
    label: "/assign Guards",
    dates: "Aug 11 – Aug 31",
    build: "Account age check, max assignments limit, prerequisites check, waiver labels, maintainer override, block labels. Dry-run pilot in one repository.",
    exitCriteria: [
      "All guard conditions have fixture-backed tests",
      "Dry-run output reviewed by at least one maintainer",
      "No unexpected mutations during dry-run pilot",
    ],
    highlight: true,
  },
  {
    id: "ph4",
    phase: "Phase 4",
    label: "PR Quality Module",
    dates: "Sep 1 – Oct 15",
    build: "DCO check, GPG check, merge conflict detection, linked issue requirement, conventional title check, dashboard label. Implemented as a separate module with no coupling to Assignment Policy internals.",
    exitCriteria: [
      "Runs as an independent module with its own config section and fixture suite",
      "Independent enabled flag — does not share internal state with Assignment Policy",
    ],
  },
  {
    id: "ph5",
    phase: "Phase 5",
    label: "Lifecycle Modules",
    dates: "Oct 16 – Nov 14",
    build: "Issue cleanup, PR cleanup, progression, and review process modules. Each implemented as a separate module with independent config section, fixture suite, and enablement flag.",
    exitCriteria: [
      "Each lifecycle module has config, tests, audit logs, and independent enablement",
      "No module shares internal state with another",
    ],
  },
  {
    id: "ph6",
    phase: "Phase 6",
    label: "Wider Rollout",
    dates: "Nov 15 – Nov 30",
    build: "Per-repo adoption guides, community issue backlog, sandbox walkthrough for /assign. Final evaluation and handoff.",
    exitCriteria: [
      "Adoption guides delivered to each SDK repository",
      "Community issue backlog opened with phase-gated safety labels",
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
  { id: "assign", label: "/assign Slice" },
  { id: "security", label: "Security" },
  { id: "prototypes", label: "Prototypes" },
  { id: "timeline", label: "Roadmap" },
  { id: "questions", label: "Task Answers" },
];

// ── Legacy export (kept for backward compat with any remaining uses) ──
export const MILESTONES = PHASES.map((p) => ({
  id: p.id,
  phase: p.phase,
  dates: p.dates,
  title: p.label,
  focus: p.build,
  deliverables: p.exitCriteria,
  highlight: p.highlight,
}));
