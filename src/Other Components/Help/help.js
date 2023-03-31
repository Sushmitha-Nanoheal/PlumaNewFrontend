import Text from '@kiwicom/orbit-components/lib/Text';
import React from 'react';
import Card, { CardSection } from "@kiwicom/orbit-components/lib/Card";
import Stack from "@kiwicom/orbit-components/lib/Stack";
import "./help.css";

const help = () => {
  return (
    <div className='HelpContainer'>
      <div className='HeadingfCotainer'>
       
      <Text id="Help-Heading">Help : FAQ</Text>
      </div>
      <div className='HelpListContainer'>
      <Stack>
      <Card>
    <CardSection
      expandable
      title="Section title"
    >
      <Stack direction="column" type="primary" spacing="XSmall" >
        <Text type="secondary">Data</Text>
        <Text type="secondary">yas.karenth@example.com</Text>
      </Stack>
    </CardSection>
  </Card>
  </Stack>
  <Stack>
      <Card  >
    <CardSection
      expandable
      title="Section title"
    >
      <Stack direction="column"   spacing="XSmall" >
        <Text type="secondary">Data</Text>
        <Text type="secondary">yas.karenth@example.com</Text>
      </Stack>
    </CardSection>
  </Card>
  </Stack>
      </div>
    </div>
  )
}

export default help