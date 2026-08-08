# Part 2 — Atlas Reasoning Engine

---

## Question 1: How does Atlas work?

### Answer

Atlas is Salesforce's proprietary reasoning engine that powers Agentforce agents. It is the core intelligence layer that processes incoming requests, understands user intent, selects appropriate Topics, determines the optimal sequence of Actions, and manages the overall execution flow. Atlas operates as a managed service within the Salesforce platform and is not directly customizable at the code level, but its behavior is configured through Topics, Actions, and Prompt Templates.

### Architecture Explanation

Atlas works through a continuous loop of perception, reasoning, and action:

**1. Perception**
- Atlas receives the user's message and enriches it with context
- It extracts metadata (user identity, session state, channel, timestamp)
- It retrieves relevant context from the Context Management Service
- It retrieves grounding data from configured Grounding Sources

**2. Intent Classification**
- Atlas uses the LLM to classify the user's intent
- It evaluates the message against all configured Topics
- It computes confidence scores for each Topic match
- It selects the Topic with the highest confidence above a configurable threshold
- If no Topic exceeds the threshold, Atlas triggers a clarification question or fallback

**3. Reasoning**
- Once a Topic is selected, Atlas generates a reasoning chain
- The reasoning chain is a step-by-step breakdown of what the agent needs to do
- Each reasoning step is a discrete operation (retrieve data, evaluate condition, execute action, generate response)
- The reasoning chain is transparent and can be inspected for debugging
- Atlas can revise its reasoning chain if intermediate results change the plan

**4. Planning**
- Atlas creates an execution plan based on the reasoning chain
- The plan specifies which Actions to execute, in what order, with what parameters
- It identifies dependencies between Actions (some Actions must complete before others)
- It identifies conditional branches (if Action A returns X, then do B; otherwise do C)
- The plan is validated against the agent's configured capabilities

**5. Execution**
- Atlas dispatches Actions to the Action Execution Engine
- It manages execution order (sequential, parallel, or conditional)
- It captures results from each Action
- It feeds Action results back into the reasoning chain for subsequent steps
- It handles errors and triggers retry or fallback logic

**6. Response Generation**
- Atlas instructs the LLM to generate a response based on the execution results
- The Prompt Management Service renders the final prompt with execution results
- The LLM generates a natural language response
- Atlas applies post-processing (PII masking, content filtering, formatting)
- The response is delivered to the user

**7. Learning and Adaptation**
- Atlas tracks conversation outcomes (successful, failed, escalated)
- It uses conversation analytics to identify patterns
- It can adjust confidence thresholds and fallback behavior based on historical data
- It supports continuous improvement through feedback loops

### Real-World Example

A customer asks: "I want to change my shipping address for order #98765 and also check if I'm eligible for an upgrade."

Atlas processes this as follows:
1. **Perception**: Receives the message, enriches with user context (customer ID, order history)
2. **Intent Classification**: Classifies as two intents — "address change" (90% confidence) and "upgrade eligibility" (85% confidence)
3. **Reasoning**: Step 1 - Retrieve order #98765; Step 2 - Validate address change request; Step 3 - Check upgrade eligibility; Step 4 - Present results
4. **Planning**: Plan with 3 Actions — get order details (Flow Action), update shipping address (Flow Action), check upgrade eligibility (REST API Action)
5. **Execution**: Executes Actions in order; address change succeeds; upgrade check returns eligible
6. **Response Generation**: LLM generates a response confirming the address change and presenting upgrade options
7. **Learning**: The conversation is logged for analytics; the system notes that this customer has both address change and upgrade needs

### Common Mistakes

- Not understanding that Atlas is the orchestration layer, not the LLM itself
- Assuming Atlas can reason about anything without proper Topic configuration
- Not providing enough context for Atlas to make informed decisions
- Ignoring Atlas's reasoning chain when debugging issues

### Interview Tips

- Emphasize that Atlas is Salesforce's proprietary reasoning engine
- Walk through a concrete example of Atlas processing a request
- Explain the perception → reasoning → planning → execution → response cycle
- Mention that Atlas is configured, not coded

### Follow-up Questions

1. How does Atlas handle multi-intent requests?
2. What is the difference between Atlas reasoning and LLM reasoning?
3. How does Atlas manage conversation state?
4. How does Atlas handle failures?