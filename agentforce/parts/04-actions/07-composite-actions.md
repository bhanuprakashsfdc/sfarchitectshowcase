## Question 7: What are Composite Actions?

### Answer

Composite Actions are a powerful Action type that allows Agentforce agents to orchestrate multiple Actions into a single, cohesive operation. Composite Actions enable complex multi-step workflows where the output of one Action feeds into the input of the next, all managed as a single unit.

### Architecture Explanation

**Composite Action Components**

1. **Action Chain**
   - A sequence of Actions that are executed in order
   - Each Action in the chain can depend on the output of previous Actions
   - Actions can be of different types (Flow, Apex, REST API, etc.)

2. **Dependency Graph**
   - Defines the dependencies between Actions in the chain
   - Actions can be sequential, parallel, or conditional
   - The dependency graph is visualized in the Agentforce configuration

3. **Data Flow**
   - Data flows between Actions through context variables
   - Output of Action A becomes input of Action B
   - Data transformation can be applied between Actions

4. **Error Handling**
   - Error handling is configured for the entire Composite Action
   - Individual Actions can have their own error handling
   - Fallback Actions can be configured for failed steps
   - The Composite Action can continue or abort on error

5. **Transaction Management**
   - Composite Actions can be configured as transactional
   - If any Action fails, all Actions in the transaction are rolled back
   - Transaction boundaries are defined per Composite Action

**Composite Action Patterns**

1. **Sequential Pattern**: Actions execute in sequence (A → B → C)
2. **Parallel Pattern**: Actions execute simultaneously (A + B → C)
3. **Conditional Pattern**: Actions execute based on conditions (A → if X then B else C)
4. **Loop Pattern**: Actions repeat until a condition is met
5. **Fan-Out/Fan-In Pattern**: Actions fan out to multiple parallel paths, then fan in to aggregate results

**Composite Action Lifecycle**

1. Atlas selects the Composite Action as part of the execution plan
2. The dependency graph is evaluated
3. Actions are executed according to the pattern (sequential, parallel, conditional)
4. Data flows between Actions through context variables
5. Error handling is applied at each step
6. The final result is returned to the agent
7. The Composite Action result is logged for observability

### Real-World Example

A bank uses a Composite Action for loan processing:

**Composite Action**: "LoanProcessing"

**Action Chain**:
1. **Flow Action**: "ValidateCustomer" — Validates customer eligibility
2. **REST API Action**: "GetCreditScore" — Retrieves credit score from external credit bureau
3. **Flow Action**: "CalculateLoanTerms" — Calculates loan terms based on credit score
4. **Apex Action**: "CreateLoanRecord" — Creates the loan record in Salesforce
5. **Prompt Template Action**: "GenerateLoanOffer" — Generates a loan offer document

**Dependency Graph**:
- Step 1 → Step 2 (sequential)
- Step 2 → Step 3 (sequential)
- Step 3 → Step 4 (sequential)
- Step 4 → Step 5 (sequential)

**Error Handling**:
- If Step 1 fails: Escalate to human agent
- If Step 2 fails: Retry once, then fallback to default credit score
- If Step 3 fails: Use default loan terms
- If Step 4 fails: Rollback all previous steps
- If Step 5 fails: Return the loan terms without the document

### Common Mistakes

- Not defining clear dependencies between Actions
- Not handling errors at the individual Action level
- Not testing the full Composite Action end-to-end
- Overcomplicating the dependency graph
- Not monitoring individual Action performance within the Composite Action

### Interview Tips

- Explain Composite Action components and patterns
- Provide a concrete example with a dependency graph
- Emphasize error handling and transaction management
- Connect Composite Actions to the overall Atlas execution flow

### Follow-up Questions

1. How do you design a Composite Action dependency graph?
2. What is the difference between sequential and parallel execution?
3. How do you handle partial failures in a Composite Action?
4. How do you test Composite Actions?