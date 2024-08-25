import { ReactSortable, SortableEvent } from 'react-sortablejs';
import { Card, Spin } from 'antd';
import { Doc, DocsListProps, posMapTracker } from '../../utils/types';
import { FC, useEffect, useRef, useState } from 'react';
import ImageComponent from '../image/image.component';
import { useUpdateDocsMutation } from '../../store/api.redux.slice';
import { formatDistanceToNow } from 'date-fns';
const { Meta } = Card;

const timePassed = (date: Date) =>
  formatDistanceToNow(date, { addSuffix: true });

const DocsList: FC<DocsListProps> = ({ docs: items }) => {
  const [updateDocs, { isLoading: updatingDocs }] = useUpdateDocsMutation();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const posRef = useRef<posMapTracker>({
    old: {},
    changed: {},
    updated: null,
  });
  const timerRef = useRef<number | null>(null);
  const secondsRef = useRef<number>(0);

  const handleSorting = (evt: SortableEvent) => {
    const { to } = evt;
    Array.from(to.children).forEach((item, i) => {
      const id: string = item.getAttribute('data-id') as string;
      if (posRef.current.old[+id] !== i) {
        posRef.current.changed[+id] = i;
      }
    });
  };

  const handleOverlay = (doc: Doc) => () => {
    document.dispatchEvent(
      new CustomEvent('SHOW_OVERLAY', { detail: { doc } })
    );
  };

  useEffect(() => {
    const clearTime = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
    timerRef.current = setInterval(async () => {
      secondsRef.current = secondsRef.current + 5;
      console.log({ seconds: secondsRef.current });
      if (posRef.current.updated) {
        setUpdatedAt(timePassed(posRef.current.updated));
      }

      if (Object.keys(posRef.current.changed).length) {
        const changes = posRef.current.changed;
        posRef.current.old = {
          ...posRef.current.old,
          ...posRef.current.changed,
        };
        posRef.current.changed = {};
        try {
          await updateDocs({ changes });
          posRef.current.updated = new Date();
          setUpdatedAt(timePassed(posRef.current.updated));
        } catch (error) {
          console.log('Error while updating the positions');
        }
      }
    }, 5000);

    return () => {
      clearTime();
    };
  }, []);

  useEffect(() => {
    if (items) {
      setDocs(
        items.map((item) => {
          posRef.current.old[item.id] = item.position;
          return { ...item, chosen: true };
        })
      );
    }
  }, [items]);

  const loader = updatingDocs && <Spin tip="Updating" fullscreen></Spin>;
  const updatedTime = updatedAt && <div>Updated: {updatedAt}</div>;

  const docsList = docs.map((doc) => {
    const img = <ImageComponent imgUrl={doc.thumbnail} />;
    return (
      <div
        key={doc.id}
        className="doc_container"
        data-doc-id={doc.id}
        // data-doc-pos={doc.position}
      >
        <Card
          hoverable
          style={{ width: 240 }}
          cover={img}
          className="doc_card"
          onClick={handleOverlay(doc)}
        >
          <Meta title={doc.title} />
        </Card>
      </div>
    );
  });

  return (
    <>
      {updatedTime}
      {loader}
      <ReactSortable
        list={docs}
        setList={setDocs}
        className="docs_container"
        swap={true}
        animation={150}
        swapClass="swap_container"
        onUpdate={handleSorting}
        // store={storeData}
      >
        {docsList}
      </ReactSortable>
    </>
  );
};

export default DocsList;
