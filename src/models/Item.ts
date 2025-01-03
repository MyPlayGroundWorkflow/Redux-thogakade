export default class Item{
    id: number
    name: string
    qty: number
    unitPrice: number

    constructor(id: number, name: string, qty: number, unitPrice: number){
        this.id = id
        this.name = name
        this.qty = qty
        this.unitPrice = unitPrice
    }
}