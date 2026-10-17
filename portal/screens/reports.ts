// Reports: report categories, quick-view pass rate and the generate action.
import { icons } from "../icons";

const ACADEMIC_REPORTS = [
  { label: "Student Performance", icon: icons.trending, tone: "blue" },
  { label: "Class Performance", icon: icons.users, tone: "purple" },
  { label: "Exam Results", icon: icons.file, tone: "orange" },
  { label: "Promotion Report", icon: icons.award, tone: "green" },
];

const reportItem = (label: string, icon: string, tone: string): string => `
  <button class="report-item" type="button" data-soon="${label}">
    <span class="report-icon bg-${tone}">${icon}</span>
    <span class="report-label">${label}</span>
  </button>`;

const tab = (label: string, value: string, active = false): string => `
  <button class="tab${active ? " is-active" : ""}" type="button" data-value="${value}">${label}</button>`;

// Radial progress ring for the overall pass rate (87%).
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PASS_RATE = 87;

const passRing = `
  <div class="pass-ring">
    <svg viewBox="0 0 98 98" aria-hidden="true">
      <circle cx="49" cy="49" r="${RADIUS}" fill="none" stroke="#EDF1F6" stroke-width="11"/>
      <circle cx="49" cy="49" r="${RADIUS}" fill="none" stroke="#002868" stroke-width="11" stroke-linecap="round"
        stroke-dasharray="${CIRCUMFERENCE.toFixed(1)}" stroke-dashoffset="${(CIRCUMFERENCE * (1 - PASS_RATE / 100)).toFixed(1)}"/>
    </svg>
    <span class="pass-ring-text"><strong>${PASS_RATE}%</strong><small>Pass Rate</small></span>
  </div>`;

export const reportsScreen = `
  <section class="screen" id="screen-reports" aria-label="Reports">
    <header class="appbar">
      <button class="icon-btn" type="button" data-go="#/dashboard" aria-label="Back">${icons.back}</button>
      <h1>Reports</h1>
      <button class="icon-btn" type="button" data-soon="Report search" aria-label="Search reports">${icons.search}</button>
    </header>
    <div class="screen-body">
      <div class="tabs" id="report-tabs">
        ${tab("Academic", "academic", true)}
        ${tab("Financial", "financial")}
        ${tab("Attendance", "attendance")}
        ${tab("HR", "hr")}
      </div>

      <div data-panel="report-academic">
        <div class="report-grid">${ACADEMIC_REPORTS.map(({ label, icon, tone }) => reportItem(label, icon, tone)).join("")}</div>

        <h2 class="section-title">Quick View</h2>
        <div class="card pass">
          ${passRing}
          <ul class="legend">
            <li><span class="dot bg-green"></span>Passed<b>418</b></li>
            <li><span class="dot bg-red"></span>Failed<b>64</b></li>
            <li><span class="dot bg-blue"></span>Total<b>482</b></li>
          </ul>
        </div>
      </div>

      <div data-panel="report-financial" hidden>
        <div class="card placeholder">Financial reports are not part of this design yet.</div>
      </div>
      <div data-panel="report-attendance" hidden>
        <div class="card placeholder">Attendance reports are not part of this design yet.</div>
      </div>
      <div data-panel="report-hr" hidden>
        <div class="card placeholder">HR reports are not part of this design yet.</div>
      </div>

      <button class="primary-btn" type="button" data-soon="Generate Report">Generate Report</button>
    </div>
  </section>`;
