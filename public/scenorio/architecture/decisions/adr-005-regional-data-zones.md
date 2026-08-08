# ADR-005: Regional Data Zones Architecture
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization operates in 47 countries with strict data residency requirements including EU GDPR, Brazil LGPD, Japan APPI, South Korea PIPA, Australia Privacy Act, and others. Customer data cannot move freely across borders. We need an architecture that provides a unified customer view while maintaining physical data residency in each region.

We must choose between:
1. **Data Cloud Regional Zones** — logical unification with physical data separation
2. **Multi-Org Architecture** — separate orgs per region
3. **Data Residency Middleware** — custom data routing layer
4. **Single Org with Field-Level Controls** — single org with complex sharing rules

## Options Considered

### Option A: Data Cloud Regional Zones (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Architecture** | Single Salesforce org + Data Cloud regional zones |
| **Data Residency** | Physical data separation by region |
| **Unification** | Logical unified view through identity resolution |
| **Customer View** | Global view with regional data sources |
| **Compliance** | Native regional compliance |
| **Cost** | Medium (multiple Data Cloud zones) |

### Option B: Multi-Org Architecture
| Aspect | Details |
|--------|---------|
| **Architecture** | Regional Salesforce orgs |
| **Data Residency** | Natural by org location |
| **Unification** | External MDM or Data Cloud hub |
| **Customer View** | Fragmented at org level |
| **Compliance** | Easy per org |
| **Cost** | High (multiple orgs, integration) |

### Option C: Data Residency Middleware
| Aspect | Details |
|--------|---------|
| **Architecture** | Single org + custom routing layer |
| **Data Residency** | Custom enforcement |
| **Unification** | Complex within single org |
| **Customer View** | Unified but complex to manage |
| **Compliance** | Custom implementation |
| **Cost** | Very high (development + maintenance) |

### Option D: Single Org with Field-Level Controls
| Aspect | Details |
|--------|---------|
| **Architecture** | Single org with field-level encryption |
| **Data Residency** | Logical separation only |
| **Unification** | Native within org |
| **Customer View** | Truly unified |
| **Compliance** | Insufficient for strict residency |
| **Cost** | Low |

## Decision

**ACCEPTED: Option A — Data Cloud Regional Zones**

## Rationale

1. **Unified View with Residency**: Provides unified customer view through identity resolution while maintaining physical data separation per region.

2. **No Data Migration**: Logical unification means we don't need to move data across borders. Existing data stays in region, new data flows to regional zone.

3. **Scalable**: Data Cloud zones scale independently. Americas, EMEA, APAC can grow at different rates.

4. **Compliance Native**: Data Cloud regional zones are designed for data residency. Salesforce DPA covers all regional requirements.

5. **Cost Efficient**: Cheaper than multi-org (single org licensing) and cheaper than custom middleware.

6. **Future-Proof**: New countries can be added to existing zones or new zones created without architecture changes.

7. **Legal Viability**: Legal teams in each region can validate that data residency requirements are met without architectural changes.

## Consequences

### Positive
- Unified customer view across all brands and regions
- Data residency compliance without data migration
- Single org reduces operational complexity
- Regional zones scale independently
- Legal validation straightforward per zone
- Supports future country expansion

### Negative
- Increased Data Cloud licensing cost (3 zones)
- Identity resolution must handle cross-zone matching
- Legal review required for all 47 countries
- Complex cross-zone reporting

### Risks
- **R-002**: Data residency violation — mitigated by legal review, regional zones, field-level encryption
- **R-010**: Data Cloud latency — mitigated by performance testing, caching
- **R-011**: Skill gaps — mitigated by training, SI support

## Implementation Notes

- Americas Zone: US, Canada, Mexico, Brazil (Brazil with additional LGPD encryption)
- EMEA Zone: EU, UK, Germany, France, other European countries
- APAC Zone: Japan, South Korea, Australia, other APAC countries
- Each zone has independent Data Cloud instance
- Identity resolution spans zones for global customer view
- Field-level encryption for PII within each zone
- Cross-zone reporting via Data Cloud aggregation

## Zone Configuration

| Zone | Region | Countries | Compliance | Encryption |
|------|--------|-----------|------------|------------|
| Americas | AWS US East | USA, Canada, Mexico, Argentina, etc. | Standard + CCPA | Shield Platform Encryption |
| Brazil | AWS Brazil | Brazil | LGPD | Shield + additional field encryption |
| EMEA | AWS EU (Frankfurt) | EU, UK, Germany, France, etc. | GDPR | Shield Platform Encryption |
| APAC | AWS APAC (Tokyo) | Japan, South Korea, Australia, etc. | APPI, PIPA | Shield Platform Encryption |

## Related Decisions

- ADR-002: Data Cloud as CDP (regional zone implementation)
- ADR-010: Shield Security (field-level encryption per zone)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
