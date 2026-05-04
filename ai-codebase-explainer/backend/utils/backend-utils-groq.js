const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Generate project summary and analysis
const analyzeRepository = async (repoName, fileTree, keyFilesContent, metadata) => {
  const fileStructureStr = JSON.stringify(fileTree, null, 2).substring(0, 3000);
  const keyFilesStr = Object.entries(keyFilesContent)
    .map(([path, content]) => `\n--- ${path} ---\n${content.substring(0, 800)}`)
    .join('\n')
    .substring(0, 5000);

  const prompt = `
You are an expert software architect and code analyst. Analyze this GitHub repository and provide a comprehensive explanation.

Repository: ${repoName}
Description: ${metadata.description || 'No description'}
Primary Language: ${metadata.language || 'Unknown'}
Stars: ${metadata.stargazers_count || 0}

File Structure:
${fileStructureStr}

Key Files Content:
${keyFilesStr}

Provide a JSON response with EXACTLY this structure (no markdown, raw JSON only):
{
  "summary": "2-3 sentence overview of what this project does",
  "detailedExplanation": "Detailed explanation of the architecture, how different parts interact, and the overall design pattern (4-6 paragraphs)",
  "technologies": ["list", "of", "technologies", "frameworks", "languages", "detected"],
  "dependencies": ["list", "of", "key", "dependencies"],
  "setupSteps": ["Step 1: ...", "Step 2: ...", "Step 3: ..."]
}
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile', // Fast and free
    temperature: 0.3,
    max_tokens: 2048,
  });

  const text = completion.choices[0]?.message?.content || '';
  const cleaned = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    return {
      summary: text.substring(0, 300),
      detailedExplanation: text,
      technologies: [metadata.language || 'Unknown'],
      dependencies: [],
      setupSteps: ['Clone the repository', 'Install dependencies', 'Run the project'],
    };
  }
};

// Explain a specific code file
const explainCode = async (filePath, code, repoName) => {
  const prompt = `
You are an expert developer. Explain this code file from the repository "${repoName}".

File: ${filePath}
\`\`\`
${code.substring(0, 6000)}
\`\`\`

Provide:
1. **Purpose**: What this file does
2. **Key Functions/Classes**: Explain each major function or class
3. **Logic Flow**: How the code executes step by step
4. **Dependencies**: What it imports and why
5. **Notable Patterns**: Any design patterns or important techniques used

Be clear, technical but accessible. Format with markdown.
`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.3,
    max_tokens: 2048,
  });

  return completion.choices[0]?.message?.content || 'No explanation generated.';
};

// Chat with AI about the repository
const chatWithAI = async (messages, repoContext) => {
  const systemContext = `You are an expert code assistant helping a developer understand the repository: ${repoContext.repoName}.

Repository Summary: ${repoContext.summary}
Technologies: ${(repoContext.technologies || []).join(', ')}

Answer questions about this codebase accurately and helpfully. Be concise but thorough.`;

  const chatMessages = [
    { role: 'system', content: systemContext },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const completion = await groq.chat.completions.create({
    messages: chatMessages,
    model: 'llama-3.3-70b-versatile',
    temperature: 0.5,
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content || 'No response generated.';
};

module.exports = { analyzeRepository, explainCode, chatWithAI };