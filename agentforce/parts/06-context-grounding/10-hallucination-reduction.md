## Question 10: What are grounding strategies for hallucination reduction?

### Answer

Grounding strategies for hallucination reduction are techniques used to minimize the LLM's tendency to fabricate information. Hallucination is a significant challenge in AI agents, and proper grounding is the primary defense.

### Architecture Explanation

**Hallucination Reduction Strategies**

1. **Comprehensive Grounding**
   - Ground the prompt with all relevant data sources
   - Include CRM data, Data Cloud data, Knowledge articles, and external data
   - The more grounded the prompt, the less the LLM needs to rely on its training data
   - Example: Include the customer's full profile, order history, and relevant policies

2. **Explicit Constraints**
   - Explicitly instruct the LLM to only use grounded data
   - Example: "Only use the provided context. Do not use your training data."
   - Example: "If the answer is not in the provided context, say 'I don't know.'"

3. **Source Attribution**
   - Require the LLM to cite its sources
   - The LLM includes references to the grounding data
   - Example: "Based on the Return Policy (Knowledge Article #12345)..."
   - Enables verification and auditability

4. **Confidence Scoring**
   - Require the LLM to include confidence scores
   - Low confidence responses are flagged for review
   - Example: "I am 90% confident that the return period is 30 days."

5. **Fact-Checking**
   - Use a separate LLM call to fact-check the response
   - Compare the response against the grounding data
   - Flag inconsistencies for review
   - Example: A fact-checking prompt verifies that the response matches the source data

6. **Retrieval-Augmented Generation (RAG)**
   - Use RAG to retrieve relevant data before generating the response
   - RAG ensures the LLM has access to the most relevant information
   - See Part 7 for detailed RAG explanation

7. **Prompt Engineering**
   - Design prompts that minimize hallucination
   - Use specific instructions and examples
   - Example: "Answer the question using only the provided data. If the data is insufficient, state that you don't have enough information."

8. **Human-in-the-Loop**
   - For high-stakes scenarios, require human review
   - The agent flags uncertain responses for human review
   - Example: Responses with confidence below 80% are sent to a human agent

**Grounding Strategy Selection**

The choice of grounding strategy depends on:
- The criticality of the use case
- The availability and quality of grounding data
- The cost and latency constraints
- The compliance requirements

### Real-World Example

A healthcare company uses multiple grounding strategies to reduce hallucination:

1. **Comprehensive Grounding**: Patient records, medical history, and treatment guidelines are all included
2. **Explicit Constraints**: "Only use the provided medical data. Do not provide medical advice beyond the scope of the data."
3. **Source Attribution**: "Based on the Treatment Guidelines (Document #456)..."
4. **Confidence Scoring**: "I am 85% confident in this recommendation."
5. **Human-in-the-Loop**: Responses with confidence below 80% are flagged for doctor review

**Result**: Hallucination rate reduced from 15% to 2%.

### Common Mistakes

- Not grounding the prompt sufficiently
- Not using explicit constraints
- Not implementing source attribution
- Not monitoring hallucination rates
- Not using human-in-the-loop for critical scenarios

### Interview Tips

- Explain the different grounding strategies
- Provide concrete examples
- Emphasize the relationship between grounding and hallucination
- Connect grounding strategies to the overall Agentforce architecture

### Follow-up Questions

1. What is the most effective hallucination reduction strategy?
2. How do you measure hallucination rates?
3. When should you use human-in-the-loop?
4. How do you balance grounding with token usage?