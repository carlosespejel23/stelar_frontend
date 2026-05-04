import type { Theme, SxProps } from '@mui/material/styles';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';

import { useState, useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import axios, { endpoints } from 'src/lib/axios';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomPopover } from 'src/components/custom-popover';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type WorkspacesPopoverProps = ButtonBaseProps;

export function WorkspacesPopover({ sx, ...other }: WorkspacesPopoverProps) {
  const mediaQuery = 'sm';

  const { open, anchorEl, onClose, onOpen } = usePopover();
  const { tenants, currentTenant, checkUserSession } = useAuthContext();

  const [switching, setSwitching] = useState(false);

  const handleSwitchTenant = useCallback(
    async (tenantSlug: string) => {
      if (tenantSlug === currentTenant?.slug || switching) return;

      setSwitching(true);
      onClose();

      try {
        const res = await axios.post<{ accessToken: string; refreshToken?: string }>(
          endpoints.auth.switchTenant,
          { tenantSlug }
        );

        const { accessToken, refreshToken } = res.data;

        sessionStorage.setItem('jwt_access_token', accessToken);
        if (refreshToken) localStorage.setItem('jwt_refresh_token', refreshToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        await checkUserSession?.();
      } catch (error) {
        console.error('Error switching tenant:', error);
      } finally {
        setSwitching(false);
      }
    },
    [currentTenant?.slug, switching, onClose, checkUserSession]
  );

  const buttonBg: SxProps<Theme> = {
    height: 1,
    zIndex: -1,
    opacity: 0,
    content: "''",
    borderRadius: 1,
    position: 'absolute',
    visibility: 'hidden',
    bgcolor: 'action.hover',
    width: 'calc(100% + 8px)',
    transition: (theme) =>
      theme.transitions.create(['opacity', 'visibility'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter,
      }),
    ...(open && {
      opacity: 1,
      visibility: 'visible',
    }),
  };

  const renderButton = () => (
    <ButtonBase
      disableRipple
      onClick={onOpen}
      sx={[
        {
          py: 0.5,
          gap: { xs: 0.5, [mediaQuery]: 1 },
          '&::before': buttonBg,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Typography variant="caption" sx={{ color: 'primary.contrastText', fontWeight: 'bold' }}>
          {currentTenant?.name?.charAt(0)?.toUpperCase() ?? '?'}
        </Typography>
      </Box>

      <Box
        component="span"
        sx={{ typography: 'subtitle2', display: { xs: 'none', [mediaQuery]: 'inline-flex' } }}
      >
        {currentTenant?.name ?? 'Sin institución'}
      </Box>

      <Iconify width={16} icon="carbon:chevron-sort" sx={{ color: 'text.disabled' }} />
    </ButtonBase>
  );

  const renderMenuList = () => (
    <CustomPopover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      slotProps={{
        arrow: { placement: 'top-left' },
        paper: { sx: { mt: 0.5, ml: -1.55, width: 240 } },
      }}
    >
      {tenants.length > 0 ? (
        <Scrollbar sx={{ maxHeight: 240 }}>
          <MenuList>
            {tenants.map((tenant) => (
              <MenuItem
                key={tenant.id}
                selected={tenant.slug === currentTenant?.slug}
                onClick={() => handleSwitchTenant(tenant.slug)}
                sx={{ height: 48 }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    bgcolor: tenant.slug === currentTenant?.slug ? 'primary.main' : 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 'bold',
                      color: tenant.slug === currentTenant?.slug ? 'primary.contrastText' : 'text.secondary',
                    }}
                  >
                    {tenant.name.charAt(0).toUpperCase()}
                  </Typography>
                </Box>

                <Typography
                  noWrap
                  component="span"
                  variant="body2"
                  sx={{ flexGrow: 1, fontWeight: 'fontWeightMedium' }}
                >
                  {tenant.name}
                </Typography>

                {tenant.slug === currentTenant?.slug && (
                  <Iconify icon="eva:checkmark-fill" sx={{ color: 'primary.main' }} />
                )}
              </MenuItem>
            ))}
          </MenuList>
        </Scrollbar>
      ) : (
        <>
          <Divider sx={{ my: 0.5, borderStyle: 'dashed' }} />
          <Typography variant="body2" sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
            Sin instituciones disponibles
          </Typography>
        </>
      )}
    </CustomPopover>
  );

  return (
    <>
      {renderButton()}
      {renderMenuList()}
    </>
  );
}
