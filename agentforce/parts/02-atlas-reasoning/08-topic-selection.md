## Question 8: How does Atlas handle topic selection?

### Answer

Atlas topic selection is the process by which the Atlas engine determines which Topic(s) should be activated for a given user request. Topic selection is based on intent recognition, confidence scoring, and Topic configuration, and it is a critical decision point in the Agentforce execution flow.

### Architecture Explanation

**Topic Selection Process**

1. **Intent Extraction**: Atlas extracts the user's intent from the message
2. **Topic Matching**: Atlas evaluates each configured Topic against the extracted intent
3. **Confidence Scoring**: Atlas computes a confidence score for each Topic match
4. **Threshold Evaluation**: Atlas checks if each Topic's confidence exceeds the activation threshold
5. **Selection**: Topics above the threshold are selected for activation
6. **Prioritization**: If multiple Topics are selected, they are prioritized by confidence score
7. **Fallback**: If no Topic exceeds the threshold, Atlas triggers a fallback mechanism

**Topic Selection Strategies**

1. **Single Topic Selection**: Only the highest-confidence Topic is activated
   - Best for simple, well-defined use cases
   - Reduces complexity and avoids Topic overlap issues

2. **Multi-Topic Selection**: All Topics above the threshold are activated
   - Best for multi-intent requests
   - Requires careful Topic boundary design to avoid conflicts

3. **Hierarchical Topic Selection**: Topics are organized in a hierarchy; parent Topics are activated first, then child Topics
   - Best for complex domains with related sub-topics
   - Enables progressive deepening of the conversation

4. **Context-Aware Topic Selection**: Topic selection considers conversation history and previous Topics
   - Best for multi-turn conversations where context matters
   - Prevents Topic switching that would confuse the user

**Topic Selection Configuration**
- Confidence thresholds can be configured globally or per Topic
- Topic priority can be configured to resolve conflicts
- Topic overlap can be managed through boundary definitions
- Fallback Topics can be configured for unrecognized intents

**Topic Selection Optimization**
- Atlas learns from conversation outcomes to improve Topic selection
- Topics with high success rates are prioritized
- Topics with low confidence scores are refined or merged
- Topic selection metrics are tracked for continuous improvement

### Real-World Example

A customer sends: "I need to change my flight and also check my loyalty points."

Atlas topic selection:
1. **Intent Extraction**: "change flight" and "check loyalty points"
2. **Topic Matching**: "Flight Management" (92%), "Loyalty Program" (88%), "General Inquiry" (45%)
3. **Confidence Scoring**: Flight Management: 0.92, Loyalty Program: 0.88, General Inquiry: 0.45
4. **Threshold Evaluation**: Threshold is 60%; all three exceed it
5. **Selection**: Flight Management and Loyalty Program are selected
6. **Prioritization**: Flight Management is primary (0.92), Loyalty Program is secondary (0.88)
7. **Execution**: Atlas addresses Flight Management first, then Loyalty Program

### Common Mistakes

- Not configuring confidence thresholds appropriately
- Allowing Topic overlap without clear boundaries
- Not implementing fallback for unrecognized intents
- Ignoring context in Topic selection, leading to inappropriate Topic switching

### Interview Tips

- Explain the full topic selection process
- Emphasize the different selection strategies and when to use each
- Discuss threshold configuration and its impact
- Mention Topic selection optimization and learning

### Follow-up Questions

1. How do you configure confidence thresholds?
2. What happens when Topics overlap?
3. How does Atlas handle Topic switching?
4. How do you optimize Topic selection?