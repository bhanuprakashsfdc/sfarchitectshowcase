## Question 3: How does PII masking work in Agentforce?

### Answer

PII masking in Agentforce is the process of detecting and masking personally identifiable information before data is sent to the LLM. PII masking is a critical component of the Trust Layer that protects customer privacy.

### Architecture Explanation

**PII Detection**

1. **Pattern Matching**
   - Regular expressions detect PII patterns
   - Examples: SSN (###-##-####), credit card (####-####-####-####), phone numbers
   - Fast and efficient for structured PII

2. **Named Entity Recognition (NER)**
   - LLM-based NER detects PII in unstructured text
   - Identifies names, addresses, emails, and other PII
   - More flexible than pattern matching

3. **Contextual Detection**
   - PII is detected based on context
   - Example: A field labeled "SSN" is detected as PII even if the format doesn't match a pattern

**PII Masking Strategies**

1. **Redaction**: PII is replaced with a placeholder
   - Example: "SSN: ***-**-1234"
2. **Tokenization**: PII is replaced with a token
   - Example: "SSN: [TOKEN_123]"
3. **Hashing**: PII is replaced with a hash
   - Example: "SSN: sha256(123-45-6789)"
4. **Removal**: PII is removed entirely
   - Example: "SSN: [removed]"

**PII Masking Configuration**
- Masking rules are defined per agent
- PII types are specified (SSN, credit card, email, etc.)
- Masking strategy is selected (redaction, tokenization, hashing, removal)
- Masking is applied before data reaches the LLM

**PII Masking Lifecycle**
1. User message is received
2. PII is detected using pattern matching and NER
3. PII is masked using the configured strategy
4. Masked data is sent to the LLM
5. LLM response is checked for PII leakage
6. PII in the response is also masked
7. Masked response is delivered to the user

### Real-World Example

A customer sends: "My SSN is 123-45-6789 and I need help with my account."

**PII Detection**:
- Pattern matching detects SSN format: 123-45-6789
- NER detects "123-45-6789" as SSN

**PII Masking** (Redaction strategy):
- "My SSN is ***-**-6789 and I need help with my account."

**LLM Response**: "I can help you with your account. For security, please verify your identity."

**Response Masking**: No PII in the response.

### Common Mistakes

- Not masking PII before sending to the LLM
- Not checking LLM responses for PII leakage
- Using the wrong masking strategy
- Not configuring PII masking rules

### Interview Tips

- Explain PII detection and masking strategies
- Provide a concrete example
- Emphasize the importance of checking LLM responses
- Connect PII masking to the Trust Layer

### Follow-up Questions

1. What PII types should be masked?
2. What is the difference between redaction and tokenization?
3. How do you handle PII in LLM responses?
4. How do you test PII masking?