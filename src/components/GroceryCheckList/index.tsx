import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableHighlight, ToastAndroid, View } from "react-native";

import { addToPurchaseList, insertGrocery } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import GroceryCheckItem from "../GroceryCheckItem";
import { Variables } from "../../styles/variables";

interface GroceryCheckListProps {
    showList: Grocery[];
    purchaseList?: Grocery[];
    canBeAddedToList: boolean,
    reload: () => void;
    filter?: string
}

const GroceryCheckList: React.FC<GroceryCheckListProps> = ({ showList, purchaseList, canBeAddedToList, reload, filter }) => {
    const variables = Variables();
    const [data, setData] = useState<Grocery[]>(showList);
    const [emptyMessageOption, setEmptyMessageOption] = useState<"EXISTE" | "ADICIONAR" | "NAO EXISTE">();

    async function handleAddGrocery() {
        if (filter !== undefined && filter.length > 0) {
            const grocery = await insertGrocery(filter);
            if (grocery !== null) {
                addToPurchaseList(grocery);

                reload();
            }
            else {
                ToastAndroid.show(`Erro ao salvar no Firebase`, ToastAndroid.SHORT);
            }
        }
        else {
            ToastAndroid.show(`Não é possível adicionar ${filter} na Lista de Compra`, ToastAndroid.SHORT);
        }
    }

    function handleEmptyMessage() {
        if (canBeAddedToList && purchaseList !== undefined && filter !== undefined) {
            const isInPurchaseList = purchaseList.find((elem) => elem.name === filter);
            if (isInPurchaseList) {
                setEmptyMessageOption("EXISTE");
            }
            else {
                setEmptyMessageOption("ADICIONAR");
            }
        }
        else {
            setEmptyMessageOption("NAO EXISTE");
        }

    }

    useEffect(() => {
        if (purchaseList) {
            const result = showList.filter((elem) => {
                for (let i = 0; i < purchaseList.length; i++) {
                    if (elem.id === purchaseList[i].id) {
                        return false;
                    }
                }
                return true;
            });
            setData(result);
        }
        else {
            setData(showList);
        }

        handleEmptyMessage();
    }, [showList, purchaseList]);


    function displayEmptyMessage() {
        switch (emptyMessageOption) {
            case "ADICIONAR":
                return (<TouchableHighlight testID="add" onPress={handleAddGrocery}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: variables.PRIMARY_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Gostaria de adicionar </Text>
                        <Text style={{ color: variables.PRIMARY_COLOR, fontSize: variables.FONT_SIZE_MEDIUM, fontWeight: "bold" }}>{filter}</Text>
                        <Text style={{ color: variables.PRIMARY_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}> ?</Text>
                    </View>
                </TouchableHighlight>);

            case "EXISTE":
                return (<View style={{ flexDirection: "row" }}>
                    <Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM, fontWeight: "bold" }}>{filter}</Text>
                    <Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}> já está na Lista de Compras.</Text>
                </View>);

            default:
                return (<Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Não há itens na sua Lista.</Text>);

        }

    };

    return (
        <>
            {
                data.length > 0 ?
                    <FlatList
                        testID="list"
                        updateCellsBatchingPeriod={1000}
                        data={data}
                        renderItem={({ item, index }: { item: Grocery, index: number }) => <GroceryCheckItem item={item} canBeAddedToList={canBeAddedToList} reload={reload} />}
                        keyExtractor={(item) => item.id as string}
                    />
                    :
                    <>
                        {displayEmptyMessage()}
                    </>
            }

        </>
    );
};

export default GroceryCheckList;
