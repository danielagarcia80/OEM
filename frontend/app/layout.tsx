import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import AuthProvider from '@/components/SessionProvider/SessionProvider';
import { theme } from '../theme';
import { ExamDataProvider } from '@/components/Student/Exam/ExamDataProvider';

export const metadata = {
  title: 'OEM - RNA3DS LAB',
  description: 'Oral Examinations Management System',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <ExamDataProvider>
              {children}
            </ExamDataProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
