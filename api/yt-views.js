// Vercel serverless function — fetches live YouTube view counts server-side.
// The browser can't scrape youtube.com (CORS); this proxy can. Falls back to
// last-known seed values if YouTube blocks the request, so the UI never breaks.
// CommonJS syntax so it runs on Vercel's Node runtime without a package.json.

const VIDEOS = [
  { id: 'xiBtOsha1Io', seed: 105133 },
  { id: '3BVNxJ6A_MY', seed: 19455 },
];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0 Safari/537.36';

// Preferred path: official YouTube Data API (works from datacenter IPs).
// Set YOUTUBE_API_KEY in Vercel env vars to enable truly-live counts.
async function fetchViaApi(ids) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return {};
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids.join(',')}&key=${key}`;
    const r = await fetch(url);
    if (!r.ok) return {};
    const data = await r.json();
    const out = {};
    (data.items || []).forEach((it) => {
      const v = parseInt(it.statistics && it.statistics.viewCount, 10);
      if (v) out[it.id] = v;
    });
    return out;
  } catch (e) {
    return {};
  }
}

// Fallback: scrape the watch page (works from residential IPs, often blocked on servers).
async function scrapeViews(id) {
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en&gl=US&bpctr=9999999999&has_verified=1`, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'en-US,en;q=0.9',
        Cookie: 'CONSENT=YES+1; SOCS=CAI',
      },
    });
    const html = await r.text();
    const m = html.match(/"viewCount":"(\d+)"/);
    if (m) return parseInt(m[1], 10);
  } catch (e) {
    /* fall through to seed */
  }
  return null;
}

module.exports = async (req, res) => {
  const apiViews = await fetchViaApi(VIDEOS.map((v) => v.id));
  const results = await Promise.all(
    VIDEOS.map(async (v) => {
      let live = apiViews[v.id] || null;
      if (!live) live = await scrapeViews(v.id);
      return { id: v.id, views: live && live >= v.seed ? live : v.seed, live: !!live };
    })
  );
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ videos: results, ts: Date.now() });
};
