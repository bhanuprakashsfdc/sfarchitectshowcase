## Question 2: How do you define Topic boundaries?

### Answer

Topic boundaries define the scope and limits of each Topic, ensuring that the agent knows exactly what each Topic covers and when to activate or exit it. Well-defined Topic boundaries are essential for building reliable, predictable Agentforce agents.

### Architecture Explanation

**Boundary Definition Strategies**

1. **Intent-Based Boundaries**
   - Boundaries are defined by the intents that the Topic handles
   - Each Topic covers a specific set of intents
   - Intents are defined by the agent's training data and Topic descriptions
   - Example: A "Returns" Topic handles all return-related intents (initiate return, check return status, return policy)

2. **Entity-Based Boundaries**
   - Boundaries are defined by the entities (data objects) that the Topic operates on
   - Each Topic is associated with specific Salesforce objects or data types
   - Example: A "Customer Profile" Topic operates on Account and Contact records

3. **Action-Based Boundaries**
   - Boundaries are defined by the Actions that the Topic can execute
   - Each Topic has a specific set of Actions it can invoke
   - Example: A "Payments" Topic can only execute payment-related Actions

4. **Data-Based Boundaries**
   - Boundaries are defined by the data sources the Topic uses
   - Each Topic is grounded in specific data sources
   - Example: A "Product Information" Topic is grounded in the Product catalog and Knowledge articles

5. **User-Role-Based Boundaries**
   - Boundaries are defined by the user's role or profile
   - Different Topics are available to different user roles
   - Example: A "Admin Settings" Topic is only available to system administrators

**Boundary Enforcement**

- Entry criteria enforce when a Topic can be activated
- Exit criteria enforce when a Topic should be exited
- Topic instructions define what the agent should and should not do within the Topic
- Action availability is scoped to the active Topic
- Grounding sources are scoped to the active Topic

**Boundary Conflicts**

- When two Topics have overlapping boundaries, the agent may become confused
- Boundary conflicts are resolved through:
  - Priority settings (higher-priority Topics take precedence)
  - Confidence scoring (higher-confidence Topic wins)
  - Explicit boundary definitions (clear entry/exit criteria)
  - Topic hierarchy (parent Topics resolve conflicts between child Topics)

### Real-World Example

A retail company defines Topic boundaries for their customer service agent:

- **Order Management**: Handles order-related intents (track order, cancel order, modify order)
  - Entry: User mentions an order number or order-related intent
  - Exit: Order issue is resolved or escalated
  - Actions: GetOrderStatus, CancelOrder, ModifyOrder
  - Grounding: Salesforce Orders object, Inventory data

- **Returns**: Handles return-related intents (initiate return, check return status, return policy)
  - Entry: User mentions a return or refund request
  - Exit: Return is processed or escalated
  - Actions: InitiateReturn, CheckReturnStatus, GetReturnPolicy
  - Grounding: Salesforce Returns object, Return Policy Knowledge articles

- **Complaints**: Handles complaint-related intents (file complaint, escalate complaint, complaint status)
  - Entry: User expresses dissatisfaction or files a complaint
  - Exit: Complaint is resolved or escalated to a human agent
  - Actions: CreateComplaint, EscalateComplaint, GetComplaintStatus
  - Grounding: Salesforce Cases object, Complaint Policy Knowledge articles

Boundary conflict example: A user says "I want to return my order and complain about the delay."
- Both "Order Management" and "Returns" and "Complaints" could match
- Priority: Complaints (highest) > Returns > Order Management
- Atlas activates all three Topics but addresses Complaints first

### Common Mistakes

- Creating Topics with overlapping boundaries without clear conflict resolution
- Not defining entry and exit criteria
- Making Topics too broad (covering too many intents) or too narrow (missing related intents)
- Not reviewing boundaries with business stakeholders

### Interview Tips

- Explain boundary definition strategies with concrete examples
- Emphasize the importance of clear entry and exit criteria
- Discuss boundary conflict resolution
- Show awareness of the different boundary types (intent-based, entity-based, action-based, data-based, role-based)

### Follow-up Questions

1. How do you resolve Topic boundary conflicts?
2. What are the signs of poor Topic boundaries?
3. How do you test Topic boundaries?
4. How do you evolve Topic boundaries over time?