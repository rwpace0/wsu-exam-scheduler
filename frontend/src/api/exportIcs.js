const CALENDAR_NAME = "WSU Final Exam Schedule";
const TIMEZONE = "America/Los_Angeles";

const pickField = (exam, keys) => {
  for (const key of keys) {
    const value = exam?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
};

const escapeText = (value = "") =>
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");

const toIcsDate = (date) =>
  `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
    date.getDate(),
  ).padStart(2, "0")}`;

const toIcsDateTime = (date) =>
  `${toIcsDate(date)}T${String(date.getHours()).padStart(2, "0")}${String(
    date.getMinutes(),
  ).padStart(2, "0")}00`;

const parseExamDate = (day) => {
  if (!day) return null;
  if (day instanceof Date && !Number.isNaN(day.getTime())) return day;

  const value = String(day).trim();
  if (!value) return null;

  const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, date] = isoMatch;
    const parsed = new Date(Number(year), Number(month) - 1, Number(date));
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  const direct = new Date(value);
  if (!Number.isNaN(direct.getTime())) return direct;

  const noWeekday = value
    .replace(
      /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|tues|wed|thu|thur|thurs|fri|sat|sun)\.?,?\s+/i,
      "",
    )
    .trim();
  const withoutComma = noWeekday.replace(",", "");
  const fromMonthText = new Date(withoutComma);
  if (!Number.isNaN(fromMonthText.getTime())) return fromMonthText;

  const monthDayMatch = withoutComma.match(
    /^([a-z]+)\s+(\d{1,2})(?:\s+(\d{4}))?$/i,
  );
  if (monthDayMatch) {
    const [, monthWord, dayOfMonth, year] = monthDayMatch;
    const withYear = `${monthWord} ${dayOfMonth} ${year || new Date().getFullYear()}`;
    const parsed = new Date(withYear);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  const match = value.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (match) {
    const [, month, date, year] = match;
    const parsed = new Date(Number(year), Number(month) - 1, Number(date));
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }

  return null;
};

const normalizeTime = (timePart, fallbackPeriod = "") => {
  if (!timePart) return null;

  const token = timePart.trim().toLowerCase().replace(/\./g, "");
  const fullMatch = token.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!fullMatch) return null;

  const [, hourRaw, minuteRaw, parsedPeriod] = fullMatch;
  const period = parsedPeriod || fallbackPeriod;
  if (!period) return null;

  let hour = Number(hourRaw);
  const minute = Number(minuteRaw || 0);
  if (Number.isNaN(hour) || Number.isNaN(minute) || minute < 0 || minute > 59) {
    return null;
  }

  hour %= 12;
  if (period === "pm") hour += 12;

  return { hour, minute };
};

const parseTimeRange = (timeRange) => {
  if (!timeRange) return null;

  const cleaned = String(timeRange).replace(/\u00a0/g, " ").trim();
  const extracted = cleaned.match(
    /(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-\u2013\u2014]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i,
  );
  const rawStart = (extracted?.[1] || "").trim();
  const rawEnd = (extracted?.[2] || "").trim();
  if (!rawStart || !rawEnd) return null;

  // Do not use \b around am/pm: in JS, digit+letter is one "word", so "10am" has no \b before "am".
  const meridiem = (part) =>
    part.toLowerCase().replace(/\./g, "").match(/(am|pm)/)?.[1] || "";

  const startPeriod = meridiem(rawStart);
  const endPeriod = meridiem(rawEnd) || startPeriod;

  const start = normalizeTime(rawStart, startPeriod || endPeriod);
  const end = normalizeTime(rawEnd, endPeriod || startPeriod);
  if (!start || !end) return null;

  return { start, end };
};

const buildIcsEvent = (exam, nowStamp) => {
  const section = pickField(exam, ["section", "Section"]) || "Final Exam";
  const day = pickField(exam, ["day", "Day"]);
  const time = pickField(exam, ["time", "Time"]);

  const date = parseExamDate(day);
  const timeRange = parseTimeRange(time);
  if (!date || !timeRange) return null;

  const start = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    timeRange.start.hour,
    timeRange.start.minute,
    0,
  );
  const end = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    timeRange.end.hour,
    timeRange.end.minute,
    0,
  );

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  const uidSource = `${section}-${toIcsDateTime(start)}@wsu-exam-scheduler`;

  return [
    "BEGIN:VEVENT",
    `UID:${escapeText(uidSource)}`,
    `DTSTAMP:${nowStamp}`,
    `SUMMARY:${escapeText(section)}`,
    `DESCRIPTION:${escapeText(`Final exam for ${section}`)}`,
    `DTSTART;TZID=${TIMEZONE}:${toIcsDateTime(start)}`,
    `DTEND;TZID=${TIMEZONE}:${toIcsDateTime(end)}`,
    "END:VEVENT",
  ].join("\r\n");
};

export const exportExamsToIcs = async (exams) => {
  const selectedExams = Array.isArray(exams) ? exams : [];
  if (!selectedExams.length) {
    throw new Error("No classes provided for export.");
  }

  const now = new Date();
  const nowStamp = `${toIcsDateTime(now)}Z`;
  const events = [];
  const failed = [];

  selectedExams.forEach((exam) => {
    const event = buildIcsEvent(exam, nowStamp);
    if (event) {
      events.push(event);
      return;
    }
    failed.push({
      section: pickField(exam, ["section", "Section"]) || "unknown",
      day: pickField(exam, ["day", "Day"]) || "missing",
      time: pickField(exam, ["time", "Time"]) || "missing",
    });
  });

  if (!events.length) {
    const preview = failed
      .slice(0, 2)
      .map((item) => `${item.section} (${item.day} | ${item.time})`)
      .join(", ");
    throw new Error(
      preview
        ? `Could not parse exam dates/times for export. Example: ${preview}`
        : "Could not parse exam dates/times for export.",
    );
  }

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WSU Exam Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(CALENDAR_NAME)}`,
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const objectUrl = window.URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");
  downloadLink.href = objectUrl;
  downloadLink.download = "wsufinalschedule.ics";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  window.URL.revokeObjectURL(objectUrl);
};
