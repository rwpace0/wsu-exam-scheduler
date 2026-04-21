import { supabase } from "./supabase";

const TABLE_NAME = "sp25";

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
