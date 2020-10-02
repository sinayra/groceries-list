export interface Purchase {
  date: number;
  price: number;
  quantity: number;
}

export interface Grocery {
  id: string;
  name: string;
  purchases: Purchase[];
}
