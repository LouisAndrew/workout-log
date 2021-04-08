import React, { useEffect, useState } from 'react';
import { useAuth } from '@h/useAuth';

function App() {
  const [r, setR] = useState(false);
  const { getUser, signIn, signUp } = useAuth();

  useEffect(() => {
    if (r) {
      setR(false);
    }
  }, [r]);

  const email = 'louisandrew3@gmail.com';
  const password = 'abcdef';

  return (
    <div className="App">
      <header className="App-header" />
      {getUser() ? (
        JSON.stringify(getUser())
      ) : (
        <>
          <button
            type="button"
            onClick={() => signIn(email, password).then(() => setR(true))}
          >
            sign in
          </button>
          <button
            type="button"
            onClick={() => signUp(email, password).then(() => setR(true))}
          >
            sign up
          </button>
        </>
      )}
    </div>
  );
}

export default App;
