import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        defaultValue=""
        name="query"
        className="search-input"
        placeholder="Search Startups"
        type="text"
      />
      {query && <SearchFormReset />}
      <Button type="submit" className="search-btn text-white">
        <Search className="size-5" />
      </Button>
    </Form>
  );
};

export default SearchForm;
