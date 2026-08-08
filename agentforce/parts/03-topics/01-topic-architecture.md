# Part 3 — Topics

---

## Question 1: What is Topic architecture?

### Answer

Topic architecture is the foundational design pattern in Agentforce that organizes an agent's behavior into discrete, manageable areas of expertise. Each Topic represents a specific business capability or conversation domain, and the collection of Topics defines what the agent can do and how it behaves.

### Architecture Explanation

**Topic Structure**

Each Topic consists of the following components:

1. **Topic Name**: A unique identifier for the Topic
2. **Description**: A human-readable description of what the Topic covers
3. **Instructions**: Detailed instructions that guide the agent's behavior within the Topic
4. **Entry Criteria**: Conditions that must be met for the Topic to be activated
5. **Exit Criteria**: Conditions that must be met for the Topic to be exited
6. **Actions**: The Actions that the agent can execute within the Topic
7. **Prompt Templates**: The Prompt Templates used within the Topic
8. **Context Variables**: The context variables that are relevant to the Topic
9. **Grounding Sources**: The grounding sources that the Topic uses
10. **Priority**: The Topic's priority relative to other Topics

**Topic Hierarchy**

Topics can be organized in a hierarchy:
- **Parent Topics**: High-level categories (e.g., "Customer Service")
- **Child Topics**: Specific sub-topics (e.g., "Order Status", "Returns", "Complaints")
- The hierarchy enables progressive deepening of conversations
- Parent Topics can delegate to child Topics

**Topic Lifecycle**

1. **Entry**: The user's intent matches the Topic's entry criteria
2. **Activation**: The Topic is activated and the agent begins processing within its scope
3. **Execution**: The agent executes Actions and generates responses within the Topic
4. **Progress**: The agent tracks progress toward the Topic's goals
5. **Exit**: The Topic's exit criteria are met
6. **Completion**: The Topic is completed and the agent moves to the next step

**Topic Configuration**

Topics are configured through the Agentforce setup interface:
- Topic name and description are defined
- Instructions are written in natural language
- Entry and exit criteria are specified using conditions
- Actions are assigned to the Topic
- Prompt Templates are associated with the Topic
- Context Variables and Grounding Sources are configured

### Real-World Example

A bank deploys an Agentforce agent with the following Topic architecture:

**Parent Topic**: Banking Services
- **Child Topic**: Account Management
  - Sub-Topic: Balance Inquiry
  - Sub-Topic: Transaction History
  - Sub-Topic: Account Statements
- **Child Topic**: Loan Services
  - Sub-Topic: Loan Application
  - Sub-Topic: Loan Status
  - Sub-Topic: Loan Repayment
- **Child Topic**: Card Services
  - Sub-Topic: Credit Card Activation
  - Sub-Topic: Card Replacement
  - Sub-Topic: Fraud Reporting

Each child Topic has its own instructions, Actions, Prompt Templates, and grounding sources. The parent Topic provides a fallback for any banking-related inquiry that doesn't match a specific child Topic.

### Common Mistakes

- Creating Topics that are too broad or too narrow
- Not defining clear entry and exit criteria
- Overlapping Topics that cause confusion
- Not organizing Topics in a hierarchy for complex domains
- Not reviewing Topics with business stakeholders

### Interview Tips

- Explain Topic architecture with a concrete example
- Emphasize the importance of clear Topic boundaries
- Discuss Topic hierarchy for complex domains
- Show awareness of the full Topic structure (name, description, instructions, criteria, actions)

### Follow-up Questions

1. How do you define Topic boundaries?
2. What is the difference between entry and exit criteria?
3. How do you handle Topic overlap?
4. How do you prioritize Topics?