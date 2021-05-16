<p align="center">
  <img src="public/icon.png" width="96" alt="Icon" />
</p>

<h1 align="center">PTU Exam Portal</h1>

<p align="center">The fastest and easiest way to access the IKGPTU exam portal.</p>

<p align="center">
  <img src="demo.png" width="720" />
</p>

> NOTE: This project is not affiliated with [I.K. Gujral Punjab Technical University](https://www.ptu.ac.in) nor do we host or serve any sensitive data (student records) on (or from) our server.

## Stack

- Next.js `10.x`
- React `17.x`
- Tailwind CSS `2.x`

## Requirements

- Node.js `14.x`

## Getting started

1. Install Node.js dependencies:

```sh
yarn
```

2. Create a new file called `.env.local` and add the following:

```sh
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_BASE_URL=/api/v1
NEXT_PUBLIC_PROXY_URL=https://example.com
NEXT_PUBLIC_SITE_URL=https://example.vercel.app
SOURCE_API_BASE_URL=https://api.example.com/api
SOURCE_API_ORIGIN_URL=https://example.com
```

**Replace the values according to your environment.**

> NOTE: It is possible to override all the environment variables which are specified in the `.env` file.

## Development

**Start the local development server**

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

> NOTE: This project is hosted on [Vercel](https://vercel.com).

1. Put this repository on GitHub or any other supported Git provider.
2. Create a [new project](https://vercel.com/new) on Vercel.
3. Connect the repository to the project.
4. Add the following [environment variables](https://vercel.com/docs/environment-variables):

| Variable                     | Description                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `JWT_SECRET`                 | [JSON Web Token](https://jwt.io) secret key to encrypt the user credentials           |
| `NEXT_PUBLIC_API_BASE_URL`   | Base URL to which the endpoint paths are appended                                     |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics tracking ID (optional)                                               |
| `NEXT_PUBLIC_PROXY_URL`      | Proxy server to enable [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) |
| `NEXT_PUBLIC_SITE_URL`       | Domain of the project (e.g. https://example.vercel.app)                               |
| `SOURCE_API_BASE_URL`        | Base URL to which the endpoint paths are appended                                     |
| `SOURCE_API_ORIGIN_URL`      | The Origin request header indicates where a request originates from                   |

## License

[MIT License](LICENSE)
