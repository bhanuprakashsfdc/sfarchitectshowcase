# 5. Security Architecture
## Global Customer Unification Platform - Fortune 100 Automotive Manufacturer

**Version:** 1.0  
**Date:** 2026-07-28  
**Architecture Review Board:** Enterprise Salesforce Architecture Council  
**Classification:** Confidential - Board Approved


## 1. Executive Overview

This document defines the enterprise security architecture for the global customer unification platform. It covers authentication, authorization, encryption, data protection, compliance controls, and penetration testing requirements for a Salesforce org serving 68 million customers and 11,500 dealers across 47 countries with strict data residency requirements.


## 2. Authentication

### 2.1 Identity Provider Architecture

The primary identity provider is **Okta** (existing enterprise IdP), federated with Salesforce via **SAML 2.0**. For future-proofing and regional heterogeneities where Okta is not available, a secondary IdP federation is supported via **Microsoft Azure AD**.

```
Okta IdP (Primary)
    |
    | SAML 2.0 (SAML Assertion + Digital Signature)
    v
Salesforce Login Service (My Domain)
    |
    | Session Cookie (HttpOnly, Secure, SameSite=Strict)
    v
Salesforce Authentication Layer
    |
    +---> SSO for employees (92,000)
    +---> SSO for dealer employees (11,500)
    +---> SSO for brand-specific users (approx. 10,000 marketing/sales)
```

### 2.2 Authentication Methods

| User Segment | Authentication Method | Identity Provider | Multi-Factor |
|--------------|----------------------|-------------------|--------------|
| **Employees (92,000)** | SAML SSO + MFA | Okta | Required (Okta Verify, Duo, or YubiKey) |
| **Dealer Employees (11,500)** | SAML SSO + MFA | Okta or Dealer-specific IdP | Required (similar to employees) |
| **External Retail Customers** | Email/Password (Salesforce Login) + MFA (optional) | Salesforce B2B/B2C Commerce | Optional via Experience Cloud, required for sensitive data ops |
| **EV Mobile App Users** | OAuth 2.0 Password flow + PKCE | Salesforce via My Domain | Device trust + biometric |
| **API Integrations (MuleSoft, etc.)** | OAuth 2.0 Client Credentials | MuleSoft Anypoint Connected App | No MFA (compare certificate-based mTLS) |
| **DMS/ERP Integrations (Legacy)** | OAuth 2.0 Client Credentials + mTLS | Anypoint | mTLS enforced |
| **IoT/Vehicle Gateway** | JWT Bearer + Certificate Pinning | AWS IoT Core | No MFA (cert-based auth) |
| **Platform Events Consumer (internal)** | Named Credential (OAuth 2.0 client credentials) | Anypoint | No MFA |
| **System Administrators** | SAML SSO + MFA + Hardware Token (YubiKey) | Okta + Salesforce Conditional Access | Yes, multiple factors |

### 2.3 Salesforce Login Configuration

- **My Domain:** Enabled on production (custom.my-domain.global-auto.crm, login.global-auto.crm)
- **Login Flow Policies:** Block login from non-compliant IP ranges
- **IP Ranges:** Configured per profile/permission set ( restrict Salesforce login to known employee/dealer IPs)
- **Session Settings:** Session timeout 8 hours (configurable by region); "Lock sessions to the IP address from which they originated" = enabled
- **Network Access:** Trusted IP ranges added for integration service accounts (MuleSoft IPs, MQ broker endpoints)
- **Login Hours:** Restricted for non-employee profiles

### 2.4 Multi-Factor Authentication (MFA)

- **Mandatory:** All users (employees, dealers, admin)
- **MFA Methods:**
  - OK: Salesforce Authenticator
  - OK: Okta Verify (preferred when SAML)
  - OK: Duo Push
  - OK: YubiKey (high-risk users)
  - Restricted: SMS (last resort for mobile only)
- **MFA Enforcement:** Login Hour triggered by user login; high-risk login (new device, geo velocity anomaly) triggers re-auth
- **MFA Registry:** Salesforce identifies MFA status per user login history; stored in LoginHistory (Audience-Critical)

### 2.5 Session Security

| Setting | Value |
|---------|-------|
| Session Timeout | 8 hours for employees, 2 hours for guests |
| Session Lock to IP | Enabled |
| Session Lock to Traditional Users (non-SSO) | Disabled (not applicable) |
| Harden Session | Enabled |
| Cross-org Session Policy | `Locked` (requiring login again for different org) |
| API Security Token | Required for non-SSO API clients |
| Single Logout (SAML) | Enabled |
| Force Re-Auth on Security Critical Actions | Enabled (password change, API enable, LS copy) |

### 2.6 Password Policy

| Setting | Standard |
|---------|----------|
| Password length | Minimum 14 characters |
| Password complexity | Cannot contain username, cannot reuse last 24 passwords |
| Password expiration | 90 days for admins; 180 days for standard users |
| Password history | 24 passwords retained |
| Reset password via email/username | Enabled with CAPTCHA after 3 failed attempts |
| Password never expires | Not enabled |
| Minimum password age | 24 hours |
| Lockout policy | 5 failed attempts, lockout 15 minutes, notification to admin |

## 3. Authorization

### 3.1 Permission Model

Salesforce authorization is role-hierarchy-based with permission-sets and sharing rules. Given 14 brands and 47 countries, we use **3-tier authorization model**:

| Layer | Mechanism | Scope | Examples |
|-------|-----------|-------|---------|
| **Org-Wide Defaults (OWD)** | Object-level | Grants/minimizes basal access | Account: Private; Case: Private |
| **Role Hierarchy** | Hierarchical access | Users see data of subordinates | VP of Sales sees all brand sales; Brand Director sees their BU only |
| **Sharing Rules** | Record-level (manual/automated) | Breaks OWD | Account sharing rules, territory-based |
| **Permission Sets / PSGs** | Field/Crud/API access | Profile/Permission Set assignment | Service Cloud agent reads/writes Cases they own |
| **Record Types** | UI/Picklist + Record access | Brand-specific views on Case, Account | BrandA Case Layout vs BrandB Case Layout |
| **Validation Rules + Apex Sharing** | Automated enforcement | Business rule | Only assign Case to Dealer in same brand territory |

### 3.2 Role Hierarchy

**Root Role:** CEO
- **Executive Team** — see all
  - **Chief Customer Officer (CCO)** — see all customer brands
    - **Regional Presidents (8)** — see respective regions only (e.g., NA, EU, APAC)
      - **Brand VPs (14)** — see respective brand + region only
        - **Brand Directors (14 x 5)** — see BU within brand + region
          - **Service Agents** — see own cases (OKD) + shared dealer accounts + unified customer via sharing rules
          - **Sales Reps** — see own opportunities + assigned accounts
          - **Dealer Contacts** — see assigned Order/Case/Appointment records

**Special Roles:**
- **Integration User** — full read to most objects; no edit except integration-specific fields
- **Data Cloud Admin** — read all objects; configure Data Cloud
- **System Administrator** — full access; limited to 3-5 users per BU
- **External Dealer User** — Experience Cloud profile with specific sharing

### 3.3 Permission Sets and Permission Set Groups

| PSG Name | Members | Object Permissions |
|----------|---------|-------------------|
| **Customer Service Agent** | Service Cloud users | Read/Write Account, Contact, Asset, Case, ServiceAppointment; Read Vehicle_Master__c; Read Dealer_Location__c; Create VehicleEvent (Platform Event); Read Quote, Order, Subscription |
| **Sales Representative** | Sales Cloud users | Read/Write Account, Contact, Lead, Opportunity, Campaign, Pricebook2; Read Asset, Vehicle_Master__c; Read Warranty |
| **Service Manager** | Supervisors | All Service PS permissions + Delete Case (only owned); View All Data on Account, Contact, Case, Asset, ServiceAppointment |
| **Integration User** | MuleSoft integration | Read all objects + Apex REST; Create/Update/Delete Case, Asset, Account, Contact, Platform Event publish; Create Campaign |
| **Dealer Portal User** | External dealer users (Lightning External Apps) | Read Account (own dealer), Asset (assigned), Case (related to dealer), ServiceAppointment; Create Case; Update ServiceAppointment |
| **Data Cloud Analyst** | 500 seats | Read all objects; Tableau CRM dashboards; Data Cloud browser |
| **Marketing Manager** | Marketing Cloud users | Read Account, Contact, Lead, Campaign; Create Campaign, CampaignMember; View Data Cloud audience |
| **Admin - Platform Events** | Dev/Integration | Create Platform Event definitions; Publish & Subscribe all events; Delete old events via Apex |

### 3.4 Field-Level Security

| Field | Profile Rule | Default |
|-------|--------------|---------|
| Account.Personal_ID__c (SSI) | Visible: Integration User, Admin | Encrypted |
| Contact.Salary_Range__c | Visible: Marketing Manager (managed) | Hidden for Service Cloud, Sales |
| Asset.VIN__c | Visible: all users with read access to Asset | Visible |
| Dealer_Location__c.Sales_Figure__c | Visible: Dealer Principal, VP of Sales | Hidden |
| Subscription.Payment_Method_Token__c | Visible: Integration User, Billing Manager | Encrypted |
| Customer_Consolidated__c.Match_Probability__c | Visible: MDM Team | Hidden |

### 3.5 Record-Level Security: Territory Management

- **Implemented via:** Salesforce Territory Management 2.0 or Enterprise Territory Management (ETM)
- **Territory Model:** 8 regional territories (North America, South America, Europe West, Europe East, Middle East, South Asia, East Asia, Oceania)
- **Account Assignment:** Automatic (up to 10,000 accounts per territory per day batch batchSize=200)
- **Manual Overrides:** Supported via Territory Model assignment rules; requires DGC approval

## 4. Shield Platform Encryption

### 4.1 Encryption Policy

Salesforce Shield (encryption at rest) applied to the following:

| Field | Encryption Type | Justification |
|-------|-----------------|---------------|
| Account.SSN__c | Deterministic | Search/filter by masked SSN allowed (compliance: tax ID for warranty) |
| Contact.SSN__c | Probabilistic | Tax ID (rarely searched) | Search restricted |
| Account.Global_Unique_ID__c | Deterministic | Query in external system |
| Payment__c.Number__c | Probabilistic | PCI-relevant |
| Customer_Consolidated__c.Email | Probabilistic | PII |
| Vehicle_Master__c.VIN__c | Deterministic | Frequently searched (VIN lookup) |

**Encryption at Rest (Salesforce Shield):**
- All standard objects encrypted
- **Deterministic** for fields used in `=` filters, subqueries, OR conditions
- **Probabilistic** for fields never used in filters but need at-rest protection
- **Encryption Scheme:** AES-256 (FIPS 140-2 validated)
- **Key Management:** Customer-generated keys (BYOK) via Salesforce Shield key management; rotated every 90 days

### 4.2 Sensitive Data Handling

| Data Type | Handling |
|-----------|----------|
| **PCI (payment card)** | Never stored; delegated to payment gateway (Stripe or Adyen); stored via tokenization only |
| **PII (email, phone, address)** | Encrypted at rest via Shield; masked in logs and emails |
| **Telematics (vehicle location)** | Encrypted in transit (TLS 1.3); encrypted at rest in Data Cloud and S3 |
| **Biometric (voice print)** | Not collected; if collected in future, must store in HSM-compliant system outside Salesforce (not anticipated) |
| **Health data (driver health)** | Not collected; if collected (e.g., in-car health monitor), HIPAA-compliant BAA required with Salesforce |

## 5. Data Loss Prevention (DLP)

### 5.1 DLP Strategy

Salesforce DLP implemented at three layers:

| Layer | Mechanism | Example |
|-------|-----------|---------|
| **Network** | Salesforce Shield Event Monitoring + Anomaly Detection | Alert if >50 records exported in <1 minute from non-standard IP |
| **Application** | Transaction Security Policies (TSP) | Block if user queries >10,000 records via API in 10 minutes |
| **Data** | Shield Field Audit Trail + Critical Update Email Alerts | Alert if SSN field accessed outside business hours; alert if VIN exported to CSV via Data Export |
| **Endpoint** | Salesforce Browser Security (CSP, X-Frame-Options) | Prevent clickjacking; CSP whitelist for domains |

### 5.2 Transaction Security Policies

| Policy Name | Risk | Action |
|-------------|------|--------|
| **High Volume API Export** | Admin/User downloading > 50,000 records in 1 minute | Block + Require higher privilege justification |
| **Login from New Geo** | New country for known user | Challenge with MFA |
| **Bulk Record Deletion** | > 10,000 records deleted in 5 minutes | Block + Notify DPO |
| **Sensitive Field Access** | Access SSN, Payment Token outside 9-5 business hours | Block + Log |
| **Login from anonymizer** | VPN/Tor IP detected | Block |

## 6. Encryption in Transit

### 6.1 TLS Configuration

- **TLS Version:** TLS 1.3 only (TLS 1.2 deprecated, disabled)
- **Cipher Suites:** Only AEAD suites (`TLS_AES_256_GCM_SHA384`, `TLS_CHACHA20_POLY1305_SHA256`, etc.)
- **Certificate:** SHA-256 with RSA 2048-bit (minimum) or ECDSA P-384 for MuleSoft
- **Salesforce Inbound:** Enforced by Salesforce (no custom config needed)
- **MuleSoft Outbound:** Enforced via Anypoint API Manager TSL policy (reject TLS 1.0/1.1, weak ciphers)
- **AWS IoT Core:** TLS 1.3 with client certificate validation

### 6.2 API Security Headers

| Header | Value |
|--------|-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` (or `SAMEORIGIN` for embeddedVisualforce) |
| `Content-Security-Policy` | Strict ruleset (restrict to internal, Salesforce CDN, MuleSoft) |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | Restrict `geolocation`, `microphone`, `camera` to specific domains |

## 7. Compliance Controls

### 7.1 GDPR (General Data Protection Regulation)

| GDPR Article | Salesforce Control |
|--------------|--------------------|
| **Article 5 (Lawfulness, fairness, transparency)** | PIA (Privacy Impact Assessment) conducted for all data flows; Privacy Notice published on portal |
| **Article 6 (Lawful basis)** | Consent management via Data Cloud consent framework (store `consent:dataProcessing` per customer); lawful basis for B2B: Legitimate Interest |
| **Article 7 (Conditions for consent)** | Granular opt-in/opt-out for marketing, telematics, data processing; granular per purpose |
| **Article 16 (Right to rectification)** | Customer can edit profile via Self-Service Portal; Flow enables @Salesforce update; audit log of change |
| **Article 17 (Right to erasure)** | Customer deletion request → Bulk Data Deletion via automated batch; create tombstone on Golden ID to purge references |
| **Article 20 (Right to data portability)** | JSON export of all customer data via Data Cloud export or Flow to email |
| **Article 25 (Data protection by design)** | Default privacy (opt-out) for Data Cloud; Shield encryption by default |
| **Article 30 (Records of processing)** | Salesforce Shield Field Audit Trail + Event Monitoring for all personal data access; DSR audit trail in `Data_Processing_Log__c` |
| **Article 33 (Breach notification)** | Salesforce feeds alerts to security team; if breach in last 72h, notify DPA within 72h |
| **Article 35 (Data protection impact assessment)** | Annual PIA renewal for high-risk processing |

**Data Processing Agreement (DPA):** Exists with Salesforce (for EU hosting); MuleSoft DPA in place; AWS DPA for S3/Glacier.

### 7.2 CCPA/CPRA (California Consumer Privacy Act)

| Control | Implementation |
|---------|---------------|
| Data deletion request | Same as GDPR Right to Erasure; 45-day SLA |
| Data sale opt-out | Salesforce does not sell data; if introduced, respect `Do Not Sell` flag |
| Data disclosure | Provide data map of 12-month data sharing |
| Use limitation | Data used only for stated purpose in Privacy Notice |
| Non-discrimination | Same price/data whether customer opts out or in |

### 7.3 Audit Trails

**Salesforce Native Audit Features:**

1. **Setup Audit Trail:** Captures all org setup changes (enabled by default; 20,000 event history, 30 days rotation)
2. **Field History Tracking:** Enabled on Account, Contact, Asset (track changes to: Name, Email, Phone, Address, Status)
3. **Login History:** Last 6 months login history (enabled); exportable to CSV
4. **Event Monitoring (Salesforce Shield):** Captures API events, login events, report exports, Apex executions (buy extra storage for long-term retention)
5. **Platform Event Stream:** Events published to external SIEM (Splunk) via streaming API for real-time monitoring

**Additional Audit Controls:**

| Control | Implementation |
|---------|---------------|
| **Apex execution audit** | Log all Apex callouts to external systems in `Integration_Log__c` custom object (who, when, which system, payload fingerprint) |
| **Data load audit** | All Data Loader operations require `Data_Import_Access__c` permission set; logged to Setup Audit Trail |
| **Data Cloud audit** | Data Cloud provides internal data lineage and processing log; export to S3 for 7-year retention |
| **Deletion audit** | Every deleted record captured in `Deletion_Log__c`; immutable for 7 years |

## 8. Network Security and Segregation

### 8.1 Network Zones

| Zone | Access Control | Traffic |
|------|----------------|---------|
| **DMZ (Public)** | Public internet; rate-limited, WAF-protected | Customer self-service portal, public APIs (limited) |
| **ApplicationZone (Private)** | Via MuleSoft API Gateway + Private Link | Salesforce <-> MuleSoft; Isolated VPC |
| **Integration Zone (MuleSoft Runtime Fabric)** | VPC Peering with Salesforce | Backend integrations |
| **Data Tier (AWS)** | Encryption + ACLs | S3, IoT Core, Lambda, Kafka |
| **Legacy Zone (Brand Data Centers)** | Dedicated leased line / VPN | ERP, DMS, Warranty systems |

### 8.2 Web Application Firewall (WAF)

- **External WAF:** Salesforce Shield protects Salesforce login page; MuleSoft API Gateway has Anypoint WAF (similar to API Shield) inspects all API traffic
- **Rules:** Block OWASP Top 10 attacks, SQL injection, XSS payloads, log4j-style payloads
- **Rate Limiting:** Per IP, per client ID
- **Bot Detection:** MuleSoft policy + Salesforce reCAPTCHA for Self-Service Portal

### 8.3 Intrusion Detection and Prevention

| Tool | Scope |
|------|-------|
| **Salesforce Shield** | Alert on anomalous behavior (bulk export, login from new device, new IP) |
| **MuleSoft Anypoint Security** | Abnormal packet patterns, payload inspection; sent to Splunk SIEM |
| **AWS GuardDuty** | Detect known bad IAM, EC2, S3, Lambda patterns |
| **AWS Config** | Configuration drift alerting on S3, IAM, VPC |
| **SIEM (Splunk)** | Central aggregation from Salesforce Event Monitoring, MuleSoft logs, AWS CloudTrail; correlation rules, dashboards, alerting |
| **EDR on Workstations** | CrowdStrike or similar on 92,000 employee devices (update policies to access Salesforce exclusively via Okta + MFA) |

## 9. Application Security

### 9.1 Static Application Security Testing (SAST)

- All Apex code scanned via **Checkmarx Salesforce analyzer** (or **Salesforce Code Analyzer**)
- All MuleSoft flows/APIs scanned via **MuleSoft runtime security scan** + **OWASP ZAP** (dynamic scan of test APIs)
- CI/CD pipeline includes security gates (fails if > High severity vulnerabilities found)

### 9.2 Dynamic Application Security Testing (DAST)

- **MuleSoft:** OWASP ZAP + Burp Suite on staging environment; monthly
- **Salesforce:** Rapid7 InsightAppSec on Full Sandbox; quarterly
- **Experience Cloud (Dealer Portal):** Sucuri or similar scanner; monthly
- **Mobile App:** Mobile App Security Testing (MAST); quarterly

### 9.3 Vulnerability Management

| Severity | SLA to Remediate |
|----------|-----------------|
| Critical | 7 days (hotfix if required) |
| High | 30 days |
| Medium | 90 days |
| Low | 180 days or next release |

### 9.4 Penetration Testing

| Scope | Frequency | Mode |
|-------|-----------|------|
| **Salesforce Org** | Annual | External pentest vendor (NCC Group, Coalfire, etc.); gray-box; include API, portal, mobile |
| **MuleSoft APIs** | Semi-annual (6 months) | Third-party external assessment |
| **AWS Infrastructure** | Annual | AWS Well-Architected + penetration test (red team) |
| **Dealer Portal (LWR)** | Semi-annual | Web app pentest |
| **Mobile App** | Per major release | Mobile pentest |
| **Connected Vehicle APIs/V2X** | Annual | Focus: telematics ingestion, vehicle command; threat model review plus pentest |

**Penetration Test Requirements (Internal checklist):**

1. **Authority:** Architecture Review Board approval before external Pentest begins
2. **Scope Defined:** Scope document signed by vendor and CISO
3. **Rules of Engagement:** Do not access production customer PII during test; use test org only
4. **Testing Environment:** Test primarily in Staging/Sandbox; if production testing, whitelisting + monitoring
5. **Findings Report:** Vendor provides executive summary + technical appendix; severity rating per CVSS
6. **Remediation Plan:** Submitted by vendor within 30 days of report; tracked to completion
7. **Re-test:** Required for Critical/High findings within 30 days post-remediation
8. **Report Retention:** Final report retained for 5 years (audit)

**Specific Tests Required:**
- SQL injection via API query parameters
- Broken authentication: session fixation on Salesforce
- Broken access control: BOLA/IDOR attempting to access another Golden ID record
- Mass assignment vulnerability: Apex REST trigger for injection
- Soft fields, cookies: ensure no sensitive data in HTTP responses
- SSRF: MuleSoft connector to legacy systems
- XXE: XML parsers in SOAP integrations
- No direct object references in Platform Events (validate data integrity)

## 10. Key Rotation and Secrets Management

| Secret | Owner | Rotation Period | Storage |
|--------|-------|-----------------|---------|
| Okta SAML signing key | Security Team | Annual | HashiCorp Vault; Salesforce Connected App (public key) |
| MuleSoft Client Secret | Integration Team | 90 days | Anypoint Secrets Manager (encrypted at rest) |
| Salesforce Connected App client secret | Admin Team | 90 days | Anypoint Secrets Manager |
| API Gateway SSL/TLS certificate | Infrastructure Lead | Annual (or 90 days via ACL) | ACM (AWS Certificate Manager) + manual cert pin in Salesforce Named Credential |
| Data Cloud encryption key | Data Team | Annual (BYOK) | Salesforce Shield key management |
| AWS IoT Core device certificate | IoT/Platform Team | Annual | AWS IoT Core device registry; rotated during vehicle OTA fleet update |
| Database credentials (MuleSoft) | Integration Team | 90 days | AWS Secrets Manager (referenced by MuleSoft Vault) |

## 11. Incident Response

### 11.1 Security Incident Definition

Any of the following constitutes a security incident:
- Unauthorized access to customer PII (breach)
- Downtime of critical service (DDoS)
- Data exfiltration (>1,000 records suspected)
- Suspicious login pattern (geo-velocity, impossible travel)
- Compromised admin account
- Vulnerability in production discovered without patch available

### 11.2 Incident Response Plan

| Phase | Action | Owner |
|-------|--------|-------|
| **Identification** | Alert from SIEM; Initial review; severity classification | Security Operations Center (SOC) |
| **Containment** | Isolate affected system; disable compromised account; revoke API keys; alert Salesforce Shield (if needed) | Integration + Security Team |
| **Eradication** | Root cause analysis; remove malware/backdoor; patch vulnerability | Security + Engineering |
| **Recovery** | Restore from clean backup; validate; monitor | Platform Team |
| **Lessons Learned** | Post-mortem meeting within 5 business days; update playbooks | CISO + ARB |

### 11.3 Breach Notification Timeline

| Jurisdiction | Notification Deadline | Process |
|--------------|----------------------|---------|
| **GDPR (EU)** | 72 hours to DPA; Immediate to impacted customers if high risk | Legal + Privacy team; use GDPR DataBreach template |
| **CCPA (California)** | Without unreasonable delay | PR + Legal counsel |
| **Brazil (LGPD)** | Reasonable time | Legal |
| **All jurisdictions** | Annual SOC 2/SOC 1 report disclosed | Update System and Organization Controls report |

## 12. Appendix: Security Architecture Checklist

- [x] Okta SAML 2.0 SSO enabled
- [x] MFA required for all users
- [x] Lock sessions to IP enabled
- [x] Session timeout configured
- [x] IP Ranges enforced per profile
- [x] Shield Platform Encryption deployed for sensitive fields
- [x] Deterministic encryption on searchable PII fields
- [x] Audit trail enabled (field history, setup, login)
- [x] Event Monitoring purchased and configured
- [x] Salesforce shield (Field Audit Trail + anomaly detection) active
- [x] DLP Transaction Security Policies active
- [x] GDPR consent management configured
- [x] Data residency enforced (Data Cloud regional config + Region__c on every record)
- [x] WAF enabled on MuleSoft API Gateway
- [x] TLS 1.3 only
- [x] SAST integrated in CI/CD
- [x] DAST on staging environment (monthly)
- [x] Annual penetration testing scheduled
- [x] Seats stored in Anypoint Secrets Manager with rotation
- [x] Backup retention and DR tested annually
