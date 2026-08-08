# DevOps Strategy

**Global Customer Unification Platform**
**Document Version:** 1.0
**Date:** 2026-07-28
**Owner:** Enterprise DevOps Lead (Architecture Council)
**Classification:** Confidential — Board Approved

---

## 1. Purpose and Scope

This document defines the DevOps strategy for the Global Customer Unification Platform deployed on a single Salesforce production org across 14 brands, 47 countries. The strategy governs source control, code quality, packaging, dependency management, and environment promotion to ensure reliable, repeatable, and auditable delivery of platform configuration, automation, and custom code.

### 1.1 Scope

| In Scope | Out of Scope |
|----------|--------------|
| Salesforce metadata (objects, fields, flows, Apex classes, Lightning components, LWC, Aura) | MuleSoft integration configuration (separate MuleSoft DevOps strategy) |
| Apex classes, triggers, batch jobs, queueables, schedulers | Third-party ISV apps and managed packages installed via AppExchange |
| Lightning Web Components and Aura components | Data migration scripts executed outside the CI/CD pipeline |
| Flow definitions (Record-Triggered, Scheduled-Triggered, Screen flows) | Manual admin configurations performed via Setup UI |
| Test classes (unit, integration, performance) | Dealer legacy integrations (frozen for 24 months) |
| Static analysis and code quality enforcement | Data Cloud recipe deployment (managed via separate Data Cloud DevOps tooling) |
| Package versioning and release management | Agentforce prompt engineering and model training (managed via Einstein Builder) |

### 1.2 Principles

1. **Trunk-based development** with short-lived feature branches — no long-running branches
2. **All code to source control** — no configuration-only changes in production
3. **Automated quality gates** — no deployment bypasses static analysis or test validation
4. **Immutable artifacts** — once a package version is promoted, it is not modified
5. **Traceability** — every production change is traceable from source commit to deployment record
6. **Shift-left security** — security and compliance checks execute as early as possible in the pipeline

---

## 2. Source Control Strategy

### 2.1 Git Repository Structure

A single Git repository houses all Salesforce metadata, automation code, and infrastructure-as-code for the platform. Repository structure follows the modular package-oriented layout described in Section 4.

```
.git/
 sfarchitectshowcase/
├── .github/                          # GitHub Actions workflow definitions
│   └── workflows/
│       ├── ci.yml
│       ├── cd-sandbox.yml
│       ├── cd-staging.yml
│       └── cd-production.yml
├── force-app/                        # Primary source for Salesforce metadata
│   ├── main/
│   │   └── default/
│   │       ├── objects/              # Custom objects and fields
│   │       ├── layouts/              # Page layouts and dynamic forms
│   │       ├── profiles/             # Permission sets and profiles
│   │       ├── flows/                # Flow definitions
│   │       ├── apex/                 # Apex classes, triggers, batch jobs
│   │       │   ├── services/
│   │       │   ├── triggers/
│   │       │   ├── batch/
│   │       │   ├── schedulers/
│   │       │   └── utils/
│   │       ├── lwc/                  # Lightning Web Components
│   │       │   ├── customerUnification/
│   │       │   ├── dealerPortal/
│   │       │   ├── identityResolution/
│   │       │   ├── recallManagement/
│   │       │   └── ...
│   │       ├── aura/                 # Aura components (legacy, incremental migration)
│   │       ├── experience/           # Experience Cloud site metadata
│   │       │   └── sites/
│   │       ├── email/                # Email templates and letterheads
│   │       ├── reports/              # Report definitions
│   │       ├── dashboards/           # Dashboard definitions
│   │       ├── apps/                 # Lightning App definitions
│   │       ├── tabs/                 # Custom tabs
│   │       ├── permissionSets/       # Permission set definitions
│   │       ├── roleHierarchy/        # Role hierarchy definitions
│   │       ├── sharingRules/         # Sharing rule definitions
│   │       ├── validationRules/      # Validation rules
│   │       ├── customSettings/       # Custom settings and custom metadata types
│   │       ├── labels/               # Custom labels (i18n)
│   │       ├── flexipages/           # Flexible pages
│   │       └── staticresources/      # Static resources (images, CSS, JS)
│   └── packages/                     # Package definitions (sfdx-project.json)
├── config/                           # SFDX project configuration
│   ├── sfdx-project.json
│   ├── sfdx-org-definitions.json
│   └── scratch-org-definitions/
├── scripts/                          # Deployment and utility scripts
│   ├── pre-deploy/
│   ├── post-deploy/
│   └── data-seed/
├── tests/                            # Test data and test configurations
│   ├── unit/
│   ├── integration/
│   └── performance/
├── docs/                             # Architecture decision records, design docs
│   └── adrs/
├── .gitignore                        # Ignore patterns for Salesforce metadata
├── .sfdx-smartcard                    # SFDX auth config (ignored, per-user)
└── README.md
```

### 2.2 Branching Model — GitFlow Adapted for Salesforce

The team uses a **modified GitFlow** branching model adapted for Salesforce delivery constraints. The model balances trunk-based practices (for short feedback loops) with GitFlow conventions (for release isolation).

#### Branch Definitions

| Branch | Lifecycle | Purpose | Protection Rules |
|--------|-----------|---------|-----------------|
| `main` | Permanent | Production-ready, deployable code. Every commit on `main` is assumed to have passed all CI gates and is promotion-ready. | No direct push. Merge via Pull Request only. Required reviewers: minimum 2. Required status checks: all green. |
| `develop` | Long-lived | Integration branch for the current release trains. All feature branches merge here after peer review. | No direct push. Merge via Pull Request only. Required reviewers: minimum 1. CI must pass. |
| `release/v1.x.x` | Short-lived (2-4 weeks) | Stabilization branch for a specific release. Bug fixes are cherry-picked or merged from `develop`. No new features. | No direct push. Merge to `main` and `develop` via PR. |
| `hotfix/XXXX` | Short-lived (1-3 days) | Emergency fix for production issues. Branched from `main`, merged back to `main` and `develop`. | No direct push. Requires emergency change approval per governance framework. |
| `feature/BRAND-XXX` | Short-lived (1-7 days) | Per-feature work. Branched from `develop`, merged back into `develop`. | No direct push. Requires peer review and CI pass. |

#### Branch Workflow

```
main ←──────────────────────────── release/v1.x ←───┐
  ↑                                                    │
  │              ┌─── release/v1.x ───────────────────┘
  │              │
develop ←── feature/BRAND-XXX ←── develop
  │              ↑
  │              └── fix: merge from develop to release, then back
  │
  └── hotfix/XXXX ←── main ───► main + develop
```

**Key rules:**

1. **Feature branches** are created from `develop` and must be merged back within 7 calendar days. Stale branches (>14 days) are automatically archived by branch protection rules.
2. **Release branches** are cut from `develop` at the start of a release train. No new features are added after freeze. Only bug fixes and critical defect remediation.
3. **Hotfix branches** are created from `main` for urgency P1/P2 incidents. They must be merged back to both `main` and `develop` to prevent regression.
4. **Trunk-based practice**: Developers commit small, incremental changes to feature branches. Long-running feature branches are prohibited — any branch older than 7 days requires an architecture council review.
5. **Merge commits** are preferred over squash merges for traceability. The commit history must preserve the feature branch topology for audit purposes.

### 2.3 Commit Standards

All commits must follow the Conventional Commits specification adapted for Salesforce delivery.

**Format:** `<type>(<scope>): <subject>`

**Allowed Types:**

| Type | Scope Example | Description |
|------|--------------|-------------|
| `feat` | `identity`, `dealer`, `vehicle` | New feature or capability |
| `fix` | `bug`, `data-quality`, `integration` | Bug fix or defect remediation |
| `refactor` | `apex`, `lwc` | Code restructuring without behavior change |
| `featflow` | `record-triggered`, `scheduled` | Flow definition change |
| `test` | `unit`, `integration` | Test class addition or modification |
| `chore` | `ci`, `deps` | Build maintenance, dependency updates |
| `docs` | `adr`, `architecture` | Documentation update |
| `perf` | `query`, `batch` | Performance optimization |
| `security` | `encryption`, `auth` | Security-related change |

**Example commits:**

```
feat(identity): add MDM identity resolution trigger
fix(data-quality): correct customer duplicate detection logic
refactor(apex): extract AccountService from CustomerController
featflow(record-triggered): create VehicleDeactivation auto-update flow
test(unit): add coverage for BatchRecallNotification to 92%
```

### 2.4 Pull Request Standards

| Attribute | Requirement |
|-----------|-------------|
| **Reviewers** | Minimum 2 reviewers for `main`; 1 reviewer for `develop` |
| **Reviewers must** | Have different area ownership than the author |
| **CI checks** | All CI status checks must pass before merge |
| **Description** | Must include: purpose, linked JIRA/Epic ID, test plan, impact assessment |
| **Squash merge** | Prohibited for `main` — merge commits preserved for traceability |
| **Draft PRs** | Allowed for work-in-progress; converted to ready for review when CI passes |
| **Auto-merge** | Disabled — all merges require explicit reviewer approval |

---

## 3. Code Review Standards

### 3.1 Review Checklist

Every pull request is evaluated against the following checklist before approval:

#### Apex & Trigger Review

- [ ] All SOQL/SOSL queries have indexed fields in WHERE clauses
- [ ] No SOQL queries inside FOR loops (bulkification)
- [ ] All DML operations are bulkified (max 10,000 records per transaction)
- [ ] No hardcoded IDs (use Custom Metadata Types or Custom Labels)
- [ ] All exceptions are caught and handled with meaningful logging
- [ ] No `System.debug()` statements in production code (use `Logger` framework or `Debug.Log` event bus)
- [ ] Asynchronous patterns (Queueable, Batch, Scheduled) are appropriate for the use case
- [ ] Test coverage meets or exceeds 85% for new/modified Apex classes
- [ ] Test methods cover positive, negative, and edge cases
- [ ] No test methods perform DML on `User` or `SetupEntityAccess` records (governor limit safe)
- [ ] Test methods use `Test.startTest()` / `Test.stopTest()` for async code
- [ ] No `SeeAllData=true` in test classes (unless explicitly justified and approved)

#### Lightning Web Component Review

- [ ] No `innerHTML` or `dangerouslySetInnerHTML` usage (XSS prevention)
- [ ] All `@api` properties have JSDoc annotations
- [ ] Lightning Data Service (LDS) is preferred over imperative Apex calls for CRUD
- [ ] Imperative Apex calls use loading indicators and error handling
- [ ] No `document.querySelector` calls (use `this.template.querySelector` with specific selectors)
- [ ] All public methods are documented via JSDoc
- [ ] Accessibility: ARIA attributes present where needed, keyboard navigation works

#### Flow Review

- [ ] Flow interviews do not exceed 100 elements (complexity guideline)
- [ ] All screen elements have validation rules and required field indicators
- [ ] No flow references to deleted or renamed fields
- [ ] Scheduled path start conditions are specific and testable
- [ ] Fault paths are defined for all callouts and subflows
- [ ] Flow is bulkified for bulk record triggers (Record-Triggered flows)

#### Security Review

- [ ] No dynamic SOQL with unescaped user input (SOQL injection)
- [ ] No `runAs()` in production code (use `System.runAs()` only in tests)
- [ ] All external callouts use HTTPS endpoints
- [ ] No sensitive data logged in debug logs or platform events
- [ ] Shield Platform Encryption applied to PII fields
- [ ] Sharing rules reviewed for data access compliance across brands

#### Architecture & Standards

- [ ] Pattern matches architecture decision record (ADR) for the affected area
- [ ] Naming conventions follow the technical standards (Section 5 of Governance Framework)
- [ ] No duplicate logic existing in another class (DRY principle)
- [ ] Dependency injection pattern used for testability
- [ ] Package boundary respected — no cross-package dependencies without approval

### 3.2 Review Assignments

| Change Type | Required Reviewer |
|-------------|-------------------|
| Apex (any) | Apex lead or designated reviewer |
| LWC (any) | Frontend lead or designated reviewer |
| Flow (any) | Business analyst or process owner |
| Security-sensitive (encryption, auth, sharing) | Security reviewer |
| Cross-brand (affects multiple BUs) | Architecture Review Board member |
| Production deployment | Release manager + QA lead |

### 3.3 Review Turnaround

- **Standard PR:** Review within 24 hours of submission
- **Urgent (P2):** Review within 4 hours
- **Hotfix (P1):** Review within 1 hour, can be fast-tracked with post-merge retro

---

## 4. Static Analysis

### 4.1 PMD (Salesforce Scanner)

PMD is the primary static analysis tool for Apex code. It runs as a mandatory CI gate on every pull request.

#### Configuration

PMD rules are configured in the repository at `config/pmd-ruleset.xml`. The ruleset extends the Salesforce recommended ruleset with additional enterprise custom rules.

**Rule Categories:**

| Category | Rules | Severity | Description |
|----------|-------|----------|-------------|
| **Best Practices** | `AvoidDeeplyNestedIfStmts`, `CyclomaticComplexity`, `ExcessiveClassLength`, `ExcessiveNodeCount`, `ExcessiveParameterList`, `MethodNamingConventions` | Blocker / Critical | Enforces clean code and maintainability |
| **Design** | `AvoidLogicInTrigger`, `AvoidGlobalModifier`, `AvoidDirectAccessOfTrigger` | Critical | Enforces trigger handlers pattern, limits global class exposure |
| **Error Prone** | `AvoidNullPointerDereference`, `AvoidNonExistentMethods`, `AvoidDeeplyNestedIfStmts` | Blocker | Prevents common runtime errors |
| **Performance** | `AvoidSoqlInLoops`, `AvoidSoslInLoops`, `AvoidDmlStatementsInLoops`, `SoqlQueriesInLoops`, `LargeTransactionLines` | Critical | Enforces bulkification patterns |
| **Security** | `AvoidHardcodedId`, `AvoidDebugStatements`, `SystemDebugBreakingBad`, `HardcodedPassword` | Critical | Prevents security vulnerabilities |
| **Code Style** | `MethodNamingConventions`, `VariableNamingConventions`, `ClassNamingConventions` | Warning | Enforces naming standards |
| **Documentation** | `MissingDocComment`, `MissingDocumentation` | Warning | Ensures code is documented |

**Custom Enterprise Rules:**

| Rule | Description | Severity |
|------|-------------|----------|
| `BrandIsolationCheck` | Verifies that Apex code does not bypass BU-based sharing context | Critical |
| `DataResidencyCheck` | Flags SOQL queries that reference fields containing region-specific PII without encryption check | Critical |
| `IntegrationCircuitBreakerCheck` | Verifies that MuleSoft-facing callouts implement timeout and retry logic | Critical |
| `EventPublishingCheck` | Verifies that Platform Events are used for inter-brand communication instead of direct DML | Warning |

#### PMD Execution

```yaml
# In CI pipeline, PMD runs on every PR
- name: Run PMD Static Analysis
  uses: salesforce/pmd-github-action@v1
  with:
    ruleset: config/pmd-ruleset.xml
    target: force-app/apex
    fail-on-violation: true
    minimum-grade: B
```

**Quality Gate:** Any PR with PMD violations rated `C` or below (in the 5-point scale of A to E) is blocked from merge. The PMD baseline is established at the start of Track 1 and reviewed quarterly.

### 4.2 ESLint (LWC and JS)

ESLint enforces code quality and consistency for Lightning Web Components and any JavaScript utility functions.

#### Configuration

`.eslintrc.json` is committed to the repository root:

```json
{
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@lwc/eslint-plugin-lwc/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module"
  },
  "rules": {
    "@lwc/lwc-internal/no-html-interpolation": "error",
    "@lwc/lwc-internal/no-private-property": "error",
    "@lwc/lwc-internal/no-template-cross-origin": "error",
    "no-console": "warn",
    "no-underscore-dangle": "error",
    "no-unused-vars": "warn",
    "eqeqeq": "error",
    "curly": "error",
    "no-await-in-loop": "warn",
    "prefer-const": "error",
    "no-var": "error"
  },
  "overrides": [
    {
      "files": ["force-app/main/default/lwc/**/*.js"],
      "excludedFiles": "force-app/main/default/lwc/**/scripts/**",
      "rules": {
        "@lwc/lwc-internal/no-html-interpolation": "error"
      }
    }
  ]
}
```

### 4.3 Pre-Commit Hooks

Pre-commit hooks enforce linting before code is committed, preventing violations from entering the repository.

| Hook | Tool | Trigger | Action on Failure |
|------|------|---------|-------------------|
| `pre-commit` | Husky + lint-staged | `git commit` | Blocks commit; shows violated rules |
| `commit-msg` | commitlint | `git commit -m` | Blocks commit; enforces conventional commit format |
| `pre-push` | PMD + ESLint | `git push` | Blocks push; highlights violations |

### 4.4 SonarQube (Optional — Post-Track 1)

After Track 1 completion, SonarQube is introduced as a centralized quality dashboard for the entire platform. It aggregates PMD, ESLint, and test coverage metrics into a single quality gate.

- **SonarQube Quality Gates:**
  - Coverage: >80% for new code, >75% overall
  - Duplicated code density: <3%
  - Maintainability rating: A
  - Reliability rating: A
  - Security rating: A
  - No critical or blocker new issues introduced in the PR

---

## 5. Package Structure and Dependency Management

### 5.1 Package Strategy

The platform uses **Unlocked Packages** as the primary deployment and versioning mechanism for custom Salesforce metadata. Packages are organized by functional domain to align with the brand-agnostic architecture.

#### Package Catalog

| Package Name | API Name | Type | Contents | Dependencies |
|-------------|----------|------|----------|-------------|
| `CorePlatform` | `CorePlatform` | Managed (first-party) | `Customer__c`, `Vehicle__c`, `Brand__c`, `Identity__c`, `IdentityBridge__c`, sharing rules, custom metadata, custom labels | None |
| `IdentityResolution` | `IdentityResolution` | Managed (first-party) | MDM identity resolution logic, identity matching rules, survivorship rules, identity staging | `CorePlatform` |
| `DataCloudCDP` | `DataCloudCDP` | Managed (first-party) | Data Cloud data templates, calculation views, identity unification definitions | `CorePlatform` |
| `ServiceCloud` | `ServiceCloud` | Managed (first-party) | Service Cloud objects, Entitlements, Case triggers, Omni-Channel configuration, Agentforce definitions | `CorePlatform` |
| `DealerExperience` | `DealerExperience` | Managed (first-party) | Experience Cloud sites, LWC components, portals, dealer API facade | `CorePlatform` |
| `VehicleTelemetry` | `VehicleTelematics` | Managed (first-party) | IoT integration, Platform Events, telemetry processing, maintenance predictions | `CorePlatform`, `MuleSoft` |
| `MarketingActivation` | `MarketingActivation` | Managed (first-party) | Journey Builder activities, Marketing Cloud Connect configurations, segmentation definitions | `CorePlatform`, `DataCloudCDP` |
| `RecallManagement` | `RecallManagement` | Managed (first-party) | Recall objects, notification triggers, manufacturing plant integration | `CorePlatform` |
| `SubscriptionMgmt` | `SubscriptionMgmt` | Managed (first-party) | Subscription objects, billing integration, entitlement management | `CorePlatform` |
| `AnalyticsReporting` | `AnalyticsReporting` | Managed (first-party) | Report definitions, dashboard definitions, Tableau CRM (Einstein Analytics) datasets | `CorePlatform` |

#### Package Versioning

- **Versioning Scheme:** Semantic Versioning (`MAJOR.MINOR.PATCH`)
  - `MAJOR`: Breaking changes (schema changes, API incompatibilities)
  - `MINOR`: New backward-compatible features
  - `PATCH`: Bug fixes, no behavioral change
- **Version format in `sfdx-project.json`:**
  ```json
  {
    "packageDefinitions": [
      {
        "Package": "CorePlatform",
        "packageId": "0Ho...",
        "versionName": "Core Platform Base",
        "versionNumber": "5.0.0.NEXT",
        "versionDescription": "Core platform objects, sharing rules, and metadata for the unified customer platform",
        "isProtected": true,
        "isNamespaceEnabled": true,
        "containerOptions": "none"
      }
    ]
  }
  ```
- **Release cadence:** Minor versions released per release train (every 4 weeks). Patch versions released on-demand via hotfix branches. Major versions released per major milestone (quarterly).

### 5.2 Dependency Management

All dependencies are declared in `sfdx-project.json` and tracked via a dependency manifest.

#### Salesforce Managed Packages (Dependencies)

| Package | Version | Purpose | Approval Authority |
|---------|---------|---------|--------------------|
| MuleSoft Anypoint Connectors | Latest stable | Integration connectivity | Integration Architect |
| Marketing Cloud Connect | Latest stable | Marketing-SF integration | Marketing Architect |
| Experience Cloud Sites | Latest stable | Dealer portal hosting | Experience Architect |
| Salesforce Shield | Enterprise | Encryption, event monitoring, audit trail | Security Architect |
| Data Cloud (CDP) | Latest | Unified customer data | Data Architect |
| Einstein Analytics | Latest (Tableau CRM) | Analytics and reporting | Analytics Architect |

#### Third-Party Unlocked Packages (AppExchange)

| Package | Version | Purpose | Approval Authority | Review Cadence |
|---------|---------|---------|--------------------|---------------|
| Salesforce Extensions for VS Code | Latest | Developer tooling | DevOps Lead | Quarterly |
| Salesforce CLI Plugins | Latest | Deployment tooling | DevOps Lead | Quarterly |

#### Dependency Approval Process

1. Any new package dependency must be registered in the dependency manifest (`config/dependency-manifest.json`)
2. Security review by the Security Architect before any third-party package installation
3. Dependency updates must pass the same CI gates as code changes (PMD, ESLint, test coverage)
4. Dependency inventory is reviewed monthly by the Architecture Review Board
5. No dependency with a known CVE (Common Vulnerabilities and Exposures) is promoted to `main` without a documented risk acceptance

### 5.3 Package Installation and Upgrade Strategy

- **Unlocked packages are installed in sandbox environments first** before any production promotion
- **Version upgrade path:** Every package version increase must be tested in Staging with a full integration smoke test before production promotion
- **Dependency chain updates:** When a base package (e.g., `CorePlatform`) is upgraded, all dependent packages (e.g., `IdentityResolution`, `ServiceCloud`) are re-installed and validated in sequence
- **Breaking changes** require a dedicated release train and a minimum 2-week stabilization period in Staging
- **Rollback of package versions** is supported via Salesforce package version rollback commands; rollback procedures are documented in the CI/CD strategy document

---

## 6. Environment Promotion Strategy

### 6.1 Promotion Flow

Changes progress through the following promotion path:

```
Developer → Dev Sandbox → Test Sandbox → Staging Sandbox → Production (via change set or SFDX)
```

No code is promoted directly from any environment to Production except via the CI/CD pipeline (described in the CI/CD Strategy document).

### 6.2 Promotion Gates

| From → To | Required Gates | Minimum Checks |
|-----------|---------------|----------------|
| Dev → Test | PMD pass, ESLint pass, unit tests pass | Static analysis: no blocker violations. Unit test coverage ≥85% for changed code. |
| Test → Staging | All Test gates + integration tests pass | Integration test coverage on cross-package scenarios. PMD, ESLint, unit tests. |
| Staging → Production | All Staging gates + production validation, rollback tested, change approved | All previous gates + production readiness checklist (see Deployment Plan). ARB approval for production deployment. |

### 6.3 Promotion Cadence

| Environment | Refresh Frequency | Data | Purpose |
|-------------|-------------------|------|---------|
| Dev Sandbox | On-demand (developer request) | None (empty) | Development and local testing |
| Test Sandbox | Weekly | Production data subset (masked) | Integration testing, QA validation |
| Staging Sandbox | Bi-weekly | Full production data replica | UAT, performance testing, pre-production validation |
| Production | N/A | Live data | Customer-facing deployment |

### 6.4 Promotion Automation

Promotions between environments (excluding Production) are automated via the CI/CD pipeline:

1. Developer merges PR to `develop` → triggers CI pipeline → deploys to Dev Sandbox
2. Test Lead triggers Test promotion → pipeline deploys to Test Sandbox and runs automated test suite
3. Release Manager triggers Staging promotion → pipeline deploys to Staging and runs full validation suite
4. Architecture Review Board approves → Release Manager triggers Production promotion → pipeline deploys to Production with deployment tracking and event monitoring

---

## 7. DevOps Tooling Stack

| Category | Tool | Purpose |
|----------|------|---------|
| **Source Control** | GitHub Enterprise | Git repository, PR management, branch protection |
| **CI/CD** | GitHub Actions | Pipeline orchestration, validation gates |
| **CLI** | Salesforce CLI (`sfdx`) | Metadata deployment, org authentication, package management |
| **Static Analysis** | PMD, ESLint | Apex and JavaScript quality enforcement |
| **Secrets Management** | GitHub Secrets + Salesforce Named Credentials | Credential storage and injection |
| **Artifact Repository** | GitHub Packages | Package version storage and versioning |
| **Monitoring** | Salesforce Event Monitoring + Splunk | Post-deployment validation and anomaly detection |
| **Documentation** | Confluence (linked) and ADRs in-repo | Architecture decision records and operational runbooks |
| **Infrastructure** | Terraform + SFDX | Scratch org provisioning, environment management |

---

## 8. DevOps Metrics and KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Cycle Time** | <3 days (Dev → Test) | PR creation to test sandbox deployment |
| **Lead Time for Changes** | <5 days (PR → Production) | Merge to `main` to production promotion |
| **Deployment Frequency** | Weekly (release trains) | Production deployments per week |
| **Change Failure Rate** | <5% | Production deployments requiring rollback |
| **Mean Time to Recovery (MTTR)** | <4 hours | Time to rollback and restore production |
| **Static Analysis Coverage** | 100% | All Apex and LWC code passes PMD + ESLint |
| **Test Pass Rate** | ≥95% | Unit + integration tests passing |
| **Package Version Integrity** | Zero unauthorized versions | All package versions deployed through CI/CD |

---

## 9. DevOps Governance

All DevOps operations are governed by the **Governance Framework** document. Key governance touchpoints for DevOps:

1. **Change Advisory Board (CAB) Review** — all production deployments require CAB approval
2. **Deployments Dashboard** — real-time visibility into all deployment activity across all environments
3. **Deployment Audit Log** — every deployment is recorded with commit hash, package version, deployer identity, and outcome
4. **Incident Postmortem** — any deployment causing a production incident triggers a blameless postmortem within 48 hours
5. **DevOps Health Check** — quarterly review of DevOps metrics, pipeline health, and tooling effectiveness

---

*End of DevOps Strategy*