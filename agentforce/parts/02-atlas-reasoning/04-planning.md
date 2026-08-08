## Question 4: How does Atlas planning work?

### Answer

Atlas planning is the process by which the Atlas engine creates a structured execution plan based on the reasoning chain. The plan specifies which Actions to execute, in what order, with what parameters, and under what conditions. Planning is what transforms Atlas's reasoning into concrete, executable steps.

### Architecture Explanation

**Plan Structure**

A plan consists of:
- **Actions**: The specific Actions to execute (Flow, Apex, REST API, etc.)
- **Order**: The sequence in which Actions are executed
- **Parameters**: The input parameters for each Action
- **Dependencies**: Which Actions depend on the results of other Actions
- **Conditions**: Under what conditions each Action is executed
- **Fallbacks**: What happens if an Action fails

**Planning Process**

1. **Goal Decomposition**: Atlas decomposes the user's goal into sub-goals
2. **Action Selection**: For each sub-goal, Atlas selects the appropriate Action
3. **Dependency Mapping**: Atlas identifies dependencies between Actions
4. **Ordering**: Atlas orders Actions based on dependencies
5. **Parameter Binding**: Atlas binds parameters from context, grounding data, and previous Action results
6. **Validation**: Atlas validates the plan against the agent's configured capabilities
7. **Execution**: The plan is executed by the Action Execution Engine

**Planning Strategies**

1. **Greedy Planning**: Selects the best action at each step without considering future consequences
2. **Lookahead Planning**: Considers the consequences of each action before selecting it
3. **Constraint-Based Planning**: Respects constraints (budget, time, data availability) during planning
4. **Adaptive Planning**: Adjusts the plan based on intermediate results

**Dynamic Replanning**
- If an Action produces unexpected results, Atlas can replan
- Replanning considers the new information and adjusts the execution plan
- Replanning is logged and can be inspected for debugging

**Plan Validation**
- Atlas validates that each Action in the plan is available and configured
- It checks that all required parameters are provided
- It verifies that the plan doesn't violate any constraints (e.g., budget limits, rate limits)
- Invalid plans are rejected and a new plan is generated

### Real-World Example

A customer wants to book a flight and hotel for a trip to New York.

Atlas plan:
1. **Goal Decomposition**: Book flight + Book hotel
2. **Action Selection**: Flight search API, Hotel search API, Booking Flow, Confirmation email
3. **Dependency Mapping**: Flight search must complete before booking; Hotel search can run in parallel with flight search
4. **Ordering**: Flight search → Hotel search (parallel) → Flight booking → Hotel booking → Confirmation
5. **Parameter Binding**: Dates from user message, destination from user message, user profile from CRM
6. **Validation**: Check that both APIs are available, user has payment method on file
7. **Execution**: Execute plan; if flight booking fails, replan with alternative flights

### Common Mistakes

- Not considering Action dependencies in the plan
- Not implementing dynamic replanning for unexpected results
- Overlooking plan validation, leading to runtime errors
- Not handling partial plan failures (some Actions succeed, others fail)

### Interview Tips

- Explain the planning process with a concrete example
- Emphasize dynamic replanning as a key capability
- Mention plan validation and its importance
- Connect planning to the overall Atlas reasoning flow

### Follow-up Questions

1. How does Atlas handle plan failures?
2. What is dynamic replanning?
3. How do you validate a plan before execution?
4. How does Atlas handle parallel Actions?