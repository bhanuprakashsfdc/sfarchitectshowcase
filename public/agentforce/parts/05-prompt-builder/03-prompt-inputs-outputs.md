## Question 3: What are Prompt Inputs and Outputs?

### Answer

Prompt Inputs and Outputs define the data flow between the agent's context and the LLM prompt. Inputs are the data that is injected into the prompt, and outputs are the data that is extracted from the LLM's response.

### Architecture Explanation

**Prompt Inputs**

1. **Context Variables**
   - Data from the agent's context (conversation history, user profile, session state)
   - Bound to prompt placeholders
   - Example: `{!CustomerName}`, `{!OrderNumber}`

2. **Grounding Data**
   - Data retrieved from grounding sources (CRM, Data Cloud, Knowledge, external APIs)
   - Injected into the prompt as context
   - Example: Customer order history, product catalog, policy documents

3. **User Input**
   - The user's original message
   - Included as the primary input to the prompt
   - Example: "Where is my order?"

4. **System Data**
   - System-level data (timestamp, channel, agent configuration)
   - Provides context about the interaction
   - Example: "Channel: Chat, Time: 2026-08-06T10:30:00Z"

5. **Historical Data**
   - Previous conversation turns
   - Provides context for multi-turn conversations
   - Example: "Previous turn: Customer asked about shipping options"

**Prompt Outputs**

1. **Natural Language Response**
   - The LLM's generated text response
   - The primary output for most interactions
   - Mapped to the conversation response

2. **Structured Data**
   - Extracted structured data from the LLM response
   - JSON format for machine consumption
   - Example: Extracted order number, status, and tracking number

3. **Action Requests**
   - Requests for specific Actions to be executed
   - The LLM indicates which Action to take and with what parameters
   - Example: "Execute Flow Action 'CreateOrder' with parameters: product='Widget', quantity=2"

4. **Intent Classification**
   - The LLM's classification of the user's intent
   - Used for Topic selection
   - Example: Intent: "Order Status", Confidence: 0.95

5. **Sentiment Analysis**
   - The LLM's assessment of the user's sentiment
   - Used for escalation decisions
   - Example: Sentiment: "Frustrated", Score: 0.8

**Input/Output Mapping**

- Inputs are mapped from context variables, grounding data, and user input
- Outputs are mapped to context variables, Action parameters, and conversation responses
- Mapping is configured per Prompt Template
- Mapping can include transformation rules (format conversion, data enrichment)

### Real-World Example

A customer asks: "What's the status of my order #12345?"

**Prompt Inputs**:
- `{!CustomerName}` → "John Smith" (from CRM)
- `{!OrderNumber}` → "12345" (from user input)
- `{!OrderStatus}` → "In Transit" (from grounding data)
- `{!TrackingNumber}` → "TRK789" (from grounding data)
- `{!UserMessage}` → "What's the status of my order #12345?" (from user input)

**Rendered Prompt**:
"Customer John Smith is asking about order #12345. The order status is In Transit with tracking number TRK789. Provide a concise update."

**Prompt Outputs**:
- Natural Language Response: "Your order #12345 is currently in transit. Tracking number: TRK789. Expected delivery: March 15, 2026."
- Structured Data: {orderNumber: "12345", status: "In Transit", trackingNumber: "TRK789"}
- Intent Classification: {intent: "Order Status", confidence: 0.95}

### Common Mistakes

- Not mapping all required inputs
- Not validating output data
- Not handling missing or null inputs
- Not transforming outputs appropriately
- Ignoring input/output type mismatches

### Interview Tips

- Explain the input/output mapping process
- Provide a concrete example with rendered prompt
- Emphasize the importance of validation
- Connect inputs/outputs to the overall Agentforce execution flow

### Follow-up Questions

1. How do you map inputs to prompt variables?
2. How do you validate prompt outputs?
3. What happens when an input is missing?
4. How do you handle output transformation?