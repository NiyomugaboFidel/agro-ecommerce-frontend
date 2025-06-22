
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LangProvider } from "./context/LangContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import i18n from "./components/common/components/LangConfig";
import routes from "./routes";
import ScrollToTop from "./components/common/components/ScrollToTop";
import { OrderProvider } from "./context/OrderContext";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

const client=new QueryClient({
  defaultOptions:{
    queries:{
      retry:2,
      refetchOnWindowFocus:false
    }
  }
})
function App() {

  return (
    <QueryClientProvider client={client}>
    <Router>
      <main dir={i18n.t("dir")} className="dark:bg-darkTheme">
        <LangProvider>
        <OrderProvider>
          <CartProvider>
            <WishlistProvider>
                <>
                  <Routes>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        element={<route.element />}
                      >
                        {route.children &&
                          route.children.map((childRoute, childIndex) => (
                            <Route
                              key={childIndex}
                              path={childRoute.path}
                              element={<childRoute.element />}
                            />
                          ))}
                      </Route>
                    ))}
                  </Routes>
                  <Toaster/>
                  <ScrollToTop />
                </>
              {/* // ) : (
              //   <Loading />
              // )} */}
            </WishlistProvider>
          </CartProvider>
          </OrderProvider>
        </LangProvider>
      </main>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
