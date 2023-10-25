'use client'

import { useState } from 'react';
import Link from 'next/link'
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight, IconHome2, IconFileInvoice, IconTextRecognition } from '@tabler/icons-react';
import classes from './LinkGroup.module.css';

interface LinkGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

export function LinkGroup({ icon: Icon, label, link, initiallyOpened, links }: LinkGroupProps) {
  const hasLinks = Array.isArray(links);
  const hasLink = !!link
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Link>
  ));
  const button = <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
  <Group justify="space-between" gap={0}>
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <ThemeIcon variant="light" size={30}>
        <Icon style={{ width: rem(18), height: rem(18) }} />
      </ThemeIcon>
      <Box ml="md">
        {label}
      </Box>
    </Box>
    {hasLinks && (
      <IconChevronRight
        className={classes.chevron}
        stroke={1.5}
        style={{
          width: rem(16),
          height: rem(16),
          transform: opened ? 'rotate(-90deg)' : 'none',
        }}
      />
    )}
  </Group>
</UnstyledButton>

  return (
    <>
      {hasLink ? <Link href={link}>{button}</Link> : button}
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const links = [
  {
    label: 'Home',
    icon: IconHome2,
    link: '/'
  },
  {
    label: 'Process Invoice',
    icon: IconTextRecognition,
    link: '/process'
  },
  {
    label: 'My Invoices',
    icon: IconFileInvoice,
    link: '/invoices'
  }
];

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      {links.map(link => <LinkGroup {...link} />)}
    </Box>
  );
}