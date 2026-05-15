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
      "One trust boundary at the listener. Modules are pure functions. Audit is first-class.",
    youtubeUrl: null,
    mermaid: `mindmap
  root((Well-Architected Hiero App))
    One Trust Boundary
      HMAC-SHA256 at Webhook Listener
      No module receives unverified payload
      Fail closed on signature mismatch
    Modules Are Pure
      Policy modules return decisions only
      No direct GitHub API calls from modules
      Trivially unit-testable in isolation
    Config Is Policy Not Code
      Schema-validated hiero-automation.yml
      Repositories express intent not behavior
      Unknown high-risk fields fail closed
    Executor Owns All Mutations
      Single write path for idempotency
      Delivery ID deduplication
      Exponential back-off centrally enforced
    Audit Is First-Class
      Every event produces an audit record
      Even no-op decisions are recorded
      90-day append-only retention
    Shell Before Modules
      Pipeline proven end-to-end first
      Then one policy module at a time
      assign first then PR quality then lifecycle`,
    diagramCaption:
      "Six well-architected principles from the new GitHub App architecture — each eliminates a specific failure mode.",
    callouts: [
      {
        kind: "invariant",
        text: "The principles are not aspirational — each one eliminates a specific failure mode in the current per-repo script approach.",
      },
    ],
    body: `
      <p>Six well-architected principles for the Hiero Workflow App GitHub App architecture:</p>
      <ol>
        <li><strong>One trust boundary, at the listener</strong> — Every event is HMAC-SHA256 verified before entering the internal pipeline. No policy module receives an unverified payload. Reject on mismatch before any routing logic runs.</li>
        <li><strong>Modules are pure</strong> — Policy modules are pure decision functions: they receive a validated event context and config, return a list of approved operations, and perform no I/O. This makes them trivially testable in isolation.</li>
        <li><strong>Config is policy, not code</strong> — The <code>.github/hiero-automation.yml</code> is the app's governance surface. Repositories express intent through typed, schema-validated fields. They cannot inject behavior through config.</li>
        <li><strong>Executor handles all mutations</strong> — No module writes to GitHub directly. Idempotency, delivery deduplication, rate-limit handling, and audit logging are all centrally enforceable in a single write path.</li>
        <li><strong>Audit is first-class</strong> — Every event produces an audit record regardless of outcome. An event that produces no mutation still produces an audit entry explaining why. 90-day append-only retention.</li>
        <li><strong>Shell before modules</strong> — The listener → normalizer → router → dispatcher → executor → audit path must work end-to-end before any policy module is attached. Then one module at a time, starting with /assign.</li>
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
      "GitHub App with a clean 8-stage pipeline. Shell before modules. /assign is the first product slice.",
    fullSpan: true,
    youtubeUrl: null,
    mermaid: `graph TB
  GH["GitHub Repositories"]

  subgraph App["Hiero Workflow App - GitHub App"]
    direction TB
    L["Webhook Listener\nHMAC-SHA256 - Trust Boundary"]
    N["Event Normalizer\nNormalizedEvent model"]
    R["Router\nDeclarative route registration"]
    D["Dispatcher\nModule registry - Error handling"]
    PM["Policy Modules\nPure decision functions - No IO"]
    E["Executor\nIdempotency - Back-off"]
    CE["Config Engine\nhiero-automation.yml - Schema validated"]
    AL["Audit Logger\nAppend-only - 90-day retention"]
  end

  GHAPI["GitHub API"]

  GH -->|"HTTPS webhook"| L
  L -->|"Verified payload"| N
  N -->|"NormalizedEvent"| R
  R -->|"Named route"| D
  CE -->|"Validated config"| D
  D -->|"Event context + config"| PM
  PM -->|"ApprovedOperations"| E
  E -->|"read/write"| GHAPI
  CE -->|"reads config"| GHAPI
  L -->|"audit"| AL
  N -->|"audit"| AL
  D -->|"audit"| AL
  E -->|"audit"| AL`,
    diagramCaption:
      "Eight-component GitHub App pipeline. Config Engine and Audit Logger are crosscutting. No module writes to GitHub directly — only the Executor does.",
    callouts: [
      {
        kind: "invariant",
        text: "The GitHub App IS the product architecture — not a 'later path'. GitHub Actions is a compatibility and testing adapter only. The pipeline must work end-to-end before any policy module is attached.",
      },
    ],
    body: `
      <p>The end-state architecture is a GitHub App with a clean 8-stage event pipeline:</p>
      <ol>
        <li><strong>Webhook Listener</strong> — First and only trust boundary. HMAC-SHA256 verification before any routing logic runs.</li>
        <li><strong>Event Normalizer</strong> — Converts raw GitHub payloads to a stable <code>NormalizedEvent</code> model. Policy modules never depend on raw webhook shape.</li>
        <li><strong>Router</strong> — Maps normalized events and parsed commands (e.g. <code>/assign</code>) to named product routes. Declaratively registered; adding a command doesn't require changes to listener or dispatcher.</li>
        <li><strong>Dispatcher</strong> — Loads validated config, selects the correct policy module, and forwards approved operations to the executor. Handles all error paths without crashing.</li>
        <li><strong>Config Engine</strong> — Loads and validates <code>.github/hiero-automation.yml</code> from the target repository. Applies schema validation and safe defaults. Unknown high-risk fields fail closed.</li>
        <li><strong>Policy Modules</strong> — Pure decision functions. Receive validated event context and config; return a list of <code>ApprovedOperation</code>s. Never call GitHub directly. First module: <code>/assign</code>.</li>
        <li><strong>Executor</strong> — Executes approved operations against the GitHub API. Enforces idempotency, handles rate limits, records mutation results for audit.</li>
        <li><strong>Audit Logger</strong> — Records every decision append-only: event context, config version, module selected, intended operations, actual results, failure reasons. 90-day retention.</li>
      </ol>
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
    mermaid: `graph LR
  subgraph GitHub_App["GitHub App (Product Centre)"]
    GA["Webhook Listener\nEvent Normalizer\nRouter - Dispatcher\nPolicy Modules\nExecutor\nAudit Logger"]
  end
  subgraph Repo_Config["Repository Config (Per-SDK Policy)"]
    RC["Labels - Teams\nThresholds\nGuide URLs\nEnabled modules\nWaiver labels"]
  end
  subgraph SDK_Workflows["SDK Repo Workflows (Stay Local Forever)"]
    SW["Build - Test - Release\nRepo-specific CI\nRunner jobs\nharden-runner\nCheckout - Secrets"]
  end
  subgraph Actions_Adapter["GitHub Actions Adapter (Testing Path Only)"]
    AA["Optional canary\nCompatibility testing\nNot the product architecture"]
  end
  subgraph Human["Human Maintainer Control"]
    HM["Approvals\nModule disable\nRollout decisions\nIncident response"]
  end
  Repo_Config -->|"read by Config Engine"| GitHub_App
  GitHub_App -->|"writes via Executor"| GHAPI["GitHub API"]
  SDK_Workflows -.->|"triggers webhooks"| GitHub_App
  Human -->|"overrides and approvals"| GitHub_App
  Actions_Adapter -.->|"testing/canary only"| GitHub_App`,
    diagramCaption:
      "Five boundary zones. The GitHub App is the product centre — not a future path. SDK workflows stay local forever.",
    body: `
      <table>
        <thead><tr><th>Zone</th><th>What stays there</th><th>Why it must stay there</th></tr></thead>
        <tbody>
          <tr><td>GitHub App</td><td>Webhook listener, event normalizer, router, dispatcher, policy modules, executor, audit logging</td><td>This is the final product and the place where reusable automation behavior belongs.</td></tr>
          <tr><td>Repository Config</td><td>Labels, teams, thresholds, guide URLs, enabled modules, schedules, waiver labels, policy choices</td><td>SDKs need policy control without forking code. Config is the governance contract, not a convenience feature.</td></tr>
          <tr><td>SDK Repo Workflows</td><td>Build, test, release workflows, repo-specific CI, runner-controlled jobs, artifact handling, harden-runner, checkout, secrets</td><td>Not every workflow is an app workflow. These define the security boundary and event context for each repository and must stay local forever.</td></tr>
          <tr><td>GitHub Actions Adapter</td><td>Optional canary/testing adapter for transition and validation</td><td>Useful for validation only. Sophie's feedback: it should not drive the architecture. It is a testing path, not the product.</td></tr>
          <tr><td>Human Maintainer Control</td><td>Approvals, module disabling, rollout decisions, incident response</td><td>Automation reduces maintenance load but must never remove maintainer accountability.</td></tr>
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
  Runtime["GitHub App Hosting\nNode.js server or cloud function\nWebhook endpoint - Secure vault"]
  Lang["Node.js + Octokit\nNative to GitHub API\nInstallation-scoped tokens"]
  Pipeline["8-Component Pipeline\nListener - Normalizer - Router\nDispatcher - Policy Modules\nExecutor - Config Engine - Audit"]
  Config["YAML + JSON Schema\nVersioned contract\nFails closed on invalid\nSafe defaults applied"]
  Test["Unit + Mock + Fixtures\nSecurity tests on every push\n90 pct branch coverage target"]
  SecOps["HMAC-SHA256 verification\nDelivery ID deduplication\nIdempotency keys\nMin-permission tokens"]
  Runtime --> Pipeline
  Lang --> Pipeline
  Pipeline --> Config
  Pipeline --> Test
  Config --> SecOps
  Test --> SecOps`,
    diagramCaption:
      "Six tooling layers built around the GitHub App pipeline. GitHub Actions is a testing/compatibility adapter, not the runtime.",
    callouts: [
      {
        kind: "invariant",
        text: "Tooling that cannot be pinned, audited, or rolled back is not acceptable in a security-sensitive automation path.",
      },
    ],
    body: `
      <ul>
        <li><strong>GitHub App hosting</strong> — The product runtime is a webhook listener (Node.js server or cloud function) with a secure vault for private keys, not GitHub Actions. Actions is the compatibility/testing path only.</li>
        <li><strong>Node.js / Octokit</strong> — native to GitHub automation, installation-scoped tokens, no secondary runtime needed.</li>
        <li><strong>8-component pipeline</strong> — Listener, Normalizer, Router, Dispatcher, Policy Modules, Executor, Config Engine, Audit Logger. Each component has a single responsibility.</li>
        <li><strong>JSON Schema config</strong> — Schema versioning prevents silent drift; invalid config fails closed; safe conservative defaults applied automatically.</li>
        <li><strong>Layered testing</strong> — Unit (policy decisions as pure functions), integration (mocked GitHub API), fixture/golden tests, schema tests, security/negative tests, sandbox app tests. 90%+ branch coverage on state-mutating logic.</li>
        <li><strong>Security ops stack</strong> — HMAC-SHA256 signature verification, delivery ID deduplication, idempotency keys, minimum-permission installation-scoped tokens, fail-closed on dedup store unavailability.</li>
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
      "App Shell first. Then /assign. Then one module at a time — gated by exit criteria, not calendar dates.",
    youtubeUrl: null,
    mermaid: `timeline
  title 7-Phase Gated Delivery Roadmap
  Phase 0 Architecture Agreement : Agree on 8-component pipeline : Confirm assign as first slice : Mentor and maintainer sign-off
  Phase 1 App Shell : Webhook Listener and Normalizer : Router and Dispatcher : Config Engine and Audit Logger : No policy modules yet
  Phase 2 assign Minimal : Issue eligibility check : Assignment write and comment : Audit event per outcome : Sandbox end-to-end test
  Phase 3 assign Guards : Account age and max assignments : Prerequisites and block labels : Waiver and maintainer override : Dry-run pilot in one repo
  Phase 4 PR Quality Module : DCO and GPG checks : Merge conflict detection : Linked issue requirement : Independent module and config section
  Phase 5 Lifecycle Modules : Issue and PR cleanup : Progression and review process : Each module independent : Own config fixture enablement
  Phase 6 Wider Rollout : Per-repo adoption guides : Community issue backlog : Final demo and handoff`,
    diagramCaption:
      "7-phase gated roadmap. Each phase closes only when its exit criteria are met — not on a calendar date.",
    body: `
      <p>Seven gated phases — each phase must satisfy specific exit criteria before advancing. A phase is not complete because the calendar says so; it is complete when the observable conditions are met.</p>
      <ul>
        <li><strong>Phase 0</strong> — Architecture agreement. /assign confirmed as first slice. No code written until mentor and maintainer agree on the pipeline model.</li>
        <li><strong>Phase 1</strong> — App Shell: listener, normalizer, router, dispatcher, config engine, executor, audit logger. No policy module yet. Exit: synthetic webhooks route end-to-end, audit records produced, security tests pass.</li>
        <li><strong>Phase 2</strong> — /assign minimal: issue eligibility, assignment write, comment, audit. No guards yet. Exit: works in sandbox, no duplicate writes, failure paths audited.</li>
        <li><strong>Phase 3</strong> — /assign guards: account age, max assignments, prerequisites, block labels, waiver, maintainer override. Dry-run pilot. Exit: all guards fixture-tested, dry-run reviewed by maintainer.</li>
        <li><strong>Phase 4</strong> — PR Quality: DCO, GPG, merge conflict, linked issue, conventional title. Independent module. Exit: independent config section, no shared state with Assignment Policy.</li>
        <li><strong>Phase 5</strong> — Lifecycle modules: issue cleanup, PR cleanup, progression, review process. Exit: each independent with own config, fixtures, enablement flag.</li>
        <li><strong>Phase 6</strong> — Wider rollout: adoption guides, community issue backlog, final demo and handoff.</li>
      </ul>
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
        text: "Systemic safeguards apply across all risks: validate actor type, event type, repo, PR number, and config schema before acting. Unknown config fails closed. For workflow_run flows, validate artefact identity locally before consuming anything. Webhook Listener: verify HMAC-SHA256 signature, use installation-scoped permissions, dedup delivery IDs.",
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
  Backlog["Phase-Gated Issue Backlog\n(Architecture as community surface)"]
  Backlog --> L1["architecture-doc\nContext diagrams, boundary docs, config schema"]
  Backlog --> L2["fixture\nGolden test cases for policy module behaviour"]
  Backlog --> L3["schema\nConfig schema sections and validation rules"]
  Backlog --> L4["policy-module\nPolicy module implementation per phase"]
  Backlog --> L5["security-review\nThreat model, permission audit, dedup review"]
  Backlog --> L6["rollout-doc\nAdoption guides, canary steps, rollback plans"]
  L1 --> Gate["Phase Gate Review\nMentor and maintainer review evidence\nExit criteria verified before next phase opens"]
  L2 --> Gate
  L3 --> Gate
  L4 --> Gate
  L5 --> Gate
  L6 --> Gate
  Gate --> PR["Reviewable PR\nUnit tests + Schema tests\nSecurity checklist + Maintainer approval"]
  PR --> Merge["Merge to main\nAudit record updated\nNext phase issues opened"]`,
    diagramCaption:
      "Phase-gated community issue backlog. Each phase opens a new set of labelled issues. Issues advance only after phase exit criteria pass.",
    body: `
      <table>
        <thead><tr><th>Issue label</th><th>What contributors work on</th></tr></thead>
        <tbody>
          <tr><td><code>architecture-doc</code></td><td>Context diagrams, boundary definitions, config schema documentation, decision records.</td></tr>
          <tr><td><code>fixture</code></td><td>Golden test cases for policy module behaviour — converts real /assign examples into fixture-backed unit tests.</td></tr>
          <tr><td><code>schema</code></td><td>Config schema sections, validation rules for each module's config block, schema migration guides.</td></tr>
          <tr><td><code>policy-module</code></td><td>Policy module implementation (pure decision functions) gated to the correct phase.</td></tr>
          <tr><td><code>security-review</code></td><td>Threat modelling, permission audits, delivery deduplication review, webhook security review.</td></tr>
          <tr><td><code>rollout-doc</code></td><td>Per-repo adoption guides, canary walkthrough steps, rollback plans and incident runbooks.</td></tr>
          <tr><td><code>maintainer-only</code></td><td>Phase gate approvals, module disablement, incident decisions. Not open to external contributors.</td></tr>
        </tbody>
      </table>
      <p>Each phase opens a defined set of labelled issues. Issues from the next phase are not opened until the current phase's exit criteria are satisfied — preventing premature work that would have to be thrown away.</p>
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
      "Architecture and App Shell first — /assign next, one module at a time, gated by exit criteria.",
    youtubeUrl: null,
    mermaid: `quadrantChart
  title Risk vs Value of Development Approaches
  x-axis Low Risk --> High Risk
  y-axis Low Value --> High Value
  quadrant-1 Do First
  quadrant-2 Do With Care
  quadrant-3 Deprioritise
  quadrant-4 Avoid
  Architecture and App Shell: [0.15, 0.9]
  Fixtures and schema: [0.15, 0.7]
  assign sandbox pilot: [0.25, 0.85]
  PR Quality module after assign: [0.3, 0.75]
  Immediate production writes: [0.85, 0.4]
  Skip architecture entirely: [0.95, 0.2]
  Start with review-sync: [0.75, 0.45]`,
    diagramCaption:
      "Risk-versus-value placement of every option. Architecture + App Shell + /assign sandbox pilot lives top-left. Starting with review-sync is high-risk.",
    body: `
      <table>
        <thead><tr><th>Option</th><th>Risk</th><th>Assessment</th></tr></thead>
        <tbody>
          <tr><td>Start development immediately (skip architecture)</td><td>High</td><td>Replicates the existing problem: per-repo scripts with inconsistent security assumptions and no shared shell.</td></tr>
          <tr><td>Start with review-sync before App Shell proven</td><td>High</td><td>Review-sync is a complex state machine that risks polluting the app shell with module-specific concerns before the shell is trustworthy.</td></tr>
          <tr><td>Full architecture freeze before any code</td><td>Medium</td><td>Delays reversible proof work unnecessarily; fixtures and schema carry no production risk and can begin in Phase 0.</td></tr>
          <tr><td><strong>Architecture agreement + App Shell + /assign first</strong></td><td><strong>Low</strong></td><td><strong>Recommended.</strong> Shell proven end-to-end before any policy module. /assign is the smallest scope that forces every pipeline stage. Architecture gates production writes.</td></tr>
        </tbody>
      </table>
      <p><strong>Phase 0:</strong> Architecture agreement, 8-component pipeline, /assign as first slice confirmed.<br/>
      <strong>Phase 1:</strong> App shell end-to-end (no policy module). <strong>Phase 2–3:</strong> /assign minimal then /assign with guards.</p>
    `,
  },
];
