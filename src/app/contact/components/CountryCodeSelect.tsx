"use client";

import {
  KeyboardEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js/mobile";

export interface CountryOption {
  code: CountryCode;
  name: string;
  callingCode: string;
}

// Izh Tech has offices in India and the UAE, so these are listed first
const PINNED_COUNTRIES: CountryCode[] = ["IN", "AE"];

const FALLBACK_OPTIONS: CountryOption[] = [
  { code: "IN", name: "India", callingCode: "91" },
  { code: "AE", name: "United Arab Emirates", callingCode: "971" },
];

function buildCountryOptions(): CountryOption[] {
  const names = new Intl.DisplayNames(["en"], { type: "region" });

  return getCountries()
    .map((code) => ({
      code,
      name: names.of(code) ?? code,
      callingCode: getCountryCallingCode(code),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

const subscribeToNothing = () => () => {};

// Country names come from the browser, so the full list is only built client-side
// (server and browser can word some names differently, which would break hydration)
export function useCountryOptions() {
  const isClient = useSyncExternalStore(subscribeToNothing, () => true, () => false);
  return useMemo(() => (isClient ? buildCountryOptions() : FALLBACK_OPTIONS), [isClient]);
}

// Calling codes shared by several countries: the main one is listed first when searching by code
const MAIN_COUNTRY_FOR_CODE: Record<string, CountryCode> = {
  "1": "US",
  "7": "RU",
  "39": "IT",
  "44": "GB",
  "47": "NO",
  "61": "AU",
  "212": "MA",
  "262": "RE",
  "290": "SH",
  "358": "FI",
  "590": "GP",
  "599": "CW",
};

function searchRank(option: CountryOption, term: string) {
  if (option.callingCode === term) {
    return MAIN_COUNTRY_FOR_CODE[term] === option.code ? 0 : 1;
  }
  return option.name.toLowerCase().startsWith(term) ? 2 : 3;
}

// Matches "india", "+91", "91", "ae" or initials such as "uae" / "uk"
function filterOptions(options: CountryOption[], query: string) {
  const term = query.trim().toLowerCase().replace(/^\+/, "");

  if (!term) {
    const pinned = PINNED_COUNTRIES.map((code) => options.find((option) => option.code === code)).filter(
      (option): option is CountryOption => Boolean(option)
    );
    return [...pinned, ...options.filter((option) => !PINNED_COUNTRIES.includes(option.code))];
  }

  return options
    .filter((option) => {
      const initials = option.name
        .split(/[\s-]+/)
        .map((word) => word[0])
        .join("")
        .toLowerCase();

      return (
        option.name.toLowerCase().includes(term) ||
        option.callingCode.startsWith(term) ||
        option.code.toLowerCase() === term ||
        (term.length >= 2 && initials === term)
      );
    })
    .sort((a, b) => searchRank(a, term) - searchRank(b, term));
}

const LIST_MAX_HEIGHT = 240;
const LIST_MIN_HEIGHT = 140;
// Search box, borders and the gap between the field and the panel
const PANEL_CHROME_HEIGHT = 64;

// Room above and below the field, inside the screen and inside the nearest ancestor that
// clips its content (the page wrapper uses overflow-hidden)
function measureSpace(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  let top = 0;
  let bottom = window.innerHeight;

  for (let node = element.parentElement; node; node = node.parentElement) {
    if (getComputedStyle(node).overflowY !== "visible") {
      const clip = node.getBoundingClientRect();
      top = Math.max(top, clip.top);
      bottom = Math.min(bottom, clip.bottom);
      break;
    }
  }

  return { above: rect.top - top, below: bottom - rect.bottom };
}

interface CountryCodeSelectProps {
  value: CountryCode;
  onChange: (code: CountryCode) => void;
  options: CountryOption[];
}

export default function CountryCodeSelect({ value, onChange, options }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState({ upward: false, listHeight: LIST_MAX_HEIGHT });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const visibleOptions = useMemo(() => filterOptions(options, query), [options, query]);
  const pinnedCount = query.trim() ? 0 : PINNED_COUNTRIES.length;
  const selected = options.find((option) => option.code === value);

  function openList() {
    if (rootRef.current) {
      const { above, below } = measureSpace(rootRef.current);
      const needed = LIST_MAX_HEIGHT + PANEL_CHROME_HEIGHT;
      const upward = below < needed && above > below;
      const available = (upward ? above : below) - PANEL_CHROME_HEIGHT;

      setPlacement({
        upward,
        listHeight: Math.max(LIST_MIN_HEIGHT, Math.min(LIST_MAX_HEIGHT, available)),
      });
    }

    setQuery("");
    setActiveIndex(Math.max(0, filterOptions(options, "").findIndex((option) => option.code === value)));
    setOpen(true);
  }

  function closeList({ restoreFocus }: { restoreFocus: boolean }) {
    setOpen(false);
    if (restoreFocus) {
      triggerRef.current?.focus();
    }
  }

  function select(option: CountryOption) {
    onChange(option.code);
    closeList({ restoreFocus: true });
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    searchRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Keep the highlighted country visible while moving with the arrow keys
  useEffect(() => {
    if (open) {
      listRef.current
        ?.querySelector(`[data-index="${activeIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, visibleOptions.length - 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Enter":
        // Never submit the form from the search box
        event.preventDefault();
        if (visibleOptions[activeIndex]) {
          select(visibleOptions[activeIndex]);
        }
        break;
      case "Escape":
        event.preventDefault();
        closeList({ restoreFocus: true });
        break;
      case "Tab":
        closeList({ restoreFocus: false });
        break;
    }
  }

  return (
    <div ref={rootRef} className="relative flex shrink-0">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? closeList({ restoreFocus: false }) : openList())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            openList();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Country code: ${selected?.name ?? value} +${getCountryCallingCode(value)}`}
        className="flex items-center gap-1 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        +{getCountryCallingCode(value)}
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 z-30 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg ${
            placement.upward ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          <div className="flex items-center gap-2 border-b border-gray-200 px-3">
            <Search className="h-4 w-4 shrink-0 text-gray-400" aria-hidden="true" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search country or code"
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={visibleOptions[activeIndex] ? `${listId}-${activeIndex}` : undefined}
              className="w-full bg-transparent py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label="Country codes"
            style={{ maxHeight: placement.listHeight }}
            className="overflow-y-auto py-1"
          >
            {visibleOptions.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-500">No matching country</li>
            )}

            {visibleOptions.map((option, index) => {
              const isSelected = option.code === value;
              const isActive = index === activeIndex;

              return (
                <li
                  key={option.code}
                  id={`${listId}-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  // Keep focus in the search box while clicking
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => select(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm text-gray-900 ${
                    isActive ? "bg-gray-100" : ""
                  } ${index === pinnedCount - 1 ? "mb-1 border-b border-gray-200 pb-2" : ""}`}
                >
                  <span className={`flex-1 truncate ${isSelected ? "font-semibold" : ""}`}>
                    {option.name}
                  </span>
                  <span className="text-gray-500">+{option.callingCode}</span>
                  <Check
                    className={`h-4 w-4 shrink-0 ${isSelected ? "text-black" : "invisible"}`}
                    aria-hidden="true"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
