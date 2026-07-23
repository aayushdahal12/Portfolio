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

async function fetchViews(id) {
  try {
    const r = await fetch(`https://www.youtube.com/watch?v=${id}&hl=en`, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'en-US,en;q=0.9',
        Cookie: 'CONSENT=YES+1', // skip EU consent interstitial on datacenter IPs
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
  const results = await Promise.all(
    VIDEOS.map(async (v) => {
      const live = await fetchViews(v.id);
      return { id: v.id, views: live && live >= v.seed ? live : v.seed, live: !!live };
    })
  );
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ videos: results, ts: Date.now() });
};
