import React from 'react'
import { CardContianer } from '../Cards/CardContianer'
import { styled } from '@mui/material/styles'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { NavLink } from 'react-router-dom'
import { Logout } from '../../Logout/Logout'

const SwitchBtn = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 39,
  height: 23,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#ff7e8b',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 28 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}))

const SwitchOption = React.memo(() => {
  const [checked, setChecked] = React.useState<boolean>(true)
  const changeCheck = () => {
    setChecked(!checked)
  }
  return (
    <div className="flex justify-between items-center">
      <p
        className={`font-moutserrat md:text-lg cursor-pointer`}
        onClick={changeCheck}
      >
        Save orders history
      </p>
      <SwitchBtn sx={{ m: 1 }} checked={checked} onClick={changeCheck} />
    </div>
  )
})

const SettingsLink = ({ name, to }: { name: string; to: string }) => {
  return (
    <div className="text-blue-400 underline mb-2">
      <NavLink to={to}>{name}</NavLink>
    </div>
  )
}

const SettingsLinkData = [
  { name: 'Logout', to: '/logout' },
  { name: 'Switch another account', to: '/login' },
]

const Settings = () => {
  return (
    <div id={'userSettings'}>
      <CardContianer title="Settings">
        <SwitchOption />
        <Logout />
        <SettingsLink
          name={SettingsLinkData[1].name}
          to={SettingsLinkData[1].to}
        />
      </CardContianer>
    </div>
  )
}
export default Settings