import { MaxHeap } from "../../../src/utils/modeThresholdMaxHeap"

describe('ModeThresholdMaxHeap', () => {

    it('Get max from empty heap', () => {
        let maxHeap = new MaxHeap();
        const value = maxHeap.getMax();

        expect(value).toBeUndefined();
    });

    it('Insert one element and get max', () => {
        let maxHeap = new MaxHeap();

        maxHeap.insert(5, 1);
        const value = maxHeap.getMax();

        expect(value).toBe(5);
    });

    it('Insert five elements and get max', () => {
        let maxHeap = new MaxHeap();

        maxHeap.insert(5, 1);
        maxHeap.insert(3, 2);
        maxHeap.insert(10, 2);
        maxHeap.insert(1, 5); //this is the element with the most repetitions
        maxHeap.insert(2, 1);
        const value = maxHeap.getMax();

        expect(value).toBe(1);
    });
});

