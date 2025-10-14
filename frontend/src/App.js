import DefaultLayout from "./components/DefaultLayout";
import Messages from "./components/Messages";

function App() {
  return (
    <div className="App w-[100vw] h-[100vh]">
      <DefaultLayout>
        <Messages />
      </DefaultLayout>
    </div>
  );
}

export default App;
