import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

import { addToPurchaseList, removeFromPurchaseList, setQuantity } from "../../services/database";
import { createPaidPrice, calculateThresholdMode } from "../../utils/purchaseMath";

import styles from "./styles";

import { Variables } from "../../styles/variables";
import { Grocery } from "../../types/Grocery";

const PurchaseCheckItem = ({ item, addToList, reload }: { item: Grocery, addToList: boolean, reload: () => void }) => {
    const variables = Variables();
    const [check] = useState(!addToList);
    const [price, setPrice] = useState(0);

    const { name } = item;

    function calculatePrice(quantity?: number){
        const purchaseHistory = createPaidPrice(item.purchases);
        const mode = calculateThresholdMode(purchaseHistory, 0.1);

        if (quantity && quantity > 0) {
            setPrice(mode * quantity);
        }
        else{
            setPrice(mode);
        }
    }

    useEffect(() => {
        calculatePrice(item.listQuantity);
    }, []);


    function handleAddToList(value: boolean) {
        if (value === true) {
            addToPurchaseList(item.id);
        }
        else {
            removeFromPurchaseList(item.listId);
        }

        reload();
    }

    function handleQuantity(increment: boolean) {
        if (item.listQuantity) {
            if (increment) {
                setQuantity(item.listId, item.listQuantity + 1);
                calculatePrice(item.listQuantity + 1)
            }
            else {
                if (item.listQuantity > 1) {
                    setQuantity(item.listId, item.listQuantity - 1);
                    calculatePrice(item.listQuantity - 1)
                }
                else {
                    removeFromPurchaseList(item.listId);
                }
            }
            reload();
        }
    }

    return (
        <View style={{ ...styles.container, opacity: addToList ? 0.5 : 1 }}>
            <View style={styles.checkbox}>
                <CheckBox
                    disabled={false}
                    value={check}
                    onValueChange={(value) => handleAddToList(value)}
                />
                <View style={styles.textItem}>
                    <View>
                        <Text
                            style={{
                                ...styles.title,
                                color: variables.TEXT_COLOR,
                                fontSize: variables.FONT_SIZE_LARGE,
                            }}
                        >
                            {name}

                        </Text>
                    </View>
                </View>
            </View>

            {addToList === false &&
                <View style={styles.quantity}>
                    <TouchableOpacity onPress={() => handleQuantity(true)}>
                        <FontAwesome name="plus-circle" size={variables.FONT_SIZE_LARGE + 10} color={variables.TEXT_COLOR} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>x{item.listQuantity}</Text>

                    <TouchableOpacity onPress={() => handleQuantity(false)}>
                        <FontAwesome name="minus-circle" size={variables.FONT_SIZE_LARGE + 10} color={variables.TEXT_COLOR} />
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.price}>
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE, color: variables.TEXT_COLOR, opacity: 0.5 }}>+ €{price.toFixed(2)}</Text>
            </View>

        </View>
    );
};

export default PurchaseCheckItem;
