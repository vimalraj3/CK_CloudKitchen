import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const label = { inputProps: { 'aria-label': 'Select your address' } };
export const TickCheckbox = ({ checked, square }: { checked: boolean, square?: boolean }) => {
    return (
        <div>
            <Checkbox
                {...label}
                icon={square ? <CheckBoxOutlineBlankIcon /> : <CheckCircleOutlineIcon />}
                checkedIcon={square ? <CheckBoxIcon /> : <CheckCircleIcon />}
                color='success'
                checked={checked}
            />
        </div>
    )
}
