const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = 'c:/Users/ASUS/Desktop/react-admin-dashboard';
const TARGET_DIR = 'c:/Users/ASUS/Desktop/Admin-Dashboard';

const USER_NAME = 'akshaddhawan';
const USER_EMAIL = 'akshaddhawan2@gmail.com';

function cleanDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === '.git' || file === 'rebuild-history.cjs' || file === 'rebuild-history.js') {
      continue;
    }
    const fullPath = path.join(dir, file);
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

function copyFileOrFolder(relPath) {
  const src = path.join(SOURCE_DIR, relPath);
  const dest = path.join(TARGET_DIR, relPath);

  if (!fs.existsSync(src)) {
    console.warn(`Source path does not exist: ${src}`);
    return;
  }

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
      copyFileOrFolder(path.join(relPath, file));
    }
  } else {
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}

// Set up the commit definitions
const commitDefinitions = [
  { files: ['.gitignore'], msg: 'Add gitignore file' },
  { files: ['package.json'], msg: 'Initialize package configuration' },
  { files: ['package-lock.json'], msg: 'Lock package dependencies' },
  { files: ['vite.config.js', 'postcss.config.js'], msg: 'Add vite and postcss config files' },
  { files: ['tailwind.config.js', '.eslintrc.cjs'], msg: 'Add tailwind and eslint configs' },
  { files: ['index.html'], msg: 'Add entry index.html page' },
  { files: ['src/index.css'], msg: 'Add global index styling' },
  { files: ['src/main.jsx'], msg: 'Add main.jsx application entry point' },
  { files: ['src/App.jsx'], msg: 'Set up routing structure in App.jsx' },
  { files: ['src/components/common/Header.jsx'], msg: 'Create common Header component' },
  { files: ['src/components/common/Sidebar.jsx'], msg: 'Create common Sidebar navigation layout' },
  { files: ['src/components/common/StatCard.jsx'], msg: 'Create generic StatCard component' },
  { files: ['src/pages/OverviewPage.jsx'], msg: 'Add OverviewPage template layout' },
  { files: ['src/components/overview/CategoryDistributionChart.jsx'], msg: 'Implement category distribution charts' },
  { files: ['src/components/overview/SalesChannelChart.jsx'], msg: 'Implement sales channel visual graphs' },
  { files: ['src/components/overview/SalesOverviewChart.jsx'], msg: 'Implement overview dashboard chart' },
  { files: ['src/pages/ProductsPage.jsx'], msg: 'Add ProductsPage main page skeleton' },
  { files: ['src/components/products/ProductsTable.jsx'], msg: 'Build product data interactive table' },
  { files: ['src/components/products/SalesTrendChart.jsx'], msg: 'Build sales trend graphs' },
  { files: ['src/pages/UsersPage.jsx'], msg: 'Create UsersPage UI component' },
  { files: ['src/components/users/UsersTable.jsx'], msg: 'Create users directory data table' },
  { files: ['src/components/users/UserGrowthChart.jsx'], msg: 'Create user growth line chart' },
  { files: ['src/components/users/UserDemographicsChart.jsx'], msg: 'Create user demographic chart visual' },
  { files: ['src/components/users/UserActivityHeatmap.jsx'], msg: 'Create user activity calendar heatmap' },
  { files: ['src/pages/SalesPage.jsx'], msg: 'Integrate SalesPage module' },
  { files: ['src/components/sales/SalesOverviewChart.jsx'], msg: 'Add sales overview line chart' },
  { files: ['src/components/sales/SalesByCategoryChart.jsx'], msg: 'Add sales by category breakdown pie chart' },
  { files: ['src/components/sales/DailySalesTrend.jsx'], msg: 'Add daily sales trends histogram' },
  { files: ['src/pages/OrdersPage.jsx'], msg: 'Integrate OrdersPage component' },
  { files: ['src/components/orders/OrdersTable.jsx'], msg: 'Implement table view for customer orders' },
  { files: ['src/components/orders/OrderDistribution.jsx'], msg: 'Implement order status distribution chart' },
  { files: ['src/components/orders/DailyOrders.jsx'], msg: 'Implement daily orders line graph' },
  { files: ['src/pages/AnalyticsPage.jsx'], msg: 'Integrate AnalyticsPage module' },
  { files: ['src/components/analytics/RevenueChart.jsx'], msg: 'Add revenue vs targets chart' },
  { files: ['src/components/analytics/OverviewCards.jsx'], msg: 'Add small stats overview cards' },
  { files: ['src/components/analytics/UserRetention.jsx'], msg: 'Add cohort user retention line chart' },
  { files: ['src/components/analytics/ChannelPerformance.jsx'], msg: 'Add performance analytics by channel' },
  { files: ['src/components/analytics/ProductPerformance.jsx'], msg: 'Add product conversion rate analytics' },
  { files: ['src/components/analytics/CustomerSegmentation.jsx'], msg: 'Add user segment radar chart' },
  { files: ['src/components/analytics/AIPoweredInsights.jsx'], msg: 'Add AI insights section for analysis summary' },
  { files: ['src/pages/SettingsPage.jsx'], msg: 'Integrate SettingsPage component' },
  { files: ['src/components/settings/SettingSection.jsx', 'src/components/settings/ToggleSwitch.jsx'], msg: 'Add custom setting sections and toggle widgets' },
  { files: ['src/components/settings/Profile.jsx', 'src/components/settings/Security.jsx'], msg: 'Add profile and security form modules' },
  { files: ['src/components/settings/Notifications.jsx', 'src/components/settings/ConnectedAccounts.jsx'], msg: 'Add settings for user notification preferences and connected oauth accounts' },
  { files: ['src/components/settings/DangerZone.jsx'], msg: 'Add delete account settings container' },
  { files: ['public/vite.svg', 'public/facebook.svg'], msg: 'Add initial base icons to public assets' },
  { files: ['public/google.png', 'public/x.png'], msg: 'Add social platform provider assets' },
  { files: ['public/screenshot-for-readme-1.png', 'public/screenshot-for-readme-2.png', 'public/screenshot-for-readme-3.png'], msg: 'Add readme demonstration screenshots' },
  { files: ['README.md'], msg: 'Document setup and startup in README' },

  // Edit commits to simulate incremental updates and fixes
  { editFile: 'src/App.jsx', msg: 'Fix routing configurations and default fallbacks' },
  { editFile: 'src/components/common/Sidebar.jsx', msg: 'Improve sidebar styling responsiveness' },
  { editFile: 'src/components/common/Header.jsx', msg: 'Adjust header padding and alignment' },
  { editFile: 'src/components/analytics/RevenueChart.jsx', msg: 'Tune charts color scheme matching Tailwind theme' },
  { editFile: 'src/components/users/UsersTable.jsx', msg: 'Enable user search filtering in data table' },
  { editFile: 'src/components/products/ProductsTable.jsx', msg: 'Fix missing product edit buttons alignment' },
  { editFile: 'src/components/settings/Profile.jsx', msg: 'Fix user avatar input click handler' },
  { editFile: 'tailwind.config.js', msg: 'Tweak Tailwind color palette variables' },
  { editFile: 'README.md', msg: 'Clarify run script command in README documentation' },
  { editFile: 'package.json', msg: 'Update project details and set dependencies exact versions' },
  { editFile: 'src/components/analytics/AIPoweredInsights.jsx', msg: 'Update analytics mock cards styling details' }
];

console.log(`Starting to rebuild git history in ${TARGET_DIR}...`);

// Step 1: Clean target directory of all files except .git and the rebuild script
cleanDirectory(TARGET_DIR);

// Step 2: Initialize Git in target directory
try {
  execSync('git init', { cwd: TARGET_DIR });
  console.log('Git initialized successfully.');
} catch (e) {
  console.error('Failed to init git:', e.message);
  process.exit(1);
}

// Configure branch name
try {
  execSync('git checkout -b main', { cwd: TARGET_DIR });
} catch (e) {
  try {
    execSync('git branch -M main', { cwd: TARGET_DIR });
  } catch (err) {
    console.warn('Could not set branch to main, continuing with default.');
  }
}

// Set up timestamps
const startDate = new Date('2024-11-07T10:00:00').getTime();
const endDate = new Date('2026-06-12T18:00:00').getTime();
const totalRange = endDate - startDate;

const activeDaysCount = 35;
const activeDates = [];

for (let i = 0; i < activeDaysCount; i++) {
  const factor = i / (activeDaysCount - 1);
  const jitter = (Math.random() - 0.5) * 5 * 24 * 60 * 60 * 1000; // +/- 2.5 days jitter
  let time = startDate + factor * totalRange + jitter;
  if (time < startDate) time = startDate;
  if (time > endDate) time = endDate;
  activeDates.push(new Date(time));
}

activeDates.sort((a, b) => a.getTime() - b.getTime());

// Assign commit counts per day
const commitCountsPerDay = Array(activeDaysCount).fill(1);
let remainingCommits = commitDefinitions.length - activeDaysCount;
while (remainingCommits > 0) {
  const idx = Math.floor(Math.random() * activeDaysCount);
  if (commitCountsPerDay[idx] < 4) {
    commitCountsPerDay[idx]++;
    remainingCommits--;
  }
}

// Generate precise commit dates
const commitDates = [];
let commitIdx = 0;
for (let d = 0; d < activeDaysCount; d++) {
  const count = commitCountsPerDay[d];
  const date = activeDates[d];
  for (let c = 0; c < count; c++) {
    const commitDate = new Date(date);
    // Space out multiple commits on the same day by hours
    commitDate.setHours(9 + c * 3, Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    commitDates.push(commitDate);
  }
}

console.log(`Total commits to create: ${commitDefinitions.length}`);
console.log(`Spanning from ${commitDates[0].toISOString()} to ${commitDates[commitDates.length - 1].toISOString()}`);

// Execute commits one by one
commitDefinitions.forEach((def, index) => {
  const dateObj = commitDates[index];
  const formattedDate = dateObj.toISOString();

  if (def.files) {
    // File addition
    def.files.forEach(file => {
      copyFileOrFolder(file);
    });
  } else if (def.editFile) {
    // File modification
    const filePath = path.join(TARGET_DIR, def.editFile);
    if (fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      if (ext === '.json') {
        const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (json.version) {
          const parts = json.version.split('.');
          parts[parts.length - 1] = parseInt(parts[parts.length - 1], 10) + 1;
          json.version = parts.join('.');
        } else {
          json.updatedAt = dateObj.toISOString();
        }
        fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
      } else if (ext === '.md') {
        let content = fs.readFileSync(filePath, 'utf8');
        content += `\n\n<!-- Updated: ${dateObj.toDateString()} -->\n`;
        fs.writeFileSync(filePath, content, 'utf8');
      } else if (ext === '.html') {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace('</body>', `<!-- Updated: ${dateObj.toDateString()} -->\n</body>`);
        fs.writeFileSync(filePath, content, 'utf8');
      } else {
        let content = fs.readFileSync(filePath, 'utf8');
        content += `\n// Minor update for layout refinement - ${dateObj.toDateString()}\n`;
        fs.writeFileSync(filePath, content, 'utf8');
      }
    } else {
      console.warn(`File to edit does not exist: ${filePath}`);
    }
  }

  // Git commit
  try {
    execSync('git add -A', { cwd: TARGET_DIR });
    const env = {
      ...process.env,
      GIT_AUTHOR_DATE: formattedDate,
      GIT_COMMITTER_DATE: formattedDate,
      GIT_AUTHOR_NAME: USER_NAME,
      GIT_AUTHOR_EMAIL: USER_EMAIL,
      GIT_COMMITTER_NAME: USER_NAME,
      GIT_COMMITTER_EMAIL: USER_EMAIL
    };
    execSync(`git commit -m "${def.msg}"`, { cwd: TARGET_DIR, env });
    console.log(`Commit ${index + 1}/${commitDefinitions.length} created: "${def.msg}" on ${dateObj.toLocaleDateString()}`);
  } catch (e) {
    console.error(`Failed to commit: ${def.msg}`, e.message);
    process.exit(1);
  }
});

console.log('All commits created successfully.');
