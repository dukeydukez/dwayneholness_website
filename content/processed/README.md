# Drafts System

Your article pipeline. Three folders, one flow.

```
drafts/
├── article_bank/    ← Your vault. Articles sit here until you're ready.
├── processing/      ← Drop zone. Drag a file here to auto-process.
└── processed/       ← Originals land here after processing.
```

## Workflow

1. Collect raw drafts into `article_bank/`
2. When ready, drag a file from `article_bank/` into `processing/`
3. The watcher polishes it and saves to `content/writing/`
4. Original moves to `processed/`
5. Commit + push to publish

Supported formats: .txt, .md, .text, .docx, .pdf

Run the watcher: `npm run dev` or `npm run watch`
