import { supabase } from "./supabase";

const FUNCTION_NAME = "export-ics";

export const exportExamsToIcs = async (exams) => {
  const sections = exams.map((exam) => exam.section).filter(Boolean);

  if (!sections.length) {
    throw new Error("No class sections provided for export.");
  }

  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: { sections },
  });

  if (error) {
    throw new Error(error.message || "Failed to generate ICS file.");
  }

  let blob;
  if (data instanceof Blob) {
    blob = data;
  } else if (typeof data === "string") {
    blob = new Blob([data], { type: "text/calendar;charset=utf-8" });
  } else {
    blob = new Blob([JSON.stringify(data)], {
      type: "application/json;charset=utf-8",
    });
  }

  const objectUrl = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = objectUrl;
  downloadLink.download = "wsufinalschedule.ics";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.URL.revokeObjectURL(objectUrl);
};
