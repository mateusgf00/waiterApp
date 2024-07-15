import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from "./styles";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";
import { Button } from "../components/Button";
import { TableModal } from "../components/TableModal";
import { useState } from "react";
import { Cart } from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { products } from "../mocks/products";
import { Product } from "../types/Product";

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [cartItem, setCartItem] = useState<CartItem[]>([
    // {
    //   quantity: 1,
    //   product: products[0]
    // },{
    //   quantity: 3,
    //   product: products[1]
    // }
  ]);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleCancelOrder() {
    setSelectedTable("");
    setCartItem([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItem((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState]
      const item = prevState[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1
      }

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItem((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if(item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1
      }

      return newCartItems

    })
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleCancelOrder}
        />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu onAddProductToCart={handleAddToCart} />
        </MenuContainer>
      </Container>

      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
          <Cart
            cartItems={cartItem}
            onAddProductToCart={handleAddToCart}
            onDecrementProductToCart={handleDecrementCartItem}
          />
          )}
        </FooterContainer>
      </Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
