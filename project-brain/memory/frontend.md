# Frontend Memory

## Key Architectural Decisions
- **Wardrobe Loading:** Pagination (`ITEMS_PER_PAGE`) was explicitly removed from `WardrobeCategoryDetail.jsx` on 2026-06-27 to support instant rendering of all 78+ grouped "Looks". The `StaggerReveal` component controls the rendering cascade to ensure smooth performance without needing a manual "Load More" button.
- **LookCarousel:** Image grouping happens at the data layer (`wardrobeData.js`). The frontend receives these arrays and renders them using `LookCarousel`, a hover-based mini-slideshow.