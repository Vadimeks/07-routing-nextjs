"use client";

import React from "react";
import { useNotesContext } from "@/app/context/notesContext";

const TagsMenu = () => {
  const { uniqueTags, handleTagFilter, activeTag } = useNotesContext();

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {/* Кнопка для паказу ўсіх нататак */}
      <button
        onClick={() => handleTagFilter(null)}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
          activeTag === null
            ? "bg-gray-800 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Усе
      </button>

      {/* Кнопкі для кожнага ўнікальнага тэга */}
      {uniqueTags.map((tag: string) => (
        <button
          key={tag}
          onClick={() => handleTagFilter(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeTag === tag
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagsMenu;
