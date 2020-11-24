import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

import { addToPurchaseList, removeFromPurchaseList, setQuantity } from "../../services/database";
import { createPaidPriceArray, calculateThresholdMode } from "../../utils/purchaseMath";

import styles from "./styles";

import { Variables } from "../../styles/variables";
import { Grocery } from "../../types/Grocery";

interface GroceryCheckItemProps {
    item: Grocery;
    canBeAddedToList: boolean;
    reload: () => void;
}

const GroceryCheckItem: React.FC<GroceryCheckItemProps> = ({ item, canBeAddedToList, reload }) => {
    const variables = Variables();
    const [check] = useState(item.listId ? true : false);
    const [price, setPrice] = useState(0);

    const { name } = item;

    function calculatePrice(quantity?: number) {
        const purchaseHistory = createPaidPriceArray(item.purchases);
        const mode = calculateThresholdMode(purchaseHistory, 0.1);

        if (mode) {
            if (quantity && quantity > 0) {
                setPrice(mode * quantity);
            }
            else {
                setPrice(mode);
            }
        }
    }

    useEffect(() => {
        calculatePrice(item.listQuantity);
    }, []);


    async function handleAddToList(value: boolean) {
        if (value === true) {
            await addToPurchaseList(item.id);
        }
        else {
            await removeFromPurchaseList(item.listId);
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
        <View style={{ ...styles.container, opacity: canBeAddedToList ? 0.5 : 1 }}>
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

            {canBeAddedToList === false &&
                <View style={styles.quantity} testID="cannotBeAddToList">
                    <TouchableOpacity onPress={() => handleQuantity(true)} testID="add">
                        <FontAwesome name="plus-circle" size={variables.FONT_SIZE_LARGE + 10} color={variables.TEXT_COLOR} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>x{item.listQuantity}</Text>

                    <TouchableOpacity onPress={() => handleQuantity(false)} testID="sub">
                        <FontAwesome name="minus-circle" size={variables.FONT_SIZE_LARGE + 10} color={variables.TEXT_COLOR} />
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.price} testID="price">
                <Text style={{ fontSize: variables.FONT_SIZE_LARGE, color: variables.TEXT_COLOR, opacity: 0.5 }}>+ €{price.toFixed(2)}</Text>
            </View>

        </View>
    );
};

export default GroceryCheckItem;
