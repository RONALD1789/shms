// Fees & Payments: term totals, outstanding balance and recent payments.
import { icons } from "../icons";

interface Payment {
  name: string;
  initials: string;
  cls: string;
  amount: string;
  date: string;
}

const payments: Payment[] = [
  { name: "Nsubuga Ivan", initials: "NI", cls: "S.1 Arts", amount: "UGX 850,000", date: "14 Oct 2026" },
  { name: "Nakato Sarah", initials: "NS", cls: "P.7 Blue", amount: "UGX 450,000", date: "13 Oct 2026" },
  { name: "Okello Brian", initials: "OB", cls: "S.3 Science", amount: "UGX 1,200,000", date: "12 Oct 2026" },
  { name: "Aisha Nabirye", initials: "AN", cls: "P.5 Green", amount: "UGX 400,000", date: "11 Oct 2026" },
  { name: "Kirabo Grace", initials: "KG", cls: "S.6 Science", amount: "UGX 950,000", date: "10 Oct 2026" },
];

const action = (label: string, icon: string): string => `
  <button class="action" type="button" data-soon="${label}">
    <span class="action-icon">${icon}</span><span>${label}</span>
  </button>`;

const paymentRow = (payment: Payment): string => `
  <li class="card payment">
    <span class="avatar avatar--md">${payment.initials}</span>
    <span class="payment-text">
      <span class="student-name">${payment.name}</span>
      <span class="student-meta">${payment.cls}</span>
    </span>
    <span class="payment-amount">
      <strong>${payment.amount} · Paid</strong>
      <small>${payment.date}</small>
    </span>
  </li>`;

export const feesScreen = `
  <section class="screen" id="screen-fees" aria-label="Fees and payments">
    <header class="appbar">
      <button class="icon-btn" type="button" data-go="#/dashboard" aria-label="Back">${icons.back}</button>
      <h1>Fees &amp; Payments</h1>
      <button class="icon-btn" type="button" data-soon="Fees filters" aria-label="Filter payments">${icons.filter}</button>
    </header>
    <div class="screen-body">
      <div class="metrics">
        <div class="card metric metric--green">
          <div class="metric-head">Total Receivables</div>
          <div class="metric-body"><span class="metric-amount">UGX 42,500,000</span></div>
        </div>
        <div class="card metric metric--blue">
          <div class="metric-head">Total Received</div>
          <div class="metric-body"><span class="metric-amount">UGX 31,200,000</span></div>
        </div>
      </div>

      <div class="alert"><span>Outstanding</span><span>UGX 11,300,000</span></div>

      <div class="actions">
        ${action("View Invoices", icons.receipt)}
        ${action("Record Payment", icons.wallet)}
        ${action("Payment History", icons.clock)}
      </div>

      <h2 class="section-title">Recent Payments</h2>
      <ul class="list">${payments.map(paymentRow).join("")}</ul>
    </div>
  </section>`;
