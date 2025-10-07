import { Provider } from "react-redux";
import { store } from "@app/store";
import { NavbarContainer } from "@widgets/navbar/NavbarContainer";
import { MainLayout } from "@widgets/main-layout/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <NavbarContainer />
      <MainLayout />
    </Provider>
  );
}

export default App;
