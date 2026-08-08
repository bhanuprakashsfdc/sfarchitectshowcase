# ADR-002: Data Cloud as CDP
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization needs a unified Customer Data Platform (CDP) to consolidate 68M customer records across 14 brands, 3 identity providers, and 47 countries with data residency requirements. The CDP must support real-time identity resolution, regional data zones, and analytics at scale.

We must choose between:
1. **Salesforce Data Cloud** — native Salesforce CDP
2. **Third-party CDP** (Segment, Treasure Data, Informatica) — specialized CDP solutions
3. **Custom CDP** — purpose-built solution on AWS/Azure

## Options Considered

### Option A: Salesforce Data Cloud (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Integration** | Native Salesforce integration |
| **Identity Resolution** | Built-in graph-based resolution |
| **Data Residency** | Regional data zones supported |
| **Real-Time** | Streaming data ingestion |
| **Cost** | Included in Salesforce licensing |
| **Time to Value** | Fastest (native platform) |

### Option B: Third-Party CDP
| Aspect | Details |
|--------|---------|
| **Integration** | API-based, requires connectors |
| **Identity Resolution** | Advanced features, but external |
| **Data Residency** | Varies by vendor |
| **Real-Time** | Depends on vendor |
| **Cost** | Additional licensing ($2-5M/year) |
| **Time to Value** | 6-12 months for implementation |

### Option C: Custom CDP
| Aspect | Details |
|--------|---------|
| **Integration** | Full customization |
| **Identity Resolution** | Custom development |
| **Data Residency** | Full control |
| **Real-Time** | Full control |
| **Cost** | Highest (development + maintenance) |
| **Time to Value** | 12-18+ months |

## Decision

**ACCEPTED: Option A — Salesforce Data Cloud**

## Rationale

1. **Native Integration**: Data Cloud is purpose-built for Salesforce. No API overhead, no sync latency, no data model mismatch.

2. **Identity Resolution**: Built-in graph-based identity resolution matches customers across systems using email, phone, address, and VIN. Supports 95%+ accuracy target.

3. **Regional Data Zones**: Data Cloud supports regional data residency without data migration. Logical unification with physical data separation.

4. **Real-Time Processing**: Streaming ingestion from MuleSoft and IoT Gateway enables real-time customer profiles.

5. **Cost Efficiency**: Included in Salesforce enterprise licensing. Eliminates third-party CDP licensing ($2-5M/year savings).

6. **Time to Value**: Can be deployed in Track 1 (Months 1-3). Third-party solutions require 6-12 months minimum.

7. **Compliance**: Native GDPR, CCPA, LGPD, APPI, PIPA support. Salesforce DPA covers all requirements.

8. **Analytics Integration**: Direct integration with Tableau for global reporting. No ETL required.

## Consequences

### Positive
- Seamless integration with Salesforce Service, Sales, Marketing Cloud
- Real-time identity resolution without data migration
- Regional data zones address 47-country residency requirements
- Reduced integration complexity
- Lower total cost of ownership
- Faster time to market

### Negative
- Data Cloud is newer platform with evolving features
- Identity resolution may require tuning for automotive industry patterns
- Regional zones require careful configuration
- Learning curve for internal team

### Risks
- **R-001**: Identity resolution failure — mitigated by pilot, tuning, manual review workflows
- **R-010**: Data Cloud latency — mitigated by performance testing, caching
- **R-008**: Data quality issues — mitigated by data quality framework

## Implementation Notes

- Deploy Data Cloud in 3 regional zones: Americas, EMEA, APAC
- Brazil requires additional LGPD-specific encryption zone
- Identity resolution rules: email (40% weight), phone (30%), address (20%), VIN (10%)
- Survivorship rules: most recent, most complete, most trusted source
- Confidence scoring for manual review of low-confidence matches
- Data Cloud pipelines ingest from MuleSoft streaming and batch

## Related Decisions

- ADR-001: Single Org Strategy (CDP within single org)
- ADR-005: Regional Data Zones (Data Cloud deployment topology)
- ADR-009: Einstein AI (Einstein built on Data Cloud data)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
