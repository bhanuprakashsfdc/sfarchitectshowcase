## Question 3: How does session context work?

### Answer

Session context is the information about the current session that provides context to the Agentforce agent. Session context includes session-specific data that persists across conversation turns within the same session.

### Architecture Explanation

**Session Context Components**

1. **Session Identity**
   - Unique session identifier
   - Session start and end timestamps
   - Session duration

2. **Authentication State**
   - Whether the user is authenticated
   - User ID and profile information
   - Authentication method and provider

3. **Channel Information**
   - The channel through which the user is interacting (chat, email, voice, mobile)
   - Channel-specific capabilities and limitations

4. **Device Information**
   - Device type (mobile, desktop, tablet)
   - Browser or application version
   - Device capabilities

5. **Session Variables**
   - Custom variables defined for the session
   - Persist across turns within the session
   - Example: User's preferred language, shopping cart contents

6. **Session State**
   - The current state of the session
   - Active Topics, completed Actions, pending Actions
   - Example: "User is in the Returns Topic, has initiated a return"

**Session Context Lifecycle**

1. **Creation**: Session context is created when a new session starts
2. **Population**: Session context is populated with authentication, channel, and device data
3. **Update**: Session context is updated as the conversation progresses
4. **Expiration**: Session context expires after a configurable timeout
5. **Cleanup**: Expired session context is cleaned up

**Session Context vs. Conversation Context**

| Aspect | Session Context | Conversation Context |
|--------|-----------------|---------------------|
| Scope | Entire session | Individual conversation |
| Persistence | Persists across turns | Persists within a turn |
| Content | Authentication, channel, device | Previous turns, intents, actions |
| Lifetime | Session duration | Turn duration |
| Example | User is authenticated on mobile | Previous turn was about order status |

### Real-World Example

A user starts a session on a mobile device:

**Session Context**:
- Session ID: "sess-abc123"
- Authenticated: true
- User ID: "user-456"
- Channel: "Mobile App"
- Device: "iPhone 15"
- Session Variables: {Language: "en", CartItems: 3}
- Session State: "Active"

**Conversation Context** (within the session):
- Turn 1: "I want to return an item"
- Turn 2: "Order #12345"
- Turn 3: "When will I get the refund?"

### Common Mistakes

- Not setting session variables correctly
- Not handling session expiration
- Confusing session context with conversation context
- Not cleaning up expired sessions

### Interview Tips

- Explain session context components
- Provide a concrete example
- Emphasize the difference between session and conversation context
- Connect session context to the overall Agentforce architecture

### Follow-up Questions

1. What is the session timeout configuration?
2. How do you manage session variables?
3. What is the difference between session context and conversation context?
4. How do you handle session expiration?