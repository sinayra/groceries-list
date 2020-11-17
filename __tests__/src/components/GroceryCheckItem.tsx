import React from 'react';
import { shallow } from 'enzyme';
import {
  Text,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import GroceryCheckItem from "../../../src/components/GroceryCheckItem";
import { Grocery } from "../../../src/types/Grocery";
import * as database from "../../../src/services/database";

describe('<AutoComplete />', () => {
  let mockAdd: jest.SpyInstance<Promise<200 | 500>, [id: string | undefined]>;
  let mockRemove: jest.SpyInstance<Promise<200 | 500>, [idList: string | undefined]>;
  let mockQuantity: jest.SpyInstance<Promise<200 | 500>, [idList: string | undefined, quantity: number]>;

  beforeEach(() => {
    mockAdd = jest.spyOn(database, 'addToPurchaseList').mockImplementation(jest.fn());
    mockRemove = jest.spyOn(database, 'removeFromPurchaseList').mockImplementation(jest.fn());
    mockQuantity = jest.spyOn(database, 'setQuantity').mockImplementation(jest.fn());
  });

  afterEach(() => {
    mockRemove.mockRestore();
    mockAdd.mockRestore();
    mockQuantity.mockRestore();
  });

  describe('Item in the purchase list', () => {
    it('Load text', async () => {
      const item: Grocery = {
        name: "Sabonete",
        listId: "0",
        listQuantity: 1,
        purchases: [{
          "date": 1599264000000,
          "price": 1.34,
          "quantity": 1
        }]
      }
      const reload = jest.fn();
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(3);

      const title = text[0].props.children;
      const quantity = text[1].props.children;
      const price = text[2].props.children;

      expect(title).toContain(item.name);
      expect(quantity).toContain(item.purchases[0].quantity);
      expect(price).toContain(item.purchases[0].price.toFixed(2));
    });

    it('Calculate new price based on list quantity', async () => {
      const item: Grocery = {
        name: "Sabonete",
        listId: "0",
        listQuantity: 2,
        purchases: [{
          "date": 1599264000000,
          "price": 1.34,
          "quantity": 1
        }]
      }
      const reload = jest.fn();
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(3);

      const title = text[0].props.children;
      const quantity = text[1].props.children;
      const price = text[2].props.children;

      expect(title).toContain(item.name);
      expect(quantity).toContain(item.listQuantity);
      expect(price).toContain("2.68");
    });

    it('Empty purchases', async () => {
      const item: Grocery = {
        name: "Sabonete",
        listId: "0",
        listQuantity: 1,
        purchases: []
      }
      const reload = jest.fn();
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(3);

      const title = text[0].props.children;
      const quantity = text[1].props.children;
      const price = text[2].props.children;

      expect(title).toContain(item.name);
      expect(quantity).toContain(item.listQuantity);
      expect(price).toContain("0.00");
    });

    it('Handle Add to List', async () => {
      const item: Grocery = {
        name: "Sabonete",
        listId: "0",
        listQuantity: 1,
        purchases: [{
          "date": 1599264000000,
          "price": 1.34,
          "quantity": 1
        }]
      }
      const reload = jest.fn();
      const addToList = false;

      

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);
      const checkbox = component.find(CheckBox);

      const handler = checkbox.prop("onValueChange");
      const value = checkbox.prop("value");

      if (handler && value !== undefined) {
        handler(!value);
      }

      expect(mockRemove).toBeCalled();
      expect(mockAdd).not.toBeCalled();
      expect(reload).toBeCalled();

    });
  });

  describe('Item not in the purchase list', () => {
    it('Load text', async () => {
      const item: Grocery = {
        name: "Sabonete",
        purchases: [{
          "date": 1599264000000,
          "price": 1.34,
          "quantity": 1
        }]
      }
      const reload = jest.fn();
      const addToList = true;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(2);

      const title = text[0].props.children;
      const price = text[1].props.children;

      expect(title).toContain(item.name);
      expect(price).toContain(item.purchases[0].price.toFixed(2));
    });

    it('Empty purchases', async () => {
      const item: Grocery = {
        name: "Sabonete",
        purchases: []
      }
      const reload = jest.fn();
      const addToList = true;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);
      const text = component.find(Text).getElements();

      expect(text).toHaveLength(2);

      const title = text[0].props.children;
      const price = text[1].props.children;

      expect(title).toContain(item.name);
      expect(price).toContain("0.00");
    });

    it('Handle Add to List', async () => {
      const item: Grocery = {
        name: "Sabonete",
        purchases: [{
          "date": 1599264000000,
          "price": 1.34,
          "quantity": 1
        }]
      }
      const reload = jest.fn();
      const addToList = true;

      const component = shallow(<GroceryCheckItem item={item} canBeAddedToList={addToList} reload={reload} />);
      const checkbox = component.find(CheckBox);

      const handler = checkbox.prop("onValueChange");
      const value = checkbox.prop("value");

      if (handler && value !== undefined) {
        handler(!value);
      }

      expect(mockAdd).toBeCalled();
      expect(mockRemove).not.toBeCalled();
      expect(reload).toBeCalled();

    });

  });

});
