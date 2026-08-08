## Question 5: How does Atlas tool selection work?

### Answer

Atlas tool selection is the process by which the Atlas engine selects the appropriate Action (tool) for each step in the execution plan. Tool selection is based on the action's purpose, required parameters, availability, and the current context of the conversation.

### Architecture Explanation

**Tool Selection Process**

1. **Action Catalog**: Atlas maintains a catalog of all configured Actions for the agent
2. **Intent Mapping**: Each Action is tagged with the intents and Topics it can serve
3. **Parameter Analysis**: Atlas analyzes the required parameters for each candidate Action
4. **Availability Check**: Atlas verifies that each candidate Action is available and configured
5. **Context Matching**: Atlas matches the current conversation context to the Action's purpose
6. **Selection**: Atlas selects the best-matching Action for the current step
7. **Parameter Binding**: Atlas populates the Action's parameters from context, grounding data, and previous results

**Tool Selection Strategies**

1. **Exact Match**: Selects the Action that exactly matches the required operation
2. **Best Fit**: Selects the Action that best matches the required operation based on confidence scores
3. **Fallback Chain**: If the primary Action fails, Atlas tries the next best Action
4. **Composite Selection**: Atlas can select multiple Actions for a single step if they are independent

**Action Types and Selection**

- **Flow Actions**: Selected for Salesforce automation workflows
- **Apex Actions**: Selected for custom logic that requires Apex code
- **REST API Actions**: Selected for external system integration
- **External Service Actions**: Selected for declarative API integration
- **Prompt Template Actions**: Selected for AI-generated content
- **MuleSoft Actions**: Selected for enterprise integration platform capabilities
- **Composite Actions**: Selected for multi-action orchestration

**Tool Selection Configuration**
- Actions can be configured with priority rankings
- Actions can be configured with usage constraints (e.g., only use this Action if the user is authenticated)
- Actions can be configured with cost tiers (prefer lower-cost Actions when possible)

### Real-World Example

A customer asks: "What's my account balance and can I transfer $500 to my friend?"

Atlas tool selection:
1. **Step 1 - Get balance**: Selects Flow Action "GetAccountBalance" (exact match for balance inquiry)
2. **Step 2 - Transfer**: Selects Flow Action "InitiateTransfer" (exact match for transfer request)
3. **Parameter Binding**: Step 1 binds user ID from context; Step 2 binds user ID, amount ($500), and recipient from context
4. **Availability Check**: Both Actions are available and configured
5. **Execution**: Step 1 executes first (balance check), then Step 2 executes (transfer)

If "InitiateTransfer" were not available, Atlas would fall back to a REST API Action that calls the bank's transfer API.

### Common Mistakes

- Not configuring Actions with proper intent mappings
- Not setting up fallback Actions for critical operations
- Not considering parameter availability when selecting Actions
- Overlooking cost implications of Action selection

### Interview Tips

- Explain the tool selection process with a concrete example
- Emphasize the fallback chain as a resilience mechanism
- Mention the different Action types and when each is selected
- Connect tool selection to the overall Atlas planning process

### Follow-up Questions

1. How do you configure Action priority rankings?
2. What happens when no Action matches the intent?
3. How does Atlas handle parameter binding?
4. How do you test tool selection?