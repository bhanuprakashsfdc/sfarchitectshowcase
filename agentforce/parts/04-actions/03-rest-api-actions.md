## Question 3: What are REST API Actions?

### Answer

REST API Actions allow Agentforce agents to call external REST APIs as part of the agent's reasoning and execution process. REST API Actions enable integration with external systems, third-party services, and custom APIs that are not natively available in Salesforce.

### Architecture Explanation

**REST API Action Components**

1. **Endpoint Configuration**
   - The REST API endpoint URL
   - HTTP method (GET, POST, PUT, PATCH, DELETE)
   - Base URL and path
   - Query parameters and path parameters

2. **Authentication**
   - Authentication type (OAuth 2.0, Basic Auth, API Key, Named Credential)
   - Token management and refresh
   - Credential storage and security

3. **Request Configuration**
   - Request headers (Content-Type, Authorization, custom headers)
   - Request body (JSON, form-data, URL-encoded)
   - Request timeout
   - Payload mapping from context variables

4. **Response Handling**
   - Response parsing (JSON, XML, text)
   - Response mapping to context variables
   - Error response handling
   - Status code handling

5. **Error Handling**
   - HTTP error codes (4xx, 5xx)
   - Network errors (timeout, connection failure)
   - Retry logic for transient errors
   - Fallback behavior for persistent errors

6. **Security**
   - Named Credentials for secure authentication
   - Certificate-based authentication
   - IP whitelisting
   - Payload encryption

**REST API Action Lifecycle**

1. Atlas selects the REST API Action as part of the execution plan
2. Request parameters are bound from context variables
3. The HTTP request is sent to the external endpoint
4. The external service processes the request
5. The response is received and parsed
6. Output values are mapped to context variables
7. The agent incorporates the results into its reasoning chain
8. The REST API Action result is logged for observability

**REST API Action Patterns**

1. **Synchronous Pattern**: The agent waits for the API response before continuing
2. **Asynchronous Pattern**: The API call is queued and the agent continues with other actions
3. **Batch Pattern**: Multiple API calls are batched into a single request
4. **Chained Pattern**: The output of one API call is the input of the next

### Real-World Example

A logistics company uses a REST API Action for real-time shipment tracking:

**Endpoint**: `https://api.logistics.com/v1/shipments/{trackingNumber}`
**Method**: GET
**Authentication**: OAuth 2.0 via Named Credential
**Request Headers**: `Content-Type: application/json`
**Response Mapping**:
- `status` → context variable `{!ShipmentStatus}`
- `estimatedDelivery` → context variable `{!EstimatedDelivery}`
- `currentLocation` → context variable `{!CurrentLocation}`

**Agentflow**:
1. User asks "Where is my shipment?"
2. Atlas extracts tracking number from the message
3. REST API Action calls the logistics API
4. Response is parsed and mapped to context variables
5. Agent generates a response with the shipment status and location

### Common Mistakes

- Not using Named Credentials for authentication
- Not handling error responses properly
- Not implementing retry logic for transient failures
- Not setting request timeouts
- Exposing API keys in the configuration
- Not validating response data before mapping

### Interview Tips

- Explain REST API Action components and configuration
- Provide a concrete example with endpoint, authentication, and response mapping
- Emphasize security best practices (Named Credentials)
- Connect REST API Actions to the overall Atlas execution flow

### Follow-up Questions

1. How do you secure REST API Actions?
2. What is the difference between synchronous and asynchronous REST API Actions?
3. How do you handle API rate limiting?
4. How do you test REST API Actions?