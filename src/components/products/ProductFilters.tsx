"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { Product, ProductCategory, Species } from "@/data/products";
import { productCategories, products, speciesOptions } from "@/data/products";
import { solutions } from "@/data/solutions";
import { ProductGrid } from "./ProductGrid";

const fieldClass =
  "mt-2 w-full rounded-sm border border-line bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent";

/** The query string, read as an external store so hydration stays identical. */
function subscribeToLocation(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

export function ProductFilters() {
  // Nav dropdowns deep-link to /products?category=… The URL seeds the filters;
  // the moment the visitor touches a control, their choice takes over.
  const search = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );

  const fromUrl = useMemo(() => {
    const params = new URLSearchParams(search);
    const c = params.get("category");
    const s = params.get("species");
    const sol = params.get("solution");
    return {
      category:
        c && (productCategories as string[]).includes(c)
          ? (c as ProductCategory)
          : ("All" as const),
      species:
        s && (speciesOptions as string[]).includes(s)
          ? (s as Species)
          : ("All" as const),
      solution:
        sol && solutions.some((item) => item.slug === sol) ? sol : "All",
    };
  }, [search]);

  const [query, setQuery] = useState("");
  const [categoryChoice, setCategory] = useState<ProductCategory | "All" | null>(
    null,
  );
  const [speciesChoice, setSpecies] = useState<Species | "All" | null>(null);
  const [solutionChoice, setSolution] = useState<string | null>(null);

  const category = categoryChoice ?? fromUrl.category;
  const species = speciesChoice ?? fromUrl.species;
  const solution = solutionChoice ?? fromUrl.solution;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.summary, p.category, ...p.species, ...p.solutionTags].some(
          (field) => field.toLowerCase().includes(q),
        );
      const matchesCategory = category === "All" || p.category === category;
      const matchesSpecies = species === "All" || p.species.includes(species);
      const matchesSolution =
        solution === "All" ||
        p.solutionTags.includes(solution as Product["solutionTags"][number]);
      return (
        matchesQuery && matchesCategory && matchesSpecies && matchesSolution
      );
    });
  }, [query, category, species, solution]);

  const hasFilters =
    query !== "" || category !== "All" || species !== "All" || solution !== "All";

  return (
    <div>
      <div className="border-y border-line py-7">
        <div className="grid gap-5 lg:grid-cols-4">
          <label className="block lg:col-span-2">
            <span className="t-eyebrow text-muted">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Product, species, or benefit…"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="t-eyebrow text-muted">Category</span>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as ProductCategory | "All")
              }
              className={fieldClass}
            >
              <option value="All">All categories</option>
              {productCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="t-eyebrow text-muted">Species</span>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value as Species | "All")}
              className={fieldClass}
            >
              <option value="All">All species</option>
              {speciesOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="t-eyebrow mr-2 text-muted">Pathway</span>
          <FilterChip
            active={solution === "All"}
            onClick={() => setSolution("All")}
          >
            All
          </FilterChip>
          {solutions.map((s) => (
            <FilterChip
              key={s.slug}
              active={solution === s.slug}
              onClick={() => setSolution(s.slug)}
            >
              {s.title}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Showing {filtered.length} of {products.length} products
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setSpecies("All");
              setSolution("All");
            }}
            className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="mt-8">
        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 ${
        active
          ? "border-primary bg-primary text-surface"
          : "border-line bg-surface text-muted hover:border-primary/35 hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}
