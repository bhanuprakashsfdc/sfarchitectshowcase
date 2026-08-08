## Question 11: When should you NOT use Agentforce?

### Answer

Agentforce is a powerful AI agent platform, but it is not the right solution for every scenario. Understanding when NOT to use Agentforce is just as important as knowing when to use it. Architects must evaluate each use case against Agentforce's capabilities and limitations to make the right technology choice.

### Architecture Explanation

**When NOT to Use Agentforce:**

**1. Simple Rule-Based Automation**
- If the use case involves simple if-then logic with no need for natural language understanding, Einstein Bots or Salesforce Flow is more appropriate
- Example: A bot that routes calls based on a menu of options — no reasoning or AI needed

**2. High-Stakes Decisions Without Human Oversight**
- Agentforce should not be the sole decision-maker for high-stakes scenarios (medical diagnoses, legal advice, financial transactions over certain thresholds)
- These scenarios require human-in-the-loop workflows
- Example: A medical diagnosis agent should flag cases for doctor review, not make autonomous decisions

**3. Real-Time Low-Latency Requirements**
- LLM inference introduces latency (typically 1-5 seconds per call)
- If sub-second response times are required, Agentforce may not be suitable
- Example: Real-time trading systems or IoT control systems

**4. Offline or Disconnected Environments**
- Agentforce requires connectivity to Salesforce and LLM providers
- If the use case involves offline or disconnected environments, Agentforce cannot operate
- Example: Field service in remote areas without internet connectivity

**5. Extremely High-Volume, Low-Complexity Interactions**
- For very high volumes of simple interactions (e.g., checking account balance), the cost of LLM calls may be prohibitive
- A rule-based system or simple API integration would be more cost-effective
- Example: A banking app where 90% of interactions are balance checks

**6. Scenarios Requiring Deterministic Outputs**
- LLMs are inherently non-deterministic — the same input may produce different outputs
- If deterministic, reproducible outputs are required (e.g., regulatory compliance calculations), Agentforce may not be suitable
- Example: Tax calculation or regulatory filing automation

**7. Highly Specialized Technical Domains**
- If the domain requires highly specialized knowledge that is not well-represented in training data, the LLM may produce inaccurate results
- Example: Niche engineering calculations or proprietary algorithms

**8. Scenarios with Strict Data Residency Requirements**
- If data cannot leave a specific geographic region and the LLM provider does not have a data center in that region, Agentforce may not be compliant
- Example: Government agencies with strict data sovereignty requirements

**9. When the Cost of Errors is Catastrophic**
- In scenarios where an AI error could cause significant harm (safety-critical systems, autonomous vehicles, medical devices), Agentforce is not appropriate
- These scenarios require deterministic, verifiable systems

**10. When a Simple FAQ Bot Suffices**
- If the use case is purely informational (FAQs, business hours, contact information), a simpler solution like Einstein Bots or a Knowledge article search is more appropriate
- Agentforce adds unnecessary complexity and cost for simple informational needs

### Real-World Example

A manufacturing company evaluates Agentforce for quality control:
- **Decision**: NOT to use Agentforce for automated defect classification
- **Reason**: The cost of a false negative (missing a defective product) is catastrophic — it could lead to product recalls and safety issues
- **Alternative**: They use a deterministic computer vision system for defect classification and Agentforce only for the customer-facing quality inquiry agent, which provides information but does not make autonomous decisions

### Common Mistakes

- Choosing Agentforce for simple rule-based scenarios where Flow or Einstein Bots would suffice
- Using Agentforce for high-stakes decisions without human oversight
- Ignoring cost implications for high-volume, low-complexity interactions
- Not considering latency requirements

### Interview Tips

- Demonstrate judgment by knowing when NOT to use a technology
- Provide specific criteria for when Agentforce is appropriate vs. not
- Show awareness of cost, latency, and risk considerations
- Mention alternative solutions for each scenario

### Follow-up Questions

1. What criteria do you use to evaluate whether Agentforce is appropriate?
2. How do you balance cost vs. capability when choosing an AI platform?
3. What are the alternatives to Agentforce for different use cases?
4. How do you design human-in-the-loop workflows?