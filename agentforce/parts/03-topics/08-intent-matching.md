## Question 8: How does Atlas intent matching work for Topics?

### Answer

Atlas intent matching is the process by which the Atlas engine matches a user's message to the appropriate Topic(s) based on the intent expressed in the message. Intent matching is the primary mechanism for Topic selection and is a core capability of the Atlas reasoning engine.

### Architecture Explanation

**Intent Matching Process**

1. **Message Analysis**
   - The user's message is analyzed for intent signals
   - Keywords, phrases, and context are extracted
   - The message is compared against each Topic's description and instructions

2. **Intent Classification**
   - The LLM classifies the message into one or more intents
   - Each intent is mapped to one or more Topics
   - Confidence scores are computed for each intent-Topic pair

3. **Intent-Topic Mapping**
   - Each Topic has an associated set of intents it can handle
   - Intent-Topic mappings are defined in the Topic configuration
   - The mapping can be explicit (defined by the architect) or learned (inferred from conversation data)

4. **Confidence Thresholding**
   - Each intent-Topic pair is assigned a confidence score
   - Topics with confidence above the threshold are activated
   - The threshold is configurable per Topic or globally

5. **Multi-Intent Handling**
   - If a message expresses multiple intents, multiple Topics can be activated
   - Topics are prioritized by confidence score
   - The agent addresses Topics in priority order

**Intent Matching Strategies**

1. **Exact Match**
   - The user's message exactly matches a known intent pattern
   - Highest confidence, most reliable
   - Example: "track my order" matches the "Order Tracking" intent exactly

2. **Fuzzy Match**
   - The user's message is similar but not identical to a known intent pattern
   - Moderate confidence
   - Example: "where's my package" is a fuzzy match for "Order Tracking"

3. **Contextual Match**
   - The user's message matches an intent based on conversation context
   - Context includes previous turns, user profile, and session state
   - Example: After discussing an order, the user says "can I change the address?" — contextually matches "Order Modification"

4. **Semantic Match**
   - The user's message matches an intent based on semantic similarity
   - The LLM understands the meaning, not just the keywords
   - Example: "my delivery hasn't shown up" semantically matches "Order Tracking"

5. **Composite Match**
   - Multiple matching strategies are combined for higher accuracy
   - The final confidence score is a weighted combination of all matching strategies

**Intent Matching Optimization**

- Intent matching accuracy improves over time as the agent processes more conversations
- Conversation analytics identify misclassified messages
- Topic descriptions and instructions are refined based on matching performance
- New intents are added as the business evolves

### Real-World Example

A customer says: "I never got my stuff"

Intent matching:
1. **Message Analysis**: Extracts "never got" (delivery issue) and "stuff" (vague product reference)
2. **Intent Classification**: Classifies as "Order Delivery Issue" (85%), "Order Status" (70%), "Complaint" (65%)
3. **Intent-Topic Mapping**: "Order Delivery Issue" → "Order Management" Topic; "Complaint" → "Complaints" Topic
4. **Confidence Thresholding**: Both exceed the 60% threshold
5. **Multi-Intent Handling**: "Order Management" is primary (85%), "Complaints" is secondary (65%)
6. **Execution**: Agent first addresses the delivery issue, then addresses the complaint

### Common Mistakes

- Not providing enough example phrases for each Topic
- Not testing intent matching with diverse phrasings
- Not configuring confidence thresholds appropriately
- Ignoring semantic matching and relying only on keyword matching

### Interview Tips

- Explain the intent matching process and strategies
- Provide a concrete example of intent matching
- Emphasize the role of Topic descriptions and instructions
- Mention optimization based on conversation analytics

### Follow-up Questions

1. How do you improve intent matching accuracy?
2. What is the difference between exact and semantic matching?
3. How do you handle low-confidence intent matches?
4. How do you add new intents to a Topic?