export interface Order {
    customer?: Customer,
    orderItems?: OrderItem[],
    paymentDetails?: PaymentDetails,
    shippingDetails?: ShippingDetails
}
export interface Customer {
    name?: string,
    mobile?: number,
    email?: string,
    dateOfBirth?: Date
}
export interface OrderItem {
    productName?: string,
    quantity?: number
}
export interface PaymentDetails {
    paymentMode?: PaymentMode
    paid?: boolean
}
export interface ShippingDetails {
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    state?: State,
    pincode?: number
}

export enum State {
    Delhi = 'Delhi',
    Haryana = 'Haryana',
    UP = 'UP'
}

export type PaymentMode="Credit Card" | "Debit Card" | "Netbanking" | "UPI"