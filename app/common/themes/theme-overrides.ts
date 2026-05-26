import type { GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: "#00ad4c",
        errorColor: "#FF0055",
        warningColor: "#FF8000",
        borderRadius: "5px",
        borderRadiusSmall: "3px",
        borderColor: "#e4e7ec",
        
    },
    Card: {
        borderRadius: "5px",
    },
    Tag: {
        borderRadius: "4px",
    },
    Notification: {
        padding: '15px'
    }
};

export const darkThemeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: "#00ad4c",
        errorColor: "#FF0055",
        warningColor: "#FF8000",
        borderRadius: "5px",
        borderRadiusSmall: "3px",
        borderColor: "#1c2334",
        cardColor: "#0f172a",
        popoverColor: '#0f172a',
        modalColor: '#1c202c',
    },
    Card: {
        borderRadius: "7px",
    },
    DataTable: {
        thColor: "#1c202c",
        tdColor: "#1c2334",
        hoverColor: "#1c202c",
        tdColorHover: '#1c202c',
    },
    Tag: {
        borderRadius: "4px",
    },
};
