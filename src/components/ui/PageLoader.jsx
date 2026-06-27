import React from "react";

const PageLoader = () => (
    <div className="min-h-screen bg-[var(--bone)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="font-luxe text-[10px] uppercase tracking-[0.4em] text-[var(--ink-soft)] animate-pulse">
                Sunil Mehra
            </div>
            <div className="w-8 h-px bg-[var(--bronze)] animate-pulse" style={{ opacity: 0.4 }} />
        </div>
    </div>
);

export default PageLoader;
