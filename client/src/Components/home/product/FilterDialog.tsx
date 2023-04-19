import React, { useState, ReactNode, useEffect, useRef } from "react"
import { motion, AnimatePresence } from 'framer-motion'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';

import { Btn } from "../../utils/Btn";
import Search from "../../utils/Search";
import { Grid } from "@mui/material";

enum sortBy {
    Rating = 'rating',
    CostLowToHigh = "costLowToHigh",
    CostHighToLow = "costHighToLow"
}

enum filters {
    sortBy = "Sort by",
    cuisines = "Cuisines",
    rating = "Rating",
    costPerPerson = "Cost per person"
}

interface IAnimation {
    children: ReactNode;
    selectedTab: string;
}

interface ICheckbox extends IHandleSelectedFilters {
    label?: string;
    setSelectedCuisines: (cuisines: string[]) => void
    selectedCuisines: string[];
    checked?: boolean
}

interface IHandleSelectedFilters {
    handleSelectedFilters: (name: filters, selectedOption: string) => void;
}

interface ICostPerPerson extends IHandleSelectedFilters {
    handleChange: (event: Event, value: number | number[]) => void
    value: number[];
}

interface IFilterOptions {
    name: filters;
    selected: string;
}

const cuisinesOptions =
    [
        "American",
        "Biryani",
        "Burger",
        "Coffee",
        "Desserts",
        "Fast Food",
        "Healthy Food",
        "Hyderabadi",
        "Ice Cream",
        "Kerala",
        "Pasta",
        "Pizza",
        "Rolls",
        "Seafood",
        "Tamil",
        "Thai",
        "Waffle",
        "wraps"
    ]
const RatingPoints = [
    {
        value: 3,
        label: '3.0+',
    },
    {
        value: 3.5,
        label: '3.5+',
    },
    {
        value: 4,
        label: '4.0+',
    },
    {
        value: 4.5,
        label: '4.5+',
    },
    {
        value: 5,
        label: '5.0+',
    },
];

function valuetext(value: number) {
    return `${value} rupees`;
}

const SortBy: React.FC<IHandleSelectedFilters> = ({ handleSelectedFilters }) => {
    return (
        <div className="mt-2 h-[250px] flex items-center">
            <FormControl>
                <RadioGroup
                    aria-labelledby="filter-options"
                    name="fliter-options"
                    onChange={(event, value) => handleSelectedFilters(filters.sortBy, value)}
                >
                    <FormControlLabel value={sortBy.Rating} control={<Radio />} label="Rating: High to Low" sx={{ fontSize: "1.5rem" }} />
                    <FormControlLabel value={sortBy.CostLowToHigh} control={<Radio />} label="Cost: Low to High" />
                    <FormControlLabel value={sortBy.CostHighToLow} disableTypography={false} control={<Radio />} label="Cost: High to Low" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}


const Animation: React.FC<IAnimation> = ({ children, selectedTab }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={selectedTab}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-[100%]  "
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

const CheckBox: React.FC<ICheckbox> = ({ handleSelectedFilters, setSelectedCuisines, selectedCuisines }) => {

    const [check, setCheck] = useState<boolean>(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const con = selectedCuisines.findIndex(i => i == event.target.value)
        console.log(con >= 0);

        if (con == -1) {
            handleSelectedFilters(filters.cuisines, `${event.target.value} `)
            let update = [...selectedCuisines];
            update.push(event.target.value);
            update.sort()
            setSelectedCuisines(update);
        }
        else {
            let update = selectedCuisines.filter(value => value != event.target.value)
            setSelectedCuisines(update);
            if (update.length === 0)
                handleSelectedFilters(filters.cuisines, `   `)
            else
                handleSelectedFilters(filters.cuisines, `${update[update.length - 1]}`)
        }
    }


    return (
        <>
            {cuisinesOptions.map((v, i) => {
                return (
                    <Grid xs={4} item key={i}>
                        <input type="checkbox" name={v} value={v} id={v} className="cursor-pointer mr-1.5" onChange={handleChange} />
                        <label htmlFor={v} className="cursor-pointer">{v}</label>
                    </Grid>
                )
            })}
        </>
    )

}

const Cuisines: React.FC<IHandleSelectedFilters> = ({ handleSelectedFilters }) => {
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])

    return (
        <div className="w-[100%] h-[250px] flex items-center ml-10">
            <Grid container spacing={1}  >
                <CheckBox handleSelectedFilters={handleSelectedFilters} selectedCuisines={selectedCuisines} setSelectedCuisines={setSelectedCuisines} />
            </Grid >
        </div>
    )
}

const Rating: React.FC<IHandleSelectedFilters> = ({ handleSelectedFilters }) => {
    return < div className="w-[80%] h-[250px]" >
        <div className="flex h-[100%] w-[100%] mx-auto items-center">
            <Slider
                track="inverted"
                aria-labelledby="track-inverted-slider"
                getAriaValueText={valuetext}
                sx={{
                    color: "#e03546"
                }}
                defaultValue={3}
                step={0.5}
                marks={RatingPoints}
                max={5}
                min={3}
                onChange={(event, value) => handleSelectedFilters(filters.rating, `${value} +`)}
            />
        </div>
    </div >
}

function CostPerPerson({ handleChange, value, handleSelectedFilters }: ICostPerPerson) {
    return (
        <div className="h-[250px] flex items-center w-[80%] mx-auto ">
            <Slider
                getAriaLabel={(i) => `Price ${value[i]} `}
                value={value}
                onChange={(e, v) => {
                    if (Array.isArray(v)) {
                        handleSelectedFilters(filters.costPerPerson, `${v[0]} to ${v[1]} per person`);
                        handleChange(e, v);
                    }
                }}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                min={0}
                max={2000}
                step={100}
                sx={{
                    color: "#e03546"
                }}
            />
        </div>
    )
}

interface IActiveComponent extends ICostPerPerson {
    name: filters;
}



const ActiveComponent: React.FC<IActiveComponent> = ({ name, handleChange, value, handleSelectedFilters }) => {
    switch (name) {
        case filters.sortBy:
            return <SortBy handleSelectedFilters={handleSelectedFilters} />
        case filters.costPerPerson:
            return <CostPerPerson handleChange={handleChange} value={value} handleSelectedFilters={handleSelectedFilters} />
        case filters.cuisines:
            return <Cuisines handleSelectedFilters={handleSelectedFilters} />
        case filters.rating:
            return <Rating handleSelectedFilters={handleSelectedFilters} />
        default:
            return <></>

    }
}


interface IFilterDialog {
    open: boolean;
    setOpen: (open: boolean) => void;
    setBg: (open: string) => void;
}

interface ITab {
    setSelectedTab: (name: filters) => void;
    filterOptions: IFilterOptions[];
    selectedTab: filters;
}

const Tab: React.FC<ITab> = ({ filterOptions, setSelectedTab, selectedTab }) => {
    return <div className="w-[100%] h-[20%] flex">
        {
            filterOptions.map(({ name, selected }, i) => {
                return (
                    <div className="flex flex-col basis-[25%]" key={i}>
                        <p
                            className={`px-2 w-[100 %] font-moutserrat text-[1.1rem] font-[300] pt-3 transition-all duration-600 ease-in-linear cursor-pointer flex flex-col items-center relative justify-center ${name === selectedTab ? "bg-[#fff]  rounded-t-md " : "bg-[#f8f8f8]  rounded-md  "} `}
                            onClick={() => setSelectedTab(name)}
                        >
                            {name}

                        </p>
                        <p
                            className={`px-2 w-[100%] font-moutserrat text-[.8rem] font-[300] pb-3 h-[24px] transition-all duration-600 ease-in-linear cursor-pointer flex  justify-center text-[#e03546] ${name === selectedTab ? "bg-[#fff]  rounded-t-md " : "bg-[#f8f8f8]  rounded-md  "} `}
                            onClick={() => setSelectedTab(name)}
                        >
                            {selected != " " ? selected : " "}
                        </p>
                        {name === selectedTab ? (
                            <motion.div className="border-b-2 w-[100%] rounded-b-md mx-auto  border-[#ff7e8b]" layoutId="underline" />
                        ) : null}
                    </div>

                )
            })
        }
    </div>

}

const FilterDialog: React.FC<IFilterDialog> = ({ open, setOpen, setBg }) => {

    const filterOptionsInitialState = [
        { name: filters.sortBy, selected: " " },
        { name: filters.cuisines, selected: " " },
        { name: filters.rating, selected: " " },
        { name: filters.costPerPerson, selected: " " },
    ]

    const [filterOptions, setFilterOptions] = useState<IFilterOptions[]>(filterOptionsInitialState)

    const [selectedTab, setSelectedTab] = useState<filters>(filterOptions[0].name);

    const [value, setValue] = useState<number[]>([0, 2000]);

    const toggleOpen = () => {
        setOpen(false)
        document.body.style.overflow = "auto"
        setBg("#ff7e8b")
    }


    const clearOptions = () => {
        setFilterOptions(filterOptionsInitialState)
        setBg("#c1c1c1")
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        Array.isArray(newValue) && setValue(newValue);
    };


    const handleSelectedFilters = (name: filters, selectedOption: string) => {

        let updatedFilterOptions = filterOptions.map((v, i) => {
            return v.name === name ? { ...v, selected: selectedOption } : v;
        })

        setFilterOptions(updatedFilterOptions)
        console.log(filterOptions);

    }


    return !open ?
        <></>
        :
        <div
            className={`fixed top-0 left-0  bg-[#00000080] z-30 w-[100%] h-[100%]  flex justify-center items-center text-[#000]`}
        >
            <div className="w-[90%]   max-w-[600px]  aspect-[4/3]  bg-[#fff] z-50 rounded-md flex flex-col justify-between">
                <section className="flex justify-between py-4 px-8 items-center border-b-2 border-[#c1c1c1] h-[15%]">
                    <h3 className='font-bold font-cardo text-[1.4rem]'>Filters</h3>
                    <i className="fa-solid fa-xmark text-[1.4rem] cursor-pointer" onClick={toggleOpen}></i>
                </section>
                <section className="flex flex-col h-[70%] relative">
                    <Tab setSelectedTab={setSelectedTab} filterOptions={filterOptions} selectedTab={selectedTab} />
                    <Animation selectedTab={selectedTab}>
                        <ActiveComponent name={selectedTab} handleSelectedFilters={handleSelectedFilters} handleChange={handleChange} value={value} />
                    </Animation>
                </section>
                <div className="border-t-2 w-[100%] py-4 flex  justify-end px-5 h-[15%]">
                    <Btn label="Clear" onClick={() => { toggleOpen(); clearOptions(); }} />
                    <Btn label="Apply" onClick={() => toggleOpen()} styles={{
                        backgroundColor: "#e03546",
                        color: '#f8f8f8',
                        marginLeft: '.7rem',
                        border: "none"
                    }} />
                </div>
            </div>
        </div >

}


export default FilterDialog