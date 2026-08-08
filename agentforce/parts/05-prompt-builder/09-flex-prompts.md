## Question 9: What are Flex prompts?

### Answer

Flex prompts are flexible, configurable Prompt Templates that can be adapted for different use cases without requiring code changes. They provide a dynamic prompt configuration that can be modified at runtime based on context, user input, and business rules.

### Architecture Explanation

**Flex Prompt Components**

1. **Base Template**
   - The core prompt template with placeholders
   - Defines the structure and flow of the prompt
   - Example: "You are {{Role}}. {{Task}}. {{Context}}."

2. **Dynamic Sections**
   - Sections that can be enabled or disabled based on conditions
   - Each section has a condition that determines whether it is included
   - Example: "If the user is a Premium customer, include the loyalty points section."

3. **Conditional Logic**
   - Logic that determines which sections and variables to include
   - Conditions can reference context variables, user data, and system state
   - Example: "If Order.TotalAmount > 1000, include the discount section."

4. **Variable Overrides**
   - Variables that can be overridden at runtime
   - Overrides are applied based on the current context
   - Example: "The Role variable can be overridden to 'Sales Manager' for VIP customers."

5. **Fallback Configurations**
   - Fallback configurations for when the primary configuration fails
   - Ensures the prompt always has a valid configuration
   - Example: "If the Premium customer section fails, use the standard customer section."

**Flex Prompt Configuration**

Flex prompts are configured with:
- Base template with placeholders
- Dynamic sections with conditions
- Conditional logic rules
- Variable override rules
- Fallback configurations

**Flex Prompt Lifecycle**

1. The Flex Prompt is configured with a base template and dynamic sections
2. At runtime, the conditions are evaluated
3. The appropriate sections are included or excluded
4. Variables are resolved with overrides applied
5. The final prompt is rendered and sent to the LLM
6. If a section fails, the fallback configuration is used

### Real-World Example

A Flex Prompt for customer support:

**Base Template**: "You are {{Role}}. {{Task}}. {{Context}}."

**Dynamic Sections**:
- **Premium Support Section** (condition: User.Tier == 'Premium'):
  "The customer is a Premium member with priority support access."
- **Standard Support Section** (condition: User.Tier == 'Standard'):
  "The customer is a Standard member with regular support access."
- **VIP Section** (condition: Account.Revenue > 1000000):
  "The customer is a VIP account. Escalate any issues immediately."

**Conditional Logic**:
- If the user is Premium AND VIP, include both Premium Support and VIP sections
- If the user is Standard, include only the Standard Support section

**Variable Overrides**:
- Role: "Senior Support Agent" for VIP customers, "Support Agent" for others
- Task: "Resolve the issue within 1 hour" for Premium customers, "Resolve the issue within 24 hours" for Standard customers

**Fallback**:
- If the Premium Support Section fails, use the Standard Support Section

### Common Mistakes

- Overcomplicating Flex prompts with too many conditions
- Not testing all condition combinations
- Not defining fallback configurations
- Not documenting the conditional logic

### Interview Tips

- Explain Flex prompt components and configuration
- Provide a concrete example
- Emphasize the flexibility and adaptability
- Connect Flex prompts to the overall Agentforce architecture

### Follow-up Questions

1. When should you use Flex prompts vs. static prompts?
2. How do you test Flex prompts with different conditions?
3. What are the performance implications of Flex prompts?
4. How do you document Flex prompt logic?