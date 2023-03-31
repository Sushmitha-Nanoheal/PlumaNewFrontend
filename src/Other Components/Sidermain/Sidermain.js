import React, { useEffect } from 'react';
import {NavLink, Outlet, useNavigate } from 'react-router-dom';
import NavigationBar from "@kiwicom/orbit-components/lib/NavigationBar";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import ButtonLink from "@kiwicom/orbit-components/lib/ButtonLink";
import LinkList from "@kiwicom/orbit-components/lib/LinkList";
import TextLink from "@kiwicom/orbit-components/lib/TextLink";
// import Text from "@kiwicom/orbit-components/lib/Text";

import "./Sudemain.css";

export const Sidermain = () => {

  const Navigate = useNavigate();

  useEffect(()=>
  {

    const auth=localStorage.getItem("token");
    if(!auth)
    {
      Navigate("/login");
    }



  },[])
  // const Navigate=useNavigate();
  const NavItems=[
    {
      name:"Settings",
      path:"/settings",
    },
    {
      name:"Help",
      path:"/help",
    },
    {
      name:<li className='Signoutbtn' onClick={()=>{localStorage.clear();window.location.reload()}}><img src="/assets/images/Person.svg" height={20}/> Sign Out</li>,
      path:"/login",
    }
    ]

  return (
    <div className='MainContainer'>
      <div className='NavBar'>
      <NavigationBar hideOnScroll={true}>
      <Stack direction="row" align="center" justify="center">
      <ButtonLink href="/">
        <img
          src="/assets/images/Logo.svg"
          alt="Logo"
          height="15px"
        />
      </ButtonLink>
      <LinkList direction="row">
      </LinkList>
      {NavItems.map((item,index)=>(
      <Stack inline key={index}>
        <LinkList direction="row" >
          <NavLink to={item.path} className="Linking">
          <TextLink type="secondary">{item.name}</TextLink>     
          </NavLink>          
        </LinkList>
      </Stack>
      ))}
    </Stack>
  </NavigationBar>   
  </div>
      <div className='SubContainer'>
        <Outlet/>
      </div>
    </div>
  )
}
