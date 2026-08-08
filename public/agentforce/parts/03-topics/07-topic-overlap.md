## Question 7: How do you handle Topic overlap?

### Answer

Topic overlap occurs when two or more Topics have overlapping scopes, causing the agent to be uncertain about which Topic to activate. Handling Topic overlap is essential for building reliable, predictable Agentforce agents.

### Architecture Explanation

**Types of Topic Overlap**

1. **Intent Overlap**
   - Two Topics handle similar intents
   - Example: "Order Status" and "Order Tracking" both handle inquiries about order status

2. **Entity Overlap**
   - Two Topics operate on the same entities
   - Example: "Account Management" and "Profile Management" both operate on Account records

3. **Action Overlap**
   - Two Topics can execute the same Actions
   - Example: "Returns" and "Complaints" both can create a Case record

4. **Data Overlap**
   - Two Topics use the same grounding data sources
   - Example: "Order Management" and "Returns" both use the Orders object

**Overlap Resolution Strategies**

1. **Explicit Boundary Definition**
   - Define clear boundaries for each Topic
   - Use entry and exit criteria to distinguish Topics
   - Example: "Order Status" handles tracking inquiries; "Order Tracking" handles detailed tracking with map visualization

2. **Priority-Based Resolution**
   - Assign different priorities to overlapping Topics
   - Higher-priority Topics take precedence
   - Example: "Billing Dispute" has higher priority than "Billing Inquiry"

3. **Context-Based Resolution**
   - Use conversation context to disambiguate
   - If the user has already discussed returns, the "Returns" Topic gets priority
   - Example: If the user said "I want to return this" earlier, the "Returns" Topic is prioritized over "Order Management"

4. **Confidence-Based Resolution**
   - Use confidence scores to determine the best match
   - The Topic with the highest confidence wins
   - Example: "Order Status" matches at 90%, "Order Tracking" matches at 70% → "Order Status" is selected

5. **Clarification-Based Resolution**
   - If overlap cannot be resolved automatically, the agent asks a clarification question
   - Example: "Are you asking about your order status or would you like to track your shipment on a map?"

6. **Topic Merging**
   - If two Topics consistently overlap, consider merging them
   - A merged Topic handles both intents with clear internal branching
   - Example: Merge "Order Status" and "Order Tracking" into a single "Order Inquiry" Topic

**Overlap Detection**

- Monitor conversation analytics for Topic confusion patterns
- Track Topic switching frequency
- Analyze misclassified messages
- Use overlap detection tools in the Agentforce dashboard

**Overlap Prevention**

- Design Topics with clear, non-overlapping scopes from the start
- Review Topic boundaries regularly
- Use explicit exclusion criteria in Topic descriptions
- Test with diverse inputs to identify overlap early

### Real-World Example

A retail company has overlapping Topics "Order Status" and "Order Tracking":

**Overlap Detection**: Conversation analytics show that 30% of "Order Status" conversations also trigger "Order Tracking" with high confidence.

**Resolution**: The company merges the two Topics into a single "Order Inquiry" Topic with internal branching:
- If the user asks "where is my order?" → provide tracking info
- If the user asks "what is the status?" → provide status details
- If the user asks "can I track on a map?" → provide map visualization

**Result**: Overlap is eliminated, and the agent handles all order-related inquiries consistently.

### Common Mistakes

- Ignoring Topic overlap and hoping it resolves itself
- Not defining clear boundaries between Topics
- Not monitoring overlap through conversation analytics
- Not merging Topics that consistently overlap

### Interview Tips

- Explain the different types of overlap
- Provide a concrete example of overlap resolution
- Emphasize the importance of monitoring overlap through analytics
- Mention overlap prevention strategies

### Follow-up Questions

1. How do you detect Topic overlap?
2. When should you merge Topics?
3. How do you test for overlap?
4. What are the signs of Topic overlap?