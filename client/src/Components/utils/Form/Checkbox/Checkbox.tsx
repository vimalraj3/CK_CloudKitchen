import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const label = { inputProps: { 'aria-label': 'Select your address' } };
export const TickCheckbox = ({ checked }: { checked: boolean }) => {
    return (
        <div>
            <Checkbox
                {...label}
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
                color='success'
                checked={checked}
            />
        </div>
    )
}
