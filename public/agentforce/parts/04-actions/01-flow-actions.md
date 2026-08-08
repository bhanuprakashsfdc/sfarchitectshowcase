# Part 4 — Actions

---

## Question 1: What are Flow Actions?

### Answer

Flow Actions are the most common type of Action in Agentforce, allowing agents to execute Salesforce Flows as part of the agent's reasoning and execution process. Flow Actions provide a declarative way to integrate business logic, data manipulation, and automation into Agentforce agents.

### Architecture Explanation

**Flow Action Components**

1. **Flow Selection**
   - The Flow Action references an existing Salesforce Flow
   - The Flow must be designed to accept input parameters and return output values
   - Flows can be Screen Flows, Autolaunched Flows, or Subflows
   - Only Autolaunched Flows are typically used as Flow Actions (no user interface required)

2. **Parameter Mapping**
   - Input parameters are mapped from the agent's context variables
   - Parameters can be static values or dynamic expressions
   - Output values are mapped back to context variables for use in subsequent steps

3. **Execution Mode**
   - **Synchronous**: The Flow Action executes and returns results immediately
   - **Asynchronous**: The Flow Action is queued and executes in the background
   - Synchronous is the default for most Flow Actions
   - Asynchronous is used for long-running operations

4. **Error Handling**
   - Flow Actions can be configured with error handling behavior
   - Options include: retry, fallback, escalate, or continue
   - Error details are captured in the execution trace

5. **Security**
   - Flow Actions respect field-level security and object-level security
   - The Flow runs in the context of the running user
   - Sharing rules are enforced

**Flow Action Lifecycle**

1. Atlas selects the Flow Action as part of the execution plan
2. Input parameters are bound from context variables
3. The Flow is invoked with the provided parameters
4. The Flow executes its defined logic
5. Output values are returned to the agent
6. The agent incorporates the results into its reasoning chain
7. The Flow Action result is logged for observability

### Real-World Example

A bank uses a Flow Action for loan application processing:

**Flow**: "LoanApplicationProcessor"
- **Input Parameters**: Customer ID, Loan Amount, Loan Type
- **Logic**: Validates customer eligibility, checks credit score, calculates interest rate, creates loan application record
- **Output Values**: Application Status, Interest Rate, Monthly Payment, Approval Decision

**Flow Action Configuration**:
- Flow: LoanApplicationProcessor
- Input Mapping: Customer ID from context variable `{!User.Id}`, Loan Amount from user message, Loan Type from Topic selection
- Output Mapping: Application Status → context variable `{!LoanStatus}`, Approval Decision → context variable `{!ApprovalDecision}`
- Execution Mode: Synchronous
- Error Handling: Retry (2 attempts), then escalate to human agent

**Agentflow**:
1. User says "I want to apply for a home loan"
2. Atlas selects the Flow Action "LoanApplicationProcessor"
3. Input parameters are bound
4. The Flow executes and returns the approval decision
5. The agent presents the result to the user

### Common Mistakes

- Using Screen Flows instead of Autolaunched Flows for Flow Actions
- Not mapping all required input parameters
- Not handling Flow errors appropriately
- Ignoring field-level security in Flow design
- Using synchronous execution for long-running Flows

### Interview Tips

- Explain Flow Action components and configuration
- Provide a concrete example with input/output mapping
- Emphasize the difference between synchronous and asynchronous execution
- Connect Flow Actions to the overall Atlas execution flow

### Follow-up Questions

1. What types of Flows can be used as Flow Actions?
2. How do you handle Flow errors?
3. What is the difference between synchronous and asynchronous Flow Actions?
4. How do you optimize Flow Action performance?