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
  root((Hiero Workflow App))
    Clear Responsibility
      SDK repos own triggers permissions checkout harden-runner secrets
      GitHub App owns decisions schemas adapters releases
      No merged governance domains or security surfaces
    Secure by Design
      HMAC-SHA256 verification at listener boundary
      Installation-scoped tokens only
      CODEOWNERS on hiero-automation config files
      Fail closed on missing or invalid config
      Strict command parsing with regex
    Low Coupling and High Cohesion
      Decision logic lives in packages/core
      Probot App is a thin delivery layer over core
      Actions adapter is a thin delivery layer over core
      Behaviour tested once and delivered two ways
    Observable and Testable
      Structured JSON logs via Pino
      Idempotent writes via bot markers
      Golden fixtures and parity tests
      No module ships before parity tests are green
    Evolvable
      Module registry for new automations
      Config schema versioned with 30-day compat windows
      New modules register without modifying adapter code
      No cross-SDK script copying ever
    Microkernel Foundation
      packages/core is the decision kernel
      Probot App is a delivery plug-in
      Actions adapter is a delivery plug-in
      New commands register declaratively in the router`,
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
    mermaid: `flowchart LR
    GH["GitHub Repositories\\nWebhook Events"]

    subgraph APP["   Zone 1 — GitHub App  sdk-automations   "]
        L["Webhook Listener\\nHMAC-SHA256 Verify\\nInstallation ID Check\\nDelivery ID Dedup"]
        N["Event Normalizer\\nRaw Payload to NormalizedEvent\\nGitHub API-change isolation"]
        R["Router\\nDeclarative Route Registration\\n/assign to AssignmentCommand"]
        CE["Config Engine\\nZod Schema Validation\\nhiero-automation.yml\\nFail closed on invalid"]
        D["Dispatcher\\nModule Registry Lookup\\nConfig Loader\\nPolicy Module Selector"]
        PM["Policy Modules\\nPure Functions  No IO\\nAssignment  PR Quality\\nIssue Lifecycle  PR Lifecycle\\nProgression  Review"]
        E["GitHub API Executor\\nIdempotent Writes\\nInstallation-scoped Token\\nExponential Backoff\\nBot-marker Checks"]
        AL["Audit Logger  Pino\\nAppend-Only  Structured JSON\\nEvery Decision Recorded\\n90-day Retention"]
    end

    GH -->|"HTTPS Webhook"| L
    L --> N
    N --> R
    R --> D
    CE -->|"Validated Config"| D
    D --> PM
    PM -->|"ApprovedOperation[]"| E
    E -->|"GitHub API Writes"| GH
    L -->|"audit"| AL
    N -->|"audit"| AL
    R -->|"audit"| AL
    D -->|"audit"| AL
    PM -->|"audit"| AL
    E -->|"audit"| AL

    subgraph ACT["Zone 4 — Actions Adapter  Batch / Compatibility Only"]
        AA["GitHub Actions Adapter\\nScheduled  Batch  Canary\\nCalls same packages/core"]
    end

    GH -->|"testing trigger"| ACT
    ACT -->|"packages/core calls"| PM`,
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
    mermaid: `graph TB
    GH["GitHub\\nWebhook Events and GitHub API"]

    subgraph Z1["Zone 1 — GitHub App — REUSABLE AUTOMATION"]
        PIPE["Webhook Listener  Event Normalizer  Router\\nDispatcher  Config Engine\\nPolicy Modules  Executor  Audit Logger\\nBuilt once  shared across all installed repos"]
    end

    subgraph Z2["Zone 2 — Repository Config — PER-SDK POLICY"]
        CONF[".github/hiero-automation.yml\\nLabels  Teams  Thresholds  Doc Links\\nEnabled Modules  Waiver Labels  Schedules\\nSDK-specific governance choices"]
    end

    subgraph Z3["Zone 3 — SDK Repo Workflows — STAYS LOCAL FOREVER"]
        LOCAL["Workflow YAML  Triggers  Permissions\\nHarden-Runner  Checkout  Secrets  Artifacts\\nBuild  Test  Release CI Jobs\\nConcurrency Rules and if-Guards"]
    end

    subgraph Z4["Zone 4 — Actions Adapter — COMPATIBILITY PATH ONLY"]
        ADPT["Canary  Dry-run  Scheduled Batch\\nOptional testing and transition path\\nNOT the product architecture"]
    end

    GH -->|"webhook events"| Z1
    Z1 -->|"GitHub API writes"| GH
    Z2 -->|"config payload"| Z1
    Z3 -->|"testing trigger"| Z4
    Z4 -->|"adapter call"| Z1

    R1["Why Z1 is central\\nReusable decision logic\\nShared across all repos\\nNo per-repo script duplication"]
    R2["Why Z2 is per-repo\\nSDK-specific policy\\nMust not become code forks\\nin the shared repository"]
    R3["Why Z3 stays local forever\\nSecurity and maintainer ownership controls\\nCentralising hides the security surface\\nfrom the team accountable for it"]
    R4["Why Z4 is not the architecture\\nSophies feedback  useful for validation\\nbut must not drive the architecture\\nCompatibility adapter only"]

    Z1 -.->|"rationale"| R1
    Z2 -.->|"rationale"| R2
    Z3 -.->|"rationale"| R3
    Z4 -.->|"rationale"| R4`,
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
    subgraph RUNTIME["Runtime and Hosting"]
        P["Probot — GitHub App\\nReal-time webhook processing\\nPrimary path for interactive commands like /assign\\nJustification: batch-only Actions cannot handle\\nreal-time interactive commands"]
        HOST["Cloud Run or Railway\\nContainerised Node.js TypeScript\\nBlue-green rollout strategy\\nHosting model ADR required before Phase 1\\nDetermines token cache and dedup store design"]
        REDIS["Redis\\nDelivery dedup via SET NX with 24h TTL\\nInstallation token cache with 55-min TTL\\nConfig cache with 5-min TTL and stampede lock\\nJustification: prevents duplicate writes and stampedes"]
    end

    subgraph CORE["Core Language and Shared Logic"]
        TS["Node.js and TypeScript\\nType-safe across the entire pipeline\\nModule interfaces enforced at compile time\\nBundles natively as a GitHub Actions artefact\\nJustification: single language across both delivery paths"]
        PKG["packages/core\\nAdapter-agnostic decision modules\\nProbot App and Actions adapter both call same functions\\nBehaviour tested once and delivered two ways\\nJustification: prevents behavioural drift between paths"]
        OC["Octokit\\nGitHub API client\\nInstallation-scoped requests\\nJustification: type-safe API calls with version pinning"]
    end

    subgraph SCHEMA["Config and Schema Validation"]
        ZOD["Zod Schema\\nRuntime config validation at startup\\nTypeScript type generation from schema\\nFail closed on missing or invalid config\\nVersioned with 30-day backward-compatibility window\\nJustification: prevents config injection and drift"]
    end

    subgraph VERIFY["Verification Layers — Each Catches a Different Failure Class"]
        UT["Unit Tests\\nPolicy modules tested in pure isolation\\nCommand parsing and guard evaluation\\nNo IO dependencies in tests"]
        FX["Golden Fixtures\\nParity tests Python vs C++ real examples\\n100 percent fixture coverage required\\nNo behaviour ships before parity is green"]
        IT["Integration Tests\\nMock GitHub API interactions\\nExecutor and audit logger tested together"]
        SEC["Security Tests\\nForged webhooks  Config injection attempts\\nReplayed delivery IDs  Malformed commands\\nMust pass on every CI push  blocks merge"]
    end

    subgraph SECOPS["Security Operations — Not Optional Extras"]
        PIN["SHA-pinned Actions\\nFull commit SHA on all action references\\nPrevents supply chain compromise"]
        HRN["Harden-Runner\\nIn all SDK workflows\\nPrevents exfiltration via egress control"]
        DEP["Dependabot and npm audit\\nContinuous dependency scanning\\nPrevents dependency compromise"]
        COWN["CODEOWNERS on hiero-automation files\\nPrevents config tampering via PR"]
    end

    HOST --> P
    REDIS --> HOST
    P --> PKG
    TS --> PKG
    OC --> PKG
    PKG --> ZOD
    PKG --> UT
    PKG --> FX
    PKG --> IT
    PKG --> SEC`,
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
    mermaid: `flowchart TD
    P0["Phase 0  Pre Jun 15\\nARCHITECTURE AGREEMENT\\n8-component pipeline agreed with mentor\\n/assign confirmed as first vertical slice\\nConfig model direction set\\nHosting model ADR decision required"]

    P1["Phase 1  Jun 15 to Jul 15\\nAPP SHELL  NO POLICY MODULES YET\\nWebhook Listener with HMAC-SHA256\\nEvent Normalizer\\nRouter with declarative registration\\nDispatcher with module registry\\nConfig Engine with Zod schema\\nAudit Logger with structured JSON"]

    G1{{"EXIT GATE 1\\nSynthetic events route through\\nall 8 pipeline stages correctly\\nAudit records produced\\nSecurity and schema tests pass"}}

    P2["Phase 2  Jul 16 to Aug 10\\nASSIGN MINIMAL\\nAssignment Policy as pure function\\nIssue eligibility check\\nGitHub write and audit event\\nSandbox end-to-end test\\nFixture parity  3 Python and 3 C++ golden cases"]

    G2{{"EXIT GATE 2\\nWorks in sandbox\\nNo duplicate writes\\nFailure paths produce clear audit records\\nFixture parity established"}}

    P3["Phase 3  Aug 11 to Aug 31\\nASSIGN GUARDS  MIDTERM CHECKPOINT\\nAccount age check\\nMax assignments limit\\nPrerequisites check  waiver labels\\nMaintainer override  block labels\\nDry-run pilot in one real repository"]

    G3{{"EXIT GATE 3\\nAll guards have fixture-backed tests\\nDry-run reviewed by at least one maintainer\\nNo unexpected mutations during dry-run"}}

    P4["Phase 4  Sep 1 to Oct 15\\nPR QUALITY MODULE\\nDCO check  GPG check\\nMerge conflict detection\\nLinked issue requirement\\nConventional title check\\nDashboard label management\\nIndependent module with own config section"]

    G4{{"EXIT GATE 4\\nIndependent module\\nOwn fixture suite\\nZero coupling to Assignment Policy internals"}}

    P5["Phase 5  Oct 16 to Nov 14\\nLIFECYCLE MODULES\\nIssue Lifecycle  unassign  stale reminders  auto-unassign\\nPR Lifecycle  draft on inactive  inactive reminders\\nProgression  finalize  skill levels  recommendation labels\\nReview Policy  community review label  ready-to-merge"]

    G5{{"EXIT GATE 5\\nEach module independently enabled via config\\nModules do not reference each others internals\\nAll have unit tests  fixture coverage  audit log output"}}

    P6["Phase 6  Nov 15 to Nov 30\\nWIDER ROLLOUT\\nPer-repo adoption with named module owner\\nCommunity issues opened per phase\\nDocumented rollback plan per repository\\nOne-week observation window required before sign-off"]

    RETIRE["TEARDOWN SAFETY RULE\\nassign.py scripts  retired after Phase 3 guards proven\\nreview_sync.py  retired after Phase 5 review module proven\\nActions YAML wrappers embedding policy  retired per module after pilot\\nScattered API retry code  retired in Phase 1 when executor centralises\\nHardcoded labels  retired in Phase 1 when config engine replaces\\nNO legacy code deleted without  parity tests green\\npilot evidence confirmed and maintainer sign-off received"]

    P0 --> P1
    P1 --> G1
    G1 -->|"Pass"| P2
    P2 --> G2
    G2 -->|"Pass"| P3
    P3 --> G3
    G3 -->|"Pass"| P4
    P4 --> G4
    G4 -->|"Pass"| P5
    P5 --> G5
    G5 -->|"Pass"| P6
    P3 -.->|"teardown triggers start"| RETIRE`,
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
    mermaid: `flowchart TD
    ATK["Malicious Contributor\\nAssumes attacker controls: PR title and body  branch name\\nchanged files  build artefacts\\nworkflow YAML and config changes in PR head"]

    T1["T1  Forged or Replayed Webhook\\nAttacker crafts or replays a previously valid delivery"]
    T2["T2  Config or Policy Tampering\\nMalicious hiero-automation.yml injected via PR head"]
    T3["T3  Command Injection\\n/assign with crafted or malicious arguments"]
    T4["T4  Token or Secret Exfiltration\\nUntrusted PR code runs in privileged workflow jobs"]
    T5["T5  Dependency or Action Compromise\\nUntrusted or unpinned action versions in workflows"]
    T6["T6  Over-broad App Permissions\\nInstallation token grants org-wide access"]
    T7["T7  Bot Loops and Duplicate Writes\\nConcurrent webhooks cause double mutations"]

    S1["SAFEGUARD T1\\nHMAC-SHA256 verification at listener boundary\\nDelivery-ID deduplication via Redis SET NX with 24h TTL\\nFail closed if dedup store is unreachable\\nEvent enqueued for manual reconciliation on store failure"]
    S2["SAFEGUARD T2\\nConfig always loaded from default branch via GitHub API\\nNever from PR head — attacker cannot inject policy\\nCODEOWNERS on all hiero-automation config files\\nZod schema: unknown high-risk fields cause module to fail closed"]
    S3["SAFEGUARD T3\\nStrict regex parser for all commands\\nNo argument pass-through from raw comment\\nActor-type and bot guards before any processing\\nEvent type  repo  PR number validated before acting"]
    S4["SAFEGUARD T4\\nInstallation-scoped tokens only  no personal access tokens\\nHarden-Runner in all SDK workflows with egress restriction\\nNever checkout PR head in privileged jobs\\nAudit and restrict egress  no exfiltration path"]
    S5["SAFEGUARD T5\\nAll actions pinned by full commit SHA  not tag or branch\\nBundle and version central actions centrally\\nDependabot and npm audit run continuously\\nPrevents supply chain attacks via dependency compromise"]
    S6["SAFEGUARD T6\\nMinimum necessary scopes: Issues write  PRs read  Contents read\\nInstallation-scoped tokens only  no org-wide access\\nPermissions documented and reviewed per module\\nNo module can escalate beyond its declared scope"]
    S7["SAFEGUARD T7\\nBot markers and idempotency keys per issue and PR\\nPer-entity Redis lock using SET NX per issue or PR number\\nExecutor checks current GitHub state before any retry\\nLabel already present is not re-applied\\nComment with existing bot marker is not re-posted"]

    FAIL["FAIL-CLOSED DEFAULT — Applied to All Paths\\nMissing or malformed config: error logged  zero state mutations occur\\nPartial write on retry: executor verifies GitHub state before re-attempting\\nDedup store unreachable: fail closed  enqueue for manual reconciliation\\nConfig store fetch failure: last-known-good or safe conservative defaults\\nNo module ever silently fails without an audit record"]

    ATK --> T1
    ATK --> T2
    ATK --> T3
    ATK --> T4
    ATK --> T5
    ATK --> T6
    ATK --> T7

    T1 --> S1
    T2 --> S2
    T3 --> S3
    T4 --> S4
    T5 --> S5
    T6 --> S6
    T7 --> S7

    S1 --> FAIL
    S2 --> FAIL
    S3 --> FAIL
    S4 --> FAIL
    S5 --> FAIL
    S6 --> FAIL
    S7 --> FAIL`,
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
    mermaid: `graph TB
    subgraph CENTRAL["Standardise Centrally in packages/core — Never Allow Override"]
        C1["Config schema version and overall structure"]
        C2["Automation names and command syntax  /assign  /unassign  /blocked  /finalize"]
        C3["Bot-comment markers for idempotency deduplication"]
        C4["Idempotency logic and duplicate-write prevention"]
        C5["Error categories and fail-closed defaults"]
        C6["Release compatibility windows  30-day backward-compat guarantee"]
        C7["Audit log format and structured JSON fields"]
        C8["Webhook verification logic  HMAC-SHA256"]
        C9["Rate-limit handling and exponential backoff in the Executor"]
    end

    subgraph PERREPO["Allow Per-Repo in .github/hiero-automation.yml — Validated by Zod Schema"]
        R1["Label names and team handles per SDK"]
        R2["Assignment limits  max_assignments: 1 or N"]
        R3["GFI graduation cap  max_good_first_issue_completions: 5"]
        R4["Skill hierarchy and prerequisite gates for assignment"]
        R5["Enabled automations  enabled: true or false per module"]
        R6["Doc links  DCO guide  assign guide  GPG guide  merge conflict guide"]
        R7["Repo-specific message text and notification links"]
        R8["Waiver team and maintainer team handles"]
        R9["Account age thresholds  block labels  reminder schedules"]
    end

    subgraph EXAMPLE["Concrete Example — Same Code Path  Different Policy Parameters"]
        CPP["C++ SDK Configuration\\nmax_assignments: 1\\nmax_good_first_issue_completions: 5\\nprerequisites: skill-beginner required\\nmaintainer_team: hiero-cpp-maintainers\\nblock_labels: in-progress  claimed"]
        PY["Python SDK Configuration\\nFields omitted  permissive defaults applied\\nmaintainer_team: hiero-py-maintainers\\nNo prerequisite gates configured"]
        CORE2["Same runAssign code path in packages/core\\nserves both SDKs with zero code duplication\\nCore handles the decision shape and logic\\nPer-repo config supplies the policy parameters\\nWhen Python and C++ diverge on a value\\nthat value becomes repo-specific config\\nnever hardcoded into packages/core"]
    end

    RULE["Classification Rule of Thumb\\nCommon behaviour  centralise in core module\\nRepo policy  express as protected config validated by Zod\\nOne-off security constraint  keep strictly local forever\\nConfig expresses policy not code\\nRepositories cannot inject behaviour through config"]

    CENTRAL -->|"decision shape and logic"| CORE2
    PERREPO -->|"policy parameters"| CORE2
    CPP -->|"per-repo config"| CORE2
    PY -->|"per-repo config"| CORE2
    RULE -.->|"governs split"| CENTRAL
    RULE -.->|"governs split"| PERREPO`,
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
    mermaid: `flowchart TD
    subgraph LABELS["Skill-Based Issue Labels — Risk-Tiered Access"]
        L1["good-first-issue\\nDocs  Fixtures  No production risk\\nSafe for any community contributor immediately"]
        L2["beginner\\nTests  Samples  Config examples"]
        L3["intermediate\\nAdapters  Config extensions  Canary support"]
        L4["advanced\\nSecurity pilots  C++ investigation"]
        L5["maintainer-only\\nNEVER open to community\\nProduction behaviour changes\\nPrivileged config  SDK security controls"]
    end

    subgraph BACKLOG["Phased Community Issue Backlog"]
        PH0["Phase 0 — Safe to Open\\nArchitecture ADR for listener  normalizer  router  dispatcher\\nConfig engine design document\\nComponent responsibility table review\\nFinal architecture decisions stay maintainer-owned"]
        PH1["Phase 1 — Safe to Open\\nConfig schema sections with types and defaults\\nAudit log format specification\\nSecurity review checklist  webhook verification  idempotency\\nUnit test scaffolding and fixtures\\nOfficial ownership and release control stay maintainer-owned"]
        PH2["Phase 2 — Safe to Open\\n/assign command parser tests\\nIssue eligibility fixture collection\\nGolden case conversion from real Python and C++ examples\\nUpstream /assign production change stays maintainer-owned"]
        PH3["Phase 3 — Safe to Open\\nGuard fixture tests  account age  max assignments  prerequisites\\nDry-run review checklist\\nAdoption checklist polishing\\nWrite-mode pilot stays maintainer-owned"]
        PH4["Phase 4 — Safe to Open\\nPR quality fixture collection\\nDCO check unit tests\\nConventional title parser tests\\nLinked issue validator tests\\nPR quality write pilot stays maintainer-owned"]
        PH5["Phase 5 — Safe to Open\\nLifecycle module fixture conversion\\nProgression skill level specification\\nReview process label inventory\\nSimple before and after docs\\nProduction lifecycle behaviour stays maintainer-owned"]
        PH6["Phase 6 — Safe to Open\\nPer-SDK adoption checklist\\nDemo and onboarding documentation\\nSandbox walkthrough guide\\nPer-repo production rollout stays maintainer-owned"]
    end

    FIRST["FIRST SAFE BATCH — Open Immediately\\n1  /assign behaviour matrix  Python vs C++ guard comparison\\n2  /assign golden fixtures and parity tests\\n3  Full-SHA pinning policy documentation\\n4  Schema compatibility and config versioning contract\\n5  SDK caller adoption checklist for maintainers\\n6  Audit log format specification\\n7  Security review checklist  webhook verification  config trust  idempotency\\n8  Sandbox repository walkthrough for /assign and audit log output"]

    RFC["RFC PER AUTOMATION MIGRATION\\nEach RFC states: reusable logic  repo-local boundary\\npolicy config  fixtures  rollback plan  owner\\nNo production behaviour change without:\\nDry-run proof  Parity tests green\\nSecurity checklist complete  Maintainer approval\\nSmall reviewable PRs only"]

    PROG["BUILT-IN CONTRIBUTOR PROGRESSION\\ngood-first-issue  beginner  intermediate\\nPrerequisite gates and GFI graduation cap enforced by the App itself\\nApp automates the contributor onboarding funnel\\nContributors grow through progressively harder tasks\\nApp does not just automate maintainer work\\nIt actively develops the contributor pipeline"]

    DEFER["ISSUES TO DEFER UNTIL LATER\\nFull C++ lifecycle migration before Phase 4 mapping complete\\nReview-sync state machine before app shell stable through Phase 3\\nProduction GitHub App hosting at scale before Phase 3\\nAny issue that changes contributor-facing behaviour\\nbefore Python and C++ behaviour matrix is agreed"]

    LABELS --> BACKLOG
    PH0 --> PH1 --> PH2 --> PH3 --> PH4 --> PH5 --> PH6
    FIRST --> RFC
    RFC --> PROG
    BACKLOG --> FIRST
    PROG -.->|"do not open yet"| DEFER`,
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
    mermaid: `flowchart TD
    Q{"How many weeks should be\\nallocated to architecture\\nbefore development begins?"}

    OPT1["OPTION A — Skip Architecture\\nRISK LEVEL: HIGH  NOT RECOMMENDED\\nReplicates the existing problem exactly\\nIndependent evolution continues across repos\\nInconsistent security assumptions persist\\nNo parity baseline established\\nNo rollback plans designed in\\nSame fragmented state as before"]

    OPT2["OPTION B — Full Architecture Freeze\\nRISK LEVEL: MEDIUM  NOT RECOMMENDED\\nDelays reversible work unnecessarily\\nFixtures  schema  dry-run adapters carry no production risk\\nThese can begin in parallel without production writes\\nFull freeze wastes the early program window"]

    OPT3["OPTION C — 2-Week Architecture\\nPlus Reversible Work Running in Parallel\\nRISK LEVEL: LOW  RECOMMENDED\\nArchitecture gates only production writes\\nReversible and safe work runs concurrently\\nNo upstream SDK repo affected before gates close\\nProduction correctness is the goal  not speed"]

    Q --> OPT1
    Q --> OPT2
    Q --> OPT3

    subgraph WK1["Week 1 — Architecture Foundations"]
        W1A["App shell skeleton and boundary definitions"]
        W1B["Threat model and security checklist"]
        W1C["Config schema initial sections  setup and assignment in Zod"]
        W1D["Hosting model ADR — Cloud Run vs Railway vs stateless function\\nThis decision is required before Phase 1\\nDetermines token cache  dedup store  and concurrency model"]
        W1E["Component responsibility table and boundary map"]
    end

    subgraph WK2["Week 2 — Architecture Continues Plus Safe Reversible Work Begins"]
        W2A["/assign behaviour maps and guard matrix\\nPython vs C++ comparison  document divergences"]
        W2B["Rollback plan per phase documented before work begins"]
        W2C["Community issue backlog structured and labelled by phase"]
        W2D["/assign parity fixtures  Python and C++ golden cases\\nassign success  account age fail  already assigned  blocking label"]
        W2E["packages/core skeleton  module registry interface defined"]
    end

    subgraph SAFE["Safe to Begin Now — Zero Production Risk"]
        S1["App shell  config engine  audit logger"]
        S2["/assign module in packages/core as pure function"]
        S3["Parity fixtures and architecture documentation"]
        S4["Security tests and config schema tests"]
        S5["Community issue batch 1 opened  fixtures  docs  schema"]
    end

    subgraph WAIT["Must Wait — Gated on Architecture and Gate Completion"]
        W1["Upstream production enablement in any SDK repo"]
        W2["SDK security control changes"]
        W3["Write-mode pilot in any live repository"]
        W4["C++ behaviour changes before mapping complete"]
        W5["Any production behaviour change without parity  dry-run  sign-off"]
    end

    DONE["PHASE 0 ALREADY COMPLETE\\nPython fork canary  run proof demonstrating feasibility\\nCentral repo CI  CI proof with green pipeline\\nProbot adapter  68 passing tests across three workspaces\\npackages/core: 55 tests  Probot: 10 tests  Actions adapter: 3 tests"]

    OPT3 --> WK1
    WK1 --> WK2
    WK2 --> SAFE
    WK2 --> WAIT
    WK2 --> DONE`,
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
