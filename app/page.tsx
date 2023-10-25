'use client'

// import { useState, useRef } from 'react'
// import { Client, ClientCredentials } from '@lucidtech/las-sdk-node'
import { Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classes from './Home.module.css';

export default function Home() {
  // const [fileContent, setFileContent] = useState(null)
  // const [predictions, setPredictions] = useState(null)
  // const fileRef = useRef()
  // const client = new Client(new ClientCredentials('https://api.lucidtech.ai/v1', '2c1724vghlv7haik1kha1lk06p', 'bp1nvs07meaaoibmp3o00qce74n0m3gas0dpllr82mattkchstv', 'auth.lucidtech.ai'))

  // const readFile = event => {
  //   const fileReader = new FileReader()
  //   const { files } = event.target

  //   fileReader.readAsArrayBuffer(files[0])
  //   fileReader.onload = e => {
  //     const content = e.target?.result

  //     if (content) {
  //       setFileContent(content)
  //     }
  //   }
  // }

  // const handleSubmit = async () => {
  //   if (fileContent && client) {
  //     const document = await client.createDocument(fileContent, 'application/pdf')
  //     const response = await client.createPrediction(document.documentId, 'las:model:b9db0ed1a40e4ef4b2fa819c8fbfe2cd')
  //     const parsedPredictions = response?.predictions?.reduce((prev, curr) => {
  //       if (prev[curr.label] && prev[curr.label].confidence < curr.confidence) {
  //         prev[curr.label] = {
  //           confidence: curr.confidence,
  //           value: curr.value
  //         }
  //       } else {
  //         prev[curr.label] = {
  //           confidence: curr.confidence,
  //           value: curr.value,
  //           label: curr.label
  //         }
  //       }
  //     }, {})

  //     if (parsedPredictions) {
  //       setPredictions(parsedPredictions)
  //     }
  //   }
  // }

  return (
    //   {/* <div>
    //     <FileUpload />
    //     <Button type="submit" onClick={handleSubmit}>Submit</Button>
    //   </div>

    //   <div>
    //     {predictions ? (
    //       <table>
    //         {predictions.map(prediction => (
    //           <tr>
    //             <th>{prediction.label}</th>
    //             <td>{prediction.value}</td>
    //             <td>{prediction.confidence * 100}</td>
    //           </tr>
    //         ))}
    //       </table>
    //     ) : null}
    //   </div> */}
    // </Container>

    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              An <span className={classes.highlight}>AI supported</span> invoice reminder
            </Title>

            <Text className={classes.description} mt={30}>
              Have you ever forgot to pay invoice on time? Paymind will scan your invoice and remind you to pay all on time!
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item className={classes.listItem}>
                <b>Upload</b> invoice image and start getting notifications
              </List.Item>
              <List.Item className={classes.listItem}>
                <b>Get notified</b> in browser, via email, via SMS
              </List.Item>
              <List.Item className={classes.listItem}>
                <b>No more unpaid</b> invoices after due date
              </List.Item>
            </List>

            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Sign for beta
              </Button>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  )
}
