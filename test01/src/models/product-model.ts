export type IDType = number;

export enum Category {
  Computers = 1,
  Phones = 2,
  Accessories,
  Software,
}

export class CreateProductDto {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: Category,
    public image: string,
    public tags: string[]
  ) {}
}

export class Product extends CreateProductDto {
  static className = "Product";
  public id: IDType = 0;
}
