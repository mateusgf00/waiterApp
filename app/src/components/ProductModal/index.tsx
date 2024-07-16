import { FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import {
  Image,
  CloseButton,
  ModalBody,
  Header,
  IngredientsContainer,
  Ingredient,
  FooterContainer,
  Footer,
  PriceContainer,
} from "./styles";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | Product;
  onAddProductToCart: (product: Product) => void;
}

export function ProductModal({ visible, onClose, product, onAddProductToCart }: ProductModalProps) {
  if (!product) return null;

  function handleAddToCart(product: Product) {
    onAddProductToCart(product);
    onClose()

  }
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.50.167:3001/uploads/${product?.imagePath}`,
        }}
      >
        <CloseButton onPress={onClose}>
          <Close />
        </CloseButton>
      </Image>

      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product?.name}
          </Text>
          <Text color="#666" style={{ marginTop: 8 }}>
            {product?.description}
          </Text>
        </Header>

        { product.ingredients.length > 0 && <IngredientsContainer>
          <Text size={16} weight="600" color="#666">
            Ingredientes
          </Text>

          <FlatList
            data={product?.ingredients}
            keyExtractor={(ingredient) => ingredient._id}
            style={{ marginTop: 16 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: ingredient }) => (
              <Ingredient>
                <Text>{ingredient.icon}</Text>
                <Text size={14} color="#666" style={{ marginLeft: 20 }}>
                  {ingredient.name}
                </Text>
              </Ingredient>
            )}
          ></FlatList>
        </IngredientsContainer>}
      </ModalBody>

      <Footer>
        <FooterContainer>
          <PriceContainer>
            <Text color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </PriceContainer>

          <Button onPress={() => handleAddToCart(product)}>Adicionar ao carrinho</Button>
        </FooterContainer>
      </Footer>
    </Modal>
  );
}
