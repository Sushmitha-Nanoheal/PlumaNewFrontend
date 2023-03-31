import Button from '@kiwicom/orbit-components/lib/Button';
import React, { useState } from 'react'
import {UsersDetails} from './Usersdetails/UsersDetails';

export const UserDetailsBlock = () => {
    const [step, setStep] = useState(1);

    const nextStep = (e) => {
        setStep(step + 1);
        e.preventDefault();
        };
    


    switch (step){
        case 1:
          return(
            
            <div className='Create-Section'>            
            <div className='CreatePageBlock'>
               <UsersDetails/>
              
            </div>
           </div>
          );
         
        default:
            return null;
    }
}


