import { Api } from '@/app/services/ApiClient';
import { charactInter, itemsInter } from '@/app/services/dto/adminSearchDto';
import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

export const ProductFetch = (focus: boolean, itemsSearch: string, clearCharact: () => void) => {
  const [items, setItems] = useState<itemsInter>({ data: [] });
  const [characs, setCharacs] = useState<charactInter>({ data: [] });
  useDebounce(
    () => {
      async function fetchItems() {
        const data = await Api.searchItems.searchFetchItems(itemsSearch);
        setItems(data);
      }
      fetchItems();
      clearCharact();
    },
    300,
    [itemsSearch],
  );

  useEffect(() => {
    if (!focus && items.data.length) {
      async function fetchCharact() {
        const data = await Api.searchItems.seatchFetchCharact(
          String(items.data.find((obj) => obj)?.subjectID),
        );
        setCharacs(data);
      }
      fetchCharact();
    }
  }, [items, focus]);

  return {
    characs,
    items,
  };
};
