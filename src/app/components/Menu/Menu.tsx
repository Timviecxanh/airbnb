
'use client'
import Demo from "./Card"
import { Grid, Container } from "@mantine/core";

function DemoGrid() {
  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 2 }}>
          <Demo />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

function App() {
  return (
    <>
      <DemoGrid />
    </>
  );
}

export default App;
