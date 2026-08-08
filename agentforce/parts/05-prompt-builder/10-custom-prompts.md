## Question 10: What are custom prompts?

### Answer

Custom prompts are user-defined Prompt Templates that go beyond the standard templates provided by Agentforce. They allow architects to create highly tailored prompts for specific use cases, domains, and business requirements.

### Architecture Explanation

**Custom Prompt Types**

1. **Domain-Specific Prompts**
   - Prompts tailored for a specific business domain
   - Include domain-specific terminology, rules, and constraints
   - Example: A medical diagnosis prompt with HIPAA-compliant language

2. **Behavioral Prompts**
   - Prompts that define specific agent behaviors
   - Include tone, style, and interaction patterns
   - Example: A prompt that makes the agent empathetic and patient

3. **Constraint Prompts**
   - Prompts that enforce specific constraints
   - Include business rules, compliance requirements, and safety guidelines
   - Example: A prompt that prevents the agent from making medical diagnoses

4. **Optimization Prompts**
   - Prompts optimized for specific performance goals
   - Include token optimization, latency optimization, and quality optimization
   - Example: A prompt that limits the response to 100 words for fast interactions

5. **Integration Prompts**
   - Prompts that integrate with external systems
   - Include API response formatting and data transformation
   - Example: A prompt that formats external API responses for the user

**Custom Prompt Design Process**

1. **Identify the Use Case**: Define the specific use case and requirements
2. **Design the Prompt**: Create the prompt with appropriate components
3. **Test the Prompt**: Test with diverse inputs and scenarios
4. **Evaluate the Prompt**: Measure quality, accuracy, and performance
5. **Iterate**: Refine based on testing and evaluation results
6. **Deploy**: Deploy to the agent configuration
7. **Monitor**: Monitor performance and make adjustments

**Custom Prompt Best Practices**

1. Start with a clear objective
2. Use system instructions to define behavior
3. Include concrete examples
4. Test with edge cases
5. Version and document changes
6. Monitor performance and iterate

### Real-World Example

A custom prompt for a legal document review agent:

**System**: "You are a legal document reviewer. Review the provided document for compliance with the specified regulations. Do not provide legal advice. Flag any compliance issues."

**Context**: "Regulation: GDPR. Document: {!DocumentContent}. Reviewer: {!ReviewerName}."

**Task**: "Review the document for GDPR compliance. Identify any personal data fields, check for proper consent mechanisms, and flag any violations."

**Constraints**: "Do not provide legal advice. Only flag compliance issues. Format the response as a structured list of issues with severity levels (High, Medium, Low)."

**Output Format**: "List each issue with: (1) Issue description, (2) Severity level, (3) Recommended action."

### Common Mistakes

- Not testing custom prompts with edge cases
- Not documenting custom prompts
- Not versioning custom prompts
- Overcomplicating custom prompts
- Not monitoring custom prompt performance

### Interview Tips

- Explain the different custom prompt types
- Provide a concrete example
- Emphasize testing and iteration
- Connect custom prompts to the overall Agentforce architecture

### Follow-up Questions

1. How do you design a custom prompt?
2. What is the difference between custom prompts and standard prompts?
3. How do you test custom prompts?
4. How do you maintain custom prompts over time?