import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data && !data.auth) {
        setError(data.message);
      }
      if (data && data.auth) {
        window.localStorage.setItem('userToken', data.userToken);
        Router.replace('/');
      }
    } catch (ex) {
      setError(ex.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <>
      <Head>
        <title>Log in | PTU Exam Portal</title>
        <link rel="icon" href="/icon.png" />
      </Head>
      <main className="grid h-full place-items-center">
        <div className="w-full max-w-sm p-6 rounded sm:border border-base-300 dark:border-base-700">
          <img src="/icon.png" className="w-16 h-16 mx-auto dark:filter-invert" alt="Logo" />
          <h1 className="pb-3 mt-6 text-2xl font-semibold text-center">Log in to continue</h1>
          {error && <div className="alert alert--danger">{error}</div>}
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="mt-3">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleInputChange}
                className="w-full form-input"
                placeholder="Username"
                required
              />
            </div>
            <div className="mt-3">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleInputChange}
                className="w-full form-input"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className={'w-full mt-4 btn btn--primary' + (loading ? ' cursor-not-allowed' : '')}
              disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </span>
              ) : (
                'Log in'
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
