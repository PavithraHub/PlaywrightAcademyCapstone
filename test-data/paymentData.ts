export interface paymentData{
    name : string;
    cardNumber : string;
    cvv : string;
    expiryMonth : string;
    expiryYear : string
}

export const paymentDetails : paymentData= {
    name : "FirstName LastName",
    cardNumber :"1234567890",
    cvv : "111",
    expiryMonth : "12",
    expiryYear : "2999"
}