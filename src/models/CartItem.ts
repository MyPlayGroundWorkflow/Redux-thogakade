export default class CartItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;

    constructor(id: string, name: string, quantity: number, unitPrice: number) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = unitPrice * quantity;
    }
}