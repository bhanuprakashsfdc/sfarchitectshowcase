## Question 3: What are Data Graphs in Data Cloud?

### Answer

Data Graphs are the relationship networks that connect all data entities in Salesforce Data Cloud. Data Graphs enable the agent to understand the relationships between customers, accounts, orders, products, and other entities.

### Architecture Explanation

**Data Graph Components**

1. **Nodes**
   - Entities in the graph (customers, accounts, orders, products, etc.)
   - Each node has attributes and relationships
   - Example: Customer node, Account node, Order node

2. **Edges**
   - Relationships between nodes
   - Edges define how nodes are connected
   - Example: Customer → Account (owns), Account → Order (placed), Order → Product (contains)

3. **Properties**
   - Attributes of nodes and edges
   - Example: Customer node has name, email, phone; Edge has relationship type

**Data Graph Types**

1. **Customer Graph**: Connects customers to their accounts, orders, and interactions
2. **Product Graph**: Connects products to categories, orders, and reviews
3. **Interaction Graph**: Connects all customer interactions across channels
4. **Organizational Graph**: Connects users, roles, and teams

**Data Graph Querying**

- Graph queries traverse relationships between nodes
- Example: "Find all customers who purchased Product X and have open cases"
- Graph queries use the Data Cloud query language
- Graph queries can traverse multiple levels of relationships

**Data Graph Benefits**

1. **Contextual Understanding**: The agent understands relationships between entities
2. **Personalization**: The agent can personalize responses based on relationships
3. **Insight Discovery**: The agent can discover patterns and insights from the graph
4. **Recommendation**: The agent can recommend related products based on the graph

### Real-World Example

A Data Graph for a retail company:

**Nodes**:
- Customer: John Smith (UID-123)
- Account: Acme Corp (ACCT-456)
- Order: ORD-789 (OrderDate: 2026-03-01, Total: $500)
- Product: Widget A (PROD-001)
- Case: CASE-002 (Status: Open)

**Edges**:
- John Smith → Acme Corp (owns)
- Acme Corp → ORD-789 (placed)
- ORD-789 → Widget A (contains)
- John Smith → CASE-002 (has)

**Graph Query**: "Find all products purchased by customers who have open cases"
- Result: Widget A (purchased by John Smith who has open case CASE-002)

### Common Mistakes

- Not modeling relationships in the Data Graph
- Not querying the Data Graph effectively
- Not maintaining the Data Graph over time
- Overcomplicating the graph structure

### Interview Tips

- Explain Data Graph components and types
- Provide a concrete example
- Emphasize the benefits for Agentforce
- Connect Data Graphs to the overall Data Cloud architecture

### Follow-up Questions

1. How do you query a Data Graph?
2. What are the benefits of Data Graphs for Agentforce?
3. How do you maintain Data Graphs?
4. What is the difference between a Data Graph and a CRM relationship?