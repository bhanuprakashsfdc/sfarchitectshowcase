# Architecture Decision Records (ADR) Index
**Global Customer Unification Platform**
**Version:** 1.0
**Date:** 2026-07-28
**Status:** Board Approved

---

## Overview

This index contains all Architecture Decision Records (ADRs) for the Global Customer Unification Platform. Each ADR documents a significant architectural decision, including context, options considered, decision rationale, and consequences.

## ADR Registry

| ID | Title | Status | Date | Decision Makers |
|----|-------|--------|------|-----------------|
| [ADR-001](adr-001-single-org-strategy.md) | Single Org Strategy | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-002](adr-002-data-cloud-cdp.md) | Data Cloud as CDP | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-003](adr-003-mulesoft-integration.md) | MuleSoft as Integration Backbone | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-004](adr-004-identity-resolution.md) | Identity Resolution Approach | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-005](adr-005-regional-data-zones.md) | Regional Data Zones Architecture | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-006](adr-006-big-objects-strategy.md) | Big Objects Strategy for Historical Data | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-007](adr-007-event-driven-architecture.md) | Event-Driven Architecture | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-008](adr-008-experience-cloud-dealers.md) | Experience Cloud for Unified Dealer Portal | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-009](adr-009-einstein-agentforce.md) | Einstein AI and Agentforce Deployment | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |
| [ADR-010](adr-010-shield-security.md) | Salesforce Shield Security Framework | Accepted | 2026-07-28 | Enterprise Salesforce Architecture Council |

## Decision Summary

### ADR-001: Single Org Strategy
**Decision:** Adopt a single production Salesforce org with brand-specific business units (BU segmentation).

**Rationale:** Enables true 360° customer view, reduces integration complexity by ~40%, lowers operational debt, and directly supports the "One Customer" vision. Multi-org with external MDM creates latency, complexity, and higher long-term cost.

### ADR-002: Data Cloud as CDP
**Decision:** Use Salesforce Data Cloud as the unified Customer Data Platform.

**Rationale:** Native Salesforce integration enables real-time unification without data migration, GDPR/CCPA ready, and eliminates need for third-party CDP licensing. Regional data zones address data residency requirements.

### ADR-003: MuleSoft as Integration Backbone
**Decision:** Deploy MuleSoft Anypoint Platform as the enterprise service bus.

**Rationale:** Salesforce-native integration, API-led connectivity pattern, handles complex legacy system integration, and provides event streaming capabilities. Reduces integration maintenance by ~40% compared to point-to-point APIs.

### ADR-004: Identity Resolution Approach
**Decision:** Implement Salesforce Identity Management + MDM with identity bridging strategy.

**Rationale:** Solves the fundamental problem of no shared customer identifier across 3 identity providers and 14 brands. Phased approach enables progressive unification without disrupting existing customer relationships.

### ADR-005: Regional Data Zones
**Decision:** Implement Data Cloud with regional data zones for data residency compliance.

**Rationale:** Addresses data residency requirements in 47 countries without requiring data migration. Logical unified view through identity resolution while physical data remains in regional zones.

### ADR-006: Big Objects Strategy
**Decision:** Use hybrid approach with Big Objects for historical data and external storage for raw telemetry.

**Rationale:** Balances performance and cost. Big Objects provide Salesforce-accessible historical data, while external object storage handles raw vehicle telemetry at petabyte scale.

### ADR-007: Event-Driven Architecture
**Decision:** Implement event-driven architecture using Salesforce Platform Events and MuleSoft streaming.

**Rationale:** Decouples acquired companies, enables async processing, reduces synchronous coupling, and supports real-time integration patterns for connected vehicles and brand-to-brand communication.

### ADR-008: Experience Cloud for Dealers
**Decision:** Deploy new unified dealer portal via Salesforce Experience Cloud.

**Rationale:** Provides unified customer/vehicle view for multi-brand dealers, runs parallel to existing integrations (respecting 24-month lock), and enables future dealer migration. Existing dealer integrations remain untouched.

### ADR-009: Einstein AI and Agentforce
**Decision:** Deploy Einstein AI for predictive analytics and Agentforce for service automation.

**Rationale:** Scales support across 92,000 employees, reduces handle time by 40%, and provides predictive insights for maintenance, churn, and CLV. Phased deployment ensures data quality before broad rollout.

### ADR-010: Salesforce Shield Security Framework
**Decision:** Implement Salesforce Shield for encryption, event monitoring, and field audit trail.

**Rationale:** Provides enterprise-grade security controls required for 68M customer records, compliance with GDPR/LGPD/APPI/PIPA, and protection against data breaches. Native Salesforce integration reduces complexity.

## Traceability Matrix

| ADR | Related Requirements | Related Components | Related Risks |
|-----|---------------------|-------------------|---------------|
| ADR-001 | SAD Section 5, HLD Section 3 | Salesforce Org, BU Segmentation | R-003, R-014 |
| ADR-002 | SAD Section 5.1, HLD Section 3.1.3 | Data Cloud, CDP | R-001, R-010 |
| ADR-003 | SAD Section 5.1, HLD Section 3.1.4 | MuleSoft, API Layer | R-005, R-009 |
| ADR-004 | SAD Section 5.1, HLD Section 3.1.1 | Identity Foundation, MDM | R-001, R-008 |
| ADR-005 | SAD Section 5.1, HLD Section 3.1.3 | Data Cloud Zones | R-002, R-010 |
| ADR-006 | SAD Section 5.1, HLD Section 3.1.2 | Big Objects, Archive | R-003, R-014 |
| ADR-007 | SAD Section 5.1, HLD Section 8 | Platform Events, MQ | R-003, R-005 |
| ADR-008 | SAD Section 5.1, HLD Section 3.1.2 | Experience Cloud, Dealer Portal | R-012, R-004 |
| ADR-009 | SAD Section 5.1, HLD Section 3.1.2 | Einstein, Agentforce | R-004, R-013 |
| ADR-010 | SAD Section 5.1, HLD Section 7 | Shield, Encryption | R-002, R-006 |

## Review Process

All ADRs are reviewed and approved by the Enterprise Salesforce Architecture Council. Changes to ADRs require:
1. Submission of change request
2. Review by Architecture Council
3. Update of affected documentation
4. Communication to stakeholders

---

*Index maintained by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
