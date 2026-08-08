## Question 4: How does runtime context work?

### Answer

Runtime context is the information about the current execution environment that provides context to the Agentforce agent. Runtime context includes data about the system, the environment, and the current execution state.

### Architecture Explanation

**Runtime Context Components**

1. **Execution Environment**
   - Salesforce org details (instance, edition, features)
   - Agent configuration details
   - Deployment environment (sandbox, production)

2. **Time and Date**
   - Current timestamp
   - Time zone
   - Business hours
   - Example: "Current time: 2026-08-06T10:30:00Z, Timezone: UTC-5, Business hours: 9AM-5PM"

3. **Geographic Context**
   - User location (IP-based or explicit)
   - Region and country
   - Language and locale
   - Example: "User location: New York, US, Language: en-US"

4. **System State**
   - System health and availability
   - External system status
   - Queue depth and load
   - Example: "Payment gateway: available, CRM: healthy, Queue depth: 5"

5. **Resource Context**
   - Available compute and memory
   - Token budget remaining
   - Action execution limits
   - Example: "Token budget: 2000/4000, Actions remaining: 10"

6. **Security Context**
   - User permissions and access levels
   - Field-level security settings
   - Sharing rules
   - Example: "User has read access to Orders, write access to Cases"

**Runtime Context Usage**

- Runtime context is used by the Atlas engine for decision-making
- Runtime context is injected into prompts
- Runtime context is available to Actions
- Runtime context is logged for observability

**Runtime Context Updates**

- Runtime context is updated in real time
- System state changes trigger context updates
- Resource usage changes trigger context updates
- Security context changes trigger context updates

### Real-World Example

A customer interacts with an Agentforce agent during business hours:

**Runtime Context**:
- Execution Environment: Production, Salesforce Enterprise Edition
- Time and Date: 2026-08-06T10:30:00Z, Business hours: 9AM-5PM EST
- Geographic Context: User in New York, US, Language: en-US
- System State: Payment gateway available, CRM healthy
- Resource Context: Token budget 3500/4000, Actions remaining 8
- Security Context: User has read access to Orders, write access to Cases

**Usage**:
- Atlas uses business hours to determine if the agent should offer callback
- Prompt includes geographic context for localized responses
- Actions check resource context before execution
- Security context enforces field-level security

### Common Mistakes

- Not using runtime context for decision-making
- Not updating runtime context in real time
- Ignoring security context in Actions
- Not logging runtime context for observability

### Interview Tips

- Explain runtime context components
- Provide a concrete example
- Emphasize real-time updates
- Connect runtime context to the Atlas decision-making process

### Follow-up Questions

1. What is the most important runtime context component?
2. How do you update runtime context in real time?
3. How does runtime context affect security?
4. How do you log runtime context?