# Part 6 — Context Variables & Grounding

---

## Question 1: What are Context Variables?

### Answer

Context Variables are the data elements that provide context to the Agentforce agent during its reasoning and execution process. They enable the agent to access relevant information from the conversation, the user, the session, and the runtime environment.

### Architecture Explanation

**Context Variable Types**

1. **Conversation Context**
   - Data from the current conversation
   - Includes previous turns, user messages, and agent responses
   - Example: Previous user query, agent's previous response

2. **Session Context**
   - Data from the current session
   - Includes session ID, user authentication status, and session-specific variables
   - Example: Session start time, authentication status, session ID

3. **Runtime Context**
   - Data from the runtime environment
   - Includes device type, channel, location, and time
   - Example: User is on mobile, channel is chat, time is 2026-08-06T10:30:00Z

4. **User Context**
   - Data about the current user
   - Includes user profile, preferences, and history
   - Example: User ID, name, email, role, preferences

5. **Business Context**
   - Data from business objects and processes
   - Includes CRM records, order data, and account information
   - Example: Account ID, Opportunity Stage, Case Status

6. **Agent Context**
   - Data about the agent itself
   - Includes agent configuration, active Topics, and available Actions
   - Example: Agent name, active Topic, available Actions

**Context Variable Lifecycle**

1. **Initialization**: Context Variables are initialized when the conversation starts
2. **Population**: Context Variables are populated from various sources (CRM, grounding, user input)
3. **Update**: Context Variables are updated as the conversation progresses
4. **Consumption**: Context Variables are consumed by the Atlas engine, Prompt Templates, and Actions
5. **Expiration**: Context Variables are cleared when the conversation ends

**Context Variable Scope**

- **Global Scope**: Available to all Topics and Actions
- **Topic Scope**: Available only within the active Topic
- **Action Scope**: Available only within the executing Action
- **Turn Scope**: Available only for the current conversation turn

### Real-World Example

A customer service agent processes a return request:

**Conversation Context**: Previous turn: "I want to return my order"
**Session Context**: Session ID: "sess-123", Authenticated: true
**Runtime Context**: Channel: "Chat", Device: "Mobile", Time: "2026-08-06T10:30:00Z"
**User Context**: User ID: "user-456", Name: "John Smith", Role: "Customer"
**Business Context**: Account ID: "acct-789", Order Number: "ORD-12345", Order Status: "Delivered"
**Agent Context**: Agent Name: "Returns Agent", Active Topic: "Returns", Available Actions: "InitiateReturn", "CheckReturnStatus"

### Common Mistakes

- Not populating all required Context Variables
- Not scoping Context Variables appropriately
- Not updating Context Variables as the conversation progresses
- Not handling missing Context Variables gracefully

### Interview Tips

- Explain the different Context Variable types
- Provide a concrete example of Context Variable usage
- Emphasize the importance of scoping
- Connect Context Variables to the overall Atlas execution flow

### Follow-up Questions

1. What is the difference between conversation context and session context?
2. How do you handle missing Context Variables?
3. How do you scope Context Variables?
4. How do you update Context Variables during a conversation?