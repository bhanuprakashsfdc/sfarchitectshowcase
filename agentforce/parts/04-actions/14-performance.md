## Question 14: How do you optimize Action performance?

### Answer

Performance optimization for Agentforce Actions is essential for building fast, scalable, and cost-effective agents. Optimizing Action performance directly impacts user experience, cost, and scalability.

### Architecture Explanation

**Performance Optimization Strategies**

1. **Asynchronous Execution**
   - Use asynchronous Actions for long-running operations
   - Asynchronous Actions don't block the conversation
   - The agent can continue with other Actions while waiting
   - Example: A report generation Action that takes 30 seconds should be asynchronous

2. **Caching**
   - Cache frequently accessed data to reduce redundant Action calls
   - Cache grounding data that doesn't change frequently
   - Cache LLM responses for similar inputs
   - Configure cache TTL (time to live) appropriately

3. **Batch Processing**
   - Batch multiple requests into a single Action call
   - Reduces the number of external calls
   - Improves throughput
   - Example: Batch multiple record lookups into a single SOQL query

4. **Parallel Execution**
   - Execute independent Actions in parallel
   - Reduces overall execution time
   - Example: Get customer profile and order history in parallel instead of sequentially

5. **Prompt Optimization**
   - Keep prompts concise to reduce token usage
   - Use prompt caching for repeated prompts
   - Optimize grounding data to include only relevant information
   - Monitor and reduce unnecessary token consumption

6. **Connection Pooling**
   - Reuse connections to external systems
   - Reduces connection overhead
   - Improves latency for repeated calls to the same endpoint

7. **Rate Limiting**
   - Implement rate limiting to protect external systems
   - Rate limiting prevents overwhelming external APIs
   - Configure rate limits per external system

8. **Timeout Configuration**
   - Set appropriate timeouts for each Action
   - Short timeouts for fast operations
   - Longer timeouts for slow operations
   - Prevents hanging Actions from blocking the conversation

**Performance Metrics**

- Action execution latency (p50, p95, p99)
- Token usage per Action
- Error rate
- Retry rate
- Cache hit rate
- Throughput (actions per second)

**Performance Testing**

- Load test Actions with realistic volumes
- Identify bottlenecks through profiling
- Test with peak load scenarios
- Monitor performance in production

### Real-World Example

A retail company optimizes Action performance:

1. **Asynchronous Execution**: Report generation Actions are asynchronous
2. **Caching**: Product catalog data is cached for 5 minutes
3. **Batch Processing**: Multiple inventory checks are batched into a single API call
4. **Parallel Execution**: Customer profile and order history are fetched in parallel
5. **Prompt Optimization**: Prompt token usage reduced by 35% through optimization
6. **Connection Pooling**: Connections to the ERP system are pooled
7. **Rate Limiting**: Rate limits configured for the payment gateway (100 req/min)
8. **Timeout Configuration**: API timeouts set to 5s for fast operations, 30s for slow operations

**Result**: Average Action latency reduced from 3.2s to 1.1s, token costs reduced by 40%, and the system handles 5x the previous load.

### Common Mistakes

- Using synchronous execution for long-running Actions
- Not caching frequently accessed data
- Not batching related requests
- Not testing performance under load
- Ignoring timeout configuration

### Interview Tips

- Explain performance optimization strategies
- Provide concrete examples of optimization techniques
- Emphasize the business impact of performance optimization
- Connect performance to cost and scalability

### Follow-up Questions

1. What is the biggest performance bottleneck?
2. How do you measure Action performance?
3. How do you balance performance with cost?
4. What are the most common performance issues?