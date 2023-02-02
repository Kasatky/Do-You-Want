export type DiaryNote = {
  id: number;
  situation: string;
  emotion: string;
  mind: string;
  action: string;
  createdAt: string;
};

export type DiaryState = {
  notes: DiaryNote[];
  error: string | undefined;
};
