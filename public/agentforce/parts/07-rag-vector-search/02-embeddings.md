## Question 2: What are embeddings in RAG?

### Answer

Embeddings are numerical representations of text that capture semantic meaning. In RAG, embeddings are used to convert text into vectors that can be compared for similarity, enabling semantic search and retrieval.

### Architecture Explanation

**Embedding Concepts**

1. **Vector Representation**
   - Text is converted into a numerical vector (array of numbers)
   - The vector captures the semantic meaning of the text
   - Similar texts have similar vectors
   - Example: "Dog" and "Puppy" have similar vectors

2. **Embedding Models**
   - Models that generate embeddings from text
   - Examples: OpenAI text-embedding-ada-002, Salesforce Einstein Embeddings, Cohere embeddings
   - Models are trained on large corpora to capture semantic relationships

3. **Vector Dimensions**
   - Embeddings are typically 1536, 768, or 384 dimensions
   - Higher dimensions capture more nuance
   - Higher dimensions require more storage and computation

4. **Normalization**
   - Embeddings are normalized to unit length
   - Normalization ensures that vector magnitude doesn't affect similarity
   - Cosine similarity is used on normalized vectors

**Embedding Workflow**

1. Text is split into chunks
2. Each chunk is passed through the embedding model
3. The embedding model generates a vector for each chunk
4. Vectors are stored in a vector database
5. At query time, the query is embedded using the same model
6. The query vector is compared to stored vectors
7. The most similar vectors are retrieved

**Embedding Types**

1. **Dense Embeddings**: Captures semantic meaning (used in RAG)
2. **Sparse Embeddings**: Captures keyword matching (used in hybrid search)
3. **Cross-Encodings**: Compares query and document together (used for re-ranking)

### Real-World Example

A knowledge base has the following chunks:

- Chunk 1: "Our return policy allows returns within 30 days of delivery."
- Chunk 2: "Our shipping policy offers free shipping on orders over $50."
- Chunk 3: "Our warranty covers manufacturing defects for 2 years."

**Embedding Process**:
1. Each chunk is embedded using OpenAI text-embedding-ada-002
2. Chunk 1 → vector [0.12, -0.34, 0.56, ...] (1536 dimensions)
3. Chunk 2 → vector [0.23, -0.12, 0.78, ...] (1536 dimensions)
4. Chunk 3 → vector [-0.45, 0.67, -0.23, ...] (1536 dimensions)
5. Vectors are stored in a vector database

**Query**: "Can I return a product?"
- Query is embedded → vector [0.11, -0.33, 0.55, ...]
- Cosine similarity with Chunk 1: 0.95 (highest)
- Cosine similarity with Chunk 2: 0.30
- Cosine similarity with Chunk 3: 0.10
- Chunk 1 is retrieved as the most relevant

### Common Mistakes

- Using the wrong embedding model for the domain
- Not normalizing vectors
- Not chunking text appropriately
- Not updating embeddings when the knowledge base changes

### Interview Tips

- Explain embedding concepts and workflow
- Provide a concrete example
- Emphasize the relationship between embeddings and semantic search
- Connect embeddings to the overall RAG architecture

### Follow-up Questions

1. How do you choose an embedding model?
2. What is the difference between dense and sparse embeddings?
3. How do you handle out-of-vocabulary words?
4. How do you update embeddings when the knowledge base changes?