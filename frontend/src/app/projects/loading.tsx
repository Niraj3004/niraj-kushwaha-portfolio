export default function Loading() {
  return (
    <main className="flex-1 pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section heading skeleton */}
        <div className="mb-16 space-y-4">
          <div className="skeleton h-4 w-24" />
          <div className="skeleton h-12 w-80" />
        </div>

        {/* Filter skeleton */}
        <div className="flex gap-2 mb-16">
          {[60, 48, 72, 56, 80].map((w, i) => (
            <div key={i} className={`skeleton h-9 rounded-full`} style={{ width: w }} />
          ))}
        </div>

        {/* Project card skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="skeleton rounded-2xl aspect-[4/3] w-full" />
              <div className="skeleton h-7 w-2/3" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="flex gap-2">
                {[44, 56, 52].map((w, j) => (
                  <div key={j} className="skeleton h-6 rounded-full" style={{ width: w }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
