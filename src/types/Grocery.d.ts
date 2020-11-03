export interface Purchase {
  id?: string;
  date: number;
  price: number;
  quantity: number;
}

export interface Grocery {
  listId?: string;
  listQuantity?: number,
  id?: string;
  name: string;
  purchases: Purchase[];
}
