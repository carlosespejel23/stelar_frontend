import { useLocation } from 'react-router';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams } from 'src/routes/hooks';

import { SeoIllustration } from 'src/assets/illustrations';

import { getErrorMessage } from '../utils';
import { FormHead } from '../components/form-head';
import { verifyEmail, resendVerificationEmail } from '../context/jwt';

// ----------------------------------------------------------------------

type VerifyState = 'idle' | 'verifying' | 'success' | 'error';

const RESEND_COOLDOWN = 60;

export function VerifyEmailView() {
  const location = useLocation();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const emailFromState = (location.state as { email?: string } | null)?.email ?? '';

  const [verifyState, setVerifyState] = useState<VerifyState>(token ? 'verifying' : 'idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // Auto-verify when token is in URL
  useEffect(() => {
    if (!token) return;

    const runVerify = async () => {
      try {
        setVerifyState('verifying');
        await verifyEmail({ token });
        setVerifyState('success');
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
        setVerifyState('error');
      }
    };

    runVerify();
  }, [token]);

  // Countdown timer for resend cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return undefined;

    const timer = window.setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return function cleanup() {
      window.clearInterval(timer);
    };
  }, [resendCooldown]);

  const handleResend = useCallback(async () => {
    const email = emailFromState;
    if (!email) return;

    setResendLoading(true);
    setResendSuccess(false);

    try {
      await resendVerificationEmail({ email });
      setResendSuccess(true);
      setResendCooldown(RESEND_COOLDOWN);
    } catch {
      // Silently fail to avoid revealing if the email exists
      setResendSuccess(true);
      setResendCooldown(RESEND_COOLDOWN);
    } finally {
      setResendLoading(false);
    }
  }, [emailFromState]);

  // ── Token flow: verifying ──
  if (token && verifyState === 'verifying') {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 3 }} />
        <Typography variant="body2" color="text.secondary">
          Verificando tu correo electrónico...
        </Typography>
      </Box>
    );
  }

  // ── Token flow: success ──
  if (token && verifyState === 'success') {
    return (
      <>
        <SeoIllustration hideBackground sx={{ width: 1, maxWidth: 280, mx: 'auto', mb: 3 }} />

        <FormHead
          title="¡Correo verificado!"
          description="Tu cuenta ha sido verificada exitosamente. Ya puedes iniciar sesión."
          sx={{ textAlign: 'center', mb: 4 }}
        />

        <Button
          component={RouterLink}
          href={paths.auth.signIn}
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
        >
          Iniciar sesión
        </Button>
      </>
    );
  }

  // ── Token flow: error ──
  if (token && verifyState === 'error') {
    return (
      <>
        <FormHead
          title="Enlace inválido o expirado"
          description="El enlace de verificación ha expirado o no es válido."
          sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 3 }}
        />

        {!!errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
            loading={resendLoading}
            disabled={resendCooldown > 0}
            onClick={handleResend}
          >
            {resendCooldown > 0
              ? `Reenviar en ${resendCooldown}s`
              : 'Reenviar correo de verificación'}
          </Button>

          {resendSuccess && (
            <Alert severity="success">
              Correo reenviado. Revisa tu bandeja de entrada y spam.
            </Alert>
          )}

          <Button
            component={RouterLink}
            href={paths.auth.signIn}
            fullWidth
            size="large"
            variant="text"
            color="inherit"
          >
            Ir al inicio de sesión
          </Button>
        </Box>
      </>
    );
  }

  // ── No token: informative page (post-registration) ──
  return (
    <>
      <SeoIllustration hideBackground sx={{ width: 1, maxWidth: 280, mx: 'auto', mb: 3 }} />

      <FormHead
        title="Revisa tu correo electrónico"
        description={
          emailFromState ? (
            <>
              Hemos enviado un enlace de verificación a{' '}
              <Box component="strong">{emailFromState}</Box>. Revisa tu bandeja de entrada y spam
              para activar tu cuenta.
            </>
          ) : (
            'Hemos enviado un enlace de verificación a tu correo. Revisa tu bandeja de entrada y spam para activar tu cuenta.'
          )
        }
        sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}
      />

      {resendSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Correo reenviado{emailFromState ? ` a ${emailFromState}` : ''}. Revisa tu bandeja de
          entrada y spam.
        </Alert>
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          component={RouterLink}
          href={paths.auth.signIn}
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
        >
          Ir al inicio de sesión
        </Button>

        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          {'¿No recibiste el correo? '}
          {resendCooldown > 0 ? (
            <Box component="span" sx={{ color: 'text.disabled' }}>
              Reenviar en {resendCooldown}s
            </Box>
          ) : (
            <Link
              component="button"
              type="button"
              variant="subtitle2"
              onClick={handleResend}
              disabled={resendLoading}
              sx={{ verticalAlign: 'baseline', cursor: 'pointer' }}
            >
              {resendLoading ? 'Reenviando...' : 'Reenviar'}
            </Link>
          )}
        </Typography>
      </Box>
    </>
  );
}
