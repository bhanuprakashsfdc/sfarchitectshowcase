## Question 9: What is hybrid search in RAG?

### Answer

Hybrid search combines multiple retrieval methods (semantic search and keyword search) to achieve better retrieval quality than either method alone. Hybrid search is a best practice in production RAG systems.

### Architecture Explanation

**Hybrid Search Components**

1. **Semantic Search**
   - Uses vector embeddings and cosine similarity
   - Captures meaning and context
   - Example: "return policy" matches "refund policy" semantically

2. **Keyword Search**
   - Uses exact keyword matching (BM25, TF-IDF)
   - Captures specific terms and phrases
   - Example: "return policy" matches documents containing the exact phrase "return policy"

3. **Hybrid Combination**
   - Combines semantic and keyword scores
   - Final score = w1 × semantic_score + w2 × keyword_score
   - Weights can be configured per query or per use case

**Hybrid Search Process**

1. User query is processed
2. Semantic search retrieves top N chunks
3. Keyword search retrieves top M chunks
4. Results are combined and deduplicated
5. Combined results are ranked by hybrid score
6. Top K results are returned

**Hybrid Search Strategies**

1. **Linear Combination**: w1 × semantic + w2 × keyword
2. **Reciprocal Rank Fusion**: Combines ranks from both searches
3. **Maximal Marginal Relevance (MMR)**: Balances relevance and diversity
4. **Semantic Keyword Search**: Uses embeddings for keyword matching

**Hybrid Search Configuration**
- Semantic weight (w1)
- Keyword weight (w2)
- Number of results from each search
- Deduplication strategy
- Final ranking method

### Real-World Example

A customer asks: "How do I return a defective laptop?"

**Semantic Search Results**:
1. "Return Policy" chunk (similarity: 0.95)
2. "Refund Process" chunk (similarity: 0.88)
3. "Warranty Coverage" chunk (similarity: 0.82)

**Keyword Search Results**:
1. "Return Policy" chunk (BM25: 0.92)
2. "Defective Product" chunk (BM25: 0.85)
3. "Warranty Claim" chunk (BM25: 0.78)

**Hybrid Combination** (w1=0.6, w2=0.4):
1. "Return Policy" chunk: 0.6×0.95 + 0.4×0.92 = 0.938
2. "Refund Process" chunk: 0.6×0.88 + 0.4×0.30 = 0.648
3. "Defective Product" chunk: 0.6×0.40 + 0.4×0.85 = 0.580
4. "Warranty Coverage" chunk: 0.6×0.82 + 0.4×0.50 = 0.692

**Final Ranking**: Return Policy, Warranty Coverage, Refund Process, Defective Product

### Common Mistakes

- Using only semantic search
- Not tuning the hybrid weights
- Not deduplicating results
- Not testing hybrid search with diverse queries

### Interview Tips

- Explain the hybrid search process
- Provide a concrete example with scoring
- Emphasize the benefit of combining semantic and keyword search
- Connect hybrid search to the overall RAG architecture

### Follow-up Questions

1. What is Reciprocal Rank Fusion?
2. How do you tune hybrid weights?
3. When is hybrid search better than pure semantic search?
4. What is MMR?