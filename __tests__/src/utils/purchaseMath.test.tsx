import { calculateMode, calculateThresholdMode, calculateMedian, calculateMax, calculateMin, calculateAverage, createPricePerUnitArray, createPaidPriceArray } from "../../../src/utils/purchaseMath";
import { Purchase } from "../../../src/types/Grocery";

describe('Purchase Math', () => {

    describe('Calculate mode', () => {
        describe('Multiple elements', () => {
            it('First', () => {
                const arr: number[] = [3, 2, 1, 1, 3, 2, 1, 1, 5, 6];
                const value = calculateMode(arr);

                expect(value).toBe(1);
            });

            it('Middle', () => {
                const arr: number[] = [3, 2, 1, 3, 3, 2, 3, 1, 5, 6];
                const value = calculateMode(arr);

                expect(value).toBe(3);
            });

            it('End', () => {
                const arr: number[] = [3, 2, 1, 6, 6, 2, 6, 1, 5, 6];
                const value = calculateMode(arr);

                expect(value).toBe(6);
            });
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateMode(arr);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateMode(arr);

            expect(value).toBe(0);
        });
    });

    describe('Calculate threshold mode', () => {
        describe('Multiple elements', () => {

            it('First', () => {
                const arr: number[] = [1.0, 1.2, 1.1, 3.5, 2.0, 1.05, 2.05, 5.3, 1.12, 0.97];
                const value = calculateThresholdMode(arr, 0.25);

                expect(value).toBeCloseTo(1.07);
            });

            it('Middle', () => {
                const arr: number[] = [1.0, 1.2, 1.1, 3.5, 2.0, 1.8, 2.05, 5.3, 1.7, 1.9];
                const value = calculateThresholdMode(arr, 0.25);

                expect(value).toBeCloseTo(1.89);
            });

            it('End', () => {
                const arr: number[] = [1.0, 5.0, 5.5, 3.5, 2.0, 5.05, 5.25, 5.3, 1.12, 0.97];
                const value = calculateThresholdMode(arr, 0.25);

                expect(value).toBeCloseTo(5.22);
            });
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateThresholdMode(arr, 0.25);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateThresholdMode(arr, 0.25);

            expect(value).toBe(0);
        });
    });

    describe('Calculate median', () => {
        describe('Multiple elements', () => {

            it('Odd', () => {
                const arr: number[] = [5, 3, 1, 2, 4];
                const value = calculateMedian(arr);

                expect(value).toBe(3);
            });

            it('Even', () => {
                const arr: number[] = [3, 1, 2, 4];
                const value = calculateMedian(arr);

                expect(value).toBe(2);
            });
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateMedian(arr);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateMedian(arr);

            expect(value).toBe(0);
        });
    });

    describe('Calculate average', () => {
        describe('Multiple elements', () => {

            it('Odd', () => {
                const arr: number[] = [5, 3, 1, 2, 4];
                const value = calculateAverage(arr);

                expect(value).toBe(3);
            });

            it('Even', () => {
                const arr: number[] = [3, 1, 2, 4];
                const value = calculateAverage(arr);

                expect(value).toBe(2.5);
            });
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateAverage(arr);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateAverage(arr);

            expect(value).toBe(0);
        });
    });

    describe('Calculate max', () => {

        it('Multiple elements', () => {
            const arr: number[] = [1, 5, 4, 7, 10, 2, 6, 3, 9, 8];
            const value = calculateMax(arr);

            expect(value).toBe(10);
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateMax(arr);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateMax(arr);

            expect(value).toBe(0);
        });
    });

    describe('Calculate min', () => {

        it('Multiple elements', () => {
            const arr: number[] = [1, 5, 4, 7, 10, 2, 6, 3, 9, 8];
            const value = calculateMin(arr);

            expect(value).toBe(1);
        });

        it('One element', () => {
            const arr: number[] = [1];
            const value = calculateMin(arr);

            expect(value).toBe(1);
        });

        it('Empty array', () => {
            const arr: number[] = [];
            const value = calculateMin(arr);

            expect(value).toBe(0);
        });
    });

    describe('Create Price Per Unit Array', () => {

        it('Multiple elements', () => {
            const arr: Purchase[] = [
                {
                    "date": 1599264000000,
                    "price": 11.18,
                    "quantity": 2
                }, {
                    "date": 1599955200000,
                    "price": 10.38,
                    "quantity": 2
                }, {
                    "date": 1600041600000,
                    "price": 10.38,
                    "quantity": 2
                }, {
                    "date": 1600646400000,
                    "price": 11.18,
                    "quantity": 2
                },
                {
                    "date": 1599264000000,
                    "price": 7.78,
                    "quantity": 2
                }, {
                    "date": 1600646400000,
                    "price": 3.89,
                    "quantity": 1
                },
                {
                    "date": 1595635200000,
                    "price": 1.5,
                    "quantity": 0.5
                }

            ];

            const expected: number[] = [5.59, 5.19, 5.19, 5.59, 3.89, 3.89, 3];
            const value = createPricePerUnitArray(arr);

            expect(value).toStrictEqual(expected);
        });

        describe('One element', () => {
            it('Quantity 1', () => {
                const arr: Purchase[] = [
                    {
                        "date": 1600646400000,
                        "price": 3.89,
                        "quantity": 1
                    },


                ];
                const expected: number = 3.89;
                const value = createPricePerUnitArray(arr);

                expect(value).toContainEqual(expected)
            });

            it('Quantity n', () => {
                const arr: Purchase[] = [
                    {
                        "date": 1595635200000,
                        "price": 1.5,
                        "quantity": 0.5
                    },
                ];
                const expected: number = 3;
                const value = createPricePerUnitArray(arr);

                expect(value).toContainEqual(expected);
            });
        });


        it('Empty array', () => {
            const arr: Purchase[] = [];
            const value = createPricePerUnitArray(arr);

            expect(value).toHaveLength(0);
        });
    });

    describe('Create Paid Price Array', () => {

        it('Multiple elements', () => {
            const arr: Purchase[] = [
                {
                    "date": 1599264000000,
                    "price": 11.18,
                    "quantity": 2
                }, {
                    "date": 1599955200000,
                    "price": 10.38,
                    "quantity": 2
                }, {
                    "date": 1600041600000,
                    "price": 10.38,
                    "quantity": 2
                }, {
                    "date": 1600646400000,
                    "price": 11.18,
                    "quantity": 2
                },
                {
                    "date": 1599264000000,
                    "price": 7.78,
                    "quantity": 2
                }, {
                    "date": 1600646400000,
                    "price": 3.89,
                    "quantity": 1
                },
                {
                    "date": 1595635200000,
                    "price": 1.5,
                    "quantity": 0.5
                }

            ];

            const expected: number[] = [5.59, 5.19, 5.19, 5.59, 3.89, 3.89, 1.5];
            const value = createPaidPriceArray(arr);

            expect(value).toStrictEqual(expected);
        });

        describe('One element', () => {
            it('Quantity 1', () => {
                const arr: Purchase[] = [
                    {
                        "date": 1600646400000,
                        "price": 3.89,
                        "quantity": 1
                    },


                ];
                const expected: number = 3.89;
                const value = createPaidPriceArray(arr);

                expect(value).toContainEqual(expected)
            });

            it('Quantity n', () => {
                const arr: Purchase[] = [
                    {
                        "date": 1595635200000,
                        "price": 1.5,
                        "quantity": 0.5
                    },
                ];
                const expected: number = 1.5;
                const value = createPaidPriceArray(arr);

                expect(value).toContainEqual(expected);
            });
        });


        it('Empty array', () => {
            const arr: Purchase[] = [];
            const value = createPaidPriceArray(arr);

            expect(value).toHaveLength(0);
        });
    });
});

