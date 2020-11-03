import { Purchase } from "../types/Grocery";
import { MaxHeap } from "./modeThresholdMaxHeap";

export function createPricePerUnitArray(purchases: Purchase[]) {
  const pricesPerUnit = [];

  for (const purchase of purchases) {
    const pricePerUnit = purchase.price / purchase.quantity;
    pricesPerUnit.push(pricePerUnit);
  }

  return pricesPerUnit;
}

export function createPaidPrice(purchases: Purchase[]) {
  const pricesPerUnit = [];

  for (const purchase of purchases) {
    const pricePerUnit = purchase.quantity > 1 ? purchase.price / purchase.quantity : purchase.price;

    pricesPerUnit.push(pricePerUnit);
  }

  return pricesPerUnit;
}

export function calculateMode(pricesPerUnit: number[]) {
  
  if(pricesPerUnit.length === 0){
    return 0;
  }

  pricesPerUnit.sort();

  let current = {
    value: pricesPerUnit[0],
    n: 1,
  };
  let best = {
    value: 0,
    n: 0,
  };

  for (let i = 1; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] != current.value) {
      if (current.value > best.value) {
        best = current;
      }

      current.value = pricesPerUnit[i];
      current.n = 1;
    } else {
      current.n++;
    }
  }

  if (current.value > best.value) {
    best = current;
  }

  return best.value;
}

export function calculateThresholdMode(
  pricesPerUnit: number[],
  threshold: number
) {
  const thresholdPrices = new MaxHeap();

  if(pricesPerUnit.length === 0){
    return 0;
  }
  pricesPerUnit.sort();

  let i = 0;
  while (i < pricesPerUnit.length) {
    let priceSum = pricesPerUnit[i];
    let n = 1;

    let j = i + 1;
    while (j < pricesPerUnit.length) {
      const porcentIncreseadPrice = 1 - pricesPerUnit[i] / pricesPerUnit[j];

      if (porcentIncreseadPrice <= threshold) {
        priceSum += pricesPerUnit[j];
        n++;
        j++;
      } else {
        break;
      }
    }

    const elem = priceSum / n;
    thresholdPrices.insert(elem, n);

    i += n;
  }

  return thresholdPrices.getMax();
}

export function calculateMedian(pricesPerUnit: number[]) {
  let median = 0;
  
  if(pricesPerUnit.length === 0){
    return 0;
  }

  const halfIndex = Math.round(pricesPerUnit.length / 2);

  if (halfIndex > 0) {
    pricesPerUnit.sort();
    median = pricesPerUnit[halfIndex - 1];
  } else {
    if (pricesPerUnit.length === 1) {
      median = pricesPerUnit[0];
    }
  }

  return median;
}

export function calculateMax(pricesPerUnit: number[]) {
  let max = 0;

  if(pricesPerUnit.length === 0){
    return 0;
  }

  for (let i = 0; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] > max) {
      max = pricesPerUnit[i];
    }
  }

  return max;
}

export function calculateMin(pricesPerUnit: number[]) {
  let min = Number.MAX_SAFE_INTEGER;

  if(pricesPerUnit.length === 0){
    return 0;
  }

  for (let i = 0; i < pricesPerUnit.length; i++) {
    if (pricesPerUnit[i] < min) {
      min = pricesPerUnit[i];
    }
  }

  return min;
}

export function calculateAverage(pricesPerUnit: number[]) {

  if(pricesPerUnit.length === 0){
    return 0;
  }

  const sum = pricesPerUnit.reduce((acc, cur) => acc + cur, 0);
  const len = pricesPerUnit.length;

  return len > 0 ? sum / len : 0;
}
