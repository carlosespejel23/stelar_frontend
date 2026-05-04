import { CONFIG } from 'src/global-config';

import { VerifyEmailView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Verificar correo | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <VerifyEmailView />
    </>
  );
}
