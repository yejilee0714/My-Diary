import { useState, useEffect } from 'react';

import SignUpEmail from './JoinEmail';

export default function SignUp() {
  const [page, setPage] = useState('SignUpEmail');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() => {
        console.log(page)
    }, [page]); 

  return (
    <>
      {page === 'SignUpEmail' ? (
        <SignUpEmail
          setPage={setPage}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        ></SignUpEmail>
      ) : false
      }
    </>
  );
}