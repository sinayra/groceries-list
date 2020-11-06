import React from "react";
import { FlatList, Text, TouchableHighlight, ToastAndroid } from "react-native";

import { addToPurchaseList, insertGrocery } from "../../services/database";
import { Grocery } from "../../types/Grocery";
import GroceryCheckItem from "../GroceryCheckItem";
import { Variables } from "../../styles/variables";

interface GroceryCheckListProps {
    data: Grocery[];
    addToList: boolean,
    reload: () => void;
    filter?: string
}

const GroceryCheckList: React.FC<GroceryCheckListProps> = ({ data, addToList, reload, filter }) => {
    const variables = Variables();

    async function handleAddGrocery() {
        if (filter) {
            const grocery = await insertGrocery(filter);
            if (grocery) {
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

    return (
        <>
            {
                data.length > 0 ?
                    <FlatList
                        data={data}
                        renderItem={({ item, index }: { item: Grocery, index: number }) => <GroceryCheckItem item={item} addToList={addToList} reload={reload} />}
                        keyExtractor={(item) => item.id as string}
                    />
                    :
                    <>
                        {filter && filter.length > 0 ?
                            <TouchableHighlight onPress={handleAddGrocery}>
                                <Text style={{ color: variables.PRIMARY_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Gostaria de adicionar {filter}?</Text>
                            </TouchableHighlight>
                            :
                            <Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Não há itens na sua Lista de Compras.</Text>
                        }
                    </>
            }

        </>
    );
};

export default GroceryCheckList;
