"use client";

import { Suspense } from "react";
import Home from "@/pages/Home";

const Main = () => {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
};

export default Main;
