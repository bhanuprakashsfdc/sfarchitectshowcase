## Question 7: What is prompt sanitization in Agentforce?

### Answer

Prompt sanitization is the process of cleaning and normalizing user input before it is used in the prompt. Prompt sanitization prevents malicious input from affecting the LLM's behavior and ensures that prompts are safe and effective.

### Architecture Explanation

**Prompt Sanitization Process**

1. **Input Reception**
   - User message is received
   - Raw input is captured

2. **Pattern Detection**
   - Suspicious patterns are detected
   - Examples: SQL injection patterns, script tags, encoded payloads
   - Regular expressions and ML models are used for detection

3. **Normalization**
   - Input is normalized to a safe format
   - Special characters are escaped
   - Encoding is decoded and checked
   - Example: HTML entities are decoded, script tags are removed

4. **Validation**
   - Input is validated against expected patterns
   - Input that doesn't match expected patterns is rejected
   - Example: A phone number field only accepts numeric input

5. **Sanitization**
   - Malicious content is removed or neutralized
   - Input is cleaned for safe inclusion in the prompt
   - Example: "Ignore previous instructions" is removed from the input

6. **Prompt Construction**
   - Sanitized input is included in the prompt
   - The prompt is constructed safely
   - Example: User input is included in a controlled context

**Sanitization Techniques**

1. **Escaping**: Special characters are escaped
2. **Truncation**: Input is truncated to a safe length
3. **Filtering**: Suspicious content is filtered out
4. **Encoding**: Input is encoded to prevent interpretation
5. **Validation**: Input is validated against allowlists

**Sanitization Configuration**
- Sanitization rules are configured per agent
- Pattern definitions are specified
- Action on detection (block, sanitize, log) is configured
- Sanitization level is set (strict, moderate, lenient)

### Real-World Example

A customer sends: "<script>alert('hack')</script> What is my order status?"

**Sanitization Process**:
1. **Pattern Detection**: Script tag is detected
2. **Normalization**: HTML entities are decoded
3. **Filtering**: Script tag is removed
4. **Validation**: Remaining input is validated
5. **Sanitization**: Clean input: "What is my order status?"
6. **Prompt Construction**: Sanitized input is included in the prompt

**Result**: The agent responds normally with order status, ignoring the malicious script.

### Common Mistakes

- Not sanitizing user input
- Not updating sanitization rules for new attack patterns
- Not configuring the right sanitization level
- Not logging sanitization events

### Interview Tips

- Explain the sanitization process and techniques
- Provide a concrete example
- Emphasize the importance of configuration
- Connect sanitization to the Trust Layer

### Follow-up Questions

1. What are the sanitization techniques?
2. How do you configure sanitization rules?
3. What happens when input is rejected?
4. How do you test sanitization?