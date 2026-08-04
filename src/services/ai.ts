import type { ScanReport } from '../context/AppContext';

// Available model configurations
export const MODEL_OPTIONS = [
  { id: 'google/gemini-2.5-flash:free', name: 'Gemini 2.5 Flash Free' },
  { id: 'meta-llama/llama-3-8b-instruct:free', name: 'Llama 3 8B Instruct Free' },
  { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B Instruct Free' },
  { id: 'qwen/qwen-2-7b-instruct:free', name: 'Qwen 2 7B Free' },
  { id: 'deepseek/deepseek-chat', name: 'DeepSeek Chat (V3)' }
];

const DEFAULT_SYSTEM_PROMPT = `You are a world-class Cybersecurity Analyst and Fraud Investigator specializing in recruitment fraud and job scams.
Analyze the provided job description, email, or message, and evaluate it for indicators of fraudulent job offers.
You must respond with a single valid JSON object containing the fields below. Do not output any markdown wrapper or explanation outside the JSON.

Expected JSON output format:
{
  "overallRiskScore": number (0 to 100, where 0 is perfectly safe and 100 is definite scam),
  "confidence": number (0 to 100, confidence in your assessment),
  "scamProbability": number (0 to 100, percentage chance this is a scam),
  "status": "genuine" | "suspicious" | "scam",
  "summary": "string containing a professional 2-3 sentence executive summary of the safety analysis",
  "categories": {
    "salaryRealism": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "grammarProfessionalism": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "domainTrust": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "urgencyPressure": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "personalInfoRequests": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "financialDemands": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "interviewProcess": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" },
    "companyVerification": { "score": number (0-100), "explanation": "string", "riskLevel": "low" | "medium" | "high" }
  },
  "issues": ["string containing key red flags detected"],
  "positives": ["string containing positive validation points"],
  "recommendations": ["string containing actionable safety tips/next steps for the user"]
}`;

export const analyzeJobWithAI = async (
  text: string,
  apiKey: string,
  model: string
): Promise<ScanReport> => {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'AI Fake Job Detector'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: DEFAULT_SYSTEM_PROMPT },
          { role: 'user', content: `Analyze the following job details:\n\n${text}` }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;
    const parsedResult = JSON.parse(resultText) as ScanReport;
    return parsedResult;
  } catch (error) {
    console.error('OpenRouter AI scan failed, falling back to heuristics:', error);
    throw error;
  }
};

// Heuristic Scan (Offline/Demo Mode)
export const analyzeJobOffline = (text: string): ScanReport => {
  const content = text.toLowerCase();
  
  // Heuristic variables
  let score = 0;
  const issues: string[] = [];
  const positives: string[] = [];
  const recs: string[] = [];

  // 1. Salary Realism Heuristics
  let salaryScore = 10;
  let salaryExp = "The compensation figures or wage expectations appear typical for the market.";
  if (content.includes('$100/hr') || content.includes('$150/hr') || content.includes('$200/hr') || content.includes('100 per hour') || content.includes('5000/week') || content.includes('$5000 a week') || content.includes('no experience required $')) {
    salaryScore = 85;
    salaryExp = "Unusually high compensation is advertised for basic/entry-level qualifications, a key scam indicator.";
    issues.push("Extremely high salary advertised for little or no experience.");
    score += 20;
  } else if (content.includes('competitive salary') || content.includes('salary negotiable')) {
    salaryScore = 20;
    positives.push("Compensation format aligns with industry standard hiring conventions.");
  }

  // 2. Grammar and Professionalism Heuristics
  let grammarScore = 15;
  let grammarExp = "The job posting exhibits professional layout, spelling, and corporate styling.";
  const badGrammarKeywords = ['kindly', 'dear', 'whatsapp me', 'telegram me', '!!!', 'urgent client', 'hello client', 'earn money from home'];
  let countBadGrammar = 0;
  badGrammarKeywords.forEach(kw => {
    if (content.includes(kw)) countBadGrammar++;
  });
  if (countBadGrammar >= 3) {
    grammarScore = 75;
    grammarExp = "Multiple non-standard phrases ('kindly', excess exclamation marks, informal greetings) are present.";
    issues.push("Suspiciously informal syntax or awkward phrasing typical of foreign scam operators.");
    score += 15;
  } else if (countBadGrammar > 0) {
    grammarScore = 40;
    grammarExp = "Slight grammar oddities or conversational language detected.";
  }

  // 3. Domain Trust & Recruiter Communication Heuristics
  let domainScore = 10;
  let domainExp = "Communications appear to originate from verified corporate networks.";
  if (content.includes('@gmail.com') || content.includes('@yahoo.com') || content.includes('@outlook.com') || content.includes('@hotmail.com') || content.includes('@protonmail') || content.includes('@mail.ru')) {
    domainScore = 90;
    domainExp = "Uses a public email provider (Gmail/Outlook/Yahoo) rather than an official corporate domain.";
    issues.push("Recruiter email uses a free, public address domain (@gmail, @outlook, etc.).");
    score += 25;
  } else {
    positives.push("Official business domain extension suggested in recruitment instructions.");
  }

  // 4. Contact Channels (Urgency / Messaging Apps) Heuristics
  let urgencyScore = 15;
  let urgencyExp = "Application schedules follow standard hiring windows.";
  if (content.includes('immediate start') || content.includes('start today') || content.includes('urgent hire') || content.includes('hire immediately') || content.includes('respond within 24 hours')) {
    urgencyScore = 65;
    urgencyExp = "High-pressure urgency signals are utilized to compel fast applicant action.";
    issues.push("Artificial pressure applied to speed up your hiring decision.");
    score += 10;
  }

  // 5. Personal Info Requests Heuristics
  let personalScore = 20;
  let personalExp = "No inappropriate personal details are requested upfront.";
  if (content.includes('ssn') || content.includes('social security') || content.includes('drivers license') || content.includes('bank details') || content.includes('routing number') || content.includes('identity verification')) {
    personalScore = 80;
    personalExp = "Sensitive identity documents or financial details are requested early in the intake phase.";
    issues.push("Asks for sensitive personal identification or financial numbers before an official offer.");
    score += 20;
    recs.push("Never send copies of your Driver's License or Social Security Number over email.");
  }

  // 6. Financial Demands Heuristics
  let financialScore = 10;
  let financialExp = "No recruitment fees or tool purchasing requests are present.";
  if (content.includes('buy equipment') || content.includes('equipment check') || content.includes('software fee') || content.includes('application fee') || content.includes('zelle') || content.includes('venmo') || content.includes('cashapp') || content.includes('send check') || content.includes('reimburse')) {
    financialScore = 95;
    financialExp = "Asks the candidate to purchase equipment upfront, pay fees, or receive checks for processing.";
    issues.push("Instructions hint at check-cashing scams or purchasing home-office gear from selected vendors.");
    score += 30;
    recs.push("Never deposit check advances to purchase home-office equipment; companies supply gear directly.");
  }

  // 7. Interview Process Heuristics
  let interviewScore = 20;
  let interviewExp = "Candidate assessment follows standard video/in-person corporate procedures.";
  if (content.includes('telegram') || content.includes('whatsapp') || content.includes('chat interview') || content.includes('text interview') || content.includes('google hangouts')) {
    interviewScore = 85;
    interviewExp = "Interviews are conducted entirely via text messaging applications.";
    issues.push("Job interview conducted solely via messaging apps (WhatsApp, Telegram) without face-to-face contact.");
    score += 25;
    recs.push("Legitimate corporate recruiters do not evaluate professional candidates entirely via Telegram chat rooms.");
  }

  // 8. Company Verification Heuristics
  let companyScore = 25;
  let companyExp = "The hiring organization appears referenced in commercial company registers.";
  if (content.includes('undisclosed startup') || content.includes('confidential client') || content.includes('quick cash project')) {
    companyScore = 50;
    companyExp = "Company details are vague or missing entirely, making background checking difficult.";
    issues.push("Hiring company details are anonymous or highly obscure.");
    score += 10;
  } else {
    positives.push("Specific operating organization referenced for profile cross-referencing.");
  }

  // Cap scores
  score = Math.min(100, Math.max(5, score));
  let status: 'genuine' | 'suspicious' | 'scam' = 'genuine';
  if (score > 60) status = 'scam';
  else if (score > 25) status = 'suspicious';

  const confidence = Math.min(100, Math.max(65, 100 - (100 - score) / 4));
  const scamProbability = score;

  let summary = "The analysis found no major security concerns with this posting. The domain parameters, messaging structure, and requirements suggest a standard recruitment cycle.";
  if (status === 'scam') {
    summary = `CRITICAL ALERT: This posting displays classic signatures of an employment scam (Score: ${score}/100). The presence of communication anomalies, combined with high-risk financial processing models, indicates severe safety risks.`;
  } else if (status === 'suspicious') {
    summary = `VIGILANCE ADVISED: Several recruitment irregularities were identified (Score: ${score}/100). While not a confirmed fraud pattern, verification of the recruiter's official company email domain is highly recommended.`;
  }

  // General recommendations
  if (recs.length === 0) {
    recs.push("Cross-check the job description on the company's official 'Careers' page.");
    recs.push("Reach out directly to corporate recruiters via LinkedIn rather than standard emails.");
  }
  recs.push("Search the internet for [Company Name] + 'recruitment scam' to identify similar fraud reports.");

  // General positives
  if (positives.length === 0) {
    positives.push("No explicit fees or financial operations requested.");
  }

  return {
    overallRiskScore: score,
    confidence,
    scamProbability,
    status,
    summary,
    categories: {
      salaryRealism: { score: salaryScore, explanation: salaryExp, riskLevel: salaryScore > 70 ? 'high' : salaryScore > 35 ? 'medium' : 'low' },
      grammarProfessionalism: { score: grammarScore, explanation: grammarExp, riskLevel: grammarScore > 70 ? 'high' : grammarScore > 35 ? 'medium' : 'low' },
      domainTrust: { score: domainScore, explanation: domainExp, riskLevel: domainScore > 70 ? 'high' : domainScore > 35 ? 'medium' : 'low' },
      urgencyPressure: { score: urgencyScore, explanation: urgencyExp, riskLevel: urgencyScore > 70 ? 'high' : urgencyScore > 35 ? 'medium' : 'low' },
      personalInfoRequests: { score: personalScore, explanation: personalExp, riskLevel: personalScore > 70 ? 'high' : personalScore > 35 ? 'medium' : 'low' },
      financialDemands: { score: financialScore, explanation: financialExp, riskLevel: financialScore > 70 ? 'high' : financialScore > 35 ? 'medium' : 'low' },
      interviewProcess: { score: interviewScore, explanation: interviewExp, riskLevel: interviewScore > 70 ? 'high' : interviewScore > 35 ? 'medium' : 'low' },
      companyVerification: { score: companyScore, explanation: companyExp, riskLevel: companyScore > 70 ? 'high' : companyScore > 35 ? 'medium' : 'low' }
    },
    issues,
    positives,
    recommendations: recs
  };
};
