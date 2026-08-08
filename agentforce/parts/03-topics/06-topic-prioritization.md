## Question 6: How do you prioritize Topics?

### Answer

Topic prioritization is the mechanism by which the Atlas engine determines which Topic to activate when multiple Topics could match a user's request. Proper prioritization ensures that the most relevant Topic is selected, improving the accuracy and relevance of the agent's responses.

### Architecture Explanation

**Priority Mechanisms**

1. **Explicit Priority**
   - Each Topic can be assigned an explicit priority value
   - Higher priority Topics take precedence over lower priority Topics
   - Priority values are configurable per Topic
   - Example: "Complaints" Topic has priority 100, "Returns" has priority 50, "FAQs" has priority 10

2. **Confidence-Based Priority**
   - Topics are prioritized by their confidence scores from intent recognition
   - The Topic with the highest confidence score is selected
   - This is the default prioritization mechanism
   - Confidence thresholds can be configured to filter out low-confidence matches

3. **Context-Based Priority**
   - Topics are prioritized based on the conversation context
   - Recent Topic activations can influence priority
   - Example: If the user is in the middle of a "Returns" conversation, "Returns" gets priority over "FAQs"

4. **User-Role-Based Priority**
   - Topics can be prioritized differently based on the user's role or profile
   - Example: "Admin Settings" Topic has higher priority for system administrators

5. **Time-Based Priority**
   - Topics can be prioritized based on time or date
   - Example: "Holiday Support" Topic has higher priority during holiday seasons

**Priority Resolution**

When multiple Topics match a user's request:
1. Explicit priority is evaluated first
2. If explicit priorities are equal, confidence scores are compared
3. If confidence scores are equal, context-based priority is evaluated
4. If all else is equal, the Topic that was most recently active gets priority
5. If no clear winner emerges, the agent triggers a clarification question

**Priority Configuration**
- Priorities are configured in the Topic settings
- Default priority is 0 (neutral)
- Positive values indicate higher priority
- Negative values indicate lower priority
- Priority can be overridden at the agent level

**Priority Anti-Patterns**
- Setting all Topics to the same priority, leading to random selection
- Setting priority too high for Topics that should be low-priority
- Not reviewing priorities as the agent evolves
- Ignoring context-based priority for complex conversations

### Real-World Example

A telecom company has the following Topics with priorities:
- "Billing Dispute" — Priority 100 (highest)
- "Plan Upgrade" — Priority 80
- "Technical Support" — Priority 70
- "Account Management" — Priority 50
- "FAQs" — Priority 10 (lowest)

A customer sends: "I was overcharged and my internet is not working."

Atlas intent recognition:
- "Billing Dispute" — 90% confidence
- "Technical Support" — 85% confidence
- "Plan Upgrade" — 30% confidence

Priority resolution:
1. "Billing Dispute" has the highest explicit priority (100) AND the highest confidence (90%)
2. "Billing Dispute" is selected as the primary Topic
3. "Technical Support" is activated as a secondary Topic
4. The agent addresses the billing dispute first, then the technical support issue

### Common Mistakes

- Not setting explicit priorities, relying solely on confidence scores
- Setting priorities that don't reflect business priorities
- Not reviewing priorities as the agent evolves
- Ignoring context-based priority for complex conversations

### Interview Tips

- Explain the different priority mechanisms
- Provide a concrete example of priority resolution
- Emphasize the importance of aligning priorities with business priorities
- Mention priority anti-patterns

### Follow-up Questions

1. How do you determine Topic priorities?
2. What happens when two Topics have the same priority and confidence?
3. How do you handle priority conflicts?
4. How do you review and update priorities?