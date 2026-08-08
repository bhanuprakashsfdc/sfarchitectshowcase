## Question 10: What is compliance in Agentforce?

### Answer

Compliance in Agentforce ensures that the agent operates within regulatory and organizational requirements. Compliance covers GDPR, HIPAA, SOC2, and other frameworks that govern data handling and AI usage.

### Architecture Explanation

**Compliance Frameworks**

1. **GDPR Compliance**
   - Right to access: Users can request their data
   - Right to erasure: Data can be deleted on request
   - Data minimization: Only necessary data is collected
   - Consent management: User consent is tracked and enforced
   - Data portability: Data can be exported in standard formats

2. **HIPAA Compliance**
   - PHI protection: Patient health information is protected
   - Access control: Only authorized users can access PHI
   - Audit logging: All PHI access is logged
   - Business Associate Agreement (BAA): Required for LLM providers
   - Minimum necessary: Only minimum PHI is used

3. **SOC2 Compliance**
   - Security: Data is protected from unauthorized access
   - Availability: The agent is available when needed
   - Confidentiality: Sensitive data is kept confidential
   - Processing integrity: Data is processed accurately
   - Privacy: User privacy is maintained

4. **PCI DSS Compliance**
   - Cardholder data is protected
   - Payment data is encrypted
   - Access to payment data is restricted
   - Audit trails are maintained

**Compliance Controls**

1. **Data Classification**
   - Data is classified by sensitivity
   - Different controls apply to different data types
   - Example: PHI has stricter controls than general data

2. **Access Control**
   - Role-based access control (RBAC)
   - Field-level security is enforced
   - Object-level security is enforced
   - Example: Only authorized users can access PHI

3. **Data Retention**
   - Data retention policies are enforced
   - Data is deleted after the retention period
   - Example: Conversation logs are retained for 1 year

4. **Consent Management**
   - User consent is tracked
   - Consent is required for data processing
   - Consent can be withdrawn
   - Example: Users must consent to data processing before using the agent

5. **Audit and Reporting**
   - Compliance reports are generated
   - Audit logs are maintained
   - Regular compliance reviews are conducted
   - Example: Monthly compliance reports are generated

### Real-World Example

A healthcare company ensures HIPAA compliance:

1. **Data Classification**: PHI is classified and tagged
2. **Access Control**: Only authorized healthcare providers can access PHI
3. **PII Masking**: Patient SSN and DOB are masked before reaching the LLM
4. **Zero Data Retention**: No PHI is stored after the interaction
5. **Audit Logging**: All PHI access is logged with user, timestamp, and action
6. **BAA**: A Business Associate Agreement is in place with the LLM provider
7. **Consent**: Patients must consent before their data is used
8. **Reporting**: Monthly HIPAA compliance reports are generated

### Common Mistakes

- Not configuring compliance controls
- Not maintaining audit logs
- Not enforcing data retention policies
- Not having a BAA with LLM providers
- Not tracking user consent

### Interview Tips

- Explain compliance frameworks and controls
- Provide a concrete example
- Emphasize the importance of audit logging
- Connect compliance to the Trust Layer

### Follow-up Questions

1. What compliance frameworks does Agentforce support?
2. How do you enforce GDPR compliance?
3. What is a Business Associate Agreement?
4. How do you audit compliance?