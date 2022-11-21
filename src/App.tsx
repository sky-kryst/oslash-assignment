import { GlobeSVG } from "./assets/SVGs";
import { Box, Button, Card, Popover } from "./components";

function App() {
  return (
    <div className="h-full w-full">
      <div className="absolute top-20 left-28">
        <Popover>
          <Popover.Target>
            <Button label="Share" />
          </Popover.Target>
          <Popover.Content>
            <Card>
              <div className="w-96 flex flex-col justify-start items-stretch">
                <Box className="h-12">
                  <div className="flex justify-around items-center w-7/12 border border-black">
                    <GlobeSVG />
                    <div></div>
                  </div>
                </Box>
                <Box>
                  <></>
                </Box>
                <Box>
                  <></>
                </Box>
              </div>
            </Card>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}

export default App;
