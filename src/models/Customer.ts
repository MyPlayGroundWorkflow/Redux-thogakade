export default class Customer{
    id: number
    name: string
    email: string
    telephone: string

    constructor(id: number, name: string, email: string, telephone: string){
        this.id = id
        this.name = name
        this.email = email
        this.telephone = telephone
    }
}