import * as React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from "@mui/icons-material/History";

export const menuItems = [
    {
        url: "/form",
        IconComponent: <AssignmentIcon />,
        text: "Form"
    },
    {
        url: "/history",
        IconComponent: <HistoryIcon />,
        text: "History"
    }
]
