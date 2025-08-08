"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import styles from "./Header.module.css";

const Header = () => {
  return (
    // Замест класаў Tailwind выкарыстоўваем клас з CSS модуля
    <header className={styles.header}>
      <nav>
        {/* Асноўная спасылка з класам "headerLink" */}
        <Link href="/" className={styles.headerLink}>
          NoteHub
        </Link>
        <div className={styles.navigation}>
          {/* Навігацыйныя спасылкі з класамі "navigationItem" і "navigationLink" */}
          <Link href="/notes" className={styles.navigationLink}>
            Notes
          </Link>
          <Link href="/about" className={styles.navigationLink}>
            About
          </Link>
          <SignedIn>
            <div className={styles.navigationItem}>
              <UserButton afterSignOutUrl="/" />
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
