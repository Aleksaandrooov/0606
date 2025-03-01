export type deliveryType = 'address' | 'pointOfIssue';
export type nameType = 'name' | 'surname' | 'patronymic' | 'number';
export interface charactInter {
  name: string;
  id?: number;
  type: string;
}
export interface sizesInter {
  techSize: string;
  wbSize: string;
  price: number;
}

export interface fetchCreateProductInter {
  subjectID: number;
  variants: {
    vendorCode: string;
    title: string;
    description: string;
    brand: string;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    characteristics: {
      id: number;
      value: number | string;
    }[];
    sizes: {
      techSize: string;
      wbSize: string;
      price: number;
    }[];
  };
}
export type nameValueForm = 'default' | 'wb';
