import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Flex, Group, Image, TextInput } from '@mantine/core';
import classes from './Header.module.css';
import { IconSearch } from '@tabler/icons-react';


  const links = [
  { link: '/', label: 'Home' }, 
  { link: '/login', label: 'Dashboard Login' },
  { link: 'about', label: 'About' },
];

export function Header() {
  const [active, setActive] = useState(null);
  const router = useRouter();

  const handleNavigation = (event, link) => {
    event.preventDefault();
    setActive(link);

    if (link === 'about') {  // Scroll to about section
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(link);
    }
  };


  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => handleNavigation(event, link.link)}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Flex align="center">
          {/* <Image
            radius="md"
            height={50}
            width="auto"
            fit="contain"
            src="/Images/logo.png"
          /> */}
        </Flex>

        {/* Navigation Links & Search Bar */}
        <Flex align="center" justify="flex-end" gap={20}>
          <Group className={classes.navLinks}>{items}</Group>
          <TextInput
            placeholder="Search..."
            icon={<IconSearch size={18} />}
            className={classes.searchBar}
          />
        </Flex>
      </Container>
    </header>
  );
}
