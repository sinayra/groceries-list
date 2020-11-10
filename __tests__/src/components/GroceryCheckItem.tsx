import React from 'react';
import { shallow } from 'enzyme';
import {
  Text,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import GroceryCheckItem from "../../../src/components/GroceryCheckItem";
import { Grocery } from "../../../src/types/Grocery";

describe('<AutoComplete />', () => {

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
      const reload: () => void = () => { };
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} addToList={addToList} reload={reload} />);

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
      const reload: () => void = () => { };
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} addToList={addToList} reload={reload} />);

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
      const reload: () => void = () => { };
      const addToList = false;

      const component = shallow(<GroceryCheckItem item={item} addToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(3);

      const title = text[0].props.children;
      const quantity = text[1].props.children;
      const price = text[2].props.children;

      expect(title).toContain(item.name);
      expect(quantity).toContain(item.listQuantity);
      expect(price).toContain("0.00");
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
      const reload: () => void = () => { };
      const addToList = true;

      const component = shallow(<GroceryCheckItem item={item} addToList={addToList} reload={reload} />);

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
      const reload: () => void = () => { };
      const addToList = true;

      const component = shallow(<GroceryCheckItem item={item} addToList={addToList} reload={reload} />);

      const text = component.find(Text).getElements();

      expect(text).toHaveLength(2);

      const title = text[0].props.children;
      const price = text[1].props.children;

      expect(title).toContain(item.name);
      expect(price).toContain("0.00");
    });

  });

});
