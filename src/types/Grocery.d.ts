export interface Purchase {
  date: number;
  price: number;
  quantity: number;
}

export interface Grocery {
  id: number;
  name: string;
  purchases: Purchase[];
}
