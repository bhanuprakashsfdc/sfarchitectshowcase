## Question 5: What are merge fields and dynamic variables in Prompt Templates?

### Answer

Merge fields and dynamic variables are placeholders in Prompt Templates that are replaced with actual data at runtime. They enable prompts to be personalized and data-driven.

### Architecture Explanation

**Merge Fields**

1. **CRM Merge Fields**
   - Reference Salesforce CRM fields
   - Format: `{!Object.Field}`
   - Example: `{!Contact.Name}`, `{!Account.Phone}`
   - Resolved at runtime from the Salesforce database

2. **Context Variable Merge Fields**
   - Reference context variables defined in the agent configuration
   - Format: `{!VariableName}`
   - Example: `{!CustomerName}`, `{!OrderStatus}`
   - Resolved from the agent's context management system

3. **Grounding Merge Fields**
   - Reference grounding data retrieved from external sources
   - Format: `{!GroundingSource.Field}`
   - Example: `{!KnowledgeArticle.Title}`, `{!MarketData.Price}`
   - Resolved from the grounding service

**Dynamic Variables**

1. **Computed Variables**
   - Variables that are computed at runtime
   - Format: `{!VariableName:expression}`
   - Example: `{!TotalPrice:OrderItems.Price * OrderItems.Quantity}`
   - Computed by the prompt engine before the prompt is rendered

2. **Conditional Variables**
   - Variables that are included or excluded based on conditions
   - Format: `{!VariableName:if(condition, valueIfTrue, valueIfFalse)}`
   - Example: `{!Discount:if(Customer.Segment == 'Premium', '10%', '5%')}`

3. **Date/Time Variables**
   - Variables that resolve to the current date or time
   - Format: `{!DateTime:now}`
   - Example: `{!Today:format(now, 'MMMM dd, yyyy')}`

4. **List Variables**
   - Variables that resolve to a list of values
   - Format: `{!ListVariable:join(separator)}`
   - Example: `{!OrderItems:join(', ')}` — "Widget A, Widget B, Widget C"

5. **Lookup Variables**
   - Variables that look up values from related records
   - Format: `{!RelatedObject.Field}`
   - Example: `{!Opportunity.Account.Name}` — looks up the Account name from the Opportunity

**Variable Resolution Process**

1. The prompt template is parsed for merge fields and dynamic variables
2. Each variable is resolved at runtime
3. Variables are replaced with their actual values
4. The rendered prompt is sent to the LLM
5. If a variable cannot be resolved, a default value is used (if configured)

**Variable Scoping**

- Variables are scoped to the prompt template
- Variables can be inherited from parent contexts
- Variables can be overridden at the Topic or Action level
- Variable conflicts are resolved by scope precedence

### Real-World Example

A Prompt Template for a sales follow-up email:

"Dear {!Contact.FirstName},

Thank you for your interest in {!Product.Name}. Based on your {!Account.Industry} industry, we recommend the following:

{!Recommendation:if(Account.Industry == 'Healthcare', 'Our HIPAA-compliant solution', 'Our standard enterprise solution')}

The price is {!Product.Price:Currency} and the delivery time is {!DeliveryTime:if(Account.BillingAddress.Country == 'US', '3-5 business days', '7-14 business days')}.

Best regards,
{!User.Name}"

**Variable Resolution**:
- `{!Contact.FirstName}` → "John"
- `{!Product.Name}` → "Salesforce Platform"
- `{!Account.Industry}` → "Healthcare"
- `{!Recommendation}` → "Our HIPAA-compliant solution"
- `{!Product.Price:Currency}` → "$500.00"
- `{!DeliveryTime}` → "3-5 business days"
- `{!User.Name}` → "Jane Smith"

### Common Mistakes

- Using merge fields that don't exist
- Not configuring default values for optional variables
- Not testing variable resolution with diverse data
- Creating circular variable references
- Not scoping variables properly

### Interview Tips

- Explain the different variable types
- Provide a concrete example with variable resolution
- Emphasize the importance of testing variable resolution
- Connect variables to prompt personalization

### Follow-up Questions

1. What happens when a merge field cannot be resolved?
2. What is the difference between merge fields and dynamic variables?
3. How do you scope variables?
4. How do you test variable resolution?