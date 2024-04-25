import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "reactflow/dist/style.css";
import MainActivity from "./components/MainActivity";

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full">
        <div className="h-[56px] flex items-center justify-end px-[24px] bg-gray-200">
          <button>Save Changes</button>
        </div>

        <DndProvider backend={HTML5Backend}>
          <MainActivity />
        </DndProvider>
      </div>
    </div>
  );
}

export default App;
