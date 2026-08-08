## Question 13: How do you secure Agentforce Actions?

### Answer

Security in Agentforce Actions is critical for protecting sensitive data, preventing unauthorized access, and ensuring compliance with regulatory requirements. Security must be designed into every Action from the start.

### Architecture Explanation

**Security Layers for Actions**

1. **Authentication**
   - Actions that call external systems must authenticate
   - Named Credentials provide secure authentication storage
   - OAuth 2.0, JWT, and API keys are supported
   - Credentials are encrypted at rest and in transit

2. **Authorization**
   - Actions must respect Salesforce authorization models
   - Field-level security is enforced for all data access
   - Object-level security is enforced for all record access
   - Sharing rules are applied based on the running user

3. **PII Protection**
   - PII data must be masked before being sent to external systems
   - The Trust Layer applies PII masking automatically
   - Custom PII masking rules can be configured per Action
   - PII data is never logged in plain text

4. **Input Validation**
   - All input parameters must be validated
   - Input validation prevents injection attacks
   - Parameter types and ranges are enforced
   - Malformed input is rejected before execution

5. **Output Validation**
   - All output values must be validated
   - Output validation prevents data corruption
   - Output types and formats are enforced
   - Invalid output is flagged and handled

6. **Audit Logging**
   - All Action executions are logged for audit
   - Audit logs include the user, Action, inputs, outputs, and timestamp
   - Audit logs are immutable and retained per compliance requirements
   - Audit logs support compliance reporting (GDPR, HIPAA, SOC2)

7. **Encryption**
   - Data in transit is encrypted (TLS 1.2+)
   - Data at rest is encrypted (AES-256)
   - Encryption keys are managed by Salesforce
   - Custom encryption can be configured for sensitive fields

8. **Network Security**
   - External callouts use secure endpoints
   - IP whitelisting can be configured for external services
   - Certificate pinning can be enabled
   - Firewall rules protect external integrations

**Security Configuration**

Per Action:
- Authentication method
- PII masking rules
- Input/output validation rules
- Audit logging configuration

Per Agent:
- Default security settings
- Trust Layer configuration
- Data retention policy

Per Organization:
- Organization-wide security policies
- Compliance requirements
- Data residency rules

### Real-World Example

A healthcare company secures an Agentforce agent for patient data:

**Action**: Flow Action "GetPatientRecord"
- **Authentication**: Named Credential with OAuth 2.0
- **Authorization**: Field-level security enforces PHI access restrictions
- **PII Protection**: Trust Layer masks SSN, DOB, and medical record numbers
- **Input Validation**: Patient ID is validated against the Account object
- **Output Validation**: Patient data is validated against the schema
- **Audit Logging**: Full audit log with user, patient ID, and timestamp
- **Encryption**: TLS 1.3 for data in transit, AES-256 for data at rest

**Trust Layer Configuration**:
- Zero Data Retention enabled
- PII masking for all PHI fields
- Content filtering for compliance
- Audit logging for HIPAA compliance

### Common Mistakes

- Not using Named Credentials for authentication
- Not enforcing field-level security
- Not masking PII data
- Not logging audit trails
- Not validating input and output data
- Not encrypting data in transit

### Interview Tips

- Explain the security layers for Actions
- Provide a concrete example with security configuration
- Emphasize the Trust Layer and PII protection
- Connect security to compliance requirements

### Follow-up Questions

1. How do you configure PII masking?
2. What is a Named Credential?
3. How do you enforce field-level security?
4. How do you audit Action executions?