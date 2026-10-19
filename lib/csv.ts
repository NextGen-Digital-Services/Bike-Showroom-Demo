export function exportToCsv(filename: string, rows: Record<string, unknown>[]): void {
  if (!rows || !rows.length) return;

  const separator = ",";
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            const val = row[k];
            let str = "";
            if (val === null || val === undefined) {
              str = "";
            } else if (Array.isArray(val)) {
              str = val.join("; ");
            } else if (val instanceof Date) {
              str = val.toLocaleString();
            } else {
              str = String(val);
            }
            str = str.replace(/"/g, '""');
            if (str.search(/("|,|\n)/g) >= 0) {
              str = `"${str}"`;
            }
            return str;
          })
          .join(separator);
      })
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const results: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].trim();
    if (!currentLine) continue;

    // Handle quoted values containing commas
    const values: string[] = [];
    let insideQuotes = false;
    let currentValue = "";

    for (let c = 0; c < currentLine.length; c++) {
      const char = currentLine[c];
      if (char === '"' && (c === 0 || currentLine[c - 1] !== "\\")) {
        insideQuotes = !insideQuotes;
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim().replace(/^"|"$/g, ""));
        currentValue = "";
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim().replace(/^"|"$/g, ""));

    const item: Record<string, string> = {};
    headers.forEach((header, idx) => {
      item[header] = values[idx] || "";
    });
    results.push(item);
  }

  return results;
}
