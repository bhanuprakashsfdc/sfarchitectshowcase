## Question 7: How do you create sales email prompts?

### Answer

Sales email prompts are specialized Prompt Templates designed for generating sales-related email content. They are optimized for sales communication, personalization, and conversion.

### Architecture Explanation

**Sales Email Prompt Components**

1. **Sender Profile**
   - Defines the sender's identity and role
   - Includes name, title, company, and contact information
   - Example: "You are Jane Smith, Senior Sales Representative at Acme Corp."

2. **Recipient Profile**
   - Defines the recipient's identity and context
   - Includes name, company, industry, and relationship history
   - Example: "The recipient is John Doe, VP of Operations at Beta Inc."

3. **Email Purpose**
   - Defines the goal of the email
   - Options: outreach, follow-up, proposal, renewal, upsell, cross-sell
   - Example: "Purpose: Follow up on the product demo"

4. **Product/Service Context**
   - Information about the product or service being promoted
   - Includes features, benefits, pricing, and differentiators
   - Example: "Product: Salesforce Platform. Key benefit: 30% efficiency improvement."

5. **Personalization Data**
   - Data specific to the recipient for personalization
   - Includes industry, pain points, previous interactions
   - Example: "Recipient's industry: Healthcare. Pain point: Manual data entry."

6. **Tone and Style**
   - Defines the email's tone and style
   - Options: professional, friendly, formal, casual
   - Example: "Tone: Professional and concise."

7. **Call to Action**
   - Defines the desired action from the recipient
   - Example: "Invite the recipient to schedule a 30-minute call."

8. **Constraints**
   - Defines constraints on the email content
   - Example: "Do not include pricing in the first email. Keep the email under 200 words."

**Sales Email Prompt Template**

```
System: You are {{SenderName}}, {{SenderTitle}} at {{SenderCompany}}.

Context: You are reaching out to {{RecipientName}}, {{RecipientTitle}} at {{RecipientCompany}} in the {{RecipientIndustry}} industry.

Purpose: {{EmailPurpose}}.

Product: {{Product.Name}}. Key benefit: {{Product.KeyBenefit}}.

Personalization: {{Recipient.PainPoint}}. Previous interaction: {{PreviousInteraction}}.

Tone: {{Tone}}.

Call to Action: {{CallToAction}}.

Constraints: {{Constraints}}.

Generate a personalized sales email that:
1. Opens with a relevant hook based on the recipient's industry and pain point
2. Introduces the product and its key benefit
3. Includes a clear call to action
4. Stays within the specified constraints

Email:
```

### Real-World Example

**Sender**: Jane Smith, Senior Sales Rep, Acme Corp
**Recipient**: John Doe, VP of Operations, Beta Inc (Healthcare)
**Purpose**: Follow up on product demo
**Product**: Salesforce Platform — 30% efficiency improvement
**Pain Point**: Manual data entry in patient records
**Previous Interaction**: Demo on March 1, 2026
**Tone**: Professional and concise
**CTA**: Schedule a 30-minute call
**Constraints**: Under 200 words, no pricing

**Generated Email**:
"Hi John,

Following up on our demo last week, I wanted to share how Acme Corp's healthcare clients reduced manual data entry by 30% using Salesforce Platform. Given Beta Inc's focus on patient record efficiency, I believe this could deliver similar results for your team.

Would you be available for a 30-minute call this week to discuss how we can tailor the solution to your needs?

Best regards,
Jane Smith"

### Common Mistakes

- Not personalizing the email with recipient-specific data
- Not defining constraints (length, tone, CTA)
- Including too much product information
- Not testing with diverse recipient profiles
- Ignoring the recipient's industry and pain points

### Interview Tips

- Explain the components of a sales email prompt
- Provide a concrete example of a generated email
- Emphasize personalization and constraints
- Connect sales email prompts to the overall Agentforce architecture

### Follow-up Questions

1. How do you measure the effectiveness of sales email prompts?
2. How do you A/B test sales email prompts?
3. What is the difference between a sales email prompt and a general response prompt?
4. How do you handle email personalization at scale?