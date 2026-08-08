# ADR-009: Einstein AI and Agentforce Deployment
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization has 92,000 employees across 9 regional contact centers and needs to scale service delivery, improve customer experience, and gain predictive insights. The CTO has directed evaluation of Agentforce for service automation. We need an AI strategy that delivers measurable value while operating within the 9-month value track and 18-month timeline.

We must choose between:
1. **Einstein + Agentforce Full Deployment** — comprehensive AI across all clouds
2. **Einstein Only** — predictive analytics without AI agents
3. **Agentforce Only** — service automation without predictive analytics
4. **Phased AI** — minimal initial AI, expand after data unification

## Options Considered

### Option A: Einstein + Agentforce Full Deployment (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Predictive Analytics** | Einstein Prediction Builder for CLV, churn, maintenance |
| **Service Automation** | Agentforce for routine inquiries, 40% handle time reduction |
| **Deployment** | Phased by capability |
| **Data Requirement** | Progressive — works on individual brand data initially |
| **Timeline** | Track 3 (Months 7-9) for core, Track 4 (Months 10-18) for advanced |

### Option B: Einstein Only
| Aspect | Details |
|--------|---------|
| **Predictive Analytics** | Einstein Prediction Builder |
| **Service Automation** | None |
| **Deployment** | Track 3 |
| **Data Requirement** | Individual brand data sufficient |
| **Timeline** | Months 7-9 |

### Option C: Agentforce Only
| Aspect | Details |
|--------|---------|
| **Predictive Analytics** | None |
| **Service Automation** | Agentforce agents |
| **Deployment** | Track 3 |
| **Data Requirement** | Requires unified data for effectiveness |
| **Timeline** | Months 7-9 |

### Option D: Phased AI
| Aspect | Details |
|--------|---------|
| **Predictive Analytics** | Minimal initial, expand after unification |
| **Service Automation** | Pilot only |
| **Deployment** | Track 4+ |
| **Data Requirement** | Requires unified data |
| **Timeline** | Months 13-18 |

## Decision

**ACCEPTED: Option A — Einstein + Agentforce Full Deployment**

## Rationale

1. **Scale Requirement**: 92,000 employees across 9 contact centers cannot scale without AI. Agentforce is essential for handling routine inquiries at scale.

2. **Predictive Value**: Einstein predictions (CLV, churn, maintenance) deliver value even with individual brand data. Does not require perfect unification.

3. **Service Transformation**: Agentforce transforms customer service from reactive to proactive. Critical for the "One Experience" vision.

4. **Phased Deployment**: Einstein predictions can be deployed early (Track 3) on individual brand data. Agentforce pilots in Track 3, expands in Track 4 after data unification.

5. **Data Cloud Foundation**: Einstein and Agentforce both leverage Data Cloud. Data Cloud maturity drives AI effectiveness.

6. **Competitive Necessity**: AI is table stakes in automotive customer experience. Delaying AI deployment puts the organization behind competitors.

7. **Measurable ROI**: 40% handle time reduction, 25% conversion lift, 20% maintenance cost reduction — all quantifiable within 18 months.

## Consequences

### Positive
- 40% reduction in service handle time
- 25% improvement in conversion through recommendations
- 20% reduction in maintenance costs through predictions
- Scalable support across 92,000 employees
- Proactive service (recalls, maintenance alerts)
- Competitive differentiation

### Negative
- Requires Data Cloud maturity for full effectiveness
- Agentforce requires training on unified data
- Change management for AI-assisted workflows
- Initial accuracy may be low for cross-brand predictions

### Risks
- **R-004**: Brand resistance to AI — mitigated by transparency, human-in-the-loop
- **R-013**: Change fatigue — mitigated by phased rollout, training
- **R-011**: Skill gaps — mitigated by SI training, Salesforce enablement

## Implementation Notes

### Deployment Phases

| Phase | Timeline | Capability | Data Source | Value |
|-------|----------|-----------|-------------|-------|
| **Pilot** | Months 1-3 | Einstein predictions on 1 brand | Brand-specific data | Prove model |
| **Track 3** | Months 7-9 | Einstein across 3 brands, Agentforce pilot | Individual brand data | 25% handle time reduction |
| **Track 4** | Months 10-18 | Full Einstein + Agentforce | Unified data | 40% handle time reduction |

### Einstein Use Cases

| Use Case | Model | Data Source | Value |
|----------|-------|-------------|-------|
| **CLV Scoring** | Prediction Builder | Customer + transaction data | Prioritize high-value customers |
| **Churn Prediction** | Prediction Builder | Service + interaction data | Proactive retention |
| **Maintenance Prediction** | Einstein for Sales/Service | Vehicle telemetry + history | Reduce downtime |
| **Fraud Detection** | Prediction Builder | Warranty + service data | Reduce fraud |
| **Next Best Action** | Einstein Next Best Action | Unified customer profile | Cross-sell/upsell |

### Agentforce Agents

| Agent | Purpose | Trigger | Value |
|-------|---------|---------|-------|
| **Service Agent** | Handle routine inquiries | Customer contact | 40% handle time reduction |
| **Sales Agent** | Assist dealers with customer needs | Dealer request | 25% conversion lift |
| **Field Service Agent** | Coordinate roadside assistance | Vehicle alert | Faster response |
| **Recall Agent** | Automate recall notifications | Recall trigger | 100% automation |

## Related Decisions

- ADR-001: Single Org Strategy (AI within single org)
- ADR-002: Data Cloud as CDP (Einstein/Agentforce data source)
- ADR-007: Event-Driven Architecture (event-driven AI triggers)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
