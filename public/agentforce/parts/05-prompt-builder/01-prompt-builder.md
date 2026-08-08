# Part 5 — Prompt Builder & Prompt Templates

---

## Question 1: What is Prompt Builder?

### Answer

Prompt Builder is a Salesforce tool that provides a visual, drag-and-drop interface for creating, testing, and managing prompts used by Agentforce agents. Prompt Builder simplifies the process of designing prompts by providing a structured interface with template components, variable insertion, and preview capabilities.

### Architecture Explanation

**Prompt Builder Components**

1. **Template Canvas**
   - A visual canvas where prompts are assembled
   - Components can be dragged and dropped onto the canvas
   - Components include: system instructions, user messages, context blocks, variable placeholders, and output formatting

2. **Variable Insertion**
   - Merge fields and dynamic variables can be inserted into prompts
   - Variables are bound to context variables, grounding data, and user input
   - Variable types include: text, number, date, picklist, and sObject references

3. **Component Library**
   - Pre-built components for common prompt patterns
   - Components include: system prompt, user message, context block, data retrieval, output formatting, and constraints
   - Custom components can be created and saved

4. **Preview Mode**
   - Real-time preview of the rendered prompt
   - Shows how variables are substituted
   - Displays the final prompt that will be sent to the LLM
   - Allows testing with sample data

5. **Testing Mode**
   - Test prompts with sample inputs
   - Compare different prompt variations
   - Evaluate prompt quality and accuracy
   - A/B testing support

6. **Version Control**
   - Prompts are versioned automatically
   - Version history is maintained
   - Changes can be reviewed and rolled back
   - Version metadata includes author, timestamp, and change description

**Prompt Builder Workflow**

1. Open Prompt Builder from the Agentforce setup
2. Create a new prompt or select an existing template
3. Drag components onto the canvas
4. Configure each component (instructions, variables, constraints)
5. Insert merge fields and dynamic variables
6. Preview the rendered prompt
7. Test with sample inputs
8. Save and version the prompt
9. Deploy to the agent configuration

**Prompt Builder Best Practices**

1. Keep prompts concise and focused
2. Use system instructions to define agent behavior
3. Inject grounding data dynamically
4. Test with diverse inputs
5. Version prompts and track changes
6. Monitor token usage and optimize

### Real-World Example

A financial advisor uses Prompt Builder to create a portfolio review prompt:

**Template Canvas**:
- **System Instruction**: "You are a certified financial advisor. Provide personalized investment advice based on the customer's portfolio and market conditions."
- **Context Block**: "Customer Portfolio: {!PortfolioData}. Market Conditions: {!MarketData}."
- **User Message**: "{!UserQuery}"
- **Output Formatting**: "Provide a summary of the portfolio review with specific recommendations. Include risk assessment and suggested actions."

**Variable Insertion**:
- `{!PortfolioData}` — bound to the customer's portfolio from CRM
- `{!MarketData}` — bound to real-time market data from Data Cloud
- `{!UserQuery}` — bound to the customer's message

**Preview Mode**: Shows the rendered prompt with sample data substituted
**Testing Mode**: Tests with 50 diverse customer queries, achieving 92% accuracy

### Common Mistakes

- Writing overly long prompts that waste tokens
- Not testing prompts with diverse inputs
- Not using system instructions to define behavior
- Not versioning prompts
- Ignoring token usage optimization

### Interview Tips

- Explain Prompt Builder components and workflow
- Provide a concrete example of a Prompt Builder configuration
- Emphasize testing and versioning
- Connect Prompt Builder to the overall Agentforce architecture

### Follow-up Questions

1. How do you test prompts in Prompt Builder?
2. What are the best practices for prompt design?
3. How do you optimize prompts for token usage?
4. How do you version prompts?