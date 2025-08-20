import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          404
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Looks like we took a wrong exit. Let’s get you back on the road.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link className="btn btn-primary" to="/">Go Home</Link>
          <Link className="underline text-primary" to="/about/blog">Read the Blog</Link>
        </div>
      </div>
    </div>
  );
}
