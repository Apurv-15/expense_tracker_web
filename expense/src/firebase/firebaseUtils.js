import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  serverTimestamp 
} from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

// Collection references
const TRANSACTIONS_COLLECTION = 'transactions';

// Add a new transaction
export const addTransaction = async (transaction) => {
  try {
    const docRef = await addDoc(collection(db, TRANSACTIONS_COLLECTION), {
      ...transaction,
      timestamp: serverTimestamp()
    });
    return { id: docRef.id, ...transaction };
  } catch (error) {
    console.error("Error adding transaction: ", error);
    throw error;
  }
};

// Get all transactions
export const getTransactions = async (userId) => {
  try {
    const q = query(
      collection(db, TRANSACTIONS_COLLECTION),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting transactions: ", error);
    throw error;
  }
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
  try {
    await deleteDoc(doc(db, TRANSACTIONS_COLLECTION, transactionId));
    return true;
  } catch (error) {
    console.error("Error deleting transaction: ", error);
    throw error;
  }
};

// Custom hook for transaction operations with toast notifications
export const useTransactions = () => {
  const { toast } = useToast();
  
  const addTransactionWithToast = async (transaction) => {
    try {
      const result = await addTransaction(transaction);
      toast({
        title: "Transaction Added",
        description: "Your transaction has been successfully recorded.",
      });
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const deleteTransactionWithToast = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      toast({
        title: "Transaction Deleted",
        description: "Your transaction has been successfully deleted.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  return {
    addTransaction: addTransactionWithToast,
    deleteTransaction: deleteTransactionWithToast,
    getTransactions
  };
};