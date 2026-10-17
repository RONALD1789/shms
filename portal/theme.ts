// Design tokens and styles for the School Admin Portal, taken from the design
// reference: deep blue #002868 brand, light #F8F9FA surfaces, white cards.
export const styles = `
*,*::before,*::after{box-sizing:border-box}
:root{
  --primary:#002868;
  --primary-2:#0a4aa6;
  --light-blue:#E8F1FF;
  --green:#28A745;
  --red:#DC3545;
  --purple:#6F42C1;
  --orange:#FD7E14;
  --teal:#17A2B8;
  --bg:#F8F9FA;
  --card:#FFFFFF;
  --line:#E7ECF3;
  --ink:#0F172A;
  --muted:#6B7280;
  --radius:14px;
  --shadow:0 1px 2px rgba(15,23,42,.05),0 8px 20px rgba(15,23,42,.06);
}
html,body{height:100%}
body{margin:0;background:#E9EDF3;color:var(--ink);font-family:"Segoe UI",system-ui,-apple-system,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;display:flex;justify-content:center}
button{font:inherit;color:inherit}
.phone{position:relative;display:flex;flex-direction:column;width:100%;max-width:430px;height:100vh;height:100dvh;background:var(--bg);overflow:hidden}
@media (min-width:520px){
  body{align-items:center}
  .phone{height:min(880px,94vh);border-radius:26px;box-shadow:0 18px 50px rgba(15,23,42,.2)}
}

/* ---- status bar ---- */
.statusbar{flex:0 0 auto;display:flex;align-items:center;justify-content:space-between;padding:8px 16px 6px;background:#fff;font-size:12px;font-weight:600}
.statusbar-icons{display:flex;align-items:center;gap:5px;color:#1F2937}
.statusbar-icons svg{width:15px;height:15px}

/* ---- app bar ---- */
.appbar{flex:0 0 auto;display:flex;align-items:center;gap:8px;background:var(--primary);color:#fff;padding:12px 12px;min-height:58px}
.appbar h1{flex:1;margin:0;font-size:16px;font-weight:600;text-align:center;letter-spacing:.01em}
.appbar--brand{gap:10px}
.appbar--brand .brand-text{flex:1}
.brand-mark{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:rgba(255,255,255,.16);color:#fff;flex:0 0 auto}
.brand-mark svg{width:21px;height:21px}
.brand-text{display:flex;flex-direction:column;line-height:1.15}
.brand-text strong{font-size:13px;font-weight:700;letter-spacing:.03em}
.brand-text small{font-size:9.5px;font-weight:600;letter-spacing:.06em;opacity:.78}
.icon-btn{position:relative;display:grid;place-items:center;width:36px;height:36px;padding:0;border:0;border-radius:50%;background:transparent;cursor:pointer;flex:0 0 auto}
.icon-btn svg{width:20px;height:20px}
.icon-btn:hover{background:rgba(255,255,255,.14)}
.icon-btn:active{background:rgba(255,255,255,.24)}
.icon-btn--dark:hover{background:rgba(15,23,42,.06)}
.badge{position:absolute;top:3px;right:3px;min-width:16px;height:16px;padding:0 4px;border-radius:9px;background:var(--red);color:#fff;font-size:9.5px;font-weight:700;display:grid;place-items:center;border:2px solid var(--primary)}
:focus-visible{outline:2px solid #7EA8FF;outline-offset:2px}

/* ---- screens ---- */
.screen{display:none;flex:1;min-height:0;flex-direction:column}
.screen.is-active{display:flex}
.screen-body{flex:1;min-height:0;overflow-y:auto;padding:16px 14px 26px;overscroll-behavior:contain}
.section-title{margin:18px 2px 10px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow)}
.avatar{display:grid;place-items:center;border-radius:50%;background:var(--light-blue);color:var(--primary);font-weight:700;font-size:13px;flex:0 0 auto}
.avatar--sm{width:32px;height:32px;font-size:11px;background:#fff;color:var(--primary)}
.avatar--md{width:44px;height:44px}
.avatar--lg{width:56px;height:56px;font-size:17px;border:2px solid #fff;box-shadow:var(--shadow)}
.pill{display:inline-block;padding:3px 9px;border-radius:999px;font-size:10.5px;font-weight:700}
.pill--active{background:#E7F7EC;color:#1E7A34}
.pill--absent{background:#FDECEE;color:#B02A37}
.bg-blue{background:var(--primary)}
.bg-green{background:var(--green)}
.bg-purple{background:var(--purple)}
.bg-orange{background:var(--orange)}
.bg-teal{background:var(--teal)}
.bg-red{background:var(--red)}

/* ---- dashboard ---- */
.greeting{display:flex;align-items:center;justify-content:space-between;gap:12px}
.greeting-hi{margin:0;font-size:12.5px;color:var(--muted)}
.greeting-name{margin:2px 0 0;font-size:17px;font-weight:700}
.greeting-role{margin:2px 0 0;font-size:12px;color:var(--primary-2);font-weight:600}
.banner{position:relative;display:flex;align-items:center;gap:10px;margin:16px 0;padding:16px;border-radius:var(--radius);color:#fff;background:linear-gradient(120deg,#002868 8%,#0a4aa6 92%);box-shadow:var(--shadow);overflow:hidden}
.banner-copy{flex:1}
.banner h3{margin:0;font-size:15px;font-weight:700;letter-spacing:.01em}
.banner p{margin:6px 0 0;font-size:11.5px;opacity:.82}
.banner-art{width:104px;height:66px;flex:0 0 auto}
.banner-art svg{width:100%;height:100%;display:block}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.stat{display:flex;align-items:center;gap:11px;padding:14px}
.stat-icon{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;color:#fff;flex:0 0 auto}
.stat-icon svg{width:20px;height:20px}
.stat-value{display:block;font-size:20px;font-weight:700;line-height:1.05}
.stat-label{display:block;font-size:11.5px;color:var(--muted);margin-top:2px}
.quick{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.quick-item{display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px 6px;background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);font-size:11px;font-weight:600;cursor:pointer;text-align:center;line-height:1.25}
.quick-item:active{transform:scale(.97)}
.quick-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;color:#fff}
.quick-icon svg{width:19px;height:19px}

/* ---- segmented tabs ---- */
.tabs{display:flex;gap:8px;padding:2px 0 12px;overflow-x:auto;scrollbar-width:none}
.tabs::-webkit-scrollbar{display:none}
.tab{flex:0 0 auto;padding:8px 14px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--muted);font-size:12.5px;font-weight:600;cursor:pointer}
.tab.is-active{background:var(--primary);border-color:var(--primary);color:#fff}

/* ---- search ---- */
.search{display:flex;align-items:center;gap:9px;padding:11px 13px;margin-bottom:14px;background:#fff;border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);color:var(--muted)}
.search svg{width:18px;height:18px;flex:0 0 auto}
.search input{flex:1;min-width:0;border:0;background:transparent;font:inherit;font-size:13px;color:var(--ink)}
.search input:focus{outline:none}

/* ---- lists ---- */
.list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.student{display:flex;align-items:center;gap:12px;padding:12px}
.student-text{flex:1;min-width:0}
.student-name{display:block;font-size:13.5px;font-weight:700}
.student-meta{display:block;font-size:11.5px;color:var(--muted);margin-top:3px}
.chev{color:#B9C2CF;display:grid;place-items:center}
.chev svg{width:18px;height:18px}
.empty{margin:18px 4px;font-size:12.5px;color:var(--muted);text-align:center}
.fab{position:absolute;right:18px;bottom:88px;width:52px;height:52px;border:0;border-radius:50%;background:var(--primary);color:#fff;box-shadow:0 10px 22px rgba(0,40,104,.36);display:grid;place-items:center;cursor:pointer;z-index:20}
.fab svg{width:24px;height:24px}

/* ---- attendance ---- */
.datepicker{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;margin-bottom:14px;background:#fff;border:1px solid var(--line);border-radius:var(--radius);box-shadow:var(--shadow);color:var(--primary)}
.datepicker-label{font-size:13px;font-weight:700}
.class-card{padding:14px;display:flex;align-items:center;gap:12px}
.class-text{flex:1;min-width:0}
.class-name{display:block;font-size:13.5px;font-weight:700}
.class-count{display:block;font-size:11.5px;color:var(--muted);margin-top:3px}
.class-pct{font-size:13px;font-weight:700;color:var(--green)}
.progress{height:7px;border-radius:999px;background:#EDF1F6;overflow:hidden;margin-top:9px}
.progress span{display:block;height:100%;border-radius:999px;background:var(--green)}
.att-student{display:flex;align-items:center;gap:12px;padding:12px}

/* ---- fees ---- */
.metrics{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.metric{overflow:hidden}
.metric-head{padding:8px 12px;color:#fff;font-size:11px;font-weight:700}
.metric--green .metric-head{background:var(--green)}
.metric--blue .metric-head{background:var(--primary)}
.metric-body{padding:12px}
.metric-amount{font-size:14.5px;font-weight:700;letter-spacing:.01em}
.alert{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding:12px 14px;border:1px solid #F3C6CB;background:#FDECEE;border-radius:var(--radius);color:var(--red);font-size:13px;font-weight:700}
.actions{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:16px}
.action{display:flex;flex-direction:column;align-items:center;gap:8px;padding:6px;border:0;background:none;font-size:11px;font-weight:600;color:var(--ink);cursor:pointer;text-align:center;line-height:1.25}
.action-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:50%;background:var(--light-blue);color:var(--primary)}
.action-icon svg{width:21px;height:21px}
.payment{display:flex;align-items:center;gap:12px;padding:12px}
.payment-text{flex:1;min-width:0}
.payment-amount{text-align:right;flex:0 0 auto}
.payment-amount strong{display:block;font-size:12.5px;color:var(--green)}
.payment-amount small{display:block;font-size:10.5px;color:var(--muted);margin-top:3px}

/* ---- reports ---- */
.report-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.report-item{display:flex;flex-direction:column;gap:10px;padding:14px;border:1px solid var(--line);border-radius:var(--radius);background:#fff;box-shadow:var(--shadow);cursor:pointer;text-align:left}
.report-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:11px;color:#fff}
.report-icon svg{width:19px;height:19px}
.report-label{font-size:12.5px;font-weight:700;line-height:1.3}
.pass{display:flex;align-items:center;gap:18px;padding:16px;margin-top:12px}
.pass-ring{position:relative;width:98px;height:98px;flex:0 0 auto}
.pass-ring svg{width:98px;height:98px;transform:rotate(-90deg)}
.pass-ring-text{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.pass-ring-text strong{font-size:19px;font-weight:700}
.pass-ring-text small{font-size:9.5px;color:var(--muted);font-weight:600}
.legend{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:9px;font-size:12px}
.legend li{display:flex;align-items:center;gap:8px}
.legend b{margin-left:auto;font-weight:700}
.dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto}
.primary-btn{display:block;width:100%;margin-top:16px;padding:14px;border:0;border-radius:var(--radius);background:var(--primary);color:#fff;font-size:13.5px;font-weight:700;cursor:pointer}
.primary-btn:active{background:#001c4a}
.placeholder{padding:22px 16px;text-align:center;color:var(--muted);font-size:12.5px}

/* ---- bottom tabs / drawer / toast ---- */
.tabbar{flex:0 0 auto;display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border-top:1px solid var(--line);padding:8px 4px 12px}
.tabbtn{display:flex;flex-direction:column;align-items:center;gap:4px;border:0;background:none;color:#8A93A3;font-size:10.5px;font-weight:600;cursor:pointer;padding:4px 0}
.tabbtn svg{width:22px;height:22px}
.tabbtn.is-active{color:var(--primary)}
.scrim{position:absolute;inset:0;background:rgba(15,23,42,.52);opacity:0;pointer-events:none;transition:opacity .22s ease;z-index:40}
.scrim.is-open{opacity:1;pointer-events:auto}
.drawer{position:absolute;top:0;left:0;bottom:0;width:84%;max-width:325px;background:#fff;z-index:50;display:flex;flex-direction:column;transform:translateX(-102%);transition:transform .26s ease;box-shadow:0 0 40px rgba(15,23,42,.28)}
.drawer.is-open{transform:none}
.drawer-head{background:var(--primary);color:#fff;padding:18px 16px 16px}
.drawer-brand{display:flex;align-items:center;gap:10px}
.drawer-user{display:flex;align-items:center;gap:11px;margin-top:16px}
.drawer-user-text{flex:1;display:flex;flex-direction:column;line-height:1.25}
.drawer-user-text strong{font-size:13.5px;font-weight:700}
.drawer-user-text small{font-size:11px;opacity:.8}
.drawer-menu{list-style:none;margin:0;padding:10px 8px;flex:1;overflow-y:auto}
.drawer-menu button{display:flex;align-items:center;gap:12px;width:100%;padding:11px 12px;border:0;border-radius:11px;background:none;font-size:13px;font-weight:600;color:#33415C;cursor:pointer;text-align:left}
.drawer-menu button svg{width:19px;height:19px;color:#8A93A3;flex:0 0 auto}
.drawer-menu button:hover{background:var(--bg)}
.drawer-menu button.is-active{background:var(--light-blue);color:var(--primary)}
.drawer-menu button.is-active svg{color:var(--primary)}
.drawer-menu .menu-badge{margin-left:auto;min-width:19px;height:19px;padding:0 5px;border-radius:10px;background:var(--primary);color:#fff;font-size:10.5px;font-weight:700;display:grid;place-items:center}
.drawer-logout{display:flex;align-items:center;gap:12px;padding:16px 20px 22px;border:0;border-top:1px solid var(--line);background:none;color:var(--red);font-size:13.5px;font-weight:700;cursor:pointer;text-align:left}
.drawer-logout svg{width:19px;height:19px}
.toast{position:absolute;left:50%;bottom:96px;transform:translate(-50%,10px);max-width:82%;padding:10px 15px;border-radius:999px;background:rgba(15,23,42,.93);color:#fff;font-size:12px;font-weight:600;text-align:center;opacity:0;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:60}
.toast.is-visible{opacity:1;transform:translate(-50%,0)}
`;
