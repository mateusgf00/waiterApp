import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from "./styles";
import { Header } from "../Header";

export function Main() {
  return (
    <>
      <Container>

        <Header />

        <CategoriesContainer />

        <MenuContainer></MenuContainer>

      </Container>

      <Footer>
      <FooterContainer></FooterContainer>
      </Footer>
    </>
  );
}
