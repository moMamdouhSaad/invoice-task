
export interface invoiceAmount{
    subTotal:number,
    discount: number,
    subTotalLessDiscount:number,
    taxRate: number,
    totalTax:number,
    shipping: number,
    balancePaid: number
}