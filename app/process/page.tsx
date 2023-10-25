'use client'

import { FileUpload } from '@/components/FileUpload/FileUpload';
import { useState, useRef } from 'react'
import { Client, ClientCredentials } from '@lucidtech/las-sdk-node'
import { Container, Button } from '@mantine/core';
// import classes from './Home.module.css';

export default function Process() {
  const [fileContent, setFileContent] = useState(null)
  const [predictions, setPredictions] = useState(null)
  const fileRef = useRef()
  const client = new Client(new ClientCredentials('https://api.lucidtech.ai/v1', '2c1724vghlv7haik1kha1lk06p', 'bp1nvs07meaaoibmp3o00qce74n0m3gas0dpllr82mattkchstv', 'auth.lucidtech.ai'))

  const readFile = event => {
    const fileReader = new FileReader()
    const { files } = event.target

    fileReader.readAsArrayBuffer(files[0])
    fileReader.onload = e => {
      const content = e.target?.result

      if (content) {
        setFileContent(content)
      }
    }
  }

  const handleSubmit = async () => {
    if (fileContent && client) {
      const document = await client.createDocument(fileContent, 'application/pdf')
      const response = await client.createPrediction(document.documentId, 'las:model:b9db0ed1a40e4ef4b2fa819c8fbfe2cd')
      const parsedPredictions = response?.predictions?.reduce((prev, curr) => {
        if (prev[curr.label] && prev[curr.label].confidence < curr.confidence) {
          prev[curr.label] = {
            confidence: curr.confidence,
            value: curr.value
          }
        } else {
          prev[curr.label] = {
            confidence: curr.confidence,
            value: curr.value,
            label: curr.label
          }
        }
      }, {})

      if (parsedPredictions) {
        setPredictions(parsedPredictions)
      }
    }
  }

  return (
    <Container size="lg">
      <div>
        <FileUpload />
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </div>

      <div>
        {predictions ? (
          <table>
            {predictions.map(prediction => (
              <tr>
                <th>{prediction.label}</th>
                <td>{prediction.value}</td>
                <td>{prediction.confidence * 100}</td>
              </tr>
            ))}
          </table>
        ) : null}
      </div>
    </Container>
  )
}
