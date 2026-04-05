import { Button, Card, CardBody } from "@heroui/react";

export default function App() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-foreground">My Design System</h1>
        <p className="text-default-500">
          Built with React + TypeScript + Tailwind CSS + HeroUI
        </p>

        <Card>
          <CardBody className="gap-4">
            <h2 className="text-xl font-semibold">Components Preview</h2>
            <div className="flex flex-wrap gap-3">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
