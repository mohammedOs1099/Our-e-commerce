import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./Routes/Routes";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={routes}></RouterProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
