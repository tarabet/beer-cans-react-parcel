import { useRef } from "react";

import axios from "axios";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField, Tooltip
} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useEffect, useState} from "react";

// Set necessary url in .env file
// Is not stored in codebase for security reasons (public repo)
const FORM_DATA_TEST_URL = process.env.FORM_DATA_TEST_URL;

const yearsList = [ 7, 8, 9, 10, 11, 12 ]

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
        if (
            itemArr[firstLevelFilterColumn] === firstLevelFilterValue
            && !!itemArr[columnToFilter]
            && acc.indexOf(itemArr[columnToFilter]) === -1
            ) {
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

const buildBeerDataByCollaborator = (formData, collaborator) => {
    return formData.reduce((acc, item) => {
        const beerData = {};

        if (item['Colaborator'] === collaborator) {
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

    const { region, type, collaborator } = getValues();

    // Save previous values to trigger re-fetch if value really changed
    const prevValues = usePrevious({
        prevCollaboratorValue: collaborator,
        prevRegionValue: region,
        prevTypeValue: type
    });

    const [formDataLoading, setFormDataLoading] = useState(true);
    const [formData, setFormData] = useState(null);
    const [regionsList, setRegionsList] = useState([]);
    const [beerTypesList, setBeerTypesList] = useState([]);
    const [collaboratorsList, setCollaboratorsList] = useState([]);
    const [beersByCollaborator, setBeersByCollaborator] = useState([]);
    const [beerDataByTypeAndRegion, setBeerDataByTypeAndRegion] = useState([]);
    const [classificationList, setClassificationList] = useState([]);

    const watchCollaborator = watch('collaborator');
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
            const { prevRegionValue, prevTypeValue, prevCollaboratorValue } = prevValues;

            if (!!watchType && watchType !== prevTypeValue) {
                setBeerDataByTypeAndRegion(buildBeerTypeByRegionDataList(formData, watchRegion, watchType));
            }

            if (!!watchRegion && watchRegion !== prevRegionValue) {
                setBeerTypesList(getSecondLevelUniqueList(formData, 'Region', watchRegion, 'Type'))
                setCollaboratorsList(getSecondLevelUniqueList(formData, 'Region', watchRegion, 'Colaborator'))
            }

            if (!!watchCollaborator && watchCollaborator !== prevCollaboratorValue) {
                setBeersByCollaborator(buildBeerDataByCollaborator(formData, watchCollaborator))
            }
        }
    }, [ watchCollaborator, watchType, watchRegion ]);

    console.log("BeersByColl:", beersByCollaborator)

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
                                            <Tooltip
                                                open={watchRegion === ""}
                                                arrow
                                                title="Choose region to begin"
                                            >
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
                                            </Tooltip>
                                        </FormControl>
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ textAlign: 'center' }} mt={2} mb={2}>
                        <Grid container>
                            <Grid item xs={12} className='flex-centered' mt={2}>
                                <Typography align="center" mb={2} variant="h5">Beers Info</Typography>
                            </Grid>
                            <Grid item xs={2} className="flex-centered">
                                <Controller
                                    name="type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="type-select-label">{!watchRegion ? 'Waiting...' : 'Beer type'}</InputLabel>
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
                            <Grid item xs={10} sx={{ borderColor: 'black', display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                                <Box fullWidth sx={{ width: 1, display: 'flex', borderBottom: 1 }}>
                                    <Box sx={{ width: '70%' }}><Typography>Name</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Degree (%)</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Volume (ml)</Typography></Box>
                                </Box>
                                {beerDataByTypeAndRegion.map((item, i) => (
                                    <Box key={i} fullWidth sx={{ width: 1, display: 'flex', borderBottom: 1, borderColor: 'grey.300' }}>
                                        <Box sx={{ width: '70%' }}><Typography variant="body2" gutterBottom>{item.name}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.degree}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.volume}</Typography></Box>
                                    </Box>
                                ))}
                            </Grid>
                            <Grid item xs={12} className="flex-centered" mt={6}>
                                <Typography align="center" variant="h5">Collaborator Info</Typography>
                            </Grid>
                            <Grid item className="flex-centered" xs={2} sx={{ flexDirection: 'column' }}>
                                <Box className="flex-centered" sx={{ flex: 1, width: 1 }}>
                                    <Controller
                                        name="collaborator"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                                <InputLabel id="collaborator-select-label">{!watchRegion ? 'Waiting...' : 'Author'}</InputLabel>
                                                <Select
                                                    {...field}
                                                    labelId="collaborator-select-label"
                                                    fullWidth
                                                >
                                                    {collaboratorsList.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={10} sx={{ borderColor: 'black', display: "flex", alignItems: 'center', flexDirection: 'column'}}>
                                <Box fullWidth sx={{ width: 1, display: 'flex', borderBottom: 1 }}>
                                    <Box sx={{ width: '70%' }}><Typography>Name</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Degree (%)</Typography></Box>
                                    <Box sx={{ width: '15%' }}><Typography>Volume (ml)</Typography></Box>
                                </Box>
                                {beersByCollaborator.map((item, i) => (
                                    <Box key={i} fullWidth sx={{ width: 1, display: 'flex', borderBottom: 1, borderColor: 'grey.300' }}>
                                        <Box sx={{ width: '70%' }}><Typography variant="body2" gutterBottom>{item.name}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.degree}</Typography></Box>
                                        <Box sx={{ width: '15%' }}><Typography variant="body2" gutterBottom>{item.volume}</Typography></Box>
                                    </Box>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
    )
}
