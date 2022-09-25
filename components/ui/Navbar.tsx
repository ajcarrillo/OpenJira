import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material"
import { FC, useContext } from "react"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import { UIContext } from "../../context/ui/UIContext"
import NextLink from "next/link"

export const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={openSideMenu}
        >
          <MenuOutlinedIcon />
        </IconButton>
        <NextLink
          href="/"
          passHref
        >
          <Link
            underline="none"
            color="white"
          >
            <Typography variant="h6">OpenJira</Typography>
          </Link>
        </NextLink>
      </Toolbar>
    </AppBar>
  )
}
