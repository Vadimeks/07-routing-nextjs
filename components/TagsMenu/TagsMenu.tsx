"use client";

import React, { useState } from "react";
import { useNotesContext } from "@/app/context/notesContext";
import styles from "./TagsMenu.module.css";
import Link from "next/link";

const TagsMenu = () => {
  const { uniqueTags } = useNotesContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.menuContainer}>
      <button onClick={handleToggleMenu} className={styles.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={styles.menuList}>
          {/* Спасылка для паказу ўсіх нататак */}
          <li className={styles.menuItem}>
            <Link
              href="/notes/filter/all"
              onClick={() => setIsOpen(false)}
              className={styles.menuLink}
            >
              All notes
            </Link>
          </li>
          {/* Спіс тэгаў, атрыманых з кантэксту */}
          {uniqueTags.map((tag: string) => (
            <li key={tag} className={styles.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                onClick={() => setIsOpen(false)}
                className={styles.menuLink}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
