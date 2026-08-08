## Question 15: What are the best practices for Agentforce?

### Answer

Following best practices is essential for building reliable, scalable, and secure Agentforce implementations. These practices are drawn from enterprise deployments and reflect the collective experience of Salesforce architects and engineers.

### Architecture Explanation

**1. Design Topics Before Building**
- Define Topics based on business capabilities, not technical components
- Ensure clear Topic boundaries with no overlap
- Write detailed Topic descriptions and instructions
- Define entry and exit criteria for each Topic
- Review Topics with business stakeholders before implementation

**2. Ground Everything**
- Always ground the agent in relevant data sources
- Use Salesforce CRM data as the primary grounding source
- Supplement with Data Cloud for unified customer profiles
- Include Knowledge articles for informational queries
- Use external grounding for real-time data (pricing, inventory, rates)
- Never rely solely on the LLM's training data for enterprise-specific information

**3. Design for Failure**
- Implement fallback Topics for unrecognized intents
- Configure retry logic for Action failures
- Set up escalation paths to human agents
- Handle partial failures gracefully (e.g., if one Action fails, continue with others)
- Implement circuit breakers for external system failures

**4. Optimize Prompts**
- Keep prompts concise and focused
- Use system instructions to define agent behavior
- Inject grounding data dynamically rather than hardcoding
- Test prompts with diverse inputs
- Version prompts and track changes
- Monitor token usage and optimize for cost

**5. Secure by Design**
- Enable the Trust Layer from the start
- Configure PII masking for all sensitive fields
- Apply field-level security to all Actions
- Enable audit logging for compliance
- Use Zero Data Retention for sensitive interactions
- Regularly review security configurations

**6. Implement Observability**
- Enable execution tracing for all agents
- Set up dashboards for key metrics (latency, token usage, error rates)
- Configure alerts for anomalies
- Analyze conversation data for quality improvement
- Use conversation analytics to identify Topic gaps

**7. Iterate and Improve**
- Monitor agent performance continuously
- Analyze failed interactions to identify improvement opportunities
- Refine Topic descriptions based on real conversation data
- Optimize prompts based on quality metrics
- Update grounding sources as business data changes

**8. Plan for Scale**
- Design Topics and Actions to handle high concurrency
- Use asynchronous Actions for long-running operations
- Implement rate limiting to protect external systems
- Monitor token usage and costs as volume grows
- Design for multi-region deployment if needed

**9. Integrate with Existing Systems**
- Leverage MuleSoft for complex integrations
- Use External Services for declarative API integration
- Connect to Data Cloud for unified customer data
- Integrate with existing CRM workflows and processes
- Ensure data consistency across systems

**10. Train and Document**
- Document the agent's architecture, Topics, and Actions
- Provide training for support teams on agent behavior
- Create runbooks for common issues
- Maintain a knowledge base of known limitations and workarounds
- Keep documentation up to date as the agent evolves

### Real-World Example

A telecommunications company follows these best practices:
1. **Design Topics First**: Defined 12 Topics based on customer journey stages
2. **Ground Everything**: Grounded in CRM, Data Cloud, and real-time network status APIs
3. **Design for Failure**: Implemented fallback Topics and human escalation for all critical paths
4. **Optimize Prompts**: Reduced token usage by 35% through prompt optimization
5. **Secure by Design**: Enabled Trust Layer with PII masking for all customer data
6. **Implement Observability**: Set up real-time dashboards and alerting for all agents
7. **Iterate and Improve**: Monthly review of conversation analytics to refine Topics
8. **Plan for Scale**: Designed for 10,000 concurrent conversations with async Actions
9. **Integrate with Existing Systems**: Connected to billing system via MuleSoft and network status via External Services
10. **Train and Document**: Created comprehensive documentation and trained support teams

### Common Mistakes

- Building the agent before designing the Topics
- Not grounding the agent, leading to hallucinated responses
- Ignoring failure scenarios and escalation paths
- Neglecting observability and monitoring
- Not planning for scale from the beginning

### Interview Tips

- Present best practices as lessons learned, not just theoretical recommendations
- Provide specific examples of how each practice was applied
- Emphasize the business impact of following best practices
- Show awareness of the full lifecycle, not just implementation

### Follow-up Questions

1. Which best practice has the highest impact?
2. How do you measure the effectiveness of best practices?
3. What are the most common best practice violations you've seen?
4. How do you enforce best practices in a team?