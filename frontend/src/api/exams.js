import { supabase } from "./supabase";

const TABLE_NAME = "finals";

const abbreviationMappings = {
  cs: "cpt_s",
  cpts: "cpt_s",
  computer: "cpt_s",
  accounting: "acctg",
  acct: "acctg",
  math: "math",
  mathematics: "math",
  english: "engl",
  eng: "engl",
  biology: "biol",
  bio: "biol",
  chemistry: "chem",
  physics: "phys",
  history: "hist",
  psychology: "psyc",
  psych: "psyc",
  economics: "econ",
  business: "bus",
  management: "mgmt",
  marketing: "mktg",
  finance: "fin",
  statistics: "stat",
  engineering: "engr",
  nursing: "nurs",
  education: "educ",
  art: "art",
  music: "mus",
  theater: "thtr",
  philosophy: "phil",
  sociology: "soc",
  anthropology: "anth",
  geography: "geog",
  geology: "geol",
  political: "pols",
  government: "pols",
  communications: "com",
  journalism: "jour",
  foreign: "forl",
  language: "forl",
};

const selectColumns = `"Primary","Term","Campus","Section","Day","Time"`;

const normalizeExam = (row) => ({
  primary: row.Primary,
  term: row.Term,
  campus: row.Campus,
  section: row.Section,
  day: row.Day,
  time: row.Time,
});

const queryBySectionLike = async (pattern) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select(selectColumns)
    .ilike("Section", pattern);

  if (error) throw error;
  return data ?? [];
};

const filterExamsBySection = (exams, matcher) =>
  exams.filter((exam) => matcher(exam.section.toLowerCase()));

const normalizeForMatching = (value = "") =>
  value.toLowerCase().replace(/[_\s-]/g, "");

export const filterExamsLocally = (exams, query = "") => {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) return exams;
  const normalizedQuery = normalizeForMatching(trimmedQuery);

  let results = filterExamsBySection(exams, (section) =>
    normalizeForMatching(section).includes(normalizedQuery),
  );

  if (!results.length) {
    const mappedQuery = abbreviationMappings[trimmedQuery];
    if (mappedQuery && mappedQuery !== trimmedQuery) {
      const normalizedMappedQuery = normalizeForMatching(mappedQuery);
      results = filterExamsBySection(exams, (section) =>
        normalizeForMatching(section).includes(normalizedMappedQuery),
      );
    }
  }

  if (!results.length) {
    results = filterExamsBySection(exams, (section) =>
      normalizeForMatching(section).startsWith(normalizedQuery),
    );
  }

  if (!results.length) {
    const parts = trimmedQuery.split(/\s+/).filter((part) => part.length >= 2);
    for (const part of parts) {
      const normalizedPart = normalizeForMatching(part);
      const partialResults = filterExamsBySection(exams, (section) =>
        normalizeForMatching(section).includes(normalizedPart),
      );
      if (partialResults.length) {
        results = partialResults;
        break;
      }
    }
  }

  return results;
};

export const fetchExams = async (query = "") => {
  const trimmedQuery = query.trim().toLowerCase();
  let rows = [];

  if (!trimmedQuery) {
    const { data, error } = await supabase.from(TABLE_NAME).select(selectColumns);
    if (error) throw error;
    rows = data ?? [];
    return rows.map(normalizeExam);
  }

  rows = await queryBySectionLike(`%${trimmedQuery}%`);

  if (!rows.length) {
    const mappedQuery = abbreviationMappings[trimmedQuery];
    if (mappedQuery && mappedQuery !== trimmedQuery) {
      rows = await queryBySectionLike(`%${mappedQuery}%`);
    }
  }

  if (!rows.length) {
    rows = await queryBySectionLike(`${trimmedQuery}%`);
  }

  if (!rows.length) {
    const parts = trimmedQuery.split(/\s+/).filter((part) => part.length >= 2);
    for (const part of parts) {
      const partialRows = await queryBySectionLike(`%${part}%`);
      if (partialRows.length) {
        rows = partialRows;
        break;
      }
    }
  }

  return rows.map(normalizeExam);
};
