## Question 2: What is Zero Data Retention?

### Answer

Zero Data Retention is a Trust Layer configuration option that ensures no user data is stored after the AI interaction completes. It is a critical privacy feature for agents handling sensitive data.

### Architecture Explanation

**Zero Data Retention Mechanism**

1. **No Data Persistence**
   - User messages are not stored after processing
   - LLM responses are not stored
   - Conversation logs are not persisted
   - No data is written to any storage system

2. **Ephemeral Processing**
   - Data exists only in memory during processing
   - Data is discarded after the response is delivered
   - No traces remain in logs, databases, or caches

3. **Compliance Benefits**
   - GDPR right to erasure is automatically satisfied
   - HIPAA data minimization is enforced
   - No data breach risk from stored conversations
   - Simplified compliance auditing

4. **Trade-offs**
   - No conversation history for continuity
   - No analytics on past interactions
   - No debugging capability for past conversations
   - Higher cost (no caching of repeated queries)

**Zero Data Retention Configuration**
- Enabled per agent or globally
- Overrides all data retention policies
- Cannot be disabled after the interaction completes
- Applies to all data sources (CRM, Data Cloud, external)

### Real-World Example

A financial services company enables Zero Data Retention for a customer service agent:

**Before Zero Data Retention**:
- Customer queries are stored in a log database
- LLM responses are cached for analytics
- Conversation history is available for quality review
- Risk of data exposure from stored conversations

**After Zero Data Retention**:
- Customer queries are processed in memory only
- No data is stored after the interaction
- No conversation history is available
- Zero risk of data exposure from stored conversations
- GDPR compliance is simplified

### Common Mistakes

- Not enabling Zero Data Retention for sensitive use cases
- Not understanding the trade-offs (no analytics, no debugging)
- Not configuring it at the agent level
- Assuming it applies to all data sources automatically

### Interview Tips

- Explain Zero Data Retention and its mechanism
- Provide a concrete example
- Emphasize the trade-offs
- Connect to compliance requirements

### Follow-up Questions

1. What are the trade-offs of Zero Data Retention?
2. When should you enable Zero Data Retention?
3. How does it affect analytics?
4. How does it affect debugging?