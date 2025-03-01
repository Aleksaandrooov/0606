export interface OrdersInter {
  data: {
    countUnanswered: number;
    countArchive: number;
    feedbacks: [
      {
        id: string;
        text: string;
        pros: string;
        cons: string;
        productValuation: number;
        createdDate: Date;
        state: 'wbRu' | 'none';
        userName: string;
        color: string;
        photoLinks: [{ fullSize: string; miniSize: string }];
      },
    ];
  };
}
