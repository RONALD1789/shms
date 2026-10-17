// Chrome shared by every portal screen: the phone status bar, the navigation
// drawer and the bottom tab bar.
import { icons } from "./icons";

export const statusbar = `
  <div class="statusbar">
    <span>9:41</span>
    <span class="statusbar-icons">${icons.signal}${icons.wifi}${icons.battery}</span>
  </div>`;

interface MenuItem {
  label: string;
  icon: string;
  go?: string;
  soon?: boolean;
  badge?: string;
}

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: icons.home, go: "#/dashboard" },
  { label: "Students", icon: icons.users, go: "#/students" },
  { label: "Teachers", icon: icons.briefcase, soon: true },
  { label: "Staff", icon: icons.userPlus, soon: true },
  { label: "Classes", icon: icons.classes, soon: true },
  { label: "Attendance", icon: icons.clipboard, go: "#/attendance" },
  { label: "Fees & Payments", icon: icons.wallet, go: "#/fees" },
  { label: "Reports", icon: icons.chart, go: "#/reports" },
  { label: "School Calendar", icon: icons.calendar, soon: true },
  { label: "Messages", icon: icons.message, soon: true, badge: "2" },
  { label: "Settings", icon: icons.settings, soon: true },
];

const menuButton = ({ label, icon, go, soon, badge }: MenuItem): string => `
  <li>
    <button type="button" ${go ? `data-go="${go}"` : `data-soon="${label}"`}>
      ${icon}<span>${label}</span>${badge ? `<span class="menu-badge">${badge}</span>` : ""}
      ${soon ? "" : `<span class="chev" style="margin-left:auto">${icons.chevronRight}</span>`}
    </button>
  </li>`;

export const drawer = `
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Main menu">
    <div class="drawer-head">
      <div class="drawer-brand">
        <span class="brand-mark">${icons.graduation}</span>
        <span class="brand-text"><strong>JC SCHOOL</strong><small>MANAGEMENT SYSTEM</small></span>
      </div>
      <div class="drawer-user">
        <span class="avatar avatar--lg">DM</span>
        <span class="drawer-user-text"><strong>Mr. David Mugisha</strong><small>School Administrator</small></span>
        <span class="chev">${icons.chevronDown}</span>
      </div>
    </div>
    <ul class="drawer-menu">${menuItems.map(menuButton).join("")}</ul>
    <button class="drawer-logout" type="button" data-soon="Logout">${icons.logout}<span>Logout</span></button>
  </aside>`;

const tab = (label: string, icon: string, attrs: string): string => `
  <button class="tabbtn" type="button" ${attrs}>${icon}<span>${label}</span></button>`;

export const tabbar = `
  <nav class="tabbar" aria-label="Sections">
    ${tab("Home", icons.home, 'data-go="#/dashboard"')}
    ${tab("Students", icons.users, 'data-go="#/students"')}
    ${tab("Reports", icons.chart, 'data-go="#/reports"')}
    ${tab("More", icons.more, "data-drawer-toggle")}
  </nav>`;

export const toast = `<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
