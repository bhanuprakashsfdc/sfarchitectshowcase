## Question 9: How does Agentforce handle transaction management?

### Answer

Transaction management in Agentforce ensures that Action executions are handled reliably, with proper rollback, commit, and error recovery mechanisms. Understanding transaction management is essential for building data-consistent Agentforce implementations.

### Architecture Explanation

**Transaction Management in Agentforce**

1. **Transaction Boundaries**
   - Each Action execution can be part of a transaction
   - Transactions define the scope of atomicity
   - Transactions can be configured per Action, per Composite Action, or per Topic
   - Default: Each Action is its own transaction

2. **Commit and Rollback**
   - If all Actions in a transaction succeed, the transaction is committed
   - If any Action in a transaction fails, the transaction is rolled back
   - Rollback undoes all changes made within the transaction
   - Rollback ensures data consistency

3. **Savepoints**
   - Savepoints allow partial rollback within a transaction
   - A savepoint is set before a critical Action
   - If the Action fails, the transaction rolls back to the savepoint
   - Previous Actions in the transaction are preserved

4. **Transaction Isolation**
   - Transactions are isolated from each other
   - Changes in one transaction are not visible to other transactions until committed
   - Isolation prevents dirty reads and inconsistent data

5. **Long-Running Transactions**
   - Long-running transactions can cause lock contention
   - Asynchronous Actions should be used for long-running operations
   - Transaction timeouts should be configured

**Transaction Management Strategies**

1. **Per-Action Transactions**: Each Action is its own transaction (default)
2. **Composite Action Transactions**: All Actions in a Composite Action are in a single transaction
3. **Topic-Level Transactions**: All Actions within a Topic are in a single transaction
4. **Conversation-Level Transactions**: All Actions across the entire conversation are in a single transaction (rare, high risk)

**Transaction Management Best Practices**

1. Use the smallest practical transaction scope
2. Use savepoints for critical operations
3. Avoid long-running transactions
4. Use asynchronous Actions for operations that may exceed transaction limits
5. Test transaction behavior thoroughly
6. Monitor transaction metrics (commit rate, rollback rate, lock contention)

### Real-World Example

A bank uses transaction management for a money transfer:

**Composite Action**: "MoneyTransfer"
1. **Flow Action**: "DebitSourceAccount" — Debits the source account
2. **REST API Action**: "CreditDestinationAccount" — Credits the destination account via external bank API
3. **Flow Action**: "CreateTransactionRecord" — Creates a transaction record in Salesforce

**Transaction Configuration**:
- Transaction scope: Composite Action level
- Savepoint: Set before Step 2
- Error handling: If Step 2 fails, rollback to savepoint (Step 1 is preserved)
- If Step 3 fails, rollback entire transaction (Steps 1 and 2 are undone)

**Result**: If the external bank API fails, the debit is rolled back, ensuring data consistency.

### Common Mistakes

- Using too broad a transaction scope (conversation-level)
- Not using savepoints for critical operations
- Not testing rollback behavior
- Ignoring lock contention in high-volume scenarios
- Not monitoring transaction metrics

### Interview Tips

- Explain transaction boundaries and commit/rollback
- Provide a concrete example with savepoints
- Emphasize the importance of transaction scope
- Connect transaction management to data consistency

### Follow-up Questions

1. What is the default transaction scope?
2. How do you configure savepoints?
3. What are the risks of conversation-level transactions?
4. How do you monitor transaction performance?