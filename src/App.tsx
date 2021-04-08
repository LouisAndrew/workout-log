import React from 'react';

import { useSupabase } from '@h/useSupabase';

function App() {
  const { get } = useSupabase();

  return (
    <div className="App">
      <header className="App-header" />
      <button type="button" onClick={() => console.log(get())}>
        get supabase
      </button>
    </div>
  );
}

export default App;
