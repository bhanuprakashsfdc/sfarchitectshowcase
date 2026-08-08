# SF Architect Showcase - Comprehensive Scenarios Document

**Generated:** 2026-08-08T06:25:51.396Z
**Project:** Salesforce Architecture Showcase - Global Automotive Manufacturer
**Source Files Scanned:** 151 markdown files
**Total Scenarios Extracted:** 151
**Categories Identified:** 17

---

## Table of Contents

1. [Actions](#actions)
2. [Agentforce Fundamentals](#agentforce-fundamentals)
3. [Agentforce Overview](#agentforce-overview)
4. [Architecture Decisions (ADRs)](#architecture-decisions-(adrs))
5. [Architecture Reports](#architecture-reports)
6. [Atlas Reasoning Engine](#atlas-reasoning-engine)
7. [Business Problem Statement](#business-problem-statement)
8. [Context & Grounding](#context-&-grounding)
9. [Data Cloud](#data-cloud)
10. [Delivery & DevOps](#delivery-&-devops)
11. [Discovery & Requirements](#discovery-&-requirements)
12. [Operations](#operations)
13. [Prompt Builder](#prompt-builder)
14. [RAG & Vector Search](#rag-&-vector-search)
15. [Solution Design](#solution-design)
16. [Topics](#topics)
17. [Trust & Security](#trust-&-security)

---

## Executive Summary

This document consolidates all architectural scenarios, decisions, designs, and operational considerations for the **"One Customer. One Vehicle. One Experience."** transformation initiative. A global automotive manufacturer has acquired six EV companies across North America, Europe, Japan, South Korea, Australia, and Brazil, operating 14 vehicle brands across 47 countries with 68M customers and 125M connected vehicles.

The scenarios are organized by architectural domain to support decision-making, governance, and delivery planning.

---

## Actions {#actions}

**15 scenarios** | Source files: public/agentforce/parts/04-actions/01-flow-actions.md, public/agentforce/parts/04-actions/02-apex-actions.md, public/agentforce/parts/04-actions/03-rest-api-actions.md, public/agentforce/parts/04-actions/04-external-service-actions.md, public/agentforce/parts/04-actions/05-prompt-template-actions.md, public/agentforce/parts/04-actions/06-mulesoft-actions.md, public/agentforce/parts/04-actions/07-composite-actions.md, public/agentforce/parts/04-actions/08-reusable-actions.md, public/agentforce/parts/04-actions/09-transaction-handling.md, public/agentforce/parts/04-actions/10-error-handling.md, public/agentforce/parts/04-actions/11-retry.md, public/agentforce/parts/04-actions/12-idempotency.md, public/agentforce/parts/04-actions/13-security.md, public/agentforce/parts/04-actions/14-performance.md, public/agentforce/parts/04-actions/15-scalability.md

### 1. Part 4 — Actions

**Source:** `public/agentforce/parts/04-actions/01-flow-actions.md`  
**Tags:** `salesforce`, `architecture`, `security`, `ai`, `monitoring`

---

#### Key Sections

- Question 1: What are Flow Actions?

---

### 2. 02 Apex Actions

**Source:** `public/agentforce/parts/04-actions/02-apex-actions.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

Apex Actions allow Agentforce agents to execute custom Apex code as part of the agent's reasoning and execution process. Apex Actions provide the most flexible and powerful Action type, enabling complex business logic, custom integrations, and data transformations that cannot be achieved with Flow A...

#### Key Sections

- Question 2: What are Apex Actions?

---

### 3. 03 Rest Api Actions

**Source:** `public/agentforce/parts/04-actions/03-rest-api-actions.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

REST API Actions allow Agentforce agents to call external REST APIs as part of the agent's reasoning and execution process. REST API Actions enable integration with external systems, third-party services, and custom APIs that are not natively available in Salesforce.

#### Key Sections

- Question 3: What are REST API Actions?

---

### 4. 04 External Service Actions

**Source:** `public/agentforce/parts/04-actions/04-external-service-actions.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

External Service Actions provide a declarative way to integrate external APIs and services into Agentforce agents. Unlike REST API Actions that require manual configuration of endpoints, headers, and authentication, External Service Actions use Salesforce's declarative integration capabilities to si...

#### Key Sections

- Question 4: What are External Service Actions?

---

### 5. 05 Prompt Template Actions

**Source:** `public/agentforce/parts/04-actions/05-prompt-template-actions.md`  
**Tags:** `architecture`, `ai`, `monitoring`, `performance`, `actions`

Prompt Template Actions are a specialized Action type that uses Prompt Templates to generate AI-powered content as part of the agent's execution. Prompt Template Actions are the primary mechanism for generating natural language responses, summaries, recommendations, and other AI-generated content wi...

#### Key Sections

- Question 5: What are Prompt Template Actions?

---

### 6. 06 Mulesoft Actions

**Source:** `public/agentforce/parts/04-actions/06-mulesoft-actions.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

MuleSoft Actions allow Agentforce agents to leverage MuleSoft's integration capabilities to connect with external systems, enterprise applications, and data sources. MuleSoft Actions provide a powerful and flexible way to integrate Agentforce with the broader enterprise ecosystem.

#### Key Sections

- Question 6: What are MuleSoft Actions?

---

### 7. 07 Composite Actions

**Source:** `public/agentforce/parts/04-actions/07-composite-actions.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `monitoring`

Composite Actions are a powerful Action type that allows Agentforce agents to orchestrate multiple Actions into a single, cohesive operation. Composite Actions enable complex multi-step workflows where the output of one Action feeds into the input of the next, all managed as a single unit.

#### Key Sections

- Question 7: What are Composite Actions?

---

### 8. 08 Reusable Actions

**Source:** `public/agentforce/parts/04-actions/08-reusable-actions.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `governance`

Reusable Actions are Actions that are designed to be shared across multiple Topics, agents, and use cases. Reusability reduces duplication, improves consistency, and accelerates development.

#### Key Sections

- Question 8: What are Reusable Actions?

---

### 9. 09 Transaction Handling

**Source:** `public/agentforce/parts/04-actions/09-transaction-handling.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `monitoring`

Transaction management in Agentforce ensures that Action executions are handled reliably, with proper rollback, commit, and error recovery mechanisms. Understanding transaction management is essential for building data-consistent Agentforce implementations.

#### Key Sections

- Question 9: How does Agentforce handle transaction management?

---

### 10. 10 Error Handling

**Source:** `public/agentforce/parts/04-actions/10-error-handling.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `governance`

Error handling in Agentforce Actions is a critical aspect of building reliable, production-grade agents. Proper error handling ensures that the agent can recover from failures gracefully, maintain data consistency, and provide a good user experience even when things go wrong.

#### Key Sections

- Question 10: How does Agentforce handle error handling in Actions?

---

### 11. 11 Retry

**Source:** `public/agentforce/parts/04-actions/11-retry.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `actions`

Retry mechanisms for Actions in Agentforce provide resilience against transient failures by automatically retrying failed Action executions with configurable policies. Retry is a critical component of the error handling strategy.

#### Key Sections

- Question 11: How does Agentforce handle retry for Actions?

---

### 12. 12 Idempotency

**Source:** `public/agentforce/parts/04-actions/12-idempotency.md`  
**Tags:** `architecture`, `integration`, `ai`, `actions`

Idempotency in Agentforce Actions ensures that executing the same Action multiple times with the same inputs produces the same result, without causing unintended side effects. Idempotency is critical for building reliable, data-consistent Agentforce implementations, especially when retry mechanisms ...

#### Key Sections

- Question 12: What is idempotency in Agentforce Actions?

---

### 13. 13 Security

**Source:** `public/agentforce/parts/04-actions/13-security.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

Security in Agentforce Actions is critical for protecting sensitive data, preventing unauthorized access, and ensuring compliance with regulatory requirements. Security must be designed into every Action from the start.

#### Key Sections

- Question 13: How do you secure Agentforce Actions?

---

### 14. 14 Performance

**Source:** `public/agentforce/parts/04-actions/14-performance.md`  
**Tags:** `architecture`, `integration`, `ai`, `performance`, `actions`

Performance optimization for Agentforce Actions is essential for building fast, scalable, and cost-effective agents. Optimizing Action performance directly impacts user experience, cost, and scalability.

#### Key Sections

- Question 14: How do you optimize Action performance?

---

### 15. 15 Scalability

**Source:** `public/agentforce/parts/04-actions/15-scalability.md`  
**Tags:** `architecture`, `integration`, `ai`, `devops`, `monitoring`

Scaling Agentforce Actions is essential for handling increasing conversation volumes, growing data requirements, and expanding integration needs. Scaling must be planned from the beginning and continuously monitored.

#### Key Sections

- Question 15: How do you scale Agentforce Actions?

---

## Agentforce Fundamentals {#agentforce-fundamentals}

**14 scenarios** | Source files: public/agentforce/parts/01-agentforce-fundamentals/01-agentforce-fundamentals.md, public/agentforce/parts/01-agentforce-fundamentals/02-internal-architecture.md, public/agentforce/parts/01-agentforce-fundamentals/03-lifecycle.md, public/agentforce/parts/01-agentforce-fundamentals/04-ai-execution-flow.md, public/agentforce/parts/01-agentforce-fundamentals/05-llm-orchestration.md, public/agentforce/parts/01-agentforce-fundamentals/06-atlas-reasoning.md, public/agentforce/parts/01-agentforce-fundamentals/07-einstein-bots-comparison.md, public/agentforce/parts/01-agentforce-fundamentals/08-capabilities.md, public/agentforce/parts/01-agentforce-fundamentals/09-use-cases.md, public/agentforce/parts/01-agentforce-fundamentals/10-limitations.md, public/agentforce/parts/01-agentforce-fundamentals/11-when-not-to-use.md, public/agentforce/parts/01-agentforce-fundamentals/12-licensing.md, public/agentforce/parts/01-agentforce-fundamentals/13-components.md, public/agentforce/parts/01-agentforce-fundamentals/14-architecture-patterns.md

### 1. Part 1 — Agentforce Fundamentals

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/01-agentforce-fundamentals.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

---

#### Key Sections

- Question 1: What is Agentforce?

---

### 2. 02 Internal Architecture

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/02-internal-architecture.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

Agentforce's internal architecture is composed of several interconnected subsystems that work together to process user requests, reason about intent, execute actions, and return responses. Understanding this architecture is critical for designing scalable, secure, and reliable Agentforce implementat...

#### Key Sections

- Question 2: What is the internal architecture of Agentforce?

---

### 3. 03 Lifecycle

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/03-lifecycle.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

The Agentforce lifecycle describes the end-to-end journey of an AI agent from design through deployment, operation, and eventual retirement. Understanding this lifecycle is essential for building production-grade Agentforce implementations that are maintainable, scalable, and compliant.

#### Key Sections

- Question 3: What is the Agentforce lifecycle?

---

### 4. 04 Ai Execution Flow

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/04-ai-execution-flow.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

The AI execution flow in Agentforce describes the step-by-step process by which an incoming user request is transformed into a response through reasoning, grounding, prompt rendering, LLM inference, and action execution. Understanding this flow is essential for debugging, optimization, and designing...

#### Key Sections

- Question 4: How does the AI execution flow work in Agentforce?

---

### 5. 05 Llm Orchestration

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/05-llm-orchestration.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `devops`

LLM orchestration in Agentforce refers to the systematic management of Large Language Model interactions within the Agentforce platform, including prompt construction, model selection, parameter tuning, response parsing, and integration with the broader agent execution pipeline. It is the mechanism ...

#### Key Sections

- Question 5: What is LLM orchestration in Agentforce?

---

### 6. 06 Atlas Reasoning

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/06-atlas-reasoning.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `agentforce-fundamentals`

Atlas is Salesforce's proprietary reasoning engine that powers Agentforce agents. It is the core intelligence layer that processes incoming requests, understands user intent, selects appropriate Topics, determines the optimal sequence of Actions, and manages the overall execution flow. Atlas goes be...

#### Key Sections

- Question 6: What is the Atlas reasoning engine?

---

### 7. 07 Einstein Bots Comparison

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/07-einstein-bots-comparison.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

Agentforce and Einstein Bots are both Salesforce AI-powered conversational platforms, but they differ fundamentally in architecture, capabilities, and use cases. Einstein Bots is a rule-based dialog automation tool, while Agentforce is a reasoning-based AI agent platform that can dynamically interpr...

#### Key Sections

- Question 7: How does Agentforce differ from Einstein Bots?

---

### 8. 08 Capabilities

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/08-capabilities.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

Agentforce provides a comprehensive set of capabilities that enable organizations to build, deploy, and manage AI-powered autonomous agents at enterprise scale. These capabilities span the full spectrum of agent functionality, from natural language understanding to action execution and observability...

#### Key Sections

- Question 8: What are Agentforce capabilities?

---

### 9. 09 Use Cases

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/09-use-cases.md`  
**Tags:** `architecture`, `data`, `security`, `ai`, `devops`

Agentforce is designed for enterprise-grade AI automation across a wide range of business functions. Its capabilities in reasoning, action execution, grounding, and security make it suitable for complex, high-stakes scenarios where traditional chatbots and rule-based automation fall short.

#### Key Sections

- Question 9: What are the enterprise use cases for Agentforce?

---

### 10. 10 Limitations

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/10-limitations.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

While Agentforce is a powerful platform, it has several limitations that architects must understand when designing solutions. Recognizing these limitations is essential for making informed architectural decisions and setting realistic expectations with stakeholders.

#### Key Sections

- Question 10: What are the limitations of Agentforce?

---

### 11. 11 When Not To Use

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/11-when-not-to-use.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

Agentforce is a powerful AI agent platform, but it is not the right solution for every scenario. Understanding when NOT to use Agentforce is just as important as knowing when to use it. Architects must evaluate each use case against Agentforce's capabilities and limitations to make the right technol...

#### Key Sections

- Question 11: When should you NOT use Agentforce?

---

### 12. 12 Licensing

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/12-licensing.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

Agentforce licensing is a separate Salesforce product license that must be purchased in addition to the base Salesforce license. Understanding licensing is essential for cost planning, ROI justification, and stakeholder communication in enterprise deployments.

#### Key Sections

- Question 12: What is Agentforce licensing?

---

### 13. 13 Components

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/13-components.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

An Agentforce agent is composed of several interconnected components that work together to process user requests, reason about intent, execute actions, and return responses. Each component plays a specific role in the agent's functionality.

#### Key Sections

- Question 13: What are the components of an Agentforce agent?

---

### 14. 14 Architecture Patterns

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/14-architecture-patterns.md`  
**Tags:** `architecture`, `ai`, `devops`, `governance`, `agentforce-fundamentals`

Agentforce supports several architecture patterns that address different enterprise requirements. Understanding these patterns is essential for designing scalable, maintainable, and effective Agentforce solutions.

#### Key Sections

- Question 14: What are the architecture patterns for Agentforce?

---

## Agentforce Overview {#agentforce-overview}

**1 scenarios** | Source files: public/agentforce/README.md

### 1. Salesforce Agentforce Architect Interview Bible

**Source:** `public/agentforce/README.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

The most comprehensive Salesforce Agentforce Architect Interview Guide ever written. Prepared for Principal Architect, Enterprise Architect, AI Architect, and Agentforce Architect interviews at Salesforce, Deloitte, Accenture, PwC, IBM, Capgemini, Cognizant, TCS, Infosys, Slalom, Publicis Sapient, T...

#### Key Sections

- Table of Contents
- How to Use This Guide
- Target Audience
- Prerequisites

---

## Architecture Decisions (ADRs) {#architecture-decisions-(adrs)}

**14 scenarios** | Source files: public/scenorio/architecture/decisions/adr-001-single-org-strategy.md, public/scenorio/architecture/decisions/adr-002-data-cloud-cdp.md, public/scenorio/architecture/decisions/adr-003-mulesoft-integration.md, public/scenorio/architecture/decisions/adr-004-identity-resolution.md, public/scenorio/architecture/decisions/adr-005-regional-data-zones.md, public/scenorio/architecture/decisions/adr-006-big-objects-strategy.md, public/scenorio/architecture/decisions/adr-007-event-driven-architecture.md, public/scenorio/architecture/decisions/adr-009-einstein-agentforce.md, public/scenorio/architecture/decisions/adr-010-shield-security.md, public/scenorio/architecture/decisions/adr-index.md, public/scenorio/architecture/decisions/architecture-decisions-compilation.md, public/scenorio/architecture/delivery/governance-framework.md, public/scenorio/architecture/kt-document.md, public/scenorio/architecture/reports/final-quality-gate.md

### 1. ADR-001: Single Org Strategy

**Source:** `public/scenorio/architecture/decisions/adr-001-single-org-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 2. ADR-002: Data Cloud as CDP

**Source:** `public/scenorio/architecture/decisions/adr-002-data-cloud-cdp.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 3. ADR-003: MuleSoft as Integration Backbone

**Source:** `public/scenorio/architecture/decisions/adr-003-mulesoft-integration.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 4. ADR-004: Identity Resolution Approach

**Source:** `public/scenorio/architecture/decisions/adr-004-identity-resolution.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 5. ADR-005: Regional Data Zones Architecture

**Source:** `public/scenorio/architecture/decisions/adr-005-regional-data-zones.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Zone Configuration
- Related Decisions

---

### 6. ADR-006: Big Objects Strategy for Historical Data

**Source:** `public/scenorio/architecture/decisions/adr-006-big-objects-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 7. ADR-007: Event-Driven Architecture

**Source:** `public/scenorio/architecture/decisions/adr-007-event-driven-architecture.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 8. ADR-009: Einstein AI and Agentforce Deployment

**Source:** `public/scenorio/architecture/decisions/adr-009-einstein-agentforce.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `devops`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 9. ADR-010: Salesforce Shield Security Framework

**Source:** `public/scenorio/architecture/decisions/adr-010-shield-security.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `security`, `ai`

**Status:** Accepted **Date:** 2026-07-28 **Decision Makers:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- Context
- Options Considered
- Decision
- Rationale
- Consequences
- Implementation Notes
- Related Decisions

---

### 10. Architecture Decision Records (ADR) Index

**Source:** `public/scenorio/architecture/decisions/adr-index.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Board Approved ---

#### Key Sections

- Overview
- ADR Registry
- Decision Summary
- Traceability Matrix
- Review Process

---

### 11. Architecture Decisions Compilation

**Source:** `public/scenorio/architecture/decisions/architecture-decisions-compilation.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Board Approved with Conditions ---

#### Key Sections

- 1. Decision Summary
- 2. Decision Registry
- 3. Decision Details
- 4. Decision Dependencies
- 5. Decision Timeline
- 6. Conditions of Approval
- 7. Decision Change Process
- 8. Traceability to Requirements
- 9. Lessons Learned (Pre-Implementation)
- 10. Next Steps

---

### 12. Governance Framework

**Source:** `public/scenorio/architecture/delivery/governance-framework.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Document Version:** 1.0 **Date:** 2026-07-28 **Owner:** Governance Program Lead (Architecture Council) **Classification:** Confidential — Board Approved ---

#### Key Sections

- 1. Purpose and Scope
- 2. Architecture Review Board (ARB) Charter
- 3. Release Governance Process
- 4. Technical Standards
- 5. Change Management Process
- 6. Compliance Audit Framework
- 7. Vendor Management
- 8. Exception Process
- 9. Governance Metrics and Reporting
- 10. Governance Review and Continuous Improvement

---

### 13. Table of Contents

**Source:** `public/scenorio/architecture/kt-document.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

--- title: "Global Customer Unification Platform" subtitle: "Enterprise Salesforce Architecture Knowledge Transfer Document" author: "Enterprise Salesforce Architecture Council" date: "2026-07-28" version: "1.0" classification: "Confidential - Board Approved" --- <!-- PAGE BREAK -->

#### Key Sections

- Section 1: Executive Summary
- Section 2: Business Context & Vision
- Section 3: Current State Assessment
- Section 4: Architecture Principles & Strategy
- Section 5: High-Level Architecture
- Section 6: Detailed Solution Design
- Section 7: Integration Architecture
- Section 8: Data Architecture
- Section 9: Security & Compliance
- Section 10: Deployment & Delivery Strategy

---

### 14. Final Quality Gate Verification

**Source:** `public/scenorio/architecture/reports/final-quality-gate.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** ALL CHECKS PASSED **Verified by:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- 1. Document Completeness Check
- 2. Quality Gate Checks
- 3. Quality Scores Verification
- 4. Traceability Verification
- 5. Critical Issues Resolution
- 6. Final Approval
- 7. Next Steps
- 8. Document Index

---

## Architecture Reports {#architecture-reports}

**3 scenarios** | Source files: public/scenorio/architecture/reports/executive-summary.md, public/scenorio/architecture/reports/salesforce-cloud-analysis.md, public/scenorio/architecture/reports/solution-recommendation.md

### 1. Executive Summary: Global Customer Unification Platform

**Source:** `public/scenorio/architecture/reports/executive-summary.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved ---

#### Key Sections

- 1. Vision & Strategic Alignment
- 2. Current State Assessment
- 3. Recommended Architecture: Federated Multi-Domain Salesforce Platform
- 4. Key Architecture Decisions
- 5. Implementation Strategy: 9-Month Value Track
- 6. Risk Assessment Summary
- 7. Cost Analysis
- 8. Expected Business Benefits
- 9. Governance Model
- 10. Recommendation

---

### 2. Salesforce Cloud Analysis & Recommendations

**Source:** `public/scenorio/architecture/reports/salesforce-cloud-analysis.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Prepared by:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- 1. Evaluation Framework
- 2. Salesforce Product Assessment
- 3. Cloud Recommendations Summary
- 4. Licensing Strategy
- 5. Implementation Priority Matrix
- 6. Technology Roadmap
- 7. Risk-Adjusted Recommendations
- 8. Vendor Consolidation Analysis
- 9. Competitive Advantage Analysis
- 10. Final Recommendation

---

### 3. Solution Recommendation Report

**Source:** `public/scenorio/architecture/reports/solution-recommendation.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Prepared by:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- 1. Executive Recommendation
- 2. Architecture Options Evaluated
- 3. Architecture Comparison Matrix
- 4. Risk-Benefit Analysis
- 5. Cost-Benefit Summary
- 6. Implementation Roadmap
- 7. Alternative Considerations
- 8. Recommendation Summary

---

## Atlas Reasoning Engine {#atlas-reasoning-engine}

**10 scenarios** | Source files: public/agentforce/parts/02-atlas-reasoning/01-how-atlas-works.md, public/agentforce/parts/02-atlas-reasoning/02-intent-recognition.md, public/agentforce/parts/02-atlas-reasoning/03-reasoning.md, public/agentforce/parts/02-atlas-reasoning/04-planning.md, public/agentforce/parts/02-atlas-reasoning/05-tool-selection.md, public/agentforce/parts/02-atlas-reasoning/06-action-selection.md, public/agentforce/parts/02-atlas-reasoning/07-conversation-state.md, public/agentforce/parts/02-atlas-reasoning/08-topic-selection.md, public/agentforce/parts/02-atlas-reasoning/09-failure-handling.md, public/agentforce/parts/02-atlas-reasoning/10-retry-mechanism.md

### 1. Part 2 — Atlas Reasoning Engine

**Source:** `public/agentforce/parts/02-atlas-reasoning/01-how-atlas-works.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `atlas-reasoning-engine`

---

#### Key Sections

- Question 1: How does Atlas work?

---

### 2. 02 Intent Recognition

**Source:** `public/agentforce/parts/02-atlas-reasoning/02-intent-recognition.md`  
**Tags:** `architecture`, `ai`, `devops`, `atlas-reasoning-engine`

Atlas intent recognition is the process by which the Atlas reasoning engine classifies a user's message into one or more predefined intents. This is the first critical step in the Agentforce execution flow, as it determines which Topics are activated and what Actions are considered.

#### Key Sections

- Question 2: How does Atlas handle intent recognition?

---

### 3. 03 Reasoning

**Source:** `public/agentforce/parts/02-atlas-reasoning/03-reasoning.md`  
**Tags:** `architecture`, `security`, `ai`, `monitoring`, `governance`

Atlas reasoning is the process by which the Atlas engine generates a step-by-step logical chain to determine how to handle a user's request. Unlike simple intent matching, Atlas reasoning involves analyzing the request, evaluating available data, considering constraints, and determining the optimal ...

#### Key Sections

- Question 3: How does Atlas reasoning work?

---

### 4. 04 Planning

**Source:** `public/agentforce/parts/02-atlas-reasoning/04-planning.md`  
**Tags:** `architecture`, `integration`, `ai`, `atlas-reasoning-engine`

Atlas planning is the process by which the Atlas engine creates a structured execution plan based on the reasoning chain. The plan specifies which Actions to execute, in what order, with what parameters, and under what conditions. Planning is what transforms Atlas's reasoning into concrete, executab...

#### Key Sections

- Question 4: How does Atlas planning work?

---

### 5. 05 Tool Selection

**Source:** `public/agentforce/parts/02-atlas-reasoning/05-tool-selection.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `atlas-reasoning-engine`

Atlas tool selection is the process by which the Atlas engine selects the appropriate Action (tool) for each step in the execution plan. Tool selection is based on the action's purpose, required parameters, availability, and the current context of the conversation.

#### Key Sections

- Question 5: How does Atlas tool selection work?

---

### 6. 06 Action Selection

**Source:** `public/agentforce/parts/02-atlas-reasoning/06-action-selection.md`  
**Tags:** `architecture`, `integration`, `ai`, `atlas-reasoning-engine`

Atlas action selection is the mechanism by which the Atlas engine determines which specific Action to execute at each step of the reasoning chain. Action selection is a critical component of the Atlas planning process, as it directly impacts the agent's ability to fulfill user requests accurately an...

#### Key Sections

- Question 6: How does Atlas handle action selection?

---

### 7. 07 Conversation State

**Source:** `public/agentforce/parts/02-atlas-reasoning/07-conversation-state.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `atlas-reasoning-engine`

Atlas conversation state management is the mechanism by which the Atlas engine maintains and tracks the state of a conversation across multiple turns. This includes tracking which Topics have been addressed, which Actions have been executed, what information has been gathered, and what the next logi...

#### Key Sections

- Question 7: How does Atlas manage conversation state?

---

### 8. 08 Topic Selection

**Source:** `public/agentforce/parts/02-atlas-reasoning/08-topic-selection.md`  
**Tags:** `architecture`, `ai`, `performance`, `atlas-reasoning-engine`

Atlas topic selection is the process by which the Atlas engine determines which Topic(s) should be activated for a given user request. Topic selection is based on intent recognition, confidence scoring, and Topic configuration, and it is a critical decision point in the Agentforce execution flow.

#### Key Sections

- Question 8: How does Atlas handle topic selection?

---

### 9. 09 Failure Handling

**Source:** `public/agentforce/parts/02-atlas-reasoning/09-failure-handling.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `governance`

Atlas failure handling is the mechanism by which the Atlas engine detects, responds to, and recovers from failures during the reasoning, planning, and execution processes. Robust failure handling is essential for building reliable, production-grade Agentforce agents.

#### Key Sections

- Question 9: How does Atlas handle failure?

---

### 10. 10 Retry Mechanism

**Source:** `public/agentforce/parts/02-atlas-reasoning/10-retry-mechanism.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `atlas-reasoning-engine`

Atlas retry mechanisms provide resilience against transient failures by automatically retrying failed operations with configurable policies. Retry mechanisms are a critical component of Atlas's failure handling strategy, ensuring that temporary issues do not cause permanent failures.

#### Key Sections

- Question 10: How does Atlas handle retry mechanisms?

---

## Business Problem Statement {#business-problem-statement}

**1 scenarios** | Source files: public/scenorio/problem.md

### 1. Problem

**Source:** `public/scenorio/problem.md`  
**Tags:** `architecture`, `integration`, `ai`, `business-problem-statement`

Difficulty Level: Fortune 100 Scale Business Scenario A global automotive manufacturer has acquired six electric vehicle (EV) companies across North America, Europe, Japan, South Korea, Australia, and Brazil over the past three years. Each acquired company operates independently and uses different b...

---

## Context & Grounding {#context-&-grounding}

**10 scenarios** | Source files: public/agentforce/parts/06-context-grounding/01-context-variables.md, public/agentforce/parts/06-context-grounding/02-conversation-context.md, public/agentforce/parts/06-context-grounding/03-session-context.md, public/agentforce/parts/06-context-grounding/04-runtime-context.md, public/agentforce/parts/06-context-grounding/05-salesforce-grounding.md, public/agentforce/parts/06-context-grounding/06-knowledge-grounding.md, public/agentforce/parts/06-context-grounding/07-crm-grounding.md, public/agentforce/parts/06-context-grounding/08-data-cloud-grounding.md, public/agentforce/parts/06-context-grounding/09-flow-apex-grounding.md, public/agentforce/parts/06-context-grounding/10-hallucination-reduction.md

### 1. Part 6 — Context Variables & Grounding

**Source:** `public/agentforce/parts/06-context-grounding/01-context-variables.md`  
**Tags:** `architecture`, `ai`, `context-&-grounding`

---

#### Key Sections

- Question 1: What are Context Variables?

---

### 2. 02 Conversation Context

**Source:** `public/agentforce/parts/06-context-grounding/02-conversation-context.md`  
**Tags:** `architecture`, `ai`, `context-&-grounding`

Conversation context is the information from previous turns in the conversation that provides continuity and relevance to the current interaction. Managing conversation context is essential for building natural, coherent multi-turn conversations.

#### Key Sections

- Question 2: How does conversation context work?

---

### 3. 03 Session Context

**Source:** `public/agentforce/parts/06-context-grounding/03-session-context.md`  
**Tags:** `architecture`, `ai`, `context-&-grounding`

Session context is the information about the current session that provides context to the Agentforce agent. Session context includes session-specific data that persists across conversation turns within the same session.

#### Key Sections

- Question 3: How does session context work?

---

### 4. 04 Runtime Context

**Source:** `public/agentforce/parts/06-context-grounding/04-runtime-context.md`  
**Tags:** `salesforce`, `architecture`, `security`, `ai`, `devops`

Runtime context is the information about the current execution environment that provides context to the Agentforce agent. Runtime context includes data about the system, the environment, and the current execution state.

#### Key Sections

- Question 4: How does runtime context work?

---

### 5. 05 Salesforce Grounding

**Source:** `public/agentforce/parts/06-context-grounding/05-salesforce-grounding.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `performance`, `context-&-grounding`

Salesforce grounding is the process of injecting Salesforce CRM data into the Agentforce prompt to provide the LLM with accurate, real-time information about the customer, their records, and their interactions. Salesforce grounding is the primary grounding mechanism for Agentforce agents.

#### Key Sections

- Question 5: What is Salesforce grounding?

---

### 6. 06 Knowledge Grounding

**Source:** `public/agentforce/parts/06-context-grounding/06-knowledge-grounding.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `governance`

Knowledge grounding is the process of injecting Salesforce Knowledge articles into the Agentforce prompt to provide the LLM with authoritative, up-to-date information. Knowledge grounding enables the agent to answer questions based on the organization's knowledge base.

#### Key Sections

- Question 6: What is Knowledge grounding?

---

### 7. 07 Crm Grounding

**Source:** `public/agentforce/parts/06-context-grounding/07-crm-grounding.md`  
**Tags:** `architecture`, `ai`, `context-&-grounding`

CRM grounding is the process of injecting CRM data into the Agentforce prompt to provide the LLM with context about the customer, their interactions, and their relationship with the organization. CRM grounding is the foundation of personalized, data-driven agent responses.

#### Key Sections

- Question 7: What is CRM grounding?

---

### 8. 08 Data Cloud Grounding

**Source:** `public/agentforce/parts/06-context-grounding/08-data-cloud-grounding.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `context-&-grounding`

Data Cloud grounding is the process of injecting Salesforce Data Cloud data into the Agentforce prompt. Data Cloud provides unified customer profiles, segments, and insights that enable highly personalized and data-driven agent responses.

#### Key Sections

- Question 8: What is Data Cloud grounding?

---

### 9. 09 Flow Apex Grounding

**Source:** `public/agentforce/parts/06-context-grounding/09-flow-apex-grounding.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `performance`

Flow and Apex grounding are mechanisms for injecting data retrieved through Salesforce Flows and Apex code into the Agentforce prompt. These grounding methods enable the agent to access custom data sources and complex data transformations.

#### Key Sections

- Question 9: What are Flow and Apex grounding?

---

### 10. 10 Hallucination Reduction

**Source:** `public/agentforce/parts/06-context-grounding/10-hallucination-reduction.md`  
**Tags:** `architecture`, `data`, `security`, `ai`, `monitoring`

Grounding strategies for hallucination reduction are techniques used to minimize the LLM's tendency to fabricate information. Hallucination is a significant challenge in AI agents, and proper grounding is the primary defense.

#### Key Sections

- Question 10: What are grounding strategies for hallucination reduction?

---

## Data Cloud {#data-cloud}

**14 scenarios** | Source files: public/agentforce/parts/08-data-cloud/01-identity-resolution.md, public/agentforce/parts/08-data-cloud/02-unified-individual.md, public/agentforce/parts/08-data-cloud/03-data-graphs.md, public/agentforce/parts/08-data-cloud/04-data-spaces.md, public/agentforce/parts/08-data-cloud/05-calculated-insights.md, public/agentforce/parts/08-data-cloud/06-streaming-insights.md, public/agentforce/parts/08-data-cloud/07-segments.md, public/agentforce/parts/08-data-cloud/08-data-actions.md, public/agentforce/parts/08-data-cloud/09-zero-copy.md, public/agentforce/parts/08-data-cloud/10-connectors.md, public/agentforce/parts/08-data-cloud/11-data-federation.md, public/agentforce/parts/08-data-cloud/12-data-cloud-grounding.md, public/agentforce/parts/08-data-cloud/13-ai-use-cases.md, public/agentforce/parts/08-data-cloud/14-enterprise-architecture.md

### 1. Part 8 — Salesforce Data Cloud

**Source:** `public/agentforce/parts/08-data-cloud/01-identity-resolution.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `data-cloud`

---

#### Key Sections

- Question 1: What is Identity Resolution in Data Cloud?

---

### 2. 02 Unified Individual

**Source:** `public/agentforce/parts/08-data-cloud/02-unified-individual.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `data-cloud`

A Unified Individual is the central entity in Salesforce Data Cloud that represents a single customer across all data sources. It consolidates all customer data into a single profile, enabling a 360-degree view of the customer.

#### Key Sections

- Question 2: What is a Unified Individual in Data Cloud?

---

### 3. 03 Data Graphs

**Source:** `public/agentforce/parts/08-data-cloud/03-data-graphs.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `data-cloud`

Data Graphs are the relationship networks that connect all data entities in Salesforce Data Cloud. Data Graphs enable the agent to understand the relationships between customers, accounts, orders, products, and other entities.

#### Key Sections

- Question 3: What are Data Graphs in Data Cloud?

---

### 4. 04 Data Spaces

**Source:** `public/agentforce/parts/08-data-cloud/04-data-spaces.md`  
**Tags:** `salesforce`, `architecture`, `data`, `security`, `ai`

Data Spaces are logical containers in Salesforce Data Cloud that organize and isolate data for different purposes, domains, or business units. Data Spaces enable multi-tenant data management within a single Data Cloud instance.

#### Key Sections

- Question 4: What are Data Spaces in Data Cloud?

---

### 5. 05 Calculated Insights

**Source:** `public/agentforce/parts/08-data-cloud/05-calculated-insights.md`  
**Tags:** `architecture`, `data`, `ai`, `data-cloud`

Calculated Insights are computed metrics and predictions generated by Data Cloud from the underlying data. They provide actionable intelligence that agents can use to personalize interactions and make data-driven decisions.

#### Key Sections

- Question 5: What are Calculated Insights in Data Cloud?

---

### 6. 06 Streaming Insights

**Source:** `public/agentforce/parts/08-data-cloud/06-streaming-insights.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `monitoring`

Streaming Insights are real-time analytics generated from streaming data in Salesforce Data Cloud. They enable agents to access up-to-the-minute information for time-sensitive decisions.

#### Key Sections

- Question 6: What are Streaming Insights in Data Cloud?

---

### 7. 07 Segments

**Source:** `public/agentforce/parts/08-data-cloud/07-segments.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `data-cloud`

Segments are groups of customers with similar characteristics or behaviors in Salesforce Data Cloud. Segments enable targeted, personalized interactions in Agentforce agents.

#### Key Sections

- Question 7: What are Segments in Data Cloud?

---

### 8. 08 Data Actions

**Source:** `public/agentforce/parts/08-data-cloud/08-data-actions.md`  
**Tags:** `salesforce`, `architecture`, `data`, `security`, `ai`

Data Actions are operations that manipulate and transform data in Salesforce Data Cloud. They enable the agent to not only read data but also write, update, and delete data as part of the agent's execution.

#### Key Sections

- Question 8: What are Data Actions in Data Cloud?

---

### 9. 09 Zero Copy

**Source:** `public/agentforce/parts/08-data-cloud/09-zero-copy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

Zero Copy is a Data Cloud capability that allows agents to access external data without physically copying it into Salesforce. Zero Copy enables real-time data access while maintaining data governance and security.

#### Key Sections

- Question 9: What is Zero Copy in Data Cloud?

---

### 10. 10 Connectors

**Source:** `public/agentforce/parts/08-data-cloud/10-connectors.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

Data Cloud Connectors are pre-built integrations that enable Data Cloud to connect with external data sources. Connectors simplify the process of ingesting and accessing external data.

#### Key Sections

- Question 10: What are Data Cloud Connectors?

---

### 11. 11 Data Federation

**Source:** `public/agentforce/parts/08-data-cloud/11-data-federation.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

Data Federation is the ability to query and access data across multiple systems as if it were a single unified data source. Data Federation enables Agentforce agents to access and reason about data from diverse systems without moving the data.

#### Key Sections

- Question 11: What is Data Federation in Data Cloud?

---

### 12. 12 Data Cloud Grounding

**Source:** `public/agentforce/parts/08-data-cloud/12-data-cloud-grounding.md`  
**Tags:** `architecture`, `data`, `ai`, `data-cloud`

Data Cloud grounding is the process of injecting Data Cloud data (Unified Individuals, segments, insights) into the Agentforce prompt. Data Cloud grounding provides the agent with a unified, 360-degree view of the customer for personalized, data-driven responses.

#### Key Sections

- Question 12: How does Data Cloud grounding work in Agentforce?

---

### 13. 13 Ai Use Cases

**Source:** `public/agentforce/parts/08-data-cloud/13-ai-use-cases.md`  
**Tags:** `architecture`, `data`, `ai`, `performance`, `data-cloud`

Data Cloud provides several AI use cases that enhance Agentforce agents with data-driven intelligence. These use cases leverage the unified customer profile, segments, insights, and Data Graph.

#### Key Sections

- Question 13: What are AI use cases for Data Cloud?

---

### 14. 14 Enterprise Architecture

**Source:** `public/agentforce/parts/08-data-cloud/14-enterprise-architecture.md`  
**Tags:** `architecture`, `integration`, `data`, `security`, `ai`

Enterprise Data Cloud architecture design involves planning the data model, integration strategy, governance, and scalability for large-scale deployments. A well-designed architecture ensures data quality, security, and performance.

#### Key Sections

- Question 14: How do you design enterprise Data Cloud architecture?

---

## Delivery & DevOps {#delivery-&-devops}

**10 scenarios** | Source files: public/agentforce/parts/05-prompt-builder/15-prompt-cicd.md, public/scenorio/architecture/delivery/ci-cd-strategy.md, public/scenorio/architecture/delivery/deployment-plan.md, public/scenorio/architecture/delivery/devops-strategy.md, public/scenorio/architecture/delivery/environment-strategy.md, public/scenorio/architecture/operations/monitoring-strategy.md, public/scenorio/architecture/operations/operational-excellence.md, public/scenorio/architecture/operations/performance-management.md, public/scenorio/architecture/operations/risk-register.md, public/scenorio/architecture/reports/self-critique-loop.md

### 1. .github/workflows/prompt-template-ci.yml

**Source:** `public/agentforce/parts/05-prompt-builder/15-prompt-cicd.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `devops`

CI/CD for Prompt Templates automates the testing, validation, and deployment of prompt changes, ensuring that Prompt Template updates are reliable, consistent, and safe.

#### Key Sections

- Question 15: How do you implement CI/CD for Prompt Templates?

---

### 2. CI/CD Strategy

**Source:** `public/scenorio/architecture/delivery/ci-cd-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Document Version:** 1.0 **Date:** 2026-07-28 **Owner:** CI/CD Engineering Lead (Architecture Council) **Classification:** Confidential — Board Approved ---

#### Key Sections

- 1. Purpose and Scope
- 2. Pipeline Architecture
- 3. Validation Gates
- 4. Deployment Process
- 5. Rollback Strategy
- 6. Feature Flags
- 7. Release Train Model
- 8. Pipeline Configuration (GitHub Actions)
- 9. CI/CD Metrics and Monitoring

---

### 3. Deployment Plan

**Source:** `public/scenorio/architecture/delivery/deployment-plan.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Document Version:** 1.0 **Date:** 2026-07-28 **Owner:** Release Management Lead (Architecture Council) **Classification:** Confidential — Board Approved ---

#### Key Sections

- 1. Purpose and Scope
- 2. Cutover Strategy — Phased by Brand
- 3. Rollback Procedures
- 4. Communication Plan
- 5. Go-Live Checklist
- 6. Post-Deployment Validation
- 7. Hypercare Period

---

### 4. DevOps Strategy

**Source:** `public/scenorio/architecture/delivery/devops-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Document Version:** 1.0 **Date:** 2026-07-28 **Owner:** Enterprise DevOps Lead (Architecture Council) **Classification:** Confidential — Board Approved ---

#### Key Sections

- 1. Purpose and Scope
- 2. Source Control Strategy
- 3. Code Review Standards
- 4. Static Analysis
- 5. Package Structure and Dependency Management
- 6. Environment Promotion Strategy
- 7. DevOps Tooling Stack
- 8. DevOps Metrics and KPIs
- 9. DevOps Governance

---

### 5. Environment Strategy

**Source:** `public/scenorio/architecture/delivery/environment-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Document Version:** 1.0 **Date:** 2026-07-28 **Owner:** Platform Engineering Lead (Architecture Council) **Classification:** Confidential — Board Approved ---

#### Key Sections

- 1. Purpose and Scope
- 2. Sandbox Tier Strategy
- 3. SIT/UAT Environment Definitions
- 4. Performance Testing Environment
- 5. Scratch Org Usage
- 6. Data Seeding Strategy
- 7. Environment Refresh Schedule
- 8. Environment Dashboard
- 9. Environment Cost Management

---

### 6. Monitoring Strategy

**Source:** `public/scenorio/architecture/operations/monitoring-strategy.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Owner:** Operations Lead, Enterprise Salesforce Architecture Council **Review Cycle:** Quarterly **Next Review:** 2026-10-28 ---

#### Key Sections

- 1. Monitoring Framework
- 2. Logging Strategy
- 3. Metrics Collection
- 4. Dashboard Strategy
- 5. Alerting Strategy
- 6. Synthetic Monitoring
- 7. SLA Monitoring
- 8. Compliance Monitoring
- 9. Cost Monitoring
- 10. Appendix

---

### 7. Operational Excellence Framework

**Source:** `public/scenorio/architecture/operations/operational-excellence.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Owner:** Operations Lead, Enterprise Salesforce Architecture Council **Review Cycle:** Quarterly **Next Review:** 2026-10-28 ---

#### Key Sections

- 1. Framework Overview
- 2. Continuous Improvement Process
- 3. Automation Opportunities
- 4. Cost Optimization
- 5. Knowledge Management
- 6. Incident Post-Mortems
- 7. Service Reviews
- 8. Training and Certification
- 9. Process Metrics
- 10. Continuous Improvement Initiatives

---

### 8. Performance Management Report

**Source:** `public/scenorio/architecture/operations/performance-management.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Owner:** Operations Lead, Enterprise Salesforce Architecture Council **Review Cycle:** Monthly **Next Review:** 2026-08-28 ---

#### Key Sections

- 1. Executive Summary
- 2. SLAs
- 3. Capacity Planning
- 4. Trend Analysis
- 5. Performance Optimization Roadmap
- 6. Benchmarking
- 7. Performance Improvement Initiatives
- 8. Appendix

---

### 9. Risk Register

**Source:** `public/scenorio/architecture/operations/risk-register.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Owner:** Operations Lead, Enterprise Salesforce Architecture Council **Review Cycle:** Monthly **Next Review:** 2026-08-28 ---

#### Key Sections

- Risk Scoring Methodology
- Risk Register
- Risk Heat Map
- Risk Response Summary
- Top 5 Priority Risks

---

### 10. Self-Critique Loop Report

**Source:** `public/scenorio/architecture/reports/self-critique-loop.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Issues Identified, Updates In Progress ---

#### Key Sections

- Critique Methodology
- Round 1: Principal Architect Review
- Round 2: Technical Architect Review
- Round 3: Solution Architect Review
- Round 4: Architecture Board Review
- Final Scores After All Rounds
- Critical Issues Requiring Immediate Action
- Document Updates Made
- Remaining Open Items (Post-Critique)
- Conclusion

---

## Discovery & Requirements {#discovery-&-requirements}

**3 scenarios** | Source files: public/scenorio/architecture/discovery/non-functional-requirements.md, public/scenorio/architecture/discovery/solution-architecture-document.md, public/scenorio/architecture/reports/architecture-debate-transcript.md

### 1. Non-Functional Requirements (NFR)

**Source:** `public/scenorio/architecture/discovery/non-functional-requirements.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Board Approved ---

#### Key Sections

- 1. Availability
- 2. Performance
- 3. Security
- 4. Scalability
- 5. Compliance
- 6. Recovery
- 7. Monitoring
- 8. Capacity Management
- 9. Operational Requirements
- 10. Accessibility

---

### 2. Solution Architecture Document (SAD)

**Source:** `public/scenorio/architecture/discovery/solution-architecture-document.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Board Approved **Prepared by:** Enterprise Salesforce Architecture Council ---

#### Key Sections

- 1. Business Context
- 2. Scope
- 3. Assumptions
- 4. Constraints
- 5. Architecture Overview
- 6. Risks
- 7. Dependencies
- 8. Stakeholder Map
- 9. Glossary

---

### 3. Architecture Debate Transcript

**Source:** `public/scenorio/architecture/reports/architecture-debate-transcript.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Session:** Global Customer Unification Platform — Enterprise Architecture Review **Date:** 2026-07-28 **Participants:** - **PA** — Salesforce Principal Architect (Enterprise Strategy) - **CTA** — Salesforce Technical Architect (Platform & Integration) - **SA** — Enterprise Solution Architect (Impl...

#### Key Sections

- Opening Statements
- Debate Segment 1: Org Strategy — Single vs. Multi-Org
- Debate Segment 2: Data Residency & Regional Constraints
- Debate Segment 3: Integration Strategy
- Debate Segment 4: Identity & Customer Unification
- Debate Segment 5: Scalability & Governor Limits
- Debate Segment 6: Connected Vehicles & IoT
- Debate Segment 7: Agentforce & AI Strategy
- Debate Segment 8: Dealer Strategy & Constraints
- Debate Segment 9: Marketing Cloud & Customer Engagement

---

## Operations {#operations}

**3 scenarios** | Source files: public/agentforce/parts/01-agentforce-fundamentals/15-best-practices.md, public/agentforce/parts/08-data-cloud/15-best-practices.md, public/scenorio/architecture/operations/runbook.md

### 1. 15 Best Practices

**Source:** `public/agentforce/parts/01-agentforce-fundamentals/15-best-practices.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

Following best practices is essential for building reliable, scalable, and secure Agentforce implementations. These practices are drawn from enterprise deployments and reflect the collective experience of Salesforce architects and engineers.

#### Key Sections

- Question 15: What are the best practices for Agentforce?

---

### 2. 15 Best Practices

**Source:** `public/agentforce/parts/08-data-cloud/15-best-practices.md`  
**Tags:** `architecture`, `integration`, `data`, `security`, `ai`

Following best practices for Data Cloud in Agentforce ensures that the agent has access to high-quality, relevant, and timely data for grounding and personalization.

#### Key Sections

- Question 15: What are the best practices for Data Cloud in Agentforce?

---

### 3. Operations Runbook

**Source:** `public/scenorio/architecture/operations/runbook.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Owner:** Operations Lead, Enterprise Salesforce Architecture Council **Classification:** Confidential - Internal Use Only ---

#### Key Sections

- 1. Support Model Overview
- 2. Escalation Matrix
- 3. Incident Management Process
- 4. Change Request Process
- 5. On-Call Rotation
- 6. Common Issue Resolution Guides
- 7. Vendor Support Contacts
- 8. Communication Templates
- 9. Appendix

---

## Prompt Builder {#prompt-builder}

**14 scenarios** | Source files: public/agentforce/parts/05-prompt-builder/01-prompt-builder.md, public/agentforce/parts/05-prompt-builder/02-prompt-templates.md, public/agentforce/parts/05-prompt-builder/03-prompt-inputs-outputs.md, public/agentforce/parts/05-prompt-builder/04-grounding.md, public/agentforce/parts/05-prompt-builder/05-merge-fields-variables.md, public/agentforce/parts/05-prompt-builder/06-record-summaries.md, public/agentforce/parts/05-prompt-builder/07-sales-email-prompts.md, public/agentforce/parts/05-prompt-builder/08-field-generation-prompts.md, public/agentforce/parts/05-prompt-builder/09-flex-prompts.md, public/agentforce/parts/05-prompt-builder/10-custom-prompts.md, public/agentforce/parts/05-prompt-builder/11-prompt-testing.md, public/agentforce/parts/05-prompt-builder/12-prompt-evaluation.md, public/agentforce/parts/05-prompt-builder/13-prompt-versioning.md, public/agentforce/parts/05-prompt-builder/14-prompt-deployment.md

### 1. Part 5 — Prompt Builder & Prompt Templates

**Source:** `public/agentforce/parts/05-prompt-builder/01-prompt-builder.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `performance`

---

#### Key Sections

- Question 1: What is Prompt Builder?

---

### 2. 02 Prompt Templates

**Source:** `public/agentforce/parts/05-prompt-builder/02-prompt-templates.md`  
**Tags:** `architecture`, `ai`, `devops`, `governance`, `prompt-builder`

Prompt Templates are reusable prompt patterns that can be configured once and used across multiple Topics, Actions, and agents. Prompt Templates provide consistency, maintainability, and efficiency in prompt management.

#### Key Sections

- Question 2: What are Prompt Templates?

---

### 3. 03 Prompt Inputs Outputs

**Source:** `public/agentforce/parts/05-prompt-builder/03-prompt-inputs-outputs.md`  
**Tags:** `architecture`, `integration`, `data`, `ai`, `governance`

Prompt Inputs and Outputs define the data flow between the agent's context and the LLM prompt. Inputs are the data that is injected into the prompt, and outputs are the data that is extracted from the LLM's response.

#### Key Sections

- Question 3: What are Prompt Inputs and Outputs?

---

### 4. 04 Grounding

**Source:** `public/agentforce/parts/05-prompt-builder/04-grounding.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `ai`

Grounding in Prompt Templates refers to the process of injecting relevant, external data into the prompt to provide the LLM with accurate, up-to-date information. Grounding is essential for reducing hallucination and ensuring that the agent's responses are based on real data.

#### Key Sections

- Question 4: How does grounding work in Prompt Templates?

---

### 5. 05 Merge Fields Variables

**Source:** `public/agentforce/parts/05-prompt-builder/05-merge-fields-variables.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `prompt-builder`

Merge fields and dynamic variables are placeholders in Prompt Templates that are replaced with actual data at runtime. They enable prompts to be personalized and data-driven.

#### Key Sections

- Question 5: What are merge fields and dynamic variables in Prompt Templates?

---

### 6. 06 Record Summaries

**Source:** `public/agentforce/parts/05-prompt-builder/06-record-summaries.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `performance`, `prompt-builder`

Record summaries in Prompt Templates provide a concise, structured summary of Salesforce records that is injected into the prompt. Record summaries enable the LLM to understand the current state of relevant records without requiring the full record data.

#### Key Sections

- Question 6: What are record summaries in Prompt Templates?

---

### 7. 07 Sales Email Prompts

**Source:** `public/agentforce/parts/05-prompt-builder/07-sales-email-prompts.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `prompt-builder`

Sales email prompts are specialized Prompt Templates designed for generating sales-related email content. They are optimized for sales communication, personalization, and conversion.

#### Key Sections

- Question 7: How do you create sales email prompts?

---

### 8. 08 Field Generation Prompts

**Source:** `public/agentforce/parts/05-prompt-builder/08-field-generation-prompts.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `prompt-builder`

Field generation prompts are specialized Prompt Templates that automatically generate values for Salesforce fields based on input data. They are commonly used for auto-populating fields during record creation or updates.

#### Key Sections

- Question 8: What are field generation prompts?

---

### 9. 09 Flex Prompts

**Source:** `public/agentforce/parts/05-prompt-builder/09-flex-prompts.md`  
**Tags:** `architecture`, `ai`, `performance`, `prompt-builder`

Flex prompts are flexible, configurable Prompt Templates that can be adapted for different use cases without requiring code changes. They provide a dynamic prompt configuration that can be modified at runtime based on context, user input, and business rules.

#### Key Sections

- Question 9: What are Flex prompts?

---

### 10. 10 Custom Prompts

**Source:** `public/agentforce/parts/05-prompt-builder/10-custom-prompts.md`  
**Tags:** `architecture`, `integration`, `security`, `ai`, `monitoring`

Custom prompts are user-defined Prompt Templates that go beyond the standard templates provided by Agentforce. They allow architects to create highly tailored prompts for specific use cases, domains, and business requirements.

#### Key Sections

- Question 10: What are custom prompts?

---

### 11. 11 Prompt Testing

**Source:** `public/agentforce/parts/05-prompt-builder/11-prompt-testing.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `ai`, `monitoring`

Testing Prompt Templates is essential for ensuring quality, accuracy, and reliability of Agentforce agents. Testing should cover functionality, edge cases, and performance.

#### Key Sections

- Question 11: How do you test Prompt Templates?

---

### 12. 12 Prompt Evaluation

**Source:** `public/agentforce/parts/05-prompt-builder/12-prompt-evaluation.md`  
**Tags:** `architecture`, `ai`, `monitoring`, `prompt-builder`

Prompt Template evaluation is the process of measuring the quality, accuracy, and effectiveness of Prompt Templates. Evaluation ensures that Prompt Templates meet the required standards and deliver consistent, high-quality results.

#### Key Sections

- Question 12: How do you evaluate Prompt Templates?

---

### 13. 13 Prompt Versioning

**Source:** `public/agentforce/parts/05-prompt-builder/13-prompt-versioning.md`  
**Tags:** `architecture`, `ai`, `devops`, `prompt-builder`

Versioning Prompt Templates ensures that changes are tracked, reversible, and auditable. Versioning is essential for maintaining quality and enabling rollback when issues arise.

#### Key Sections

- Question 13: How do you version Prompt Templates?

---

### 14. 14 Prompt Deployment

**Source:** `public/agentforce/parts/05-prompt-builder/14-prompt-deployment.md`  
**Tags:** `architecture`, `integration`, `ai`, `devops`, `monitoring`

Deploying Prompt Templates involves moving them from development through testing to production, ensuring that changes are validated and rolled out safely.

#### Key Sections

- Question 14: How do you deploy Prompt Templates?

---

## RAG & Vector Search {#rag-&-vector-search}

**10 scenarios** | Source files: public/agentforce/parts/07-rag-vector-search/01-rag-overview.md, public/agentforce/parts/07-rag-vector-search/02-embeddings.md, public/agentforce/parts/07-rag-vector-search/03-semantic-search.md, public/agentforce/parts/07-rag-vector-search/04-vector-databases.md, public/agentforce/parts/07-rag-vector-search/05-cosine-similarity.md, public/agentforce/parts/07-rag-vector-search/06-chunking.md, public/agentforce/parts/07-rag-vector-search/07-retrieval-strategies.md, public/agentforce/parts/07-rag-vector-search/08-ranking.md, public/agentforce/parts/07-rag-vector-search/09-hybrid-search.md, public/agentforce/parts/07-rag-vector-search/10-enterprise-rag.md

### 1. Part 7 — RAG & Vector Search

**Source:** `public/agentforce/parts/07-rag-vector-search/01-rag-overview.md`  
**Tags:** `architecture`, `ai`, `rag-&-vector-search`

---

#### Key Sections

- Question 1: What is Retrieval-Augmented Generation (RAG)?

---

### 2. 02 Embeddings

**Source:** `public/agentforce/parts/07-rag-vector-search/02-embeddings.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `governance`, `rag-&-vector-search`

Embeddings are numerical representations of text that capture semantic meaning. In RAG, embeddings are used to convert text into vectors that can be compared for similarity, enabling semantic search and retrieval.

#### Key Sections

- Question 2: What are embeddings in RAG?

---

### 3. 03 Semantic Search

**Source:** `public/agentforce/parts/07-rag-vector-search/03-semantic-search.md`  
**Tags:** `architecture`, `ai`, `governance`, `performance`, `rag-&-vector-search`

Semantic search is a retrieval technique that uses vector embeddings to find the most relevant documents or data chunks based on meaning rather than exact keyword matching. Semantic search is a core component of RAG systems.

#### Key Sections

- Question 3: What is semantic search in RAG?

---

### 4. 04 Vector Databases

**Source:** `public/agentforce/parts/07-rag-vector-search/04-vector-databases.md`  
**Tags:** `salesforce`, `architecture`, `data`, `ai`, `governance`

Vector databases are specialized databases designed to store, index, and query vector embeddings efficiently. They are the backbone of RAG systems, enabling fast and accurate similarity search.

#### Key Sections

- Question 4: What are vector databases in RAG?

---

### 5. 05 Cosine Similarity

**Source:** `public/agentforce/parts/07-rag-vector-search/05-cosine-similarity.md`  
**Tags:** `architecture`, `ai`, `performance`, `rag-&-vector-search`

Cosine similarity is a metric used to measure the similarity between two vectors by calculating the cosine of the angle between them. It is the most commonly used similarity metric in RAG systems for vector search and retrieval.

#### Key Sections

- Question 5: What is cosine similarity in RAG?

---

### 6. 06 Chunking

**Source:** `public/agentforce/parts/07-rag-vector-search/06-chunking.md`  
**Tags:** `architecture`, `ai`, `devops`, `governance`, `rag-&-vector-search`

Chunking is the process of splitting large documents into smaller, manageable pieces (chunks) before embedding and storing them in a vector database. Chunking is a critical step in the RAG pipeline that directly impacts retrieval quality.

#### Key Sections

- Question 6: What is chunking in RAG?

---

### 7. 07 Retrieval Strategies

**Source:** `public/agentforce/parts/07-rag-vector-search/07-retrieval-strategies.md`  
**Tags:** `architecture`, `ai`, `governance`, `rag-&-vector-search`

Retrieval strategies define how relevant documents or data chunks are retrieved from the knowledge base during the RAG process. The choice of retrieval strategy directly impacts the quality and relevance of the agent's responses.

#### Key Sections

- Question 7: What are retrieval strategies in RAG?

---

### 8. 08 Ranking

**Source:** `public/agentforce/parts/07-rag-vector-search/08-ranking.md`  
**Tags:** `architecture`, `ai`, `devops`, `governance`, `rag-&-vector-search`

Ranking in RAG is the process of ordering retrieved documents or chunks by relevance to the user's query. Ranking ensures that the most relevant information is presented to the LLM for response generation.

#### Key Sections

- Question 8: What is ranking in RAG?

---

### 9. 09 Hybrid Search

**Source:** `public/agentforce/parts/07-rag-vector-search/09-hybrid-search.md`  
**Tags:** `architecture`, `ai`, `governance`, `rag-&-vector-search`

Hybrid search combines multiple retrieval methods (semantic search and keyword search) to achieve better retrieval quality than either method alone. Hybrid search is a best practice in production RAG systems.

#### Key Sections

- Question 9: What is hybrid search in RAG?

---

### 10. 10 Enterprise Rag

**Source:** `public/agentforce/parts/07-rag-vector-search/10-enterprise-rag.md`  
**Tags:** `architecture`, `integration`, `data`, `security`, `ai`

Enterprise RAG is the application of Retrieval-Augmented Generation in enterprise environments, with additional considerations for scale, security, compliance, and integration with enterprise data systems. Enterprise RAG addresses the unique challenges of deploying RAG in large organizations.

#### Key Sections

- Question 10: What is enterprise RAG?

---

## Solution Design {#solution-design}

**7 scenarios** | Source files: public/scenorio/architecture/design/api-specifications.md, public/scenorio/architecture/design/data-architecture.md, public/scenorio/architecture/design/detailed-solution-design.md, public/scenorio/architecture/design/integration-design.md, public/scenorio/architecture/design/security-architecture.md, public/scenorio/architecture/design/sequence-diagrams.md, public/scenorio/architecture/discovery/high-level-design.md

### 1. 3. API Specifications

**Source:** `public/scenorio/architecture/design/api-specifications.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Executive Overview
- 2. Common Standards
- 3. REST API Specifications
- 4. Security Standards
- 5. Salesforce-Specific Integration Details
- 6. OpenAPI Specification (Customer API v1)
- 7. OpenAPI Supplementals
- 8. Testing Strategy
- 9. Appendix: Quick Reference

---

### 2. 4. Data Architecture Document

**Source:** `public/scenorio/architecture/design/data-architecture.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Executive Overview
- 2. Conceptual Data Model (CDM)
- 3. Logical Data Model (LDM)
- 4. Physical Data Model (PDM) Considerations
- 5. Data Ownership Model
- 6. Data Lifecycle Management
- 7. Data Quality Framework
- 8. Master Data Management (MDM) Strategy
- 9. Data Security and Privacy

---

### 3. 1. Detailed Solution Design

**Source:** `public/scenorio/architecture/design/detailed-solution-design.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Executive Overview
- 2. Salesforce Org Architecture
- 3. Object Model Overview
- 6. Agentforce Agent Design
- 7. Connected Vehicle Architecture
- 8. Subscription & Connected Services Design
- 9. Brand Independence and Transition Strategy
- 10. Disaster Recovery and Business Continuity
- 11. Appendix A: Change Management and Adoption

---

### 4. 2. Integration Design Document

**Source:** `public/scenorio/architecture/design/integration-design.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Executive Overview
- 2. MuleSoft Architecture Overview
- 3. API-Led Connectivity Layers
- 4. Integration Patterns
- 5. Middleware Design
- 6. Retry Strategy
- 7. Error Handling
- 8. Dead Letter Queue (DLQ)
- 9. Connectivity and Security

---

### 5. 5. Security Architecture

**Source:** `public/scenorio/architecture/design/security-architecture.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Executive Overview
- 2. Authentication
- 3. Authorization
- 4. Shield Platform Encryption
- 5. Data Loss Prevention (DLP)
- 6. Encryption in Transit
- 7. Compliance Controls
- 8. Network Security and Segregation
- 9. Application Security

---

### 6. 6. Sequence Diagrams (Mermaid)

**Source:** `public/scenorio/architecture/design/sequence-diagrams.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Version:** 1.0 **Date:** 2026-07-28 **Architecture Review Board:** Enterprise Salesforce Architecture Council **Classification:** Confidential - Board Approved

#### Key Sections

- Global Customer Unification Platform - Fortune 100 Automotive Manufacturer
- 1. Customer Unification Flow
- 2. Dealer Portal Authentication
- 3. Connected Vehicle Telematics Ingestion
- 4. Service Case Escalation
- 5. Marketing Journey with Unified Identity
- 6. Subscriber Consent & Data Residency Flow
- 7. Real-Time Dealer Inventory Sync
- 8. Appendix: Diagram Usage Guide

---

### 7. High Level Design (HLD)

**Source:** `public/scenorio/architecture/discovery/high-level-design.md`  
**Tags:** `salesforce`, `architecture`, `integration`, `data`, `security`

**Global Customer Unification Platform** **Version:** 1.0 **Date:** 2026-07-28 **Status:** Board Approved ---

#### Key Sections

- 1. System Context Diagram
- 2. Capability Model
- 3. Component Model
- 4. Data Flow
- 5. Integration Landscape
- 6. Deployment Topology
- 7. Security Architecture
- 8. Event-Driven Architecture
- 9. Monitoring & Observability
- 10. Disaster Recovery

---

## Topics {#topics}

**10 scenarios** | Source files: public/agentforce/parts/03-topics/01-topic-architecture.md, public/agentforce/parts/03-topics/02-topic-boundaries.md, public/agentforce/parts/03-topics/03-topic-descriptions.md, public/agentforce/parts/03-topics/04-topic-instructions.md, public/agentforce/parts/03-topics/05-entry-exit-criteria.md, public/agentforce/parts/03-topics/06-topic-prioritization.md, public/agentforce/parts/03-topics/07-topic-overlap.md, public/agentforce/parts/03-topics/08-intent-matching.md, public/agentforce/parts/03-topics/09-large-enterprise-topics.md, public/agentforce/parts/03-topics/10-topic-anti-patterns.md

### 1. Part 3 — Topics

**Source:** `public/agentforce/parts/03-topics/01-topic-architecture.md`  
**Tags:** `architecture`, `ai`, `topics`

---

#### Key Sections

- Question 1: What is Topic architecture?

---

### 2. 02 Topic Boundaries

**Source:** `public/agentforce/parts/03-topics/02-topic-boundaries.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `governance`, `topics`

Topic boundaries define the scope and limits of each Topic, ensuring that the agent knows exactly what each Topic covers and when to activate or exit it. Well-defined Topic boundaries are essential for building reliable, predictable Agentforce agents.

#### Key Sections

- Question 2: How do you define Topic boundaries?

---

### 3. 03 Topic Descriptions

**Source:** `public/agentforce/parts/03-topics/03-topic-descriptions.md`  
**Tags:** `architecture`, `ai`, `performance`, `topics`

Topic descriptions are a critical component of Topic configuration that guide the Atlas reasoning engine in understanding what each Topic covers and when to activate it. Well-written Topic descriptions improve intent recognition accuracy and reduce misclassification.

#### Key Sections

- Question 3: How do you write Topic descriptions?

---

### 4. 04 Topic Instructions

**Source:** `public/agentforce/parts/03-topics/04-topic-instructions.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `topics`

Topic instructions are detailed directives that guide the agent's behavior when a Topic is active. They define how the agent should process requests, what actions to take, what responses to generate, and what constraints to follow within the Topic's scope.

#### Key Sections

- Question 4: What are Topic instructions?

---

### 5. 05 Entry Exit Criteria

**Source:** `public/agentforce/parts/03-topics/05-entry-exit-criteria.md`  
**Tags:** `salesforce`, `architecture`, `ai`, `topics`

Topic entry and exit criteria are conditions that determine when a Topic should be activated and when it should be exited. They are essential for controlling the agent's conversation flow and ensuring that Topics are activated and exited at the right times.

#### Key Sections

- Question 5: What are Topic entry and exit criteria?

---

### 6. 06 Topic Prioritization

**Source:** `public/agentforce/parts/03-topics/06-topic-prioritization.md`  
**Tags:** `architecture`, `ai`, `topics`

Topic prioritization is the mechanism by which the Atlas engine determines which Topic to activate when multiple Topics could match a user's request. Proper prioritization ensures that the most relevant Topic is selected, improving the accuracy and relevance of the agent's responses.

#### Key Sections

- Question 6: How do you prioritize Topics?

---

### 7. 07 Topic Overlap

**Source:** `public/agentforce/parts/03-topics/07-topic-overlap.md`  
**Tags:** `architecture`, `ai`, `monitoring`, `topics`

Topic overlap occurs when two or more Topics have overlapping scopes, causing the agent to be uncertain about which Topic to activate. Handling Topic overlap is essential for building reliable, predictable Agentforce agents.

#### Key Sections

- Question 7: How do you handle Topic overlap?

---

### 8. 08 Intent Matching

**Source:** `public/agentforce/parts/03-topics/08-intent-matching.md`  
**Tags:** `architecture`, `ai`, `performance`, `topics`

Atlas intent matching is the process by which the Atlas engine matches a user's message to the appropriate Topic(s) based on the intent expressed in the message. Intent matching is the primary mechanism for Topic selection and is a core capability of the Atlas reasoning engine.

#### Key Sections

- Question 8: How does Atlas intent matching work for Topics?

---

### 9. 09 Large Enterprise Topics

**Source:** `public/agentforce/parts/03-topics/09-large-enterprise-topics.md`  
**Tags:** `architecture`, `integration`, `security`, `ai`, `devops`

Designing Topics for large enterprises requires careful planning, scalability considerations, and governance. Large enterprise deployments typically involve dozens or hundreds of Topics, making design and management a significant architectural challenge.

#### Key Sections

- Question 9: How do you design Topics for large enterprises?

---

### 10. 10 Topic Anti Patterns

**Source:** `public/agentforce/parts/03-topics/10-topic-anti-patterns.md`  
**Tags:** `architecture`, `ai`, `devops`, `monitoring`, `performance`

Topic anti-patterns are common mistakes and design flaws that lead to poor Agentforce agent performance. Recognizing and avoiding these anti-patterns is essential for building reliable, scalable, and maintainable Topic configurations.

#### Key Sections

- Question 10: What are the anti-patterns in Topic design?

---

## Trust & Security {#trust-&-security}

**12 scenarios** | Source files: public/agentforce/parts/09-trust-security/01-trust-layer.md, public/agentforce/parts/09-trust-security/02-zero-data-retention.md, public/agentforce/parts/09-trust-security/03-pii-masking.md, public/agentforce/parts/09-trust-security/04-prompt-injection.md, public/agentforce/parts/09-trust-security/05-jailbreak-defense.md, public/agentforce/parts/09-trust-security/06-data-leakage.md, public/agentforce/parts/09-trust-security/07-prompt-sanitization.md, public/agentforce/parts/09-trust-security/08-content-filtering.md, public/agentforce/parts/09-trust-security/09-audit-logging.md, public/agentforce/parts/09-trust-security/10-compliance.md, public/agentforce/parts/09-trust-security/11-ai-governance.md, public/agentforce/parts/09-trust-security/12-responsible-ai.md

### 1. 01 Trust Layer

**Source:** `public/agentforce/parts/09-trust-security/01-trust-layer.md`  
**Tags:** `salesforce`, `architecture`, `security`, `ai`, `governance`

The Salesforce Trust Layer is a security and compliance framework that wraps every Agentforce interaction, ensuring data protection, privacy, and regulatory compliance throughout the AI execution lifecycle. It is a foundational component that distinguishes Agentforce from generic AI agent platforms....

#### Key Sections

- Question 1: What is the Salesforce Trust Layer?

---

### 2. 02 Zero Data Retention

**Source:** `public/agentforce/parts/09-trust-security/02-zero-data-retention.md`  
**Tags:** `architecture`, `data`, `security`, `ai`, `governance`

Zero Data Retention is a Trust Layer configuration option that ensures no user data is stored after the AI interaction completes. It is a critical privacy feature for agents handling sensitive data.

#### Key Sections

- Question 2: What is Zero Data Retention?

---

### 3. 03 Pii Masking

**Source:** `public/agentforce/parts/09-trust-security/03-pii-masking.md`  
**Tags:** `architecture`, `security`, `ai`, `trust-&-security`

PII masking in Agentforce is the process of detecting and masking personally identifiable information before data is sent to the LLM. PII masking is a critical component of the Trust Layer that protects customer privacy.

#### Key Sections

- Question 3: How does PII masking work in Agentforce?

---

### 4. 04 Prompt Injection

**Source:** `public/agentforce/parts/09-trust-security/04-prompt-injection.md`  
**Tags:** `architecture`, `security`, `ai`, `monitoring`, `trust-&-security`

Prompt injection is a security attack where an attacker manipulates the LLM's prompt to produce unintended or malicious responses. Agentforce provides several mechanisms to detect and prevent prompt injection attacks.

#### Key Sections

- Question 4: What is prompt injection and how does Agentforce prevent it?

---

### 5. 05 Jailbreak Defense

**Source:** `public/agentforce/parts/09-trust-security/05-jailbreak-defense.md`  
**Tags:** `architecture`, `integration`, `ai`, `monitoring`, `trust-&-security`

Jailbreak attacks are attempts to bypass the LLM's safety constraints and get it to produce responses that violate its configured behavior. Agentforce provides multiple layers of defense against jailbreak attacks.

#### Key Sections

- Question 5: What are jailbreak attacks and how does Agentforce defend against them?

---

### 6. 06 Data Leakage

**Source:** `public/agentforce/parts/09-trust-security/06-data-leakage.md`  
**Tags:** `architecture`, `integration`, `security`, `ai`, `devops`

Data leakage in Agentforce occurs when sensitive data is inadvertently exposed to unauthorized users or external systems. Preventing data leakage is a critical security concern for Agentforce deployments.

#### Key Sections

- Question 6: How does Agentforce prevent data leakage?

---

### 7. 07 Prompt Sanitization

**Source:** `public/agentforce/parts/09-trust-security/07-prompt-sanitization.md`  
**Tags:** `architecture`, `integration`, `ai`, `trust-&-security`

Prompt sanitization is the process of cleaning and normalizing user input before it is used in the prompt. Prompt sanitization prevents malicious input from affecting the LLM's behavior and ensures that prompts are safe and effective.

#### Key Sections

- Question 7: What is prompt sanitization in Agentforce?

---

### 8. 08 Content Filtering

**Source:** `public/agentforce/parts/09-trust-security/08-content-filtering.md`  
**Tags:** `architecture`, `security`, `ai`, `monitoring`, `governance`

Content filtering in Agentforce is the process of monitoring and controlling the content that flows through the agent, ensuring that responses are safe, appropriate, and compliant with organizational policies.

#### Key Sections

- Question 8: What is content filtering in Agentforce?

---

### 9. 09 Audit Logging

**Source:** `public/agentforce/parts/09-trust-security/09-audit-logging.md`  
**Tags:** `architecture`, `integration`, `security`, `ai`, `monitoring`

Audit logging in Agentforce captures a complete record of every interaction, action, and decision made by the agent. Audit logging is essential for compliance, debugging, and security monitoring.

#### Key Sections

- Question 9: What is audit logging in Agentforce?

---

### 10. 10 Compliance

**Source:** `public/agentforce/parts/09-trust-security/10-compliance.md`  
**Tags:** `architecture`, `security`, `ai`, `governance`, `trust-&-security`

Compliance in Agentforce ensures that the agent operates within regulatory and organizational requirements. Compliance covers GDPR, HIPAA, SOC2, and other frameworks that govern data handling and AI usage.

#### Key Sections

- Question 10: What is compliance in Agentforce?

---

### 11. 11 Ai Governance

**Source:** `public/agentforce/parts/09-trust-security/11-ai-governance.md`  
**Tags:** `architecture`, `security`, `ai`, `monitoring`, `governance`

AI governance in Agentforce is the framework of policies, processes, and controls that ensure AI agents are developed, deployed, and operated responsibly and ethically. AI governance is essential for enterprise trust and regulatory compliance.

#### Key Sections

- Question 11: What is AI governance in Agentforce?

---

### 12. 12 Responsible Ai

**Source:** `public/agentforce/parts/09-trust-security/12-responsible-ai.md`  
**Tags:** `architecture`, `ai`, `monitoring`, `trust-&-security`

Responsible AI in Agentforce ensures that AI agents are developed and deployed in an ethical, fair, and transparent manner. Responsible AI is a core principle of the Trust Layer.

#### Key Sections

- Question 12: What is responsible AI in Agentforce?

---

## Cross-Cutting Concerns

### Data Residency & Sovereignty
- Multiple countries with strict data residency requirements
- Regional data zones strategy (ADR-005)
- Zero-copy data access patterns

### Acquisition Readiness
- Architecture must accommodate 2+ additional EV manufacturers
- Single org strategy with extensible data model (ADR-001)
- Event-driven architecture for loose coupling (ADR-007)

### Cost Optimization
- 25% reduction in annual technology spending
- Consolidation of 4 ERP ecosystems, 3 identity providers
- Shared services and platform approach

### Business Continuity
- Zero-downtime transformation requirement
- Independent operations during transition (legal constraint)
- Dealer integration freeze for 2 years

---

## Appendix: Source File Inventory

| Category | File | Scenarios |
|----------|------|-----------|
| Actions | public/agentforce/parts/04-actions/01-flow-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/02-apex-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/03-rest-api-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/04-external-service-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/05-prompt-template-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/06-mulesoft-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/07-composite-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/08-reusable-actions.md | 1 |
| Actions | public/agentforce/parts/04-actions/09-transaction-handling.md | 1 |
| Actions | public/agentforce/parts/04-actions/10-error-handling.md | 1 |
| Actions | public/agentforce/parts/04-actions/11-retry.md | 1 |
| Actions | public/agentforce/parts/04-actions/12-idempotency.md | 1 |
| Actions | public/agentforce/parts/04-actions/13-security.md | 1 |
| Actions | public/agentforce/parts/04-actions/14-performance.md | 1 |
| Actions | public/agentforce/parts/04-actions/15-scalability.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/01-agentforce-fundamentals.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/02-internal-architecture.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/03-lifecycle.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/04-ai-execution-flow.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/05-llm-orchestration.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/06-atlas-reasoning.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/07-einstein-bots-comparison.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/08-capabilities.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/09-use-cases.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/10-limitations.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/11-when-not-to-use.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/12-licensing.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/13-components.md | 1 |
| Agentforce Fundamentals | public/agentforce/parts/01-agentforce-fundamentals/14-architecture-patterns.md | 1 |
| Agentforce Overview | public/agentforce/README.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-001-single-org-strategy.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-002-data-cloud-cdp.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-003-mulesoft-integration.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-004-identity-resolution.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-005-regional-data-zones.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-006-big-objects-strategy.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-007-event-driven-architecture.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-009-einstein-agentforce.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-010-shield-security.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/adr-index.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/decisions/architecture-decisions-compilation.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/delivery/governance-framework.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/kt-document.md | 1 |
| Architecture Decisions (ADRs) | public/scenorio/architecture/reports/final-quality-gate.md | 1 |
| Architecture Reports | public/scenorio/architecture/reports/executive-summary.md | 1 |
| Architecture Reports | public/scenorio/architecture/reports/salesforce-cloud-analysis.md | 1 |
| Architecture Reports | public/scenorio/architecture/reports/solution-recommendation.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/01-how-atlas-works.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/02-intent-recognition.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/03-reasoning.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/04-planning.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/05-tool-selection.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/06-action-selection.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/07-conversation-state.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/08-topic-selection.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/09-failure-handling.md | 1 |
| Atlas Reasoning Engine | public/agentforce/parts/02-atlas-reasoning/10-retry-mechanism.md | 1 |
| Business Problem Statement | public/scenorio/problem.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/01-context-variables.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/02-conversation-context.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/03-session-context.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/04-runtime-context.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/05-salesforce-grounding.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/06-knowledge-grounding.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/07-crm-grounding.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/08-data-cloud-grounding.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/09-flow-apex-grounding.md | 1 |
| Context & Grounding | public/agentforce/parts/06-context-grounding/10-hallucination-reduction.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/01-identity-resolution.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/02-unified-individual.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/03-data-graphs.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/04-data-spaces.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/05-calculated-insights.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/06-streaming-insights.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/07-segments.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/08-data-actions.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/09-zero-copy.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/10-connectors.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/11-data-federation.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/12-data-cloud-grounding.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/13-ai-use-cases.md | 1 |
| Data Cloud | public/agentforce/parts/08-data-cloud/14-enterprise-architecture.md | 1 |
| Delivery & DevOps | public/agentforce/parts/05-prompt-builder/15-prompt-cicd.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/delivery/ci-cd-strategy.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/delivery/deployment-plan.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/delivery/devops-strategy.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/delivery/environment-strategy.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/operations/monitoring-strategy.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/operations/operational-excellence.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/operations/performance-management.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/operations/risk-register.md | 1 |
| Delivery & DevOps | public/scenorio/architecture/reports/self-critique-loop.md | 1 |
| Discovery & Requirements | public/scenorio/architecture/discovery/non-functional-requirements.md | 1 |
| Discovery & Requirements | public/scenorio/architecture/discovery/solution-architecture-document.md | 1 |
| Discovery & Requirements | public/scenorio/architecture/reports/architecture-debate-transcript.md | 1 |
| Operations | public/agentforce/parts/01-agentforce-fundamentals/15-best-practices.md | 1 |
| Operations | public/agentforce/parts/08-data-cloud/15-best-practices.md | 1 |
| Operations | public/scenorio/architecture/operations/runbook.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/01-prompt-builder.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/02-prompt-templates.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/03-prompt-inputs-outputs.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/04-grounding.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/05-merge-fields-variables.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/06-record-summaries.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/07-sales-email-prompts.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/08-field-generation-prompts.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/09-flex-prompts.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/10-custom-prompts.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/11-prompt-testing.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/12-prompt-evaluation.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/13-prompt-versioning.md | 1 |
| Prompt Builder | public/agentforce/parts/05-prompt-builder/14-prompt-deployment.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/01-rag-overview.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/02-embeddings.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/03-semantic-search.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/04-vector-databases.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/05-cosine-similarity.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/06-chunking.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/07-retrieval-strategies.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/08-ranking.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/09-hybrid-search.md | 1 |
| RAG & Vector Search | public/agentforce/parts/07-rag-vector-search/10-enterprise-rag.md | 1 |
| Solution Design | public/scenorio/architecture/design/api-specifications.md | 1 |
| Solution Design | public/scenorio/architecture/design/data-architecture.md | 1 |
| Solution Design | public/scenorio/architecture/design/detailed-solution-design.md | 1 |
| Solution Design | public/scenorio/architecture/design/integration-design.md | 1 |
| Solution Design | public/scenorio/architecture/design/security-architecture.md | 1 |
| Solution Design | public/scenorio/architecture/design/sequence-diagrams.md | 1 |
| Solution Design | public/scenorio/architecture/discovery/high-level-design.md | 1 |
| Topics | public/agentforce/parts/03-topics/01-topic-architecture.md | 1 |
| Topics | public/agentforce/parts/03-topics/02-topic-boundaries.md | 1 |
| Topics | public/agentforce/parts/03-topics/03-topic-descriptions.md | 1 |
| Topics | public/agentforce/parts/03-topics/04-topic-instructions.md | 1 |
| Topics | public/agentforce/parts/03-topics/05-entry-exit-criteria.md | 1 |
| Topics | public/agentforce/parts/03-topics/06-topic-prioritization.md | 1 |
| Topics | public/agentforce/parts/03-topics/07-topic-overlap.md | 1 |
| Topics | public/agentforce/parts/03-topics/08-intent-matching.md | 1 |
| Topics | public/agentforce/parts/03-topics/09-large-enterprise-topics.md | 1 |
| Topics | public/agentforce/parts/03-topics/10-topic-anti-patterns.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/01-trust-layer.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/02-zero-data-retention.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/03-pii-masking.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/04-prompt-injection.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/05-jailbreak-defense.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/06-data-leakage.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/07-prompt-sanitization.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/08-content-filtering.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/09-audit-logging.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/10-compliance.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/11-ai-governance.md | 1 |
| Trust & Security | public/agentforce/parts/09-trust-security/12-responsible-ai.md | 1 |

---

*Document generated by SF Architect Showcase Scenario Scanner*
*For architectural review and governance purposes*
