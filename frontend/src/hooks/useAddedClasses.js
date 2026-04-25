import { use } from "react";
import { AddedClassesContext } from "../context/AddedClassesContext";

/**
 * Exam rows the user added; shared via AddedClassesContext so all components
 * (Navbar, Search, ViewClasses) stay in sync without a page refresh.
 */
export function useAddedClasses() {
  const ctx = use(AddedClassesContext);
  if (!ctx) {
    throw new Error("useAddedClasses must be used within AddedClassesProvider");
  }
  return ctx;
}
