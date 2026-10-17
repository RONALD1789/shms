// Portal behaviour: hash routing between screens, drawer, segmented tabs,
// the attendance day stepper, student filtering and the small toast.
export const clientScript = `
(function () {
  var ROUTES = ["dashboard", "students", "reports", "attendance", "fees"];
  var screens = Array.prototype.slice.call(document.querySelectorAll(".screen"));
  var drawer = document.getElementById("drawer");
  var scrim = document.getElementById("scrim");
  var toast = document.getElementById("toast");
  var tabButtons = Array.prototype.slice.call(document.querySelectorAll(".tabbtn"));

  function routeName() {
    var name = (location.hash || "").replace("#/", "");
    return ROUTES.indexOf(name) >= 0 ? name : "dashboard";
  }

  function show(name) {
    screens.forEach(function (screen) {
      screen.classList.toggle("is-active", screen.id === "screen-" + name);
    });
    var body = document.querySelector("#screen-" + name + " .screen-body");
    if (body) body.scrollTop = 0;
    tabButtons.forEach(function (button) {
      button.classList.toggle("is-active", (button.dataset.go || "").replace("#/", "") === name);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".drawer-menu [data-go]"), function (item) {
      item.classList.toggle("is-active", (item.dataset.go || "").replace("#/", "") === name);
    });
  }

  function openDrawer() {
    drawer.classList.add("is-open");
    scrim.classList.add("is-open");
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    scrim.classList.remove("is-open");
  }

  var toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-visible"); }, 1900);
  }

  Array.prototype.forEach.call(document.querySelectorAll("[data-go]"), function (element) {
    element.addEventListener("click", function () {
      closeDrawer();
      location.hash = element.dataset.go;
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-drawer-toggle]"), function (element) {
    element.addEventListener("click", openDrawer);
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-soon]"), function (element) {
    element.addEventListener("click", function () {
      closeDrawer();
      showToast(element.dataset.soon + " is not part of this design yet");
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll("[data-focus]"), function (element) {
    element.addEventListener("click", function () {
      var field = document.querySelector(element.dataset.focus);
      if (field) field.focus();
    });
  });

  scrim.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeDrawer();
  });
  window.addEventListener("hashchange", function () { show(routeName()); });

  // -- students: level filter + free-text search
  var studentList = document.getElementById("student-list");
  var studentCards = studentList ? Array.prototype.slice.call(studentList.children) : [];
  var studentEmpty = document.getElementById("student-empty");
  var searchField = document.getElementById("student-search");
  var studentFilters = document.getElementById("student-filters");
  var filter = { level: "all", query: "" };

  function applyStudentFilters() {
    var visible = 0;
    studentCards.forEach(function (card) {
      var matchesLevel = filter.level === "all" || card.dataset.level === filter.level;
      var matchesQuery = !filter.query || (card.dataset.search || "").indexOf(filter.query) >= 0;
      var show = matchesLevel && matchesQuery;
      card.hidden = !show;
      if (show) visible++;
    });
    if (studentEmpty) studentEmpty.hidden = visible > 0;
  }

  if (studentFilters) {
    Array.prototype.forEach.call(studentFilters.querySelectorAll(".tab"), function (button) {
      button.addEventListener("click", function () {
        Array.prototype.forEach.call(studentFilters.querySelectorAll(".tab"), function (other) {
          other.classList.toggle("is-active", other === button);
        });
        filter.level = button.dataset.value;
        applyStudentFilters();
      });
    });
  }

  if (searchField) {
    searchField.addEventListener("input", function () {
      filter.query = searchField.value.trim().toLowerCase();
      applyStudentFilters();
    });
  }

  function wirePanelTabs(groupId, screenId, prefix) {
    var group = document.getElementById(groupId);
    if (!group) return;
    Array.prototype.forEach.call(group.querySelectorAll(".tab"), function (button) {
      button.addEventListener("click", function () {
        Array.prototype.forEach.call(group.querySelectorAll(".tab"), function (other) {
          other.classList.toggle("is-active", other === button);
        });
        Array.prototype.forEach.call(document.querySelectorAll("#" + screenId + " [data-panel]"), function (panel) {
          panel.hidden = panel.dataset.panel !== prefix + button.dataset.value;
        });
      });
    });
  }

  wirePanelTabs("attendance-tabs", "screen-attendance", "att-");
  wirePanelTabs("report-tabs", "screen-reports", "report-");

  // -- attendance day stepper (design opens on Tue, 14 Oct 2026)
  var WEEKDAYS = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var dateLabel = document.getElementById("att-date");
  var dayOffset = 0;

  function renderDate() {
    if (!dateLabel) return;
    var date = new Date(2026, 9, 14 + dayOffset);
    var weekday = WEEKDAYS[((dayOffset % 7) + 7) % 7];
    var day = String(date.getDate()).padStart(2, "0");
    dateLabel.textContent = weekday + ", " + day + " " + MONTHS[date.getMonth()] + " " + date.getFullYear();
  }

  var previousDay = document.getElementById("att-prev");
  var nextDay = document.getElementById("att-next");
  if (previousDay) previousDay.addEventListener("click", function () { dayOffset--; renderDate(); });
  if (nextDay) nextDay.addEventListener("click", function () { dayOffset++; renderDate(); });

  renderDate();
  show(routeName());
})();
`;
