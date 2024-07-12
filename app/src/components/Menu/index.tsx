import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Text } from "../Text";
import { Product, Image, ProductDetail, Separator, AddToCartButton } from "./styles";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";

export function Menu() {
  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product._id}
      style={{ marginTop: 32 }}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={{ paddingHorizontal: 24 }}
      renderItem={({ item: product }) => (
        <Product>
          <Image
            source={{
              uri: `http://192.168.0.247:3001/uploads/${product.imagePath}`,
            }}
          />
          <ProductDetail>
            <Text weight="600">{product.name}</Text>
            <Text size={14} color="#666" style={{ marginVertical: 8 }}>
              {product.description}
            </Text>
            <Text size={14} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </ProductDetail>

          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    ></FlatList>
  );
}
