import { CONFIG } from 'src/global-config';

import { SignUpView } from 'src/auth/view';

// ----------------------------------------------------------------------

const metadata = { title: `Registrarse | ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <SignUpView />
    </>
  );
}
