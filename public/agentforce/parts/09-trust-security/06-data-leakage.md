## Question 6: How does Agentforce prevent data leakage?

### Answer

Data leakage in Agentforce occurs when sensitive data is inadvertently exposed to unauthorized users or external systems. Preventing data leakage is a critical security concern for Agentforce deployments.

### Architecture Explanation

**Data Leakage Vectors**

1. **LLM Response Leakage**
   - The LLM may include sensitive data in its response
   - Example: The LLM includes a customer's SSN in a response

2. **Context Leakage**
   - Sensitive context data is exposed through the prompt
   - Example: Grounding data includes PHI that is returned to the user

3. **Action Result Leakage**
   - Action results contain sensitive data that is exposed
   - Example: A Flow Action returns customer data that is displayed to the user

4. **Log Leakage**
   - Sensitive data is stored in logs
   - Example: PII is logged in audit logs

5. **API Leakage**
   - Sensitive data is exposed through external API responses
   - Example: An external API returns data that includes PII

**Prevention Mechanisms**

1. **Output Filtering**
   - LLM responses are scanned for sensitive data
   - PII in responses is masked before delivery
   - Example: SSN in the LLM response is replaced with ***-**-1234

2. **Response Validation**
   - Responses are validated against data access policies
   - Responses that contain unauthorized data are blocked
   - Example: A response containing another customer's data is blocked

3. **Field-Level Security**
   - Field-level security is enforced for all data access
   - Users can only access data they have permission to see
   - Example: A customer can only see their own data

4. **Data Loss Prevention (DLP)**
   - DLP policies are enforced on all outputs
   - Sensitive data patterns are detected and blocked
   - Example: Credit card numbers in responses are masked

5. **Log Sanitization**
   - Logs are sanitized to remove sensitive data
   - PII is masked in logs
   - Example: SSN in audit logs is replaced with ***-**-1234

6. **API Response Filtering**
   - External API responses are filtered before being used
   - Sensitive data in API responses is masked
   - Example: PII in API responses is removed

### Real-World Example

A healthcare company prevents data leakage:

1. **Output Filtering**: LLM responses are scanned for PHI before delivery
2. **Response Validation**: Responses are validated against patient access policies
3. **Field-Level Security**: Patients can only see their own medical records
4. **DLP**: Credit card numbers and SSNs are masked in all outputs
5. **Log Sanitization**: Audit logs have PII masked
6. **API Filtering**: External API responses are filtered for PHI

**Result**: Zero data leakage incidents in 12 months.

### Common Mistakes

- Not filtering LLM outputs for sensitive data
- Not enforcing field-level security
- Not sanitizing logs
- Not validating responses against access policies

### Interview Tips

- Explain data leakage vectors and prevention
- Provide a concrete example
- Emphasize the multi-layered defense approach
- Connect data leakage prevention to the Trust Layer

### Follow-up Questions

1. What are the main data leakage vectors?
2. How does DLP work?
3. How do you test for data leakage?
4. What is the difference between data leakage and data breach?