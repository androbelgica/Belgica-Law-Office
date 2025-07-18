**DIY (Draft-It-Yourself) Chatbot Module – User-Facing Documentation**

---

**Overview**
The DIY (Draft-It-Yourself) chatbot is an AI-powered legal drafting assistant integrated into the BelgicaLaw website. It guides users in creating basic legal documents (e.g., affidavits, declarations) through a secure, conversational Q&A interface.

---

**User Flow**

### Step 1: Account Creation & Login
- Users must **sign up or log in** before accessing the chatbot.
- User accounts store drafted documents and chat history for future reference.

### Step 2: Start a New DIY Session
- On the DIY page, users click **“Start Drafting”**.
- A new chat session begins with the AI chatbot.

### Step 3: Guided Question-and-Answer Flow
- The chatbot initiates with: _“What type of document do you need to draft?”_
- Users respond (e.g., _“Affidavit”_ → _“Affidavit of Loss”_).
- The chatbot continues with tailored questions to collect needed data:
  - _“What was lost?”_
  - _“When and where did the loss occur?”_
  - _“Who is the affiant?”_
  - ...until all required legal elements are collected.

### Step 4: Document Draft Generation
- Once enough information is gathered:
  - AI composes the document.
  - A preview is shown in rich text format.
  - User can **edit minor text** or **regenerate**.

### Step 5: Save or Download
- The finalized document can be:
  - Saved to the user’s account
  - Downloaded as a `.docx` or `.pdf` file
  - Sent to the admin for notarial scheduling (optional)

---

**Session History & Reuse**
- All questions/answers are logged in the `ChatSession` model.
- On new sessions, the chatbot **checks prior inputs** and avoids repeating known data.
- Users can resume incomplete sessions.

---

**Limits & Usage Metrics**
- Token consumption is monitored per session.
- Document-specific token averages:
  - Simple affidavit: ~800–1200 tokens
  - Complex legal forms: ~1500–2500 tokens

---

**Security & Legal Disclaimer**
- User input is encrypted and stored securely.
- Drafts are for informational purposes and subject to legal review.
- Generated drafts include a disclaimer: _“This document is AI-generated and should be reviewed by a licensed attorney before use.”_

---

**Support & Feedback**
- Users can report inaccurate outputs.
- A “Request Lawyer Review” option is available post-draft.

---

**End of Document**