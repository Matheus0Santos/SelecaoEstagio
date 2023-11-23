/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { View } from "react-native";

import * as S from "./styles";

interface Data {
  id: number;
  type: string;
  price: number;
}

function App(): JSX.Element {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    axios
      .get("http://petstore-demo-endpoint.execute-api.com/petstore/pets")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      });
  }, []);

  const orderById = () => {
    setData([...data].sort((a, b) => a.id - b.id));
  };

  const orderByPrice = () => {
    setData([...data].sort((a, b) => a.price - b.price));
  };

  const orderByType = () => {
    setData([...data].sort((a, b) => a.type.localeCompare(b.type)));
  };

  return (
    <S.Container>
      <S.IdButton onPress={() => orderById()}>
        <S.ButtonText>Order by ID</S.ButtonText>
      </S.IdButton>

      <S.PriceButton
        onPress={() => {
          orderByPrice();
        }}
      >
        <S.ButtonText>Order by Price</S.ButtonText>
      </S.PriceButton>

      <S.TypeButton
        onPress={() => {
          orderByType();
        }}
      >
        <S.ButtonText>Order by Type</S.ButtonText>
      </S.TypeButton>
      <S.TypeInfo>Lista:</S.TypeInfo>
      {data.map((item: any) => (
        <View key={item.id}>
          <S.PriceInfo>ID: {item.id}</S.PriceInfo>
          <S.TypeInfo>Tipo: {item.type}</S.TypeInfo>
          <S.PriceInfo>Preço: {item.price}</S.PriceInfo>
        </View>
      ))}
    </S.Container>
  );
}

export default App;
