import React,{useContext} from 'react'


import {TransactionContext} from '../contexts/TransactionContext'
import dummyData from '../utils/dummyData'
import {shortenAddress} from '../utils/shortenAddress';
import useFetch from '../hooks/useFetch'
const TransactionCard = ({addressTo,addressFrom,timestamp,message,keyword, amount,url}) => {
const gitUrl = useFetch({keyword})
return (
  <div className="bg-[#181918] m-4 flex flex-1 
  2xl:min-w-[450px]
  2xl:max-w-[450px]
  sm:min-w-[270px]
  sm:max-w-[300px]
  
  flex-col p-3  rounded-md hover:shadow-2xl
  ">
<div className="flex flex-col items-center w-full mt-2">
<div className=" w-full mb-6 p-2">
<a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
    <br/>
    <p className="text-white text-base">Message: {message}</p>

            </>
          )}

</div>
          <img src={gitUrl || url} alt="gif" className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"/>
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">
              {timestamp}
            </p>
          </div>
</div>
  </div>
)
}

const Transaction = () => {
  const {currentAccount } = useContext(TransactionContext);
  console.log("currentAccount",currentAccount)
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
        <div className="flex flex-col md:p-12 py-12 px-4">
          {
            currentAccount ? (
              <h3 className="text-white text-center text-3xl my-2">
                Latest Transaction
                </h3>
            ) : (
              <h3 className="text-white text-center text-3xl my-2">
                Connect to your account to see the latest transaction
                </h3>
            )
          }
  <div className="flex flex-wrap items-center, justify-center mt-10">
          {
            dummyData.reverse().map((transaction,index)=>{ 
              return <TransactionCard key={index} {...transaction}/>
          }
          )
          }
  </div>
        </div>
      
    </div>
  )
}

export default Transaction