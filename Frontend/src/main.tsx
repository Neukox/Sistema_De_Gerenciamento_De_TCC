import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./features/auth/context/AuthContextProvider.tsx";
import TCCProvider from "./features/TCC/contexts/TCCProvider.tsx";
import queryClient from "./lib/api/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <TCCProvider>
            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              theme="colored"
            />
          </TCCProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
