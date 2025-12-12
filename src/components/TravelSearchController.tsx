import { useEffect, useState } from 'react';
import TravelSearch, { type TravelSearchPost } from './TravelSearch';

type Props = {
  searchData: TravelSearchPost[];
};

export default function TravelSearchController({ searchData }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    // 1) Keyboard: Cmd/Ctrl + K
    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape') closeModal();
    };

    // 2) Click your existing search button(s)
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // open if clicked element (or parent) has [data-open-search]
      if (target.closest('[data-open-search]')) openModal();
    };

    // 3) Optional: expose global functions (handy)
    (window as any).openSearch = openModal;
    (window as any).closeSearch = closeModal;

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, []);

  // lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return <TravelSearch searchData={searchData} open={open} onClose={() => setOpen(false)} />;
}
