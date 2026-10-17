// Students: search, level filters and the student list.
import { icons } from "../icons";

interface Student {
  name: string;
  initials: string;
  cls: string;
  admission: string;
  level: "primary" | "jhs" | "shs";
}

const students: Student[] = [
  { name: "Nsubuga Ivan", initials: "NI", cls: "S.1 Arts", admission: "JC2025001", level: "jhs" },
  { name: "Nakato Sarah", initials: "NS", cls: "P.7 Blue", admission: "JC2025014", level: "primary" },
  { name: "Okello Brian", initials: "OB", cls: "S.3 Science", admission: "JC2025032", level: "jhs" },
  { name: "Aisha Nabirye", initials: "AN", cls: "P.5 Green", admission: "JC2025047", level: "primary" },
  { name: "Mugisha Denis", initials: "MD", cls: "S.5 Arts", admission: "JC2025058", level: "shs" },
  { name: "Kirabo Grace", initials: "KG", cls: "S.6 Science", admission: "JC2025071", level: "shs" },
];

const studentCard = (student: Student): string => {
  const haystack = `${student.name} ${student.admission} ${student.cls}`.toLowerCase();
  return `
  <li class="card student" data-level="${student.level}" data-search="${haystack}">
    <span class="avatar avatar--md">${student.initials}</span>
    <span class="student-text">
      <span class="student-name">${student.name}</span>
      <span class="student-meta">${student.cls} · ${student.admission}</span>
    </span>
    <span class="pill pill--active">Active</span>
    <span class="chev">${icons.chevronRight}</span>
  </li>`;
};

const filterTab = (label: string, value: string, active = false): string => `
  <button class="tab${active ? " is-active" : ""}" type="button" data-value="${value}">${label}</button>`;

export const studentsScreen = `
  <section class="screen" id="screen-students" aria-label="Students">
    <header class="appbar">
      <button class="icon-btn" type="button" data-go="#/dashboard" aria-label="Back">${icons.back}</button>
      <h1>Students</h1>
      <button class="icon-btn" type="button" data-focus="#student-search" aria-label="Search students">${icons.search}</button>
      <button class="icon-btn" type="button" data-soon="Filters" aria-label="Filter students">${icons.filter}</button>
    </header>
    <div class="screen-body">
      <label class="search">
        ${icons.search}
        <input id="student-search" type="search" placeholder="Search by name, admission No. or class..." autocomplete="off">
      </label>
      <div class="tabs" id="student-filters">
        ${filterTab("All (482)", "all", true)}
        ${filterTab("Primary", "primary")}
        ${filterTab("JHS", "jhs")}
        ${filterTab("SHS", "shs")}
      </div>
      <ul class="list" id="student-list">${students.map(studentCard).join("")}</ul>
      <p class="empty" id="student-empty" hidden>No students match your search.</p>
    </div>
    <button class="fab" type="button" data-soon="Add student" aria-label="Add student">${icons.plus}</button>
  </section>`;
