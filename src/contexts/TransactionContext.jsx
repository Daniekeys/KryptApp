import React, {useEffect, useState} from 'react';
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransactionContext = React.createContext();

const {ethereum} = window;
// we just destucture the etheruem object from the window object

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    return transactionContract
};

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading,setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount') || 0);


    const handleChange = (e,name) =>  {
        setFormData((prevState) => ({...prevState,[name]: e.target.value}))
    }

    const getAllTransactions = async () => {
        try {
          if(!ethereum) return alert('Please install metamask');
          const transactionsContract = getEthereumContract();
          const availableTransactions = await transactionsContract.getAllTransactions();
          console.log(availableTransactions);
        } catch (e) {
            console.log(e)
        }

    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({method: 'eth_accounts'});
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
            } else {
              console.log('no accounts found');
              }  
        } catch (error) {
            console.log(error);
            throw new Error ('No etheruem object found');
        }
    }

    const checkIfTransactionsExist = async () => {
      try {
        if (ethereum) {
          const transactionsContract = createEthereumContract();
          const currentTransactionCount = await transactionsContract.getTransactionCount();
  
          window.localStorage.setItem("transactionCount", currentTransactionCount);
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

    const connectWallet = async () => {
            try {
          if(!ethereum) return alert('Please install metamask');
          const accounts = await ethereum.request({method: 'eth_requestAccounts'});
          setCurrentAccount(accounts[0]);
            } catch (error) {
                console.log(error);
                throw new Error ('No etheruem object found');
            }
    }
    const sendTransaction = async () => {
      try {
        if (ethereum) {
          const { addressTo, amount, keyword, message } = formData;
          const transactionsContract = getEthereumContract();
          const parsedAmount = ethers.utils.parseEther(amount);
  
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            }],
          });
  
          const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
  
          setIsLoading(true);
          console.log(`Loading - ${transactionHash.hash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash.hash}`);
          setIsLoading(false);
  
          const transactionsCount = await transactionsContract.getTransactionCount();
  
          setTransactionCount(transactionsCount.toNumber());
          window.location.reload();
        } else {
          console.log("No ethereum object");
        }
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };
    useEffect(() => {
        checkIfWalletIsConnected();
        // checkIfTransactionsExist();
    }, []);
    return (
        <TransactionContext.Provider value={{connectWallet,currentAccount,formData, setFormData, handleChange,sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
};