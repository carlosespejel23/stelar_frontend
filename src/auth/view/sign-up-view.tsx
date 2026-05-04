import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Step from '@mui/material/Step';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import MenuItem from '@mui/material/MenuItem';
import StepLabel from '@mui/material/StepLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaUtils } from 'src/components/hook-form';

import { signUp } from '../context/jwt';
import { getErrorMessage } from '../utils';
import { FormHead } from '../components/form-head';
import { SignUpTerms } from '../components/sign-up-terms';

// ----------------------------------------------------------------------

const STEPS = ['Tu cuenta', 'Tu institución'];

const PERIOD_TYPES = [
  { value: 'SEMESTER', label: 'Semestre' },
  { value: 'TRIMESTER', label: 'Trimestre' },
  { value: 'QUARTER', label: 'Cuatrimestre' },
];

const STEP_1_FIELDS = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'] as const;

// ----------------------------------------------------------------------

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const SignUpSchema = z
  .object({
    // Step 1 — user data
    firstName: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
    lastName: z.string().min(2, { message: 'El apellido debe tener al menos 2 caracteres' }),
    email: schemaUtils.email(),
    password: z
      .string()
      .min(1, { message: '¡La contraseña es requerida!' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
    confirmPassword: z.string().min(1, { message: '¡Confirma tu contraseña!' }),
    // Step 2 — institution data
    schoolName: z.string().min(1, { message: 'El nombre de la institución es requerido' }),
    description: z.string().optional(),
    periodType: z.enum(['SEMESTER', 'TRIMESTER', 'QUARTER']).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

// ----------------------------------------------------------------------

export function SignUpView() {
  const router = useRouter();
  const showPassword = useBoolean();
  const showConfirmPassword = useBoolean();

  const [activeStep, setActiveStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      schoolName: '',
      description: '',
      periodType: 'SEMESTER',
    },
  });

  const {
    trigger,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleNext = async () => {
    const valid = await trigger(STEP_1_FIELDS);
    if (valid) {
      setErrorMessage(null);
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    setActiveStep(0);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        schoolName: data.schoolName,
        description: data.description || undefined,
        periodType: data.periodType,
      });

      router.push(paths.auth.verifyEmail, { state: { email: data.email } });
    } catch (error) {
      console.error(error);
      setErrorMessage(getErrorMessage(error));
    }
  });

  return (
    <>
      <FormHead
        title="Crea tu cuenta"
        description={
          <>
            {'¿Ya tienes cuenta? '}
            <Link component={RouterLink} href={paths.auth.signIn} variant="subtitle2">
              Inicia sesión
            </Link>
          </>
        }
        sx={{ textAlign: { xs: 'center', md: 'left' } }}
      />

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {!!errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMessage}
        </Alert>
      )}

      <Form methods={methods} onSubmit={onSubmit}>
        {/* ── Step 1: Datos del usuario ── */}
        <Box sx={{ display: activeStep === 0 ? 'flex' : 'none', gap: 3, flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 3, sm: 2 },
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Field.Text
              name="firstName"
              label="Nombre(s)"
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <Field.Text
              name="lastName"
              label="Apellido(s)"
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>

          <Field.Text
            name="email"
            label="Correo electrónico"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Text
            name="password"
            label="Contraseña"
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
            label="Confirmar contraseña"
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
            variant="contained"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </Box>

        {/* ── Step 2: Datos de la institución ── */}
        <Box sx={{ display: activeStep === 1 ? 'flex' : 'none', gap: 3, flexDirection: 'column' }}>
          <Field.Text
            name="schoolName"
            label="Nombre de la institución"
            placeholder="Ej. Preparatoria Juárez"
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Field.Text
            name="description"
            label="Descripción (opcional)"
            placeholder="Ej. Institución pública de educación media superior"
            slotProps={{ inputLabel: { shrink: true } }}
            multiline
            rows={2}
          />

          <Field.Select
            name="periodType"
            label="Tipo de período académico"
            slotProps={{ inputLabel: { shrink: true } }}
          >
            {PERIOD_TYPES.map((pt) => (
              <MenuItem key={pt.value} value={pt.value}>
                {pt.label}
              </MenuItem>
            ))}
          </Field.Select>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              fullWidth
              color="inherit"
              size="large"
              variant="outlined"
              onClick={handleBack}
            >
              Atrás
            </Button>

            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              loadingIndicator="Creando cuenta..."
            >
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Form>

      <SignUpTerms />
    </>
  );
}
