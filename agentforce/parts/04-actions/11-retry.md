## Question 11: How does Agentforce handle retry for Actions?

### Answer

Retry mechanisms for Actions in Agentforce provide resilience against transient failures by automatically retrying failed Action executions with configurable policies. Retry is a critical component of the error handling strategy.

### Architecture Explanation

**Retry Configuration**

1. **Max Retries**
   - The maximum number of retry attempts
   - Default: 3 retries
   - Configurable per Action type and per Topic
   - Higher values increase resilience but also increase latency

2. **Backoff Strategy**
   - **Exponential Backoff**: Delay doubles with each retry (1s, 2s, 4s, 8s, ...)
   - **Linear Backoff**: Delay increases by a fixed amount (1s, 2s, 3s, 4s, ...)
   - **Fixed Backoff**: Same delay between all retries (2s, 2s, 2s, ...)
   - **Jitter Backoff**: Randomized delay to prevent thundering herd problems

3. **Retry Conditions**
   - **Retryable Errors**: Network timeouts, 5xx HTTP errors, service unavailable
   - **Non-Retryable Errors**: 4xx client errors (except 429), validation errors, authentication failures

4. **Retry Scope**
   - **Action-Level Retry**: Retry individual Action executions
   - **Composite Action-Level Retry**: Retry the entire Composite Action
   - **Topic-Level Retry**: Retry the entire Topic execution

**Retry Execution Flow**

1. Action execution fails
2. Atlas checks if the error is retryable
3. If retryable and retries remain, Atlas waits for the backoff period
4. Atlas retries the Action
5. If the retry succeeds, execution continues normally
6. If the retry fails, Atlas decrements the retry counter and repeats
7. If all retries are exhausted, Atlas triggers the fallback mechanism

**Retry Metrics**
- Retry count per Action type
- Retry success rate
- Average retry delay
- Retry-induced latency impact
- Retry failure rate (retries that also fail)

### Real-World Example

A customer requests a payment through an Agentforce agent:

1. **Action Execution**: REST API Action "ProcessPayment" is called
2. **Failure**: The payment gateway returns a 503 Service Unavailable error
3. **Retry Check**: 503 is a transient error — retryable
4. **Retry 1**: Wait 1s, retry — still 503
5. **Retry 2**: Wait 2s, retry — succeeds (200 OK)
6. **Recovery**: Payment is processed; conversation continues
7. **Logging**: Retry count = 2, retry success = true, retry delay = 3s total

### Common Mistakes

- Not configuring retry policies for critical Actions
- Using too many retries, causing excessive latency
- Not distinguishing between retryable and non-retryable errors
- Not monitoring retry metrics
- Not implementing jitter backoff

### Interview Tips

- Explain the retry configuration options
- Provide a concrete example of retry in action
- Emphasize the difference between retryable and non-retryable errors
- Connect retry to the overall error handling strategy

### Follow-up Questions

1. What is the default retry configuration?
2. How do you distinguish retryable from non-retryable errors?
3. What is jitter backoff and why is it important?
4. How do you monitor retry metrics?