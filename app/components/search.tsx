"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUpdateSearchParams } from "../lib/search-params";
import { useDict } from "./(i18n)/i18n-provider";

export default function Search() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");
  const dict = useDict();
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    const handle = setTimeout(() => {
      updateSearchParams("search", search);
    }, 200);
    return () => clearTimeout(handle);
  }, [search]);

  return (
    <div className="fixed left-0 top-0 z-[400] flex w-full md:left-3 md:top-3 md:w-auto">
      <button className="flex absolute inset-y-0 left-0 items-center pl-2 text-gray-400 hover:text-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block w-5"
        >
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
        <div className="h-3/6 w-px bg-gray-600 mx-1.5" />
      </button>
      <input
        className=" bg-neutral-900 text-gray-200 text-sm pl-11 pr-16 py-2.5 w-full md:border md:border-gray-600 md:rounded-lg outline-none"
        type="text"
        placeholder={dict.search.placeholder}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <div className="flex absolute inset-y-0 right-6 items-center pr-2 text-gray-400">
        <svg
          className="block w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <div className="h-3/6 w-px bg-gray-600 mx-1.5" />
      </div>
      <button className="flex absolute inset-y-0 right-0 items-center pr-2 text-gray-400 hover:text-gray-200">
        <svg
          className="block w-5"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
        </svg>
      </button>
    </div>
  );
}