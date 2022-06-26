import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { useForm, Controller} from "react-hook-form";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

const yearItems = [
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" }
]

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

export const Form = () => {
    const { register, handleSubmit, reset, watch, formState, control } = useForm();
    const onSubmit = data => console.log(data);

    console.log("Watch:", watch())

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
                                                {yearItems.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
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
                                <TextField
                                    required
                                    fullWidth
                                    id="sport"
                                    label="Sport"
                                    name="sport"
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
                            <Grid item xs={2} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Work Ons</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography>Actions</Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ border: 1, borderColor: 'black' }}>
                                <Box><Typography>Self Reflection</Typography></Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ flexGrow: 1 }}>Pre</Box>
                                    <Box sx={{ flexGrow: 1 }}>Post</Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sx={{ border: 1, borderColor: 'black', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                                <Typography align="center" variant="h5">Physical Performance</Typography>
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
                                    flexDirection: 'column' }}
                            >
                                <Box fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
                                    <Box sx={{ width: '25%' }}><Typography>Exercise</Typography></Box>
                                    <Box sx={{ width: '50%' }}><Typography>Url</Typography></Box>
                                    <Box sx={{ width: '25%' }}><Typography>Focus</Typography></Box>
                                </Box>
                                {dynamicExercisesList.map(item => (
                                    <Box fullWidth sx={{ width: 1, display: 'flex', border: 1 }}>
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
                                <Typography align="center" variant="h5">Game Skills</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
    )
}
