import { Suspense } from "react";
import BookPageContent from "./BookPageContent";

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand-50 flex items-center justify-center"><div className="animate-pulse text-navy-400 font-bold">Loading stays...</div></div>}>
      <BookPageContent />
    </Suspense>
  );
}
