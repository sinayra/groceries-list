import React from "react";
import { FlatList, Text } from "react-native";
import { Grocery } from "../../types/Grocery";
import PurchaseCheckItem from "../PurchaseCheckItem";
import { Variables } from "../../styles/variables";

interface PurchaseCheckListProps {
    data: Grocery[];
    addToList: boolean,
    reload: () => void;
}

const PurchaseCheckList: React.FC<PurchaseCheckListProps> = ({ data, addToList, reload }) => {
    const variables = Variables();

    return (
        <>
            {
                data.length > 0 ?
                    <FlatList
                        data={data}
                        renderItem={({ item, index }: { item: Grocery, index: number }) => <PurchaseCheckItem item={item} addToList={addToList} reload={reload} />}
                        keyExtractor={(item) => item.id as string}
                    />
                    :
                    <Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Não há itens na sua Lista de Compras.</Text>
            }

        </>
    );
};

export default PurchaseCheckList;
