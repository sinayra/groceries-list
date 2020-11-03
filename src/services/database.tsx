import firebase from "./firebase";
import { Grocery, Purchase } from "../types/Grocery";

const database = firebase.database();

export async function getGroceries(): Promise<Grocery[]> {
  const promise: Promise<Grocery[]> = new Promise((resolve, reject) => {
    database.ref("/groceries").orderByChild("name").on("value", (snapshot) => {
      let groceries: Grocery[] = [];

      snapshot.forEach((elemSnapshot) => {
        let purchases: Purchase[] = [];
        const id = elemSnapshot.key ? elemSnapshot.key : undefined;
        const name = elemSnapshot.child("name").val();
        const obj = elemSnapshot.child("purchases");

        obj.forEach((purchasesSnapshot) => {
          const id = purchasesSnapshot.key ? purchasesSnapshot.key : undefined;
          const date = purchasesSnapshot.child("date").val();
          const price = purchasesSnapshot.child("price").val();
          const quantity = purchasesSnapshot.child("quantity").val();

          purchases.push({ id, date, price, quantity });
        });

        groceries.push({ id, name, purchases });
      });

      resolve(groceries);
    });
  });

  return promise;
}

export async function getPurchases(id: string): Promise<Purchase[]> {
  const promise: Promise<Purchase[]> = new Promise((resolve, reject) => {
    database.ref(`/groceries/${id}/purchases/`).on("value", (snapshot) => {
      let purchases: Purchase[] = [];

      snapshot.forEach((elemSnapshot) => {
        const id = elemSnapshot.key ? elemSnapshot.key : undefined;
        const date = elemSnapshot.child("date").val();
        const price = elemSnapshot.child("price").val();
        const quantity = elemSnapshot.child("quantity").val();

        purchases.push({ id, date, price, quantity });
      });

      resolve(purchases);
    });
  });

  return promise;
}

export async function setGroceries(
  id: string | undefined,
  name: string,
  date: number,
  price: number,
  quantity: number
) {
  let grocery: string | null | undefined = id;

  if (grocery === undefined) {
    grocery = (await database.ref("/groceries").push()).key;

    if (grocery !== null) {
      database.ref(`groceries/${grocery}`).set({
        name,
        purchases: {},
      });
    }
  }

  if (grocery !== null) {
    const newPurchase = (await database.ref(`groceries/${grocery}`).push()).key;

    database.ref(`groceries/${grocery}/purchases/${newPurchase}`).set({
      date,
      price,
      quantity,
    });

    return 200;
  } else {
    return 500;
  }
}

export async function deleteGroceries(
  idGrocery: string,
  idPurchase: string | null = null
) {
  if (idPurchase === null) {
    await database.ref(`/groceries/${idGrocery}`).remove();
  } else {
    await database
      .ref(`/groceries/${idGrocery}/purchases/${idPurchase}`)
      .remove();
  }

  return 200;
}

export async function getPurchaseList(): Promise<Grocery[]> {
  const promise: Promise<Grocery[]> = new Promise((resolve, reject) => {
    database.ref("/list").on("value", (snapshot) => {
      let groceries: Grocery[] = [];

      snapshot.forEach((listId) => {

        const id = listId.key ? listId.key : undefined;
        const groceryId = listId.child("id").val();
        const groceryQuantity = listId.child("quantity").val();

        database.ref(`/groceries/${groceryId}`).on("value", (grocery) => {
          let purchases: Purchase[] = [];
          const name = grocery.child("name").val();
          const obj = grocery.child("purchases");

          obj.forEach((purchasesSnapshot) => {
            const purchaseId = purchasesSnapshot.key ? purchasesSnapshot.key : undefined;
            const date = purchasesSnapshot.child("date").val();
            const price = purchasesSnapshot.child("price").val();
            const quantity = purchasesSnapshot.child("quantity").val();

            purchases.push({ id: purchaseId, date, price, quantity });
          });

          groceries.push({ listQuantity: groceryQuantity, listId: id, id: groceryId, name, purchases });
        });


      });

      resolve(groceries);
    });

  });

  return promise;
}

export async function addToPurchaseList(
  id: string | undefined,
) {
  if (id) {
    const key = (await database.ref(`/list/${id}`).push()).key;
    database.ref(`list/${key}`).set({
      id,
      quantity: 1,
    });
    return 200;
  } else {
    return 500;
  }
}

export async function setQuantity(
  idList: string | undefined,
  quantity: number
) {
  if (idList) {
    database.ref(`/list/${idList}`).update({
      quantity: quantity,
    });
    return 200;
  } else {
    return 500;
  }
}

export async function removeFromPurchaseList(
  id: string | undefined,
) {
  if (id) {
    await database.ref(`/list/${id}`).remove();

    return 200;
  } else {
    return 500;
  }
}
