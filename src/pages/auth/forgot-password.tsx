import { CONFIG } from 'src/global-config';

import { ForgotPasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Olvidé mi contraseña | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ForgotPasswordView />
    </>
  );
}
