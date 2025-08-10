// components/Header/Header.tsx
"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import styles from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import type { Tag } from "@/types/note"; // <-- Новы імпарт

// Абнаўляем інтэрфейс для прапсаў
interface HeaderProps {
  allTags: Tag[];
}

// Прымаем allTags у якасці прапса
const Header = ({ allTags }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <nav>
        <Link href="/" className={styles.headerLink}>
          NoteHub
        </Link>
        <div className={styles.navigation}>
          {/* <-- Перадаем allTags у TagsMenu */}
          <TagsMenu allTags={allTags} />
          <Link href="/about" className={styles.navigationLink}>
            About
          </Link>
          <SignedIn>
            <div className={styles.navigationItem}>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className={styles.navigationLink}>
              Sign In
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
