import { Button, Card, Popover } from "./components";

function App() {
  return (
    <div className="h-full w-full">
      <div className="mt-12 ml-10">
        <Popover>
          <Popover.Target>
            <Button label="Share" />
          </Popover.Target>
          <Popover.Content>
            <Card>
              <h1>Hi, I'm here</h1>
            </Card>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}

export default App;
