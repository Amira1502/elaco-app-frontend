
import React from "react";

export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full max-w-screen-xl mx-auto px-4 xl:px-8 ${className}`}>
      {children}
    </div>
  );
}