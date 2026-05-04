import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SeoIllustration } from 'src/assets/illustrations';

import { Form, Field, schemaUtils } from 'src/components/hook-form';

import { forgotPassword } from '../context/jwt';
import { FormHead } from '../components/form-head';

// ----------------------------------------------------------------------

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: schemaUtils.email(),
});

const RESEND_COOLDOWN = 60;

// ----------------------------------------------------------------------

export function ForgotPasswordView() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const methods = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = methods;

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await forgotPassword({ email: data.email });
    } catch {
      // Intentionally swallow the error — security: don't reveal if email exists.
    } finally {
      setSubmittedEmail(data.email);
      setSubmitted(true);
      setResendCooldown(RESEND_COOLDOWN);
    }
  });

  const handleResend = useCallback(async () => {
    const email = submittedEmail || getValues('email');
    if (!email) return;

    setResendLoading(true);

    try {
      await forgotPassword({ email });
    } catch {
      // Intentionally swallow — same security reason
    } finally {
      setResendLoading(false);
      setResendCooldown(RESEND_COOLDOWN);
    }
  }, [getValues, submittedEmail]);

  // ── After submit: confirmation screen ──
  if (submitted) {
    return (
      <>
        <SeoIllustration hideBackground sx={{ width: 1, maxWidth: 280, mx: 'auto', mb: 3 }} />

        <FormHead
          title="Correo enviado"
          description={
            <>
              Si existe una cuenta con{' '}
              <Box component="strong">{submittedEmail}</Box>, recibirás un enlace para restablecer
              tu contraseña. Revisa tu bandeja de entrada y spam.
            </>
          }
          sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            component={RouterLink}
            href={paths.auth.signIn}
            fullWidth
            color="inherit"
            size="large"
            variant="contained"
          >
            Volver al inicio de sesión
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

  // ── Initial form ──
  return (
    <>
      <FormHead
        title="¿Olvidaste tu contraseña?"
        description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text
            name="email"
            label="Correo electrónico"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Enviando enlace..."
          >
            Enviar enlace
          </Button>

          <Link
            component={RouterLink}
            href={paths.auth.signIn}
            variant="body2"
            color="inherit"
            sx={{ alignSelf: 'center' }}
          >
            Volver al inicio de sesión
          </Link>
        </Box>
      </Form>
    </>
  );
}
