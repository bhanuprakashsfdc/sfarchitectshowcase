## Question 4: What are vector databases in RAG?

### Answer

Vector databases are specialized databases designed to store, index, and query vector embeddings efficiently. They are the backbone of RAG systems, enabling fast and accurate similarity search.

### Architecture Explanation

**Vector Database Components**

1. **Vector Storage**
   - Stores vector embeddings along with metadata
   - Each vector is associated with a document ID and metadata
   - Example: Vector [0.12, -0.34, 0.56, ...] → Document ID "doc-123", Metadata: {title: "Return Policy", source: "Knowledge"}

2. **Indexing**
   - Creates efficient indexes for fast similarity search
   - Common indexing algorithms: HNSW (Hierarchical Navigable Small World), IVF (Inverted File Index), PQ (Product Quantization)
   - HNSW: Graph-based index for approximate nearest neighbor search
   - IVF: Clusters vectors into partitions for faster search
   - PQ: Compresses vectors for storage efficiency

3. **Query Processing**
   - Receives query vectors
   - Performs similarity search against stored vectors
   - Returns the most similar vectors
   - Supports filtering by metadata

4. **Metadata Filtering**
   - Filters vectors based on metadata before similarity search
   - Example: Only search vectors where source = "Knowledge" and category = "Returns"
   - Enables precise retrieval

**Vector Database Options**

1. **Pinecone**: Managed vector database, easy to use
2. **Weaviate**: Open-source vector database with hybrid search
3. **Milvus**: Open-source vector database, highly scalable
4. **Qdrant**: Open-source vector database, Rust-based
5. **pgvector**: PostgreSQL extension for vector similarity search
6. **Salesforce Data Cloud Vector Search**: Built-in vector search in Data Cloud

**Vector Database Operations**

1. **Upsert**: Add or update vectors
2. **Search**: Find similar vectors
3. **Delete**: Remove vectors
4. **Filter**: Filter vectors by metadata
5. **Batch Operations**: Process multiple vectors at once

**Vector Database Configuration**
- Dimension: Must match the embedding model's output dimension
- Index type: HNSW, IVF, or PQ
- Distance metric: Cosine, Euclidean, or Dot Product
- Metadata schema: Defines the metadata fields

### Real-World Example

A company uses Pinecone as their vector database for RAG:

**Configuration**:
- Dimension: 1536 (OpenAI text-embedding-ada-002)
- Index type: HNSW
- Distance metric: Cosine similarity
- Metadata schema: {title, source, category, last_updated}

**Operations**:
1. **Upsert**: 10,000 knowledge article chunks are embedded and upserted
2. **Search**: Customer query "How to return a product?" is embedded and searched
3. **Filter**: Only search chunks where category = "Returns"
4. **Results**: Top 5 most similar chunks are returned

### Common Mistakes

- Not matching the vector dimension to the embedding model
- Not choosing the right index type
- Not filtering by metadata
- Not updating vectors when the knowledge base changes

### Interview Tips

- Explain vector database components and operations
- Provide a concrete example with a specific vector database
- Emphasize metadata filtering
- Connect vector databases to the overall RAG architecture

### Follow-up Questions

1. How do you choose a vector database?
2. What is HNSW indexing?
3. How do you handle metadata filtering?
4. How do you update vectors when data changes?