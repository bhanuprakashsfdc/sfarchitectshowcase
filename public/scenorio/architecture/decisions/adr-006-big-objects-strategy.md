# ADR-006: Big Objects Strategy for Historical Data
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization will accumulate 500TB+ of data over 18 months including 68M customer records, 125M vehicle records, service cases, warranties, subscriptions, and 110TB/year of vehicle telemetry. Salesforce standard objects and storage are insufficient for this scale while maintaining performance. We need a strategy for managing historical and high-volume data.

We must choose between:
1. **Hybrid Approach** — Big Objects for Salesforce-accessible data + external storage for raw telemetry
2. **All Big Objects** — all historical data in Big Objects
3. **All External Storage** — all data external to Salesforce
4. **Archive & Purge** — archive old data, purge from Salesforce

## Options Considered

### Option A: Hybrid Approach (RECOMMENDED)
| Data Type | Storage | Rationale |
|-----------|---------|-----------|
| **Active Customer Data** | Standard Objects | Real-time access, CRM functionality |
| **Historical Service Data** | Big Objects | Salesforce-accessible, archival |
| **Vehicle Telemetry** | External Object Storage | Petabyte scale, raw data |
| **Aggregated Metrics** | Data Cloud | Analytics, reporting |
| **Documents/Images** | Salesforce Files + External | Mixed access patterns |

### Option B: All Big Objects
| Aspect | Details |
|--------|---------|
| **Coverage** | All data in Big Objects |
| **Performance** | Good for archival, limited for real-time |
| **Query Support** | Limited SOQL, no triggers |
| **Cost** | Lower standard storage cost |

### Option C: All External Storage
| Aspect | Details |
|--------|---------|
| **Coverage** | All data external to Salesforce |
| **Performance** | Fast, but no native Salesforce access |
| **Query Support** | External objects, limited |
| **Cost** | Lowest Salesforce storage cost |

### Option D: Archive & Purge
| Aspect | Details |
|--------|---------|
| **Coverage** | Active only in Salesforce, archive external |
| **Performance** | Best for active data |
| **Query Support** | Full for active, none for archived |
| **Cost** | Lowest, but data loss risk |

## Decision

**ACCEPTED: Option A — Hybrid Approach**

## Rationale

1. **Active vs. Historical**: Active customer and vehicle data needs real-time Salesforce access for Service Cloud, Sales Cloud, and Service Cloud. Historical data can be archived.

2. **Big Objects Strength**: Salesforce Big Objects are designed for large-scale data storage with Salesforce accessibility. Perfect for historical service records, warranty history, and vehicle service logs.

3. **External Storage for Telemetry**: 110TB/year of raw vehicle telemetry doesn't belong in Salesforce. External object storage (AWS S3, Azure Blob) is purpose-built for this scale.

4. **Data Cloud for Analytics**: Aggregated metrics and analytics data belongs in Data Cloud, which is optimized for analytics workloads.

5. **Performance Preservation**: Keeping active data in standard objects ensures optimal performance for real-time operations.

6. **Cost Optimization**: Right-sizing storage by data type reduces overall storage cost while maintaining performance.

7. **Compliance**: Big Objects and external storage support retention requirements for legal and compliance.

## Consequences

### Positive
- Optimal performance for real-time operations
- Scalable storage for 500TB+ data
- Cost-efficient storage tiering
- Salesforce-accessible historical data
- Compliance-ready retention policies
- Supports analytics via Data Cloud

### Negative
- Complex data lifecycle management
- Requires data migration strategy
- Big Objects have limited SOQL capabilities
- External storage requires additional integration

### Risks
- **R-003**: Governor limit breach — mitigated by Big Objects offload
- **R-014**: Data volume growth — mitigated by capacity planning, auto-archiving

## Implementation Notes

### Data Tiering Strategy

| Tier | Data Type | Storage | Retention | Access Pattern |
|------|-----------|---------|-----------|----------------|
| **Hot** | Active customers, vehicles, cases | Standard Objects | Current + 2 years | Real-time, frequent |
| **Warm** | Historical service, warranty, subscription | Big Objects | 2-7 years | Periodic, reporting |
| **Cold** | Raw telemetry, logs, detailed history | External Storage | 7+ years | Rare, compliance |
| **Analytics** | Aggregated metrics, CLV, segments | Data Cloud | Rolling 3 years | Analytics, ML |

### Big Objects Configuration

| Object | Records | Indexed Fields | Retention |
|--------|---------|---------------|-----------|
| `Service_History__b` | ~500M | CustomerId, VehicleId, Date | 7 years |
| `Warranty_History__b` | ~200M | VehicleId, WarrantyId, Date | 7 years |
| `Vehicle_Telemetry_Agg__b` | ~1B | VehicleId, Date, Metric | 3 years |
| `Subscription_History__b` | ~100M | CustomerId, Date | 7 years |
| `Campaign_History__b` | ~50M | CustomerId, Date | 3 years |

### External Storage Configuration

| Storage | Data | Format | Retention |
|---------|------|--------|-----------|
| **AWS S3 / Azure Blob** | Raw vehicle telemetry | Parquet/ORC | 7 years |
| **AWS S3 / Azure Blob** | IoT event logs | JSON/Avro | 3 years |
| **AWS S3 / Azure Blob** | Manufacturing data | CSV/Parquet | 7 years |

## Related Decisions

- ADR-001: Single Org Strategy (Big Objects within single org)
- ADR-002: Data Cloud as CDP (analytics tier)
- ADR-007: Event-Driven Architecture (event archiving)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
