export const yummyAdminThemeConfig = {
  themeConfig: {
    shared: {
      common: {
        primaryColor: '#00ad4c',
        errorColor: '#FF0055',
        warningColor: '#FF8000',
        borderRadius: '5px',
        borderRadiusSmall: '3px',
      },
      Card: {
        borderRadius: '5px',
      },
      Tag: {
        borderRadius: '4px',
      },
      Notification: {
        padding: '15px',
      },
    },
    light: {
      common: {
        bodyColor: '#EEE',
        borderColor: '#e4e7ec',
      },
    },
    dark: {

      common: {
        borderColor: '#1c2334',
        cardColor: '#0f172a',
        popoverColor: '#0f172a',
        modalColor: '#1c202c',
        bodyColor: '#283046',
      },

      DataTable: {
        thColor: '#1c202c',
        tdColor: '#1c2334',
        hoverColor: '#1c202c',
        tdColorHover: '#1c202c',
      },

    },
  }
}
