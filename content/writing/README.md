# Adding Articles to the Thoughts Section

## How to add a new article

1. Create a new `.md` file in this folder: `content/writing/your-article-slug.md`
2. The filename becomes the URL: `dwayneholness.com/writing/your-article-slug`
3. Add the required frontmatter at the top, then write the article body in markdown

## Required frontmatter

```md
---
title: "Your Article Title"
date: "March 2026"
readTime: "5 min read"
category: "Filmmaking"
tags: ["Filmmaking", "Brand Strategy"]
excerpt: "One or two sentence summary shown on the listing page."
nextSlug: "slug-of-next-article"
nextTitle: "Title of Next Article"
---

Your article content starts here...
```

## Supported markdown

- `## Heading` → section heading
- `> Quote text` → pull quote / blockquote
- Regular paragraphs → body text

## Workflow

1. Write your article as a `.md` file in this folder
2. Commit and push to GitHub
3. Vercel auto-deploys — article is live within ~30 seconds
