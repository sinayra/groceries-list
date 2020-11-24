import React from 'react';
import { shallow } from 'enzyme';
import { Text, ToastAndroid } from 'react-native';

import GroceryCheckList from "../../../src/components/GroceryCheckList";
import { Grocery } from "../../../src/types/Grocery";
import * as database from "../../../src/services/database";

describe('<Grocery Check List />', () => {
    let mockAddToPurchaseList: jest.SpyInstance<Promise<200 | 500>, [id: string | undefined]>;
    let mockInsertGrocery: jest.SpyInstance<Promise<string | null>, [name: string]>;
    let mockToastAndroid: jest.SpyInstance<void | null, [message: string, duration: number]>;

    beforeEach(() => {
        mockAddToPurchaseList = jest.spyOn(database, 'addToPurchaseList').mockImplementation(jest.fn());
        mockInsertGrocery = jest.spyOn(database, 'insertGrocery').mockImplementation(() => {
            const promise = new Promise<string | null>((resolve, reject) => {
                resolve("foo");
            });

            return promise;
        });

        mockToastAndroid = jest.spyOn(ToastAndroid, 'show').mockImplementation(jest.fn());
    });

    afterEach(() => {
        mockAddToPurchaseList.mockRestore();
        mockInsertGrocery.mockRestore();
        mockToastAndroid.mockRestore();
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
                        purchases: [{
                            "date": 1599264000000,
                            "price": 1.34,
                            "quantity": 1
                        }]
                    },
                    {
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
                const text = component.find(Text).getElement().props.children;

                expect(list).toHaveLength(0);
                expect(text).toBe("Não há itens na sua Lista.");
            });

            describe('has items in purchase list', () => {
                it('has elements to render', () => {
                    const showList: Grocery[] = [
                        {
                            id: "1",
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
                            id: "2",
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
                            id: "3",
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

                    const purchaseList: Grocery[] = [
                        {
                            id: "1",
                            name: "Sabonete",
                            listId: "0",
                            listQuantity: 1,
                            purchases: [{
                                "date": 1599264000000,
                                "price": 1.34,
                                "quantity": 1
                            }]
                        }
                    ];

                    const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} />);
                    const list = component.find({ testID: "list" });

                    expect(list).toHaveLength(1);
                });

                it('does not have elements to render', () => {
                    const showList: Grocery[] = [
                        {
                            id: "1",
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
                            id: "2",
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
                            id: "3",
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

                    const purchaseList: Grocery[] = [
                        {
                            id: "1",
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
                            id: "2",
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
                            id: "3",
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

                    const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} />);
                    const list = component.find({ testID: "list" });
                    const text = component.find(Text).getElement().props.children;

                    expect(list).toHaveLength(0);
                    expect(text).toBe("Não há itens na sua Lista.");
                });

                describe('search item by name', () => {
                    it('already in purchase list', () => {
                        const showList: Grocery[] = [
                            {
                                id: "1",
                                name: "Sabonete",
                                listId: "0",
                                listQuantity: 1,
                                purchases: [{
                                    "date": 1599264000000,
                                    "price": 1.34,
                                    "quantity": 1
                                }]
                            },
                        ];

                        const purchaseList: Grocery[] = [
                            {
                                id: "1",
                                name: "Sabonete",
                                listId: "0",
                                listQuantity: 1,
                                purchases: [{
                                    "date": 1599264000000,
                                    "price": 1.34,
                                    "quantity": 1
                                }]
                            }
                        ];

                        const filter = "Sabonete";

                        const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} filter={filter} />);

                        const list = component.find({ testID: "list" });
                        const text = component.find(Text).getElements();

                        const name = text[0].props.children;
                        const message = text[1].props.children;

                        expect(list).toHaveLength(0);
                        expect(name).toBe(filter);
                        expect(message).toBe(" já está na Lista de Compras.");

                    });

                    describe('not in purchase list', () => {
                        it('loads text', () => {
                            const showList: Grocery[] = [];
                            const purchaseList: Grocery[] = [];
                            const filter = "Sabonete";

                            const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} filter={filter} />);

                            const list = component.find({ testID: "list" });
                            const text = component.find(Text).getElements();

                            const name = text[1].props.children;
                            const message1 = text[0].props.children;
                            const message2 = text[2].props.children;

                            expect(list).toHaveLength(0);
                            expect(name).toBe(filter);
                            expect(message1).toBe("Gostaria de adicionar ");
                            expect(message2).toBe(" ?");

                        });

                        it('add new item', async () => {
                            const showList: Grocery[] = [];
                            const purchaseList: Grocery[] = [];
                            const filter = "Sabonete";

                            const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} filter={filter} />);

                            const add = component.find({ testID: "add" });
                            const handler = add.prop("onPress");

                            if (handler !== undefined) {
                                handler(true);
                            }

                            await expect(mockInsertGrocery).toBeCalled();
                            expect(mockAddToPurchaseList).toBeCalled();
                            expect(mockToastAndroid).not.toBeCalled();

                        });

                        describe('handle erros', () => {
                            it('database error', async () => {
                                const showList: Grocery[] = [];
                                const purchaseList: Grocery[] = [];
                                const filter = "Sabonete";
                                
                                mockInsertGrocery.mockResolvedValueOnce(null);

                                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} filter={filter} />);

                                const add = component.find({ testID: "add" });
                                const handler = add.prop("onPress");

                                if (handler !== undefined) {
                                    handler();
                                }

                                await expect(mockInsertGrocery).toBeCalled();
                                expect(mockAddToPurchaseList).not.toBeCalled();

                            });

                            it('filter error', async () => {
                                const showList: Grocery[] = [];
                                const purchaseList: Grocery[] = [];
                                const filter = "";

                                const component = shallow(<GroceryCheckList showList={showList} canBeAddedToList={addToList} reload={reload} purchaseList={purchaseList} filter={filter} />);

                                const add = component.find({ testID: "add" });
                                const handler = add.prop("onPress");

                                if (handler !== undefined) {
                                    handler();
                                }

                                await expect(mockInsertGrocery).not.toBeCalled();
                                expect(mockAddToPurchaseList).not.toBeCalled();

                            });
                        });
                    })
                });
            });
        });
    });
});