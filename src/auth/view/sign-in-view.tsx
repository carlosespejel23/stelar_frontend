import type { TenantInfo } from 'src/auth/types';

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { AnimateLogoRotate } from 'src/components/animate';
import { Form, Field, schemaUtils } from 'src/components/hook-form';

import { useAuthContext } from '../hooks';
import { getErrorMessage } from '../utils';
import { FormHead } from '../components/form-head';
import { signIn, signInWithTenant } from '../context/jwt';

// ----------------------------------------------------------------------

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignInSchema = z.object({
  email: schemaUtils.email(),
  password: z.string().min(1, { message: '¡La contraseña es requerida!' }),
});

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showPassword = useBoolean();
  const { checkUserSession } = useAuthContext();

  const justRegistered = searchParams.get('registered') === '1';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingTenants, setPendingTenants] = useState<TenantInfo[] | null>(null);
  const [pendingCredentials, setPendingCredentials] = useState<SignInSchemaType | null>(null);
  const [pendingPreAuthToken, setPendingPreAuthToken] = useState<string | null>(null);
  const [selectedTenantSlug, setSelectedTenantSlug] = useState<string | null>(null);
  const [isSubmittingTenant, setIsSubmittingTenant] = useState(false);

  const methods = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Step 1: validate credentials
  const onSubmitCredentials = handleSubmit(async (data) => {
    try {
      setErrorMessage(null);
      const result = await signIn({ email: data.email, password: data.password });

      if (result.requiresTenantSelection) {
        setPendingCredentials(data);
        setPendingTenants(result.tenants);
        setPendingPreAuthToken(result.preAuthToken);
        setSelectedTenantSlug(result.tenants[0]?.slug ?? null);
      } else {
        await checkUserSession?.();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  });

  // Step 2: login with selected tenant
  const onSubmitTenant = async () => {
    if (!pendingCredentials || !selectedTenantSlug) return;

    setIsSubmittingTenant(true);
    setErrorMessage(null);

    try {
      await signInWithTenant({
        email: pendingCredentials.email,
        password: pendingCredentials.password,
        tenantSlug: selectedTenantSlug,
        preAuthToken: pendingPreAuthToken,
      });
      await checkUserSession?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmittingTenant(false);
    }
  };

  const handleBackToCredentials = () => {
    setPendingTenants(null);
    setPendingCredentials(null);
    setPendingPreAuthToken(null);
    setSelectedTenantSlug(null);
    setErrorMessage(null);
  };

  // ---- Render: tenant selector (step 2) ----
  if (pendingTenants) {
    return (
      <>
        <FormHead
          title="Selecciona tu institución"
          description="Tienes acceso a varias instituciones. Selecciona con cuál deseas iniciar sesión."
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        />

        {!!errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        <MenuList
          sx={{
            mb: 3,
            gap: 0,
            display: 'flex',
            flexDirection: 'column',
            border: (theme) => `1px solid ${theme.vars.palette.divider}`,
            borderRadius: 1,
            overflow: 'hidden',
          }}
        >
          {pendingTenants.map((tenant, index) => (
            <Box key={tenant.id}>
              <MenuItem
                selected={selectedTenantSlug === tenant.slug}
                onClick={() => setSelectedTenantSlug(tenant.slug)}
                sx={{ py: 1.5, px: 2, gap: 2 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ color: 'primary.contrastText' }}>
                    {tenant.name.charAt(0).toUpperCase()}
                  </Typography>
                </Box>

                <Typography variant="subtitle2" sx={{ flexGrow: 1 }} noWrap>
                  {tenant.name}
                </Typography>

                {selectedTenantSlug === tenant.slug && (
                  <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
                )}
              </MenuItem>

              {index < pendingTenants.length - 1 && (
                <Divider sx={{ borderStyle: 'dashed' }} />
              )}
            </Box>
          ))}
        </MenuList>

        <Button
          fullWidth
          color="inherit"
          size="large"
          variant="contained"
          loading={isSubmittingTenant}
          loadingIndicator="Iniciando sesión..."
          disabled={!selectedTenantSlug}
          onClick={onSubmitTenant}
        >
          Iniciar sesión
        </Button>

        <Button fullWidth size="large" variant="text" sx={{ mt: 1 }} onClick={handleBackToCredentials}>
          Volver
        </Button>
      </>
    );
  }

  // ---- Render: credentials form (step 1) ----
  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />

      <FormHead
        title="Inicia sesión en tu cuenta"
        description={
          <>
            {'¿No tienes cuenta? '}
            <Link component={RouterLink} href={paths.auth.signUp} variant="subtitle2">
              Regístrate
            </Link>
          </>
        }
      />

      {justRegistered && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Cuenta creada. Revisa tu correo para verificar tu cuenta.
        </Alert>
      )}

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmitCredentials}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Field.Text
            name="email"
            label="Correo electrónico"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
            <Link
              component={RouterLink}
              href={paths.auth.forgotPassword}
              variant="body2"
              color="inherit"
              sx={{ alignSelf: 'flex-end' }}
            >
              ¿Olvidaste tu contraseña?
            </Link>

            <Field.Text
              name="password"
              label="Contraseña"
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
          </Box>

          <Button
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Verificando..."
          >
            Continuar
          </Button>
        </Box>
      </Form>
    </>
  );
}
