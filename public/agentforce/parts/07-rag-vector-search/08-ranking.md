## Question 8: What is ranking in RAG?

### Answer

Ranking in RAG is the process of ordering retrieved documents or chunks by relevance to the user's query. Ranking ensures that the most relevant information is presented to the LLM for response generation.

### Architecture Explanation

**Ranking Components**

1. **Initial Retrieval**
   - The first pass of retrieval using semantic search
   - Returns the top N candidates based on cosine similarity
   - Example: Retrieve top 20 chunks

2. **Re-Ranking**
   - A second pass of ranking using a more sophisticated model
   - Re-ranking models are typically cross-encoders that compare the query and each document together
   - More accurate than initial retrieval but slower
   - Example: Re-rank the top 20 chunks to get the top 5

3. **Final Ranking**
   - The final ordered list of chunks
   - Used as context for the LLM
   - Example: Top 5 chunks are injected into the prompt

**Ranking Models**

1. **Bi-Encoders**
   - Encode the query and document separately
   - Fast but less accurate
   - Used for initial retrieval
   - Example: Sentence-BERT

2. **Cross-Encoders**
   - Encode the query and document together
   - Slower but more accurate
   - Used for re-ranking
   - Example: BERT-based cross-encoder

3. **Hybrid Models**
   - Combine bi-encoder and cross-encoder approaches
   - Fast initial retrieval with accurate re-ranking
   - Example: Initial retrieval with bi-encoder, re-rank with cross-encoder

**Ranking Strategies**

1. **Similarity-Based Ranking**: Rank by cosine similarity score
2. **Recency-Based Ranking**: Rank by document freshness
3. **Popularity-Based Ranking**: Rank by document popularity or usage
4. **Authority-Based Ranking**: Rank by document authority or source quality
5. **Hybrid Ranking**: Combine multiple ranking signals

**Ranking Configuration**
- Number of chunks to retrieve (top K)
- Re-ranking model selection
- Ranking signal weights
- Metadata filters

### Real-World Example

A customer asks: "What is the warranty for Product X?"

**Initial Retrieval** (Bi-encoder):
1. Chunk A: "Product X warranty: 2 years" (similarity: 0.95)
2. Chunk B: "Product X features and specifications" (similarity: 0.72)
3. Chunk C: "Product X return policy" (similarity: 0.68)
4. Chunk D: "Product X pricing" (similarity: 0.45)

**Re-Ranking** (Cross-encoder):
1. Chunk A: "Product X warranty: 2 years" (score: 0.98)
2. Chunk C: "Product X return policy" (score: 0.75)
3. Chunk B: "Product X features and specifications" (score: 0.60)
4. Chunk D: "Product X pricing" (score: 0.30)

**Final Ranking**: Top 2 chunks (A and C) are injected into the prompt.

### Common Mistakes

- Not re-ranking retrieved chunks
- Not using the right ranking model
- Not configuring the right number of chunks
- Not filtering by metadata before ranking

### Interview Tips

- Explain the ranking process and components
- Provide a concrete example
- Emphasize the difference between bi-encoders and cross-encoders
- Connect ranking to the overall RAG pipeline

### Follow-up Questions

1. What is re-ranking?
2. What is the difference between bi-encoders and cross-encoders?
3. How do you configure ranking?
4. What is hybrid ranking?