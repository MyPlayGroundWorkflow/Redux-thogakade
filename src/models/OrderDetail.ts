export default class OrderDetail {
    orderId: string;
    item: string;
    quantity: number;
    unitPrice: number;
    total: number;

    constructor(orderId: string, item: string, quantity: number, unitPrice: number, total: number) {
        this.orderId = orderId;
        this.item = item;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = total;
    }
}