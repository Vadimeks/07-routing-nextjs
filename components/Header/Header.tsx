"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import styles from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
const Header = () => {
  return (
    <header className={styles.header}>
      <nav>
        {}
        <Link href="/" className={styles.headerLink}>
          NoteHub
        </Link>
        <div className={styles.navigation}>
          {}
          <TagsMenu />
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
