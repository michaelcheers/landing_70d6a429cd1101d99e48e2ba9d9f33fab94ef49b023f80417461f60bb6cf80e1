# Sitemap Maintenance Guide

## Important: Manual Sitemap Updates Required

This project does **NOT** use automated sitemap generation. The sitemap must be manually updated whenever new pages are created.

## Location
`public/sitemap.xml`

## When to Update

Update the sitemap whenever you:
- ✅ Create new pages or routes
- ✅ Add new service area cities
- ✅ Create blog posts or dynamic content
- ✅ Add new service types
- ✅ Make significant changes to existing pages

## How to Update

1. Open `public/sitemap.xml`
2. Add new URL entries following this format:

```xml
<url>
  <loc>https://www.movingpapa.com/your-new-page</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Priority Guidelines

Use these priority values as guidelines:
- **1.0** - Homepage (Toronto & Vancouver main pages)
- **0.9** - High-value pages (Main residential/commercial service pages)
- **0.8** - Important service pages and major city pages
- **0.7** - Supporting service pages and medium-priority cities
- **0.6** - Smaller cities and specialty pages
- **0.3** - Legal pages (privacy policy, terms & conditions)

## Change Frequency Guidelines

- **weekly** - Homepages, reviews (frequently updated content)
- **monthly** - Service pages, city pages (regular updates)
- **yearly** - Legal/policy pages (rarely change)

## After Updating

1. **Test the sitemap**: Visit `https://www.movingpapa.com/sitemap.xml` to ensure it's valid
2. **Submit to Google Search Console**:
   - Go to Google Search Console
   - Navigate to Sitemaps section
   - Submit/Resubmit the sitemap
3. **Submit to Bing Webmaster Tools** (optional but recommended)

## Current Structure (as of 2025-10-28)

### Toronto Pages
- Main pages: `/`, `/company`, `/commercial`, `/reviews`, `/areas-of-service`
- Service pages: All under `/service/`
- Service areas: 18 major GTA cities under `/service-area/`
- Specialized service-areas: 24 high-value combinations under `/service-areas/` (see below)
- Legal: `/privacy-policy`, `/terms-and-condition`

### Vancouver Pages
- Main pages: `/vancouver`, `/vancouver/company`, `/vancouver/commercial`, `/vancouver/reviews`, `/vancouver/areas-of-service`
- Service pages: All under `/vancouver/service/`
- Service areas: 13 major Lower Mainland cities under `/service-area/`
- Legal: `/vancouver/privacy-policy`, `/vancouver/terms-and-condition`

### Service Areas Currently Included

**Toronto/GTA Cities (18 via /service-area/):**
- toronto, mississauga, brampton, markham, vaughan, richmond-hill
- oakville, burlington, milton, ajax, pickering, whitby
- oshawa, newmarket, aurora, north-york, scarborough, etobicoke

**Vancouver/Lower Mainland Cities (13 via /service-area/):**
- vancouver, burnaby, richmond, surrey, coquitlam, langley
- north-vancouver, west-vancouver, new-westminster, port-moody
- maple-ridge, delta, white-rock

**Specialized Service-Area Combinations (24 via /service-areas/):**
- **Local Move:** toronto, mississauga, brampton, vaughan, hamilton, oakville, burlington, scarborough
- **Packing:** toronto, mississauga, brampton, vaughan, hamilton
- **Storage:** toronto, mississauga, vaughan, hamilton
- **Commercial:** office-move, warehouse-move, last-mile

*Note: There are 55 total service-area slugs available. Only the highest-priority combinations are included in the sitemap to avoid dilution.*

## Future Automation (Recommended)

Consider implementing automated sitemap generation using:
- **next-sitemap** package for Next.js
- Automatic generation on build
- Dynamic route detection

This would eliminate manual maintenance and reduce errors.

## Questions?

If you're unsure whether to add something to the sitemap, ask:
1. **Is it indexable?** (not behind authentication, not noindex)
2. **Is it valuable for users?** (not a utility/callback page)
3. **Should Google find it?** (not a test/staging page)

If yes to all three, add it to the sitemap!
