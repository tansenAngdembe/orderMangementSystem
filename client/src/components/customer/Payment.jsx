import { CreditCard, Wallet } from 'lucide-react';

export const Payment = ()=>{

    return (
        <div className='mt-4 grid gap-4 md:grid-cols-2' >
            <button 
            className='flex items-center justify-center space-x-3 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors'>
                <CreditCard className='h-6 w-6'/>
                <span>Pay Online</span>
            </button>
            <button 
            className="flex items-center justify-center space-x-3 bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors">
                <Wallet className='h-6 w-6'/>
                <span>Cash Payment</span>
            </button>


        </div>

    )

}