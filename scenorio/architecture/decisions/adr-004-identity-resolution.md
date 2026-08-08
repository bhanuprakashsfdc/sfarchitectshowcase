# ADR-004: Identity Resolution Approach
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The fundamental problem: customers are different people in every business unit. We have 3 identity providers and zero shared customer identifier across 14 brands. Without solving identity, unification is impossible. The board's "One Customer" vision requires a unified customer identity that links all customer records across brands.

We must choose between:
1. **Salesforce Identity + MDM** — native identity management with master data management
2. **Data Cloud Identity Resolution** — CDP-based identity resolution
3. **Custom Identity Resolution Service** — purpose-built identity engine
4. **Third-Party MDM** (Informatica, MuleSoft MDM) — enterprise MDM solutions

## Options Considered

### Option A: Salesforce Identity + MDM (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Identity Management** | Salesforce Identity + SSO |
| **Resolution** | MDM engine with graph-based matching |
| **SSO** | SAML 2.0, unified login |
| **Governance** | Manual review workflows for low-confidence |
| **Bridging** | Identity bridge to legacy systems |
| **Cost** | Included in Salesforce licensing |

### Option B: Data Cloud Identity Resolution
| Aspect | Details |
|--------|---------|
| **Identity Management** | External identity provider |
| **Resolution** | Data Cloud graph API |
| **SSO** | Requires separate solution |
| **Governance** | Limited governance features |
| **Bridging** | Custom development required |
| **Cost** | Data Cloud licensing only |

### Option C: Custom Identity Resolution Service
| Aspect | Details |
|--------|---------|
| **Identity Management** | Custom implementation |
| **Resolution** | Custom matching algorithms |
| **SSO** | Custom or third-party |
| **Governance** | Custom development |
| **Bridging** | Custom development |
| **Cost** | Highest (development + maintenance) |

### Option D: Third-Party MDM
| Aspect | Details |
|--------|---------|
| **Identity Management** | External MDM + identity provider |
| **Resolution** | Enterprise MDM features |
| **SSO** | Requires separate solution |
| **Governance** | Full MDM governance |
| **Bridging** | Vendor-provided |
| **Cost** | High (MDM licensing + integration) |

## Decision

**ACCEPTED: Option A — Salesforce Identity + MDM**

## Rationale

1. **Foundation for Unification**: Identity is the prerequisite for all other capabilities. Cannot unify what cannot be identified.

2. **Native Integration**: Salesforce Identity integrates natively with all Salesforce clouds. MDM integrates with Data Cloud for unified profiles.

3. **SSO Capability**: Unified login for 92,000 employees and 11,500 dealers. Reduces password fatigue and support costs.

4. **Identity Bridge**: Temporary identity resolution service connects legacy systems during transition, enabling progressive migration without disruption.

5. **Phased Approach**: Identity bridge enables incremental migration. Legacy IDs remain valid during transition, unified ID becomes primary over time.

6. **Governance**: Manual review workflows for low-confidence matches ensure data quality. Business users validate identity matches, not just algorithms.

7. **Cost Efficiency**: Included in Salesforce enterprise licensing. Eliminates third-party MDM licensing.

8. **Future-Proof**: Identity foundation supports future acquisitions. New brand customers merge into unified identity seamlessly.

## Consequences

### Positive
- Solves fundamental identity fragmentation problem
- Enables progressive unification without disrupting existing relationships
- Unified login reduces support costs
- Identity bridge enables parallel operation during transition
- Supports future acquisitions
- Native Salesforce integration reduces complexity

### Negative
- MDM implementation complexity at 68M scale
- Identity resolution accuracy requires tuning
- Manual review workflows add operational overhead
- Identity bridge requires ongoing maintenance during transition

### Risks
- **R-001**: Identity resolution failure — mitigated by pilot, MDM vendor selection, manual review
- **R-008**: Data quality issues — mitigated by data quality framework
- **R-013**: Change fatigue — mitigated by phased rollout

## Implementation Notes

- MDM vendor selection within 60 days (Options: Informatica, MuleSoft MDM, custom)
- Identity resolution rules: email (40% weight), phone (30%), address (20%), VIN (10%)
- Confidence scoring: high (auto-match), medium (auto-match with notification), low (manual review)
- Identity bridge: temporary service mapping legacy IDs to unified ID
- Survivorship rules: most recent, most complete, most trusted source
- Identity governance workflow for manual validation of low-confidence matches

## Related Decisions

- ADR-001: Single Org Strategy (unified identity within single org)
- ADR-002: Data Cloud as CDP (identity resolution in Data Cloud)
- ADR-007: Event-Driven Architecture (identity events via Platform Events)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
