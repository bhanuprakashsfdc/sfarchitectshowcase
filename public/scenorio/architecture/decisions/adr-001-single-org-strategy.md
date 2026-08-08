# ADR-001: Single Org Strategy
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization operates 14 independent vehicle brands across 47 countries with 68M customers, 125M connected vehicles, 92,000 employees, and 11,500 dealers. Currently, each brand operates on separate CRM platforms with no shared customer identifier. The board's initiative "One Customer. One Vehicle. One Experience." requires a unified global customer view.

We must choose between:
1. **Single production org** with brand-specific business units (BU segmentation)
2. **Multi-org architecture** with regional Salesforce orgs and external MDM
3. **Hub-and-spoke** with regional orgs and Data Cloud as the global hub

## Options Considered

### Option A: Single Production Org with BU Segmentation (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Pattern** | Single org with 14 business units |
| **Customer View** | Native 360° view within one org |
| **Integration** | Minimal inter-system integration |
| **Scaling** | Data Cloud, Big Objects, async processing |
| **Cost** | Lower (single licensing) |
| **Complexity** | Medium (BU management, governor limits) |

### Option B: Multi-Org with External MDM
| Aspect | Details |
|--------|---------|
| **Pattern** | Regional orgs + Informatica/MuleSoft MDM |
| **Customer View** | External MDM maintains golden record |
| **Integration** | Point-to-point APIs between orgs |
| **Scaling** | MDM becomes bottleneck |
| **Cost** | Higher (multiple orgs, MDM licensing) |
| **Complexity** | High (integration debt) |

### Option C: Hub-and-Spoke with Data Cloud
| Aspect | Details |
|--------|---------|
| **Pattern** | Regional orgs + Data Cloud as global hub |
| **Customer View** | Data Cloud unified view, orgs fragmented |
| **Integration** | MuleSoft + Data Cloud sync |
| **Scaling** | Regional orgs scale independently |
| **Cost** | Medium (multiple orgs + Data Cloud) |
| **Complexity** | Medium-High |

## Decision

**ACCEPTED: Option A — Single Production Org with BU Segmentation**

## Rationale

1. **Business Alignment**: Directly enables "One Customer. One Vehicle. One Experience." vision. Multi-org creates artificial fragmentation that contradicts the board's intent.

2. **Technical Feasibility**: Salesforce handles 68M+ records with proper design. Governor limits can be managed through Data Cloud offload, Big Objects, and async processing.

3. **Cost Efficiency**: Single licensing reduces cost by 30-40% compared to multi-org. Eliminates MDM licensing and integration maintenance.

4. **Operational Simplicity**: Single org means single backup, single upgrade, single security model. Reduces operational overhead significantly.

5. **Future Acquisitions**: BU model accommodates new brands seamlessly. New brand = new BU, not new org.

6. **Data Consistency**: Native sharing model ensures consistent data access across all brands.

7. **Integration Reduction**: Eliminates need for inter-org integration layer, reducing complexity by ~40%.

## Consequences

### Positive
- True 360° customer view natively within Salesforce
- Reduced integration complexity and maintenance cost
- Lower licensing cost through consolidation
- Simplified backup, restore, and disaster recovery
- Future acquisition-ready architecture
- Unified security and compliance model

### Negative
- Higher initial migration complexity (14 brands into one org)
- Governor limit management required at scale
- BU segmentation adds configuration overhead
- Single org means single point of failure (mitigated by DR)
- Requires robust change management for 92,000 users

### Risks
- **R-003**: Governor limit breach at 68M records — mitigated by Data Cloud offload and Big Objects
- **R-004**: Brand resistance — mitigated by brand-specific UI layers and change management
- **R-014**: Data volume growth — mitigated by capacity planning and auto-scaling

## Implementation Notes

- BU hierarchy mirrors brand structure
- Role hierarchy provides brand-level visibility
- Sharing rules protect brand-specific data
- Platform Events enable brand-to-brand async communication
- Identity bridge during transition preserves legacy systems
- Load testing with 100,000 concurrent users required before production

## Related Decisions

- ADR-002: Data Cloud as CDP (analytics offload)
- ADR-004: Identity Resolution (unified customer ID)
- ADR-006: Big Objects Strategy (historical data)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
