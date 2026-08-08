## Question 10: What are Data Cloud Connectors?

### Answer

Data Cloud Connectors are pre-built integrations that enable Data Cloud to connect with external data sources. Connectors simplify the process of ingesting and accessing external data.

### Architecture Explanation

**Connector Types**

1. **Pre-Built Connectors**
   - Salesforce-provided connectors for common platforms
   - Examples: Snowflake, Databricks, AWS S3, Google BigQuery, Microsoft Azure

2. **Custom Connectors**
   - Custom connectors for proprietary or unique data sources
   - Built using the Data Cloud Connector SDK
   - Example: Custom connector for a legacy ERP system

3. **API Connectors**
   - Connectors that use REST APIs to access external data
   - Configured declaratively
   - Example: Connector to a third-party CRM via REST API

**Connector Configuration**
- Connection parameters (endpoint, authentication, credentials)
- Data mapping (source fields to Data Cloud fields)
- Sync schedule (real-time, batch, streaming)
- Error handling and retry policies

**Connector Lifecycle**
1. Connector is configured in Data Cloud
2. Connection is tested and validated
3. Data is ingested or accessed
4. Data is mapped to Data Cloud objects
5. Data is available for grounding in Agentforce

### Real-World Example

A company configures a Snowflake connector:

1. **Configuration**: Endpoint, OAuth credentials, database/schema
2. **Connection Test**: Validates connectivity and permissions
3. **Data Mapping**: Maps Snowflake tables to Data Cloud virtual tables
4. **Sync Schedule**: Real-time query federation
5. **Agentforce Grounding**: Agent queries virtual tables for real-time data

### Common Mistakes

- Not testing connector connectivity
- Not configuring proper authentication
- Not handling connector failures
- Not monitoring connector performance

### Interview Tips

- Explain connector types and configuration
- Provide a concrete example
- Emphasize error handling and monitoring
- Connect connectors to the overall Data Cloud architecture

### Follow-up Questions

1. How do you configure a connector?
2. What is the difference between pre-built and custom connectors?
3. How do you handle connector failures?
4. How do you monitor connector performance?