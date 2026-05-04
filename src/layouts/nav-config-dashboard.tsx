import type { NavSectionProps } from 'src/components/nav-section';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/global-config';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  dashboard: icon('ic-dashboard'),
  subjects: icon('ic-course'),
  groups: icon('ic-folder'),
  students: icon('ic-user'),
  attendance: icon('ic-calendar'),
  grades: icon('ic-file'),
  alerts: icon('ic-analytics'),
  reports: icon('ic-invoice'),
};

// ----------------------------------------------------------------------

export const navData: NavSectionProps['data'] = [
  /**
   * General
   */
  {
    subheader: 'General',
    items: [
      {
        title: 'Inicio',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
      },
    ],
  },

  /**
   * Mis clases
   */
  {
    subheader: 'Mis clases',
    items: [
      {
        title: 'Mis grupos',
        path: paths.dashboard.groups.root,
        icon: ICONS.groups,
      },
      {
        title: 'Materias',
        path: paths.dashboard.subjects.root,
        icon: ICONS.subjects,
      },
      {
        title: 'Estudiantes',
        path: paths.dashboard.students.root,
        icon: ICONS.students,
      },
    ],
  },

  /**
   * Día a día
   */
  {
    subheader: 'Día a día',
    items: [
      {
        title: 'Pase de lista',
        path: paths.dashboard.attendance.root,
        icon: ICONS.attendance,
      },
      {
        title: 'Calificaciones',
        path: paths.dashboard.grades.root,
        icon: ICONS.grades,
      },
    ],
  },
];
