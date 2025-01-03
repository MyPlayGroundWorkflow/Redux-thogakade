import OrderDetail from "./OrderDetail.ts";

export default class Order {
    id: number;
    customer: string;
    date: string;
    status: string;
    items: OrderDetail[];

    constructor(id: number, customer: string, date: string, status: string, items: OrderDetail[]) {
        this.id = id;
        this.customer = customer;
        this.date = date;
        this.status = status;
        this.items = items;
    }
}