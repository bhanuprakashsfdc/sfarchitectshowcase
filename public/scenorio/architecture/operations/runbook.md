# Operations Runbook
**Global Customer Unification Platform**  
**Version:** 1.0  
**Date:** 2026-07-28  
**Owner:** Operations Lead, Enterprise Salesforce Architecture Council  
**Classification:** Confidential - Internal Use Only

---

## 1. Support Model Overview

### 1.1 Organizational Structure

| Tier | Role | Scope | Team Composition |
|------|------|-------|------------------|
| **L1 - Service Desk** | Incident reception, initial triage, password resets, standard troubleshooting | All users, 9 regional contact centers | 24x7 coverage, 15 agents per shift, regional language support |
| **L2 - Platform Engineering** | Technical investigation, configuration changes, integration debugging, data fixes | Platform-specific issues (Salesforce, Data Cloud, MuleSoft, Agentforce) | 8 Salesforce architects, 6 MuleSoft engineers, 4 Data Cloud specialists |
| **L3 - Subject Matter Experts** | Code-level fixes, architectural changes, vendor escalation, infrastructure | Complex incidents, performance bottlenecks, security events | Salesforce TAM, MuleSoft TAM, Security team, CTO on-call |

### 1.2 Regional Coverage Matrix

| Region | Contact Center Location | Time Zone | L1 Agents | L2 Specialist | Languages |
|--------|------------------------|-----------|-----------|---------------|-----------|
| North America | Detroit, MI | EST/CST | 30 | 4 | English, Spanish |
| Latin America | Mexico City | CST | 15 | 2 | Spanish, Portuguese |
| EMEA | Frankfurt | CET | 25 | 4 | English, German, French |
| APAC | Tokyo | JST | 20 | 3 | English, Japanese, Chinese |

---

## 2. Escalation Matrix

### 2.1 Severity Definitions

| Severity | Definition | Business Impact | Examples |
|----------|-----------|-----------------|----------|
| **SEV-1 (Critical)** | Complete platform outage or data breach affecting production | 99.9% SLA breach imminent, >10K users affected, revenue impact >$1M/hr | Platform down, data breach, payment processing failure |
| **SEV-2 (High)** | Major functionality impaired with workaround | Significant user impact, customer-facing degradation | Service Cloud down in one region, API failures >50%, Data Cloud sync stopped |
| **SEV-3 (Medium)** | Minor functionality affected, workaround available | Limited user impact, single brand or region | Report failures, integration delays, minor UI defects |
| **SEV-4 (Low)** | Cosmetic or enhancement requests | No business impact | UI polish, documentation, minor config changes |

### 2.2 Escalation Triggers

| Issue Type | SEV-1 Response | SEV-2 Response | SEV-3 Response | SEV-4 Response |
|-----------|---------------|---------------|---------------|---------------|
| **Platform Outage** | 15 min | 1 hour | 4 hours | Next business day |
| **Data Loss/Corruption** | 15 min | 30 min | 2 hours | Next business day |
| **Security Incident** | 15 min | 30 min | 4 hours | Next business day |
| **Integration Failure** | 30 min | 1 hour | 4 hours | Next business day |
| **Performance Degradation** | 30 min | 2 hours | 8 hours | Next business day |
| **Configuration Change** | N/A | N/A | 4 hours | Next business day |

### 2.3 Escalation Chain

```
L1 Agent → L2 Engineer → L3 Specialist → Platform Architect → CTO
  15 min      30 min       1 hour          2 hours        4 hours
```

| Escalation Level | Contact Method | Response Time | Authority |
|-----------------|---------------|---------------|-----------|
| L1 to L2 | Slack #ops-escalation + PagerDuty | 15 min | Assign to specialist |
| L2 to L3 | Slack #ops-escalation + Phone | 30 min | Authorize emergency changes |
| L3 to Platform Architect | Phone + Email | 1 hour | Architecture decisions |
| Platform Architect to CTO | Phone + SMS | 2 hours | Business impact decisions |

---

## 3. Incident Management Process

### 3.1 Severity Response Times (SLA)

| Severity | Detection | Response | Resolution Target | Communication |
|----------|-----------|----------|-------------------|---------------|
| **SEV-1** | 5 min | 15 min | 4 hours | Every 30 min to exec team |
| **SEV-2** | 15 min | 1 hour | 8 hours | Every 2 hours to ops lead |
| **SEV-3** | 30 min | 4 hours | 24 hours | Daily to ops manager |
| **SEV-4** | 1 hour | 8 hours | 5 business days | Weekly summary |

### 3.2 Incident Lifecycle

```
DETECT → TRIAGE → CONTAIN → ERADICATE → RECOVER → REVIEW
   |        |         |          |          |         |
   |        |         |          |          |         └─ Post-mortem, lessons learned
   |        |         |          |          └─ Restore service, validate
   |        |         |          └─ Remove threat, fix root cause
   |        |         └─ Stop bleeding, isolate affected components
   |        └─ Classify severity, assign owner
   └─ Monitoring alert, user report, synthetic check
```

### 3.3 Incident Response Playbooks

#### Playbook 1: Platform Outage
1. **Immediate (0-5 min):**
   - Confirm outage via Health Canvas and synthetic monitors
   - Open War Room in Slack #ops-warroom
   - Notify L2 on-call via PagerDuty
   - Update status page (internal and external if customer-facing)

2. **Investigation (5-30 min):**
   - Check Salesforce Status page (status.salesforce.com)
   - Review debug logs for exceptions
   - Check MuleSoft runtime status
   - Verify Data Cloud pipeline health
   - Identify affected services and regions

3. **Mitigation (30-60 min):**
   - Implement traffic throttling if governor limits reached
   - Switch to read-only mode if data integrity at risk
   - Engage Salesforce support (Case escalation)
   - Deploy emergency hotfix if configuration issue

4. **Resolution (1-4 hours):**
   - Monitor service recovery
   - Validate all regions restored
   - Communicate resolution to stakeholders
   - Close status page

5. **Post-Incident (24-48 hours):**
   - Schedule post-mortem
   - Document timeline and root cause
   - Update runbook with lessons learned
   - Implement preventive measures

#### Playbook 2: Data Loss/Corruption
1. **Immediate:**
   - Isolate affected data via validation rules
   - Engage Data Cloud recovery team
   - Assess scope: records affected, brands impacted

2. **Investigation:**
   - Review trigger logs and batch jobs
   - Check integration logs for failed ETL
   - Identify corrupt records and upstream cause

3. **Mitigation:**
   - Pause affected integrations
   - Roll back last successful batch if available
   - Restore from backup if necessary

4. **Resolution:**
   - Run data quality job
   - Reconcile with source systems
   - Notify affected users/brands

5. **Post-Incident:**
   - Data integrity audit
   - Update validation rules
   - Review change management process

#### Playbook 3: Security Incident
1. **Immediate:**
   - Alert Security team and CISO
   - Preserve logs (do not delete)
   - Disable suspicious accounts
   - Rotate exposed credentials

2. **Investigation:**
   - Review login history and event logs
   - Check for data exfiltration
   - Identify attack vector (phishing, vulnerability, misconfiguration)

3. **Mitigation:**
   - Implement IP restrictions if needed
   - Enable MFA for affected users
   - Deploy security patch

4. **Resolution:**
   - Legal/compliance notification if data breach
   - Customer notification per GDPR/CCPA requirements
   - System hardening

5. **Post-Incident:**
   - Security audit
   - Update incident response plan
   - Security training for admins

#### Playbook 4: Integration Failure (MuleSoft/API)
1. **Immediate:**
   - Check MuleSoft runtime status
   - Verify API endpoint health
   - Review error logs in MuleSoft Manager

2. **Investigation:**
   - Check rate limits and quotas
   - Verify certificate expiration
   - Review payload sizes and timeouts
   - Check downstream system availability

3. **Mitigation:**
   - Enable circuit breaker pattern
   - Route to fallback/legacy system
   - Increase timeout thresholds temporarily

4. **Resolution:**
   - Fix underlying cause
   - Replay failed messages
   - Validate end-to-end flow

5. **Post-Incident:**
   - Review API limits
   - Update error handling
   - Consider async processing improvements

---

## 4. Change Request Process

### 4.1 Change Advisory Board (CAB)

| Role | Responsibility | Approval Authority |
|------|---------------|-------------------|
| **Change Manager** | Review, schedule, communicate | All changes |
| **Security Architect** | Security review | All changes touching security/permissions |
| **Data Architect** | Data model impact | Schema changes, data migrations |
| **Integration Architect** | API/Integration impact | MuleSoft, API changes |
| **Operations Lead** | Operational readiness | All production changes |

**CAB Meeting Schedule:** Weekly (Tuesdays 10:00 AM EST)

### 4.2 Change Categories and Windows

| Category | Description | Maintenance Window | Approval |
|----------|-------------|-------------------|----------|
| **Standard** | Pre-approved, low risk | Business hours | Change Manager |
| **Normal** | Requires review, medium risk | Weekends 02:00-06:00 EST | CAB |
| **Emergency** | Production issue fix, SEV-1/2 | Immediate with retrospective | Platform Architect |
| **Major** | Architectural changes, >4 hour downtime | Scheduled quarterly | CAB + CTO |

### 4.3 Change Request Template

```yaml
change_id: CHG-2026-XXXX
title: 
description:
requested_by:
requested_date:
implementation_date:
rollback_plan:
testing_evidence:
risk_assessment:
  severity: [SEV-1/2/3/4]
  impact: [High/Medium/Low]
  likelihood: [High/Medium/Low]
approval_chain:
  - change_manager:
  - security_architect:
  - data_architect:
  - integration_architect:
post_implementation_review: [Required/Not Required]
```

### 4.4 Deployment Pipeline

```
DEVELOP → BUILD → TEST → STAGING → PRODUCTION
   |        |       |        |           |
   |        |       |        |           └─ Blue/Green deployment, feature flags
   |        |       |        └─ UAT, data migration validation
   |        |       └─ Automated tests, security scan
   |        └─ CI validation, linting
   └─ Local development, Git branching
```

---

## 5. On-Call Rotation

### 5.1 Rotation Schedule

| Week | L2 Primary | L2 Secondary | L3 Primary | L3 Secondary |
|------|-----------|-------------|-----------|-------------|
| W1 | Engineer A | Engineer B | Architect A | Architect B |
| W2 | Engineer C | Engineer D | Architect C | Architect D |
| W3 | Engineer E | Engineer F | Architect A | Architect B |
| W4 | Engineer G | Engineer H | Architect C | Architect D |

### 5.2 On-Call Responsibilities

**L2 On-Call (Primary):**
- Respond to PagerDuty alerts within SLA
- Initial investigation and triage
- Execute standard runbooks
- Escalate to L3 if unresolved in 30 min

**L2 On-Call (Secondary):**
- Backup for primary if unavailable
- Assist with complex investigations
- Cross-train on all platform components

**L3 On-Call:**
- Escalation point for SEV-1/2 incidents
- Architecture decisions during outages
- Vendor liaison (Salesforce, MuleSoft)
- Emergency change authorization

### 5.3 Handoff Protocol

1. **Daily Handoff:** 09:00 EST via Slack #ops-handoff
   - Active incidents summary
   - Scheduled changes for the day
   - Known issues and workarounds

2. **Weekly Handoff:** Friday 17:00 EST
   - Week in review
   - Upcoming CAB items
   - Maintenance windows scheduled

3. **Emergency Handoff:** If primary unresponsive for >30 min during SEV-1/2
   - Secondary automatically engaged
   - Escalation to L3

---

## 6. Common Issue Resolution Guides

### 6.1 Governor Limit Alerts

| Limit | Current Threshold | Warning | Critical | Resolution |
|-------|------------------|---------|----------|------------|
| **API Calls** | 90% of daily limit | 75% | 90% | Review batch jobs, implement async, request limit increase |
| **Data Storage** | 85% of allocated | 75% | 85% | Archive old data, purchase additional storage |
| **CPH (Concurrent)** | 80% of limit | 60% | 80% | Optimize long-running transactions, implement queueing |
| **CPH (Total)** | 75% of daily | 60% | 75% | Review peak usage patterns, implement throttling |

### 6.2 Data Cloud Pipeline Failures

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Ingestion lag >1 hour | Source system delay | Check source system status, increase batch frequency |
| Matching failures | Identity resolution conflict | Review match rules, adjust confidence thresholds |
| Data sync stopped | MuleSoft connector failure | Restart connector, verify credentials |
| Profile count mismatch | Duplicate detection too aggressive | Adjust deduplication rules |

### 6.3 MuleSoft Integration Issues

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| 503 errors | Backend system down | Enable circuit breaker, route to fallback |
| Timeout errors | Network latency or slow response | Increase timeout, optimize query |
| Auth failures | Expired certificate or token | Rotate credentials, update keystore |
| Message backlog | Consumer slower than producer | Scale consumers, review batch size |

### 6.4 Agentforce Performance Issues

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| Response time >5 sec | AI model cold start | Pre-warm model, increase cache size |
| Low accuracy | Training data stale | Retrain model, review knowledge base |
| Action failures | Target system error | Check integration health, implement retry logic |
| Context loss | Session timeout | Increase timeout, implement state persistence |

---

## 7. Vendor Support Contacts

| Vendor | Support Tier | Phone | Portal | SLA |
|--------|-------------|-------|--------|-----|
| Salesforce | Premier+ | 1-800-NO-SOFTWARE | success.salesforce.com | 1 hour critical |
| MuleSoft | Premier | 1-877-572-8838 | anypoint.mulesoft.com/support | 1 hour critical |
| Tableau | Premium | 1-866-437-7537 | support.tableau.com | 2 hours critical |
| AWS | Enterprise | 1-877-633-4388 | aws.amazon.com/premiumsupport | 15 min critical |

---

## 8. Communication Templates

### 8.1 Internal Incident Notification

```
INCIDENT ALERT - SEV-[X]
Platform: Global Customer Unification Platform
Incident ID: INC-2026-XXXX
Status: [Investigating/Mitigating/Resolved]
Impact: [Description]
Start Time: [UTC]
Current ETA: [Time]
War Room: [Slack link]
Primary: [Name]
```

### 8.2 External Customer Notification

```
Service Status Update
We are currently experiencing [issue description].
Our team is actively working to resolve this issue.
We apologize for the inconvenience and will provide updates every [X] minutes.
For real-time updates, visit: [status page URL]
```

---

## 9. Appendix

### 9.1 Key System URLs

| System | URL | Access |
|--------|-----|--------|
| Salesforce Production | login.salesforce.com | SSO |
| Salesforce Setup | [custom domain] | Admin only |
| MuleSoft Manager | anypoint.mulesoft.com | Integration team |
| Data Cloud | [custom domain] | Data team |
| Tableau | [custom domain] | Analytics team |
| PagerDuty | [custom domain] | On-call team |
| Status Page | [custom domain] | Public |

### 9.2 Emergency Procedures

| Scenario | Action |
|----------|--------|
| Platform completely down | Activate disaster recovery, notify CTO |
| Data breach detected | Engage Security, legal hold, notify DPO |
| Ransomware attack | Isolate systems, engage incident response |
| Natural disaster (regional) | Failover to secondary data center |
| Key personnel unavailable | Activate succession plan, engage vendor TAMs |

---

**Document Control**
- **Owner:** Operations Lead, Enterprise Salesforce Architecture Council
- **Review Cycle:** Quarterly
- **Next Review:** 2026-10-28
- **Change History:**
  - v1.0 (2026-07-28): Initial creation
