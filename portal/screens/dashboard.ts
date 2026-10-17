// Dashboard: school greeting, promo banner, key numbers and quick actions.
import { icons } from "../icons";

const statCard = (value: string, label: string, tone: string, icon: string): string => `
  <div class="card stat">
    <span class="stat-icon bg-${tone}">${icon}</span>
    <span><span class="stat-value">${value}</span><span class="stat-label">${label}</span></span>
  </div>`;

const quickAction = (label: string, tone: string, icon: string, attrs: string): string => `
  <button class="quick-item" type="button" ${attrs}>
    <span class="quick-icon bg-${tone}">${icon}</span><span>${label}</span>
  </button>`;

const schoolArt = `
  <svg viewBox="0 0 120 80" aria-hidden="true">
    <circle cx="99" cy="16" r="8" fill="#FFD166" opacity=".92"/>
    <path d="M14 33 60 12l46 21Z" fill="#0b3781"/>
    <rect x="20" y="33" width="80" height="34" rx="3" fill="#F4F7FC"/>
    <rect x="28" y="40" width="12" height="11" rx="2" fill="#0a4aa6" opacity=".85"/>
    <rect x="46" y="40" width="12" height="11" rx="2" fill="#0a4aa6" opacity=".85"/>
    <rect x="64" y="40" width="12" height="11" rx="2" fill="#0a4aa6" opacity=".85"/>
    <rect x="82" y="40" width="12" height="11" rx="2" fill="#0a4aa6" opacity=".85"/>
    <rect x="52" y="55" width="16" height="12" rx="2" fill="#002868"/>
    <rect x="12" y="67" width="96" height="5" rx="2.5" fill="#4b7fd1" opacity=".55"/>
  </svg>`;

export const dashboardScreen = `
  <section class="screen" id="screen-dashboard" aria-label="Dashboard">
    <header class="appbar appbar--brand">
      <span class="brand-mark">${icons.graduation}</span>
      <span class="brand-text"><strong>JC SCHOOL</strong><small>MANAGEMENT SYSTEM</small></span>
      <button class="icon-btn" type="button" data-soon="Notifications" aria-label="Notifications">
        ${icons.bell}<span class="badge">3</span>
      </button>
      <button class="icon-btn" type="button" data-drawer-toggle aria-label="Open profile menu">
        <span class="avatar avatar--sm">DM</span>
      </button>
    </header>
    <div class="screen-body">
      <div class="greeting">
        <div>
          <p class="greeting-hi">Good morning,</p>
          <h2 class="greeting-name">Mr. David Mugisha</h2>
          <p class="greeting-role">School Administrator</p>
        </div>
        <span class="avatar avatar--lg">DM</span>
      </div>

      <div class="banner">
        <div class="banner-copy">
          <h3>Better Learning</h3>
          <h3>Brighter Future</h3>
          <p>Term 3 · 2026</p>
        </div>
        <div class="banner-art">${schoolArt}</div>
      </div>

      <div class="stats">
        ${statCard("482", "Total Students", "blue", icons.users)}
        ${statCard("36", "Teachers", "green", icons.briefcase)}
        ${statCard("12", "Classes", "purple", icons.classes)}
        ${statCard("18", "Staff", "orange", icons.userPlus)}
      </div>

      <h2 class="section-title">Quick Actions</h2>
      <div class="quick">
        ${quickAction("Add Student", "blue", icons.userPlus, 'data-go="#/students"')}
        ${quickAction("Manage Staff", "green", icons.briefcase, 'data-soon="Manage Staff"')}
        ${quickAction("View Reports", "purple", icons.chart, 'data-go="#/reports"')}
        ${quickAction("Attendance", "teal", icons.clipboard, 'data-go="#/attendance"')}
        ${quickAction("Fees &amp; Payments", "orange", icons.wallet, 'data-go="#/fees"')}
        ${quickAction("Settings", "red", icons.settings, 'data-soon="Settings"')}
      </div>
    </div>
  </section>`;
