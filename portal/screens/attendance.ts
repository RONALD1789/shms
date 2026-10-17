// Attendance: day stepper plus per-class and per-student registers.
import { icons } from "../icons";

interface ClassRegister {
  cls: string;
  present: number;
  total: number;
  tone: string;
}

const registers: ClassRegister[] = [
  { cls: "S.1 Arts", present: 32, total: 34, tone: "blue" },
  { cls: "S.2 Science", present: 30, total: 32, tone: "purple" },
  { cls: "S.3 Arts", present: 28, total: 31, tone: "teal" },
  { cls: "P.7 Blue", present: 38, total: 40, tone: "orange" },
  { cls: "S.5 Science", present: 24, total: 26, tone: "green" },
];

const percent = (register: ClassRegister): number => Math.round((register.present / register.total) * 100);

const classCard = (register: ClassRegister): string => `
  <li class="card">
    <div class="class-card">
      <span class="stat-icon bg-${register.tone}">${icons.classes}</span>
      <span class="class-text">
        <span class="class-name">${register.cls}</span>
        <span class="class-count">${register.present} / ${register.total} Present</span>
        <span class="progress"><span style="width:${percent(register)}%"></span></span>
      </span>
      <span class="class-pct">${percent(register)}%</span>
    </div>
  </li>`;

const studentRow = (name: string, initials: string, cls: string, present: boolean): string => `
  <li class="card att-student">
    <span class="avatar avatar--md">${initials}</span>
    <span class="student-text">
      <span class="student-name">${name}</span>
      <span class="student-meta">${cls}</span>
    </span>
    <span class="pill ${present ? "pill--active" : "pill--absent"}">${present ? "Present" : "Absent"}</span>
  </li>`;

export const attendanceScreen = `
  <section class="screen" id="screen-attendance" aria-label="Attendance">
    <header class="appbar">
      <button class="icon-btn" type="button" data-go="#/dashboard" aria-label="Back">${icons.back}</button>
      <h1>Attendance</h1>
      <button class="icon-btn" type="button" data-soon="Attendance history" aria-label="Attendance history">${icons.calendar}</button>
    </header>
    <div class="screen-body">
      <div class="datepicker">
        <button class="icon-btn icon-btn--dark" type="button" id="att-prev" aria-label="Previous day">${icons.back}</button>
        <span class="datepicker-label" id="att-date">Tue, 14 Oct 2026</span>
        <button class="icon-btn icon-btn--dark" type="button" id="att-next" aria-label="Next day">${icons.chevronRight}</button>
      </div>

      <div class="tabs" id="attendance-tabs">
        <button class="tab is-active" type="button" data-value="class">By Class</button>
        <button class="tab" type="button" data-value="student">By Student</button>
      </div>

      <div data-panel="att-class">
        <ul class="list">${registers.map(classCard).join("")}</ul>
      </div>

      <div data-panel="att-student" hidden>
        <ul class="list">
          ${studentRow("Nsubuga Ivan", "NI", "S.1 Arts", true)}
          ${studentRow("Nakato Sarah", "NS", "P.7 Blue", true)}
          ${studentRow("Okello Brian", "OB", "S.3 Science", false)}
          ${studentRow("Aisha Nabirye", "AN", "P.5 Green", true)}
          ${studentRow("Mugisha Denis", "MD", "S.5 Arts", true)}
        </ul>
      </div>
    </div>
  </section>`;
