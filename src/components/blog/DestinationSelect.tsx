import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Option = {
  value: string;
  label: string;
};

type Group = {
  label: string;
  icon: string;
  options: Option[];
};

interface DestinationSelectProps {
  allLabel: string;
  countries: string[];
  destinations: string[];
}

type PanelPosition = {
  top: number;
  left: number;
  width: number;
};

const DestinationSelect = ({ allLabel, countries, destinations }: DestinationSelectProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [panelPos, setPanelPos] = useState<PanelPosition | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const groups: Group[] = [
    {
      label: 'Countries',
      icon: '🌍',
      options: countries.map(c => ({
        value: `country:${c}`,
        label: c,
      })),
    },
    {
      label: 'Cities & Places',
      icon: '📍',
      options: destinations.map(d => ({
        value: `destination:${d}`,
        label: d,
      })),
    },
    {
      label: 'Regions',
      icon: '🗺️',
      options: [
        { value: 'region:asia', label: 'Asia' },
        { value: 'region:europe', label: 'Europe' },
        { value: 'region:america', label: 'Americas' },
        { value: 'region:africa', label: 'Africa' },
        { value: 'region:oceania', label: 'Oceania' },
      ],
    },
    {
      label: 'Trip Types',
      icon: '🏷️',
      options: [
        { value: 'type:solo', label: 'Solo Travel' },
        { value: 'type:adventure', label: 'Adventure' },
        { value: 'type:cultural', label: 'Cultural' },
        { value: 'type:nature', label: 'Nature & Wildlife' },
        { value: 'type:food', label: 'Food & Culinary' },
        { value: 'type:luxury', label: 'Luxury' },
        { value: 'type:budget', label: 'Budget Travel' },
      ],
    },
  ];

  const flatOptions = groups.flatMap(g => g.options);
  const selected = flatOptions.find(o => o.value === value) ?? null;

  // Calculate panel position when opened, and on scroll/resize
  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPanelPos({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger && !panel) return;

      const target = e.target as Node;

      const clickInsideTrigger = !!trigger && trigger.contains(target);
      const clickInsidePanel = !!panel && panel.contains(target);

      if (!clickInsideTrigger && !clickInsidePanel) {
        setOpen(false);
      }
    }

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [open]);

  function notifyFilter(val: string | null) {
    if (typeof window === 'undefined') return;

    if (!val) {
      window.dispatchEvent(
        new CustomEvent('destinationFilterChange', {
          detail: { type: null, value: '' },
        })
      );
      return;
    }

    const [type, rawValue] = val.split(':');
    window.dispatchEvent(
      new CustomEvent('destinationFilterChange', {
        detail: { type, value: rawValue },
      })
    );
  }

  function handleSelect(val: string | null) {
    setValue(val);
    setOpen(false);
    notifyFilter(val);
  }

  // Render dropdown panel in a portal
  const dropdownPanel =
    open && panelPos
      ? createPortal(
          <div
            ref={panelRef}
            role="listbox"
            style={{
              position: 'fixed',
              top: panelPos.top,
              left: panelPos.left,
              width: panelPos.width,
              zIndex: 9999,
            }}
            className="max-h-80 overflow-y-auto rounded-xl bg-slate-900/95 text-sm text-white shadow-2xl backdrop-blur-sm"
          >
            <button
              type="button"
              className={`flex w-full items-center px-4 py-2 text-left hover:bg-white/10 ${
                value === null ? 'bg-amber-500/80 text-slate-900' : ''
              }`}
              onClick={() => handleSelect(null)}
            >
              {allLabel}
            </button>

            {groups.map(group => (
              <div key={group.label} className="border-t border-white/5">
                <div className="bg-slate-800/90 px-4 py-2 text-xs font-semibold tracking-wide text-amber-300 uppercase">
                  <span className="mr-1">{group.icon}</span>
                  {group.label}
                </div>
                {group.options.map(opt => {
                  const isSelected = opt.value === value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      className={`flex w-full items-center px-4 py-2 text-left hover:bg-white/10 ${
                        isSelected ? 'bg-slate-700' : ''
                      }`}
                      onClick={() => handleSelect(opt.value)}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div ref={triggerRef} className="relative w-full">
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-full border border-white/20 bg-white/10 px-4 py-3 pr-10 text-left text-slate-900 backdrop-blur-sm focus:border-transparent focus:bg-white/20 focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white"
          onClick={() => setOpen(o => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="truncate">{selected ? selected.label : allLabel}</span>

          {/* arrow icon */}
          <svg
            className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M19 12H5m0 0l4-4m-4 4l4 4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {dropdownPanel}
    </>
  );
};

export default DestinationSelect;
