export interface Purchase {
  id?: string;
  date: number;
  price: number;
  quantity: number;
}

export interface Grocery {
  id?: string;
  name: string;
  purchases: Purchase[];
}
