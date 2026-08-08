# 3. API Specifications
## Global Customer Unification Platform - Fortune 100 Automotive Manufacturer

**Version:** 1.0  
**Date:** 2026-07-28  
**Architecture Review Board:** Enterprise Salesforce Architecture Council  
**Classification:** Confidential - Board Approved


## 1. Executive Overview

This document provides REST API specifications for Experience APIs exposed by MuleSoft, consumed by Salesforce (Service Cloud, Sales Cloud, Experience Cloud), Agentforce, and external mobile applications. All APIs follow OpenAPI 3.0 specification format. All endpoints are hosted on MuleSoft Runtime Fabric with Anypoint API Manager governance. All requests must authenticate via OAuth 2.0 client credentials or JWT bearer token (Salesforce-to-MuleSoft integration uses Named Credentials with client credentials or mTLS).


## 2. Common Standards

### 2.1 Base URLs

| Environment | Base URL | Example |
|-------------|----------|---------|
| Production (NA) | https://api.global-auto.parts/api/v1 | https://api.global-auto.parts/api/v1/customer/unified |
| Production (EU) | https://api-eu.global-auto.parts/api/v1 | https://api-eu.global-auto.parts/api/v1/customer/unified |
| Staging | https://api-staging.global-auto.parts/api/v1 | https://api-staging.global-auto.parts/api/v1/customer/unified |
| Sandbox (dev) | https://api-dev.global-auto.parts/api/v1 | https://api-dev.global-auto.parts/api/v1/customer/unified |

### 2.2 Headers (All Requests)

| Header | Required | Description |
|--------|----------|-------------|
| `Authorization` | Yes | `Bearer <access_token>` (OAuth 2.0) |
| `Content-Type` | Yes | `application/json` |
| `Accept` | No | `application/json` (default) |
| `X-Correlation-ID` | Recommended | UUID for distributed tracing |
| `X-Region` | Recommended | Region code (e.g., `na-east`, `eu-west`, `apac`) |
| `X-Source-System` | Recommended | `salesforce`, `mobile-app`, `agentforce` |
| `X-Idempotency-Key` | POST/PATCH | UUID for request deduplication (idempotent operations) |

### 2.3 Authentication & Authorization

**OAuth 2.0 Client Credentials (Machine-to-Machine):**
- Client ID/Secret provided via Anypoint Connected App
- Scopes: `customer:read`, `vehicle:read`, `service:write`, `subscription:read`, etc.
- Token TTL: 1 hour (configurable)
- Token endpoint: `https://login.mulesoft.com/oauth/token`
- Refresh: Automatic via MuleSoft HTTP requester connector

**mTLS (Salesforce-to-MuleSoft Private Link):**
- When Salesforce connects via Named Credential to Private Link endpoint, enforce mTLS at Anypoint API Gateway
- Client certificate stored in MuleSoft Anypoint Secrets Manager
- Server certificate: Let's Encrypt or enterprise CA; pinned at Salesforce Named Credential

**JWT Bearer Token (For Agentforce, External Mobile Apps):**
- JWT signed with Salesforce Org's private key (via Named Credentials flow)
- Audience: `api.global-auto.parts`
- Issuer: Salesforce Instance URL

### 2.4 Rate Limiting

- **Default:** 1,000 requests per minute per client
- **Salesforce Integration:** 500 requests per minute (managed at Anypoint API Manager; Salesforce API limits respected concurrently)
- **Mobile Apps:** 200 requests per minute per user (device-based throttling)

Headers returned:
- `X-RateLimit-Limit`: 1000
- `X-RateLimit-Remaining`: 987
- `X-RateLimit-Reset`: 2026-07-28T15:30:00Z
- If limit exceeded: HTTP 429 with `Retry-After` header

### 2.5 Versioning Strategy

- **Path versioning:** `/api/v1/`, `/api/v2/`
- **Current stable:** v1
- **Sunset policy:** Deprecated versions supported for 6 months after v2 release
- **Version header alternative (if needed):** `Accept: application/vnd.global-auto.v1+json`

### 2.6 Error Response Model

All errors follow this structure:

```json
{
  "type": "https://api.global-auto.parts/errors/invalid-request",
  "title": "Invalid Request",
  "status": 400,
  "detail": "The 'id' field is required and must be a valid Customer ID.",
  "correlationId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2026-07-28T10:30:00Z",
  "instance": "/api/v1/customer/unified/abc123",
  "errors": [
    {
      "field": "id",
      "code": "REQUIRED",
      "message": "'id' is required."
    }
  ]
}
```

**Standard Error Codes:**

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `REQUIRED` | 400 | Missing required field |
| `INVALID_TYPE` | 400 | Field type mismatch |
| `INVALID_VALUE` | 400 | Field has invalid enum/pattern value |
| `NOT_FOUND` | 404 | Resource not found |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `UNAUTHORIZED` | 401 | Missing or invalid token |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
| `UNHEALTHY` | 503 | Dependent service unavailable |
| `DEADLINE_EXCEEDED` | 504 | Timeout (default 30s) |

### 2.7 Partial Response & Sparse Fieldsets

To reduce payload size (especially for Data Cloud responses), all GET endpoints support:

- `fields` query parameter: comma-separated list of fields to include
- Example: `GET /api/v1/customer/unified/abc123?fields=id,name,email,phone,address`

### 2.8 Pagination

All `/list` endpoints support cursor-based pagination with `page[limit]` and `page[after]`:

```json
{
  "data": [...],
  "links": {
    "next": "/api/v1/customer/search?limit=50&after=eyJpZCI6ICIxMjM0NSJ9"
  },
  "meta": {
    "total": 15234,
    "returned": 50
  }
}
```

Default `limit`: 50; Maximum: 200.


## 3. REST API Specifications

### 3.1 Customer API (`/customer/*`)

#### 3.1.1 GET `/customer/unified/{goldenId}`

Retrieve unified customer profile for a Golden ID.

**Authorization:** `customer:read` scope

**Path parameters:**
- `goldenId` (string, required): Global customer identifier

**Query parameters:**
- `includeSubscriptions` (boolean, default: false): Include active subscriptions
- `includeVehicles` (boolean, default: false): Include owned vehicles
- `includeServiceHistory` (boolean, default: false): Include recent cases
- `region` (string, optional): Force region context for data residency

**Success Response:**
```json
{
  "data": {
    "id": "golden-550e8400-e29b",
    "type": "unified_customer",
    "attributes": {
      "firstName": "John",
      "lastName": "Doe",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+14155551234",
      "address": {
        "street": "123 Main St",
        "city": "Detroit",
        "stateProvince": "MI",
        "postalCode": "48201",
        "country": "US",
        "region": "na-east"
      },
      "consent": {
        "marketing": true,
        "telematics": true,
        "dataProcessing": true,
        "lastUpdated": "2026-07-20T15:00:00Z"
      },
      "brands": ["BrandA", "BrandB", "BrandD"],
      "lifetimeValue": {
        "amount": 125000.00,
        "currency": "USD",
        "asOf": "2026-07-01"
      },
      "createdDate": "2020-03-15T00:00:00Z",
      "lastModifiedDate": "2026-07-25T10:00:00Z"
    },
    "relationships": {
      "subscriptions": {
        "data": [
          { "id": "sub-123", "type": "subscription", "plan": "Connected Safety Plus", "status": "active" }
        ]
      },
      "vehicles": {
        "data": [
          { "id": "vin-1HGBH41JXMN109186", "type": "vehicle", "brand": "BrandA", "model": "Model X" }
        ]
      },
      "serviceCases": {
        "data": [
          { "id": "case-500xx", "type": "case", "subject": "Brake Noise", "status": "Closed", "date": "2026-06-10T00:00:00Z" }
        ]
      }
    }
  }
}
```

**Error Responses:**
| HTTP Status | Condition |
|-------------|-----------|
| 401 | Invalid or expired token |
| 403 | User lacks permission for this Golden ID (region or brand restriction) |
| 404 | Golden ID not found |
| 429 | Rate limit exceeded |
| 500 | Internal error with correlation ID |

#### 3.1.2 POST `/customer/unified/search`

Search unified customers by criteria (cross-brand, district-level).

**Authorization:** `customer:search` scope

**Request Body:**
```json
{
  "query": {
    "email": "john.doe@example.com",
    "phone": "+14155551234",
    "firstName": "John",
    "lastName": "Doe",
    "addressPostalCode": "48201"
  },
  "filters": {
    "brands": ["BrandA", "BrandB"],
    "hasActiveSubscription": true,
    "minLifetimeValue": 50000,
    "region": "na-east"
  },
  "pagination": {
    "limit": 50,
    "offset": 0
  },
  "sort": {
    "field": "lastName",
    "direction": "asc"
  }
}
```

**Success Response:**
```json
{
  "data": [...],
  "pagination": {
    "total": 24,
    "limit": 50,
    "offset": 0
  }
}
```

#### 3.1.3 PATCH `/customer/unified/{goldenId}/consent`

Update customer consent preferences (GDPR/CCPA compliance).

**Authorization:** `customer:write` scope

**Request Body:**
```json
{
  "consent": {
    "marketing": true,
    "telematics": false,
    "dataProcessing": true
  },
  "reason": "Customer requested preference update via portal",
  "sourceSystem": "self_service_portal"
}
```

**Success Response:** HTTP 204 No Content

**Audit:** All consent changes logged to `Consent_Audit__c` custom object with timestamp, user, device, old/new values.

### 3.2 Vehicle API (`/vehicle/*`)

#### 3.2.1 GET `/vehicle/{vinOrId}`

Retrieve vehicle details and linked customer.

**Path parameters:**
- `vinOrId` (string, required): VIN (17 chars) or internal Asset/Vehicle Master ID

**Query parameters:**
- `includeOwner` (boolean, default: true)
- `includeServiceHistory` (boolean, default: false)
- `includeSubscriptions` (boolean, default: false)
- `includeWarranty` (boolean, default: false)

**Success Response:**
```json
{
  "data": {
    "id": "asset-07Xp3k",
    "type": "vehicle",
    "attributes": {
      "vin": "1HGBH41JXMN109186",
      "brand": "BrandA",
      "model": "Model X",
      "modelYear": 2025,
      "trim": "Premium",
      "paintCode": "P7Z",
      "paintName": "Glacier White",
      "interior": "Black Leather",
      "drivetrain": "AWD",
      "engine": "Electric Motor - Dual",
      "batteryCapacityKwh": 100,
      "rangeMiles": 350,
      "productionDate": "2025-01-15T00:00:00Z",
      "status": "Active",
      "registrationStatus": "Registered",
      "licensePlate": "ABC-1234"
    },
    "relationships": {
      "owner": {
        "data": {
          "id": "golden-550e8400-e29b",
          "type": "unified_customer",
          "fullName": "John Doe"
        }
      },
      "subscriptions": {
        "data": [
          { "id": "sub-123", "plan": "Connected Safety Plus", "status": "active" }
        ]
      },
      "warranty": {
        "data": {
          "type": "warranty",
          "plan": "Powertrain 5yr/60k",
          "startDate": "2025-01-20T00:00:00Z",
          "endDate": "2030-01-20T00:00:00Z",
          "status": "Active"
        }
      }
    }
  }
}
```

#### 3.2.2 GET `/vehicle/{vinOrId}/telemetry/latest`

Retrieve latest telematics snapshot.

**Authorization:** Requires `vehicle:read` + `telematics:consent` on customer consent state (validated at API gateway).

**Success Response:**
```json
{
  "data": {
    "vin": "1HGBH41JXMN109186",
    "timestamp": "2026-07-28T10:25:00Z",
    "odometerKm": 15234,
    "batteryLevelPct": 73,
    "batteryHealthPct": 97,
    "tirePressurePsi": [35, 35, 33, 34],
    "doorStatus": ["locked", "locked", "locked", "locked", "closed", "closed"],
    "climateStatus": {
      "targetTemp": 22,
      "mode": "auto",
      "fanSpeed": 3
    },
    "location": {
      "lat": 42.3314,
      "long": -83.0458,
      "address": "Detroit, MI"
    },
    "diagnosticFlags": [],
    "estimatedRangeKm": 280
  }
}
```

### 3.3 Service API (`/service/*`)

#### 3.3.1 POST `/service/cases`

Create service case.

**Authorization:** `service:write` scope

**Request Body:**
```json
{
  "case": {
    "subject": "Brake pedal squeak",
    "description": "Squeaking when pressing brake pedal at low speed.",
    "priority": "Medium",
    "serviceType": "Repair",
    "channel": "Phone",
    "contactId": "golden-550e8400-e29b",
    "assetId": "1HGBH41JXMN109186",
    "dealerId": "dealer-0923",
    "appointmentRequested": true,
    "preferredDate": "2026-08-01",
    "region": "na-east"
  }
}
```

**Success Response:**
```json
{
  "data": {
    "id": "case-500xx",
    "type": "case",
    "caseNumber": "CS-2026-0012345",
    "subject": "Brake pedal squeak",
    "status": "New",
    "priority": "Medium",
    "subject": "john.doe@example.com",
    "createdDate": "2026-07-28T10:30:00Z",
    "url": "/lightning/r/Case/500xx000000Dummy"
  }
}
```

**Post-Creation Behavior:**
- If `priority` is High or `serviceType` is "Roadside", publish `ServiceCaseEscalation` event
- If `assetId` is found and dealer available, auto-create `Service Appointment`
- Send customer acknowledgment email via `system-email`

#### 3.3.2 GET `/service/cases/{caseId}`

Retrieve case details.

**Success Response:**
```json
{
  "data": {
    "id": "case-500xx",
    "type": "case",
    "attributes": {
      "caseNumber": "CS-2026-0012345",
      "subject": "Brake pedal squeak",
      "description": "...",
      "status": "In Progress",
      "priority": "Medium",
      "origin": "Phone",
      "contactId": "golden-550e8400-e29b",
      "assetId": "1HGBH41JXMN109186",
      "dealerId": "dealer-0923",
      "createdDate": "2026-07-28T10:30:00Z",
      "lastModifiedDate": "2026-07-29T08:15:00Z",
      "closedDate": null,
      "ownerId": "005xx000000Dummy",
      "escalationCount": 0
    }
  }
}
```

#### 3.3.3 PATCH `/service/cases/{caseId}/escalation`

Escalate case.

**Request Body:**
```json
{
  "reason": "Complex electrical issue requires specialist",
  "newPriority": "High",
  "assignToDealerId": "dealer-0923"
}
```

**Success Response:** HTTP 204 No Content

**Side Effects:**
- Publishes `ServiceCaseEscalation` Platform Event
- Agentforce escalation agent triggers human agent notification

### 3.4 Dealer API (`/dealer/*`)

#### 3.4.1 GET `/dealer/search`

Search dealers by location.

**Authorization:** `dealer:read` scope

**Query parameters:**
- `zip` (string): Postal code
- `city` (string)
- `country` (string, ISO 3166-1 alpha-2)
- `radiusKm` (integer): Search radius (1-500)
- `latitude` (number) & `longitude` (number) (alternative to zip/city)
- `brands` (string, comma-separated): Filter by authorized brands
- `services` (string, comma-separated): `sales`, `service`, `parts`, `roadside`
- `limit` (integer): Default 50, max 200

**Success Response:**
```json
{
  "data": [
    {
      "id": "dealer-0923",
      "type": "dealer",
      "attributes": {
        "dealerCode": "US-0923-ABC",
        "name": "Acme Motors - Downtown",
        "brandsAuthorized": ["BrandA", "BrandB"],
        "address": {
          "street": "456 Oak Ave",
          "city": "Detroit",
          "stateProvince": "MI",
          "postalCode": "48202",
          "country": "US",
          "latitude": 42.3324,
          "longitude": -83.0478
        },
        "services": ["sales", "service", "parts"],
        "phone": "+1-313-555-0100",
        "email": "downtown@acmemotors.example",
        "distanceKm": 3.2,
        "rating": 4.5,
        "isOpen": true,
        "hours": {
          "monday": "08:00-18:00",
          "tuesday": "08:00-18:00",
          "sunday": "Closed"
        }
      }
    }
  ],
  "links": {},
  "meta": {
    "total": 3,
    "returned": 3
  }
}
```

### 3.5 Subscription API (`/subscription/*`)

#### 3.5.1 GET `/subscription/{subscriptionId}`

Retrieve subscription details with benefits.

**Authorization:** `subscription:read` scope

**Success Response:**
```json
{
  "data": {
    "id": "sub-123",
    "type": "subscription",
    "attributes": {
      "subscriptionId": "SUB-A8B9C0D1",
      "accountId": "golden-550e8400-e29b",
      "assetId": "1HGBH41JXMN109186",
      "planName": "Connected Safety Plus",
      "planCode": "PLAN-CON-SAFETY-PLUS",
      "brand": "BrandA",
      "status": "Active",
      "startDate": "2026-01-15T00:00:00Z",
      "endDate": "2027-01-15T00:00:00Z",
      "autoRenew": true,
      "renewalDate": "2027-01-15T00:00:00Z",
      "nextBillingDate": "2026-08-15T00:00:00Z",
      "billingAmount": {
        "amount": 29.99,
        "currency": "USD",
        "interval": "Month"
      },
      "paymentStatus": "Paid"
    },
    "relationships": {
      "benefits": {
        "data": [
          {
            "id": "benefit-navigation",
            "name": "Real-Time Navigation",
            "status": "Active",
            "activatedDate": "2026-01-15T00:00:00Z"
          },
          {
            "id": "benefit-emergency",
            "name": "Emergency Call",
            "status": "Active",
            "activatedDate": "2026-01-15T00:00:00Z"
          }
        ]
      }
    }
  }
}
```

#### 3.5.2 POST `/subscription/{subscriptionId}/activate`

Activate subscription benefit after provisioning.

**Request Body:**
```json
{
  "benefitIds": ["benefit-navigation", "benefit-emergency"],
  "activationMethod": "vehicle_ota",
  "activationDate": "2026-01-15T00:00:00Z"
}
```

**Success Response:** HTTP 204 No Content

**Side Effects:**
- Publishes `SubscriptionChange` Platform Event
- Triggers backend vehicle OTA command (via MuleSoft)
- Add to Actionable Notification List

### 3.6 Recall API (`/recall/*`)

#### 3.6.1 GET `/recall/search?vin={vin}`

Check if a VIN is affected by any recall.

**Success Response:**
```json
{
  "data": {
    "vin": "1HGBH41JXMN109186",
    "affected": false,
    "recalls": []
  }
}
```

OR if affected:
```json
{
  "data": {
    "vin": "1HGBH100000001111",
    "affected": true,
    "recalls": [
      {
        "id": "recall-2026-089",
        "recallId": "TC-2026-089-X",
        "title": "Battery Management Software Update",
        "description": "Potential overcharge risk in high-temperature conditions.",
        "status": "In Progress",
        "regionScope": "Global",
        "reason": "Safety",
        "actionRequired": "Visit Dealer for Free Update",
        "affectedDate": "2026-07-28T00:00:00Z",
        "dealerId": "dealer-0923",
        "appointmentRecommended": true
      }
    ]
  }
}
```

#### 3.6.2 POST `/recall/global/notify`

Initiate mass customer notification for a recall.

**Authorization:** `service:write` + `service:admin:recall` scope

**Request Body:**
```json
{
  "recallId": "recall-2026-089",
  "affectedVinCount": 15234,
  "regionScope": "Global",
  "notificationChannel": ["email", "sms", "push"],
  "templateId": "RECALL-SAFETY-001",
  "batchSize": 50000,
  "schedule": {
    "startAt": "2026-08-01T09:00:00Z",
    "throttlePerMinute": 5000
  }
}
```

**Success Response:** HTTP 202 Accepted with `Location` header pointing to `/batch/recall-notify-abc123/status`

**Batch Job Features:**
- De-duplication by Golden ID (same customer owns multiple affected vehicles)
- Region-aware notification (EU customers receive GDPR-mandated notice format)
- Consent-check (marketing consent required for email; SMS requires separate opt-in)
- Tracked via `Recall_Campaign__c` + `Recall_Notification__c` custom objects
- Updates `Recall Campaign` status to "In Notify", then "Completed"

## 4. Security Standards

### 4.1 OAuth 2.0 Configuration

| Configuration | Setting |
|---------------|---------|
| **Grant Type (Salesforce)** | client_credentials (machine-to-machine), jwt-bearer (user-context), authorization_code (external apps) |
| **Token Endpoint** | `https://login.mulesoft.com/oauth/token` |
| **Scopes** | `customer:read`, `customer:write`, `vehicle:read`, `service:read`, `service:write`, `subscription:read`, `dealer:read`, `recall:read` |
| **Token Validity** | 3600 seconds (1 hour) for client_credentials; 600 seconds for jwt-bearer; refresh token valid 365 days |
| **Refresh Token** | Rotatable; stored encrypted in Anypoint Secrets Manager |
| **Revocation** | Support `/revoke` endpoint; immediate on employee termination or suspicious activity |

### 4.2 mTLS (Mutual TLS)

For the highest security tier (e.g., telematics ingest, payment processing):
- Salesforce outbound Named Credential to MuleSoft uses mTLS with client certificate
- MuleSoft validates client certificate in Anypoint API Gateway policy
- Certificate rotation: automated via HashiCorp Vault integration (90-day cycle)

### 4.3 Token Security

**Storage:**
- Client secrets: Anypoint Secrets Manager (encrypted at rest)
- JWT public keys: Exposed at `/.well-known/jwks.json` (Salesforce verifies locally; no secret sharing)

**Validation:**
- Verify `aud`, `iss`, `exp`, `nbf`, `scope` on every request
- IP allowlist integration (optional): only IPs in Salesforce allowlist can request tokens via client_credentials

### 4.4 Data Protection Standards

- All API payloads logged without PII fields (email masked: `j***.doe@example.com`)
- Query parameters filtered: never return `password`, `secret`, `token` fields
- Response compression: `gzip` always enabled
- Data-at-rest encryption: AWS EBS encryption (MuleSoft) + Salesforce Shield (Salesforce)

### 4.5 IP Restrictions and Network Security

| Component | IP Restriction |
|-----------|----------------|
| MuleSoft API Gateway | Allowlist: Salesforce IP ranges (published by Salesforce) + AWS VPC CIDR + selected dealer VPN CIDRs |
| AWS IoT Core | Allowlist: AWS IoT Core → MuleSoft Lambda IPs only |
| Salesforce Named Credential to MuleSoft | Private Link (no internet); no IP restrictions needed |

## 5. Salesforce-Specific Integration Details

### 5.1 Named Credentials Setup (Salesforce)

**All outbound integrations use Named Credentials:**

```
Named Credential: mulesoft-api-gateway
  - URL: https://api.global-auto.parts
  - Identity Type: Named Principal
  - Authentication Protocol: OAuth 2.0
  - Generate Authorization Header: true
  - Allow Admin Nomination: true
  - Scope: customer:read service:read dealer:read
  - Token Endpoint: https://login.mulesoft.com/oauth/token
  - Client ID: (Anypoint Connected App client ID)
  - Client Secret: (Anypoint Connected App client secret, stored)

Named Credential: mulesoft-api-gateway-staging
  - URL: https://api-staging.global-auto.parts
  - (Same config)
```

**Apex Usage:** Reference `callout:mulesoft-api-gateway` in Apex callout:

```apex
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:mulesoft-api-gateway/api/v1/vehicle/search');
req.setMethod('GET');
req.setHeader('X-Correlation-ID', '550e8400-e29b-41d4-a716-446655440000');
Http http = new Http();
HTTPResponse res = http.send(req);
```

### 5.2 Inbound Integration (MuleSoft → Salesforce)

**Endpoints exposed in Salesforce (REST-based):**

| Endpoint | Purpose | Authentication |
|----------|---------|----------------|
| `/services/apexrest/api/v1/telematics/` | Telematics events from MuleSoft → Salesforce Lightweight | Named Credential (mTLS) + IP allowlist |
| `/services/apexrest/api/v1/dealer/` | DMS updates from MuleSoft | Named Credential + IP allowlist |
| `/services/data/vXX.X/sobjects/Case` | MuleSoft creates cases via Salesforce API | Connected App + External credential |

**Platform Events (preferred for async):**
- `VehicleEvent__e`
- `ServiceCaseEscalation__e`
- `DealerUpdate__e`
- `RecallNotification__e`
- `RoadsideInitiated__e`
- `WorkOrderStatus__e`
- `SubscriptionChange__e`
- `InventoryUpdate__e`

## 6. OpenAPI Specification (Customer API v1)

```yaml
openapi: "3.0.3"
info:
  title: Global Automotive Unification API
  description: Unified customer, vehicle, service, dealer, subscription, and recall APIs
  version: "1.0.0"
  contact:
    name: Enterprise Salesforce Architecture Council
    email: architecture@global-auto.auto

servers:
  - url: https://api.global-auto.parts/api/v1
    description: Production (NA)
  - url: https://api-eu.global-auto.parts/api/v1
    description: Production (EU)

security:
  - OAuth2: [customer:read, customer:write]

paths:
  /customer/unified/{goldenId}:
    get:
      tags: [Unified Customer]
      summary: Retrieve unified customer profile
      operationId: getUnifiedCustomer
      parameters:
        - name: goldenId
          in: path
          required: true
          schema: { type: string, format: uuid }
        - name: includeSubscriptions
          in: query
          schema: { type: boolean, default: false }
        - name: includeVehicles
          in: query
          schema: { type: boolean, default: false }
        - name: includeServiceHistory
          in: query
          schema: { type: boolean, default: false }
      responses:
        '200':
          description: Unified customer profile found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UnifiedCustomer'
        '404':
          $ref: '#/components/responses/NotFound'
        '429':
          $ref: '#/components/responses/RateLimitExceeded'

  /customer/unified/search:
    post:
      tags: [Unified Customer]
      summary: Search unified customers
      operationId: searchUnifiedCustomers
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CustomerSearchRequest'
      responses:
        '200':
          description: Search results
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CustomerSearchResults'

  /customer/unified/{goldenId}/consent:
    patch:
      tags: [Unified Customer]
      summary: Update customer consent (GDPR/CCPA)
      operationId: updateConsent
      parameters:
        - name: goldenId
          in: path
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ConsentUpdateRequest'
      responses:
        '204':
          description: Consent updated successfully
        '404':
          $ref: '#/components/responses/NotFound'

components:
  schemas:
    UnifiedCustomer:
      type: object
      properties:
        id: { type: string }
        type: { type: string }
        attributes:
          $ref: '#/components/schemas/CustomerAttributes'
        relationships:
          $ref: '#/components/schemas/CustomerRelationships'

    CustomerAttributes:
      type: object
      properties:
        firstName: { type: string }
        lastName: { type: string }
        fullName: { type: string }
        email: { type: string, format: email }
        phone: { type: string }
        address: { $ref: '#/components/schemas/Address' }
        consent: { $ref: '#/components/schemas/Consent' }
        brands: { type: array, items: { type: string } }
        lifetimeValue: { $ref: '#/components/schemas/Monetary' }

    CustomerSearchRequest:
      type: object
      properties:
        query:
          type: object
          properties:
            email: { type: string }
            phone: { type: string }
            firstName: { type: string }
            lastName: { type: string }
            addressPostalCode: { type: string }
        filters:
          type: object
          properties:
            brands: { type: array, items: { type: string } }
            hasActiveSubscription: { type: boolean }
            region: { type: string }

    Address:
      type: object
      properties:
        street: { type: string }
        city: { type: string }
        stateProvince: { type: string }
        postalCode: { type: string }
        country: { type: string }
        region: { type: string }

    Consent:
      type: object
      properties:
        marketing: { type: boolean }
        telematics: { type: boolean }
        dataProcessing: { type: boolean }
        lastUpdated: { type: string, format: date-time }

    Monetary:
      type: object
      properties:
        amount: { type: number, format: decimal }
        currency: { type: string }
        asOf: { type: string, format: date-time }

  securitySchemes:
    OAuth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://login.mulesoft.com/oauth/token
          scopes:
            customer:read: Read unified customer data
            customer:write: Update customer data and consent
            vehicle:read: Read vehicle and telematics
            service:read: Read service cases
            service:write: Create and update service cases
            subscription:read: Read subscription details
            dealer:read: Read dealer information
            recall:read: Read recall campaigns
            recall:write: Initiate recall notifications

  responses:
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    RateLimitExceeded:
      description: Too many requests
      headers:
        Retry-After:
          schema: { type: integer, minimum: 1 }
          description: Seconds until rate limit resets
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Error'
    Error:
      type: object
      required: [type, title, status, detail, correlationId, timestamp]
      properties:
        type: { type: string, format: uri }
        title: { type: string }
        status: { type: integer }
        detail: { type: string }
        correlationId: { type: string, format: uuid }
        timestamp: { type: string, format: date-time }
        instance: { type: string }
        errors:
          type: array
          items:
            type: object
            properties:
              field: { type: string }
              code: { type: string }
              message: { type: string }
```

## 7. OpenAPI Supplementals

### 7.1 OpenAPI for Each Domain

All Experience APIs share the `OAuth2` security scheme listed above. Full OpenAPI 3.0 YAML files are maintained in:
- **MuleSoft Exchange:** `global-auto-public-api/v1/customer.yaml`, `v1/vehicle.yaml`, `v1/service.yaml`, `v1/dealer.yaml`, `v1/subscription.yaml`, `v1/recall.yaml`
- **Internal Document:** `docs/api/openapi/v1/` (versioned)

### 7.2 Schema Registry

- MuleSoft Schema Registry stores canonical JSON schemas for all requests and responses
- All schemas validated before processing
- Salesforce Apex `JSON.deserializeUntyped` validates against schema for outbound request payloads before posting to MuleSoft

## 8. Testing Strategy

### 8.1 Contract Testing (Pact/OpenAPI)

- **Consumer-driven contract:** Salesforce (Apex test mocks), Agentforce, mobile app teams publish pact contracts to MuleSoft
- **Provider verification:** MuleSoft team validates provider API against consumer contracts before deployment
- **Contract CI gate:** MuleSoft release blocked if any consumer contract fails verification

### 8.2 Salesforce Test Mock Strategies

```apex
@isTest
public class VehicleAPICalloutTest {
    @isTest
    static void testGetVehicleSuccess() {
        Test.setMock(HttpCalloutMock.class, new VehicleSuccessMock());
        Test.startTest();
        // Call Apex method that invokes vehicle API
        Vehicle_Integration.getVehicleById('1HGBH41JXMN109186');
        Test.stopTest();
        // Assert DML, Platform Events, etc.
    }
}
```

**Mock coverage target:** 100% of Apex callout code paths have mock implementations.

## 9. Appendix: Quick Reference

| API | Base Path | Primary Consumer | Auth Scope |
|-----|-----------|------------------|------------|
| Customer Unified | `/customer/unified/*` | Service Cloud, Agentforce, Data Cloud | `customer:read`, `customer:write` |
| Vehicle | `/vehicle/*` | Service Cloud, Customer Portal | `vehicle:read` |
| Service | `/service/*` | Service Cloud, Agentforce | `service:read`, `service:write` |
| Dealer | `/dealer/*` | Dealer Portal, Sales Cloud | `dealer:read` |
| Subscription | `/subscription/*` | Sales Cloud, Service Cloud | `subscription:read` |
| Recall | `/recall/*` | Service Cloud, Agentforce | `recall:read`, `recall:write` |
