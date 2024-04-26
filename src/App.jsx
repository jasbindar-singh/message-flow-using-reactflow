import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainActivity from "./components/MainActivity";
import "reactflow/dist/style.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-screen h-screen">
      <DndProvider backend={HTML5Backend}>
        <MainActivity />
      </DndProvider>
      <Toaster />
    </div>
  );
}

export default App;
