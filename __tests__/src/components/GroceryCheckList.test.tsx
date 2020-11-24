import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';

import GroceryCheckList from "../../../src/components/GroceryCheckList";
import { Grocery } from "../../../src/types/Grocery";
import * as database from "../../../src/services/database";

describe('<Grocery Check List />', () => {
    let mockAddToPurchaseList: jest.SpyInstance<Promise<200 | 500>, [id: string | undefined]>;
    let mockInsertGrocery: jest.SpyInstance<Promise<string | null>, [name: string]>;

    beforeEach(() => {
        mockAddToPurchaseList = jest.spyOn(database, 'addToPurchaseList').mockImplementation(jest.fn());
        mockInsertGrocery = jest.spyOn(database, 'insertGrocery').mockImplementation(jest.fn());
    });

    afterEach(() => {
        mockAddToPurchaseList.mockRestore();
        mockInsertGrocery.mockRestore();
    });

    describe('Items already in purchase list', () => {
        let reload: () => void;
        let addToList: boolean;

        beforeAll(() => {
            reload = jest.fn();
            addToList = false;
        });

        describe('loads without crashing', () => {
            it('multiple elements', () => {
                const showList: Grocery[] = [
                    {
                        name: "Sabonete",
                        listId: "0",
                        listQuantity: 1,
                        purchases: [{
                            "date": 1599264000000,
                            "price": 1.34,
                            "quantity": 1
                        }]
                    },
                    {
                        listId: "1",
                        listQuantity: 3,
                        name: "Batata",
                        purchases: [{
                            "date": 1594252800000,
                            "price": 2.77,
                            "quantity": 0.5551102204408818
                        }, {
                            "date": 1595635200000,
                            "price": 1.4,
                            "quantity": 0.280561122244489
                        }, {
                            "date": 1600041600000,
                            "price": 0.87,
                            "quantity": 0.2909698996655518
                        }, {
                            "date": 1601078400000,
                            "price": 1.32,
                            "quantity": 0.44
                        }]
                    },
                    {
                        listId: "2",
                        listQuantity: 1,
                        name: "Chá",
                        purchases: [{
                            "date": 1599264000000,
                            "price": 8.99,
                            "quantity": 1
                        }, {
                            "date": 1600646400000,
                            "price": 17.98,
                            "quantity": 2
                        }]
                    }
                ];

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(1);
            });

            it('one element', () => {
                const showList: Grocery[] = [{
                    name: "Sabonete",
                    listId: "0",
                    listQuantity: 1,
                    purchases: [{
                        "date": 1599264000000,
                        "price": 1.34,
                        "quantity": 1
                    }]
                }];

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(1);
            });

            it('no elements', () => {
                const showList: Grocery[] = []

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(0);
            });
        });

    });

    describe('Items that can be added to purchase list', () => {
        let reload: () => void;
        let addToList: boolean;

        beforeAll(() => {
            reload = jest.fn();
            addToList = true;
        });

        describe('loads without crashing', () => {
            it('multiple elements', () => {
                const showList: Grocery[] = [
                    {
                        name: "Sabonete",
                        listId: "0",
                        listQuantity: 1,
                        purchases: [{
                            "date": 1599264000000,
                            "price": 1.34,
                            "quantity": 1
                        }]
                    },
                    {
                        listId: "1",
                        listQuantity: 3,
                        name: "Batata",
                        purchases: [{
                            "date": 1594252800000,
                            "price": 2.77,
                            "quantity": 0.5551102204408818
                        }, {
                            "date": 1595635200000,
                            "price": 1.4,
                            "quantity": 0.280561122244489
                        }, {
                            "date": 1600041600000,
                            "price": 0.87,
                            "quantity": 0.2909698996655518
                        }, {
                            "date": 1601078400000,
                            "price": 1.32,
                            "quantity": 0.44
                        }]
                    },
                    {
                        listId: "2",
                        listQuantity: 1,
                        name: "Chá",
                        purchases: [{
                            "date": 1599264000000,
                            "price": 8.99,
                            "quantity": 1
                        }, {
                            "date": 1600646400000,
                            "price": 17.98,
                            "quantity": 2
                        }]
                    }
                ];

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(1);
            });

            it('one element', () => {
                const showList: Grocery[] = [{
                    name: "Sabonete",
                    listId: "0",
                    listQuantity: 1,
                    purchases: [{
                        "date": 1599264000000,
                        "price": 1.34,
                        "quantity": 1
                    }]
                }];

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(1);
            });

            it('no elements', () => {
                const showList: Grocery[] = []

                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} />);
                const list = component.find({ testID: "list" });

                expect(list).toHaveLength(0);
            });
        });
    });
});