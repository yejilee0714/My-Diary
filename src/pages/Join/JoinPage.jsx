import { useState, useEffect } from 'react';

import JoinEmailForm from './JoinEmail';
import ProfileSettings from './JoinInfo';

export default function SignUp() {
  const [page, setPage] = useState('JoinEmailForm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    useEffect(() => {
        console.log(page)
    }, [page]); 

  return (
    <>
      {page === 'JoinEmailForm' ? (
        <JoinEmailForm
          setPage={setPage}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        ></JoinEmailForm>
      ) : (<ProfileSettings email={email} password={password}></ProfileSettings>)
      }
    </>
  );
}