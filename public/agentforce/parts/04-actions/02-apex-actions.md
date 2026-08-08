## Question 2: What are Apex Actions?

### Answer

Apex Actions allow Agentforce agents to execute custom Apex code as part of the agent's reasoning and execution process. Apex Actions provide the most flexible and powerful Action type, enabling complex business logic, custom integrations, and data transformations that cannot be achieved with Flow Actions alone.

### Architecture Explanation

**Apex Action Components**

1. **Apex Class**
   - The Apex class that contains the action logic
   - The class must be annotated with `@InvocableMethod` or implement the `Action` interface
   - The class can contain any valid Apex code
   - The class can call other Apex classes, triggers, and services

2. **Input Parameters**
   - Input parameters are defined in the Apex class
   - Parameters can be primitive types (String, Integer, Decimal, Boolean) or sObject types
   - Parameters are mapped from the agent's context variables
   - Multiple input parameters are supported

3. **Output Values**
   - Output values are returned from the Apex method
   - Outputs can be primitive types or lists of sObjects
   - Outputs are mapped back to context variables
   - Multiple output values are supported

4. **Error Handling**
   - Apex Actions can throw exceptions for error conditions
   - Exceptions are caught by the Action Execution Engine
   - Error handling behavior is configured per Action (retry, fallback, escalate)
   - Custom error messages can be returned

5. **Governor Limits**
   - Apex Actions are subject to Salesforce governor limits
   - CPU time, SOQL queries, DML statements, and heap size are all limited
   - Long-running Apex Actions should be designed asynchronously
   - Bulkification is important for performance

**Apex Action Lifecycle**

1. Atlas selects the Apex Action as part of the execution plan
2. Input parameters are bound from context variables
3. The Apex class method is invoked
4. The Apex code executes
5. Output values are returned
6. The agent incorporates the results into its reasoning chain
7. The Apex Action result is logged for observability

**Apex Action Best Practices**

1. Keep Apex Actions focused and single-purpose
2. Use asynchronous processing for long-running operations
3. Bulkify Apex code for performance
4. Handle all exceptions gracefully
5. Log detailed execution information for debugging
6. Respect field-level security and object-level security
7. Use named credentials for external callouts
8. Test Apex Actions thoroughly with unit tests

### Real-World Example

A retail company uses an Apex Action for dynamic pricing:

**Apex Class**:
```apex
public class DynamicPricingAction {
    @InvocableMethod(label='Calculate Dynamic Price')
    public static List<PricingResult> calculatePrice(List<PriceRequest> requests) {
        // Get product and customer data
        // Apply pricing rules based on customer segment, demand, and inventory
        // Return dynamic price
    }
}
```

**Flow Action Configuration**:
- Apex Class: DynamicPricingAction
- Input Mapping: Product ID from context, Customer ID from context
- Output Mapping: Dynamic Price → context variable `{!DynamicPrice}`
- Error Handling: Fallback to standard pricing if Apex fails

### Common Mistakes

- Not handling governor limits properly
- Ignoring error handling in Apex code
- Not bulkifying Apex Actions
- Not testing Apex Actions thoroughly
- Exposing sensitive logic in Apex Actions without proper security

### Interview Tips

- Explain the Apex Action components and lifecycle
- Provide a concrete example with code
- Emphasize governor limits and best practices
- Connect Apex Actions to the overall Atlas execution flow

### Follow-up Questions

1. How do you handle governor limits in Apex Actions?
2. What is the difference between Flow Actions and Apex Actions?
3. How do you test Apex Actions?
4. When should you use Apex Actions over Flow Actions?