import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t('pages.notFound.heading')}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t('pages.notFound.message')}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link className="btn btn-primary" to="/">{t('pages.notFound.goHomeButton')}</Link>
          <Link className="underline text-primary" to="/blog">{t('pages.notFound.blogLink')}</Link>
        </div>
      </div>
    </div>
  );
}
