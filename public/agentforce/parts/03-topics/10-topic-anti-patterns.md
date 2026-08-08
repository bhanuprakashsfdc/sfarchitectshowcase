## Question 10: What are the anti-patterns in Topic design?

### Answer

Topic anti-patterns are common mistakes and design flaws that lead to poor Agentforce agent performance. Recognizing and avoiding these anti-patterns is essential for building reliable, scalable, and maintainable Topic configurations.

### Architecture Explanation

**Anti-Pattern 1: The Mega-Topic**
- A single Topic that tries to handle everything
- Symptoms: Low confidence scores, inconsistent behavior, difficult to maintain
- Solution: Decompose into smaller, focused Topics
- Example: A "Customer Service" Topic that handles everything from order status to billing to technical support

**Anti-Pattern 2: The Ghost Topic**
- A Topic that is never activated because its entry criteria are too strict or its description is unclear
- Symptoms: Topic shows 0% activation rate in analytics
- Solution: Review entry criteria, expand examples, improve description
- Example: A "Premium Support" Topic that only activates for users with a specific product tier, but the description doesn't mention the tier requirement

**Anti-Pattern 3: The Overlapping Topic**
- Two or more Topics with overlapping scopes that cause confusion
- Symptoms: High Topic switching rate, inconsistent responses, user confusion
- Solution: Define clear boundaries, merge overlapping Topics, or use priority-based resolution
- Example: "Order Status" and "Order Tracking" Topics that both handle delivery inquiries

**Anti-Pattern 4: The Orphan Topic**
- A Topic that has no grounding sources, no Actions, and no Prompt Templates
- Symptoms: Topic activates but cannot provide useful responses
- Solution: Ensure every Topic has at least one Action and one grounding source
- Example: A "FAQ" Topic with no Knowledge article grounding

**Anti-Pattern 5: The Rigid Topic**
- A Topic with overly strict entry and exit criteria that prevents natural conversation flow
- Symptoms: User frustration, frequent escalations, incomplete conversations
- Solution: Relax criteria, add fallback paths, allow Topic switching
- Example: A "Returns" Topic that exits immediately after the return is initiated, preventing follow-up questions

**Anti-Pattern 6: The Undocumented Topic**
- A Topic with no description, no instructions, or no examples
- Symptoms: Unpredictable behavior, difficult to debug, hard to maintain
- Solution: Document every Topic with descriptions, instructions, and examples
- Example: A Topic with only a name and no other configuration

**Anti-Pattern 7: The Static Topic**
- A Topic that is never updated after initial deployment
- Symptoms: Declining accuracy, outdated information, poor user experience
- Solution: Regularly review and update Topics based on conversation analytics
- Example: A "Product Information" Topic that doesn't reflect new product releases

**Anti-Pattern 8: The Unbounded Topic**
- A Topic with no exit criteria, causing the agent to stay in the Topic indefinitely
- Symptoms: Conversations that never end, user frustration, resource waste
- Solution: Define clear exit criteria for every Topic
- Example: A "General Inquiry" Topic that never exits because there's always more the user could ask

**Anti-Pattern 9: The Ignored Topic**
- A Topic that is configured but not monitored or maintained
- Symptoms: Unknown performance, undetected issues, wasted configuration effort
- Solution: Monitor all Topics through observability dashboards
- Example: A Topic with high error rates that nobody is aware of

**Anti-Pattern 10: The Copy-Paste Topic**
- Topics that are copied from each other with minimal changes
- Symptoms: Inconsistent behavior, maintenance nightmares, cascading errors
- Solution: Use Topic templates instead of copy-paste, maintain a single source of truth
- Example: 50 Topics that are all slightly different versions of the same template

### Real-World Example

A company deployed an Agentforce agent with the "Mega-Topic" anti-pattern:
- A single "Customer Service" Topic handled everything
- Intent recognition accuracy was 45%
- Users were frequently routed to the wrong Topic
- The Topic was impossible to maintain

The company decomposed the Mega-Topic into 15 focused Topics:
- Intent recognition accuracy improved to 88%
- User satisfaction increased by 40%
- Maintenance became manageable
- New Topics could be added without affecting existing ones

### Common Mistakes

- Creating Mega-Topics instead of focused Topics
- Not monitoring Topic performance
- Not updating Topics after deployment
- Copy-pasting Topics instead of using templates
- Ignoring Topic anti-patterns during design

### Interview Tips

- Be aware of the common anti-patterns
- Provide examples of each anti-pattern
- Show how to identify and fix anti-patterns
- Emphasize the business impact of anti-patterns

### Follow-up Questions

1. How do you identify anti-patterns in existing Topics?
2. How do you refactor a Mega-Topic?
3. What is the most common anti-pattern you've seen?
4. How do you prevent anti-patterns during design?