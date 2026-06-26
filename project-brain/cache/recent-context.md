# Recent Context
- **Task:** Global Image Deduplication
- **Date:** 2026-06-27
- **Context:** Conducted a comprehensive audit of all hardcoded arrays in `Featured.jsx`, `LookbookGrid.jsx`, `HorizontalRunway.jsx`, and `AtelierShowcase.jsx`. Repetitive indices (e.g. `kurta-sets[0]` and `kurta-sets[15]`) were safely reassigned to unused looks across the 78+ wardrobe items. All components now display 100% unique imagery, maximizing the visibility of the uploaded photo batch.