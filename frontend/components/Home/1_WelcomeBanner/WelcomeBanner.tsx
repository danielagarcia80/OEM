'use client'; // Ensures this is a Client Component

import { Title, Text, Button, Image, Container } from '@mantine/core';
import classes from './WelcomeBanner.module.css';
import { useRouter } from "next/navigation";
import { IconDeviceTvOld, IconLogin2, IconUser } from '@tabler/icons-react';

export function WelcomeBanner() {
  const router = useRouter();

  const handleExamStart = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/student/demo-exam-setup');
  };

  const handleOpenDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/proctor/instructor-dashboard');
  };

  return (
    <Container size="md" className={classes.container}>
      <Title className={classes.title} ta="center" mt={100} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Image
          style={{ width: '300px', height: '300px' }} // Circular logo
          src={'/Images/logo.png'}
        />
        {/* <Text inherit variant="gradient" component="span" gradient={{ from: 'Blue', to: 'Gold' }}>
          Code Oriented Oral Exam Manager
        </Text> */}
      </Title>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '40px' }}>
        <Button
          size="xl"
          className={classes.Button}
          onClick={handleExamStart}
          leftSection={<IconLogin2 size={34} />}
          style={{ width: '25%' }}
        >
          Try Demo
        </Button>
        <Button
          size="xl"
          className={classes.Button}
          onClick={handleOpenDashboard}
          leftSection={<IconUser size={34} />}
          style={{ width: '25%' }}
        >
          Sign In
        </Button>
      </div>
    </Container>
  );
}
