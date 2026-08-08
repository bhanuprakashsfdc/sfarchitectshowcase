## Question 8: What are Data Actions in Data Cloud?

### Answer

Data Actions are operations that manipulate and transform data in Salesforce Data Cloud. They enable the agent to not only read data but also write, update, and delete data as part of the agent's execution.

### Architecture Explanation

**Data Action Types**

1. **Read Actions**
   - Retrieve data from Data Cloud
   - Query Unified Individuals, segments, and insights
   - Example: "Get customer profile for UID-123"

2. **Write Actions**
   - Create new records in Data Cloud
   - Example: "Create a new interaction record for UID-123"

3. **Update Actions**
   - Update existing records in Data Cloud
   - Example: "Update customer preferences for UID-123"

4. **Delete Actions**
   - Delete records from Data Cloud
   - Example: "Delete outdated interaction records"

5. **Transform Actions**
   - Transform data within Data Cloud
   - Example: "Merge duplicate customer records"

6. **Compute Actions**
   - Compute new insights from existing data
   - Example: "Recalculate churn risk for all customers"

**Data Action Configuration**
- Actions are defined in Data Cloud
- Input parameters are mapped from context variables
- Output values are mapped to context variables
- Actions are secured with access control

**Data Action in Agentforce**
- Data Actions are used as Actions in Agentforce
- Atlas selects Data Actions as part of the execution plan
- Data Action results are used for grounding and response generation

### Real-World Example

A customer updates their preferences through an Agentforce agent:

1. **Read Action**: Retrieve current preferences for UID-123
2. **Update Action**: Update preferences based on user input
3. **Compute Action**: Recalculate segment membership based on new preferences
4. **Response**: Agent confirms the preference update

### Common Mistakes

- Not securing Data Actions properly
- Not validating input parameters
- Not handling Data Action failures
- Not logging Data Action results

### Interview Tips

- Explain Data Action types and configuration
- Provide a concrete example
- Emphasize security and validation
- Connect Data Actions to the overall Agentforce architecture

### Follow-up Questions

1. What is the difference between Data Actions and Flow Actions?
2. How do you secure Data Actions?
3. How do you handle Data Action failures?
4. How do you test Data Actions?