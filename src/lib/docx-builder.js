import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

/**
 * Generates an ATS-friendly single-column resume .docx buffer.
 *
 * @param {Object} data - The resume content returned from Gemini.
 * @param {Object} [options] - Layout & styling options.
 * @param {boolean} [options.compact=true] - If true, uses 0.5-inch (720 DXA) margins; if false, uses 1-inch (1440 DXA) margins.
 * @param {string} [options.borderColor="CCCCCC"] - Hex color for the section heading bottom border.
 * @param {number} [options.borderSize=6] - Size/thickness of the bottom border.
 * @returns {Promise<Buffer>} The compiled .docx file buffer.
 */
export async function createResumeDocx(data, options = {}) {
  const compact = options.compact !== false;
  const borderColor = options.borderColor || "CCCCCC";
  const borderSize = options.borderSize !== undefined ? options.borderSize : 6;

  const children = [];

  // 1. Candidate Header
  if (data.header?.fullName) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: data.header.fullName,
            bold: true,
            size: 28, // 14pt font
          }),
        ],
      }),
    );
  }

  if (data.header?.title) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: data.header.title,
            italics: true,
            size: 22, // 11pt font
          }),
        ],
      }),
    );
  }

  if (data.header?.contact) {
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: data.header.contact,
            size: 18, // 9pt font
          }),
        ],
      }),
    );
  }

  // Section Heading Builder
  const addSectionHeading = (title) => {
    children.push(
      new Paragraph({
        spacing: { before: compact ? 180 : 240, after: compact ? 80 : 120 },
        border:
          borderSize > 0
            ? {
                bottom: {
                  color: borderColor,
                  space: 1,
                  value: BorderStyle.SINGLE,
                  size: borderSize,
                },
              }
            : undefined,
        children: [
          new TextRun({
            text: title.toUpperCase(),
            bold: true,
            size: 22,
          }),
        ],
      }),
    );
  };

  // 2. Summary
  if (data.summary) {
    addSectionHeading("Professional Summary");
    children.push(
      new Paragraph({
        spacing: { after: compact ? 120 : 160 },
        children: [new TextRun({ text: data.summary, size: 20 })],
      }),
    );
  }

  // 3. Technical Skills
  if (data.technicalSkills) {
    addSectionHeading("Technical Skills");
    const skills = data.technicalSkills;
    if (skills.languagesAndFrameworks) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Languages & Frameworks: ",
              bold: true,
              size: 20,
            }),
            new TextRun({ text: skills.languagesAndFrameworks, size: 20 }),
          ],
        }),
      );
    }
    if (skills.toolsAndPlatforms) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({ text: "Tools & Platforms: ", bold: true, size: 20 }),
            new TextRun({ text: skills.toolsAndPlatforms, size: 20 }),
          ],
        }),
      );
    }
    if (skills.methodologiesAndPractices) {
      children.push(
        new Paragraph({
          spacing: { after: 40 },
          children: [
            new TextRun({
              text: "Methodologies & Practices: ",
              bold: true,
              size: 20,
            }),
            new TextRun({ text: skills.methodologiesAndPractices, size: 20 }),
          ],
        }),
      );
    }
  }

  // 4. Work Experience
  if (Array.isArray(data.workExperience) && data.workExperience.length > 0) {
    addSectionHeading("Work Experience");
    for (const item of data.workExperience) {
      children.push(
        new Paragraph({
          spacing: { before: compact ? 80 : 120, after: 40 },
          children: [
            new TextRun({ text: item.role, bold: true, size: 20 }),
            new TextRun({
              text: ` | ${item.company}`,
              italics: true,
              size: 20,
            }),
            new TextRun({ text: ` (${item.period})`, size: 18 }),
          ],
        }),
      );

      if (Array.isArray(item.bullets)) {
        for (const bullet of item.bullets) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 20 },
              children: [new TextRun({ text: bullet, size: 20 })],
            }),
          );
        }
      }
    }
  }

  // 5. Projects
  if (Array.isArray(data.projects) && data.projects.length > 0) {
    addSectionHeading("Projects");
    for (const proj of data.projects) {
      children.push(
        new Paragraph({
          spacing: { before: compact ? 80 : 120, after: 40 },
          children: [
            new TextRun({ text: proj.name, bold: true, size: 20 }),
            new TextRun({
              text: proj.techStack ? ` - ${proj.techStack}` : "",
              italics: true,
              size: 18,
            }),
          ],
        }),
      );

      if (Array.isArray(proj.bullets)) {
        for (const bullet of proj.bullets) {
          children.push(
            new Paragraph({
              bullet: { level: 0 },
              spacing: { after: 20 },
              children: [new TextRun({ text: bullet, size: 20 })],
            }),
          );
        }
      }
    }
  }

  // 6. Education
  if (Array.isArray(data.education) && data.education.length > 0) {
    addSectionHeading("Education");
    for (const edu of data.education) {
      children.push(
        new Paragraph({
          spacing: { before: compact ? 60 : 80, after: 40 },
          children: [
            new TextRun({ text: edu.degree, bold: true, size: 20 }),
            new TextRun({ text: `, ${edu.institution}`, size: 20 }),
            new TextRun({ text: ` (${edu.year})`, size: 18 }),
          ],
        }),
      );
    }
  }

  // Margin mapping: 1 inch = 1440 dxa, 0.5 inch = 720 dxa
  const marginVal = compact ? 720 : 1440;

  // Assemble single-column document with margins
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: marginVal,
              bottom: marginVal,
              left: marginVal,
              right: marginVal,
            },
          },
        },
        children,
      },
    ],
  });

  return await Packer.toBuffer(doc);
}
