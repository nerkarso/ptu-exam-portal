import Button from '@/elements/Button';
import FormControl from '@/elements/FormControl';
import FormHelperText from '@/elements/FormHelperText';
import Input from '@/elements/Input';
import Note from '@/elements/Note';
import { useAuth } from '@/hooks/useAuth';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { isLoggedIn, setLoggedIn } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const { submit, data, error, loading } = useLogin();

  const onSubmit = (values) => submit(values);

  useEffect(() => {
    if (data) {
      setLoggedIn(data);
    }
  }, [data]);

  useEffect(() => {
    if (isLoggedIn) {
      Router.replace('/');
    }
  }, [isLoggedIn]);

  if (isLoggedIn && !data) return null;

  return (
    <main className="grid h-full place-items-center">
      <form className="w-full max-w-sm px-6 py-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        {error && (
          <Note type="error" label="Error">
            {error.message}
          </Note>
        )}
        <div className="space-y-3">
          <FormControl>
            <Input type="text" id="username" placeholder="Username" ref={register({ required: true })} />
            {errors.username && <RequiredFieldHelperText />}
          </FormControl>
          <FormControl>
            <Input type="password" id="password" placeholder="Password" ref={register({ required: true })} />
            {errors.password && <RequiredFieldHelperText />}
          </FormControl>
        </div>
        <Button type="submit" loading={loading} loadingText="Authenticating..." className="w-full">
          Log in
        </Button>
      </form>
    </main>
  );
}

function useLogin() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setError(null);
    setLoading(true);
    try {
      const data = await (
        await fetch('/api/login', {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        })
      ).json();
      if (data && data.auth) {
        setData(data.userToken);
      } else {
        setError({ message: 'Username or password is incorrect' });
      }
    } catch (ex) {
      setError(ex);
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    data,
    error,
    loading,
  };
}

function Logo() {
  return (
    <div className="space-y-3">
      <img src="/logo.svg" alt="Logo" className="w-16 h-16 mx-auto" />
      <h1 className="text-2xl font-bold text-center">Log in to continue</h1>
    </div>
  );
}

function RequiredFieldHelperText() {
  return <FormHelperText type="error">This field is required</FormHelperText>;
}
