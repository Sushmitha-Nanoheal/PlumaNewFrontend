import React from 'react';
import Heading from "@kiwicom/orbit-components/lib/Heading";
import Tabs, { Tab, TabList, TabPanel, TabPanels } from "@kiwicom/orbit-components/lib/Tabs"; 
import "./settings.css";
import { UserActivityLogs } from '../UserManagement/UserDetails/UserActivityLogs/UserActivityLogs';
import { UsersDetails } from '../UserManagement/UserDetails/Usersdetails/UsersDetails';
// import CreatePassword from '../CreatePassword/CreatePassword';

const Settings = () => {

  return (
    <>
    <div className='HelpContainer'>
      <div className='HeadingfCotainer'>    
      <Heading id="Help-Heading" color="secondary">Settings</Heading>
      </div>
      <div className='SettingsListContainee'>
      <Tabs>
    <TabList>
      <Tab>User Details</Tab>
      <Tab>User Activity logs</Tab>
    </TabList>
    <TabPanels>
      <TabPanel id='UserBlock'><UsersDetails/></TabPanel>
      <TabPanel><UserActivityLogs/></TabPanel>
    </TabPanels>
  </Tabs>
  </div>
  </div>
  </>   
  )
}
export default Settings;