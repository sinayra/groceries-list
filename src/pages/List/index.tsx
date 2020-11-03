import React, { useState, useEffect } from "react";
import { View, SafeAreaView, TextInput, Text } from "react-native";

import PurchaseCheckList from "../../components/PurchaseCheckList";
import styles from "./styles";

import { getGroceries, getPurchaseList } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import { Variables } from "../../styles/variables";
import { createPaidPrice, calculateThresholdMode } from "../../utils/purchaseMath";

export default function List() {
    const variables = Variables();
    const [filter, setFilter] = useState("");
    const [purchaseList, setPurchaseList] = useState<Grocery[]>([]);
    const [productsList, setProductsList] = useState<Grocery[]>([]);
    const [filteredList, setFilteredList] = useState<Grocery[]>([]);

    const [total, setTotal] = useState(0);

    function calculateTotal(){
        let acc = 0;

        purchaseList.forEach((elem) => {
            const purchaseHistory = createPaidPrice(elem.purchases);
            const mode = calculateThresholdMode(purchaseHistory, 0.1);

            if(elem.listQuantity){
                acc += mode * elem.listQuantity;
            }
        });

        setTotal(acc);
    }

    async function loadFromDatabase() {
        const groceries = await getGroceries();
        const list = await getPurchaseList();
        setFilter("");

        if (groceries && list.length === 0) {
            setProductsList(groceries);
            setFilteredList(groceries);

        }

        loadPurchaseArray();
    }

    useEffect(() => {
        calculateTotal();
    }, [purchaseList]);

    useEffect(() => {
        loadFromDatabase();
    }, []);

    async function loadPurchaseArray() {
        let groceries = await getGroceries();
        const list = await getPurchaseList();
        setFilter("");

        if (list) {
            setPurchaseList(list);

            for (const item of list) {
                if (item.id) {
                    groceries = groceries.filter(grocery => grocery.id !== item.id);
                }
            }

            setFilteredList(groceries);
            setProductsList(groceries);
        }
    }


    useEffect(() => {
        if (productsList && filter.length > 0) {
            const filterLower = filter.toLowerCase();
            const filtered = productsList.filter((p) =>
                p.name.toLowerCase().includes(filterLower)
            );

            setFilteredList(filtered);
        } else {
            setFilteredList(productsList);
        }
    }, [filter]);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    ...styles.content,
                    backgroundColor: variables.BACKGROUND_COLOR,
                }}
            >
                <Text style={{ fontSize: variables.FONT_SIZE_SMALL, color: variables.TEXT_COLOR }}>Há {purchaseList.length} itens na Lista de Compras. </Text>
                <PurchaseCheckList data={purchaseList} addToList={false} reload={loadPurchaseArray} />
            </View>
            <View
                style={{
                    ...styles.priceContent,
                    backgroundColor: variables.CARD_COLOR,
                }}
            >
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE, color: variables.TEXT_COLOR }}>Total aproximado: </Text>
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE + 10, color: variables.PRIMARY_COLOR }}>€{total.toFixed(2)}</Text>
            </View>
            <View
                style={{
                    ...styles.content,
                    backgroundColor: variables.BACKGROUND_COLOR,
                }}
            >
                <TextInput
                    style={{
                        ...styles.input,
                        backgroundColor: variables.CARD_COLOR,
                        color: variables.TEXT_COLOR,
                    }}
                    value={filter}
                    onChangeText={(filter) => setFilter(filter)}
                    placeholder="Pesquisar..."
                    placeholderTextColor={variables.BORDER_COLOR}
                />

                <PurchaseCheckList data={filteredList} addToList={true} reload={loadPurchaseArray} />
            </View>

        </SafeAreaView>
    );
}
