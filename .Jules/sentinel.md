# Sentinel's Journal - Critical Security Learnings

This journal documents critical, non-obvious security patterns and vulnerability insights discovered in this repository.

## 2026-07-12 - XML/HTML Injection and XSS in Manual RSS Generators
**Vulnerability:** Directly interpolating unescaped MDX metadata properties (such as title, summary, link) into a string-constructed XML template for RSS feeds can result in XML/HTML injection or XSS in feed readers. If blog metadata contains special characters like `<`, `>`, `&`, `"`, or `'`, it can break the XML parser or execute arbitrary scripts in feed-rendering contexts.
**Learning:** Personal blogging sites that use markdown files as content sources are often assumed to have "safe" metadata, but defensive security standards dictate that any raw data must be sanitized/escaped before being output in structured formats like XML/HTML.
**Prevention:** Always implement robust HTML/XML character escaping for any dynamically interpolated strings in XML responses, or use standard XML building libraries that serialize and escape data automatically.
