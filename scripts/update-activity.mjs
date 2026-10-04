import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

// GitHub contribution dates use UTC. Clamp month subtraction at month end.
const end = new Date();
const start = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth() - 4, 1));
const lastDay = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 0)).getUTCDate();
start.setUTCDate(Math.min(end.getUTCDate(), lastDay));
const iso = date => date.toISOString().slice(0, 10);
const from = iso(start);
const to = iso(end);
const query = `query { user(login: "Sekharendu") { contributionsCollection(from: "${from}T00:00:00Z", to: "${to}T23:59:59Z") { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`;
let result;
if (process.env.GITHUB_TOKEN) {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
  result = await response.json();
} else {
  // Local generation uses the existing GitHub CLI login without exposing credentials.
  result = JSON.parse(execFileSync('gh', ['api', 'graphql', '-f', `query=${query}`], { encoding: 'utf8' }));
}
if (result.errors) throw new Error(JSON.stringify(result.errors));
const days = result.data?.user?.contributionsCollection?.contributionCalendar?.weeks
  .flatMap(week => week.contributionDays)
  .filter(day => day.date >= from && day.date <= to)
  .sort((a, b) => a.date.localeCompare(b.date));
if (!days?.length) throw new Error('GitHub returned no contribution calendar');
const expected = Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1;
if (days.length !== expected || days.some(day => !Number.isInteger(day.contributionCount) || day.contributionCount < 0)) {
  throw new Error('Incomplete or invalid contribution data; keeping previous graph');
}
const left = 65, top = 85, width = 885, height = 190, bottom = top + height;
const max = Math.max(4, Math.ceil(Math.max(...days.map(day => day.contributionCount)) / 4) * 4);
const x = index => left + index * width / (days.length - 1);
const y = count => bottom - count * height / max;
const points = days.map((day, i) => `${x(i).toFixed(2)},${y(day.contributionCount).toFixed(2)}`).join(' ');
const total = days.reduce((sum, day) => sum + day.contributionCount, 0);
const ticks = Array.from({ length: 5 }, (_, i) => {
  const value = max * i / 4, pos = y(value);
  return `<path d="M${left} ${pos}H950" stroke="#292929"/><text x="51" y="${pos + 4}" text-anchor="end" fill="#a3a3a3" font-size="12">${value}</text>`;
}).join('\n');
const labels = days.flatMap((day, i) => {
  if (i !== 0 && !day.date.endsWith('-01')) return [];
  // Keep the first full-month label from colliding with the starting date.
  if (i > 0 && i < 15) return [];
  const label = new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: i === 0 ? 'numeric' : undefined, timeZone: 'UTC' });
  return [`<text x="${x(i).toFixed(2)}" y="300" text-anchor="middle" fill="#a3a3a3" font-size="12">${label}</text>`];
}).join('\n');
const dots = days.filter(day => day.contributionCount > 0).map(day => {
  const i = days.indexOf(day);
  return `<circle cx="${x(i).toFixed(2)}" cy="${y(day.contributionCount).toFixed(2)}" r="2" fill="#fde047"><title>${day.date}: ${day.contributionCount} contributions</title></circle>`;
}).join('\n');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="340" viewBox="0 0 1000 340" role="img" aria-labelledby="title desc">
<title id="title">Four months of GitHub activity</title>
<desc id="desc">Daily GitHub contributions from ${from} through ${to}. ${total} contributions. Horizontal axis: date. Vertical axis: contributions per day.</desc>
<rect width="1000" height="340" rx="12" fill="#0d0d0d"/>
<g font-family="Segoe UI, Arial, sans-serif">
<text x="30" y="34" fill="#facc15" font-size="20" font-weight="600">Four months of GitHub activity</text>
<text x="30" y="57" fill="#a3a3a3" font-size="13">${from} — ${to} · ${total} contributions</text>
${ticks}
<polygon points="${left},${bottom} ${points} 950,${bottom}" fill="#facc15" opacity="0.08"/>
<polyline points="${points}" fill="none" stroke="#facc15" stroke-width="1.8" stroke-linejoin="round"/>
${dots}
${labels}
<text x="507" y="326" text-anchor="middle" fill="#a3a3a3" font-size="12">Date (UTC)</text>
<text transform="translate(18 180) rotate(-90)" text-anchor="middle" fill="#a3a3a3" font-size="12">Contributions / day</text>
</g>
</svg>\n`;
mkdirSync('assets', { recursive: true });
writeFileSync('assets/github-activity.svg', svg);
console.log(`Generated ${days.length} days (${from} to ${to}), ${total} contributions.`);
