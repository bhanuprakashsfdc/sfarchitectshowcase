# Part 7 — RAG & Vector Search

---

## Question 1: What is Retrieval-Augmented Generation (RAG)?

### Answer

Retrieval-Augmented Generation (RAG) is a technique that enhances LLM responses by retrieving relevant external data and injecting it into the prompt before generating a response. RAG is the primary mechanism for grounding Agentforce agents in real, authoritative data.

### Architecture Explanation

**RAG Components**

1. **Retriever**
   - Retrieves relevant documents or data from a knowledge base
   - Uses semantic search, keyword search, or hybrid search
   - Returns the most relevant chunks of data

2. **Reader**
   - Processes the retrieved data
   - Extracts relevant information
   - Formats the data for injection into the prompt

3. **Generator**
   - The LLM that generates the final response
   - Receives the retrieved data as context
   - Generates a response based on the retrieved data

**RAG Workflow**

1. User sends a query
2. The Retriever searches the knowledge base for relevant documents
3. The Retriever returns the top N relevant chunks
4. The Reader processes the chunks and extracts relevant information
5. The Reader formats the information for prompt injection
6. The Generator receives the prompt with the retrieved context
7. The Generator produces a response based on the retrieved context
8. The response is delivered to the user

**RAG Benefits**

1. **Reduced Hallucination**: The LLM has access to real data
2. **Up-to-Date Information**: The knowledge base can be updated in real time
3. **Source Attribution**: The LLM can cite its sources
4. **Domain-Specific Knowledge**: The LLM can access domain-specific information not in its training data
5. **Cost Efficiency**: No need to fine-tune the LLM for domain-specific knowledge

### Real-World Example

A customer asks: "What is the warranty period for Product X?"

**RAG Workflow**:
1. **Retriever**: Searches the knowledge base for "Product X warranty"
2. **Retriever**: Returns 3 relevant chunks from the warranty documentation
3. **Reader**: Extracts the warranty period: "2 years from purchase date"
4. **Reader**: Formats the information: "Product X warranty: 2 years from purchase date. Extended warranty available for purchase."
5. **Generator**: Receives the prompt with the warranty information
6. **Generator**: Generates: "The warranty period for Product X is 2 years from the purchase date. Extended warranty is also available for purchase."

### Common Mistakes

- Not using RAG for domain-specific knowledge
- Not updating the knowledge base regularly
- Not optimizing the retrieval process
- Not handling retrieval failures

### Interview Tips

- Explain the RAG workflow and components
- Provide a concrete example
- Emphasize the benefits of RAG
- Connect RAG to the overall Agentforce architecture

### Follow-up Questions

1. How does RAG differ from fine-tuning?
2. What are the retrieval strategies?
3. How do you handle retrieval failures?
4. How do you measure RAG effectiveness?