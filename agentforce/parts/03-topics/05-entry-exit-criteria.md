## Question 5: What are Topic entry and exit criteria?

### Answer

Topic entry and exit criteria are conditions that determine when a Topic should be activated and when it should be exited. They are essential for controlling the agent's conversation flow and ensuring that Topics are activated and exited at the right times.

### Architecture Explanation

**Entry Criteria**

Entry criteria define the conditions that must be met for a Topic to be activated. They are evaluated when a user message is received and the Atlas engine is determining which Topic to activate.

**Entry Criteria Types**

1. **Intent-Based Entry**
   - The Topic is activated when the user's intent matches the Topic's scope
   - Example: "Activate the Returns Topic when the user expresses a desire to return a product"

2. **Entity-Based Entry**
   - The Topic is activated when specific entities are mentioned in the user's message
   - Example: "Activate the Order Management Topic when an order number is mentioned"

3. **Context-Based Entry**
   - The Topic is activated based on the conversation context
   - Example: "Activate the Billing Topic when the user has already discussed their order and now asks about payment"

4. **State-Based Entry**
   - The Topic is activated based on the current state of the conversation
   - Example: "Activate the Payment Topic only after the Order Management Topic has been completed"

5. **Time-Based Entry**
   - The Topic is activated based on time or date conditions
   - Example: "Activate the Appointment Topic only during business hours"

**Exit Criteria**

Exit criteria define the conditions that must be met for a Topic to be exited. They are evaluated after each Action execution and conversation turn.

**Exit Criteria Types**

1. **Goal-Based Exit**
   - The Topic is exited when the user's goal has been achieved
   - Example: "Exit the Order Management Topic when the order status has been provided"

2. **Action-Based Exit**
   - The Topic is exited when a specific Action has been executed
   - Example: "Exit the Returns Topic when the return has been initiated"

3. **User-Based Exit**
   - The Topic is exited when the user explicitly indicates they are done
   - Example: "Exit the Topic when the user says 'thank you' or 'that's all'"

4. **Error-Based Exit**
   - The Topic is exited when an error occurs that cannot be recovered from
   - Example: "Exit the Topic when the order cannot be found and the user does not provide a valid order number"

5. **Escalation-Based Exit**
   - The Topic is exited when the conversation is escalated to a human agent
   - Example: "Exit the Topic when the user requests a supervisor"

**Entry and Exit Criteria Configuration**

Entry and exit criteria are configured using conditions that can reference:
- User intent and confidence scores
- Conversation context variables
- Action execution results
- Salesforce record data
- Time and date conditions

**Entry and Exit Criteria Evaluation**

- Entry criteria are evaluated when a new message is received
- Exit criteria are evaluated after each Action execution
- If exit criteria are met, the Topic is exited and the agent moves to the next step
- If entry criteria are met for a new Topic while the current Topic is active, the agent may switch Topics based on priority and configuration

### Real-World Example

Topic: "Flight Booking"

Entry Criteria:
- Intent: "book flight" or "flight reservation" with confidence > 70%
- OR: User mentions travel dates and destination
- AND: User is authenticated (has a Salesforce account)

Exit Criteria:
- Goal-Based: Flight booking is confirmed
- Action-Based: Flow Action "ConfirmBooking" has been executed successfully
- User-Based: User says "cancel" or "never mind"
- Error-Based: Flight search returns no results and user does not want to try different dates
- Escalation-Based: User requests a human agent

### Common Mistakes

- Not defining entry criteria, leading to Topics being activated at the wrong time
- Not defining exit criteria, leading to Topics never being exited
- Making entry criteria too strict, causing Topics to never be activated
- Making exit criteria too loose, causing Topics to exit prematurely
- Not testing entry and exit criteria with diverse inputs

### Interview Tips

- Explain the different types of entry and exit criteria
- Provide a concrete example of entry and exit criteria
- Emphasize the importance of testing criteria with diverse inputs
- Connect entry/exit criteria to conversation flow control

### Follow-up Questions

1. How do you test entry and exit criteria?
2. What happens when entry criteria for two Topics are met simultaneously?
3. How do you handle partial exit criteria?
4. How do you evolve entry and exit criteria over time?