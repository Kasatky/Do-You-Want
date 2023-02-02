export type DiaryNote = {
  id: number | undefined;
  situation: string;
  emotion: string;
  mind: string;
  action: string;
  createdAt: string | undefined;
};

export type DiaryState = {
  notes: DiaryNote[];
  error: string | undefined;
};
