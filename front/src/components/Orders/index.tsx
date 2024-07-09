import { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

const orders: Order[] = [
  {
  'table': '12',
	'status': 'WAITING',
	'products': [
		{
			'product': {
				'name': 'Pizza 4 queijos',
				'imagePath': '1720142230168-pizza-4-queijos.webp',
				'price': 95
			},
			'quantity': 1,
			'_id': '6685cbbee945fad66dce9124'
		},
		{
			'product': {
				'name': 'Cola cola lata',
				'imagePath': '1720142285476-coca-cola-lata.jpeg',
				'price': 6
			},
			'quantity': 4,
			'_id': '6685cbbee945fad66dce9125'
		}
	],
	'_id': '6685cbbee945fad66dce9123',
}
]

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="⏳"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />
    </Container>
  );
}
