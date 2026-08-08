## Question 8: What are field generation prompts?

### Answer

Field generation prompts are specialized Prompt Templates that automatically generate values for Salesforce fields based on input data. They are commonly used for auto-populating fields during record creation or updates.

### Architecture Explanation

**Field Generation Prompt Components**

1. **Target Field**
   - The Salesforce field that will be populated
   - Defined by the field API name and object
   - Example: "Account.Description" or "Case.Subject"

2. **Input Data**
   - The data used to generate the field value
   - Can include other field values, context variables, and grounding data
   - Example: "Account.Name, Account.Industry, Account.Phone"

3. **Generation Instructions**
   - Instructions for how the field value should be generated
   - Specifies the format, length, and content constraints
   - Example: "Generate a brief description (max 255 characters) based on the account name and industry."

4. **Output Format**
   - Defines the expected format of the generated value
   - Options: plain text, JSON, HTML, markdown
   - Example: "Return only the generated text, no additional formatting."

5. **Validation Rules**
   - Rules that the generated value must satisfy
   - Includes field-level validation (length, type, required)
   - Example: "The generated description must be under 255 characters and not contain special characters."

**Field Generation Workflow**

1. A record is created or updated in Salesforce
2. The field generation prompt is triggered
3. Input data is gathered from the record and context
4. The prompt is rendered with the input data
5. The LLM generates the field value
6. The generated value is validated against the validation rules
7. If valid, the value is populated in the field
8. If invalid, the prompt is regenerated or a default value is used

**Field Generation Types**

1. **Description Generation**: Auto-generate field descriptions
2. **Subject Generation**: Auto-generate case or email subjects
3. **Summary Generation**: Auto-generate record summaries
4. **Name Generation**: Auto-generate names for records
5. **Content Generation**: Auto-generate field content (notes, comments)

### Real-World Example

A company uses field generation prompts for Case records:

**Target Field**: Case.Subject
**Input Data**: Case.Reason, Case.Account.Name, Case.Priority
**Generation Instructions**: "Generate a concise case subject (max 100 characters) that summarizes the case based on the reason, account name, and priority."
**Output Format**: Plain text
**Validation Rules**: Under 100 characters, no special characters except hyphens and parentheses

**Generated Subject**: "High Priority - Billing Issue for Acme Corp"

### Common Mistakes

- Not defining validation rules for generated values
- Not testing with diverse input data
- Not handling generation failures gracefully
- Generating values that violate field constraints (length, type)

### Interview Tips

- Explain field generation prompt components
- Provide a concrete example
- Emphasize validation rules
- Connect field generation to the overall Agentforce architecture

### Follow-up Questions

1. How do you validate generated field values?
2. What happens when generation fails?
3. How do you handle field constraints?
4. How do you test field generation prompts?