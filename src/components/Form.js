import axios from "axios";
import flatten from 'lodash/flatten'

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useEffect, useState} from "react";
import Link from "@mui/material/Link";

// Set necessary url in .env file
// Is not stored in codebase for security reasons (public repo)
const FORM_DATA_URL = process.env.FORM_DATA_URL;
const FORM_PHYSICAL_PERFORMANCE_EXERCISES_URL = process.env.FORM_PHYSICAL_PERFORMANCE_EXERCISES_URL;

const yearsList = [ 7, 8, 9, 10, 11, 12 ]

const dynamicExercisesList = [
    {
        exercise: 'Jump',
        url: 'https://google.com',
        focus: 'strength'
    },
    {
        exercise: 'Run',
        url: 'https://google.com',
        focus: 'speed'
    },
    {
        exercise: 'Swim',
        url: 'https://google.com',
        focus: 'stamina'
    },
    {
        exercise: 'Jump',
        url: 'https://google.com',
        focus: 'strength'
    },
    {
        exercise: 'Run',
        url: 'https://google.com',
        focus: 'speed'
    },
    {
        exercise: 'Swim',
        url: 'https://google.com',
        focus: 'stamina'
    },
]

const getUniqueList = ({ gameSkills }, columnName) => {
    const columnIndex = gameSkills[0].indexOf(columnName)

    return gameSkills.reduce((acc, item, index) => {
        const name = item[columnIndex];

        if (index === 0 || !name) return acc;

        if (acc.indexOf(name) === -1) {
            acc.push(name)
        }

        return acc;
    }, []);
}

const getPhysicalPerformanceArray = ({ physicalPerformance }) => {
    const flatArr = flatten(physicalPerformance);

    return flatArr.reduce((acc, item) => {
        if (!!item && acc.indexOf(item) === -1) {
            acc.push(item)
        }

        return acc;
    }, [])
}

const getAbilitiesExercisesList = exercisesList => {
    return exercisesList.reduce((acc, itemArr) => {
        let itemArrAccIndex = 0;

        const supportedFieldsArr = ['exercise', 'url', 'focus']

        const item = itemArr.reduce((itemArrAcc, item) => {
            if(!!item && (item !== '' && item !== '#N/A')) {
                itemArrAcc[supportedFieldsArr[itemArrAccIndex]] = item;
                itemArrAccIndex += 1
            }

            return itemArrAcc;
        }, {})

        if (Object.keys(item).length === supportedFieldsArr.length) {
            acc.push(item);
        }

        return acc;
    }, [])
}


export const Form = () => {
    const { handleSubmit, reset, watch, formState, control } = useForm();
    const onSubmit = data => console.log(data);

    const [formData, setFormData] = useState(null);
    const [sportsList, setSportsList] = useState([]);
    const [physicalPerformanceList, setPhysicalPerformanceList] = useState([]);
    const [abilitiesExercisesList, setAbilitiesExercisesList] = useState([]);

    const watchAbility = watch('ability');

    useEffect(() => {
        axios.get(FORM_DATA_URL).then(resp => setFormData(resp.data))
    }, []);

    useEffect(() => {
        if (formData) {
            setSportsList(getUniqueList(formData, 'Sport'));
            setPhysicalPerformanceList(getPhysicalPerformanceArray(formData));
        }
    }, [ formData ])

    useEffect(() => {
        if (!!watchAbility) {
            axios.get(FORM_PHYSICAL_PERFORMANCE_EXERCISES_URL + watchAbility)
            .then(resp => setAbilitiesExercisesList(getAbilitiesExercisesList(resp.data.exercise)));
        }
    }, [ watchAbility ]);

    console.log("Watch:", watch());
    console.log("FormData:", formData);
    console.log("abilitiesExercisesList", abilitiesExercisesList);

    return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    rules={{ required: 'First name required' }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField value={value} onChange={onChange} label="First Name" fullWidth />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="year"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="year-select-label">Year</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="year-select-label"
                                                required
                                                fullWidth
                                                label="Year"
                                            >
                                                {yearsList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="dayOfBirth"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value } }) => (
                                        <DesktopDatePicker
                                            label="Date desktop"
                                            inputFormat="YYYY/MM/DD"
                                            value={value}
                                            onChange={onChange}
                                            renderInput={(params) => {
                                                return <TextField fullWidth type="date" {...params} />
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    name="sport"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="sport-select-label">Sport</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="sport-select-label"
                                                required
                                                fullWidth
                                                label="Sport"
                                            >
                                                {sportsList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                    />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography align="center" variant="h5">My weapons</Typography>
                    <Box sx={{ border: 1, borderRadius: '5px', borderColor: 'grey.700' }} mt={2} mb={2} p={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="strength-1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my strength 1"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">1.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="strength-2"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my strength 2"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">2.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="strength-3"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my strength 3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">3.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography align="center" variant="h5">My Work Ons</Typography>
                    <Box sx={{ border: 1, borderRadius: '5px', borderColor: 'grey.700' }} mt={2} p={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="work-ons-1"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my work on 1"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">1.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="work-ons-2"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my work on 2"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">2.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Controller
                                    name="work-ons-3"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            fullWidth
                                            label="Input my work on 3"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">3.</InputAdornment>,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ textAlign: 'center' }} mt={2} mb={2}>
                        <Grid container>
                            <Grid item xs={2} className='flex-centered'>
                                <Typography>Work Ons</Typography>
                            </Grid>
                            <Grid item xs={6} className='flex-centered'>
                                <Typography>Actions</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Box><Typography>Self Reflection</Typography></Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flex: 1 }}>Pre</Box>
                                    <Box sx={{ flex: 1 }}>Post</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={2} />
                            <Grid item xs={6} className='flex-centered'>
                                <Typography align="center" variant="h5">Physical Performance</Typography>
                            </Grid>
                            <Grid item xs={4} />
                            <Grid item xs={2} className="flex-centered">
                                <Controller
                                    name="ability"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="ability-select-label">Ability</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="ability-select-label"
                                                required
                                                fullWidth
                                            >
                                                {physicalPerformanceList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={8}
                                sx={{
                                    border: 1,
                                    borderColor: 'black',
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                    <Box sx={{ width: '40%' }}><Typography>Exercise</Typography></Box>
                                    <Box sx={{ width: '20%' }}><Typography>Url</Typography></Box>
                                    <Box sx={{ width: '40%' }}><Typography>Focus</Typography></Box>
                                </Box>
                                {abilitiesExercisesList.map((item, i) => (
                                    <Box key={i} fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                        <Box sx={{ width: '40%' }}><Typography variant="body2" gutterBottom>{item.exercise}</Typography></Box>
                                        <Box sx={{ width: '20%' }}><Link target="_blank" href={item.url}>Link</Link></Box>
                                        <Box sx={{ width: '40%' }}><Typography variant="body2" gutterBottom>{item.focus}</Typography></Box>
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={1} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography align="center" variant="h5">Game Skills</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: 1,
                                    borderColor: 'black',
                                }}>
                                <Box sx={{ display: 'flex', flex: 1, width: 1, alignItems: 'center', justifyContent: 'center', border: 1 }}><Typography>Dropdown</Typography></Box>
                                <Box sx={{ display: 'flex', flex: 1, width: 1, alignItems: 'center', justifyContent: 'center', border: 1 }}><Typography>Dropdown</Typography></Box>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    border: 1,
                                    borderColor: 'black',
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                    <Box sx={{ width: '25%' }}><Typography>Exercise</Typography></Box>
                                    <Box sx={{ width: '50%' }}><Typography>Url</Typography></Box>
                                    <Box sx={{ width: '25%' }}><Typography>Focus</Typography></Box>
                                </Box>
                                {dynamicExercisesList.map((item, i) => (
                                    <Box key={i} fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                        <Box sx={{ width: '25%' }}><Typography>{item.exercise}</Typography></Box>
                                        <Box sx={{ width: '50%' }}><Typography>{item.url}</Typography></Box>
                                        <Box sx={{ width: '25%' }}><Typography>{item.focus}</Typography></Box>
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography align="center" variant="h5">Athlete Attitudes</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    border: 1,
                                    borderColor: 'black',
                                    display: "flex",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                            >
                                <Box sx={{ width: 1, border: 1, height: '64px' }}><Typography>1. Textarea</Typography></Box>
                                <Box sx={{ width: 1, border: 1, height: '64px' }}><Typography>1. Textarea</Typography></Box>
                                <Box sx={{ width: 1, border: 1, height: '64px' }}><Typography>1. Textarea</Typography></Box>
                            </Grid>
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
    )
}
