import { Provider } from "react-redux";
import { store } from "./store/store";
import { NavbarContainer } from "./components/Navbar/NavbarContainer";
import { MainLayout } from "./components/MainLayout/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <NavbarContainer />
      <MainLayout />
    </Provider>
  );
}

export default App;
