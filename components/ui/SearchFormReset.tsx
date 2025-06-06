"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const reset = () => {
  const form = document.querySelector(".search-form") as HTMLFormElement;
  // console.log("form element:", form)
  if (form) form.reset();
};

const SearchFormReset = () => {
  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
