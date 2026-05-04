import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams } from 'src/routes/hooks';

import { OrderCompleteIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import { getErrorMessage } from '../utils';
import { resetPassword } from '../context/jwt';
import { FormHead } from '../components/form-head';

// ----------------------------------------------------------------------

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: '¡La contraseña es requerida!' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string().min(1, { message: '¡Confirma tu contraseña!' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function ResetPasswordView() {
  const searchParams = useSearchParams();
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const token = searchParams.get('token');

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [tokenInvalid, setTokenInvalid] = useState(false);

  const methods = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    if (!token) {
      setTokenInvalid(true);
      return;
    }

    try {
      await resetPassword({ token, newPassword: data.newPassword });
      setSuccess(true);
    } catch (error) {
      const msg = getErrorMessage(error);
      // Detect expired/invalid token errors from backend
      if (msg.toLowerCase().includes('expirado') || msg.toLowerCase().includes('inválido') || msg.toLowerCase().includes('invalido')) {
        setTokenInvalid(true);
      } else {
        setErrorMessage(msg);
      }
    }
  });

  // ── No token in URL ──
  if (!token || tokenInvalid) {
    return (
      <>
        <FormHead
          title="Enlace inválido o expirado"
          description="El enlace para restablecer la contraseña ha expirado o no es válido."
          sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}
        />

        <Button
          component={RouterLink}
          href={paths.auth.forgotPassword}
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
        >
          Solicitar nuevo enlace
        </Button>
      </>
    );
  }

  // ── Success ──
  if (success) {
    return (
      <>
        <OrderCompleteIllustration sx={{ width: 1, maxWidth: 280, mx: 'auto', mb: 3 }} />

        <FormHead
          title="¡Contraseña actualizada!"
          description="Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña."
          sx={{ textAlign: { xs: 'center', md: 'left' }, mb: 4 }}
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

  // ── Form ──
  return (
    <>
      <FormHead
        title="Establece tu nueva contraseña"
        description="Ingresa y confirma tu nueva contraseña."
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text
            name="newPassword"
            label="Nueva contraseña"
            placeholder="8+ caracteres"
            type={showPassword.value ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showPassword.onToggle} edge="end">
                      <Iconify
                        icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Field.Text
            name="confirmPassword"
            label="Confirmar nueva contraseña"
            type={showConfirmPassword.value ? 'text' : 'password'}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={showConfirmPassword.onToggle} edge="end">
                      <Iconify
                        icon={
                          showConfirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Restableciendo..."
          >
            Restablecer contraseña
          </Button>
        </Box>
      </Form>
    </>
  );
}
