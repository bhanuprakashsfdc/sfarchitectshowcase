# Part 8 — Salesforce Data Cloud

---

## Question 1: What is Identity Resolution in Data Cloud?

### Answer

Identity Resolution is the process of unifying customer identities across multiple data sources to create a single, accurate customer profile. In Salesforce Data Cloud, Identity Resolution is a core capability that enables personalized AI-driven experiences.

### Architecture Explanation

**Identity Resolution Process**

1. **Data Ingestion**
   - Data is ingested from multiple sources (CRM, web, email, IoT, POS, etc.)
   - Each source may have different identifiers for the same customer
   - Example: CRM has customer ID "C123", web has cookie "W456", email has subscriber ID "E789"

2. **Identity Matching**
   - Data Cloud matches identities across sources using matching rules
   - Matching can be deterministic (exact match) or probabilistic (fuzzy match)
   - Deterministic: Exact match on email, phone, or other unique identifiers
   - Probabilistic: Fuzzy match on name, address, or other partial identifiers

3. **Identity Graph**
   - Matched identities are linked in an Identity Graph
   - The Identity Graph shows all identities belonging to a single individual
   - Example: C123, W456, and E789 are linked to a single Identity

4. **Unified Individual**
   - A Unified Individual is created from all linked identities
   - The Unified Individual contains all data from all sources
   - Example: The Unified Individual has CRM data, web behavior, email interactions, and purchase history

**Identity Resolution Configuration**
- Matching rules are defined per data source
- Matching keys are selected (email, phone, etc.)
- Matching strategy (deterministic or probabilistic) is configured
- Identity Graph is maintained and updated

### Real-World Example

A retail company has the following customer data:
- CRM: Customer ID "C123", Name "John Smith", Email "john@example.com"
- Web: Cookie "W456", Email "john@example.com", Browsing history
- Email: Subscriber ID "E789", Email "john@example.com", Open/click data
- POS: Transaction ID "T001", Phone "555-0100", Purchase history

**Identity Resolution**:
1. Deterministic match: C123, W456, and E789 all match on "john@example.com"
2. Probabilistic match: T001 matches on "John Smith" + "555-0100" (fuzzy match)
3. Identity Graph: All four identities are linked
4. Unified Individual: Single profile with CRM data, web behavior, email interactions, and purchase history

### Common Mistakes

- Not defining matching rules properly
- Not using both deterministic and probabilistic matching
- Not maintaining the Identity Graph over time
- Not handling identity conflicts

### Interview Tips

- Explain the Identity Resolution process
- Provide a concrete example
- Emphasize the importance of matching rules
- Connect Identity Resolution to the overall Data Cloud architecture

### Follow-up Questions

1. What is the difference between deterministic and probabilistic matching?
2. How do you handle identity conflicts?
3. What is an Identity Graph?
4. How do you maintain Identity Resolution over time?