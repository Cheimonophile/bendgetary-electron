import { createContext, FC, useCallback, useContext, useMemo, useState } from "react";

import { createRoot } from 'react-dom/client';

import { Nav } from './components/Nav'
import { Page, pageManifest } from './manifests/pageManifest'
import { Icon } from "./components/Icon";


/**
 * Context for the app
 */
const AppContext = createContext<{
  page: Page;
  setPage: (page: Page) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
} | null>(null);


/**
 * Get the context of the app component
 */
export const useAppContext = () => {
  const appContextState = useContext(AppContext);
  if (!appContextState) {
    throw new Error("App context not found");
  }
  return appContextState;
}


/**
 * Core component of the application
 */
export const App: FC = () => {

  // ui state
  const [page, setPage] = useState<Page>("battles");
  const [loadingCount, setLoadingCount] = useState(0);

  const { Component: PageComponent } = useMemo(() => pageManifest[page], [page]);

  /**
   * Whether the app is loading
   */
  const isLoading = loadingCount > 0;

  /**
   * Set whether the app is loading
   */
  const setIsLoading = useCallback((isLoading: boolean) => {
    setLoadingCount(
      prevLoadingCount => isLoading
        ? prevLoadingCount + 1
        : prevLoadingCount - 1
    );
  }, []);


  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        isLoading,
        setIsLoading,
      }}>
      <div className="w-full h-full flex flex-row">

        {/** Sidebar */}
        <Nav />

        {/** Main content */}
        <div className="flex-1 flex flex-col p-2 gap-2 overflow-hidden">

          {/** Page Header */}
          <div>
            <h1 className="text-2xl font-bold">{pageManifest[page].label}</h1>
          </div>


          {/** Page Body */}
          <div className="flex-1 overflow-hidden">
            {PageComponent && <PageComponent />}
          </div>
        </div>

      </div>

      {/** Cover for if the application is loading */}
      {isLoading && (
        <div className="fixed inset-0 backdrop-brightness-90 flex items-center justify-center z-50">
          <div className="w-8 h-8 animate-spin">
            <Icon icon="ArrowPathIcon" style="solid" />
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}



const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement)
  root.render(<App />);
}