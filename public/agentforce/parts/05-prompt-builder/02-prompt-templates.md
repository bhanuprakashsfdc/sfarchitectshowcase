## Question 2: What are Prompt Templates?

### Answer

Prompt Templates are reusable prompt patterns that can be configured once and used across multiple Topics, Actions, and agents. Prompt Templates provide consistency, maintainability, and efficiency in prompt management.

### Architecture Explanation

**Prompt Template Components**

1. **Template Name and Description**
   - Unique identifier for the template
   - Human-readable description of the template's purpose
   - Example: "Customer Greeting Template" — "A standardized greeting for all customer interactions"

2. **System Instructions**
   - Define the agent's persona, constraints, and behavior
   - Applied to all interactions using this template
   - Example: "You are a helpful customer service representative. Be polite, concise, and professional."

3. **Context Blocks**
   - Sections of the prompt that inject dynamic data
   - Context blocks reference context variables and grounding data
   - Example: "Customer Name: {!CustomerName}. Account Status: {!AccountStatus}."

4. **User Message Template**
   - The template for the user's message
   - Can include variable placeholders
   - Example: "The customer asked: {!UserMessage}"

5. **Output Formatting**
   - Defines how the LLM's response should be formatted
   - Can specify structure, tone, and content constraints
   - Example: "Respond in 2-3 sentences. Do not include internal system IDs."

6. **Variable Definitions**
   - Defines all variables used in the template
   - Includes variable type, source, and default value
   - Example: `{!CustomerName}` — type: text, source: CRM, default: "Valued Customer"

**Prompt Template Lifecycle**

1. **Creation**: Create a new Prompt Template with the required components
2. **Testing**: Test the template with sample data
3. **Versioning**: Save and version the template
4. **Deployment**: Deploy the template to the agent configuration
5. **Usage**: The template is used by Topics and Actions
6. **Maintenance**: Update the template as requirements change
7. **Deprecation**: Deprecate old versions and retire them

**Prompt Template Types**

1. **Response Templates**: Generate natural language responses
2. **Summary Templates**: Summarize documents or conversations
3. **Classification Templates**: Classify inputs into categories
4. **Extraction Templates**: Extract structured data from unstructured text
5. **Generation Templates**: Generate new content (emails, reports, recommendations)

**Prompt Template Sharing**

- Templates can be shared across agents
- Templates can be shared across Topics
- Templates can be shared across organizations (via packages)
- Shared templates ensure consistency

### Real-World Example

A global retail company has the following Prompt Templates:

1. **Customer Greeting Template**: Used by 10 agents for initial greetings
2. **Order Status Template**: Used by 5 agents for order status inquiries
3. **Return Policy Template**: Used by 3 agents for return-related queries
4. **Complaint Response Template**: Used by 4 agents for complaint handling
5. **Product Recommendation Template**: Used by 6 agents for product recommendations

**Template Sharing**: The Customer Greeting Template is shared across all 10 agents, ensuring consistent brand voice.

**Maintenance**: When the return policy changes, the Return Policy Template is updated once, and all 3 agents using it automatically get the updated template.

### Common Mistakes

- Not creating reusable templates, leading to duplication
- Not versioning templates
- Not testing templates with diverse inputs
- Not sharing templates across agents
- Not maintaining templates as requirements change

### Interview Tips

- Explain Prompt Template components and lifecycle
- Provide a concrete example of template creation and usage
- Emphasize sharing and consistency
- Connect templates to the overall Agentforce architecture

### Follow-up Questions

1. How do you share Prompt Templates across agents?
2. What is the difference between Prompt Builder and Prompt Templates?
3. How do you version Prompt Templates?
4. How do you test Prompt Templates?