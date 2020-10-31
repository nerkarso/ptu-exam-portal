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
      const res = await fetch('/api/students/login', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data && data.error) {
        setError(data.message);
      }
      if (data && data.token) {
        let expires = new Date();
        expires.setTime(expires.getTime() + 30 * 60 * 60 * 24 * 1000);
        document.cookie = `token=${data.token};expires=${expires.toUTCString()};path=/`;
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
      </Head>
      <main className="grid h-full place-items-center">
        <div className="w-full max-w-sm p-6 bg-white rounded shadow">
          <h1 className="pb-3 text-2xl font-semibold text-center">Log in</h1>
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
            <button type="submit" className="w-full btn btn--primary" disabled={loading}>
              {loading ? 'Authenticating...' : 'Log in'}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
