## Question 9: How do you design Topics for large enterprises?

### Answer

Designing Topics for large enterprises requires careful planning, scalability considerations, and governance. Large enterprise deployments typically involve dozens or hundreds of Topics, making design and management a significant architectural challenge.

### Architecture Explanation

**Enterprise Topic Design Principles**

1. **Domain Decomposition**
   - Break the enterprise domain into logical sub-domains
   - Each sub-domain becomes a parent Topic with child Topics
   - Example: Customer Service → Order Management, Returns, Billing, Technical Support

2. **Topic Modularity**
   - Topics should be modular and self-contained
   - Each Topic should have clear boundaries and responsibilities
   - Topics should be reusable across different agents

3. **Topic Standardization**
   - Define naming conventions for Topics
   - Use consistent description formats
   - Standardize instruction templates
   - Example: All Topics follow the pattern "[Domain] - [Function]"

4. **Topic Versioning**
   - Version Topics to track changes over time
   - Use version control for Topic configurations
   - Support rollback to previous versions
   - Example: "Order Management v2.1"

5. **Topic Governance**
   - Establish a Topic governance process
   - Define who can create, modify, and delete Topics
   - Review Topics regularly for accuracy and relevance
   - Track Topic usage and performance metrics

**Enterprise Topic Hierarchy**

```
Enterprise Agent
├── Customer Service
│   ├── Order Management
│   │   ├── Order Status
│   │   ├── Order Modification
│   │   └── Order Cancellation
│   ├── Returns
│   │   ├── Return Initiation
│   │   ├── Return Status
│   │   └── Return Policy
│   └── Billing
│       ├── Payment Inquiry
│       ├── Billing Dispute
│       └── Invoice Request
├── Sales
│   ├── Lead Qualification
│   ├── Product Inquiry
│   └── Quote Generation
└── Technical Support
    ├── Troubleshooting
    ├── Product Information
    └── Escalation
```

**Topic Design for Scale**

1. **Topic Templates**
   - Create reusable Topic templates for common patterns
   - Templates ensure consistency across Topics
   - Templates reduce configuration time

2. **Topic Libraries**
   - Maintain a library of pre-built Topics
   - Topics can be imported and customized for different use cases
   - Libraries accelerate deployment

3. **Topic Testing**
   - Test each Topic independently
   - Test Topic interactions in integration scenarios
   - Use automated testing for Topic validation

4. **Topic Monitoring**
   - Monitor Topic usage and performance
   - Identify underutilized Topics
   - Identify Topics with high failure rates
   - Optimize Topic configurations based on data

**Topic Design for Multi-Language Support**

- Topics should support multiple languages
- Topic descriptions and instructions should be localized
- Intent matching should work across languages
- Example: "Order Status" Topic supports English, Spanish, French, German

### Real-World Example

A global bank with 50+ countries deploys an Agentforce agent:

**Domain Decomposition**:
- Customer Service (parent) → Account Management, Transactions, Loans, Cards
- Sales (parent) → Product Inquiry, Account Opening, Loan Application
- Compliance (parent) → Regulatory Inquiry, KYC, Fraud Reporting

**Topic Standardization**:
- All Topics follow the "[Domain] - [Function]" naming convention
- All Topic descriptions include Scope, Keywords, Examples, and Exclusions
- All Topics use standardized instruction templates

**Topic Governance**:
- A Topic governance board reviews all Topic changes
- Topics are versioned and tracked in Git
- Monthly Topic performance reviews identify optimization opportunities

**Result**: 200+ Topics deployed across 12 languages with consistent behavior and high accuracy.

### Common Mistakes

- Not decomposing the enterprise domain properly
- Creating Topics that are too granular or too broad
- Not standardizing Topic design
- Not establishing Topic governance
- Not planning for multi-language support

### Interview Tips

- Explain enterprise topic design principles
- Provide a concrete example of a topic hierarchy
- Emphasize governance and standardization
- Mention scalability considerations

### Follow-up Questions

1. How do you manage 100+ Topics?
2. How do you ensure consistency across Topics?
3. How do you handle multi-language Topics?
4. What is the role of Topic governance?