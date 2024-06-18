"use client";

import { Suspense } from "react";
import Home from "@/pages/Home";
import Loader from "@/components/ui/Loader";

const Main = () => {

  return (
    <Suspense fallback={<Loader />}>
      <Home />
    </Suspense>
  );
};

export default Main;
