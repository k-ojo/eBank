
import { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

interface Account {
  id: string;
  number: string;
  type: 'Checking' | 'Savings';
  balance: number;
  currency: string;
}

interface Card {
  id: string;
  number: string;
  expiryDate: string;
  cvv: string;
  type: string;
  status: 'active' | 'inactive';
}

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  cards: Card[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getAccountById: (id: string) => Account | undefined;
  createTransfer: (from: string, to: string, amount: number, description: string) => void;
}

const initialAccounts: Account[] = [
  {
    id: 'acc1',
    number: '0140030684501',
    type: 'Checking',
    balance: 970000,
    currency: 'USD'
  },
  {
    id: 'acc2',
    number: '0140030684502',
    type: 'Savings',
    balance: 250000,
    currency: 'USD'
  }
];

const initialTransactions: Transaction[] = [
  {
    id: 'trans1',
    date: '2023-05-18',
    description: 'Salary Deposit',
    amount: 45000,
    type: 'credit',
    status: 'completed',
    reference: 'REF123456789'
  },
  {
    id: 'trans2',
    date: '2023-05-15',
    description: 'Online Purchase',
    amount: 1299,
    type: 'debit',
    status: 'completed',
    reference: 'REF987654321'
  },
  {
    id: 'trans3',
    date: '2023-05-10',
    description: 'Rent Payment',
    amount: 12000,
    type: 'debit',
    status: 'completed',
    reference: 'REF567891234'
  },
  {
    id: 'trans4',
    date: '2023-05-05',
    description: 'Wire Transfer',
    amount: 5000,
    type: 'debit',
    status: 'pending',
    reference: 'REF112233445'
  },
  {
    id: 'trans5',
    date: '2023-05-01',
    description: 'Dividend Payment',
    amount: 2500,
    type: 'credit',
    status: 'completed',
    reference: 'REF554433221'
  }
];

const initialCards: Card[] = [
  {
    id: 'card1',
    number: '4532 **** **** 8912',
    expiryDate: '05/26',
    cvv: '***',
    type: 'Visa Platinum',
    status: 'active'
  }
];

const BankingContext = createContext<BankingContextType>({
  accounts: initialAccounts,
  transactions: initialTransactions,
  cards: initialCards,
  addTransaction: () => {},
  getAccountById: () => undefined,
  createTransfer: () => {}
});

export const useBanking = () => useContext(BankingContext);

export const BankingProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `trans${transactions.length + 1}`
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Update account balance if transaction is completed
    if (transaction.status === 'completed') {
      setAccounts(accounts.map(account => {
        // Just update first account for demo
        if (account.id === 'acc1') {
          const updatedBalance = transaction.type === 'credit'
            ? account.balance + transaction.amount
            : account.balance - transaction.amount;
          
          return { ...account, balance: updatedBalance };
        }
        return account;
      }));
    }
  };

  const getAccountById = (id: string) => {
    return accounts.find(account => account.id === id);
  };

  const createTransfer = (from: string, to: string, amount: number, description: string) => {
    // Create a new pending transaction
    const newTransaction: Omit<Transaction, 'id'> = {
      date: new Date().toISOString().split('T')[0],
      description,
      amount,
      type: 'debit',
      status: 'pending',
      reference: `REF${Math.floor(Math.random() * 1000000000)}`
    };
    
    addTransaction(newTransaction);
  };

  return (
    <BankingContext.Provider value={{ 
      accounts, 
      transactions, 
      cards,
      addTransaction,
      getAccountById,
      createTransfer
    }}>
      {children}
    </BankingContext.Provider>
  );
};
