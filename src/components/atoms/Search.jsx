import { FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

export default function Search({ search, setSearch, pls,handleSearch }) {
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
        className="outline-none bg-gray-100  font-light"
        value={search}
        onChange={(e) => {
        }}
        type="text"
        id="search"
        placeholder={pls || "Quick Search"}
      />
      <button type="submit" className="text-gray-500 text-xl hover:text-gray-900">
        <HiOutlineAdjustmentsHorizontal />
      </button>
    </form>
  );
}
