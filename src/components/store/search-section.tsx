"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Sample product suggestions - in real app, this would come from API
  const allSuggestions = [
    "cricket bat",
    "cricket ball",
    "cricket helmet",
    "cricket pads",
    "cricket gloves",
    "cricket stumps",
    "cricket kit",
    "cricket shoes",
    "football",
    "football boots",
    "football jersey",
    "basketball",
    "tennis racket",
    "badminton racket",
    "sports bag",
    "water bottle",
    "fitness equipment",
    "yoga mat",
    "dumbbells",
    "running shoes"
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8)); // Show max 8 suggestions
    } else {
      setSuggestions([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchTerm: string = query) => {
    const term = searchTerm.trim();
    if (term) {
      router.push(`/products?q=${encodeURIComponent(term)}`);
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative" ref={searchRef}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                placeholder="Search for products, categories, or brands..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                {query && (
                  <button
                    onClick={handleClear}
                    className="p-2 mr-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleSearch()}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-r-lg text-sm font-medium transition-all duration-300 animate-pulse shadow-lg hover:shadow-xl"
                  title="Search"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && query.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors flex items-center gap-2"
                    >
                      <Search className="h-4 w-4 text-gray-400" />
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center">
                    <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No results found</p>
                    <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
