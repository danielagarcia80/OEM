import { Container, Title, TextInput, Table, Button, Card, Grid, Group, Text } from '@mantine/core';
import { useState } from 'react';
import Image from 'next/image';

// import { useExam } from "../ExamDataProvider";
// import { useRouter } from "next/navigation";
// import LanguageSelector from "../ExamSetup/LanguageSelector";
import { Header } from '../../../Home/0_Header/Header';
import Footer from '../../../Home/4_Footer/Footer';
import classes from './DemoExamSetup.module.css';

const upcomingExams = [
  { name: 'Practice Exam CST340', dueDate: 'April 10, 2025' },
  { name: 'Practice Exam CST320', dueDate: 'May 20, 2025' },
];

const pastExams = [
  { name: 'Quiz 1', dueDate: 'February 15, 2025' },
  { name: 'Quiz 2', dueDate: 'March 5, 2025' },
];

const classData = [
  { title: 'Computer Architecture', code: 'CST320', term: 'Spring 2025', image: '/Images/logo.png' },
  { title: 'Bussines', code: 'CST330', term: 'Spring 2025', image: '/Images/logo.png' },
  { title: 'Data Science', code: 'CST340', term: 'Spring 2025', image: '/Images/logo.png' },
];

export default function DemoExamSetup() {
  const [searchUpcoming, setSearchUpcoming] = useState('');
  const [searchPast, setSearchPast] = useState('');

  return (
    <>
      <Header />
      <Container className={classes.container}>
        <Title order={2} className={classes.greeting}>Hello Student</Title>

        {/* Class Cards */}
        <Grid className={classes.classGrid}>
          {classData.map((classItem) => (
            <Card key={classItem.code} className={classes.classCard} shadow="md" radius="md" withBorder>
              <Image src={classItem.image} alt={classItem.title} className={classes.cardImage} width={300} height={200} />
              <Text fw={600} size="lg" className={classes.cardTitle}>{classItem.title}</Text>
              <Text size="sm" className={classes.cardCode}>{classItem.code}</Text>
              <Text size="sm" className={classes.cardTerm}>{classItem.term}</Text>
            </Card>
          ))}
        </Grid>

        {/* Upcoming Exams */}
        <Title order={3} className={classes.sectionTitle}>Upcoming Exams</Title>
        <Group position="apart">
          <TextInput
            placeholder="Search upcoming exams..."
            value={searchUpcoming}
            onChange={(e) => setSearchUpcoming(e.target.value)}
            className={classes.searchBar}
          />
        </Group>
        <Table striped highlightOnHover className={classes.table}>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingExams.map((exam) => (
              <tr key={exam.name}>
                <td>{exam.name}</td>
                <td>{exam.dueDate}</td>
                <td><Button className={classes.actionButton}>Start</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Past Exams */}
        <Title order={3} className={classes.sectionTitle}>Past Exams</Title>
        <Group position="apart">
          <TextInput
            placeholder="Search past exams..."
            value={searchPast}
            onChange={(e) => setSearchPast(e.target.value)}
            className={classes.searchBar}
          />
        </Group>
        <Table striped highlightOnHover className={classes.table}>
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {pastExams.map((exam) => (
              <tr key={exam.name}>
                <td>{exam.name}</td>
                <td>{exam.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </>
  );
}
