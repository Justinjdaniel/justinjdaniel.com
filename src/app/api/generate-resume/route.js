import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { createResumeDocx } from "@/lib/docx-builder";

export async function POST(req) {
  // 1. Passcode Check
  const authHeader = req.headers.get("x-admin-secret");
  if (!authHeader || authHeader !== process.env.MY_APP_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized: Invalid access passcode." },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();
    const { jobDescription, options = {} } = body;

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 },
      );
    }

    const systemPrompt = process.env.SYSTEM_PROMPT;
    const masterProfile = process.env.MASTER_PROFILE_JSON;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!systemPrompt || !masterProfile || !apiKey) {
      return NextResponse.json(
        {
          error:
            "Server configuration error: missing env variables (SYSTEM_PROMPT, MASTER_PROFILE_JSON, or GEMINI_API_KEY).",
        },
        { status: 500 },
      );
    }

    // Initialize GoogleGenAI with the live environment key
    const ai = new GoogleGenAI({ apiKey });

    // Enhance system instruction to mandate:
    // 1. High-fidelity single-column resume details
    // 2. An array of tailoring insights (what was changed and why)
    // 3. Matched/unmatched keywords extracted from the JD and evaluated against the profile
    const enhancedSystemPrompt = `
${systemPrompt}

CRITICAL INSTRUCTIONS FOR JSON FORMATTING:
You must output a single JSON object. Do not include markdown wraps like \`\`\`json.
The structure MUST exactly match the following JSON Schema:
{
  "header": {
    "fullName": "Name of the candidate",
    "title": "Tailored professional subtitle/role title matching the JD target",
    "contact": "Contact details (email, phone, LinkedIn, GitHub, Location)"
  },
  "summary": "Tailored professional summary emphasizing matching skills and experiences",
  "technicalSkills": {
    "languagesAndFrameworks": "Comma-separated list of relevant languages & frameworks from the profile matching the JD",
    "toolsAndPlatforms": "Comma-separated list of relevant tools, databases & platforms from the profile matching the JD",
    "methodologiesAndPractices": "Comma-separated list of relevant agile/devops methodologies or practices"
  },
  "workExperience": [
    {
      "role": "Role Title",
      "company": "Company Name",
      "period": "Start - End Date",
      "bullets": [
        "Tailored achievements emphasizing impact, metrics, and technologies that align with the target JD requirements"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "techStack": "Technologies used (comma-separated)",
      "bullets": [
        "Project details tailored to show relevance to the JD"
      ]
    }
  ],
  "education": [
    {
      "degree": "Degree and Major",
      "institution": "University/Institution Name",
      "year": "Graduation Year"
    }
  ],
  "insights": [
    {
      "change": "Description of what was tailored (e.g. Highlighted Docker and Kubernetes experience in the lead developer role)",
      "reason": "Why this change was made (e.g. The target JD highlights containerization and cloud-native architecture as a core requirement)"
    }
  ],
  "keywords": [
    {
      "word": "Keyword or Skill (e.g., PostgreSQL, CI/CD, React)",
      "matched": true
    }
  ]
}

Ensure you extract the top 6-12 critical technical keywords or skills mentioned in the target job description. For each, indicate matched: true if the candidate has substantial backing/experience in that area in their profile, and matched: false if it's missing or weak.
`;

    const userPrompt = `
TARGET JOB DESCRIPTION:
${jobDescription}

MASTER CANDIDATE PROFILE:
${masterProfile}
`;

    // 2. Call Gemini API with JSON enforcement mode
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: enhancedSystemPrompt,
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response returned from Gemini.");
    }

    let tailoredData;
    try {
      tailoredData = JSON.parse(responseText);
    } catch (_e) {
      console.error(
        "Failed to parse Gemini JSON output. Raw text:",
        responseText,
      );
      throw new Error("Gemini response did not contain valid JSON.");
    }

    // 3. Compile DOCX buffer
    const docxBuffer = await createResumeDocx(tailoredData, options);

    // Convert the DOCX buffer to Base64 to return in the JSON payload
    const docxBase64 = docxBuffer.toString("base64");

    // 4. Return the tailored data, insights, keywords, and the docx base64 file
    return NextResponse.json({
      success: true,
      tailoredData,
      insights: tailoredData.insights || [],
      keywords: tailoredData.keywords || [],
      docxBase64,
    });
  } catch (error) {
    console.error("Resume Generation Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate tailored resume." },
      { status: 500 },
    );
  }
}
