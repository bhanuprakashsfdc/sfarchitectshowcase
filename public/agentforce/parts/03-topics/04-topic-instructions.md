## Question 4: What are Topic instructions?

### Answer

Topic instructions are detailed directives that guide the agent's behavior when a Topic is active. They define how the agent should process requests, what actions to take, what responses to generate, and what constraints to follow within the Topic's scope.

### Architecture Explanation

**Instruction Components**

1. **Behavioral Instructions**
   - Define how the agent should behave within the Topic
   - Specify the tone, style, and persona of the agent
   - Example: "You are a helpful customer service representative. Be polite, concise, and professional."

2. **Process Instructions**
   - Define the step-by-step process the agent should follow
   - Specify the order of operations
   - Example: "First, retrieve the customer's order. Then, check the order status. Finally, provide the tracking information."

3. **Constraint Instructions**
   - Define constraints on the agent's behavior
   - Specify what the agent should NOT do
   - Example: "Do not provide delivery estimates for international orders. Do not share customer payment information."

4. **Decision Instructions**
   - Define how the agent should make decisions
   - Specify conditions and outcomes
   - Example: "If the order is delivered, offer the return option. If the order is in transit, provide the tracking number."

5. **Escalation Instructions**
   - Define when and how to escalate to a human agent
   - Specify escalation triggers
   - Example: "If the customer requests a supervisor, escalate immediately. If the order cannot be found, offer to escalate."

6. **Output Instructions**
   - Define the format and content of the agent's responses
   - Specify what information to include and exclude
   - Example: "Always include the order number and tracking number in your response. Do not include internal system IDs."

**Instruction Design Principles**

1. **Clarity**
   - Instructions should be clear and unambiguous
   - Avoid vague language
   - Use specific, concrete language

2. **Completeness**
   - Instructions should cover all scenarios within the Topic
   - Include edge cases and error scenarios

3. **Consistency**
   - Instructions should be consistent with the agent's overall behavior
   - Avoid contradictory instructions across Topics

4. **Measurability**
   - Instructions should be testable
   - Define success criteria for each instruction

5. **Maintainability**
   - Instructions should be easy to update
   - Use version control for instruction changes

**Instruction Execution**

- Instructions are processed by the Atlas reasoning engine
- The LLM uses instructions to generate responses and select Actions
- Instructions are evaluated against each user request
- Instruction violations are flagged and logged

### Real-World Example

Topic: "Order Status Inquiry"

Instructions:
"You are a helpful customer service representative. When this Topic is active, follow these steps:
1. Retrieve the customer's order using the order number or recent order history.
2. Check the order status from Salesforce CRM.
3. If the order is delivered, provide the delivery confirmation and offer the return option.
4. If the order is in transit, provide the tracking number and estimated delivery date.
5. If the order is processing, inform the customer of the expected ship date.
6. If the order cannot be found, ask the customer to verify the order number or offer to escalate.

Constraints:
- Do not share customer payment information.
- Do not provide delivery estimates for international orders.
- Do not make up tracking information.

Escalation:
- If the customer requests a supervisor, escalate immediately.
- If the order cannot be found after verification, escalate to a human agent.

Output:
- Always include the order number and tracking number (if available).
- Be concise and professional.
- Do not include internal system IDs or error messages."

### Common Mistakes

- Writing instructions that are too vague or generic
- Not including constraint instructions
- Not defining escalation triggers
- Writing contradictory instructions across Topics
- Not testing instructions with diverse inputs

### Interview Tips

- Explain the components of Topic instructions
- Provide a concrete example of well-written instructions
- Emphasize the impact of instruction quality on agent behavior
- Mention the design principles (clarity, completeness, consistency, measurability, maintainability)

### Follow-up Questions

1. How do you test Topic instructions?
2. What happens if instructions are contradictory?
3. How do you update instructions without breaking existing behavior?
4. How do you measure instruction effectiveness?