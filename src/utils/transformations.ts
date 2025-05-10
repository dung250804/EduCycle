
import { Transaction, TransactionType } from "@/types/user";

/**
 * Transforms a complex transaction object from API into our simplified Transaction interface
 */
export const transformToTransaction = (data: any): Transaction => {
  // Extract basic fields
  const transactionId = data.transactionId || "";
  const type = data.type as TransactionType;
  const status = data.status as "Pending" | "Completed" | "In Progress" | "Cancelled";
  
  // Handle the item name - could come from different places depending on the transaction type
  let item = "";
  if (data.item && data.item.itemName) {
    item = data.item.itemName;
  } else if (data.postId && data.post?.title) {
    item = data.post.title;
  } else if (data.activityId && data.activity?.title) {
    item = data.activity.title;
  }
  
  // Format date (assuming createdAt exists somewhere)
  const date = data.createdAt || new Date().toISOString().split("T")[0];
  
  // Determine amount based on transaction type
  let amount = "";
  if (type === "Sale") {
    amount = data.item?.price ? `$${data.item.price}` : "$0.00";
  } else if (type === "Fundraiser") {
    amount = data.activity?.amountRaised ? `$${data.activity.amountRaised}` : "$0.00";
  } else if (type === "Exchange") {
    // For exchanges, we might show what was exchanged instead of a monetary amount
    amount = data.exchangedItem?.itemName || "Item exchange";
  } else if (type === "Donation") {
    amount = "-"; // Donations might not have a monetary value
  }
  
  // Get counterparty name
  let counterpartyName = "";
  if (data.representativeId && data.representative?.name) {
    counterpartyName = data.representative.name;
  } else if (data.user?.name) {
    counterpartyName = data.user.name;
  } else if (data.item?.owner?.name) {
    counterpartyName = data.item.owner.name;
  }
  
  // Determine item ID
  let itemId = "";
  if (data.itemId) {
    itemId = data.itemId;
  } else if (data.postId) {
    itemId = data.postId;
  } else if (data.activityId) {
    itemId = data.activityId;
  } else if (data.item?.itemId) {
    itemId = data.item.itemId;
  }
  
  // Create and return the Transaction object
  return {
    id: parseInt(transactionId.replace('t', '')) || 0, // Convert to number for compatibility with existing code
    type,
    item,
    date,
    amount,
    status,
    counterpartyName,
    itemId,
  };
};

/**
 * Transforms multiple transaction objects
 */
export const transformTransactions = (data: any[]): Transaction[] => {
  return Array.isArray(data) ? data.map(transformToTransaction) : [];
};
