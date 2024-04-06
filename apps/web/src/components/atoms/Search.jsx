"use client"
import { useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function Search({ search, setSearch, pls, handleSearch }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.code === 'Space') {
        document.getElementById("searchBox").focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex items-center gap-3 p-2 px-4 rounded border border-gray-200 focus-within:border-gray-400 transition-all"
    >
      <label htmlFor="search" className="text-gray-400 text-xl hover:text-gray-600 cursor-pointer">
        <FiSearch />
      </label>
      <input
        id="searchBox"
        className="outline-none bg-gray-100  text-sm w-60 font-light"
        value={search}
        onChange={(e) => {
        }}
        type="text"
        placeholder={pls || "Quick Search `` Ctrl + Space ``"}
      />
      <button type="submit" className="text-gray-500 text-xl hover:text-gray-900">
        <HiOutlineAdjustmentsHorizontal />
      </button>
    </form>
  );
}
