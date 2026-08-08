# 1. Detailed Solution Design
## Global Customer Unification Platform - Fortune 100 Automotive Manufacturer

**Version:** 1.0  
**Date:** 2026-07-28  
**Architecture Review Board:** Enterprise Salesforce Architecture Council  
**Classification:** Confidential - Board Approved


## 1. Executive Overview

This document provides the detailed solution design for the enterprise Salesforce platform supporting the global customer unification initiative. The scope encompasses the single-production org building 68 million customer records, 125 million vehicle records, 11,500 dealer relationships, and multi-brand operations across 47 countries with strict data residency requirements.


## 2. Salesforce Org Architecture

### 2.1 Org Topology

The architecture mandates a **single Salesforce production org** with sandbox environments at the following tiers:

| Environment | Purpose | Refresh Frequency |
|-------------|---------|-------------------|
| Production | Live operations (68M customers, 125M vehicles) | N/A |
| Full Sandbox | UAT, training, integration testing | Weekly |
| Developer Pro | Developer testing, CI/CD | On-demand |
| Scratch Orgs | Developer feature branches | On-demand |

**Org Limits Mitigation:** Anticipate approaching governor limits with 68M Account/Contact records and 125M Asset records. Mitigation strategies include:
- Data Cloud offload for historical data (data older than 24 months)
- Platform Events for async operations exceeding 10,000 record DML limits
- Queueable Apex for batch processing (>10,000 records)
- Big Objects for 125M vehicle telemetry archive
- Streaming API for real-time dealer notifications without governor constraints

### 2.2 Salesforce Edition and License Model

| License Type | Quantity | Justification |
|--------------|----------|---------------|
| Customer 360 Platform (Enterprise/Unlimited) | 1 | Single org with all features |
| Service Cloud - Agent Console | 15,000 | Customer service agents |
| Sales Cloud - Sales Console | 10,000 | Brand sales teams |
| Experience Cloud - Customer Portal | 68M | Customer self-service (partner login) |
| Experience Cloud - Dealer Portal | 11,500+92,000 | Dealer employees and principals |
| CRM Analytics (formerly Tableau CRM) | 500 | Global analytics, executive dashboards |
| Shield Platform Encryption | Included | Field-level encryption (PII) |
| Salesforce Data Cloud | 125M records | CDP with 125M profile/engagement records |
| Marketing Cloud Account Engagement | Account | Marketing automation with native Data Cloud integration |
| Sales Cloud for Subscriptions | Included | Subscription Management |
| CPQ & Billing (Salesforce Billing) | Included | Subscription and billing for connected services |
| Connected Car / Vehicle Cloud | Custom | Connected vehicle data ingestion |
| Agentforce | 92,000 | AI agents across service, sales, marketing |
| MuleSoft Anypoint Platform | Included | ESB with 1,000+ API specifications |
| Slack Enterprise Grid | Included | Cross-brand collaboration hub |

**License Consolidation:** By consolidating 14 brands onto a single org, we reduce total license count by approximately 40% compared to brand-specific implementations, directly addressing the 25% budget reduction constraint.

### 2.3 Business Unit Model

Rather than separate business units per brand (which creates unnecessary replication), implement a **hybrid BU model**:

- **Global BU:** Objects managed centrally (Customer Master, Vehicle Master, Global Service, Global Marketing)
- **Brand BU:** Brand-specific configurations (custom fields on Account, brand-specific Service Cloud features)
- **Regional BU:** Data residency enforcement, regional tax rules, local service scheduling

| BU Level | Purpose | Object Scope |
|----------|---------|--------------|
| Global | Customer, Vehicle, Subscription, Warranty | All objects |
| Brand (14) | Brand-specific fields, processes | Case, Lead, Campaign |
| Region (47 countries aggregated into 8 zones) | Data residency, local compliance | ALL objects with sharing rules |

Data Cloud implements this as **Data Spaces** per brand/region combination, allowing unified queries across brands while maintaining logical isolation.

### 2.4 Feature License Strategy

Enable licenses by role rather than globally:
- **Service Cloud**: Customer service, roadside, service advisors
- **Sales Cloud**: Brand dealers, fleet sales, subscription sales
- **Platform**: IT, integrations, data team
- **Experience Cloud**: External users (customers, dealers, partners)

Enable features via:
- Permission Sets (granular, role-scoped)
- Permission Set Groups (named sets per job function)
- Feature Management (JIT feature access via Salesforce permission-set assignments)

## 3. Object Model Overview

### 3.1 Core Object Framework

The object model follows the **Standard Sales Cloud + customized Service Cloud** pattern with extensions for automotive vertical:

#### Primary Objects (Standard, Used As-Is)

| Object | Purpose | Estimated Records | Customization |
|--------|---------|-------------------|---------------|
| Account | Legal entity (dealers, B2B customers, parent company) | 25M (customers) + 11K (dealers) | Custom fields for DUNS, tax ID, fleet size |
| Contact | Individual person (end customer) | 68M | Extended with loyalty tier, opt-in flags, data residency indicator |
| Asset | Vehicle (individual unit with VIN) | 125M | Extended with connected vehicle data, telematics bridge |
| Case | Service request, roadside assistance, warranty claim | 50M/year | Custom fields for service type, region, SLA tier |
| Campaign | Marketing campaign | 100K/year | Member of Subscription Campaign |
| Opportunity | Subscription signup, vehicle purchase opportunity | 10M/year | Pipeline stage for EV purchase journey |

#### Extended Objects (Custom)

**Master Data Objects**

| Custom Object | Purpose | Relationship | Key Fields |
|---------------|---------|--------------|------------|
| Golden ID | Global unique customer identifier | Parent of Account/Contact merge | Golden_ID__c (external ID), merge_status__c, authoritative_source__c |
| Customer Consolidated | Consolidated view from 3 identity providers | Lookup to Account/Contact | source_system__c, confidence_score__c, last_updated__c |
| Vehicle Master | Aggregate vehicle metadata from ERP/manufacturing | Parent lookup of Asset | model_year__c, trim__c, paint_code__c, battery_capacity_kwh__c, drivetrain__c |
| Dealer Location | Dealer with lat/long, geo zone | Primary contact, hierarchy | dealer_code__c (external ID), region__c, latitude__longitude, franchise_brands__c (multi-select) |
| Service Appointment | Scheduled service at dealer | Related to Case, Asset, Dealer | appointment_type__c, technician__c, bay__c, service_type__c |
| Subscription | Connected services subscription | Child of Account/Asset | subscription_plan__c, start_date__c, end_date__c, renewal_status__c, benefit_activation_status__c |
| Warranty | Vehicle warranty record | Parent of Asset | warranty_type__c, start_date__c, end_date__c, coverage_miles__c, claim_status__c |
| Recall Campaign | Global recall coordination | Related to Vehicle Master, Account | recall_id__c, manufacturer_notice_id__c, affected_vin_count__c, region_scope__c, status__c |
| Connected Vehicle Telemetry | Raw telemetry pointer (actual data in Big Object/Data Cloud) | Related to Asset | timestamp__c, event_type__c, vehicle_state__c, storage_location__c |
| Roadside Assistance Request | Telematics-initiated | Related to Asset, Case, Account | incident_type__c, location_lat__c, location_long__c, vehicle_status__c, eta_minutes__c |

#### Junction Objects

| Custom Junction | Purpose | Related Objects |
|-----------------|---------|-----------------|
| Account Brand Association | Maps customer to brands owned | Account, Brand (custom setting) |
| Vehicle Recall Association | Links affected vehicles to recall campaigns | Asset, Recall Campaign |
| Subscription Benefit | Links subscriptions to benefits | Subscription, Benefit (custom setting) |
| Dealer Brand Relationship | Dealer's authorized brand list | Dealer Location, Brand |

#### Platform Event Objects

| Event Name | Purpose | Replay ID | Schema |
|------------|---------|-----------|--------|
| CustomerUnified | Published on Golden ID merge completion | Yes | Golden_ID__c, AccountId, ContactId, ActionType, Timestamp |
| VehicleEvent | Telematics, service, ownership change | Yes | VIN__c, VehicleId, EventType, Payload, Region |
| ServiceCaseEscalation | Escalated case notification | Yes | CaseId, LoanStarId, EscalationReason, Region, Severity |
| DealerUpdate | Dealer data changes from ERP/MuleSoft | Yes | DealerId, DMSId, UpdateType, Payload |
| RecallNotification | Recall campaign trigger | Yes | RecallId, AffectedVINs[], Region, NotificationType |
| SubscriptionChange | Subscription lifecycle events | Yes | SubscriptionId, AccountId, ActionType, EffectiveDate |

### 3.2 Object Relationship Diagram (ORD)

```
[Account]
   |
   |(1:N)
   |
[Contact] <--(N:N)-- [Customer Consolidated]
   |
   |(1:N)
   |
[Asset] -----(1:N)------> [Vehicle Master]
   |                            |
   |(1:N)                       |(1:N)
   |                            |
[Case] <--(1:N)--- [Service Appointment]    [Subscription] (1:N) [Warranty]
   |                      |
   |(1:1)                  |(1:N)
   |                      |
[Roadside Assistance] ----+
```

### 3.3 Custom Metadata and Settings Strategy

| Type | Name | Purpose |
|------|------|---------|
| Custom Metadata | Brand_Config__mdt | Per-brand record types, picklist values, automation enablement flags |
| Custom Metadata | Region_Config__mdt | Data residency rules, field-level encryption requirements, tax calculation |
| Custom Metadata | Integration_Endpoint__mdt | MuleSoft endpoint URLs (dev, staging, prod) |
| Custom Metadata | Service_SLA_Tier__mdt | Response time SLAs by region and service type |
| Custom Metadata | Dealer_Hierarchy__mdt | Dealer group relationships |
| Custom Settings | Platform_Event_Topics__c | Central registry of all platform events (13 min per OH) |----------|---------------------------------|
| isSilentLogin__c | Boolean | Indicates customer authenticated via SSO, skip credential prompts |

Connectivity map:
- **Apex:** REST callouts to MuleSoft for DMS sync; REST callouts to IBM Integration Bus for legacy manufacturer systems; REST callouts to AWS S3 for telematics file download; Streaming API callouts to AWS IoT Core checkpoint
- **Platform Events:****CustomerUnified**,**VehicleEvent**,**ServiceCaseEscalation**,**RoadsideInitiated**,**DealerUpdate**,**RecallNotification**,**WorkOrderStatus**,**SubscriptionChange**, and **InventoryUpdate** with replay enabled for durability

#### IX. Custom Development & Callout Patterns

**Recommended pattern for all external integrations (MuleSoft, AWS, IBM MQ):**
```apex
// 1. Wrap in Lightning REST @RestResource
@RestResource(urlMapping='/api/v1/vehicle/*')
global with sharing class VehicleIntegrationResource {
    @HttpPost
    global static void ingestTelemetry(String payload, String region, Integer replayId) {
        // 2. Deserialize with platform event schema (strong typing)
        // 3. Validate region residency before DML
        // 4. Offload to Data Cloud; store raw only if needed
        // 5. Publish acknowledgment event if required
    }
}
```

**Testing pattern:**
- Use `HttpCalloutMock` for all mock Apex tests involving MuleSoft callouts
- Use `EventBus.TestEvent` to simulate published Platform Events
- Target 90%+ code coverage for all Apex (excluding test classes)

## 6. Agentforce Agent Design

### 6.1 Agent Architecture Pattern

Agentforce agents operate with **Einstein Copilot** orchestration tier. Each agent is scoped to a business domain, has its own set of topics (actions), and references Data Cloud as the primary data source.

```
Einstein Copilot (Global Orchestrator)
    |
    +--- Agent: Service Agent (Agentforce)
    +--- Agent: Sales Agent
    +--- Agent: Marketing Agent
    +--- Agent: Roadside Agent
    +--- Agent: Dealer Agent
    +--- Agent: Fleet Agent (B2B)
```

### 6.2 Agent Design Specifications

#### Agent 1: Global Service Agent

| Attribute | Specification |
|-----------|---------------|
| **Name** | Global Service Agent |
| **Business Unit Scope** | All brands, all regions |
| **Primary Skills** | Case resolution, FAQ, escalation routing, appointment scheduling |
| **Data Source** | Data Knowledge Asset (DKA) - 12 topics |
| **Grounding Rules** | Contact + Asset + Case + Service Appointment records only |
| **Escalation Trigger** | Resolution confidence < 80%, emptyDATA or timeout |
| **Deployment** | Service Cloud (Lightning Web Components, Web Widget, Mobile) |
| **Languages** | English, (first deployment); others post-rollout |

**Topics (Actions):**
| Topic Name | Action | prerequisiteData |
|------------|--------|-----------------|
| Get Case Status | Query Case by CaseNumber + Region | Case, Account |
| Reschedule Appointment | Create/Update Service Appointment | Service Appointment, Asset, Account |
| Find Roadside Provider | Query nearest dealer with towing capability | Account, Dealer Location |
| Check Vehicle Recall Status | Query Recall Campaign + VIN | Asset, Recall Campaign |
| Verify Warranty Coverage | Check Warranty + Subscription | Asset, Warranty, Subscription |
| Get Billing Summary | Query Subscription + Billing | Subscription, Order, Invoice |

**Slots (Parameters required per action):** 
- `accountId` or `assetId` or `caseNumber` for context
- `region` for data residency routing
- `intent` classifier (fast classification)

#### Agent 2: Connected Vehicle Intelligence Agent

| Attribute | Specification |
|-----------|---------------|
| **Name** | Connected Vehicle Agent |
| **Business Unit Scope** | All brands |
| **Primary Skills** | Vehicle health insights, predictive maintenance, OTA scheduling |
| **Data Source** | Data Cloud (vehicle telemetry + service history) |
| **Grounding Rules** | Asset + Big Object telemetry + Service Appointment + Subscription |
| **Escalation Trigger** | Request for human approval, warranty claim initiation |

**Topics:**
| Topic | Action |
|-------|--------|
| Predict Maintenance | Triggered by telemetry anomaly threshold |
| Schedule OTA Update | Query eligibility + confirm customer preference |
| Vehicle Health Check | Score based on last 30-day telemetry |
| Battery Health Assessment | EV-specific: state-of-health metrics |

#### Agent 3: Dealer Advisor Agent

| Attribute | Specification |
|-----------|---------------|
| **Name** | Dealer Advisor Agent |
| **Business Unit Scope** | Dealer-facing |
| **Primary Skills** | Dealer lookup, vehicle inventory, appointment booking, parts lookup |
| **Data Source** | Account + Vehicle Master + Service Appointment (restricted to dealer zone) |
| **Grounding Rules** | Dealer Location + related Assigned Vehicles + regional Stock data |

#### Agent 4: Marketing Personalization Agent

| Attribute | Specification |
|-----------|---------------|
| **Name** | Marketing Personalization Agent |
| **Business Unit Scope** | Cross-brand (with customer consent) |
| **Primary Skills** | Journey entry, suppression detection, consent verification |
| **Data Source** | Data Cloud (unified customer profile + consent + engagement history) |

**Topics:**
- `Check Consent` — verify data processing consent by jurisdiction before engagement
- `Unify Identity` — initialize Golden ID linking
- `Suppress If Duplicate` — prevent duplicate marketing sends

#### Agent 5: Roadside Emergency Agent (Voice)

| Attribute | Specification |
|-----------|---------------|
| **Name** | Roadside Agent |
| **Primary Skills** | Incident handling, location capture, tow dispatch |
| **Data Source** | Live Asset state + nearest Dealer Location with tow capability + Account |
| **Integration** | Twilio/AWS Connect for voice, Salesforce CTI Adapter |

### 6.3 Agent Security and Compliance

| Control | Implementation |
|---------|---------------|
| **Prompt injection protection** | Every agent action validates context record (record-level access checked in Apex action) |
| **PII redaction** | Agent responses never return unredacted PII unless explicitly requested by authenticated user |
| **Jurisdiction filtering** | Agent actions restricted to data visible under user's region (sharing + org-wide defaults) |
| **Audit log** | Converse API logs all interactions; map to Analytics for quality monitoring |
| **Opt-out** | Customer can disable Agentforce via consent fields (stored in Data Cloud) |

### 6.4 Agent Testing and Validation

| Test Type | Scope |
|-----------|-------|
| **Unit** | Mocked action responses for each topic |
| **Integration** | End-to-end conversation scenarios in sandbox |
| **Security** | Penetration testing against prompt injection |
| **Compliance** | GDPR/CCPA scavenging test (agent must not retain PII beyond session) |
| **Performance** | Response latency p95 < 800ms for 95% of requests |

## 7. Connected Vehicle Architecture

### 7.1 Architecture Pattern: Telematics Gateway → MuleSoft → Salesforce Data Cloud → Einstein/Action

```
[Sensors/ECU in Vehicle]
         |
         v
[Telematics Gateway (AWS IoT Core / Azure IoT Hub)]
         |
         | MQTT (encrypted)
         v
[AWS Lambda / Azure Function: Normalize + Validate]
         |
         | HTTPS POST (JSON)
         v
[MuleSoft API Manager → /telematics/ingest]
         |
         | (validation, enrichment, region check)
         v
[Salesforce Platform Event: VehicleEvent]
         |
         | Async trigger
         v
[Data Cloud: Vehicle Data Stream Ingest]
         |
         | CDP unification + Einstein model inference
         v
[Agentforce: Predictive Maintenance / Service Automation]
```

### 7.2 Telematics Ingestion Flow (Detailed)

| Step | Component | Action |
|------|-----------|--------|
| 1 | Vehicle Gateway | Batch upload telemetry every 5 minutes (standard) or real-time event (critical: airbag, crash detection) |
| 2 | Cloud IoT | Validate device certificate, deduplicate messages |
| 3 | MuleSoft | Verify VIN schema, validate `region` from VIN breakdown (data residency check), transform to Platform Event payload |
| 4 | Data Cloud | Stream ingestion into unified customer context (collapsed by Golden ID) |
| 5 | Einstein | Run anomaly detection models (predictive maintenance, tire wear, battery degradation) |
| 6 | Action | Create Case automatically if anomaly severity > threshold |
| 7 | Notification | Send push/SMS/email to customer, trigger dealer service appointment |

### 7.3 Vehicle-Based Service Automation

- **Milestone-based maintenance:** Trigger from ODO + days-since-service (Data Cloud calculated field)
- **Warranty-triggered service:** Subscription or warranty benefit activation sends to Service Cloud
- **Connected features management:** OTA update scheduling via Subscription/Service Appointment lifecycle

## 8. Subscription & Connected Services Design

### 8.1 Subscription Management Objects

Salesforce Subscription Management (from Salesforce Billing) is used for:
- Connected services (e.g., navigation, infotainment, safety alerts)
- FOTA (firmware over-the-air) access rights
- EV charging benefits
- Roadside assistance subscription tiers
- In-car data subscriptions

**Key objects configuration:**
| Standard Object | Customization |
|-----------------|---------------|
| Product | Fixed SKU bundle per brand/region |
| Pricebook | Regional pricing (base currency by region) |
| Order | Vehicle-linked subscription order |
| Subscription | Subscription term (monthly, annual, lifetime), auto-renewal flag |
| Invoice | Generated per billing cycle; integrated with payment gateway |
| Payment | Stripe/Adyen or legacy payment gateway via MuleSoft |
| Revenue Recognition | IFRS 15 compliance for multi-year subscriptions |

### 8.2 Subscription Lifecycle and Automation

```
PROVISIONING: Order -> Subscription (Active) -> Benefit Activate (dealer/backend)
ACTIVE: Recurring billing -> Invoice -> Payment -> Revenue Recognition
SUSPEND: Customer request/Non-payment -> Pause benefits (keep VIN data)
CANCEL: End-of-term or immediate -> Benefits deactivate -> Archive after retention
RENEW: Auto-renewal flag true -> New subscription term -> notify customer
```

**Automation:**
- **Order Entry** → Flow creates Subscription + triggers Benefit Activation platform event
- **Billing Anniversary** → Scheduled Flow creates Invoice automatically
- **Payment Failure** → Platform Event triggers dunning workflow (email/SMS/call)
- **Vehicle Transfer** → Subscription linked to VIN; on transfer, update Asset lookup on Subscription

### 8.3 Brand-Specific Subscription Plans

Each brand configures SKUs via Custom Metadata. Global cross-brand subscriptions (e.g., "Global Roadside Plus") use a special Pricebook with `global_only__c` flag.

## 9. Brand Independence and Transition Strategy

### 9.1 Brand Isolation During Transition

| Control | Implementation |
|---------|---------------|
| **Record Type separation** | Per-brand custom record types on Account (if needed via Business Units) |
| **Sharing rules** | BU users see only their BU records plus shared Brand data |
| **Picklist isolation** | Brand-specific picklist values for Service Type, Campaign Type via Record Type |
| **Profile mirroring** | Replicate existing brand profiles (e.g., "Brand X Sales Rep") via Permission Set Groups |
| **Brand UI** | Lightning App per brand (customizable home page, tabs, branding) |

### 9.2 Legacy System Preservation

During transition (mandatory 24-month CAD period for dealer integrations):
- **Dealer DMS (legacy):** No change; continue MuleSoft-operated bidirectional sync
- **Manufacturing ERP:** MuleSoft triggers sync on Inventory/Recall events; Salesforce remains master for customer-facing data
- **Warranty systems:** MuleSoft sync; Salesforce Dataloader batch for historical migration

## 10. Disaster Recovery and Business Continuity

### 10.1 Salesforce-Specific DR

| Tier | RTO | RPO | Mechanism |
|------|-----|-----|-----------|
| Critical (Service Cloud) | 1 hour | 15 minutes | Salesforce Hyperforce multi-region failover + Near Real-Time replication (NRTR) |
| High (Sales Cloud) | 4 hours | 1 hour | Hourly sandbox refresh as warm standby |
| Standard (Marketing) | 8 hours | 4 hours | Daily backup + data export |

### 10.2 Data Cloud DR

- Configurable failover region in registration properties
- Daily full export to AWS S3 (table-level)
- Continuous pipeline snapshot every 1 hour

### 10.3 MuleSoft DR

- Multi-region Anypoint runtime (primary in AWS/primary Azure region; secondary in secondary region)
- Active-active deployment
- Load balancer DNS failover

### 10.4 BCP Testing
- Quarterly tabletop exercises
- Annual full-scale DR test (Salesforce + MuleSoft + AWS IoT Core)
- Post-incident review for every production issue (within 5 business days)

## 11. Appendix A: Change Management and Adoption

| Initiative | Owner | Timeline |
|------------|-------|----------|
| Executive sponsorship kickoff | CTO | Month 1 |
| Brand champion network | Brand VPs | Month 2 |
| Super user training program | L&D | Month 4-6 |
| Employee onboarding updates | HR | Month 3+ |
| Dealer training (new portal) | Dealer Ops | Month 5+ |
| Customer communication (unified ID) | Marketing | Month 3+ |
| Continuous adoption metrics | IT Analytics | Ongoing |
