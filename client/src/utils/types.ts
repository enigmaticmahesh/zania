export interface Doc {
  id: number;
  title: string;
  position: number;
  type: string;
  thumbnail: string;
  chosen?: boolean;
}

export interface DocsListProps {
  docs: Doc[];
}

export interface posMap {
  [key: number]: number;
}

export interface posMapTracker {
  old: posMap;
  changed: posMap;
  updated: Date | null;
}
