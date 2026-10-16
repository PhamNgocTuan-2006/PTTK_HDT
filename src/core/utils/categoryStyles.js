const categoryTextClasses = {
  Cultural: "text-emerald-600",
  Historical: "text-amber-600",
  Spiritual: "text-purple-600",
  Architectural: "text-sky-600",
  Natural: "text-cyan-600",
  Monument: "text-rose-600",
  Museum: "text-violet-600",
  Temple: "text-orange-600",
  Lake: "text-teal-600",
};

export function getCategoryTextClass(category) {
  return categoryTextClasses[category] || "text-slate-600";
}
