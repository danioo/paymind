'use client';

import { useRef, useState } from 'react';
import {
  Button,
  Group,
  Text,
  Center,
  rem,
  px,
  useMantineTheme,
} from '@mantine/core';
import { IconX, IconDownload, IconCloudUpload } from '@tabler/icons-react';
import { Dropzone, MIME_TYPES, FileWithPath } from '@mantine/dropzone';
import { pdfjs, Document, Page } from 'react-pdf';
import classes from './FileUpload.module.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function FileUpload() {
  const theme = useMantineTheme();
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const openRef = useRef<() => void>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previews = files.map((file, index) => {
    return (
      <Document
        onLoadError={(error) => console.error(error)}
        key={index}
        file={file}
      >
        <Page pageNumber={1} width={px('25rem') as number} />
      </Document>
    );
  });

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => {
          const dataTransfer = new DataTransfer();

          files.forEach((file) => {
            dataTransfer.items.add(file);
          });

          if (inputRef.current) {
            inputRef.current.files = dataTransfer.files;
          }

          setFiles(files);
        }}
        onReject={(files) => console.log(files)}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
        multiple={false}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                style={{ width: rem(50), height: rem(50) }}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload invoice</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop file here to upload. We can accept only{' '}
            <i>.pdf</i> file that less less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <input
        type="file"
        name="file"
        ref={inputRef}
        className={classes.fileInput}
      />

      <Center>{previews}</Center>

      <Button className={classes.control} type="submit" size="md" radius="xl">
        Process
      </Button>
    </div>
  );
}
