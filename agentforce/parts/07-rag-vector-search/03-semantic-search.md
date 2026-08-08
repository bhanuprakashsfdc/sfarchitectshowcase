## Question 3: What is semantic search in RAG?

### Answer

Semantic search is a retrieval technique that uses vector embeddings to find the most relevant documents or data chunks based on meaning rather than exact keyword matching. Semantic search is a core component of RAG systems.

### Architecture Explanation

**Semantic Search vs. Keyword Search**

1. **Keyword Search**
   - Matches exact words or phrases
   - Uses techniques like BM25 or TF-IDF
   - Example: Searching for "return policy" matches documents containing "return" and "policy"
   - Limitation: Doesn't understand meaning or synonyms

2. **Semantic Search**
   - Matches based on meaning and context
   - Uses vector embeddings and cosine similarity
   - Example: Searching for "return policy" also matches documents about "refund policy" or "exchange policy"
   - Advantage: Understands synonyms and related concepts

**Semantic Search Process**

1. **Query Embedding**: The user's query is converted to a vector embedding
2. **Similarity Calculation**: The query vector is compared to all document vectors
3. **Ranking**: Documents are ranked by similarity score
4. **Retrieval**: The top N most similar documents are retrieved
5. **Re-ranking**: The retrieved documents are re-ranked for relevance

**Similarity Metrics**

1. **Cosine Similarity**: Measures the angle between two vectors
   - Range: -1 to 1
   - Higher values indicate greater similarity
   - Most commonly used in RAG

2. **Dot Product**: Measures the magnitude and direction of vectors
   - Faster than cosine similarity
   - Used when vectors are normalized

3. **Euclidean Distance**: Measures the straight-line distance between vectors
   - Lower values indicate greater similarity
   - Less commonly used in RAG

**Semantic Search Optimization**

1. **Chunking Strategy**: Split documents into optimal-sized chunks
2. **Embedding Model Selection**: Choose the right model for the domain
3. **Index Optimization**: Use efficient vector indexes (HNSW, IVF)
4. **Hybrid Search**: Combine semantic and keyword search for best results

### Real-World Example

A customer asks: "How do I get a refund for a defective product?"

**Keyword Search**:
- Matches documents containing "refund" and "defective"
- May miss documents about "return" or "exchange"

**Semantic Search**:
- Query is embedded: "How do I get a refund for a defective product?"
- Vector: [0.23, -0.45, 0.67, ...]
- Cosine similarity with "Return Policy" chunk: 0.92
- Cosine similarity with "Refund Process" chunk: 0.88
- Cosine similarity with "Product Exchange" chunk: 0.85
- Cosine similarity with "Shipping Policy" chunk: 0.30
- Top 3 chunks are retrieved: Return Policy, Refund Process, Product Exchange

### Common Mistakes

- Using keyword search instead of semantic search
- Not choosing the right embedding model
- Not optimizing chunk size
- Not using hybrid search

### Interview Tips

- Explain semantic search vs. keyword search
- Provide a concrete example
- Emphasize cosine similarity as the primary metric
- Connect semantic search to the overall RAG architecture

### Follow-up Questions

1. What is the difference between semantic search and keyword search?
2. How do you choose a similarity metric?
3. What is hybrid search?
4. How do you optimize semantic search?