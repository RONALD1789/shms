// The School Admin Portal UI. Encore serves it at the app root; the API usage
// documentation that used to live there moved to GET /docs.
import { api } from "encore.dev/api";
import { styles } from "./theme";
import { clientScript } from "./client";
import { drawer, statusbar, tabbar, toast } from "./shell";
import { dashboardScreen } from "./screens/dashboard";
import { studentsScreen } from "./screens/students";
import { reportsScreen } from "./screens/reports";
import { attendanceScreen } from "./screens/attendance";
import { feesScreen } from "./screens/fees";

const portalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#002868">
  <title>JC School Management System</title>
  <style>${styles}</style>
</head>
<body>
  <div class="phone">
    ${statusbar}
    <main class="app">
      ${dashboardScreen}
      ${studentsScreen}
      ${reportsScreen}
      ${attendanceScreen}
      ${feesScreen}
    </main>
    ${tabbar}
    ${drawer}
    ${toast}
  </div>
  <script>${clientScript}</script>
</body>
</html>`;

// Serve the portal.
export const portal = api.raw(
  { expose: true, method: "GET", path: "/" },
  async (req, resp) => {
    resp.setHeader("Content-Type", "text/html; charset=utf-8");
    resp.end(portalHtml);
  },
);
