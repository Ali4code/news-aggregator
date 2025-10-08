import { Provider } from "react-redux";
import { store } from "@app/store";
import { NavbarContainer } from "@widgets/navbar/NavbarContainer";
import { MainLayout } from "@widgets/main-layout/MainLayout";
import { initializeRoutes } from "@shared/routing/routes";

// Initialize routes on app load
initializeRoutes();

function App() {
  return (
    <Provider store={store}>
      <NavbarContainer />
      <MainLayout />
    </Provider>
  );
}

export default App;
