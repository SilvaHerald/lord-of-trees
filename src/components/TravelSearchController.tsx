import { useEffect, useState } from 'react';
import TravelSearch, { type TravelSearchPost } from './TravelSearch';
import { defaultLang, type Language } from '@libs/i18n/config';
import MobileSearchModal from './MobileSearchModal';

type Props = {
  searchData: TravelSearchPost[];
  lang?: Language;
};

export default function TravelSearchController({ searchData, lang = defaultLang }: Props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const onKeyDown = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape') closeModal();
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-open-search]')) openModal();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, []);

  if (!open) {
    // nothing mounted
    return <></>;
  }

  return isMobile ? (
    <MobileSearchModal
      open={open}
      onClose={() => setOpen(false)}
      searchData={searchData}
      lang={lang}
    />
  ) : (
    <TravelSearch lang={lang} open={open} onClose={() => setOpen(false)} searchData={searchData} />
  );
}
