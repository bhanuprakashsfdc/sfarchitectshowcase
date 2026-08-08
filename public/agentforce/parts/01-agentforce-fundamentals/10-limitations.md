## Question 10: What are the limitations of Agentforce?

### Answer

While Agentforce is a powerful platform, it has several limitations that architects must understand when designing solutions. Recognizing these limitations is essential for making informed architectural decisions and setting realistic expectations with stakeholders.

### Architecture Explanation

**1. LLM Dependency**
- Agentforce relies on external LLM providers (Anthropic, OpenAI, or Salesforce Einstein LLM)
- LLM availability and performance are outside Salesforce's direct control
- Latency is dependent on the LLM provider's response times
- Costs scale with token usage

**2. Context Window Limitations**
- LLMs have finite context windows that limit the amount of conversation history and grounding data that can be included
- Long conversations may lose early context
- Large grounding datasets may need to be selectively included

**3. Hallucination Risk**
- Despite grounding, LLMs can still produce incorrect or fabricated information
- Hallucination rates vary by model and prompt quality
- Critical applications require human verification for high-stakes decisions

**4. Action Execution Constraints**
- Actions are limited to what is configured in the agent
- Actions that require human judgment cannot be fully automated
- Complex transaction scenarios may require custom Apex development
- External system integrations depend on API availability and reliability

**5. Topic Design Complexity**
- Poorly designed Topics lead to agent confusion and incorrect behavior
- Topic boundaries must be carefully defined to avoid overlap
- Large enterprise deployments may require dozens of Topics, increasing complexity

**6. Cost Management**
- Token usage can escalate quickly with high conversation volumes
- Each LLM call incurs cost
- Prompt optimization is necessary to control costs
- There is no built-in cost alerting (must be implemented externally)

**7. Security and Compliance**
- PII data may be processed by LLM providers depending on configuration
- Data residency requirements may limit LLM provider selection
- Compliance certifications vary by LLM provider

**8. Customization Limitations**
- The Atlas reasoning engine is managed by Salesforce and has limited customization
- Prompt templates are powerful but have structural constraints
- Some advanced AI behaviors may require Apex customization

**9. Multi-Turn Conversation Limits**
- Very long multi-turn conversations may lose coherence
- Context management becomes increasingly complex with more turns
- State management requires careful design

**10. Vendor Lock-In**
- Agentforce is deeply integrated with the Salesforce ecosystem
- Migrating to a different AI agent platform would require significant rework
- LLM provider switching is possible but requires prompt and integration rework

### Real-World Example

A healthcare company evaluates Agentforce for patient triage but identifies limitations:
- **LLM Dependency**: The triage agent depends on an LLM that occasionally produces inaccurate symptom assessments
- **Hallucination Risk**: The agent may suggest incorrect self-care instructions for serious conditions
- **Action Constraints**: The agent cannot prescribe medication or make clinical diagnoses
- **Compliance**: HIPAA requires that PHI not be sent to external LLM providers without a Business Associate Agreement (BAA)

The company decides to use Agentforce for appointment scheduling and FAQ, but routes triage to human nurses.

### Common Mistakes

- Overpromising what Agentforce can do without acknowledging limitations
- Ignoring hallucination risk in critical applications
- Not planning for LLM provider changes or outages
- Underestimating the cost implications of high-volume deployments

### Interview Tips

- Be honest about limitations — interviewers value self-awareness
- Frame limitations as architectural considerations, not dealbreakers
- Provide mitigation strategies for each limitation
- Show that you understand when NOT to use Agentforce

### Follow-up Questions

1. How do you mitigate hallucination in Agentforce?
2. What are the alternatives when Agentforce limitations are unacceptable?
3. How do you handle LLM provider outages?
4. What is the maximum conversation length for Agentforce?