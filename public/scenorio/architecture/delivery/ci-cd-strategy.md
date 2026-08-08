# CI/CD Strategy

**Global Customer Unification Platform**
**Document Version:** 1.0
**Date:** 2026-07-28
**Owner:** CI/CD Engineering Lead (Architecture Council)
**Classification:** Confidential — Board Approved

---

## 1. Purpose and Scope

This document defines the Continuous Integration / Continuous Deployment (CI/CD) strategy for the Global Customer Unification Platform. It specifies the pipeline architecture, validation gates, deployment process, rollback procedures, feature flags, and release train model that govern how code moves from development to production on the single Salesforce production org across 14 brands and 47 countries.

### 1.1 Scope

| In Scope | Out of Scope |
|----------|--------------|
| Salesforce metadata deployment pipelines | MuleSoft deployment pipelines (MuleSoft standalone CI/CD) |
| Apex, LWC, Aura, Flow deployment | Data Cloud recipe deployment |
| Test execution and validation gates | Agentforce model training and deployment |
| Environment promotion (dev → test → staging → production) | Manual admin configurations |
| Feature flag management and rollout | Database backup and recovery operations |
| Release train planning and execution | Third-party ISV package upgrades |
| Rollback procedures and incident response | Dealer legacy integration deployment (frozen for 24 months) |

---

## 2. Pipeline Architecture

### 2.1 Platform Selection

**Primary CI/CD Platform:** GitHub Actions (self-hosted runners on AWS EC2 for Salesforce CLI access and credential management)

**Rationale:**
- Native integration with the team's GitHub-based source control strategy
- Supports matrix builds for multi-environment promotion
- Marketplace actions available for Salesforce CLI operations
- Self-hosted runners provide network access to Salesforce scratch orgs and sandboxes without exposing credentials

**Alternative considered and rejected:** GitLab CI — the team has already standardized on GitHub for source control, and GitHub Actions provides tighter integration with the existing branching model and PR workflow.

### 2.2 Pipeline Stages

Each pipeline is triggered by specific events in the Git workflow. Pipelines are organized into three tiers: **Build**, **Validate**, and **Deploy**.

#### Pipeline Tier Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CI/CD PIPELINE                              │
│                                                                     │
│  ┌─────────┐    ┌──────────────┐    ┌───────────────┐             │
│  │  BUILD   │───▶│   VALIDATE   │───▶│    DEPLOY      │           │
│  │          │    │              │    │                │           │
│  │• Install │    │• Static      │    │• Sandbox       │           │
│  │  package│    │  Analysis     │    │  Deployment    │           │
│  │• Install │    │• Unit Tests   │    │• Integration   │           │
│  │  deps   │    │• ESLint       │    │  Tests         │           │
│  │• Retrieve│    │• Test Coverage│    │• Post-Deploy   │           │
│  │  metadata│    │• Security Scan│    │  Validation    │           │
│  │• Package │    │• Integration  │    │• Promotion     │           │
│  │  version│    │  Tests        │    │  Tracking      │           │
│  └─────────┘    └──────────────┘    └───────────────┘             │
│       ▲                 ▲                     ▲                     │
│       │                 │                     │                     │
│    PR created        PR merged            Release triggered       │
│  (every branch)     to develop          (release train)           │
└─────────────────────────────────────────────────────────────────────┘
```

#### Stage 1: Build

**Trigger:** Pull request opened or synced; PR merged to `develop`; release branch created

**Steps:**

1. **Install Salesforce CLI and dependencies** — `sfdx` installed, plugins configured (sf-project, sf-package, sf-auth)
2. **Install package dependencies** — Install unlocked package dependencies declared in `sfdx-project.json` into the build environment
3. **Retrieve project metadata** — `sfdx force:source:retrieve` to ensure source is consistent with org state (sanity check only; not a deployment step)
4. **Generate package version** — If the build is triggered by a merge to `develop`, increment the package version and tag the commit
5. **Store package artifact** — Upload the package version ID and source commit hash as pipeline artifacts for traceability

**Artifacts produced:**
- Package version ID
- Source commit SHA
- Dependency manifest (resolved versions)
- Build log

**Time budget:** ≤5 minutes

#### Stage 2: Validate

**Trigger:** PR merged to `develop`; release branch created; pre-production promotion triggered

**Sub-stages:**

| Sub-Stage | Tool | Purpose | Fail Criteria |
|-----------|------|---------|----------------|
| **Static Analysis — PMD** | PMD | Apex code quality and bulkification | Any blocker violation |
| **Static Analysis — ESLint** | ESLint | LWC and JavaScript quality | Any error-level violation |
| **Unit Test Execution** | Salesforce CLI + Jest | Apex unit test coverage and pass rate | Coverage <85% on changed code; any test failure |
| **Security Scan** | Salesforce CLI + custom scripts | SOQL injection, hardcoded secrets, sharing model violations | Any critical or blocker finding |
| **Integration Test Execution** | Custom test harness + Salesforce CLI | Cross-package integration, MuleSoft connector validation | Any integration test failure |
| **Performance Sanity Check** | JMeter + Salesforce CLI | Governor limit simulation under load | No governor limit breaches at 2x expected load |
| **Deployment Dry Run** | `sfdx force:source:deploy --checkonly` | Validate deployment compatibility | Any validation error |

**Fail criteria:** Any sub-stage failure blocks the pipeline. No manual override is permitted for blocker findings. Warnings and informational findings are documented but do not block.

**Time budget:** ≤30 minutes

#### Stage 3: Deploy

**Trigger:** Release manager or automated pipeline trigger (see Section 4)

| Target Environment | Trigger | Approval Required |
|-------------------|---------|-------------------|
| Dev Sandbox | Automatic on PR merge to `develop` | None |
| Test Sandbox | Manual trigger by Test Lead | Test Lead approval |
| Staging Sandbox | Manual trigger by Release Manager | Release Manager + QA Lead approval |
| Production | Manual trigger by Release Manager | Architecture Review Board approval + CAB sign-off |

**Deployment method:**

- **Dev → Test → Staging:** `sfdx force:source:deploy --targetusername <org_alias> --deploydir force-app/main/default`
- **Production:** `sfdx force:mdapi:deploy` (Metadata API via change set or Salesforce CLI) for production deployments to ensure deploy-level change tracking and auditability. Source-based deployments allowed for hotfixes only after CAB approval.

**Post-deploy validation (automated):**

1. Run post-deploy smoke test suite (top 50 critical user journeys)
2. Verify no deployment errors in Setup → Deploy Status
3. Validate that key objects and fields are accessible
4. Run integration smoke tests against MuleSoft endpoints
5. Verify Experience Cloud site accessibility (if the deployed package contains Experience Cloud components)
6. Check Event Monitoring for anomalous login patterns post-deployment

**Time budget:** ≤15 minutes for deployment; ≤10 minutes for post-deploy validation

---

## 3. Validation Gates

### 3.1 Gate Definitions

| Gate ID | Gate Name | Stage | Failure Action | Escalation |
|---------|-----------|-------|----------------|------------|
| G01 | Static Analysis — PMD | Validate | Block pipeline | DevOps Lead |
| G02 | Static Analysis — ESLint | Validate | Block pipeline | DevOps Lead |
| G03 | Unit Test Coverage | Validate | Block if <85% on changed code | QA Lead |
| G04 | Unit Test Pass Rate | Validate | Block if <95% | QA Lead |
| G05 | Security Scan | Validate | Block on critical findings | Security Architect |
| G06 | Integration Tests | Validate | Block on failure | Integration Architect |
| G07 | Performance Sanity Check | Validate | Block on governor limit breaches | Performance Architect |
| G08 | Deployment Dry Run | Validate | Block on validation errors | DevOps Lead |
| G09 | Post-Deploy Smoke Tests | Deploy | Block promotion if failed | Release Manager |
| G10 | Production Validation Checklist | Deploy | Block Go-Live if incomplete | Architecture Review Board |

### 3.2 Test Coverage Requirements

| Test Type | Minimum Coverage | Scope | Execution Frequency |
|-----------|-----------------|-------|---------------------|
| **Unit Tests (Apex)** | 85% on changed code; 75% overall | All Apex classes modified in the PR | Every PR and every promotion |
| **Integration Tests** | 90% pass rate | Cross-package scenarios, MuleSoft connector paths, brand isolation scenarios | Every promotion to Staging and Production |
| **Performance Tests** | 95th percentile response time <2s; zero governor limit breaches at 2x load | Key user journeys (customer lookup, vehicle search, dealer portal, recall processing) | Before each production deployment; monthly in Staging |
| **Regression Tests** | 100% pass on critical paths | Full smoke test suite of top 200 user journeys | Every production deployment |
| **Data Quality Tests** | ≥99.5% accuracy on identity resolution, ≥99% on data seeding | Identity resolution, data migration, brand-specific data handling | Before each release train |

### 3.3 Test Environment Isolation

- Unit tests run in an isolated Salesforce org context with no external callouts (use `HttpCalloutMock` for all callouts)
- Integration tests run against a dedicated integration test environment that connects to MuleSoft sandbox and mock ERP endpoints
- Performance tests run against Staging with production-like data volumes (masked PII)
- No test creates or modifies data in Production outside of post-deploy smoke test execution

---

## 4. Deployment Process

### 4.1 Sandbox → Staging → Production Flow

The deployment process follows a sequential gate model. Each environment serves a specific purpose and has defined entry criteria.

#### Pre-Deployment Checklist (must be completed before any promotion)

- [ ] All pull requests for the release train merged to `main`
- [ ] Release branch created and tagged
- [ ] Package versions bumped and validated
- [ ] Dependency manifest updated and reviewed
- [ ] Static analysis gates passed on `main`
- [ ] All unit tests pass on `main`
- [ ] Integration test suite passes on `main`
- [ ] Security scan completed with no critical findings
- [ ] Performance sanity check passed
- [ ] Deployment dry run completed successfully
- [ ] Post-deploy smoke test suite validated against Staging

#### Deployment Steps by Environment

**Step 1: Deploy to Dev Sandbox**

```yaml
# GitHub Actions workflow snippet
- name: Deploy to Dev Sandbox
  run: |
    sfdx force:auth:jwt:grant -d -f config/server.key -u ${{ secrets.SF_DEV_SANDBOX_USERNAME }}
    sfdx force:source:deploy -d force-app/main/default --targetusername DevSandbox -u DevSandboxAlias
    sfdx force:source:push -u DevSandboxAlias
```

- **Trigger:** Automatic on merge to `develop`
- **Approval:** None required
- **Validation:** PMD + ESLint + unit tests only (gated at PR merge)
- **Duration:** ~10 minutes

**Step 2: Deploy to Test Sandbox**

```yaml
- name: Deploy to Test Sandbox
  run: |
    sfdx force:auth:jwt:grant -d -f config/server.key -u ${{ secrets.SF_TEST_SANDBOX_USERNAME }}
    sfdx force:source:deploy -d force-app/main/default --targetusername TestSandbox -u TestSandboxAlias --testlevel RunLocalTests
```

- **Trigger:** Manual (Release Manager or Test Lead)
- **Approval:** Test Lead sign-off
- **Validation:** PMD + ESLint + unit tests + integration tests
- **Duration:** ~15 minutes + test execution time

**Step 3: Deploy to Staging Sandbox**

```yaml
- name: Deploy to Staging Sandbox
  run: |
    sfdx force:auth:jwt:grant -d -f config/server.key -u ${{ secrets.SF_STAGING_USERNAME }}
    sfdx force:mdapi:deploy -d deploy-dir -u StagingAlias --checkonly --ignoreerrors
    sfdx force:mdapi:deploy -d deploy-dir -u StagingAlias --testlevel RunAllTestsInPackage
```

- **Trigger:** Manual (Release Manager)
- **Approval:** Release Manager + QA Lead
- **Validation:** Full validation gate suite (G01–G10)
- **Duration:** ~30 minutes + test execution time (1–2 hours for full test suite)

**Step 4: Deploy to Production**

```yaml
- name: Deploy to Production
  run: |
    sfdx force:auth:jwt:grant -d -f config/server.key -u ${{ secrets.SF_PROD_USERNAME }}
    sfdx force:source:deploy -d force-app/main/default --targetusername Production -u ProductionAlias --testlevel RunLocalTests --deploycomment "Release train v${RELEASE_VERSION}"
```

- **Trigger:** Manual (Release Manager after CAB approval)
- **Approval:** Architecture Review Board + CAB + Change Manager
- **Validation:** Full validation gate suite + Go-Live checklist (see Deployment Plan)
- **Duration:** ~20 minutes (source deployment) + 30 minutes post-deploy smoke tests
- **Maintenance Window:** Production deployments occur during the Saturday 02:00–06:00 UTC maintenance window (aligned with the deployment window across all 47 countries)

### 4.2 Deployment Tracking

Every deployment is recorded in a deployment log (automated via pipeline) with the following metadata:

| Field | Value |
|-------|-------|
| Deployment ID | Unique identifier (UUID) |
| Package Version | Exact version number deployed |
| Source Commit | Git commit SHA |
| Source Branch | Git branch from which deployed |
| Deployer | Identity of the person who triggered the deployment |
| Approver | CAB/ARB approver |
| Target Environment | Dev/Test/Staging/Production |
| Start Time | ISO 8601 timestamp |
| End Time | ISO 8601 timestamp |
| Status | Success / Partial Success / Failed / Rolled Back |
| Test Results | Links to test execution reports |
| Deployment Notes | Free text for operational context |
| Rollback Plan | Reference to the rollback procedure executed if applicable |

Deployment records are written to a shared SharePoint/Salesforce custom object (`Deployment_Log__c`) for auditability and compliance reporting.

---

## 5. Rollback Strategy

### 5.1 Rollback Tiers

Rollback procedures are tiered based on the severity and scope of the issue detected post-deployment.

#### Tier 1: Partial Deployment Failure (within 1 hour of deployment)

**Symptoms:** One or more components fail to deploy (validation errors), but the deployment partially succeeded. No functional impact on production users.

**Procedure:**

1. Immediately stop the deployment using Salesforce Setup → Deploy Status → Cancel Deployment
2. Diagnose the root cause of the failed components
3. Fix the source code in a hotfix branch from `main`
4. Re-deploy the corrected components only (not the full package)
5. Run post-deploy smoke tests
6. Escalate to the Release Manager if the fix is not available within 1 hour

**Rollback Time Target:** ≤30 minutes

#### Tier 2: Functional Regression (within 4 hours of deployment)

**Symptoms:** Deployment succeeded, but functional testing reveals regressions (broken user journeys, incorrect data processing, API failures).

**Procedure:**

1. Halt all dependent integrations (via MuleSoft scheduler pause)
2. Execute Salesforce package version rollback:
   ```bash
   sfdx force:package:version:rollback --packageversionid <NEW_VERSION_ID> --targetusername Production
   ```
3. Run post-rollback smoke tests to confirm the previous version is restored
4. Create a hotfix branch from the pre-deployment release tag
5. Fix the root cause, run full CI pipeline, and re-deploy to Staging for validation
6. Execute a re-deployment to Production after Staging validation passes
7. Notify all stakeholders of the rollback and remediation plan

**Rollback Time Target:** ≤2 hours

#### Tier 3: Critical Production Incident (within 24 hours of deployment)

**Symptoms:** Deployment caused a critical production incident — data corruption, security breach, service outage, or compliance violation affecting customer data across multiple brands or countries.

**Procedure:**

1. **Incident declared** — Incident Commander (designated on-call SRE) declares a P0 incident
2. **Service degraded** — If applicable, route traffic to the previous stable version via DNS or API gateway routing
3. **Data rollback** — If data corruption is suspected:
   - Restore from the most recent validated backup (snapshot taken before each production deployment)
   - Replay transaction logs from backup point to rollback point (if available and validated)
   - Validate data integrity post-rollback
4. **Package rollback** — Execute `sfdx force:package:version:rollback` to restore the previous package version
5. **Communication** — Incident Commander activates the communication plan (see Deployment Plan)
6. **Root cause investigation** — Post-incident, the DevOps team and the responsible component owner conduct a blameless postmortem within 48 hours
7. **Re-deployment gate** — The root cause must be fixed, tested, and approved by the Architecture Review Board before any re-deployment to Production

**Rollback Time Target:** ≤4 hours (package rollback); data restoration time varies based on backup strategy

### 5.2 Rollback Prerequisites (always maintained in Production)

- The previous stable package version is always retained in Production (never deleted)
- A validated backup snapshot is taken before every production deployment
- Rollback procedures are tested quarterly in the Staging environment as part of the disaster recovery drill
- Rollback runbooks are maintained in the `docs/runbooks/` directory and are versioned alongside the application code

---

## 6. Feature Flags

### 6.1 Feature Flag Architecture

Feature flags allow controlled rollout of new features across brands, regions, and user segments without requiring a full deployment.

**Implementation:**

- **Custom Metadata Type: `Feature_Flag__mdt`** — stores flag definitions
  - Fields: `FlagName`, `Description`, `Enabled__c`, `Brand__c`, `Country__c`, `UserRole__c`, `RolloutPercentage__c`, `CreatedDate`, `LastModifiedDate`
- **Apex Service: `FeatureFlagService`** — centralized service for checking flag state with caching
- **LWC Utility: `featureFlag`** — Lightning Web Component utility for client-side flag evaluation
- **Data Cloud: Feature Flag Dataset** — synced to Data Cloud for analytics and targeting

### 6.2 Feature Flag Lifecycle

| Stage | Description | Default Duration |
|-------|-------------|-----------------|
| **Development** | Flag exists but is disabled. Used for development and testing feature branches in isolation. | Until feature is complete |
| **QA** | Flag is enabled for QA and Staging environments only. | Until QA sign-off |
| **Pilot** | Flag is enabled for a subset of users (e.g., one brand, one dealer group, one region). | 2–4 weeks |
| **Gradual Rollout** | Flag is enabled for increasing percentages of users (10% → 25% → 50% → 100%). | 1–2 weeks per stage |
| **Stable** | Flag is enabled for all users. Flag is no longer needed but remains in the codebase as a deprecated feature flag. | Until next major release |
| **Deprecated** | Flag is removed from the codebase. Removal requires a separate release train. | Permanent |

### 6.3 Flag Governance

- Every feature flag must have a corresponding JIRA ticket with an owner, expiration date, and removal plan
- Flags that have been in "Stable" status for more than 90 days are flagged for removal in the next release train
- No flag can remain in "Pilot" status for more than 4 weeks without Architecture Review Board review
- Flag state changes are audited via Field Audit Trail on the Custom Metadata Type
- A dashboard (`Feature Flag Status Dashboard`) is maintained on Experience Cloud for operational visibility

---

## 7. Release Train Model

### 7.1 Release Train Cadence

The project operates on a **4-week release train** model aligned with the 18-month timeline and phased brand rollout.

| Cadence | Activity | Duration |
|---------|----------|----------|
| **Sprint** | Development iteration | 2 weeks |
| **Release Train** | Integration, testing, and deployment cycle | 4 weeks (2 sprints) |
| **Quarterly Planning** | Roadmap review and priorities for the next quarter | 1 day (quarterly) |

### 7.2 Release Train Phases

Each 4-week release train follows this pattern:

```
Week 1:   Development Sprint 1 (feature development, unit tests)
Month 1   ┌─ Week 1: Dev Sprint 1
          ├─ Week 2: Dev Sprint 2 (feature completion, code freeze Wednesday noon)
          └─ Week 3: Integration & Validation (PR freeze Thursday, testing all week)
Month 2   └─ Week 4: Deployment & Stabilization (Staging deployment Wed, Production deployment Sat)
```

#### Week-by-Week Breakdown

**Week 1 (Sprint 1 — Development)**
- Feature development continues on feature branches
- Daily stand-ups, code reviews, CI validation on Dev Sandbox
- Mid-week demo to Product Owner for feedback
- Friday: Sprint 1 review and Sprint 2 planning

**Week 2 (Sprint 2 — Stabilization)**
- Feature branches merged to `develop`; CI pipeline validates automatically
- Friday 12:00 UTC: Code freeze — no further merges to `develop` for the release train
- QA begins integration testing against the `develop` branch snapshot
- Release Manager creates the release candidate tag

**Week 3 (Integration & Validation)**
- Release candidate deployed to Test Sandbox
- Full test suite execution (unit, integration, performance, regression)
- Security scan completed
- Bug fixes triaged and prioritized by severity
- P1 bugs (blocking): fixed in hotfix branches, re-tested, re-deployed to Test
- P2/P3 bugs: documented for post-release tracking
- Friday: Validation sign-off by QA Lead and Release Manager

**Week 4 (Deployment & Stabilization)**
- Monday: Release candidate deployed to Staging Sandbox
- Tuesday: User Acceptance Testing (UAT) conducted by business stakeholders and brand representatives
- Wednesday: Production deployment (Saturday 02:00 UTC maintenance window)
- Thursday–Friday: Post-deployment monitoring and hypercare (see Deployment Plan)
- Release retrospective conducted at the end of the week

### 7.3 Branch and Release Mapping

| Release Train | Release Branch | Target Brands | Target Date |
|---------------|---------------|---------------|-------------|
| RT-2026-Q3 | `release/v1.0.0` | Brand 1 (pilot), Brand 2 | Month 3 |
| RT-2026-Q4 | `release/v1.1.0` | Brand 3, Brand 4 | Month 6 |
| RT-2027-Q1 | `release/v2.0.0` | Brand 5–Brand 8 | Month 9 (value track milestone) |
| RT-2027-Q2 | `release/v2.1.0` | Brand 9–Brand 11 | Month 12 |
| RT-2027-Q3 | `release/v2.2.0` | Brand 12–Brand 14 | Month 15 |
| RT-2027-Q4 | `release/v3.0.0` | Full deployment, dealer migration | Month 18 |

### 7.4 Release Train Decision Gate

At the end of Week 3 (validation phase), the Architecture Review Board reviews the release candidate against the Go/No-Go criteria:

**Go Criteria:**
- All validation gates (G01–G10) passed
- All P1 bugs resolved or accepted with documented risk
- UAT sign-off received from at least one brand representative per region
- Production readiness checklist completed
- Rollback plan tested and validated
- Change Advisory Board approval obtained

**No-Go Criteria (any one triggers delay):**
- Any blocker severity finding from static analysis or security scan
- Any P1 bug unresolved
- UAT not completed with at least 50% of target brands
- CAB approval not obtained

---

## 8. Pipeline Configuration (GitHub Actions)

### 8.1 Workflow Definitions

**`ci.yml`** — Continuous Integration (runs on every PR and push to `develop`):
- Triggers: `pull_request` events on `develop` and `release/*` branches
- Steps: Install dependencies, PMD, ESLint, unit tests, security scan

**`cd-sandbox.yml`** — Continuous Deployment to Sandbox (runs on merge to `develop`):
- Triggers: `push` to `develop` branch
- Steps: Build → Deploy to Dev Sandbox → Run post-deploy smoke tests

**`cd-staging.yml`** — Continuous Deployment to Staging (manual trigger):
- Triggers: `workflow_dispatch` (manual)
- Steps: Full validation → Deploy to Staging → Run full test suite → Generate deployment report

**`cd-production.yml`** — Continuous Deployment to Production (manual trigger with approvals):
- Triggers: `workflow_dispatch` with `inputs` for release version and approval confirmation
- Steps: Pre-deployment checklist → Deploy to Production → Post-deploy smoke tests → Deployment tracking update → Notifications

### 8.2 Secrets and Credentials Management

| Secret | Storage | Rotation Policy | Access |
|--------|---------|-----------------|--------|
| `SF_PROD_USERNAME` | GitHub Secrets | Quarterly rotation | Release Manager, DevOps Lead |
| `SF_PROD_CONSUMER_KEY` | GitHub Secrets | Quarterly rotation | DevOps Lead only |
| `SF_PROD_PRIVATE_KEY` | GitHub Secrets (encrypted) | On rotation event | DevOps Lead only |
| `MULESOFT_CLIENT_ID` | GitHub Secrets | Quarterly rotation | Integration Architect, DevOps Lead |
| `MULESOFT_CLIENT_SECRET` | GitHub Secrets | Quarterly rotation | Integration Architect, DevOps Lead |
| `SNOWFLAKE_CREDENTIALS` | GitHub Secrets | Quarterly rotation | Data Architect |

All secrets are scoped to specific environments and are never passed as plaintext in pipeline logs. Credentials are injected via environment variables at runtime and masked in logs.

---

## 9. CI/CD Metrics and Monitoring

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Build Success Rate** | >95% | CI pipeline completitions without failure |
| **Pipeline Execution Time** | <60 minutes (end-to-end) | From trigger to completion |
| **Stage Failure Rate** | <3% | Individual stage failures per pipeline run |
| **Deployment Success Rate** | >98% | Production deployments without rollback |
| **Mean Time to Deploy** | <1 hour (dev-to-staging), <4 hours (staging-to-production) | From deployment trigger to completion |
| **Feature Flag Coverage** | >90% of new features use feature flags | Count of features with flags / total features |
| **Security Findings Remediation** | P0/P1: <24 hours; P2: <7 days | Time from finding to resolution |
| **Release Train On-Time Delivery** | >85% | Release trains completing within scheduled week |

---

*End of CI/CD Strategy*