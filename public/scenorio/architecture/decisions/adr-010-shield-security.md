# ADR-010: Salesforce Shield Security Framework
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization will consolidate 68M customer records, 125M vehicle records, and sensitive PII across 14 brands into a single Salesforce org. This creates significant security and compliance obligations including GDPR, LGPD, APPI, PIPA, CCPA, and SOC 2. We need an enterprise-grade security framework that protects data at rest and in transit, provides comprehensive audit trails, and meets regulatory requirements in 47 countries.

We must choose between:
1. **Salesforce Shield** — native Salesforce security suite
2. **Custom Security Framework** — purpose-built security controls
3. **Third-Party Security** — external security tools
4. **Platform Encryption Only** — minimal encryption without full Shield

## Options Considered

### Option A: Salesforce Shield (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Encryption** | Platform Encryption + Field-Level Encryption |
| **Monitoring** | Event Monitoring + Shield Monitoring |
| **Audit** | Field Audit Trail + Event Log |
| **Privacy** | Data classification, consent management |
| **Cost** | Additional licensing per user |
| **Compliance** | Native GDPR, SOC 2, ISO 27001 support |

### Option B: Custom Security Framework
| Aspect | Details |
|--------|---------|
| **Encryption** | Custom encryption layer |
| **Monitoring** | Custom monitoring |
| **Audit** | Custom audit logging |
| **Privacy** | Custom implementation |
| **Cost** | Very high (development + maintenance) |
| **Compliance** | Requires validation per regulation |

### Option C: Third-Party Security
| Aspect | Details |
|--------|---------|
| **Encryption** | External encryption tools |
| **Monitoring** | External SIEM |
| **Audit** | External logging |
| **Privacy** | External DLP tools |
| **Cost** | High (licensing + integration) |
| **Compliance** | Integration complexity |

### Option D: Platform Encryption Only
| Aspect | Details |
|--------|---------|
| **Encryption** | Shield Platform Encryption only |
| **Monitoring** | Basic login/logout events |
| **Audit** | Setup Audit Trail only |
| **Privacy** | Limited |
| **Cost** | Lower |
| **Compliance** | Insufficient for 47 countries |

## Decision

**ACCEPTED: Option A — Salesforce Shield Security Framework**

## Rationale

1. **Native Integration**: Shield is built into Salesforce, providing seamless encryption, monitoring, and audit capabilities without custom integration.

2. **Comprehensive Coverage**: Shield covers encryption at rest, event monitoring, field audit trail, and security center — all required for enterprise-scale compliance.

3. **Regulatory Compliance**: Shield supports GDPR, CCPA, LGPD, APPI, PIPA, and SOC 2 out of the box. Salesforce DPA covers all regional requirements.

4. **Data Protection**: 68M customer records require enterprise-grade protection. Shield Platform Encryption + Field-Level Encryption provide defense-in-depth.

5. **Audit Capability**: Field Audit Trail (18-month retention) and Event Monitoring provide complete audit trail for compliance and security investigations.

6. **Threat Detection**: Shield Monitoring + Event Monitoring detect suspicious activity in real-time. Critical for detecting data breaches.

7. **Cost Efficiency**: While Shield requires additional licensing, it eliminates need for third-party security tools and custom security development.

8. **Future-Proof**: Shield evolves with Salesforce platform. Investment protected against security requirement changes.

## Consequences

### Positive
- Enterprise-grade security for 68M customer records
- Compliance with GDPR, LGPD, APPI, PIPA, SOC 2
- Real-time threat detection and monitoring
- Complete audit trail for compliance
- Native integration with Salesforce features
- Supports data residency requirements

### Negative
- Additional licensing cost per user
- Performance impact of encryption (minimal with modern hardware)
- Complexity of field-level encryption policy management
- Requires security expertise to configure properly

### Risks
- **R-002**: Data residency violation — mitigated by Shield + regional data zones
- **R-006**: Budget overrun — mitigated by right-sizing Shield licensing
- **R-011**: Skill gaps — mitigated by training, SI support

## Implementation Notes

### Security Controls

| Control | Implementation | Scope |
|---------|----------------|-------|
| **Authentication** | SSO + MFA enforced | All users |
| **Authorization** | Role hierarchy + sharing rules + record-level security | All data |
| **Encryption at Rest** | Shield Platform Encryption | All PII fields |
| **Field-Level Encryption** | Shield for SSN, payment data | Sensitive fields |
| **Event Monitoring** | Shield Event Monitoring | All user activity |
| **Field Audit Trail** | 18-month retention | All critical objects |
| **DLP Policies** | Prevent unauthorized export | Sensitive data |
| **IP Restrictions** | Geo-fencing by region | Regional compliance |

### Compliance Mapping

| Regulation | Shield Feature | Implementation |
|------------|---------------|----------------|
| **GDPR** | Platform Encryption + Field Audit Trail + Data Classification | EU data zone |
| **LGPD** | Platform Encryption + additional field encryption | Brazil data zone |
| **APPI** | Platform Encryption + Event Monitoring | APAC data zone |
| **PIPA** | Platform Encryption + Event Monitoring | APAC data zone |
| **CCPA** | Data Classification + Deletion Workflows | Americas data zone |
| **SOC 2** | Shield Monitoring + Audit Trail + Access Controls | Global |

### Security Monitoring Dashboards

| Dashboard | Metrics | Audience |
|-----------|---------|----------|
| **Security Operations** | Login anomalies, data access, DLP events | Security team |
| **Compliance** | Audit events, data residency, consent | Compliance team |
| **Executive** | Security posture, incidents, risk | C-Suite |

## Related Decisions

- ADR-005: Regional Data Zones (regional security controls)
- ADR-001: Single Org Strategy (unified security model)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
