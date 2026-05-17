import { Search } from "lucide-react";

type SearchBarProps = {
  value?: string;
  name?: string;
  placeholder?: string;
};

export function SearchBar({
  value,
  name = "keyword",
  placeholder = "키워드, 쟁점, 태그로 검색",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_20px_rgba(15,23,42,0.05)]">
      <Search className="h-4 w-4 text-slate-400" />
      <input
        type="search"
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
