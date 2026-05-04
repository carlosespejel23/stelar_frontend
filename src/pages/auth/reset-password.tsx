import { CONFIG } from 'src/global-config';

import { ResetPasswordView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Restablecer contraseña | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <ResetPasswordView />
    </>
  );
}
