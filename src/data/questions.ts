// ── FILL THESE IN BEFORE DEPLOYMENT ─────────────────────
export const SITE_CONFIG = {
  pdfUrl: "#",
  githubUrl: "#",
  arc42Url: "https://arc42.org/",
  ghActionsSecurityUrl:
    "https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions",
};

export type CriterionKey = "K" | "R" | "A" | "E";

export interface Callout {
  kind: "invariant" | "warn";
  text: string;
}

export interface Question {
  id: string; // q1..q9
  number: string;
  title: string;
  marks: number;
  criteria: { key: CriterionKey; value: number }[];
  pullQuote: string;
  fullSpan?: boolean;
  mermaid: string;
  diagramCaption: string;
  callouts?: Callout[];
  body: string; // simple HTML
  youtubeUrl?: string | null;
}

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    number: "Q1",
    title: "Well-Architected Principles Applied to Hiero",
    marks: 4,
    criteria: [
      { key: "K", value: 2 },
      { key: "R", value: 2 },
    ],
    pullQuote:
      "Clear responsibility: SDK repos own triggers; the central repo owns reusable decisions.",
    youtubeUrl: null,
    mermaid: `mindmap
  root((Well-Architected Hiero))
    Clear Responsibility
      SDK repos own triggers and permissions
      Central repo owns decision logic and schemas
    Secure by Design
      Least-privilege GITHUB_TOKEN
      Pin actions by full SHA
      Fail closed on invalid config
    Low Coupling
      packages/core is adapter-agnostic
      Actions and Probot are thin adapters
    Observable and Testable
      Dry-run output
      Golden fixtures
      Parity tests before writes
    Evolvable
      Registry-based automation addition
      Versioned config schema`,
    diagramCaption:
      "Five well-architected principles, each tied to a specific Hiero failure mode it eliminates.",
    callouts: [
      {
        kind: "invariant",
        text: "The principles are not aspirational — each one eliminates a specific failure mode that already exists in the current workflows.",
      },
    ],
    body: `
      <p>Five well-architected principles, applied directly to this system:</p>
      <ol>
        <li><strong>Clear responsibility</strong> — SDK repositories own triggers, permissions, checkout, harden-runner, secrets, and local policy. The central repository owns reusable automation decisions, schemas, adapters, fixtures, and releases. No step in this split hides a security control or merges two governance domains into one artefact.</li>
        <li><strong>Secure by design</strong> — Use least-privilege <code>GITHUB_TOKEN</code> scopes; avoid running untrusted PR code in privileged jobs; pin production actions by full commit SHA; protect config with CODEOWNERS; fail closed on invalid config.</li>
        <li><strong>Low coupling and high cohesion</strong> — Automation rules live in <code>packages/core</code>. GitHub Actions and Probot are thin adapters so the same behaviour runs from either execution model without duplicating logic.</li>
        <li><strong>Observable and testable</strong> — Every automation supports dry-run output, structured logs, idempotent writes, golden fixtures, and behaviour parity tests before write mode is enabled upstream.</li>
        <li><strong>Evolvable</strong> — New automations are registered in the core and versioned through the config schema, rather than copied across SDK repositories.</li>
      </ol>
    `,
  },
  {
    id: "q2",
    number: "Q2",
    title: "Proposed Final System Architecture",
    marks: 4,
    criteria: [
      { key: "R", value: 2 },
      { key: "A", value: 2 },
    ],
    pullQuote:
      "Four zones, one invariant: centralise decision logic; never centralise repository control.",
    fullSpan: true,
    youtubeUrl: null,
    mermaid: `graph LR
  subgraph SDK_Repos["Python / C++ SDK Repos"]
    direction TB
    WF["Workflow YAML<br/>triggers, permissions<br/>harden-runner, checkout<br/>repo config, rollout approval"]
  end
  subgraph Actions_Adapter["GitHub Action Adapter (Current Path)"]
    direction TB
    AA["Validates inputs/config<br/>Calls shared core<br/>Supports dry-run and writes"]
  end
  subgraph Probot_Adapter["Probot / GitHub App Adapter (Later Path)"]
    direction TB
    PA["Webhook auth and routing<br/>Same core functions<br/>No second behaviour copy"]
  end
  subgraph Core["sdk-automations / packages/core"]
    direction TB
    CR["Registry, review-sync<br/>Assignment, PR checks<br/>Comment builders, label decisions<br/>Config validation, fixtures<br/>Golden parity tests"]
  end
  GH_API["GitHub API<br/>Comments, Labels<br/>Assignees, PR metadata"]
  SDK_Repos -->|"uses (pinned SHA)"| Actions_Adapter
  SDK_Repos -.->|"opts in (later)"| Probot_Adapter
  Actions_Adapter -->|"calls"| Core
  Probot_Adapter -->|"calls"| Core
  Core -->|"read/write"| GH_API`,
    diagramCaption:
      "Four zones converge on one shared core. No zone owns another's security boundary.",
    callouts: [
      {
        kind: "invariant",
        text: "Centralise reusable decision logic. Do not centralise repository control until governance, security, and parity gates are satisfied.",
      },
    ],
    body: `
      <p>Four zones exist in the architecture:</p>
      <ol>
        <li>SDK repos that own all workflow control and security.</li>
        <li>The GitHub Action adapter as the current execution path.</li>
        <li>The Probot/GitHub App adapter as the later path calling the same core.</li>
        <li><code>sdk-automations/packages/core</code> containing all reusable decision logic.</li>
      </ol>
      <p>All paths converge on the same core. No zone owns another's security boundary.</p>
    `,
  },
  {
    id: "q3",
    number: "Q3",
    title: "Architectural Boundaries and Why They Exist",
    marks: 4,
    criteria: [
      { key: "R", value: 2 },
      { key: "E", value: 2 },
    ],
    pullQuote:
      "Each boundary corresponds to a real risk if violated — not an aesthetic preference.",
    youtubeUrl: null,
    mermaid: `graph TB
  subgraph Repo_Local["Repo-Local Boundary (Security and Maintainer Ownership)"]
    RL["YAML triggers<br/>Permissions<br/>Checkout ref<br/>Harden-runner<br/>Concurrency<br/>Token selection"]
  end
  subgraph Shared_Core["Shared-Core Boundary (Shared Implementation)"]
    SC["Label decisions<br/>Assignment eligibility<br/>Review-sync rules<br/>Comment builders<br/>Retry helpers<br/>Schemas and Fixtures"]
  end
  subgraph Policy["Policy Boundary (Protected Local Config)"]
    PO["Label names<br/>Team handles<br/>Docs links<br/>Assignment limits<br/>Enabled automations"]
  end
  subgraph Hosted_App["Hosted-App Boundary (Deferred)"]
    HA["Probot hosting<br/>Webhook secrets<br/>Installation permissions<br/>Availability SLA<br/>Incident ownership"]
  end
  Repo_Local -->|"calls via pinned SHA"| Shared_Core
  Policy -->|"validated by schema"| Shared_Core
  Shared_Core -->|"future adapter"| Hosted_App`,
    diagramCaption:
      "Four boundaries with explicit ownership; crossing them requires a reviewed contract.",
    body: `
      <table>
        <thead><tr><th>Boundary</th><th>What lives there</th><th>Why it must stay there</th></tr></thead>
        <tbody>
          <tr><td>Repo-local</td><td>Workflow YAML, permissions, checkout ref, harden-runner, concurrency, token selection</td><td>Security and maintainer-ownership controls. Moving them hides the security surface from the team accountable for it.</td></tr>
          <tr><td>Shared-core</td><td>Label decisions, assignment eligibility, review-sync rules, PR checks, comment builders, retry helpers, logging conventions, fixtures, schemas</td><td>Duplication creates maintenance cost and behavioural drift across SDKs.</td></tr>
          <tr><td>Policy</td><td>Labels, team handles, docs links, support channels, assignment limits, enabled automations</td><td>SDK-specific choices must not become code forks in the shared repo.</td></tr>
          <tr><td>Hosted-app</td><td>Probot/GitHub App hosting</td><td>Introduces webhook secrets, installation permissions, availability SLAs, incident response — not warranted until core is stable.</td></tr>
        </tbody>
      </table>
    `,
  },
  {
    id: "q4",
    number: "Q4",
    title: "Tooling Choices",
    marks: 6,
    criteria: [
      { key: "R", value: 2 },
      { key: "A", value: 2 },
      { key: "E", value: 2 },
    ],
    pullQuote:
      "Every tooling choice is justified by what it prevents, not only what it enables.",
    youtubeUrl: null,
    mermaid: `graph TD
  Runtime["GitHub Actions<br/>Current execution env<br/>No new infrastructure"]
  Lang["Node.js + Octokit<br/>Native to GitHub automation<br/>Bundles as action artifact"]
  Core["packages/core<br/>Adapter-agnostic modules<br/>Same functions for Actions and Probot"]
  Config["YAML/JSON + JSON Schema<br/>Versioned contract<br/>Fails closed on invalid"]
  Test["Unit + Mock + Fixtures<br/>Dry-run canaries + Parity checks<br/>Each layer catches different failure"]
  SecOps["Harden-Runner + CODEOWNERS<br/>SHA pinning + npm audit<br/>Branch protection + Rollback docs"]
  Runtime --> Core
  Lang --> Core
  Core --> Config
  Core --> Test
  Config --> SecOps
  Test --> SecOps`,
    diagramCaption:
      "Six tooling layers, each chosen for a specific failure mode it prevents.",
    callouts: [
      {
        kind: "invariant",
        text: "Tooling that cannot be pinned, audited, or rolled back is not acceptable in a security-sensitive automation path.",
      },
    ],
    body: `
      <ul>
        <li><strong>GitHub Actions first</strong> — matches existing SDK operations; no new hosting introduced in Phase 1.</li>
        <li><strong>Node.js / Octokit</strong> — native to GitHub automation, bundles cleanly, no secondary runtime needed.</li>
        <li><strong>packages/core</strong> — adapter-agnostic; behaviour tested once, delivered to both Actions and Probot.</li>
        <li><strong>JSON Schema config</strong> — schema versioning prevents silent drift; invalid config fails closed.</li>
        <li><strong>Layered verification</strong> — unit, mocked integration, golden fixtures, dry-run canaries, parity checks.</li>
        <li><strong>Security ops stack</strong> — Harden-Runner, CODEOWNERS, branch protection, SHA pinning, Dependabot — governance gate, not optional extras.</li>
      </ul>
    `,
  },
  {
    id: "q5",
    number: "Q5",
    title: "How This Solution Builds Iteratively",
    marks: 2,
    criteria: [{ key: "A", value: 2 }],
    pullQuote:
      "Architecture and threat model first — but reversible proof work starts immediately.",
    youtubeUrl: null,
    mermaid: `timeline
  title Iterative Build Sequence
  Architecture and reversible work : Threat model and boundaries : Core skeleton and schema : Fixtures and dry-run adapter
  Python review-sync pilot : Dry-run canary upstream : Parity tests pass : One controlled write enabled
  Assignment mapping : Python and C++ behaviour compared : Common core extracted only after map
  C++ investigation : Before/after examples collected : Wrapper evaluated with evidence
  Probot / GitHub App : Adapter over stable core : No second behaviour implementation`,
    diagramCaption:
      "Five sequenced stages — reversible work runs in parallel with architecture.",
    body: `
      <p>Five sequenced stages — architecture and reversible proof work run in parallel; Python review-sync pilots first (bounded, canary-proven); assignment logic extraction waits for a Python/C++ behaviour map; C++ follows through investigation; Probot comes last as an adapter, not a rewrite.</p>
    `,
  },
  {
    id: "q6",
    number: "Q6",
    title: "Malicious Pull Request Risks and Safeguards",
    marks: 10,
    criteria: [
      { key: "K", value: 4 },
      { key: "R", value: 3 },
      { key: "A", value: 3 },
    ],
    pullQuote:
      "Assume a malicious contributor controls the PR branch, title, body, files, and any artefacts it produces.",
    youtubeUrl: null,
    mermaid: `graph TD
  A["Malicious PR<br/>Fork contributor"] -->|"controls"| B["PR title/body/branch<br/>Changed files<br/>Workflow/config in PR branch<br/>Artifacts from untrusted code"]
  B --> C{"Risk surface"}
  C -->|"Attack 1"| D["pull_request_target abuse<br/>or expanded permissions"]
  C -->|"Attack 2"| E["Token/secret<br/>exfiltration via logs"]
  C -->|"Attack 3"| F["Action or dependency<br/>compromise"]
  C -->|"Attack 4"| G["Config/policy<br/>tampering"]
  C -->|"Attack 5"| H["Artifact poisoning<br/>via workflow_run"]
  C -->|"Attack 6"| I["Bot loops or<br/>broad writes"]
  D --> D1["Never checkout PR head in privileged jobs<br/>Load config from default branch only"]
  E --> E1["Harden-runner early and visible<br/>Mask sensitive values<br/>Audit egress"]
  F --> F1["Pin all actions by full SHA<br/>Dependabot + npm audit<br/>Protect release branches"]
  G --> G1["CODEOWNERS on hiero-automation files<br/>Schema validate on every invocation<br/>Fail closed on unknown fields"]
  H --> H1["Validate run source, run ID,<br/>artefact name, path, checksum<br/>Never trust PR artefacts as authority"]
  I --> I1["Actor/bot guards<br/>Idempotent markers<br/>Scoped label allowlists<br/>Concurrency keys + rollback path"]`,
    diagramCaption:
      "Six attack vectors mapped to specific safeguards. All writes validate first and fail closed.",
    callouts: [
      {
        kind: "warn",
        text: "Systemic safeguards apply across all risks: validate actor type, event type, repo, PR number, and config schema before acting. Unknown config fails closed. For workflow_run flows, validate artefact identity locally before consuming anything. For Probot: verify webhook signatures, use installation-scoped permissions.",
      },
    ],
    body: `
      <p>The highest-risk design area. The architecture assumes a malicious contributor can control PR title/body, branch name, changed files, artefacts produced by untrusted code, and workflow/config changes in the PR branch.</p>
      <p>Six attack vectors are identified with specific safeguards for each (see diagram and full PDF). Systemic safeguards apply across all: validate before acting, fail closed, scope all writes, make all writes idempotent.</p>
    `,
  },
  {
    id: "q7",
    number: "Q7",
    title: "Configuration Standardisation vs. User Input",
    marks: 6,
    criteria: [
      { key: "K", value: 2 },
      { key: "R", value: 2 },
      { key: "A", value: 2 },
    ],
    pullQuote:
      "If it is common behaviour, put it in core. If it is repo policy, make it protected config.",
    youtubeUrl: null,
    mermaid: `graph LR
  subgraph Standardise["Standardise Centrally (Non-negotiable contract)"]
    S1["Schema version"]
    S2["Automation names"]
    S3["Dry-run/write contract"]
    S4["Result/log format"]
    S5["Bot comment markers"]
    S6["Retry logic"]
    S7["Error categories"]
    S8["Release compatibility"]
  end
  subgraph UserInput["Allow Per-Repo (With guardrails)"]
    U1["Label names"]
    U2["Team handles"]
    U3["Docs links"]
    U4["Assignment limits"]
    U5["Enabled automations"]
    U6["Schedules"]
    U7["Branch filters"]
  end
  subgraph Schema["JSON Schema Validation (Central enforcement)"]
    V["Valid config proceeds<br/>Invalid config fails closed"]
  end
  Standardise --> Schema
  UserInput --> Schema`,
    diagramCaption:
      "Two surfaces, one schema. The schema is the contract — invalid input never reaches the API.",
    callouts: [
      {
        kind: "invariant",
        text: "Avoid arbitrary scripts, unlimited switches, and template overrides — those recreate the maintenance tax centrally rather than eliminating it.",
      },
    ],
    body: `
      <p>The split is clean: behaviour is central; policy is local; the schema is the contract between them.</p>
    `,
  },
  {
    id: "q8",
    number: "Q8",
    title: "Community Leverage Plan",
    marks: 10,
    criteria: [
      { key: "K", value: 3 },
      { key: "R", value: 3 },
      { key: "A", value: 4 },
    ],
    pullQuote:
      "Give contributors useful work without making maintainers triage risky rewrites.",
    youtubeUrl: null,
    mermaid: `graph TD
  Backlog["Public Issue Backlog<br/>(Architecture as community surface)"]
  Backlog --> L1["good-first-issue<br/>Docs and fixture extraction"]
  Backlog --> L2["beginner<br/>Test cases and config samples"]
  Backlog --> L3["intermediate<br/>Adapter and config validation"]
  Backlog --> L4["advanced<br/>Security pilots and C++ investigation"]
  L1 --> RFC["RFC Thread Per Automation<br/>States: reusable logic, boundary, policy<br/>fixtures, rollback plan, owner"]
  L2 --> RFC
  L3 --> RFC
  L4 --> RFC
  RFC --> PR["Reviewable PR<br/>Dry-run proof + Parity tests<br/>Security checklist + Maintainer approval"]
  PR --> Demo["Public canary reproduction steps<br/>Python and C++ maintainers review behaviour<br/>Central team reviews schema and security"]`,
    diagramCaption:
      "Four contributor tiers feed RFC threads, which gate reviewable PRs and public canaries.",
    body: `
      <table>
        <thead><tr><th>Work package</th><th>Good community issue shape</th></tr></thead>
        <tbody>
          <tr><td>Behaviour mapping</td><td>Compare Python and C++ behaviour for one automation; record common logic, policy differences, fixtures, and unknowns.</td></tr>
          <tr><td>Fixture and parity tests</td><td>Convert real examples into golden cases so central behaviour is proved before production writes.</td></tr>
          <tr><td>Docs and examples</td><td>Create caller workflow examples, config samples, rollback instructions, and security checklists.</td></tr>
          <tr><td>Canary support</td><td>Run dry-run pilots, collect logs, identify false positives, and file follow-up issues.</td></tr>
          <tr><td>Security review</td><td>Threat-model pull_request_target, artefact flows, permissions, app installation scopes, and release pinning.</td></tr>
        </tbody>
      </table>
      <p>Each automation migration has an RFC thread before any code moves. Each RFC states: reusable logic, repo-local boundary, policy config, test fixtures, rollback plan, and owner.</p>
    `,
  },
  {
    id: "q9",
    number: "Q9",
    title: "Architecture vs. Immediate Development",
    marks: 4,
    criteria: [
      { key: "R", value: 2 },
      { key: "E", value: 2 },
    ],
    pullQuote:
      "Two focused architecture weeks — but reversible work begins immediately, in parallel.",
    youtubeUrl: null,
    mermaid: `quadrantChart
  title Risk vs Value of Development Approaches
  x-axis Low Risk --> High Risk
  y-axis Low Value --> High Value
  quadrant-1 Do First
  quadrant-2 Do With Care
  quadrant-3 Deprioritise
  quadrant-4 Avoid
  Architecture and reversible work: [0.2, 0.85]
  Fixtures and schema: [0.15, 0.7]
  Dry-run adapter: [0.25, 0.75]
  Python review-sync pilot: [0.35, 0.8]
  Immediate production writes: [0.85, 0.4]
  C++ wrapper unproven: [0.9, 0.35]
  Skip architecture entirely: [0.95, 0.2]`,
    diagramCaption:
      "Risk-versus-value placement of every option considered. The recommended path lives top-left.",
    body: `
      <table>
        <thead><tr><th>Option</th><th>Risk</th><th>Assessment</th></tr></thead>
        <tbody>
          <tr><td>Start development immediately (skip architecture)</td><td>High</td><td>Replicates the existing problem: independent evolution, inconsistent security assumptions, no parity baseline.</td></tr>
          <tr><td>Full architecture freeze before any code</td><td>Medium</td><td>Delays reversible proof work unnecessarily; fixtures, schema, and dry-run adapters carry no production risk.</td></tr>
          <tr><td><strong>Two-week focused architecture + reversible work in parallel</strong></td><td><strong>Low</strong></td><td><strong>Recommended.</strong> Architecture gates production writes; reversible work proceeds without risk.</td></tr>
        </tbody>
      </table>
      <p><strong>Week 1:</strong> Context diagram, boundary definitions, threat model, config schema contract.<br/>
      <strong>Week 2:</strong> Behaviour maps, pilot criteria, rollback plan, community issue backlog.</p>
    `,
  },
];
