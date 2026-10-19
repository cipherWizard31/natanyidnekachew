"use client";

import type { SkillCategoryData, ArticleData } from "../types";

interface Props {
  skillCategoriesList: SkillCategoryData[];
  newCategoryTitle: string;
  newSkillInputs: Record<number, string>;
  articlesList: ArticleData[];
  newArticleForm: Partial<ArticleData>;
  isSavingArticles: boolean;
  setNewCategoryTitle: (val: string) => void;
  setNewSkillInputs: (updater: (prev: Record<number, string>) => Record<number, string>) => void;
  setNewArticleForm: (updater: (prev: Partial<ArticleData>) => Partial<ArticleData>) => void;
  onAddCategory: () => void;
  onDeleteCategory: (id: number) => void;
  onAddSkillToCat: (categoryId: number) => void;
  onRemoveSkillFromCat: (categoryId: number, skillToRemove: string) => void;
  onSaveNewArticle: (e: React.FormEvent) => void;
  onDeleteArticle: (id: number) => void;
}

export default function SkillsModule({
  skillCategoriesList,
  newCategoryTitle,
  newSkillInputs,
  articlesList,
  newArticleForm,
  isSavingArticles,
  setNewCategoryTitle,
  setNewSkillInputs,
  setNewArticleForm,
  onAddCategory,
  onDeleteCategory,
  onAddSkillToCat,
  onRemoveSkillFromCat,
  onSaveNewArticle,
  onDeleteArticle,
}: Props) {
  return (
    <div className="space-y-10">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2d3449]/50">
        <div>
          <h2 className="text-xl font-semibold text-[#dae2fd] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5eead4] text-[22px]">terminal</span>
            <span>Technical Arsenal &amp; Skill Matrix</span>
          </h2>
          <p className="text-xs font-mono text-[#94a3b8] mt-1">
            Categorized skills taxonomy displayed on your public portfolio.
          </p>
        </div>

        {/* Add New Category Form */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="New category name..."
            value={newCategoryTitle}
            onChange={(e) => setNewCategoryTitle(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#2d3449] text-xs font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
          />
          <button
            type="button"
            onClick={onAddCategory}
            className="px-3.5 py-1.5 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4] transition-colors border border-[#5eead4]/30"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {skillCategoriesList.map((category) => (
          <div
            key={category.id}
            className="p-6 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#2d3449]/40 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#94a3b8]">
                  TAXONOMY GROUP
                </span>
                <h3 className="text-base font-semibold text-[#5eead4]">{category.title}</h3>
              </div>
              {skillCategoriesList.length > 1 && (
                <button
                  type="button"
                  onClick={() => onDeleteCategory(category.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Delete category"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              )}
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2 min-h-[50px] p-3 rounded-xl bg-[#0b1326] border border-[#2d3449]">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#222a3d] text-xs font-mono text-[#dae2fd] border border-[#2d3449]"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveSkillFromCat(category.id, skill)}
                    className="hover:text-red-400"
                  >
                    <span className="material-symbols-outlined text-[13px]">close</span>
                  </button>
                </span>
              ))}

              {/* Add Skill to this category */}
              <div className="inline-flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkillInputs[category.id] || ""}
                  onChange={(e) =>
                    setNewSkillInputs((prev) => ({
                      ...prev,
                      [category.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onAddSkillToCat(category.id);
                    }
                  }}
                  className="bg-transparent text-xs font-mono text-[#5eead4] px-2 py-1 focus:outline-none w-24"
                />
                <button
                  type="button"
                  onClick={() => onAddSkillToCat(category.id)}
                  className="text-xs font-mono text-[#5eead4] hover:underline"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Writing & Publications Studio */}
      <div className="pt-8 border-t border-[#2d3449]/50 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#dae2fd] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5eead4] text-[20px]">article</span>
              <span>Technical Writing &amp; Substack Publications</span>
            </h3>
            <p className="text-xs font-mono text-[#94a3b8] mt-0.5">
              Manage articles and essays linked to your Substack.
            </p>
          </div>
        </div>

        {/* Add New Article Form */}
        <form
          onSubmit={onSaveNewArticle}
          className="p-5 rounded-2xl bg-[#131b2e] border border-[#2d3449]/60 grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
        >
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Article Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Mechanical Sympathy and Zero-Copy Serialization"
              value={newArticleForm.title || ""}
              onChange={(e) => setNewArticleForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Publication / Channel</label>
            <input
              type="text"
              required
              value={newArticleForm.publication || ""}
              onChange={(e) =>
                setNewArticleForm((prev) => ({ ...prev, publication: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-mono text-[#94a3b8] uppercase">Read Time</label>
            <input
              type="text"
              required
              value={newArticleForm.read_time || ""}
              onChange={(e) =>
                setNewArticleForm((prev) => ({ ...prev, read_time: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg bg-[#0b1326] border border-[#2d3449] text-sm font-mono text-[#dae2fd] focus:border-[#5eead4] focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSavingArticles}
              className="w-full py-2 rounded-lg bg-[#5eead4] text-[#00675b] text-xs font-mono font-semibold hover:bg-[#b5fff0] transition-colors"
            >
              + Add Article
            </button>
          </div>
        </form>

        {/* Articles List */}
        <div className="space-y-3">
          {articlesList.map((art) => (
            <div
              key={art.id}
              className="p-4 rounded-xl bg-[#131b2e] border border-[#2d3449]/50 flex items-center justify-between gap-4"
            >
              <div>
                <h4 className="text-sm font-medium text-[#dae2fd]">{art.title}</h4>
                <p className="text-xs font-mono text-[#94a3b8] mt-1 flex items-center gap-2">
                  <span>{art.publication}</span>
                  <span>•</span>
                  <span>{art.read_time}</span>
                  <span>•</span>
                  <span>{art.year}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={art.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-2.5 py-1 rounded bg-[#222a3d] hover:bg-[#2d3449] text-xs font-mono text-[#5eead4]"
                >
                  Visit ↗
                </a>
                <button
                  type="button"
                  onClick={() => onDeleteArticle(art.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                  title="Delete article"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
