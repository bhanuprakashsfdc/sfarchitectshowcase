## Question 6: What is chunking in RAG?

### Answer

Chunking is the process of splitting large documents into smaller, manageable pieces (chunks) before embedding and storing them in a vector database. Chunking is a critical step in the RAG pipeline that directly impacts retrieval quality.

### Architecture Explanation

**Chunking Strategies**

1. **Fixed-Size Chunking**
   - Splits documents into chunks of a fixed size (e.g., 500 tokens)
   - Simple and predictable
   - May split sentences or paragraphs in the middle
   - Example: Split a 5000-token document into 10 chunks of 500 tokens each

2. **Sentence-Based Chunking**
   - Splits documents at sentence boundaries
   - Preserves sentence完整性
   - May result in uneven chunk sizes
   - Example: Split a document into chunks where each chunk contains 3-5 sentences

3. **Paragraph-Based Chunking**
   - Splits documents at paragraph boundaries
   - Preserves paragraph context
   - May result in large chunks
   - Example: Split a document into chunks where each chunk is one paragraph

4. **Semantic Chunking**
   - Splits documents based on semantic boundaries
   - Uses the LLM to identify topic changes
   - Produces the most meaningful chunks
   - Example: Split a document when the topic changes from "returns" to "shipping"

5. **Overlap Chunking**
   - Splits documents with overlapping regions between chunks
   - Prevents loss of context at chunk boundaries
   - Example: Each chunk overlaps with the previous chunk by 50 tokens

**Chunk Size Considerations**

1. **Too Small**: Loss of context, incomplete information
2. **Too Large**: Wasted tokens, reduced retrieval precision
3. **Optimal**: Depends on the use case and embedding model
   - Typical range: 256-1024 tokens
   - Balance between context preservation and retrieval precision

**Chunking Best Practices**

1. Preserve sentence and paragraph boundaries
2. Use overlap to prevent boundary context loss
3. Include metadata with each chunk (source, section, page number)
4. Test different chunk sizes and strategies
5. Consider the embedding model's context window

**Chunking Configuration**
- Chunk size: Number of tokens per chunk
- Overlap: Number of overlapping tokens between chunks
- Strategy: Fixed-size, sentence-based, paragraph-based, semantic
- Metadata: Fields to include with each chunk

### Real-World Example

A 2000-token knowledge article about return policy is chunked:

**Strategy**: Sentence-based with overlap
- Chunk 1 (tokens 1-500): "Our return policy allows returns within 30 days..." (overlap: 50 tokens)
- Chunk 2 (tokens 451-950): "...items must be in original condition..." (overlap: 50 tokens)
- Chunk 3 (tokens 901-1400): "...refunds are processed within 5 business days..." (overlap: 50 tokens)
- Chunk 4 (tokens 1351-2000): "...contact support for assistance..." (overlap: 50 tokens)

**Metadata**: {source: "Return Policy", section: "Policy Details", last_updated: "2026-01-01"}

### Common Mistakes

- Using fixed-size chunking without overlap
- Chunking too small (loss of context)
- Chunking too large (wasted tokens)
- Not including metadata with chunks
- Not testing different chunking strategies

### Interview Tips

- Explain the different chunking strategies
- Provide a concrete example
- Emphasize the trade-off between chunk size and retrieval quality
- Connect chunking to the overall RAG pipeline

### Follow-up Questions

1. What is the optimal chunk size?
2. What is overlap chunking?
3. How do you choose a chunking strategy?
4. How does chunking affect retrieval quality?