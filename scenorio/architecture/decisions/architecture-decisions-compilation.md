# Architecture Decisions Compilation
**Global Customer Unification Platform**  
**Version:** 1.0  
**Date:** 2026-07-28  
**Status:** Board Approved with Conditions

---

## 1. Decision Summary

This compilation documents all major architectural decisions for the Global Customer Unification Platform. Each decision has been debated by the Enterprise Salesforce Architecture Council, challenged from business, technical, and implementation perspectives, and approved subject to conditions.

**Total Decisions:** 10  
**Status:** 10 Accepted, 0 Rejected, 0 Deferred  
**Last Updated:** 2026-07-28

---

## 2. Decision Registry

| ID | Decision | Category | Status | Conditions |
|----|----------|----------|--------|------------|
| ADR-001 | Single Org Strategy | Platform Architecture | Accepted | Load testing required before production |
| ADR-002 | Data Cloud as CDP | Data Architecture | Accepted | Legal review in 47 countries required |
| ADR-003 | MuleSoft Integration Backbone | Integration | Accepted | Circuit breakers and retry logic required |
| ADR-004 | Identity Resolution Approach | Identity | Accepted | MDM vendor selection within 60 days |
| ADR-005 | Regional Data Zones | Compliance | Accepted | Field-level compliance tagging required |
| ADR-006 | Big Objects Strategy | Data Architecture | Accepted | Performance monitoring required |
| ADR-007 | Event-Driven Architecture | Platform | Accepted | Dead letter queues required |
| ADR-008 | Experience Cloud for Dealers | User Experience | Accepted | Existing integrations remain untouched |
| ADR-009 | Einstein AI and Agentforce | AI/ML | Accepted | Data quality >95% required before deployment |
| ADR-010 | Salesforce Shield Security | Security | Accepted | Penetration testing required before each track |

---

## 3. Decision Details

### ADR-001: Single Org Strategy

**Context:** 14 acquired companies operate independently with different CRM platforms. The board requires "One Customer. One Vehicle. One Experience." within 18 months.

**Options Considered:**
1. **Single Production Org with BU Segmentation** — CHOSEN
2. Multi-Org with external MDM
3. Hub-and-Spoke with Data Cloud as hub
4. Status quo with integration layer

**Decision:** Adopt a single production Salesforce org with brand-specific business units.

**Consequences:**
- **Positive**: True 360° customer view, reduced integration complexity (~40%), lower operational debt, native Salesforce capabilities
- **Negative**: Higher initial technical risk, requires careful governor limit management, single point of failure (mitigated by DR)
- **Mitigation**: Load testing to 100K concurrent users, async processing, Data Cloud offload for analytics, read-replica org if needed

---

### ADR-002: Data Cloud as CDP

**Context:** No system shares a globally trusted customer identifier across 3 identity providers and 14 brands.

**Options Considered:**
1. **Salesforce Data Cloud** — CHOSEN
2. Third-party CDP (Segment, Treasure Data)
3. Custom identity resolution service
4. External MDM

**Decision:** Use Salesforce Data Cloud as the unified Customer Data Platform.

**Consequences:**
- **Positive**: Native Salesforce integration, real-time unification without data migration, GDPR/CCPA ready, regional data zones
- **Negative**: Identity resolution requires careful configuration, additional licensing cost, learning curve
- **Mitigation**: Pilot with 1 brand, MDM vendor support, identity governance workflows

---

### ADR-003: MuleSoft Integration Backbone

**Context:** 4 ERPs, separate warranty platforms, independent dealer systems, different mobile apps per brand, multiple data warehouses.

**Options Considered:**
1. **MuleSoft Anypoint Platform** — CHOSEN
2. Custom middleware
3. Point-to-point APIs
4. Salesforce Connect only

**Decision:** Deploy MuleSoft as the enterprise service bus.

**Consequences:**
- **Positive**: API-led connectivity, 200+ pre-built connectors, Salesforce-native, reduces integration maintenance ~40%, handles complex legacy integration
- **Negative**: Additional licensing, requires MuleSoft expertise, architecture governance required
- **Mitigation**: SI with MuleSoft expertise, API governance framework, phased connectivity

---

### ADR-004: Identity Resolution Approach

**Context:** Customers are different people in every business unit. No shared identifier across 3 identity providers.

**Options Considered:**
1. **Salesforce Identity + MDM with Identity Bridging** — CHOSEN
2. Data Cloud identity resolution only
3. External MDM only
4. Custom identity resolution service

**Decision:** Implement Salesforce Identity Management + MDM with phased identity bridging strategy.

**Consequences:**
- **Positive**: Solves fundamental unification problem, progressive unification without disruption, manual review workflows for confidence
- **Negative**: Identity resolution complexity, potential false positives, requires governance process
- **Mitigation**: Pilot with highest-volume brand, identity governance workflows, MDM vendor selection within 60 days

---

### ADR-005: Regional Data Zones

**Context:** 47 countries with strict data residency requirements (GDPR, LGPD, APPI, PIPA, etc.).

**Options Considered:**
1. **Data Cloud Regional Data Zones** — CHOSEN
2. Single global data zone with field-level encryption only
3. Regional Salesforce orgs
4. Third-party data residency solution

**Decision:** Implement Data Cloud with regional data zones for data residency compliance.

**Consequences:**
- **Positive**: Addresses residency without data migration, logical unified view, scalable
- **Negative**: Legal review required in all 47 countries, complexity in configuration, cost of multiple regions
- **Mitigation**: Legal engagement during Track 1, field-level compliance tagging, regional data zone template

---

### ADR-006: Big Objects Strategy

**Context:** 68M customers, 125M vehicles, potential 300-500M records. Governor limits and data storage concerns.

**Options Considered:**
1. **Hybrid: Big Objects + External Storage** — CHOSEN
2. All data in standard Salesforce objects
3. All historical data in external storage
4. Archive and delete old data

**Decision:** Use hybrid approach with Big Objects for Salesforce-accessible historical data and external object storage for raw telemetry.

**Consequences:**
- **Positive**: Balanced performance and cost, Salesforce-accessible history, scalable telemetry storage
- **Negative**: Complexity in data management, query performance considerations, additional tooling
- **Mitigation**: Data lifecycle automation, monitoring, clear data classification

---

### ADR-007: Event-Driven Architecture

**Context:** 125M connected vehicles generating telemetry, brand-to-brand communication, async integration needs.

**Options Considered:**
1. **Salesforce Platform Events + MuleSoft Streaming** — CHOSEN
2. Synchronous API-only
3. Batch-only integration
4. Third-party event bus

**Decision:** Implement event-driven architecture using Salesforce Platform Events and MuleSoft.

**Consequences:**
- **Positive**: Decouples systems, enables async processing, real-time capabilities, scales to millions of events
- **Negative**: Event design complexity, debugging challenges, requires monitoring
- **Mitigation**: Event schema governance, dead letter queues, comprehensive monitoring

---

### ADR-008: Experience Cloud for Dealers

**Context:** Existing dealer integrations cannot be modified for 24 months. Dealers need unified customer/vehicle view.

**Options Considered:**
1. **Salesforce Experience Cloud (New Portal)** — CHOSEN
2. Existing dealer systems only
3. Custom mobile app
4. Third-party dealer portal

**Decision:** Deploy new unified dealer portal via Salesforce Experience Cloud.

**Consequences:**
- **Positive**: Unified view across brands, single login, new integrations possible, existing integrations untouched
- **Negative**: Dealer adoption risk, parallel systems during transition, change management required
- **Mitigation**: Dealer advisory board, incentives for early adoption, training, phased rollout

---

### ADR-009: Einstein AI and Agentforce

**Context:** Need to scale support across 92,000 employees, reduce handle time, provide predictive insights.

**Options Considered:**
1. **Einstein AI + Agentforce (Phased)** — CHOSEN
2. Third-party AI platform
3. Custom AI/ML models
4. No AI (manual processes)

**Decision:** Deploy Einstein AI for predictive analytics and Agentforce for service automation with phased rollout.

**Consequences:**
- **Positive**: Scales support, reduces handle time 40%, predictive insights (churn, maintenance, CLV), competitive advantage
- **Negative**: Data quality dependency, licensing cost, change management
- **Mitigation**: Pilot with 1 brand, data quality gates, knowledge base development

---

### ADR-010: Salesforce Shield Security Framework

**Context:** 68M customer records, 47 countries with strict privacy laws, enterprise security requirements.

**Options Considered:**
1. **Salesforce Shield (Platform Encryption, Event Monitoring, Field Audit Trail)** — CHOSEN
2. Standard Salesforce security only
3. Third-party security solution
4. Custom encryption

**Decision:** Implement Salesforce Shield for enterprise-grade security controls.

**Consequences:**
- **Positive**: Native Salesforce integration, comprehensive security controls, compliance ready (GDPR, LGPD, etc.), audit trails
- **Negative**: Additional licensing cost, performance overhead, key management complexity
- **Mitigation**: Performance testing, key rotation policy, security monitoring

---

## 4. Decision Dependencies

| Decision | Depends On | Enables |
|----------|-----------|---------|
| ADR-001 (Single Org) | None | All other decisions |
| ADR-002 (Data Cloud) | ADR-001 | ADR-004, ADR-005, ADR-009 |
| ADR-003 (MuleSoft) | ADR-001 | All integrations |
| ADR-004 (Identity) | ADR-001, ADR-002 | ADR-005, ADR-009 |
| ADR-005 (Data Zones) | ADR-002 | Compliance |
| ADR-006 (Big Objects) | ADR-001 | Scalability |
| ADR-007 (Events) | ADR-001, ADR-003 | Real-time integrations |
| ADR-008 (Experience Cloud) | ADR-001, ADR-003 | Dealer experience |
| ADR-009 (Einstein/Agentforce) | ADR-002, ADR-004 | AI capabilities |
| ADR-010 (Shield) | ADR-001 | Security, compliance |

---

## 5. Decision Timeline

| Decision | Required By | Status |
|----------|-------------|--------|
| ADR-001 | Track 1 Start | Approved |
| ADR-002 | Track 1 Start | Approved |
| ADR-003 | Track 1 Start | Approved |
| ADR-004 | Track 1 Start | Approved (MDM vendor TBD) |
| ADR-005 | Track 1 Start | Approved (Legal review TBD) |
| ADR-006 | Track 1 Start | Approved |
| ADR-007 | Track 1 Start | Approved |
| ADR-008 | Track 2 Start | Approved |
| ADR-009 | Track 2 Start | Approved (Pilot) |
| ADR-010 | Track 1 Start | Approved |

---

## 6. Conditions of Approval

The Architecture Council approved all 10 decisions subject to the following conditions:

1. **MDM Vendor Selection**: Must be completed within 60 days of board approval (ADR-004)
2. **Legal Data Residency Review**: Must be completed in all 47 countries before Track 1 begins (ADR-005)
3. **Executive Sponsorship**: Must be confirmed for each brand before Track 1 begins (ADR-001)
4. **Load Testing**: Must simulate 100,000 concurrent users before production (ADR-001)
5. **Security Testing**: Penetration testing required before each track deployment (ADR-010)
6. **Data Quality Gate**: Identity resolution accuracy must exceed 95% before marketing unification (ADR-002)
7. **Circuit Breakers**: MuleSoft architecture must include circuit breakers and retry logic (ADR-003)
8. **Existing Integrations**: Dealer integrations must remain untouched for 24 months (ADR-008)

**Failure to meet any condition requires re-review by the Architecture Council before proceeding.**

---

## 7. Decision Change Process

All ADRs may be changed through the following process:

1. **Change Request**: Submit written change request to Architecture Council
2. **Impact Analysis**: Assess impact on other decisions, timeline, budget, risk
3. **Council Review**: Architecture Council reviews and debates
4. **Approval**: Council approves or rejects change
5. **Documentation**: Update ADR and all affected documents
6. **Communication**: Notify all stakeholders of change

**No changes to ADRs may be made without Architecture Council approval.**

---

## 8. Traceability to Requirements

| ADR | Business Requirement | Technical Requirement | Compliance Requirement |
|-----|---------------------|----------------------|----------------------|
| ADR-001 | "One Customer" vision | Single org, BU segmentation | N/A |
| ADR-002 | Unified customer view | Identity resolution | GDPR, LGPD, CCPA |
| ADR-003 | System integration | MuleSoft ESB | N/A |
| ADR-004 | No duplicate customers | Identity bridging | Privacy laws |
| ADR-005 | Data residency compliance | Regional zones | 47-country regulations |
| ADR-006 | Scalability to 68M records | Big Objects | N/A |
| ADR-007 | Real-time vehicle data | Platform Events | N/A |
| ADR-008 | Dealer productivity | Experience Cloud | N/A |
| ADR-009 | Operational efficiency | Einstein, Agentforce | N/A |
| ADR-010 | Data protection | Shield, encryption | GDPR, LGPD, etc. |

---

## 9. Lessons Learned (Pre-Implementation)

Based on the architecture debate, the following lessons have been identified:

1. **Identity is foundational**: Cannot unify what cannot be identified. Identity resolution must be Track 1 priority.
2. **Data residency is complex**: 47 countries require individual legal review. Start early.
3. **Phased by brand reduces risk**: Big-bang migration is too risky. Prove model with 1-2 brands first.
4. **Integration debt is real**: Point-to-point integrations create unmaintainable complexity. Invest in MuleSoft.
5. **Change management is 50% of success**: Technology is 50%, people are 50%. Budget accordingly.
6. **Governor limits are manageable**: With proper design (async, Big Objects, Data Cloud), single org works.
7. **Dealers are critical stakeholders**: Their adoption determines success. Engage early.

---

## 10. Next Steps

1. **Board Approval**: Present architecture to board for final approval (Week 1)
2. **SI Selection**: Finalize system integrator contract (Weeks 2-4)
3. **MDM Vendor**: Select identity/MDM vendor (Weeks 2-6)
4. **Legal Review**: Engage legal in all 47 countries (Weeks 2-8)
5. **Track 1 Kickoff**: Begin foundation phase (Week 5)
6. **Architecture Council**: Monthly meetings begin (Week 2)

---

*Compilation approved by: Enterprise Salesforce Architecture Council*  
*All ADRs available in /architecture/decisions/*
