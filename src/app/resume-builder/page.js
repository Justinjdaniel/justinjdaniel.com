"use client";

import { useEffect, useState } from "react";
import BackButton from "@/components/buttons/back-button";
import ScrollReveal from "@/components/effects/scroll-reveal";
import MindBlownIcon from "@/components/icons/doodle-library-hand-drawn-vectors/mind-blown";

const STORAGE_KEY = "resume_app_secret";

const SAMPLE_JDS = [
  {
    title: "Senior Fullstack Engineer (React & Node)",
    text: `About the Role:
We are looking for a Senior Fullstack Engineer with 5+ years of experience building scalable applications.
Core stack: React, Node.js, Next.js, and PostgreSQL.

Key Requirements:
- Deep experience in PostgreSQL database optimization, including indexing and query plan analysis.
- Proven experience with Docker and AWS container deployment (ECS/EKS).
- Passion for performance, including sub-second page loads and zero-allocation rendering optimization.
- Experience with Jest/Playwright for full E2E testing.
- Strong knowledge of modern CSS, Tailwind, and fluid user interactions.`,
  },
  {
    title: "Lead Blockchain & Smart Contract Developer",
    text: `About the Role:
Seeking a Lead Web3 Engineer to drive smart contract architecture and dApp interfaces.

Requirements:
- Strong experience in Solidity, smart contract design, and security audits.
- Fullstack proficiency with Next.js, React, and Ethers.js/Viem.
- Experience writing custom subgraph APIs and indexing pipelines.
- Familiarity with CI/CD deployment pipelines (GitHub Actions, Vercel).
- Ability to explain complex technical solutions clearly to non-technical stakeholders.`,
  },
];

export default function ResumeBuilderPage() {
  const [passcode, setPasscode] = useState("");
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);

  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Configuration settings
  const [compact, setCompact] = useState(true);
  const [headingBorders, setHeadingBorders] = useState(true);

  // Results from AI tailoring
  const [tailoredData, setTailoredData] = useState(null);
  const [insights, setInsights] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [docxBase64, setDocxBase64] = useState("");

  // UI state for tabs
  const [activeTab, setActiveTab] = useState("preview"); // 'preview', 'insights', 'keywords'

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSavePasscode = (e) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setIsKeySaved(false);
      return;
    }
    setIsKeySaved(true);
  };

  const handleClearPasscode = () => {
    setPasscode("");
    setIsKeySaved(false);
  };

  const loadSampleJD = (text) => {
    setJobDescription(text);
  };

  const handleGenerate = async () => {
    if (!passcode) {
      alert("Please set and save your API passcode first.");
      return;
    }
    if (!jobDescription.trim()) {
      alert("Please paste a target job description.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": passcode,
        },
        body: JSON.stringify({
          jobDescription,
          options: {
            compact,
            borderSize: headingBorders ? 6 : 0,
            borderColor: "6366F1", // Indigo primary border color
          },
        }),
      });

      if (res.status === 401) {
        alert("Unauthorized: Invalid passcode.");
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to generate document");
      }

      const result = await res.json();
      if (result.success) {
        setTailoredData(result.tailoredData);
        setInsights(result.insights);
        setKeywords(result.keywords);
        setDocxBase64(result.docxBase64);
        setActiveTab("preview");
      }
    } catch (err) {
      console.error(err);
      alert(err?.message || "An error occurred during generation.");
    } finally {
      setLoading(false);
    }
  };

  const downloadDocx = () => {
    if (!docxBase64) return;
    try {
      // Decode base64 to blob
      const byteCharacters = atob(docxBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Tailored_Resume.docx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download docx file", err);
      alert("Error saving file locally.");
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-[95ch] mx-auto w-full antialiased text-zinc-800 dark:text-zinc-200">
      <BackButton />

      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <MindBlownIcon className="w-16 h-16 text-indigo-500 animate-pulse" />
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            ATS Resume Generator
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
            Tailor your master resume to any Job Description in seconds using
            Gemini 2.5 Flash.
          </p>
        </div>
      </div>

      <ScrollReveal className="space-y-6" staggerDelay={80}>
        {/* Passcode Protection Card */}
        <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Security Access Passcode
              </span>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Protects the Gemini API from unauthorized usage. Saved securely
                in local storage.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                  isKeySaved
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                {isKeySaved ? "Passcode Saved" : "Passcode Required"}
              </span>
              {isKeySaved && (
                <button
                  type="button"
                  onClick={handleClearPasscode}
                  className="text-xs text-red-500 hover:text-red-400 hover:underline transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSavePasscode} className="flex gap-2">
            <div className="relative flex-1">
              <input
                id="passcode-input"
                type={showPasscode ? "text" : "password"}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setIsKeySaved(false);
                }}
                placeholder="Enter your MY_APP_SECRET..."
                className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 pr-12 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPasscode(!showPasscode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {showPasscode ? "Hide" : "Show"}
              </button>
            </div>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shrink-0 ${
                isKeySaved
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-750"
                  : "bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/15 text-white active:scale-95"
              }`}
            >
              {isKeySaved ? "Saved" : "Save Passcode"}
            </button>
          </form>
        </div>

        {/* Workspace Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Inputs Section */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm backdrop-blur-md">
              <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Sample JDs
              </span>
              <div className="flex flex-col gap-2 mb-4">
                {SAMPLE_JDS.map((jd) => (
                  <button
                    key={jd.title}
                    type="button"
                    onClick={() => loadSampleJD(jd.text)}
                    className="text-left text-xs p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all text-zinc-600 dark:text-zinc-400 line-clamp-1"
                  >
                    🚀 {jd.title}
                  </button>
                ))}
              </div>

              <div className="border-t border-zinc-200 dark:border-zinc-800/80 my-4" />

              <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Layout Options
              </span>
              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={compact}
                    onChange={(e) => setCompact(e.target.checked)}
                    className="rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus:ring-indigo-500"
                  />
                  <span>Compact Margins (0.5 inch)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={headingBorders}
                    onChange={(e) => setHeadingBorders(e.target.checked)}
                    className="rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus:ring-indigo-500"
                  />
                  <span>Heading Bottom Borders</span>
                </label>
              </div>
            </div>
          </div>

          {/* Job Description Text Area */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-5 shadow-sm backdrop-blur-md h-full flex flex-col justify-between">
              <div className="flex-1 mb-4">
                <label
                  htmlFor="jd-textarea"
                  className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2"
                >
                  Target Job Description
                </label>
                <textarea
                  id="jd-textarea"
                  rows={9}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the target job description details here..."
                  className="w-full h-[240px] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-mono"
                />
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading || !isKeySaved || !jobDescription.trim()}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-100 dark:disabled:bg-zinc-850 disabled:text-zinc-400 dark:disabled:text-zinc-600 text-white rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 shadow-md hover:shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <title>Loading spinner</title>
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Tailoring Your Resume...</span>
                  </>
                ) : (
                  <span>Optimize & Tailor Resume (.docx)</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {tailoredData && (
          <div className="bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl shadow-sm backdrop-blur-md overflow-hidden">
            {/* Nav tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-all ${
                  activeTab === "preview"
                    ? "text-indigo-500 border-b-2 border-indigo-500 bg-zinc-50/50 dark:bg-zinc-800/20"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50/20"
                }`}
              >
                👀 Live Resume Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("insights")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-all ${
                  activeTab === "insights"
                    ? "text-indigo-500 border-b-2 border-indigo-500 bg-zinc-50/50 dark:bg-zinc-800/20"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50/20"
                }`}
              >
                💡 Tailoring Insights ({insights.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("keywords")}
                className={`flex-1 py-3 text-center text-sm font-medium transition-all ${
                  activeTab === "keywords"
                    ? "text-indigo-500 border-b-2 border-indigo-500 bg-zinc-50/50 dark:bg-zinc-800/20"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-50/20"
                }`}
              >
                🎯 Keyword Analyzer ({keywords.length})
              </button>
            </div>

            {/* Tab content area */}
            <div className="p-6">
              {/* Tab 1: On-Screen Resume Preview */}
              {activeTab === "preview" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <p className="text-xs text-zinc-500">
                      Below is a high-fidelity rendering of your tailored
                      resume.
                    </p>
                    <button
                      type="button"
                      onClick={downloadDocx}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm hover:shadow-emerald-500/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                      <span>📥 Download Tailored .docx</span>
                    </button>
                  </div>

                  {/* Clean Page Preview Sheet (mimicking docx print margins) */}
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-8 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 max-w-[800px] mx-auto shadow-inner text-xs font-serif leading-relaxed text-zinc-800 dark:text-zinc-300">
                    {/* Header */}
                    <div className="text-center space-y-1 mb-6">
                      <h3 className="text-xl font-bold font-sans text-zinc-950 dark:text-zinc-50 tracking-tight">
                        {tailoredData.header?.fullName}
                      </h3>
                      {tailoredData.header?.title && (
                        <p className="text-sm font-sans italic text-zinc-500 dark:text-zinc-400">
                          {tailoredData.header?.title}
                        </p>
                      )}
                      {tailoredData.header?.contact && (
                        <p className="text-[11px] font-sans text-zinc-400 dark:text-zinc-500">
                          {tailoredData.header?.contact}
                        </p>
                      )}
                    </div>

                    {/* Resume sections builder */}
                    <div className="space-y-5">
                      {/* Summary */}
                      {tailoredData.summary && (
                        <div className="space-y-1.5">
                          <h4
                            className={`text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase ${headingBorders ? "border-b border-zinc-200 dark:border-zinc-800 pb-0.5" : ""}`}
                          >
                            Professional Summary
                          </h4>
                          <p>{tailoredData.summary}</p>
                        </div>
                      )}

                      {/* Technical Skills */}
                      {tailoredData.technicalSkills && (
                        <div className="space-y-2">
                          <h4
                            className={`text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase ${headingBorders ? "border-b border-zinc-200 dark:border-zinc-800 pb-0.5" : ""}`}
                          >
                            Technical Skills
                          </h4>
                          <div className="space-y-1">
                            {tailoredData.technicalSkills
                              .languagesAndFrameworks && (
                              <p>
                                <strong className="font-sans">
                                  Languages & Frameworks:
                                </strong>{" "}
                                {
                                  tailoredData.technicalSkills
                                    .languagesAndFrameworks
                                }
                              </p>
                            )}
                            {tailoredData.technicalSkills.toolsAndPlatforms && (
                              <p>
                                <strong className="font-sans">
                                  Tools & Platforms:
                                </strong>{" "}
                                {tailoredData.technicalSkills.toolsAndPlatforms}
                              </p>
                            )}
                            {tailoredData.technicalSkills
                              .methodologiesAndPractices && (
                              <p>
                                <strong className="font-sans">
                                  Methodologies & Practices:
                                </strong>{" "}
                                {
                                  tailoredData.technicalSkills
                                    .methodologiesAndPractices
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Work Experience */}
                      {Array.isArray(tailoredData.workExperience) &&
                        tailoredData.workExperience.length > 0 && (
                          <div className="space-y-3">
                            <h4
                              className={`text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase ${headingBorders ? "border-b border-zinc-200 dark:border-zinc-800 pb-0.5" : ""}`}
                            >
                              Work Experience
                            </h4>
                            <div className="space-y-3.5">
                              {tailoredData.workExperience.map((item) => (
                                <div
                                  key={`${item.role}-${item.company}`}
                                  className="space-y-1"
                                >
                                  <div className="flex justify-between text-zinc-950 dark:text-zinc-100 font-medium">
                                    <span>
                                      <strong className="font-sans font-bold">
                                        {item.role}
                                      </strong>
                                      <span className="text-zinc-400 dark:text-zinc-500 font-sans italic">
                                        {" "}
                                        | {item.company}
                                      </span>
                                    </span>
                                    <span className="text-zinc-400 dark:text-zinc-500 font-sans text-[11px]">
                                      {item.period}
                                    </span>
                                  </div>
                                  {Array.isArray(item.bullets) && (
                                    <ul className="list-disc pl-4 space-y-1">
                                      {item.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Projects */}
                      {Array.isArray(tailoredData.projects) &&
                        tailoredData.projects.length > 0 && (
                          <div className="space-y-3">
                            <h4
                              className={`text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase ${headingBorders ? "border-b border-zinc-200 dark:border-zinc-800 pb-0.5" : ""}`}
                            >
                              Projects
                            </h4>
                            <div className="space-y-3.5">
                              {tailoredData.projects.map((proj) => (
                                <div key={proj.name} className="space-y-1">
                                  <div className="flex justify-between text-zinc-950 dark:text-zinc-100 font-medium">
                                    <span>
                                      <strong className="font-sans font-bold">
                                        {proj.name}
                                      </strong>
                                      {proj.techStack && (
                                        <span className="text-zinc-400 dark:text-zinc-500 font-sans italic">
                                          {" "}
                                          - {proj.techStack}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  {Array.isArray(proj.bullets) && (
                                    <ul className="list-disc pl-4 space-y-1">
                                      {proj.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Education */}
                      {Array.isArray(tailoredData.education) &&
                        tailoredData.education.length > 0 && (
                          <div className="space-y-2">
                            <h4
                              className={`text-xs font-sans font-semibold text-zinc-900 dark:text-zinc-100 tracking-wider uppercase ${headingBorders ? "border-b border-zinc-200 dark:border-zinc-800 pb-0.5" : ""}`}
                            >
                              Education
                            </h4>
                            <div className="space-y-1.5">
                              {tailoredData.education.map((edu) => (
                                <div
                                  key={`${edu.degree}-${edu.institution}`}
                                  className="flex justify-between"
                                >
                                  <span>
                                    <strong className="font-sans font-bold">
                                      {edu.degree}
                                    </strong>
                                    <span className="text-zinc-500 dark:text-zinc-400">
                                      , {edu.institution}
                                    </span>
                                  </span>
                                  <span className="text-zinc-400 dark:text-zinc-500 font-sans text-[11px]">
                                    {edu.year}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Tailoring Insights */}
              {activeTab === "insights" && (
                <div className="space-y-4">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                    These are the strategic enhancements made to highlight
                    alignment with the Target Job Description requirements.
                  </p>
                  <div className="grid gap-4">
                    {insights.map((ins, idx) => (
                      <div
                        key={ins.change}
                        className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/80 rounded-lg p-4 transition-all hover:border-indigo-500/30"
                      >
                        <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-xs font-sans">
                            {idx + 1}
                          </span>
                          {ins.change}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 pl-7 leading-relaxed border-l border-zinc-200 dark:border-zinc-800">
                          {ins.reason}
                        </p>
                      </div>
                    ))}
                    {insights.length === 0 && (
                      <div className="text-center py-8 text-zinc-400">
                        No custom insights generated. Try updating the target
                        job description.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Interactive Keyword Highlighter */}
              {activeTab === "keywords" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Top technical keywords extracted from the target JD,
                      mapped against coverage in your profile.
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        Matched
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-red-500 dark:text-red-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                        Missing/Weak
                      </span>
                    </div>
                  </div>

                  {/* Keywords Badges Cloud */}
                  <div className="flex flex-wrap gap-2 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/60 rounded-xl p-5">
                    {keywords.map((kw) => (
                      <span
                        key={kw.word}
                        className={`text-xs px-3 py-1.5 rounded-full font-semibold border transition-all hover:scale-105 flex items-center gap-1.5 ${
                          kw.matched
                            ? "bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/15"
                            : "bg-red-500/5 text-red-500 dark:text-red-400 border-red-500/15"
                        }`}
                      >
                        <span>{kw.matched ? "✓" : "✗"}</span>
                        <span>{kw.word}</span>
                      </span>
                    ))}
                    {keywords.length === 0 && (
                      <div className="text-center py-6 w-full text-zinc-400">
                        No technical keywords identified. Try updating the job
                        description.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </ScrollReveal>
    </main>
  );
}
