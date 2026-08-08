## Question 10: How does Agentforce handle error handling in Actions?

### Answer

Error handling in Agentforce Actions is a critical aspect of building reliable, production-grade agents. Proper error handling ensures that the agent can recover from failures gracefully, maintain data consistency, and provide a good user experience even when things go wrong.

### Architecture Explanation

**Error Types**

1. **Transient Errors**: Temporary failures that can be resolved with retry
   - Network timeouts
   - Service unavailable (503)
   - Rate limiting (429)
   - Temporary external system outages

2. **Persistent Errors**: Failures that cannot be resolved by retry
   - Authentication failures (401)
   - Authorization failures (403)
   - Not found (404)
   - Validation errors (400)
   - Business rule violations

3. **System Errors**: Failures in the Agentforce platform itself
   - Governor limit exceeded
   - Timeout
   - Out of memory
   - Platform unavailability

**Error Handling Strategies**

1. **Retry**
   - Retry transient errors with configurable backoff
   - Max retries, delay strategy (exponential, linear, fixed)
   - Retry only for retryable error types

2. **Fallback**
   - Execute a fallback Action when the primary Action fails
   - Fallback Actions provide alternative behavior
   - Example: If the primary REST API fails, fall back to a cached response

3. **Escalation**
   - Escalate to a human agent when the error cannot be recovered
   - Escalation includes the full context and error details
   - Example: If payment processing fails, escalate to a billing specialist

4. **Graceful Degradation**
   - Continue with partial results when non-critical Actions fail
   - Inform the user about what was accomplished and what was not
   - Example: If the recommendation engine fails, show generic recommendations

5. **Circuit Breaker**
   - Stop calling a failing external system after repeated failures
   - Circuit breaker opens after a configurable number of consecutive failures
   - Circuit breaker closes after a cooldown period

**Error Handling Configuration**

Per Action:
- Error type classification (retryable vs. non-retryable)
- Retry policy (max retries, backoff strategy)
- Fallback Action
- Escalation configuration

Per Composite Action:
- Transaction rollback on error
- Partial failure handling
- Error propagation rules

Per Topic:
- Default error handling behavior
- Escalation path
- Fallback Topic

**Error Logging and Monitoring**

- All errors are logged with full context
- Error metrics are tracked (error rate, error types, recovery success)
- Alerts are triggered for high error rates
- Error patterns are analyzed for continuous improvement

### Real-World Example

A customer tries to book a flight, but the flight API is down:

1. **Action Execution**: REST API Action "SearchFlights" is called
2. **Error**: The API returns a 503 Service Unavailable error
3. **Error Classification**: 503 is a transient error — retryable
4. **Retry**: Retry 1 (1s delay) — still 503
5. **Retry**: Retry 2 (2s delay) — still 503
6. **Retry**: Retry 3 (4s delay) — succeeds (200 OK)
7. **Recovery**: Flight search completes normally
8. **Logging**: Error logged with retry count = 3, recovery = true

If all retries had failed:
9. **Fallback**: Fallback Action returns cached flight data from last successful search
10. **Graceful Degradation**: Agent presents cached data with a note that it may be outdated
11. **Escalation**: If no cached data is available, escalate to a human agent

### Common Mistakes

- Not classifying errors (treating all errors the same)
- Not implementing retry for transient errors
- Not configuring fallback Actions
- Not logging errors with sufficient context
- Not monitoring error rates

### Interview Tips

- Explain the different error types and handling strategies
- Provide a concrete example of error handling in action
- Emphasize the importance of error classification
- Connect error handling to observability and monitoring

### Follow-up Questions

1. How do you classify errors?
2. What is a circuit breaker?
3. How do you design fallback Actions?
4. How do you monitor error rates?