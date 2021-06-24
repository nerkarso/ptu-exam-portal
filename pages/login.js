import Button from '@/elements/Button';
import FormControl from '@/elements/FormControl';
import FormHelperText from '@/elements/FormHelperText';
import Input from '@/elements/Input';
import Note from '@/elements/Note';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const router = useRouter();
  const { error, loading, isLoggedIn, login } = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (values) => login(values);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // Automatically focus on the username field
    const usernameElem = document.querySelector('#username');
    if (usernameElem) usernameElem.focus();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <main className="grid flex-grow place-items-center">
        <form className="w-full max-w-sm px-6 py-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Logo />
          {error && (
            <Note type="error" label="Error">
              {error}
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
      <footer className="flex-shrink-0 px-4 py-6 text-sm text-center text-base-500 dark:text-invert-500">
        <p>
          &copy; 2020-{new Date().getFullYear()}
          {' Made by '}
          <a
            href="https://nerkarso.github.io"
            className="font-semibold transition duration-300 text-primary-600 dark:text-primary-500 hover:text-primary-500 dark:hover:text-primary-400 focus:outline-none focus:bg-primary-500 focus:bg-opacity-20"
            target="_blank"
            rel="noopener noreferrer">
            Ner Karso
          </a>
        </p>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="space-y-3 text-center">
      <img src="/logo.svg" alt="Logo" className="w-16 h-16 mx-auto" />
      <h1 className="text-2xl font-bold">PTU Exam Portal</h1>
      <p className="text-base-500 dark:text-invert-500">Please verify yourself to continue</p>
    </div>
  );
}

function RequiredFieldHelperText() {
  return <FormHelperText type="error">This field is required</FormHelperText>;
}
