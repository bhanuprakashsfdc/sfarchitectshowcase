## Question 2: What is a Unified Individual in Data Cloud?

### Answer

A Unified Individual is the central entity in Salesforce Data Cloud that represents a single customer across all data sources. It consolidates all customer data into a single profile, enabling a 360-degree view of the customer.

### Architecture Explanation

**Unified Individual Components**

1. **Identity**
   - The unified identity for the individual
   - Links all identities from different sources
   - Example: Identity ID "UID-123" links CRM ID "C123", Web ID "W456", and Email ID "E789"

2. **Attributes**
   - Individual attributes from all sources
   - Includes demographics, preferences, and behavior
   - Example: Name, Email, Phone, Address, Preferences

3. **Relationships**
   - Links to related records (accounts, contacts, opportunities)
   - Example: "John Smith" → "Acme Corp" → 3 Orders → 2 Cases

4. **Behaviors**
   - Behavioral data from all sources
   - Includes web visits, email interactions, purchases
   - Example: "Visited website 5 times, opened 3 emails, purchased 2 items"

5. **Segments**
   - Customer segments the individual belongs to
   - Example: "High Value", "Healthcare Industry", "At Risk"

6. **Insights**
   - Calculated insights about the individual
   - Example: "Churn Risk: Low", "Upsell Probability: High", "Lifetime Value: $15,000"

**Unified Individual Lifecycle**

1. **Creation**: A Unified Individual is created when the first identity is resolved
2. **Enrichment**: Data from additional sources is added over time
3. **Update**: Existing data is updated as new data arrives
4. **Expiration**: Inactive individuals may be archived after a configurable period

**Unified Individual vs. CRM Contact**

| Aspect | Unified Individual | CRM Contact |
|--------|-------------------|-------------|
| Scope | Cross-source | Single source (CRM) |
| Data | All data sources | CRM data only |
| Identity | Unified across sources | Single identity |
| Behaviors | All behaviors | CRM interactions only |
| Insights | Calculated insights | No calculated insights |

### Real-World Example

A Unified Individual for John Smith:

**Identity**: UID-123 (links C123, W456, E789)
**Attributes**: Name: John Smith, Email: john@example.com, Phone: 555-0100, Industry: Healthcare
**Relationships**: Account: Acme Corp, Orders: 5, Cases: 2
**Behaviors**: Web visits: 12, Email opens: 8, Purchases: 3
**Segments**: High Value, Healthcare, At Risk
**Insights**: Churn Risk: Low, Upsell Probability: High, LTV: $15,000

### Common Mistakes

- Not enriching Unified Individuals with all data sources
- Not updating Unified Individuals in real time
- Not using segments and insights
- Confusing Unified Individuals with CRM Contacts

### Interview Tips

- Explain Unified Individual components
- Provide a concrete example
- Emphasize the 360-degree view
- Connect Unified Individuals to the overall Data Cloud architecture

### Follow-up Questions

1. How do Unified Individuals differ from CRM Contacts?
2. How do you enrich Unified Individuals?
3. What is the lifecycle of a Unified Individual?
4. How do you use Unified Individuals in Agentforce?