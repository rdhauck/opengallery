// Shares one on/off setting with every part of the site.

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const BlueprintContext = createContext(null);

export function BlueprintProvider({ children }) {
  const [on, setOn] = useState(false);

  // The CSS in blueprint.css reacts to this attribute on the <html> element.
  useEffect(() => {
    document.documentElement.dataset.blueprint = on ? 'on' : 'off';
  }, [on]);

  const value = useMemo(() => ({ on, toggle: () => setOn((current) => !current) }), [on]);

  return <BlueprintContext.Provider value={value}>{children}</BlueprintContext.Provider>;
}

export function useBlueprint() {
  return useContext(BlueprintContext);
}
