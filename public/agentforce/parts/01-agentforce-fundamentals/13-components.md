## Question 13: What are the components of an Agentforce agent?

### Answer

An Agentforce agent is composed of several interconnected components that work together to process user requests, reason about intent, execute actions, and return responses. Each component plays a specific role in the agent's functionality.

### Architecture Explanation

**1. Agent Configuration**
- The top-level configuration that defines the agent's identity, purpose, and scope
- Includes the agent name, description, and instructions
- Defines the default LLM model and parameters
- Configures the Trust Layer settings
- Sets the escalation and fallback behavior

**2. Topics**
- Topics define the agent's areas of expertise
- Each Topic has a description, instructions, entry criteria, and exit criteria
- Topics contain the logic for how the agent handles specific types of requests
- Topics are the primary organizational unit for agent behavior

**3. Actions**
- Actions define what the agent can do
- Each Action is a callable unit of functionality (Flow, Apex, REST API, etc.)
- Actions are invoked by the Atlas reasoning engine based on the current Topic and intent
- Actions can be synchronous or asynchronous

**4. Prompt Templates**
- Prompt Templates define how the agent generates responses
- Each Template includes system instructions, context variables, and output formatting
- Prompt Templates are rendered dynamically with data from grounding and context
- Templates can be versioned and tested

**5. Context Variables**
- Context Variables store and pass data between Topics and Actions
- They include conversation context, session context, and runtime context
- Context Variables are populated from grounding data, Action results, and user input
- They enable dynamic, data-driven agent behavior

**6. Grounding Sources**
- Grounding Sources provide the data that the agent uses to inform its responses
- Sources include Salesforce CRM, Data Cloud, Knowledge articles, and external APIs
- Grounding Sources are configured per agent or per Topic
- They enable the agent to access real-time, relevant data

**7. Trust Layer Configuration**
- The Trust Layer configuration defines security and compliance settings
- Includes PII masking rules, content filtering policies, and audit logging settings
- Configures data retention policies (Zero Data Retention option)
- Enforces field-level security and object-level security

**8. Observability Configuration**
- The Observability configuration defines monitoring and logging settings
- Includes tracing, metrics collection, and alerting rules
- Configures conversation analytics and quality metrics
- Enables production debugging

**9. Integration Configuration**
- Integration configuration defines connections to external systems
- Includes MuleSoft integration, External Service configuration, and REST API endpoints
- Manages authentication and authorization for external systems
- Configures data mapping and transformation

### Real-World Example

A bank deploys an Agentforce agent for mortgage inquiries. The agent components are:
- **Agent Configuration**: Named "Mortgage Advisor", uses Claude 3.5 Sonnet, with Zero Data Retention enabled
- **Topics**: Mortgage Application, Refinancing, Rate Comparison, FAQ
- **Actions**: Flow Action for application creation, REST API Action for rate lookup, Flow Action for document collection
- **Prompt Templates**: Application guidance template, rate comparison template, FAQ response template
- **Context Variables**: Customer profile, loan amount, property value, credit score
- **Grounding Sources**: Salesforce CRM (customer data), Data Cloud (market rates), Knowledge (mortgage guides)
- **Trust Layer**: PII masking for SSN and financial data, content filtering for compliance
- **Observability**: Full tracing, latency monitoring, quality metrics dashboard
- **Integration**: MuleSoft for credit bureau integration, External Service for property valuation API

### Common Mistakes

- Not configuring all components before deployment
- Overlooking Trust Layer configuration, leading to security gaps
- Not setting up observability, making production debugging impossible
- Neglecting integration configuration, causing failed Action executions

### Interview Tips

- Walk through each component and explain its role
- Emphasize how components interact with each other
- Provide a concrete example that maps components to a real use case
- Show awareness of the full component set, not just the obvious ones

### Follow-up Questions

1. Which component is most critical for a successful deployment?
2. How do you configure grounding sources?
3. What happens if the Trust Layer is not configured?
4. How do you manage component versioning?