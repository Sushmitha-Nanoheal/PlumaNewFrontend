import Button from '@kiwicom/orbit-components/lib/Button';
import { Close } from '@kiwicom/orbit-components/lib/icons';
import InputField from '@kiwicom/orbit-components/lib/InputField';
import { CheckCircle } from "@kiwicom/orbit-components/icons";
import Stack from '@kiwicom/orbit-components/lib/Stack';

import Text from '@kiwicom/orbit-components/lib/Text'
// import { Input } from 'antd';
import React, { useState } from 'react';
import "./UserDetails.css";



export const UsersDetails = () => {
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [CurrentPassword, setCurrentPassword]= useState("");
    const [NewPassword, setNewPassword]= useState("");
    const [ConformPassword, setconformPassword]= useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [MessageDisplay, setMessageDisplay]=useState(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
      }

      
      const NewPasswordMassege=()=>{
        setIsOpen(false)
        setMessageDisplay("Password Changed Successfully !");
        setTimeout(() => {
            // console.log(copiedbox)
            setMessageDisplay("");
            // alert("URL Copied")
          }, 1500);
      }

  return (
    <div className='UserDetails-sections'> 
    <div className='UserDetailsBlock'>    
     <div className='MemberDetails'>
        <Text>Member Since,</Text>
        <Text id='MemberShip'>16 Jan 2022</Text>
     </div>
     <div className='Incoming-Details'>
        <InputField
        type='name'
        id='FirstNameSection'
        label="FullName"
        placeholder="John Doe"
        value={FullName}
        onChange={(e)=>setFullName(e.target.value)}
        />
     </div>
     <div className='Incoming-Details'>
     <InputField
        type='name'
        label="Email"
        placeholder="sampleuser@email.com"
        value={Email}
        onChange={(e)=>setEmail(e.target.value)}
        />
     </div>
     <div>
      <Button
       disabled={isOpen?true:false}
       id='toggleOpenButton'  
       onClick={toggleOpen} 
       >
        Change Password
        </Button>
    </div>
    </div> 
    {isOpen?<>
        <div className='ChangePassword'>
            <div className='FirstUserDetailsBlock'>
            
          <div className='Incoming-Details'>
            <InputField
            type='password'
            placeholder="Enter Password Here"
            label="Current Password"
            value={CurrentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
            />
           
          </div>
          <div className='Incoming-Details'>
            <InputField
            type='password'
            label="Set New Password"
            placeholder="Enter Password Here"
            value={NewPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            />
            
          </div>
          <div className='Incoming-Details'>
            <InputField
            type='password'
            label="Re-Enter New Password"
            placeholder="Re-Enter Password Here"
            value={ConformPassword}
            onChange={(e)=>setconformPassword(e.target.value)}
            />
            </div>
          </div>
         
          <div className='SetPasswordBlock'>
          <div  className="CloseToggle" onClick={()=>setIsOpen(false)}>
            <Close />
            </div>
            <div className='SetPasswordHeading'>
          <Button id='SetNewPassword-Text' onClick={NewPasswordMassege}>Set New Password </Button>
          </div>
          </div>
        </div>
        </>:<div id='SuccessMessage'>
            {MessageDisplay?
            <div className='MessageDisplay'>
                <Stack direction='columns'>
                <CheckCircle color="success"/>
                <Text>{MessageDisplay}</Text>
                </Stack>
            </div>:<></>}</div>
      }
    </div>
  )
}
