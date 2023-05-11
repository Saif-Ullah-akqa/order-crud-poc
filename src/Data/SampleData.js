import {State} from '../utils/types/type'
var SampleData={
  "order": {
    "customers": {
      "name": "Saif Ullah",
      "mobile": 79062829,
      "email": "saif.ullah@akqa.com",
      "dateOfBirth": "11-04-2000"
    },
    "orderItems": [
      {
        "ProductName": "Order Item 1",
        "quantity": 2
      },
      {
        "ProductName": "Order Item 2",
        "quantity": 5
      }
    ],
    "paymentDetails": {
      "paymentMode": "Credit Card",
      "paid": false
    },
    "shippingDetails": {
      "addressLine1": "Shankar Chowk",
      "addressLine2": "DLF Cyber Park",
      "city": "Gurugram",
      "state": State.Haryana,
      "pincode": 122001
    }
  }
}
export default SampleData