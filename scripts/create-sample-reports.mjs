import { mkdir, writeFile } from "node:fs/promises";
// Minimal valid, text-based one-page PDFs. No third-party runtime dependency.
const reports = [
  ["community-perspectives", "Community perspectives"],
  ["dignity-and-inclusion", "Dignity & inclusion"],
];
await mkdir("public/reports", { recursive: true });
for (const [slug, title] of reports) {
  const escape = (s) => s.replace(/([\\()])/g, "\\$1");
  const lines = [
    "ISLAMIC LEAGUE OF MOLDOVA",
    title,
    "SAMPLE PUBLICATION - DESIGN PROTOTYPE",
    "Illustrative edition / 2026",
    "",
    "This is not an official LIM report.",
    "No research findings, statistics or recommendations are presented.",
    "",
    "Example contents",
    "1. Purpose and scope",
    "2. Listening methodology",
    "3. Community perspectives",
    "4. Recommendations and next steps",
    "",
    "Replace this sample with an approved publication before launch.",
  ];
  const stream = `BT /F1 13 Tf 60 770 Td 25 TL ${lines.map((s, i) => `${i ? "T* " : ""}(${escape(s)}) Tj`).join("\n")} ET`;
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((o, i) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const start = Buffer.byteLength(pdf);
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((n) => `${String(n).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`;
  await writeFile(`public/reports/${slug}.pdf`, pdf);
}
