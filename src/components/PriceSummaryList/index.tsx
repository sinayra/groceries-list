import React from "react";
import { FlatList, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Grocery } from "../../types/Grocery";
import PriceSummaryItem from "../PriceSummaryItem";
import { Variables } from "../../styles/variables";

interface PriceSumaryListProps {
  data: Grocery[];
  filter: string;
}

const PriceSummaryList: React.FC<PriceSumaryListProps> = ({ data, filter }) => {
  const variables = Variables();
  const navigation = useNavigation();

  function handleAddPurchase() {
    navigation.navigate("Menu", { screen: "AddPurchase", params: { name: filter } });
  }

  return (
    <>
      {
        data.length > 0 ?
          <FlatList
            data={data}
            renderItem={({ item }: { item: Grocery }) => <PriceSummaryItem item={item} />}
            keyExtractor={(item) => item.id as string}
          />
          :
          <>
            <Text style={{ color: variables.TEXT_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Nenhum resultado encontrado</Text>
            {filter.length > 0 ? <TouchableHighlight onPress={handleAddPurchase}><Text style={{ color: variables.PRIMARY_COLOR, fontSize: variables.FONT_SIZE_MEDIUM }}>Gostaria de adicionar {filter} ?</Text></TouchableHighlight> : <></>}
          </>
      }

    </>
  );
};

export default PriceSummaryList;
