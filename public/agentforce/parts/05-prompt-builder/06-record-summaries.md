## Question 6: What are record summaries in Prompt Templates?

### Answer

Record summaries in Prompt Templates provide a concise, structured summary of Salesforce records that is injected into the prompt. Record summaries enable the LLM to understand the current state of relevant records without requiring the full record data.

### Architecture Explanation

**Record Summary Components**

1. **Record Selection**
   - Defines which Salesforce records are included in the summary
   - Records are selected based on the current context (user, Topic, Action)
   - Example: "Include the customer's Account record and the last 5 Order records"

2. **Field Selection**
   - Defines which fields from the selected records are included
   - Only relevant fields are included to minimize token usage
   - Example: "Include Name, Phone, Industry from Account; OrderNumber, Status, TotalAmount from Orders"

3. **Summary Format**
   - Defines how the record data is formatted in the prompt
   - Formats include: JSON, plain text, table, bullet points
   - Example: "Format the Account summary as: Name: {Name}, Phone: {Phone}, Industry: {Industry}"

4. **Summary Generation**
   - Record summaries can be generated dynamically at runtime
   - Summaries are generated from the selected records and fields
   - Summaries are cached for performance when appropriate

5. **Summary Update**
   - Record summaries are refreshed when the underlying data changes
   - Cache invalidation is triggered by record updates
   - Stale summaries are detected and regenerated

**Record Summary Types**

1. **Single Record Summary**: Summarizes a single Salesforce record
2. **Multi-Record Summary**: Summarizes multiple related records
3. **Related Record Summary**: Summarizes records related to the primary record
4. **Aggregate Summary**: Summarizes aggregated data (counts, sums, averages)

**Record Summary Configuration**
- Record selection is configured per Prompt Template
- Field selection is configured per Prompt Template
- Summary format is configured per Prompt Template
- Cache settings are configured per Prompt Template

### Real-World Example

A Prompt Template for a customer service agent includes a record summary:

**Record Selection**: Account and last 3 Orders
**Field Selection**: Account (Name, Phone, Industry, Status), Orders (OrderNumber, Status, TotalAmount, OrderDate)
**Summary Format**: JSON

**Generated Summary**:
```json
{
  "Account": {
    "Name": "Acme Corp",
    "Phone": "555-0100",
    "Industry": "Manufacturing",
    "Status": "Active"
  },
  "Orders": [
    {"OrderNumber": "ORD-001", "Status": "Delivered", "TotalAmount": 5000, "OrderDate": "2026-01-15"},
    {"OrderNumber": "ORD-002", "Status": "Shipped", "TotalAmount": 3000, "OrderDate": "2026-02-20"},
    {"OrderNumber": "ORD-003", "Status": "Processing", "TotalAmount": 7500, "OrderDate": "2026-03-10"}
  ]
}
```

**Rendered Prompt**:
"Customer Account: Acme Corp (Manufacturing, Active). Recent Orders: ORD-001 (Delivered, $5,000), ORD-002 (Shipped, $3,000), ORD-003 (Processing, $7,500). How can I help you today?"

### Common Mistakes

- Including too many fields in the summary, wasting tokens
- Not refreshing stale summaries
- Not selecting the right records for the context
- Not formatting summaries consistently

### Interview Tips

- Explain record summary components and types
- Provide a concrete example of record summary generation
- Emphasize token optimization through selective field selection
- Connect record summaries to grounding

### Follow-up Questions

1. How do you configure record summaries?
2. What is the impact of record summaries on token usage?
3. How do you handle stale summaries?
4. What are the different summary formats?