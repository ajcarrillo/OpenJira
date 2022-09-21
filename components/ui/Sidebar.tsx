import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FC, useContext } from "react"
import { Box } from '@mui/system';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { UIContext } from '../../context/ui';

const menuItems = ["Inbox", "Today", "Next 7 days"]

export const Sidebar: FC = () => {

  const { sidemenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer
      anchor="left"
      open={sidemenuOpen}
      onClose={closeSideMenu}
    >
      <Box width={{ width: 250 }}>
        <Box sx={{ padding: "1rem" }}>
          <Typography variant="h4">Menú</Typography>
        </Box>
        <List>
          {
            menuItems.map((item, index) => (
              <ListItem button key={item}>
                <ListItemIcon>
                  <InboxOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer >
  )
}
