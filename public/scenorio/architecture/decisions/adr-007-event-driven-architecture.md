# ADR-007: Event-Driven Architecture
**Status:** Accepted
**Date:** 2026-07-28
**Decision Makers:** Enterprise Salesforce Architecture Council

---

## Context

The organization has 14 independent brands, 125M connected vehicles generating telemetry, and complex integration requirements across 4 ERPs and multiple legacy systems. Tight coupling between systems creates fragility and limits scalability. We need an architecture that decouples systems, enables async processing, and supports real-time event streams from connected vehicles.

We must choose between:
1. **Event-Driven Architecture** — Platform Events + MuleSoft streaming
2. **Request-Reply Architecture** — synchronous API calls
3. **Batch Architecture** — scheduled data synchronization
4. **Hybrid Approach** — mix of event-driven and request-reply

## Options Considered

### Option A: Event-Driven Architecture (RECOMMENDED)
| Aspect | Details |
|--------|---------|
| **Communication** | Async via Platform Events + MQ |
| **Coupling** | Loose — decoupled producers/consumers |
| **Scalability** | High — independent scaling |
| **Resilience** | High — retry, dead-letter queues |
| **Real-Time** | Sub-second event delivery |
| **Complexity** | Medium — requires event design |

### Option B: Request-Reply Architecture
| Aspect | Details |
|--------|---------|
| **Communication** | Sync REST/SOAP APIs |
| **Coupling** | Tight — direct dependencies |
| **Scalability** | Limited — synchronous bottleneck |
| **Resilience** | Low — cascading failures |
| **Real-Time** | Yes, but blocking |
| **Complexity** | Low initially, high at scale |

### Option C: Batch Architecture
| Aspect | Details |
|--------|---------|
| **Communication** | Scheduled batch jobs |
| **Coupling** | Loose, but delayed |
| **Scalability** | Medium — batch windows |
| **Resilience** | High — isolated failures |
| **Real-Time** | No — minutes to hours |
| **Complexity** | Low |

### Option D: Hybrid Approach
| Aspect | Details |
|--------|---------|
| **Communication** | Events for some, APIs for others |
| **Coupling** | Mixed |
| **Scalability** | Medium |
| **Resilience** | Medium |
| **Real-Time** | Partial |
| **Complexity** | High — inconsistent patterns |

## Decision

**ACCEPTED: Option A — Event-Driven Architecture**

## Rationale

1. **Decoupling**: Event-driven architecture decouples 14 brands, enabling them to operate independently while sharing data. Critical for the phased migration approach.

2. **Scalability**: Connected vehicles generate 110TB/year of telemetry. Event streaming handles this volume without synchronous bottlenecks.

3. **Resilience**: Async processing with retry logic and dead-letter queues ensures no data loss during system outages.

4. **Real-Time Requirements**: Vehicle alerts, service triggers, and recall notifications require sub-second delivery. Events deliver this; batch cannot.

5. **Brand Independence**: Acquired companies can continue operating independently, publishing events to the unified platform without direct coupling.

6. **Future-Proof**: Event-driven patterns scale naturally. Adding new brands or systems only requires subscribing to relevant events.

7. **MuleSoft Support**: MuleSoft streaming + Platform Events provide complete event-driven stack.

8. **Salesforce Native**: Platform Events are native to Salesforce, with limits designed for enterprise scale.

## Consequences

### Positive
- Decouples 14 brands during transition
- Handles 125M connected vehicle events at scale
- Enables real-time service automation
- Resilient to system failures
- Future acquisition-ready
- Supports async processing reducing governor limits

### Negative
- Event design requires upfront planning
- Debugging async flows is more complex
- Event ordering can be challenging
- Requires monitoring of event health

### Risks
- **R-003**: Governor limit breach — mitigated by async processing
- **R-005**: Integration failure — mitigated by retry logic, circuit breakers
- **R-009**: MuleSoft complexity — mitigated by event governance

## Implementation Notes

### Event Catalog

| Event | Publisher | Subscribers | Volume | Priority |
|-------|-----------|-------------|--------|----------|
| `CustomerUnified` | Data Cloud | Service, Marketing, Tableau | Low | High |
| `VehicleAdded` | IoT Gateway | Service, Agentforce | High | Medium |
| `ServiceCaseCreated` | Service Cloud | Marketing, Data Cloud | Medium | Medium |
| `RecallTriggered` | Manufacturing | Agentforce, Service | Low | Critical |
| `DealerRegistered` | Experience Cloud | Marketing, Sales | Low | Medium |
| `BrandOnboarded` | Integration | All clouds | Low | High |
| `TelemetryAlert` | IoT Gateway | Agentforce, Service | Very High | High |
| `IdentityBridgeSync` | Identity Bridge | Data Cloud | Medium | Medium |

### Event Processing Patterns

| Pattern | Use Case | Implementation |
|---------|----------|---------------|
| **Event Notification** | Low-volume, high-priority | Platform Events |
| **Event-Carried State Transfer** | State synchronization | Platform Events + Data Cloud |
| **Event Sourcing** | Audit trail, replay | Platform Events + Big Objects |
| **CQRS** | Read/write separation | Platform Events + Data Cloud |

### Platform Events Limits

| Metric | Limit | Strategy |
|--------|-------|----------|
| **Events per day** | 750M (Enterprise) | Partition by event type, use high-volume events |
| **Event retention** | 3 days | Replay for recovery, persist to Big Objects |
| **Subscribers per event** | 100 | Use Platform Events + MQ for broader distribution |
| **Event size** | 1MB | Compress payloads, use external references |

### MuleSoft Event Streaming

| Component | Purpose |
|-----------|---------|
| **MQ Broker** | Message queuing for async processing |
| **Streaming Engine** | IoT telemetry processing |
| **Event Router** | Route events to Salesforce and external systems |
| **Dead Letter Queue** | Failed event handling and retry |

## Related Decisions

- ADR-003: MuleSoft Integration (event streaming)
- ADR-006: Big Objects Strategy (event archiving)
- ADR-009: Einstein AI (event-driven predictions)

---

*Decision recorded by: Enterprise Salesforce Architecture Council*
*Next review: 2026-08-28*
