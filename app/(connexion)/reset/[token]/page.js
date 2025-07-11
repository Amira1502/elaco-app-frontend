import ResetPasswordClient from './ResetPasswordClient';

export default function Page({ params }) {
  const { token } = params;

  return <ResetPasswordClient token={token} />;
}
