import { ShareSVG } from "./assets/SVGs";
import { Button, Popover, ShareModal, ToastQueue } from "./components";

function App() {
  return (
    <div className="h-full w-full pt-6 pl-5">
      <Popover>
        <Popover.Target>
          <Button label="Share" rightIcon={<ShareSVG />} />
        </Popover.Target>
        <div className="relative h-fit w-fit">
          <Popover.Content>
            <ShareModal pageName="currentPage"/>
          </Popover.Content>
        </div>
      </Popover>
      <ToastQueue />
    </div>
  );
}

export default App;
