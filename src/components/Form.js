import { useRef } from "react";

import axios from "axios";
import flatten from 'lodash/flatten'

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Button,
    CircularProgress,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useEffect, useState} from "react";
import Link from "@mui/material/Link";

// Set necessary url in .env file
// Is not stored in codebase for security reasons (public repo)
const FORM_DATA_URL = process.env.FORM_DATA_URL;
const FORM_PHYSICAL_PERFORMANCE_EXERCISES_URL = process.env.FORM_PHYSICAL_PERFORMANCE_EXERCISES_URL;
const FORM_DATA_TEST_URL = process.env.FORM_DATA_TEST_URL;

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

const getUniqueList = (formData, columnName) => {
    return formData.reduce((acc, item, index) => {
        const itemName = item[columnName];

        if (!itemName) return acc;

        if (acc.indexOf(itemName) === -1) {
            acc.push(itemName)
        }

        return acc;
    }, []);
}

const getSecondLevelUniqueList = (formData, firstLevelFilterColumn, firstLevelFilterValue, columnToFilter) => {
    return formData.reduce((acc, itemArr) => {
        if (itemArr[firstLevelFilterColumn] === firstLevelFilterValue && acc.indexOf(itemArr[columnToFilter]) === -1) {
            acc.push(itemArr[columnToFilter])
        }

        return acc;
    }, [])
}

const buildBeerTypeByRegionDataList = (formData, region, type) => {
    return formData.reduce((acc, item) => {
        const beerData = {};

        if (item['Region'] === region && item['Type'] === type) {
            beerData['name'] = item['Name'];
            beerData['degree'] = item['Degree (%)'];
            beerData['volume'] = item['Volume (ml)'];

            acc.push(beerData);
        }

        return acc;
    }, [])
}

const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export const Form = () => {
    const { handleSubmit, reset, watch, formState, control, getValues } = useForm();
    const onSubmit = data => console.log(data);

    const { region, type } = getValues();

    // Save previous values to trigger re-fetch if value really changed
    const prevValues = usePrevious({ prevRegionValue: region, prevTypeValue: type });

    const [formDataLoading, setFormDataLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const [regionsList, setRegionsList] = useState([]);
    const [beerTypesList, setBeerTypesList] = useState([]);
    const [beerDataByTypeAndRegion, setBeerDataByTypeAndRegion] = useState([]);
    const [classificationList, setClassificationList] = useState([]);

    const watchType = watch('type');
    const watchRegion = watch('region');

    useEffect(() => {
        axios.get(FORM_DATA_TEST_URL).then(resp => {
            setFormDataLoading(false);
            setFormData(resp.data)
        })
    }, []);

    useEffect(() => {
        if (formData) {
            setRegionsList(getUniqueList(formData, 'Region'));
        }
    }, [ formData ])

    useEffect(() => {
        if (prevValues) {
            const { prevRegionValue, prevTypeValue } = prevValues;

            if (!!watchType && watchType !== prevTypeValue) {
                setBeerDataByTypeAndRegion(buildBeerTypeByRegionDataList(formData, watchRegion, watchType));
            }

            if (!!watchRegion && watchRegion !== prevRegionValue) {
                setBeerTypesList(getSecondLevelUniqueList(formData, 'Region', watchRegion, 'Type'))
            }
        }
    }, [ watchType, watchRegion ]);

    console.log("Watch:", watch());
    console.log("FormData:", formData);
    console.log("beerDataByTypeAndRegion", beerDataByTypeAndRegion);

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
                                    render={({ field: { onChange, value } }) => (
                                        <DesktopDatePicker
                                            label="Your birthday"
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
                                    name="region"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel id="region-select-label">{formDataLoading ? 'Lading...' : 'Region'}</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="region-select-label"
                                                required
                                                fullWidth
                                                label="Region"
                                                disabled={formDataLoading}
                                            >
                                                {regionsList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                    />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ textAlign: 'center' }} mt={2} mb={2}>
                        <Grid container>
                            <Grid item xs={12} className='flex-centered' mt={2}>
                                <Typography align="center" variant="h5">Beers Info</Typography>
                            </Grid>
                            <Grid item xs={2} className="flex-centered">
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="type-select-label">Beer type</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="type-select-label"
                                                required
                                                fullWidth
                                                disabled={!watchRegion}
                                            >
                                                {beerTypesList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={10}
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
                                    <Box sx={{ width: '70%' }}><Typography>Name</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Degree (%)</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Volume (ml)</Typography></Box>
                                </Box>
                                {beerDataByTypeAndRegion.map((item, i) => (
                                    <Box key={i} fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                        <Box sx={{ width: '70%' }}><Typography variant="body2" gutterBottom>{item.name}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.degree}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.volume}</Typography></Box>
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={12} className="flex-centered" mt={2}>
                                <Typography align="center" variant="h5">Game Skills</Typography>
                            </Grid>
                            <Grid item className="flex-centered" xs={2} sx={{ flexDirection: 'column' }}>
                                <Box className="flex-centered" sx={{ flex: 1, width: 1 }}>
                                    <Controller
                                        name="classification"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="classification-select-label">Classification</InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId="classification-select-label"
                                                    required
                                                    fullWidth
                                                >
                                                    {classificationList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                                <Box className="flex-centered" sx={{ flex: 1, width: 1 }}>
                                    <Controller
                                        name="quality"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="quality-select-label">Quality</InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId="quality-select-label"
                                                    required
                                                    fullWidth
                                                >
                                                    {classificationList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                            </Grid>
                            <Grid item className="flex-centered" xs={8} sx={{ flexDirection: 'column'}}>
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
                            <Grid item xs={1} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Dropdown</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
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
