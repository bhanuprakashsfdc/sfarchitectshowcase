## Question 9: What is Zero Copy in Data Cloud?

### Answer

Zero Copy is a Data Cloud capability that allows agents to access external data without physically copying it into Salesforce. Zero Copy enables real-time data access while maintaining data governance and security.

### Architecture Explanation

**Zero Copy Components**

1. **External Data Sources**
   - Data remains in the external system
   - No data is copied into Salesforce
   - Examples: Snowflake, Databricks, S3, external APIs

2. **Virtual Tables**
   - Virtual tables map to external data sources
   - Virtual tables behave like Salesforce objects
   - Example: Virtual table "ExternalOrders" maps to Snowflake orders table

3. **Query Federation**
   - Queries are executed against external data sources
   - Results are returned without copying data
   - Example: SOQL query on Virtual table triggers external query

4. **Security**
   - Access control is enforced at the external source
   - Data never leaves the external system unencrypted
   - Example: Snowflake access controls are applied

**Zero Copy Benefits**

1. **Real-Time Access**: Access external data in real time
2. **No Data Duplication**: No need to copy data into Salesforce
3. **Governance**: External data governance is maintained
4. **Scalability**: No storage overhead in Salesforce
5. **Security**: Data stays in the external system

**Zero Copy vs. Data Import**

| Aspect | Zero Copy | Data Import |
|--------|-----------|-------------|
| Data Location | External system | Salesforce |
| Real-Time Access | Yes | No (batch) |
| Storage | No Salesforce storage | Salesforce storage |
| Governance | External governance | Salesforce governance |
| Latency | Low (query-time) | High (batch) |

### Real-World Example

A financial company uses Zero Copy to access market data:

**External Data Source**: Snowflake data warehouse with real-time market data
**Virtual Table**: "MarketData" maps to Snowflake market_data table
**Query**: Agent queries "MarketData" for current stock prices
**Result**: Real-time stock prices are returned without copying data into Salesforce

**Agent Interaction**:
Customer: "What's the current price of AAPL?"
Agent: Queries MarketData virtual table → Returns real-time price → "AAPL is currently trading at $185.50"

### Common Mistakes

- Not configuring access controls properly
- Not handling query failures
- Not monitoring query performance
- Confusing Zero Copy with data import

### Interview Tips

- Explain Zero Copy components and benefits
- Provide a concrete example
- Emphasize real-time access and governance
- Connect Zero Copy to the overall Data Cloud architecture

### Follow-up Questions

1. What is the difference between Zero Copy and data import?
2. How do you configure virtual tables?
3. What are the performance considerations?
4. How do you secure Zero Copy access?