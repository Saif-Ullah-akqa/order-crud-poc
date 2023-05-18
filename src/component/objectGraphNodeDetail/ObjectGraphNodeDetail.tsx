import {
  Order,
  Customer,
  OrderItem,
  PaymentDetails,
  ShippingDetails,
} from "../../utils/types/type";
import FormGenerator from "../dynamicForm/FormGenerator";
import { ItemType } from "../objectGraphNav/ObjectGraphNav";

export type NodeType =
  | Order
  | Customer
  | OrderItem
  | PaymentDetails
  | ShippingDetails;

interface ObjectGraphNodeProps {
  originalData: NodeType;
  childKey: string | number;
  parentKey: string;
  data:
    | ItemType
    | Order
    | Customer
    | OrderItem
    | PaymentDetails
    | ShippingDetails;
  value: { ProductName: string; quantity: number } | string;
}
const ObjectGraphNodeDetail = (props: ObjectGraphNodeProps) => {
  // Callback function for form submission
  const handleSubmit = (updatedData: NodeType) => {
    console.log({ updatedData });
    // Implement your logic to post the updated data to the API endpoint
  };
  return (
    <>
      <FormGenerator
        originalData={props.originalData}
        childKey={props.childKey}
        parentKey={props.parentKey}
        data={props.data}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ObjectGraphNodeDetail;
