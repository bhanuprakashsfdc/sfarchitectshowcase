## Question 9: What is audit logging in Agentforce?

### Answer

Audit logging in Agentforce captures a complete record of every interaction, action, and decision made by the agent. Audit logging is essential for compliance, debugging, and security monitoring.

### Architecture Explanation

**Audit Log Components**

1. **Interaction Log**
   - Records every user message and agent response
   - Includes timestamps, user IDs, and session IDs
   - Example: User: "What's my balance?" → Agent: "Your balance is $5,000."

2. **Action Log**
   - Records every Action execution
   - Includes Action type, parameters, inputs, outputs, and status
   - Example: Flow Action "GetBalance" executed with input UserID=123, output Balance=$5000

3. **Reasoning Log**
   - Records the Atlas reasoning chain
   - Includes intent classification, Topic selection, and planning
   - Example: Intent: "Balance Inquiry" (0.95), Topic: "Account Management"

4. **Grounding Log**
   - Records all grounding data retrieval
   - Includes sources, queries, and results
   - Example: Grounding: CRM query for UserID=123, returned Account record

5. **Security Log**
   - Records security events (PII masking, injection attempts, etc.)
   - Includes event type, details, and outcome
   - Example: PII masked: SSN in user input, Action: redaction

6. **Error Log**
   - Records all errors and failures
   - Includes error type, details, and recovery actions
   - Example: Action failed: REST API timeout, Retry: succeeded on 2nd attempt

**Audit Log Configuration**
- Log levels are configured (debug, info, warn, error)
- Retention policies are defined
- Access control is applied
- Export and reporting are configured

**Audit Log Compliance**
- GDPR: Audit logs support right to access and right to erasure
- HIPAA: Audit logs support HIPAA compliance reporting
- SOC2: Audit logs support SOC2 Type II compliance
- PCI DSS: Audit logs support PCI DSS compliance for payment data

### Real-World Example

A bank uses audit logging for compliance:

**Interaction Log**: User asked "What's my balance?" at 2026-08-06T10:30:00Z
**Action Log**: Flow Action "GetBalance" executed, input UserID=123, output Balance=$5000
**Reasoning Log**: Intent "Balance Inquiry" (0.95), Topic "Account Management"
**Grounding Log**: CRM query for UserID=123, returned Account record
**Security Log**: PII masked: none detected
**Error Log**: No errors

**Compliance**: All logs are retained for 7 years per regulatory requirements.

### Common Mistakes

- Not enabling audit logging
- Not configuring retention policies
- Not securing audit logs
- Not reviewing audit logs regularly

### Interview Tips

- Explain audit log components
- Provide a concrete example
- Emphasize compliance requirements
- Connect audit logging to the Trust Layer

### Follow-up Questions

1. What is the retention policy for audit logs?
2. How do you secure audit logs?
3. What compliance frameworks require audit logging?
4. How do you review audit logs?