## Question 8: What are Reusable Actions?

### Answer

Reusable Actions are Actions that are designed to be shared across multiple Topics, agents, and use cases. Reusability reduces duplication, improves consistency, and accelerates development.

### Architecture Explanation

**Reusable Action Types**

1. **Shared Flow Actions**
   - Flows that are designed to be reused across multiple agents
   - The Flow is generic and parameterized
   - Input parameters are configurable per use case
   - Example: A "GetCustomerProfile" Flow that can be used by any agent that needs customer data

2. **Shared Apex Actions**
   - Apex classes that are designed as reusable services
   - The class is generic and accepts parameters
   - No hardcoded business logic
   - Example: A "ValidateAddress" Apex class that can be used by any agent that needs address validation

3. **Shared REST API Actions**
   - REST API configurations that are reused across agents
   - The endpoint, authentication, and mapping are defined once
   - Parameters are configurable per use case
   - Example: A "GetWeather" REST API Action that can be used by any agent that needs weather data

4. **Shared Prompt Templates**
   - Prompt Templates that are designed for reuse
   - Templates use variables instead of hardcoded values
   - Templates can be customized per use case
   - Example: A "GenerateResponse" Prompt Template that can be used by any agent

**Reusability Design Principles**

1. **Parameterization**
   - All hardcoded values should be parameterized
   - Parameters should be well-documented
   - Default values should be provided where appropriate

2. **Generic Design**
   - Actions should be designed for the broadest possible use case
   - Avoid domain-specific logic in reusable Actions
   - Use configuration rather than code for domain-specific behavior

3. **Clear Contracts**
   - Input and output contracts should be well-defined
   - Contracts should be documented
   - Breaking changes should be versioned

4. **Versioning**
   - Reusable Actions should be versioned
   - Version changes should be backward compatible when possible
   - Deprecation policies should be defined

5. **Governance**
   - A governance process should manage reusable Actions
   - Changes should be reviewed and approved
   - Usage should be monitored

**Reusability Benefits**

1. **Consistency**: Same behavior across all agents that use the Action
2. **Efficiency**: Write once, use many times
3. **Maintainability**: Update in one place, propagate everywhere
4. **Quality**: Tested once, trusted everywhere
5. **Speed**: Faster development for new agents

### Real-World Example

A global company has the following Reusable Actions:

1. **GetCustomerProfile** (Shared Flow Action): Used by 15 different agents across Customer Service, Sales, and Billing
2. **ValidateAddress** (Shared Apex Action): Used by 8 agents for address validation
3. **GetMarketData** (Shared REST API Action): Used by 5 agents for financial data
4. **GenerateResponse** (Shared Prompt Template): Used by 12 agents for response generation
5. **SendNotification** (Shared Flow Action): Used by 10 agents for notification delivery

**Governance**:
- All reusable Actions are stored in a shared library
- Changes require review and approval
- Version history is maintained
- Usage is monitored through observability dashboards

### Common Mistakes

- Creating Actions that are too specific and not reusable
- Not parameterizing hardcoded values
- Not versioning reusable Actions
- Not documenting input/output contracts
- Not governing reusable Actions properly

### Interview Tips

- Explain reusability design principles
- Provide concrete examples of reusable Actions
- Emphasize the benefits of reusability
- Mention governance and versioning

### Follow-up Questions

1. How do you identify reusable Actions?
2. How do you version reusable Actions?
3. What is the governance process for reusable Actions?
4. How do you balance reusability with specificity?