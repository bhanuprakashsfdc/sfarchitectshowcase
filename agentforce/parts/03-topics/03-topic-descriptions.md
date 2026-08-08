## Question 3: How do you write Topic descriptions?

### Answer

Topic descriptions are a critical component of Topic configuration that guide the Atlas reasoning engine in understanding what each Topic covers and when to activate it. Well-written Topic descriptions improve intent recognition accuracy and reduce misclassification.

### Architecture Explanation

**Topic Description Components**

1. **Summary**
   - A concise one-sentence description of what the Topic covers
   - Should be clear and unambiguous
   - Example: "Handles all customer inquiries about order status, tracking, and delivery"

2. **Scope**
   - Defines what the Topic covers and what it does not cover
   - Explicitly lists the types of requests the Topic handles
   - Explicitly lists the types of requests the Topic does not handle
   - Example: "This Topic covers order tracking, delivery status, and shipping information. It does not cover returns, refunds, or order modifications."

3. **Keywords**
   - Key terms and phrases that signal the Topic should be activated
   - Should include synonyms and variations
   - Example: "order status, tracking number, delivery, shipped, in transit, estimated delivery"

4. **Examples**
   - Example user messages that should activate the Topic
   - Should include diverse phrasings and edge cases
   - Example: "Where is my order?", "Has my package shipped?", "What's the status of order #12345?"

5. **Exclusions**
   - Example user messages that should NOT activate the Topic
   - Helps prevent false positives
   - Example: "I want to return my order" (should activate Returns Topic, not Order Management)

**Description Best Practices**

1. **Be Specific**
   - Vague descriptions lead to misclassification
   - "Handles customer service" is too broad
   - "Handles order status inquiries and delivery tracking" is specific

2. **Use Natural Language**
   - Descriptions are read by the LLM, so they should be in natural language
   - Avoid technical jargon unless the LLM is trained on it

3. **Include Context**
   - Describe the context in which the Topic is relevant
   - Example: "When a customer asks about their order, use this Topic to look up order details and provide status updates"

4. **Define Behavior**
   - Describe what the agent should do when this Topic is active
   - Example: "When this Topic is active, first retrieve the customer's order history, then check the order status, and provide the tracking information"

5. **Include Constraints**
   - Describe any constraints or limitations
   - Example: "Do not provide delivery estimates for international orders"

**Description Optimization**
- Topic descriptions should be reviewed and refined based on conversation analytics
- Misclassified messages indicate descriptions that need improvement
- A/B testing different descriptions can improve classification accuracy

### Real-World Example

A poorly written Topic description:
"Handles customer inquiries"

A well-written Topic description:
"Handles all inquiries related to order status, shipping tracking, and delivery updates. This Topic is activated when a customer asks about where their order is, when it will arrive, or what the current shipping status is. Examples: 'Where is my order?', 'Has my package shipped?', 'What's the tracking number for order #12345?'. Do NOT activate for returns, refunds, or order modifications — those are handled by the Returns and Order Management Topics."

### Common Mistakes

- Writing vague or overly broad descriptions
- Not including examples of what should and should not activate the Topic
- Not updating descriptions as the Topic evolves
- Writing descriptions that are too technical for the LLM to understand

### Interview Tips

- Show awareness of the components of a good Topic description
- Provide an example of a well-written description
- Emphasize the impact of description quality on intent recognition accuracy
- Mention optimization based on conversation analytics

### Follow-up Questions

1. How do you test Topic descriptions?
2. How do you measure description quality?
3. How often should Topic descriptions be updated?
4. What is the relationship between descriptions and intent recognition?