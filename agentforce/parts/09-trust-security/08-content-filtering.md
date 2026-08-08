## Question 8: What is content filtering in Agentforce?

### Answer

Content filtering in Agentforce is the process of monitoring and controlling the content that flows through the agent, ensuring that responses are safe, appropriate, and compliant with organizational policies.

### Architecture Explanation

**Content Filtering Components**

1. **Input Filtering**
   - Filters user input before processing
   - Detects and blocks inappropriate content
   - Example: Hate speech, violence, explicit content

2. **Output Filtering**
   - Filters LLM responses before delivery
   - Detects and blocks unsafe content
   - Example: Medical advice, financial advice, harmful instructions

3. **Context Filtering**
   - Filters context data before injection into prompts
   - Detects and blocks sensitive data
   - Example: PII, PHI, confidential business data

4. **Action Filtering**
   - Filters Action results before use
   - Detects and blocks unsafe Action outputs
   - Example: Action results containing inappropriate content

**Content Filtering Policies**

1. **Safety Policies**: Block unsafe content (violence, hate speech, etc.)
2. **Compliance Policies**: Block content that violates regulations
3. **Brand Policies**: Block content that doesn't match brand voice
4. **Custom Policies**: Organization-specific content rules

**Content Filtering Configuration**
- Policies are defined per agent
- Severity levels are configured (block, warn, log)
- Custom rules are defined
- Policies are reviewed and updated regularly

**Content Filtering Workflow**
1. Content is generated (input, LLM response, Action result)
2. Content is passed through the filter
3. Filter checks content against policies
4. If content violates a policy, it is blocked or sanitized
5. If content is flagged, it is logged and may trigger an alert
6. Filtered content is delivered or the interaction is escalated

### Real-World Example

A customer asks: "How can I hack into my neighbor's WiFi?"

**Content Filtering**:
1. **Input Filtering**: The query is flagged as a security concern
2. **Output Filtering**: The LLM is instructed to refuse the request
3. **Response**: "I can't help with that. I can assist with legitimate WiFi setup or troubleshooting."
4. **Logging**: The interaction is logged for security review

### Common Mistakes

- Not configuring content filtering policies
- Not updating policies for new content types
- Not testing filtering with diverse inputs
- Not monitoring filtering effectiveness

### Interview Tips

- Explain content filtering components and policies
- Provide a concrete example
- Emphasize the importance of configuration
- Connect content filtering to the Trust Layer

### Follow-up Questions

1. What are the types of content filtering?
2. How do you configure content policies?
3. What happens when content is blocked?
4. How do you test content filtering?