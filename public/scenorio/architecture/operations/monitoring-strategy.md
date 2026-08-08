# Monitoring Strategy
**Global Customer Unification Platform**  
**Version:** 1.0  
**Date:** 2026-07-28  
**Owner:** Operations Lead, Enterprise Salesforce Architecture Council  
**Review Cycle:** Quarterly  
**Next Review:** 2026-10-28

---

## 1. Monitoring Framework

### 1.1 Monitoring Pillars

```
┌─────────────────────────────────────────────────────────────┐
│                    MONITORING FRAMEWORK                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   LOGGING    │  │   METRICS    │  │     SYNTHETIC       │ │
│  │   Strategy   │  │  Collection  │  │     MONITORING      │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│         ▼                ▼                     ▼            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   ALERTING ENGINE                    │    │
│  │         (PagerDuty, Slack, Email, SMS)               │    │
│  └──────────────────────────┬──────────────────────────┘    │
│                             │                               │
│                             ▼                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              OBSERVABILITY DASHBOARDS                 │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │    │
│  │  │Executive │  │Operational│  │   Technical      │  │    │
│  │  │Dashboard │  │Dashboard  │  │   Dashboard      │  │    │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Monitoring Zones

| Zone | Description | Coverage |
|------|-------------|----------|
| **Z1 - Salesforce Core** | CRM, Service Cloud, Sales Cloud, Platform Events | 100% |
| **Z2 - Data Cloud** | CDP, identity resolution, data pipelines | 100% |
| **Z3 - MuleSoft** | APIs, integrations, runtime | 100% |
| **Z4 - Experience Cloud** | Dealer portal, customer portal | 100% |
| **Z5 - Agentforce** | AI agents, actions, knowledge base | 100% |
| **Z6 - Infrastructure** | AWS, databases, network | Critical paths |

---

## 2. Logging Strategy

### 2.1 Log Types and Retention

| Log Type | Source | Retention | Storage | Access |
|----------|--------|-----------|---------|--------|
| **Debug Logs** | Salesforce Apex | 24 hours (active), 7 days (archived) | Salesforce Storage | Developers, Admins |
| **Event Logs** | Salesforce Platform Events | 3 years | Salesforce Storage + Data Cloud | Security, Compliance |
| **Integration Logs** | MuleSoft | 90 days | AWS S3 + CloudWatch | Integration team |
| **API Logs** | Salesforce REST/SOAP/Bulk | 1 year | Salesforce Storage | Architects, Security |
| **Login History** | Salesforce Auth | 6 months | Salesforce Storage | Security, Compliance |
| **Setup Audit Trail** | Salesforce Config | 6 months | Salesforce Storage | Admins, Security |
| **System Logs** | OS/Infrastructure | 30 days | CloudWatch | DevOps, Infrastructure |

### 2.2 Log Collection Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LOG SOURCES                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Salesforce  │  │  MuleSoft    │  │   AWS Services   │  │
│  │  Platform    │  │  Runtime     │  │   (CloudWatch)   │  │
│  │  Events      │  │  Logs        │  │                  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │            │
│         └─────────────────┼────────────────────┘            │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              LOG AGGREGATION (ELK Stack)             │    │
│  │  Elasticsearch + Logstash + Kibana                  │    │
│  └──────────────────────────┬──────────────────────────┘    │
│                             │                               │
│         ┌───────────────────┼───────────────────┐           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Alerting    │  │  Dashboards  │  │   Long-term      │  │
│  │  (Grafana)   │  │  (Kibana)    │  │   Archive        │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 Log Analysis Patterns

| Pattern | Detection Method | Action |
|---------|-----------------|--------|
| **Exception Spike** | Error rate >2x baseline in 5 min | Alert L2, investigate root cause |
| **Slow Transaction** | P95 latency >5 seconds | Alert architects, review query performance |
| **Failed Login** | >10 failed logins per user per hour | Alert Security, temporary lockout |
| **Data Export** | >10K records exported | Alert DPO, audit trail review |
| **Bulk API Job Failure** | Job failure rate >5% | Alert Data team, retry logic review |

---

## 3. Metrics Collection

### 3.1 Platform Metrics

| Metric | Source | Frequency | Target | Alert Threshold |
|--------|--------|-----------|--------|-----------------|
| **Platform Availability** | Synthetic monitors | 1 min | 99.9% | <99.5% (15 min) |
| **API Response Time (P50)** | Salesforce Limits API | 5 min | <500ms | >1s (5 min) |
| **API Response Time (P95)** | Salesforce Limits API | 5 min | <2s | >5s (5 min) |
| **API Response Time (P99)** | Salesforce Limits API | 5 min | <5s | >10s (5 min) |
| **Concurrent API Calls** | Salesforce Limits API | 1 min | <70% of limit | >80% (5 min) |
| **Daily API Calls** | Salesforce Limits API | 15 min | <90% of limit | >95% (1 hour) |
| **Data Storage Used** | Salesforce Storage API | 1 hour | <80% | >85% (1 hour) |
| **CPH (Concurrent)** | Salesforce Limits API | 1 min | <70% of limit | >80% (5 min) |
| **CPH (Total)** | Salesforce Limits API | 1 hour | <75% of limit | >85% (1 hour) |
| **Bulk API Job Success** | Salesforce Bulk API | 15 min | >99% | <95% (15 min) |
| **Platform Event Delivery** | Salesforce Event Bus | 5 min | >99% | <95% (5 min) |
| **Data Cloud Sync Lag** | Data Cloud Monitoring | 5 min | <5 min | >15 min (15 min) |
| **MuleSoft Uptime** | MuleSoft Manager | 1 min | 99.95% | <99.9% (5 min) |
| **MuleSoft Response Time** | MuleSoft Metrics | 5 min | <1s | >3s (5 min) |
| **MuleSoft Error Rate** | MuleSoft Metrics | 5 min | <1% | >5% (5 min) |

### 3.2 Data Quality Metrics

| Metric | Source | Frequency | Target | Alert Threshold |
|--------|--------|-----------|--------|-----------------|
| **Duplicate Rate** | Data Cloud Matching | Daily | <2% | >5% |
| **Data Completeness** | Data Cloud Profiles | Daily | >95% | <90% |
| **Identity Match Rate** | Data Cloud Identity | Daily | >85% | <70% |
| **Record Accuracy** | Manual sampling | Weekly | >98% | <95% |
| **Sync Error Rate** | Integration logs | 15 min | <1% | >5% |

### 3.3 User Adoption Metrics

| Metric | Source | Frequency | Target | Alert Threshold |
|--------|--------|-----------|--------|-----------------|
| **Daily Active Users (DAU)** | Salesforce Reports | Daily | >80% of licensed | <70% |
| **Login Success Rate** | Login History | 15 min | >99% | <98% |
| **Session Duration** | Salesforce Analytics | Daily | >15 min | <10 min |
| **Feature Adoption** | Event Monitoring | Weekly | >70% core features | <50% |
| **Case Resolution Time** | Service Cloud | Daily | <15 min | >20 min |
| **Agentforce Escalation Rate** | Agentforce Logs | Daily | <10% | >20% |

### 3.4 Integration Metrics

| Metric | Source | Frequency | Target | Alert Threshold |
|--------|--------|-----------|--------|-----------------|
| **MuleSoft Throughput** | MuleSoft Metrics | 5 min | <70% of capacity | >85% |
| **API Latency (End-to-End)** | Distributed tracing | 5 min | <3s | >8s |
| **Message Queue Depth** | MuleSoft Queues | 5 min | <1K messages | >5K messages |
| **Certificate Expiry** | Certificate inventory | Daily | >30 days remaining | <7 days remaining |
| **Integration Success Rate** | MuleSoft Logs | 15 min | >99% | <95% |

---

## 4. Dashboard Strategy

### 4.1 Executive Dashboard

**Audience:** CTO, CIO, Board Members  
**Refresh:** Real-time (1 min)  
**Platform:** Tableau / Salesforce Dashboards

| Widget | Metric | Visualization |
|--------|--------|---------------|
| **Platform Health** | Availability % (rolling 30 days) | Gauge chart, target 99.9% |
| **Incident Summary** | SEV-1/2 count this month | Bar chart vs. target |
| **User Adoption** | DAU / MAU ratio | Line chart, trend |
| **Cost Dashboard** | Monthly cloud spend | Stacked bar chart by service |
| **Risk Score** | Top 5 risks | Heat map |
| **SLA Compliance** | Internal SLA achievement | Gauge chart |
| **Dealer Onboarding** | Dealers migrated vs. total | Progress bar |

### 4.2 Operational Dashboard

**Audience:** Operations team, L2/L3 engineers  
**Refresh:** 5 minutes  
**Platform:** Grafana / Salesforce Dashboards

| Widget | Metric | Visualization |
|--------|--------|---------------|
| **Platform Status** | Service health by zone | Traffic light (green/yellow/red) |
| **Active Incidents** | Open incidents by severity | List with age |
| **API Usage** | Daily API calls vs. limit | Area chart with threshold line |
| **Governor Limits** | Concurrent/Total CPH | Line charts with alerts |
| **Data Cloud Lag** | Sync delay by data zone | Bar chart |
| **MuleSoft Health** | Runtime status, error rate | Multi-line chart |
| **Recent Deployments** | Last 24 hours changes | Table with status |
| **On-Call Status** | Current on-call engineer | Card with contact info |

### 4.3 Technical Dashboard

**Audience:** Architects, Engineers, DevOps  
**Refresh:** 1 minute  
**Platform:** Grafana / CloudWatch

| Widget | Metric | Visualization |
|--------|--------|---------------|
| **Error Rate** | Apex/Integration errors per minute | Time series with alert line |
| **Slow Transactions** | P95/P99 API response time | Time series |
| **Query Performance** | Slow SOQL queries | Table with count |
| **Batch Job Status** | Active, queued, failed jobs | Status counters |
| **Data Storage Trend** | Storage growth projection | Line chart with forecast |
| **Event Bus Health** | Publish/delivery rates | Dual axis chart |
| **Code Coverage** | Apex test coverage % | Gauge chart |
| **Open Defects** | Bugs by severity | Stacked bar chart |

---

## 5. Alerting Strategy

### 5.1 Alert Severity and Channels

| Alert Severity | Description | Notification Channels | Response Time |
|---------------|-------------|---------------------|---------------|
| **P1 (Critical)** | SEV-1 incident or platform down | PagerDuty (phone), SMS, Slack #ops-warroom, email | 15 min |
| **P2 (High)** | SEV-2 incident or significant degradation | PagerDuty (app), Slack #ops-escalation, email | 1 hour |
| **P3 (Medium)** | SEV-3 incident or warning threshold | Slack #ops-alerts, email | 4 hours |
| **P4 (Low)** | Informational, no action needed | Email digest, weekly summary | Next business day |

### 5.2 Alert Routing

| Component | P1 Route | P2 Route | P3 Route |
|-----------|---------|---------|---------|
| **Salesforce Core** | Platform Architect + CTO | L2 On-Call | Salesforce Admin |
| **Data Cloud** | Data Architect + Platform Architect | L2 Data Specialist | Data Team |
| **MuleSoft** | Integration Architect + Platform Architect | L2 Integration Specialist | Integration Team |
| **Experience Cloud** | Frontend Lead + Platform Architect | L2 Frontend Engineer | Frontend Team |
| **Agentforce** | AI Lead + Platform Architect | L2 AI Specialist | AI Team |
| **Infrastructure** | Cloud Architect + Platform Architect | L2 DevOps | DevOps Team |

### 5.3 Alert Throttling

```
Alert received
    │
    ▼
Is this a duplicate? (same alert in last 5 min)
    │
    ├── Yes → Suppress, increment counter
    │
    ▼
Is this a known maintenance window?
    │
    ├── Yes → Log, suppress notification
    │
    ▼
Is escalation path engaged?
    │
    ├── No → Send notification
    └── Yes → Log only (on-call already engaged)
```

---

## 6. Synthetic Monitoring

### 6.1 Synthetic Test Suite

| Test Name | Frequency | Scenario | Alert Condition |
|-----------|-----------|----------|----------------|
| **Salesforce Login** | 1 min | SSO login via test user | Failure >2 attempts |
| **Case Creation** | 5 min | Create test case in Service Cloud | Failure or >30s |
| **Data Cloud Query** | 5 min | Query customer profile by ID | Failure or >10s |
| **MuleSoft API Health** | 1 min | Ping critical API endpoints | HTTP != 200 |
| **Dealer Portal Load** | 5 min | Load dealer portal homepage | Failure or >5s |
| **Agentforce Response** | 5 min | Send test query to AI agent | Failure or >10s |
| **Bulk API Job** | 15 min | Submit test bulk job | Failure or job stuck |
| **Email Deliverability** | 30 min | Send test email, check delivery | Not received in 5 min |
| **Data Sync Verification** | 15 min | Verify end-to-end data sync | Sync lag >15 min |

### 6.2 Synthetic Monitoring Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              SYNTHETIC MONITORING INFRASTRUCTURE             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              SCHEDULER (K8s CronJobs)                │    │
│  │  Executes tests on schedule from locations worldwide │    │
│  └──────────────────────────┬──────────────────────────┘    │
│                             │                               │
│         ┌───────────────────┼───────────────────┐           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  North       │  │  Europe      │  │   APAC           │  │
│  │  America     │  │  (Frankfurt) │  │   (Tokyo)        │  │
│  │  (Virginia)  │  │              │  │                  │  │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘  │
│         │                 │                    │            │
│         └─────────────────┼────────────────────┘            │
│                           │                                 │
│                           ▼                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   RESULTS COLLECTOR                  │    │
│  │  Success/Failure, Latency, Detailed Error Info       │    │
│  └──────────────────────────┬──────────────────────────┘    │
│                             │                               │
│         ┌───────────────────┼───────────────────┐           │
│         ▼                   ▼                   ▼           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Alerting    │  │  Dashboards  │  │   Historical     │  │
│  │  (PagerDuty) │  │  (Grafana)   │  │   Storage        │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 6.3 Global Test Locations

| Location | Provider | Purpose |
|----------|----------|---------|
| **Virginia, USA** | AWS US-East-1 | North America baseline |
| **Oregon, USA** | AWS US-West-2 | West coast / Pacific latency |
| **Frankfurt, Germany** | AWS EU-Central-1 | EMEA baseline |
| **London, UK** | AWS EU-West-2 | UK latency |
| **Tokyo, Japan** | AWS AP-Northeast-1 | APAC baseline |
| **Singapore** | AWS AP-Southeast-1 | Southeast Asia latency |
| **Sydney, Australia** | AWS AP-Southeast-2 | Australia latency |
| **São Paulo, Brazil** | AWS SA-East-1 | Latin America baseline |
| **Mumbai, India** | AWS AP-South-1 | India latency |

---

## 7. SLA Monitoring

### 7.1 SLA Definitions

| SLA | Target | Measurement | Reporting |
|-----|--------|-------------|-----------|
| **Platform Availability** | 99.9% (8.76 hours downtime/year) | Synthetic monitors | Monthly |
| **API Uptime** | 99.95% | Synthetic + API logs | Monthly |
| **Incident Response** | SEV-1: 15 min, SEV-2: 1 hour | PagerDuty timestamps | Per incident |
| **Incident Resolution** | SEV-1: 4 hours, SEV-2: 8 hours | War room close timestamps | Per incident |
| **Data Freshness** | <1 hour RPO | Data Cloud sync lag | Real-time |
| **Dealer Portal Availability** | 99.5% | Synthetic monitors | Monthly |
| **Agentforce Accuracy** | >90% first-contact resolution | Agentforce logs | Weekly |
| **Case Resolution Time** | <15 min (L1) | Service Cloud reports | Daily |

### 7.2 SLA Dashboard

| Widget | Metric | Target | Current |
|--------|--------|--------|---------|
| **Platform Uptime** | % uptime last 30 days | 99.9% | [live] |
| **API Availability** | % uptime last 30 days | 99.95% | [live] |
| **SEV-1 Response Time** | Avg time to respond | 15 min | [live] |
| **SEV-1 Resolution Time** | Avg time to resolve | 4 hours | [live] |
| **Data Freshness** | Max sync lag | 1 hour | [live] |
| **SLA Compliance** | % of SLAs met this month | 100% | [live] |
| **Breached SLAs** | Count this month | 0 | [live] |

---

## 8. Compliance Monitoring

### 8.1 GDPR/CCPA Monitoring

| Control | Monitoring Method | Frequency | Alert |
|---------|------------------|-----------|-------|
| **Consent Records** | Data Cloud consent profiles | Daily | Missing consent for new records |
| **Data Subject Requests** | Case queue | Real-time | DSR case open >72 hours |
| **Right to Erasure** | Audit logs | Daily | Deletion not completed in 30 days |
| **Data Portability** | Export logs | Weekly | Export not completed in 30 days |
| **Breach Detection** | Security monitoring | Real-time | Anomaly detected |

### 8.2 SOX Compliance Monitoring

| Control | Monitoring Method | Frequency | Alert |
|---------|------------------|-----------|-------|
| **Segregation of Duties** | Permission set audit | Weekly | Conflict detected |
| **Financial Data Access** | Login + data access logs | Daily | Unauthorized access |
| **Change Management** | Setup Audit Trail | Real-time | Unapproved change |
| **Quarterly Close** | Process checklist | Quarterly | Incomplete checklist |

---

## 9. Cost Monitoring

### 9.1 Cloud Cost Tracking

| Service | Cost Center | Budget | Alert Threshold |
|---------|-------------|--------|-----------------|
| **Salesforce Licenses** | IT Platform | $X M/month | >110% of budget |
| **Data Cloud** | IT Platform | $X M/month | >110% of budget |
| **MuleSoft** | IT Integration | $X M/month | >110% of budget |
| **Experience Cloud** | IT Platform | $X M/month | >110% of budget |
| **Agentforce** | IT Platform | $X M/month | >110% of budget |
| **Tableau** | IT Analytics | $X M/month | >110% of budget |
| **AWS Infrastructure** | IT Infrastructure | $X M/month | >110% of budget |
| **Support/Maintenance** | IT Platform | $X M/month | >110% of budget |

### 9.2 Cost Optimization Alerts

| Alert | Trigger | Action |
|-------|---------|--------|
| **Storage Growth** | >20% MoM growth | Review archive policy |
| **API Volume Spike** | >30% MoM increase | Review integration efficiency |
| **License Utilization** | <70% active users | Consider license renegotiation |
| **Idle Resources** | Unused MuleSoft workers | Decommission or downsize |

---

## 10. Appendix

### 10.1 Monitoring Tool Stack

| Purpose | Tool | URL |
|---------|------|-----|
| **Alerting** | PagerDuty | [pagerduty.com](https://pagerduty.com) |
| **Dashboards** | Grafana | [grafana.com](https://grafana.com) |
| **Log Aggregation** | ELK Stack | Internal |
| **APM** | New Relic / Salesforce Health Canvas | Internal |
| **Synthetic Monitoring** | Kubernetes CronJobs + AWS | Internal |
| **Cost Management** | AWS Cost Explorer + Salesforce Billing | Internal |
| **Status Page** | Statuspage / Salesforce Trust | Internal |

### 10.2 Key Contacts

| Role | Contact | Slack |
|------|---------|-------|
| **Monitoring Lead** | [Name] | @monitoring-lead |
| **Platform Architect** | [Name] | @platform-architect |
| **Security Architect** | [Name] | @security-architect |
| **DevOps Lead** | [Name] | @devops-lead |
| **On-Call (L2)** | PagerDuty rotation | #ops-escalation |

---

**Document Control**
- **Owner:** Operations Lead, Enterprise Salesforce Architecture Council
- **Review Cycle:** Quarterly
- **Next Review:** 2026-10-28
- **Change History:**
  - v1.0 (2026-07-28): Initial creation
