## Question 4: What are External Service Actions?

### Answer

External Service Actions provide a declarative way to integrate external APIs and services into Agentforce agents. Unlike REST API Actions that require manual configuration of endpoints, headers, and authentication, External Service Actions use Salesforce's declarative integration capabilities to simplify external API integration.

### Architecture Explanation

**External Service Action Components**

1. **External Service Definition**
   - A declarative definition of the external API
   - Includes the API specification (OpenAPI/Swagger)
   - Defines the available operations and their parameters
   - Configures authentication and security

2. **Operation Selection**
   - The External Service Action selects a specific operation from the external service
   - Operations are defined in the external service definition
   - Each operation has input parameters and output schemas

3. **Parameter Binding**
   - Input parameters are bound from the agent's context variables
   - Parameters are mapped to the operation's expected inputs
   - Default values can be configured

4. **Response Mapping**
   - Output values are mapped from the operation's response
   - Responses are mapped to context variables
   - Response schemas define the expected output structure

5. **Authentication**
   - Authentication is configured at the External Service level
   - Supports OAuth 2.0, JWT, and other authentication flows
   - Credentials are stored securely in Salesforce

**External Service Action Lifecycle**

1. Atlas selects the External Service Action as part of the execution plan
2. Input parameters are bound from context variables
3. The External Service operation is invoked
4. The external API processes the request
5. The response is parsed according to the defined schema
6. Output values are mapped to context variables
7. The agent incorporates the results into its reasoning chain
8. The External Service Action result is logged for observability

**External Service vs. REST API Action**

| Aspect | External Service Action | REST API Action |
|--------|------------------------|-----------------|
| Configuration | Declarative (OpenAPI spec) | Manual (endpoint, headers, body) |
| Authentication | Configured at service level | Configured per action |
| Maintenance | Easier to update (change spec) | Requires manual updates |
| Flexibility | Limited to defined operations | Full HTTP method control |
| Complexity | Lower | Higher |
| Best For | Standard API integrations | Custom or complex integrations |

### Real-World Example

A company integrates with a weather API using an External Service Action:

**External Service Definition**:
- Name: "WeatherAPI"
- OpenAPI spec: Defines operations for current weather, forecast, and alerts
- Authentication: API key via Named Credential

**External Service Action**:
- Operation: "GetCurrentWeather"
- Input Mapping: Location from context variable `{!UserLocation}`
- Output Mapping: Temperature → `{!Temperature}`, Conditions → `{!WeatherConditions}`, Alert → `{!WeatherAlert}`

**Agentflow**:
1. User asks "What's the weather like in Chicago?"
2. Atlas selects the External Service Action "GetCurrentWeather"
3. Location is bound from context
4. The weather API is called
5. Response is mapped to context variables
6. Agent generates a weather response

### Common Mistakes

- Not maintaining the OpenAPI spec when the external API changes
- Not handling schema changes in the external service
- Using External Service Actions for APIs that don't have a stable OpenAPI spec
- Not testing External Service Actions after API changes

### Interview Tips

- Explain External Service Action components and configuration
- Compare External Service Actions with REST API Actions
- Provide a concrete example
- Emphasize the declarative nature and maintenance benefits

### Follow-up Questions

1. When should you use External Service Actions vs. REST API Actions?
2. How do you handle OpenAPI spec changes?
3. What are the limitations of External Service Actions?
4. How do you test External Service Actions?