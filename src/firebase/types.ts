import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type WithId<T extends DocumentData = DocumentData> = T & {
  id: string;
};

export const toWithId = <T extends DocumentData = DocumentData>(
  snap: QueryDocumentSnapshot<T>
): WithId<T> => {
  return {
    ...snap.data(),
    id: snap.id,
  };
};
