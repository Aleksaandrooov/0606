export interface itemsInter {
  data: {
    subjectID: number;
    parentID: number;
    subjectName: string;
    parentName: string;
  }[];
}
export interface charactInter {
  data: {
    charcID: number;
    subjectName: string;
    subjectID: number;
    name: string;
    required: boolean;
    unitName: string;
    maxCount: number;
    popular: boolean;
    charcType: number;
  }[];
}
