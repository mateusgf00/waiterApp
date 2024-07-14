import { FlatList, TouchableOpacity } from "react-native";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import {
  Actions,
  Image,
  Item,
  ProductContainer,
  ProductDetail,
  QuantityContainer,
  Sumary,
  TotalContainer,
} from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";

interface CartProps {
  cartItems: CartItem[];
  onAddProductToCart: (product: Product) => void;
}

export function Cart({ cartItems, onAddProductToCart }: CartProps) {
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  return (
    <>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.0.247:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetail>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetail>
              </ProductContainer>

              <Actions>
                <TouchableOpacity
                  style={{ marginRight: 24 }}
                  onPress={() => onAddProductToCart(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}

      <Sumary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={() => "confirmar pedido"}
          disabled={cartItems.length === 0}
        >
          Confirmar pedido
        </Button>
      </Sumary>
    </>
  );
}
