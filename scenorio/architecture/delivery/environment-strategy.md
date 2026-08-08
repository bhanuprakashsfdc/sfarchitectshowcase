# Environment Strategy

**Global Customer Unification Platform**
**Document Version:** 1.0
**Date:** 2026-07-28
**Owner:** Platform Engineering Lead (Architecture Council)
**Classification:** Confidential — Board Approved

---

## 1. Purpose and Scope

This document defines the environment strategy for the Global Customer Unification Platform deployed on a single Salesforce production org. It specifies the sandbox tiers, SIT/UAT environments, performance testing infrastructure, scratch org usage, data seeding strategy, and environment refresh schedule to support the phased brand-by-brand deployment across 14 brands and 47 countries.

### 1.1 Scope

| In Scope | Out of Scope |
|----------|--------------|
| Salesforce sandbox environments (Dev, Test, Staging, Production) | MuleSoft environment strategy (separate document) |
| SIT and UAT environment definitions and operations | Data Warehouse environment strategy |
| Performance testing environment architecture | Non-Salesforce infrastructure environments |
| Scratch org definitions for development | Agentforce model training environments |
| Data seeding and masking strategies | Third-party ISV sandbox environments |
| Environment refresh and lifecycle management | Data Cloud development environments |
| Regional data zone environments | Dealer legacy system test environments |

---

## 2. Sandbox Tier Strategy

### 2.1 Sandbox Hierarchy

The platform operates a four-tier sandbox hierarchy aligned with the CI/CD promotion flow. Each tier serves a distinct purpose and has specific capabilities, data content, and access controls.

| Tier | Sandbox Type | Purpose | Data | Capacity | Refresh Cadence | Access |
|------|-------------|---------|------|----------|-----------------|--------|
| **Dev** | Developer Sandbox | Individual developer workspaces for feature development and local testing | Empty (no production data) | Max 200 MB | On-demand (developer request) | Individual developers |
| **Test** | Full Copy Sandbox | Integration testing, QA validation, and cross-brand scenario testing | Production data subset (masked PII, 10% volume) | Max 5 GB | Weekly (Sunday 02:00 UTC) | QA team, Integration team (max 10 users) |
| **Staging** | Full Copy Sandbox | User Acceptance Testing (UAT), performance testing, pre-production validation | Full production data replica (masked PII) | Full org data size | Bi-weekly (Saturday 02:00 UTC) | Product Owners, Business Analysts, Brand Representatives, Security team, Release Manager |
| **Production** | Production Org | Customer-facing live environment | Live production data | Production org capacity | N/A | Platform admins, Release Manager, Incident Responders (controlled) |

### 2.2 Sandbox Specifications by Tier

#### Developer Sandbox (Dev Tier)

**Purpose:** Individual developer workspaces for writing, testing, and validating Apex and LWC code in isolation.

**Configuration:**
- **Type:** Developer Sandbox (not Developer Pro, to save cost within the 25% budget reduction)
- **Data storage:** 200 MB (sufficient for source retrieval and local testing)
- **User licenses:** Developer sandbox user license (free with org)
- **Retention:** 7 days maximum (sandbox auto-deleted after 7 days of inactivity)
- **Source control:** `sfdx force:source:push` from local dev environment; `sfdx force:source:pull` to sync from org
- **Authentication:** SFDX authentication via JWT flow using per-developer sandbox credentials stored in GitHub Secrets

**Usage Rules:**
- Developers are encouraged to create a fresh Dev Sandbox at the start of each sprint
- No production data is ever retrieved into Dev Sandboxes (prevents PII exposure risk)
- Dev Sandboxes are not used for integration testing
- Dev Sandboxes are not used for QA validation

#### Test Sandbox (Test Tier)

**Purpose:** Integration testing and QA validation of features that touch multiple packages or interact with MuleSoft integrations.

**Configuration:**
- **Type:** Full Copy Sandbox (not Developer Pro or Partial Copy — full copy is required for integration testing with real data relationships)
- **Data storage:** 5 GB (configurable via Salesforce; increased if needed for Test Sandbox)
- **Data content:** Production data subset (10% volume) with PII masked using Shield Platform Encryption
- **Brand coverage:** At minimum 3 brands per Test Sandbox (rotated weekly to cover different brand combinations)
- **User licenses:** Full Salesforce User licenses for QA team members (max 10 concurrent users)
- **Retention:** 7 days after last access
- **Authentication:** SFDX authentication via JWT flow using shared Test Sandbox service account

**Brand Rotation Schedule for Test Sandbox:**

| Week | Brands in Test Sandbox | Region | Rationale |
|------|----------------------|--------|-----------|
| 1 | Brand 1 (pilot), Brand 2, Brand 3 | Americas | Early brands, largest customer base |
| 2 | Brand 4, Brand 5, Brand 6 | EMEA | Mid-phase brands, EU data residency validation |
| 3 | Brand 7, Brand 8, Brand 9 | APAC | APAC data residency validation |
| 4 | Brand 10, Brand 11, Brand 12 | Americas | Late-phase brands |
| 5 | Brand 13, Brand 14 | EMEA | Remaining brands |
| 6 | Rotation restarts | All | Full coverage |

#### Staging Sandbox (Staging Tier)

**Purpose:** User Acceptance Testing, performance testing, and pre-production validation with production-like data volumes and configurations.

**Configuration:**
- **Type:** Full Copy Sandbox
- **Data storage:** Full production org data size (68M customers, 125M vehicles, all related objects)
- **Data content:** Full production data replica with PII masked using Shield Platform Encryption
- **Data residency zones:** Configured to mirror production regional data zone layout (EU APAC, Americas, Brazil)
- **User licenses:** Full Salesforce User licenses for authorized UAT and performance testing team (max 20 concurrent users)
- **Retention:** 14 days before automatic refresh
- **Authentication:** SFDX authentication via JWT flow using shared Staging Sandbox service account
- **MuleSoft connectivity:** Connected to MuleSoft Staging environment for end-to-end integration testing
- **Experience Cloud sites:** Deployed on Staging Experience Cloud domains (separate from production domains)
- **Brand coverage:** All 14 brands available simultaneously (this is the only environment with full brand coverage)

**Key Characteristic:** The Staging Sandbox is the **last environment** before Production. Any issue discovered in Staging blocks Production deployment until resolved.

---

## 3. SIT/UAT Environment Definitions

### 3.1 System Integration Testing (SIT) Environment

The SIT environment is a dedicated testing environment within the **Test Sandbox** tier, specifically configured for integration testing.

**Purpose:** Validate end-to-end business processes that span multiple Salesforce packages and external systems (MuleSoft, ERPs, dealer management systems).

**Environment Configuration:**
- **Location:** Test Sandbox with brand rotation configured to include all 14 brands over the rotation cycle
- **MuleSoft connectivity:** Connected to MuleSoft Test environment with mock ERP endpoints
- **External system simulation:** Mock services for ERP, dealer DMS, and manufacturing SCADA systems
- **Data seeding:** Pre-loaded with integration test scenarios covering:
  - Customer identity resolution across brands
  - Cross-brand vehicle lookup
  - Warranty claim across brands
  - Dealer portal unified customer view
  - Recall notification across brands
  - Subscription management across brands
  - Connected vehicle telemetry processing (simulated)

**SIT Entry Criteria:**
1. All unit tests pass on the Test Sandbox deployment
2. Integration test suite is complete and reviewed
3. MuleSoft Test endpoint is available and validated
4. Test data for integration scenarios is seeded and validated

**SIT Exit Criteria:**
1. All integration test scenarios pass with ≥95% success rate
2. No P1 or P2 defects remain open
3. MuleSoft integration connector responses validated for all 47-country scenarios
4. Cross-brand data flow validated (data moves correctly between brand silos)
5. Performance benchmark met (API response times within SLA for integration paths)

### 3.2 User Acceptance Testing (UAT) Environment

The UAT environment is the **Staging Sandbox** with full production data and all 14 brands available.

**Purpose:** Business stakeholders and brand representatives validate that the deployment meets their requirements before Production.

**Environment Configuration:**
- **Location:** Staging Sandbox with full data replica
- **Experience Cloud:** Staging Experience Cloud sites deployed with brand-specific theming
- **Dealer portal:** Staging dealer portal accessible to dealer advisory board members
- **Agentforce:** Staging Agentforce available for service agent UAT
- **Data Cloud:** Staging Data Cloud with identity resolution rules active against the full data set

**UAT Entry Criteria:**
1. SIT completed and signed off
2. Staging Sandbox refreshed with latest validated Test Sandbox state
3. Pre-UAT smoke tests pass
4. All P1 and P2 defects from SIT are resolved
5. UAT test scenarios approved by Product Owner and brand representatives
6. Data residency compliance review sign-off (per-country, per-data-type)

**UAT Exit Criteria:**
1. UAT sign-off received from each of the 14 brand stakeholders (at minimum one representative per brand)
2. UAT sign-off received from each of the 9 regional contact center leads
3. Data residency compliance confirmed for all regional data zones
4. Dealer portal UAT sign-off from Dealer Advisory Board
5. No unresolved P1 defects
6. P2 defects documented with acceptance of risk (approved by Product Owner)
7. Production readiness checklist completed (see Deployment Plan)

---

## 4. Performance Testing Environment

### 4.1 Performance Testing Architecture

Performance testing is conducted independently of the standard sandbox tiers to ensure production-like conditions without impacting UAT or Test Sandbox availability.

**Environment Location:** Dedicated Performance Test Sandbox using a Salesforce Performance Sandbox license (or equivalent on-premises Salesforce instance configured for load testing).

**Purpose:** Validate that the platform meets performance SLAs under production-like load before each production deployment.

### 4.2 Performance Testing Scenarios

| Scenario | Target Load | Success Criteria | Frequency |
|----------|------------|------------------|-----------|
| **Customer Identity Resolution** | 100 concurrent users, 500 req/sec | Response time <500ms at p95; p99 <1s | Before each production deployment |
| **Vehicle Search** | 200 concurrent users, 1,000 req/sec | Response time <1s at p95; p99 <2s | Before each production deployment |
| **Dealership Portal** | 11,500 dealer concurrent users (simulated), 5,000 req/sec | Response time <2s at p95; p99 <5s | Before each production deployment |
| **Case Creation (Service Cloud)** | 920 concurrent users, 2,000 req/sec | Response time <1s at p95; p99 <3s | Before each production deployment |
| **Recall Notification (Batch)** | 125M vehicles processed | Batch completes within 4 hours | Before each production deployment |
| **Subscription Management (API)** | 5,000 concurrent API calls | No governor limit breaches; <10% error rate | Before each production deployment |
| **Identity Resolution (Full Load)** | 68M customer records processed | Identity resolution completes in <24 hours | Monthly (Staging) |
| **Data Cloud Calculation Views** | 125M vehicle events processed | Calculations complete within SLA; no timeout | Monthly (Staging) |

### 4.3 Performance Testing Tools

| Tool | Purpose |
|------|---------|
| **JMeter** | Load generation for Salesforce API endpoints |
| **Salesforce Performance Testing Toolkit** | Native Salesforce performance testing |
| **AWS EC2 Load Generators** | Distributed load generation across regions (Americas, EMEA, APAC) |
| **Salesforce Event Monitoring** | Real-time monitoring of governor limits, API usage, and response times during tests |
| **Splunk** | Aggregation and analysis of performance test results |

### 4.4 Performance Benchmarks (Production SLAs)

| API Endpoint | SLA (p95) | SLA (p99) | SLA (Max) |
|-------------|-----------|-----------|-----------|
| Customer Identity Resolution | <500ms | <1s | <2s |
| Vehicle Search by VIN | <1s | <2s | <5s |
| Dealer Portal Login | <1s | <2s | <5s |
| Case Creation (Service Cloud) | <1s | <3s | <10s |
| Recall Notification API | <2s | <5s | <10s |
| Subscription Management API | <500ms | <1s | <3s |
| Platform Event Publish | <100ms | <500ms | <1s |
| Data Cloud Calculation | Async | Async | <24 hours for 68M records |

### 4.5 Performance Test Execution Schedule

| Event | Timing | Environment |
|-------|--------|-------------|
| Pre-production validation | Before each production deployment | Performance Test Sandbox |
| Monthly load test | First Thursday of each month | Performance Test Sandbox |
| Quarterly stress test | First week of each quarter | Performance Test Sandbox |
| Scale validation (68M records) | After first brand migration to Production | Performance Test Sandbox (Staging data) |
| Annual capacity planning | Annually (Q4, before budget cycle) | Performance Test Sandbox (projected load) |

---

## 5. Scratch Org Usage

### 5.1 Scratch Org Definition

Scratch orgs are short-lived, configurable Salesforce environments defined in `config/scratch-org-definitions/` and provisioned via SFDX for development and testing purposes. They are the primary development environment for the project and replace the traditional Dev Sandbox for feature development work.

### 5.2 Scratch Org Configurations

| Config Name | Purpose | Expiry | Features |
|-------------|---------|--------|----------|
| `scratch-dev` | Individual developer scratch org for feature development | 7 days | Core platform objects, Apex, LWC, Flows; no Experience Cloud; no Data Cloud config |
| `scratch-integration` | Integration testing scratch org for developer work | 3 days (auto-deleted) | Core platform objects + MuleSoft Dev Hub mock connectors; used for local integration testing |
| `scratch-qa` | QA scratch org for test scenario authoring | 3 days | Core platform objects + all packages installed; used for test development, not execution |
| `scratch-perf` | Scratch org for performance test development | 3 days | Core platform objects with synthetic data generation scripts; used to validate test scripts before running against Staging |

### 5.3 Scratch Org Lifecycle

1. **Provisioning:** Scratch orgs are created via `sfdx force:org:create -f config/scratch-org-definitions/scratch-dev.json` as part of the developer onboarding or CI pipeline
2. **Source seeding:** `sfdx force:source:push` deploys source metadata to the scratch org
3. **Development:** Developer works on the scratch org (code, tests, validation)
4. **Validation:** CI pipeline runs PMD, ESLint, and unit tests on the scratch org source
5. **Source retrieval:** Developer pushes changes back to `force-app` in GitHub via `sfdx force:source:push`
6. **Disposal:** Scratch org is automatically deleted on expiry (7 days for Dev, 3 days for QA/Integration/Perf)

### 5.4 Scratch Org Governance

| Policy | Requirement |
|--------|-------------|
| **Scratch org definition files** | All scratch org definitions are version-controlled in `config/scratch-org-definitions/` |
| **Scratch org names** | Must follow naming convention: `project-{env}-{devinitials}-{date}` |
| **Scratch org expiry** | Must not exceed the defined expiry for the configuration type |
| **Scratch org data** | No production data is ever seeded into scratch orgs |
| **Scratch org credentials** | Stored in GitHub Secrets or `.sfdx/sfdx-auth` (gitignored), never committed |
| **Scratch org refresh** | New scratch org required for each sprint; no persistent scratch orgs |
| **Scratch org packages** | Only unlocked package dependencies may be installed; no managed third-party packages without Architecture Review Board approval |

---

## 6. Data Seeding Strategy

### 6.1 Data Seeding Tiers

Different environments require different data seeding approaches based on their purpose and data sensitivity.

#### Tier 1: Empty Data (Dev Sandbox, Scratch Orgs)

| Environment | Data Source | Seeding Method | Contents |
|-------------|-------------|---------------|----------|
| **Dev Sandbox** | None | N/A | Empty org; developers retrieve metadata source via `sfdx force:source:pull` |
| **Scratch Orgs** | None (schema only) | `sfdx force:source:push` | Metadata schema only; no seed data |

#### Tier 2: Synthetic Data (All Environments)

| Environment | Data Volume | Generation Method | Retention |
|-------------|-------------|-------------------|-----------|
| **Dev Sandbox** | 100 records per seedable object | Custom Apex scripts using `Test.loadData()` | Until dev session ends |
| **Scratch Orgs** | 50 records per seedable object | Custom Apex scripts using `Test.loadData()` | Until scratch org expiry |
| **Test Sandbox** | Production-like synthetic data | Custom Apex seed scripts + Bulk API | Until Test Sandbox destroyed |

**Synthetic Data Seeding Scripts:** Located in `scripts/data-seed/` directory

#### Tier 3: Production Subset Data (Test Sandbox)

| Environment | Data Volume | Source | Masking |
|-------------|-------------|--------|---------|
| **Test Sandbox** | 10% of production records | Production export via `Data Loader` or `sfdx force:data:tree:export` | Shield Platform Encryption applied to PII fields; `Email__c`, `Phone__c`, `SSN__c`, `Payment__c` fields encrypted |

**Seeding Process:**
1. Extract 10% random sample from production tables via Data Loader
2. Apply PII masking using Shield Platform Encryption with dedicated Test Sandbox encryption keys
3. Validate masking by sampling 1% of seeded records and confirming PII is unreadable
4. Load masked data into Test Sandbox via Bulk API
5. Run data quality validation (record counts, referential integrity, masking verification)
6. Document the seeding run in `Deployment_Log__c`

#### Tier 4: Full Production Replica (Staging Sandbox)

| Environment | Data Volume | Source | Masking | Data Residency |
|-------------|-------------|--------|---------|----------------|
| **Staging Sandbox** | Full production (68M customers, 125M vehicles) | Full production export | Shield Platform Encryption applied to all PII; field-level encryption for SSN/payment | Regional data zones mirror production layout (EU data stays in EU zone, etc.) |

**Seeding Process:**
1. Request production data export from Salesforce Ops (change request submitted 48 hours before Scheduled Refresh)
2. Export via Salesforce Data Export Service or Data Loader bulk export
3. Apply PII masking per the Data Residency Governance Framework (see Governance Framework)
4. Validate data residency zone integrity (no EU customer data in Americas zone, etc.)
5. Load data into Staging Sandbox via Bulk API (may take 6–12 hours for full dataset)
6. Post-load validation:
   - Record count verification (±0.1% tolerance)
   - Referential integrity check across all objects
   - PII masking verification (random sample of 10,000 records)
   - Data residency zone validation (each record verified against zone mapping)
   - Identity resolution run to confirm unified customer IDs are present
7. Document the staging refresh in `Environment_Refresh_Log__c`

### 6.2 Data Seeding Automation

Data seeding is partially automated via scripts in `scripts/data-seed/`:

```bash
# Seed Test Sandbox (10% production data, masked)
./scripts/data-seed/seed-test-sandbox.sh \
  --source Production \
  --target TestSandbox \
  --sample-percentage 10 \
  --mask-pii true \
  --validate true \
  --output logs/seed-test-$(date +%Y%m%d).log

# Seed Staging Sandbox (full production data, masked, regional zones)
./scripts/data-seed/seed-staging-sandbox.sh \
  --source Production \
  --target StagingSandbox \
  --sample-percentage 100 \
  --mask-pii true \
  --enforce-data-residency true \
  --validate true \
  --output logs/seed-staging-$(date +%Y%m%d).log
```

### 6.3 Masking Rules

| Field | Masking Method | Applies To |
|-------|---------------|------------|
| `Email__c` | `masked.user+{hash}@example.com` | All environments except Production |
| `Phone__c` | `+XX-XXX-XXX-XXXX` (replaced with generated valid format) | All environments except Production |
| `SSN__c` | `XXX-XX-{last4}` | Test, Staging, Performance Test |
| `Payment__c` | `****-****-****-{last4}` | Test, Staging, Performance Test |
| `Name_First__c` | `[FIRST_NAME]` | Test, Staging |
| `Name_Last__c` | `[LAST_NAME]` | Test, Staging |
| `Name_Full__c` | `[FULL_NAME]` | Test, Staging |
| `Address_Line1__c` | `[ADDRESS]` | Test, Staging |
| `City__c` | `[CITY]` | Test, Staging |
| `VIN__c` | `VIN-{hash}` (preserves uniqueness, removes real VIN) | All environments except Production |
| `Plate__c` | `plate-{hash}` | All environments except Production |
| `Customer_ID__c` | Preserved (unified customer ID) | All environments (required for identity resolution validation) |

---

## 7. Environment Refresh Schedule

### 7.1 Automatic Refresh Schedule

| Environment | Refresh Type | Schedule | Owner | Downtime |
|-------------|-------------|----------|-------|----------|
| **Dev Sandbox** | On-demand (not scheduled) | Developer requests | Individual developer | N/A (fresh sandbox created) |
| **Test Sandbox** | Scheduled refresh | Every Sunday 02:00 UTC (weekly) | Platform Engineering | 30 minutes (window: Sun 02:00–03:00 UTC) |
| **Staging Sandbox** | Scheduled refresh | Every Saturday 02:00 UTC (bi-weekly) | Platform Engineering | 2 hours (window: Sat 02:00–04:00 UTC) |
| **Production** | N/A | N/A | N/A | N/A |

### 7.2 Refresh Procedure

**Test Sandbox Refresh (Weekly):**

1. **Pre-refresh (Friday):** Test Lead confirms no active UAT or integration testing in Test Sandbox
2. **Refresh (Saturday 02:00 UTC):**
   - Platform Engineering pauses MuleSoft Test environment connections
   - Salesforce initiates Test Sandbox refresh from production backup snapshot
   - Refresh completes (typically 2–4 hours for a Full Copy Sandbox)
   - PII masking is applied automatically via post-refresh script
   - Platform Engineering resumes MuleSoft Test environment connections
3. **Post-refresh (Saturday 04:00 UTC):**
   - Platform Engineering runs data quality validation suite
   - QA Lead receives notification and validates Test Sandbox availability
   - Environment Dashboard updated with refresh timestamp
4. **Exception handling:** If refresh fails, retry once within 1 hour; if still failing, escalate to Platform Engineering Lead

**Staging Sandbox Refresh (Bi-weekly):**

1. **Pre-refresh (Tuesday):** Release Manager confirms no active UAT or deployment in Staging Sandbox
2. **Refresh (Saturday 02:00 UTC):**
   - Platform Engineering pauses all Staging connections (MuleSoft, Experience Cloud, Data Cloud sync)
   - Salesforce initiates Staging Sandbox refresh from production backup snapshot
   - Refresh completes (may take 6–12 hours for full production data volume)
   - PII masking and data residency zone enforcement applied via post-refresh script
   - Platform Engineering resumes Staging connections
3. **Post-refresh (Saturday 12:00 UTC or later):**
   - Platform Engineering runs full data quality and residency validation suite
   - Identity reconciliation run against Staging data to confirm unified customer IDs
   - UAT Lead validates Staging Sandbox availability
   - Environment Dashboard updated
4. **Exception handling:** If refresh fails, retry once within 2 hours; escalate to Platform Engineering Lead

### 7.3 Environment Refresh Calendar

| Week | Dev Sandboxes | Test Sandbox Refreshed | Staging Sandbox Refreshed |
|------|--------------|----------------------|--------------------------|
| 1 | New scratch orgs created as needed | Sunday (Weekly) | Saturday (Bi-weekly, odd weeks) |
| 2 | New scratch orgs created as needed | Sunday (Weekly) | No refresh (even week) |
| 3 | New scratch orgs created as needed | Sunday (Weekly) | Saturday (Bi-weekly, even weeks) |
| 4 | New scratch orgs created as needed | Sunday (Weekly) | No refresh (even week) |

### 7.4 Emergency Sandbox Creation

In addition to the standard refresh schedule, emergency sandbox provisioning is available for:

- **Critical production incident investigation** — Developer Sandbox provisioned within 1 hour upon Incident Commander request
- **UAT extension** — Staging Sandbox refresh extended by 3 days with CAB approval
- **Performance investigation** — Performance Test Sandbox provisioned within 4 hours upon Performance Architect request

**Emergency provisioning procedure:**
1. Request submitted to Platform Engineering via incident management system (PagerDuty or equivalent)
2. Platform Engineering Lead approves (within 30 minutes for P1/P2 requests)
3. Scratch org or sandbox created with appropriate configuration
4. Data seeding executed (synthetic data only for Dev Sandbox; masked production subset for Test/Staging emergency)
5. Access credentials provided to requestor
6. Expiry set to 3 days (no extension without new request)
7. Post-incident: sandbox destroyed and documentation filed

---

## 8. Environment Dashboard

### 8.1 Environment Status Dashboard

A centralized environment status dashboard is maintained on the Project Confluence/Wiki (and mirrored in Salesforce as a custom report) showing the real-time state of all environments.

| Field | Description | Updated |
|-------|-------------|---------|
| Environment Name | Dev / Test / Staging / Performance Test / Production | Real-time |
| Environment Type | Developer / Full Copy / Scratch Org / Production | Real-time |
| Data Contents | Empty / Synthetic / Masked Subset / Full Production | On refresh |
| Last Refresh | Timestamp of last successful refresh | On refresh |
| Next Scheduled Refresh | Timestamp of next scheduled refresh | Weekly review |
| Data Residency Zone Mapping | EU / APAC / Americas / Brazil (per zone) | On refresh |
| PII Masking Status | Applied / Not Applied / Verification Pending | On refresh |
| Active Users | Number of licensed users currently active | Real-time |
| Last Deployment | Timestamp of last successful deployment to this environment | On deployment |
| Deployment Status | Idle / Deploying / Validating / Error | Real-time |
| Health Status | Green / Yellow (degraded) / Red (unavailable) | Real-time |

### 8.2 Environment Health Alerts

| Condition | Alert Severity | Notification Channel | Response SLA |
|-----------|---------------|---------------------|-------------|
| Environment refresh fails | P1 | PagerDuty → Platform Engineering Lead | 30 minutes |
| Environment unavailable for >4 hours | P1 | PagerDuty → Platform Engineering Lead | 4 hours |
| PII masking not applied | P1 | PagerDuty → Security Architect | 1 hour |
| Data residency violation detected | P1 | PagerDuty → Security Architect + Legal | 1 hour |
| Staging Sandbox deployment failure | P2 | Slack #env-alerts | 4 hours |
| Test Sandbox refresh delayed >1 day | P2 | Slack #env-alerts | 1 business day |
| Active users exceed licensed capacity | P3 | Slack #env-alerts | Next business day |

---

## 9. Environment Cost Management

Given the 25% budget reduction constraint, environment costs are actively managed:

| Cost Control Measure | Implementation | Estimated Savings |
|---------------------|---------------|-------------------|
| **Developer Sandboxes as Dev Sandboxes** | Use Developer Sandboxes (free with org) instead of Developer Pro sandboxes | 0% additional cost |
| **Scratch org usage** | Scratch orgs reduce reliance on paid Dev Sandboxes | ~40% reduction in Dev Sandbox provisioning cost |
| **Test Sandbox refresh schedule** | Weekly refresh (no additional cost beyond sandbox license) | N/A |
| **Staging Sandbox bi-weekly refresh** | Bi-weekly instead of weekly reduces compute cost by ~50% | ~30% reduction in Staging cost |
| **Performance Test Sandbox** | Shared Performance Test Sandbox (not dedicated per tester) | ~60% reduction vs. individual performance sandboxes |
| **Scratch org expiry enforcement** | Automatic deletion prevents stale scratch org costs | ~15% reduction in scratch org waste |
| **Data storage optimization** | Test Sandbox at 10% data; Staging at 100% only during UAT windows | ~25% reduction in data storage cost |

---

*End of Environment Strategy*