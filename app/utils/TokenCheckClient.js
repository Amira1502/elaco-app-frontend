"use client";

import { useEffect } from "react";
import { checkTokenInCookies } from "./checkTokenInCookies";

export default function TokenCheckClient() {
  useEffect(() => {
    checkTokenInCookies();
  }, []);

  return null;
}
