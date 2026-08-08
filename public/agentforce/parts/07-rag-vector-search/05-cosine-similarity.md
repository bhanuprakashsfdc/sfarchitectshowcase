## Question 5: What is cosine similarity in RAG?

### Answer

Cosine similarity is a metric used to measure the similarity between two vectors by calculating the cosine of the angle between them. It is the most commonly used similarity metric in RAG systems for vector search and retrieval.

### Architecture Explanation

**Cosine Similarity Formula**

cos(A, B) = (A · B) / (||A|| × ||B||)

Where:
- A · B is the dot product of vectors A and B
- ||A|| and ||B|| are the magnitudes (norms) of vectors A and B
- Result ranges from -1 (completely opposite) to 1 (identical)

**Cosine Similarity Properties**

1. **Range**: -1 to 1
   - 1: Identical direction (maximum similarity)
   - 0: Orthogonal (no similarity)
   - -1: Opposite direction (maximum dissimilarity)

2. **Scale-Invariant**
   - Not affected by vector magnitude
   - Only considers the direction of the vectors
   - This is why vectors are often normalized to unit length

3. **Efficient Computation**
   - Fast to compute, especially with optimized libraries
   - Suitable for large-scale similarity search

**Cosine Similarity in RAG**

1. **Query Processing**: The user's query is embedded as a vector
2. **Similarity Calculation**: The query vector is compared to all document vectors using cosine similarity
3. **Ranking**: Documents are ranked by cosine similarity score
4. **Retrieval**: The top N documents with the highest similarity scores are retrieved

**Cosine Similarity vs. Other Metrics**

| Metric | Range | Use Case |
|--------|-------|----------|
| Cosine Similarity | -1 to 1 | Semantic similarity (most common in RAG) |
| Euclidean Distance | 0 to ∞ | Spatial distance |
| Dot Product | -∞ to ∞ | Similarity when vectors are normalized |
| Jaccard Similarity | 0 to 1 | Set similarity |

**Cosine Similarity Optimization**

1. **Normalization**: Normalize vectors to unit length for faster computation
2. **Approximate Nearest Neighbor (ANN)**: Use approximate algorithms for faster search
3. **Batch Processing**: Process multiple queries in parallel
4. **Indexing**: Use efficient indexes (HNSW, IVF) for fast retrieval

### Real-World Example

Query vector: [0.23, -0.45, 0.67, 0.12]
Document vector: [0.22, -0.44, 0.66, 0.11]

**Cosine Similarity Calculation**:
- Dot product: (0.23 × 0.22) + (-0.45 × -0.44) + (0.67 × 0.66) + (0.12 × 0.11) = 0.0506 + 0.198 + 0.4422 + 0.0132 = 0.704
- Magnitude of query: √(0.23² + 0.45² + 0.67² + 0.12²) = √(0.0529 + 0.2025 + 0.4489 + 0.0144) = √0.7187 = 0.8478
- Magnitude of document: √(0.22² + 0.44² + 0.66² + 0.11²) = √(0.0484 + 0.1936 + 0.4356 + 0.0121) = √0.6897 = 0.8305
- Cosine similarity: 0.704 / (0.8478 × 0.8305) = 0.704 / 0.7041 = 0.9999

Result: Very high similarity (0.9999), indicating the document is highly relevant to the query.

### Common Mistakes

- Not normalizing vectors before computing cosine similarity
- Using the wrong similarity metric for the use case
- Not optimizing for large-scale similarity search
- Not handling edge cases (zero vectors)

### Interview Tips

- Explain the cosine similarity formula and properties
- Provide a concrete calculation example
- Emphasize scale invariance
- Connect cosine similarity to the overall RAG retrieval process

### Follow-up Questions

1. What is the difference between cosine similarity and Euclidean distance?
2. Why is cosine similarity scale-invariant?
3. How do you optimize cosine similarity for large datasets?
4. What is the cosine similarity threshold for retrieval?