import Link from "next/link";
import css from "./not-found.module.css";

// Гэты кампанент будзе адлюстроўвацца для ўсіх неіснуючых маршрутаў.
export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      {/* Дадаем спасылку на галоўную старонку для зручнасці карыстальніка */}
      <Link href="/" className={css.homeLink}>
        Return Home
      </Link>
    </div>
  );
}
