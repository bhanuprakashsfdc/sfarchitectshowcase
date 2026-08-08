# Non-Functional Requirements (NFR)
**Global Customer Unification Platform**
**Version:** 1.0
**Date:** 2026-07-28
**Status:** Board Approved

---

## 1. Availability

### 1.1 Uptime Requirements

| System Component | Target Uptime | Downtime Allowance | Notes |
|------------------|---------------|-------------------|-------|
| **Salesforce Production Org** | 99.9% | ~8.76 hours/year | Salesforce Hyperforce SLA |
| **Data Cloud** | 99.9% | ~8.76 hours/year | Regional zones |
| **MuleSoft Runtime** | 99.9% | ~8.76 hours/year | Multi-region runtime |
| **Dealer Portal (Experience Cloud)** | 99.5% | ~43.8 hours/year | Allow slightly lower due to 24-month transition |
| **IoT Gateway** | 99.9% | ~8.76 hours/year | AWS IoT / Azure IoT |
| **Tableau** | 99.5% | ~43.8 hours/year | Business hours critical |

### 1.2 Maintenance Windows

| Window Type | Frequency | Duration | Time (UTC) |
|-------------|-----------|----------|------------|
| **Planned Maintenance** | Monthly | 4 hours | Sunday 02:00-06:00 UTC |
| **Emergency Maintenance** | As needed | 2 hours max | Off-peak preferred |
| **Salesforce Releases** | Quarterly | 4-8 hours | Per Salesforce schedule |

### 1.3 High Availability Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    HIGH AVAILABILITY ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐                   │
│  │  Primary    │     │  Secondary  │     │  Disaster    │                   │
│  │  Region     │     │  Region     │     │  Recovery    │                   │
│  │  (Active)   │     │  (Warm)     │     │  Region      │                   │
│  │             │     │             │     │  (Cold)      │                   │
│  │ • Salesforce│     │ • Salesforce│     │ • Backup     │                   │
│  │   Org       │     │   Read-Only │     │   Restore    │                   │
│  │ • Data      │     │ • Data      │     │ • Full DR    │                   │
│  │   Cloud     │     │   Cloud     │     │              │                   │
│  │ • MuleSoft  │     │ • MuleSoft  │     │              │                   │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘                   │
│         │                   │                   │                          │
│         └───────────────────┼───────────────────┘                          │
│                             │                                              │
│                    ┌────────▼────────┐                                     │
│                    │   Global Load   │                                     │
│                    │   Balancer /    │                                     │
│                    │  Geo-DNS        │                                     │
│                    └─────────────────┘                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.4 Availability Testing

| Test Type | Frequency | Criteria |
|-----------|-----------|----------|
| **Failover Drill** | Quarterly | RTO < 4 hours, RPO < 1 hour |
| **Load Testing** | Pre-production, major releases | No degradation at peak load |
| **Chaos Engineering** | Monthly (non-production) | Resilience validation |
| **DR Tabletop** | Semi-annually | Process validation |

---

## 2. Performance

### 2.1 Response Time Requirements

| Interaction Type | Target Response Time | Measurement Method | Notes |
|------------------|---------------------|-------------------|-------|
| **API Response Time** | < 2 seconds | 95th percentile | MuleSoft + Salesforce API |
| **Page Load Time** | < 3 seconds | 95th percentile | Lightning pages, Experience Cloud |
| **Search Response** | < 1 second | 95th percentile | Global search across 68M records |
| **Report Generation** | < 10 seconds | Standard reports | Tableau standard dashboards |
| **Complex Analytics** | < 60 seconds | 95th percentile | Data Cloud queries |
| **File Upload/Download** | < 5 seconds | 95th percentile | Attachments, documents |
| **Identity Resolution** | < 30 seconds | Batch processing | Data Cloud matching |

### 2.2 Throughput Requirements

| Metric | Requirement | Notes |
|--------|------------|-------|
| **Concurrent Users** | 100,000 | Peak load testing requirement |
| **API Calls per Day** | 100,000,000 | Includes dealers, employees, vehicles |
| **Data Volume** | 500TB+ | Customers, vehicles, service history |
| **Event Processing** | 10,000 events/second | Platform Events + IoT events |
| **Batch Records** | 10,000 records/batch | Apex batch limits |
| **File Storage** | 50TB+ | Documents, images, attachments |

### 2.3 Performance Optimization Strategies

| Strategy | Implementation | Impact |
|----------|----------------|--------|
| **Data Cloud Offload** | Analytics queries run in Data Cloud, not Salesforce | Reduces Salesforce query load by 70% |
| **Big Objects** | Historical data archived to Big Objects | Reduces standard object count |
| **Async Processing** | Platform Events + Queueable Apex for non-real-time | Reduces synchronous load |
| **Caching** | Redis cache via MuleSoft for frequently accessed data | 50% reduction in API calls |
| **Skinny Tables** | Optimized tables for frequent queries | 30% query performance improvement |
| **Selective Querying** | Indexed fields, filtered queries | Reduced SOQL consumption |
| **CDN** | Tableau + static assets via CDN | 40% page load improvement |

### 2.4 Performance Testing Requirements

| Test Scenario | Load Profile | Pass Criteria |
|---------------|--------------|---------------|
| **Peak Load Test** | 100,000 concurrent users | < 2s API, < 3s page load |
| **Stress Test** | 150% peak load | Graceful degradation, no data loss |
| **Soak Test** | 80% peak load for 24 hours | No memory leaks, stable performance |
| **Spike Test** | 300% peak load for 5 minutes | Automatic scaling, no failures |
| **Volume Test** | 500TB data volume | Consistent query performance |

---

## 3. Security

### 3.1 Authentication & Authorization

| Requirement | Implementation | Rationale |
|-------------|----------------|-----------|
| **Multi-Factor Authentication (MFA)** | Enforced for all users | Protect 68M customer records |
| **Single Sign-On (SSO)** | Salesforce Identity + SAML 2.0 | Unified authentication across all brands |
| **Password Policy** | 12+ chars, complexity, 90-day rotation | Enterprise security standard |
| **Session Management** | 8-hour timeout, concurrent session limits | Prevent unauthorized access |
| **Role Hierarchy** | Brand-based + function-based | Segregate duties, brand independence |
| **Sharing Rules** | Record-level access control | Protect brand-specific data |
| **Permission Sets** | Granular feature access | Principle of least privilege |

### 3.2 Encryption

| Data State | Encryption Method | Scope |
|------------|-------------------|-------|
| **Data at Rest** | Shield Platform Encryption | All PII fields |
| **Data in Transit** | TLS 1.3 minimum | All API communications |
| **Field-Level Encryption** | Shield AES-256 | SSN, payment data, sensitive PII |
| **Database Encryption** | Salesforce native + Hyperforce | All database storage |
| **Backup Encryption** | AES-256 | All backup data |
| **IoT Data** | TLS + AES-256 | In transit and at rest |

### 3.3 Threat Protection

| Threat Vector | Mitigation | Monitoring |
|---------------|-----------|------------|
| **Brute Force** | Login rate limiting, IP blocking | Shield Event Monitoring |
| **SQL Injection** | SOQL binding, input validation | Static code analysis |
| **XSS/CSRF** | Content Security Policy, CSRF tokens | Security scanning |
| **Data Exfiltration** | DLP policies, data classification | Event Monitoring, anomaly detection |
| **Privilege Escalation** | Permission set audits, separation of duties | Security reviews |
| **Insider Threat** | Field Audit Trail, access reviews | User behavior analytics |
| **DDoS** | MuleSoft rate limiting, Salesforce Shield | Traffic monitoring |

### 3.4 Security Auditing

| Audit Type | Frequency | Scope |
|------------|-----------|-------|
| **Security Review** | Monthly | Access controls, permission sets |
| **Penetration Testing** | Quarterly | External vulnerabilities |
| **Compliance Audit** | Annually | GDPR, LGPD, APPI, PIPA, SOC 2 |
| **Access Review** | Quarterly | User access rights, role assignments |
| **Event Log Review** | Weekly | Suspicious activity, anomalies |
| **Vulnerability Scanning** | Weekly | Salesforce security scanner, third-party tools |

---

## 4. Scalability

### 4.1 Scaling Dimensions

| Dimension | Current | 18-Month Target | Growth Rate | Scaling Strategy |
|-----------|---------|----------------|-------------|-----------------|
| **Customers** | 68M | 78M | 15% annually | Data Cloud, Big Objects |
| **Vehicles** | 125M | 145M | 16% annually | External storage + Big Objects |
| **Employees** | 92,000 | 100,000 | 9% annually | License scaling |
| **Dealers** | 11,500 | 13,000 | 13% annually | License scaling |
| **Data Volume** | 200TB | 500TB | 25% annually | Tiered storage |
| **API Calls** | 50M/day | 100M/day | 20% annually | Caching, async processing |

### 4.2 Scalability Architecture

| Component | Scaling Approach | Limit |
|-----------|-----------------|-------|
| **Salesforce Core** | Single org with BU segmentation | 200M+ records with optimization |
| **Data Cloud** | Horizontal scaling, regional zones | 1B+ records per zone |
| **MuleSoft** | Horizontal scaling, runtime clusters | 10,000+ TPS per runtime |
| **Big Objects** | Unlimited storage, index optimization | 1B+ records per object |
| **Platform Events** | Event bus scaling | 1M+ events/day |
| **Tableau** | Cloud scaling, extracts | 10M+ row data sources |

### 4.3 Capacity Planning

| Metric | Current | 12-Month | 24-Month | Action |
|--------|---------|----------|----------|--------|
| **Data Storage** | 200TB | 350TB | 500TB | Right-size, archive, external storage |
| **API Calls** | 50M/day | 75M/day | 100M/day | Caching, batch processing |
| **Concurrent Users** | 60,000 | 80,000 | 100,000 | Load balancing, auto-scaling |
| **Event Volume** | 5M/day | 8M/day | 12M/day | Event bus scaling |
| **Licenses** | 80,000 | 90,000 | 100,000 | Phased procurement |

---

## 5. Compliance

### 5.1 Data Residency Requirements

| Region/Country | Regulation | Data Residency Requirement | Implementation |
|----------------|-----------|---------------------------|----------------|
| **European Union** | GDPR | EU citizen data in EU | Data Cloud EU zone, Hyperforce EU |
| **United Kingdom** | UK GDPR | UK citizen data in UK | Data Cloud UK zone |
| **Brazil** | LGPD | Brazilian citizen data in Brazil | Data Cloud Brazil zone, additional encryption |
| **Japan** | APPI | Japanese citizen data in Japan | Data Cloud APAC zone |
| **South Korea** | PIPA | Korean citizen data in Korea | Data Cloud APAC zone |
| **Australia** | Privacy Act | Australian citizen data in Australia | Data Cloud APAC zone |
| **United States** | CCPA/CPRA | California resident rights | Data Cloud Americas, deletion workflows |
| **Canada** | PIPEDA | Canadian data protection | Data Cloud Americas |
| **Other 40 Countries** | Local regulations | Varies | Data Cloud regional zones, legal review |

### 5.2 Compliance Controls

| Control | Requirement | Implementation | Verification |
|---------|-------------|----------------|--------------|
| **Data Classification** | Classify all data by residency requirement | Data Cloud tagging | Monthly audit |
| **Data Mapping** | Map data flows across all 47 countries | Integration documentation | Legal review |
| **Consent Management** | Unified consent tracking | Marketing Cloud + Data Cloud | Quarterly audit |
| **Right to Erasure** | Customer data deletion | Automated deletion workflows | Annual testing |
| **Data Portability** | Customer data export | Standardized export API | Annual testing |
| **Breach Notification** | 72-hour notification | Automated alerting | Annual drill |
| **Audit Logging** | Complete audit trail | Field Audit Trail + Shield | Continuous |
| **Privacy by Design** | Built-in privacy controls | Architecture review | ADR requirement |

### 5.3 Compliance Frameworks

| Framework | Scope | Certification |
|-----------|-------|---------------|
| **GDPR** | EU operations | Data Cloud EU zone, DPA with Salesforce |
| **LGPD** | Brazil operations | Data Cloud Brazil zone, additional encryption |
| **APPI** | Japan operations | Data Cloud APAC zone |
| **PIPA** | South Korea operations | Data Cloud APAC zone |
| **SOC 2 Type II** | Security controls | Salesforce Shield, annual audit |
| **ISO 27001** | Information security | Annual certification |
| **PCI DSS** | Payment data | Shield encryption, scope limitation |

---

## 6. Recovery

### 6.1 Recovery Objectives

| Scenario | RTO | RPO | Recovery Strategy |
|----------|-----|-----|-------------------|
| **Salesforce Production Outage** | 4 hours | 1 hour | Salesforce Hyperforce failover |
| **Data Cloud Outage** | 4 hours | 1 hour | Regional zone failover |
| **MuleSoft Outage** | 2 hours | 0 (event replay) | Runtime failover + event replay |
| **Complete Region Outage** | 8 hours | 1 hour | Cross-region failover |
| **Data Corruption** | 4 hours | 1 hour | Point-in-time restore |
| **Security Incident** | 2 hours | 0 | Incident response plan |
| **Natural Disaster** | 24 hours | 1 hour | DR region activation |

### 6.2 Backup & Restore

| Data Type | Backup Frequency | Retention | Restore Method |
|-----------|------------------|-----------|---------------|
| **Salesforce Metadata** | Daily | 7 years | Salesforce native + third-party |
| **Salesforce Data** | Hourly incremental, daily full | 7 years | Salesforce restore + Big Objects |
| **Data Cloud** | Continuous replication | 7 years | Regional zone restore |
| **MuleSoft** | Daily | 2 years | Runtime snapshot + config backup |
| **Configuration** | Per change | 7 years | Version control + metadata API |

### 6.3 Disaster Recovery Testing

| Test Type | Frequency | Scenario | Pass Criteria |
|-----------|-----------|----------|---------------|
| **Tabletop Exercise** | Semi-annually | Walkthrough DR process | Process validated |
| **Failover Drill** | Quarterly | Simulated primary region failure | RTO < 4 hours |
| **Restore Test** | Quarterly | Data corruption simulation | RPO < 1 hour |
| **Full DR Test** | Annually | Complete region outage | Full system restoration |

---

## 7. Monitoring

### 7.1 Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MONITORING & OBSERVABILITY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │ Salesforce  │  │   Data      │  │   MuleSoft  │  │  Tableau    │       │
│  │  Shield     │  │   Cloud     │  │  Anypoint   │  │ Dashboards  │       │
│  │ Monitoring  │  │ Monitoring  │  │ Monitoring  │  │             │       │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘       │
│         │                │                │                │               │
│         └────────────────┼────────────────┼────────────────┘               │
│                          │                │                                 │
│                          ▼                ▼                                 │
│                 ┌─────────────────────────────────────┐                     │
│                 │         Monitoring Gateway          │                     │
│                 │  (Centralized Log Collection)       │                     │
│                 └─────────────────────────────────────┘                     │
│                                    │                                        │
│                                    ▼                                        │
│                 ┌─────────────────────────────────────┐                     │
│                 │         Observability Platform       │                     │
│                 │  (Metrics, Logs, Traces, Alerts)     │                     │
│                 └─────────────────────────────────────┘                     │
│                                    │                                        │
│          ┌─────────────┬───────────┴───────────┬─────────────┐             │
│          │             │                       │             │             │
│          ▼             ▼                       ▼             ▼             │
│   ┌─────────────┐ ┌─────────────┐       ┌─────────────┐ ┌─────────────┐   │
│   │  Executive   │ │  Technical  │       │   Security  │ │   Incident  │   │
│   │ Dashboard    │ │ Dashboard   │       │  Dashboard  │ │ Management  │   │
│   └─────────────┘ └─────────────┘       └─────────────┘ └─────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 Key Metrics & SLIs

| Service | SLI | SLO | SLA |
|---------|-----|-----|-----|
| **Salesforce API** | API response time | 95% < 2s | 99.9% uptime |
| **Data Cloud Sync** | Data freshness | < 5 minutes | 99.9% uptime |
| **MuleSoft API** | API latency | 95% < 1s | 99.9% uptime |
| **Event Processing** | Event delivery time | 95% < 30s | 99.5% delivery rate |
| **Page Load** | Page render time | 95% < 3s | 99.5% uptime |
| **Search** | Search response time | 95% < 1s | 99.5% uptime |
| **Login** | Authentication time | 95% < 2s | 99.9% success rate |

### 7.3 Alerting Strategy

| Alert Severity | Response Time | Escalation | Examples |
|----------------|---------------|------------|----------|
| **P1 - Critical** | 15 minutes | Immediate escalation to leadership | System down, data breach |
| **P2 - High** | 1 hour | Team lead + architecture | Performance degradation, API failures |
| **P3 - Medium** | 4 hours | On-call team | Elevated error rates, slow queries |
| **P4 - Low** | 24 hours | Team backlog | Capacity warnings, minor issues |

### 7.4 Logging Requirements

| Log Type | Retention | Storage | Access |
|----------|-----------|---------|--------|
| **Security Logs** | 7 years | Encrypted archive | Security team only |
| **Audit Logs** | 7 years | Encrypted archive | Compliance team |
| **Application Logs** | 90 days | Hot storage | Engineering team |
| **Integration Logs** | 90 days | Hot storage | Integration team |
| **Performance Logs** | 30 days | Hot storage | Engineering team |
| **Access Logs** | 1 year | Warm storage | Security + compliance |

---

## 8. Capacity Management

### 8.1 Capacity Thresholds

| Resource | Warning Threshold | Critical Threshold | Action |
|----------|-------------------|-------------------|--------|
| **Data Storage** | 70% | 85% | Archive, right-size |
| **API Calls** | 70% | 85% | Caching, batch processing |
| **Concurrent Users** | 75% | 90% | Scale infrastructure |
| **CPU Utilization** | 70% | 85% | Auto-scaling |
| **Memory Usage** | 75% | 90% | Optimization, scaling |
| **Event Queue** | 70% | 85% | Scaling, backpressure |

### 8.2 Capacity Planning Process

| Activity | Frequency | Owner |
|----------|-----------|-------|
| **Capacity Review** | Monthly | Architecture Council |
| **Trend Analysis** | Quarterly | Engineering team |
| **Scaling Decision** | As needed | Architecture Council |
| **Cost Optimization** | Monthly | FinOps team |
| **License Planning** | Quarterly | Procurement |

---

## 9. Operational Requirements

### 9.1 Change Management

| Change Type | Approval Required | Notification | Rollback Plan |
|-------------|-------------------|--------------|---------------|
| **Emergency** | CTO | Immediate | Mandatory |
| **High** | Architecture Council | 48 hours | Required |
| **Standard** | Change Advisory Board | 1 week | Recommended |
| **Low** | Team lead | 2 weeks | Optional |

### 9.2 Support Model

| Tier | Scope | Response Time | Team |
|------|-------|---------------|------|
| **Tier 1** | User issues, login problems | 15 minutes | Service desk |
| **Tier 2** | Application issues, configuration | 1 hour | Regional support |
| **Tier 3** | Platform issues, integrations | 4 hours | Engineering team |
| **Tier 4** | Architecture, vendor escalation | 24 hours | Architecture Council |

### 9.3 Operational Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Change Success Rate** | > 95% | Monthly |
| **Incident Response Time** | < 15 minutes (P1) | Per incident |
| **Mean Time to Resolution (MTTR)** | < 4 hours (P1) | Monthly average |
| **System Availability** | 99.9% | Monthly |
| **User Satisfaction** | > 4.0/5.0 | Quarterly survey |

---

## 10. Accessibility

### 10.1 WCAG 2.2 Compliance

| Requirement | Implementation | Verification |
|-------------|----------------|--------------|
| **Perceivable** | Alt text, color contrast, responsive design | Automated testing + manual review |
| **Operable** | Keyboard navigation, focus management | Automated testing + manual review |
| **Understandable** | Clear labels, error messages, help text | User testing |
| **Robust** | ARIA labels, semantic HTML | Automated testing |

### 10.2 Accessibility Standards

| Standard | Level | Scope |
|----------|-------|-------|
| **WCAG 2.2** | AA | All customer-facing portals |
| **Section 508** | Compliance | US government contracts |
| **Mobile Accessibility** | WCAG 2.2 AA | Mobile apps, responsive design |

---

## 11. Environmental Requirements

### 11.1 Sustainability Targets

| Metric | Target | Implementation |
|--------|--------|---------------|
| **Carbon Footprint** | Reduce by 30% in 3 years | Salesforce sustainability, right-sizing |
| **Data Center Efficiency** | PUE < 1.5 | Salesforce Hyperforce selection |
| **Green Energy** | 100% renewable | Salesforce renewable energy commitment |

### 11.2 Cloud Optimization

| Strategy | Implementation | Savings |
|----------|----------------|---------|
| **License Optimization** | Right-size licenses per usage | 20-30% |
| **Storage Tiering** | Hot/warm/cold storage tiers | 40% |
| **Compute Right-sizing** | Match compute to workload | 25% |
| **Idle Resource Cleanup** | Automated cleanup policies | 15% |

---

*Document approved by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
