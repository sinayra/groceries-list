interface Purchase {
  date: Date;
  price: number;
  quantity: number;
}

export function createPricePerUnitArray(purchases: Purchase[]) {
  const pricesPerUnit = [];

  for (const purchase of purchases) {
    const pricePerUnit = purchase.price / purchase.quantity;
    pricesPerUnit.push(pricePerUnit);
  }

  return pricesPerUnit;
}

export function calculateMode(pricesPerUnit: number[]) {

  pricesPerUnit.sort();
  let current = {
    value: pricesPerUnit[0],
    count: 1,
  };
  let best = {
    value: 0,
    count: 0,
  };

  for (let i = 1; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] != current.value) {
      if (current.value > best.value) {
        best = current;
      }

      current.value = pricesPerUnit[i];
      current.count = 1;
    } else {
      current.count++;
    }
  }

  if (current.value > best.value) {
    best = current;
  }

  return best.value;
}

export function calculateMax(pricesPerUnit: number[]) {
  let max = 0;

  for (let i = 0; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] > max) {
      max = pricesPerUnit[i];
    }
  }

  return max;
}

export function calculateMin(pricesPerUnit: number[]) {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] < min) {
      min = pricesPerUnit[i];
    }
  }

  return min;
}

export function calculateAverage(pricesPerUnit: number[]) {
  const sum = pricesPerUnit.reduce((acc, cur) => acc + cur, 0);
  const len = pricesPerUnit.length;

  return len > 0 ? sum/len : 0;
}
