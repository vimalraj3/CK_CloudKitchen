import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { TickCheckbox } from '../Form/Checkbox/Checkbox';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

type List = {
    name: string
    value: string
    checked?: boolean
}

interface IDrawer {
    anchor: Anchor
    lists: List[][]
    handleListClick: (listValue: string) => void
    children: React.ReactNode
    checkBox?: boolean
}

export const Drawer: React.FC<IDrawer> = ({ anchor, lists, handleListClick, children, checkBox = false }) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer =
        (open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const listComponent = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
        >
            {lists.map((list, index) => (
                <>
                    <List>
                        {list.map((list, index) => (
                            <ListItem key={list.name} disablePadding onClick={() => { handleListClick(list.value) }}>
                                <ListItemButton>
                                    {
                                        checkBox && list.checked !== undefined && (
                                            <TickCheckbox checked={list.checked} square />
                                        )
                                    }
                                    <ListItemText primary={list.name} className='font-para' />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    {lists.length !== index - 1 && <Divider />}
                </>
            ))}
        </Box>
    );

    return (
        <div>
            <React.Fragment key={anchor}>
                {/* <Button onClick={toggleDrawer(true)}>{anchor}</Button>
                <Btns labelArr={["Rating 4.0+"]} /> */}
                <div onClick={toggleDrawer(true)}>
                    {children}
                </div>
                <SwipeableDrawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {listComponent(anchor)}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}