## Question 6: What is Knowledge grounding?

### Answer

Knowledge grounding is the process of injecting Salesforce Knowledge articles into the Agentforce prompt to provide the LLM with authoritative, up-to-date information. Knowledge grounding enables the agent to answer questions based on the organization's knowledge base.

### Architecture Explanation

**Knowledge Grounding Components**

1. **Article Retrieval**
   - Retrieve Knowledge articles based on the user's query
   - Articles are searched using keyword matching or semantic search
   - Example: Search Knowledge for "return policy" articles

2. **Article Filtering**
   - Filter articles by relevance, recency, and authority
   - Only the most relevant articles are included
   - Example: Filter to articles published in the last 6 months

3. **Article Formatting**
   - Format articles for prompt injection
   - Articles are formatted as structured text
   - Example: "Article Title: Return Policy. Content: Returns accepted within 30 days..."

4. **Article Versioning**
   - Track article versions for accuracy
   - Ensure the latest version is used
   - Example: Use Knowledge article v2.1, not v1.0

5. **Article Access Control**
   - Respect article visibility and access rules
   - Only include articles the user has access to
   - Example: Internal articles are not included for external users

**Knowledge Grounding Sources**

1. **Salesforce Knowledge**: Standard Knowledge articles
2. **Custom Knowledge**: Custom knowledge bases
3. **External Knowledge**: External knowledge sources (via APIs)

**Knowledge Grounding Configuration**
- Article sources are configured per agent or per Topic
- Search criteria are defined
- Filtering rules are specified
- Access control is enforced

### Real-World Example

A customer asks: "What is your return policy?"

**Knowledge Grounding**:
1. Search Knowledge for "return policy" articles
2. Retrieve the top 3 most relevant articles
3. Filter to published articles from the last year
4. Format articles for prompt injection

**Rendered Prompt**:
"Customer is asking about the return policy. Knowledge Articles: 1. 'Return Policy' - Returns accepted within 30 days of delivery. 2. 'Return Process' - How to initiate a return. 3. 'Return Exceptions' - Items that cannot be returned."

### Common Mistakes

- Not filtering articles for relevance
- Not respecting article access control
- Not versioning articles
- Including too many articles (wasting tokens)

### Interview Tips

- Explain Knowledge grounding components
- Provide a concrete example
- Emphasize article filtering and access control
- Connect Knowledge grounding to the overall Agentforce architecture

### Follow-up Questions

1. How do you search Knowledge articles?
2. How do you handle article access control?
3. What is the difference between Knowledge grounding and RAG?
4. How do you version Knowledge articles?