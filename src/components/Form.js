import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {InputAdornment, TextField} from "@mui/material";

export const Form = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Target:", event.target)
    };

    return (
        <Container item xs={12} md={8} lg={9}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="year"
                                label="Year"
                                name="year"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="day-of-birth"
                                name="dayOfBirth"
                                required
                                fullWidth
                                id="dayOfBirth"
                                label="Day of birth"
                                autoFocus
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
                    <Box sx={{ border: 1 }} mt={2} p={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="strength-1"
                                    fullWidth
                                    id="strength-1"
                                    label="Input my strength 1"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">1.</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="strength-2"
                                    fullWidth
                                    id="strength-2"
                                    label="Input my strength 2"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">2.</InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="strength-3"
                                    fullWidth
                                    id="strength-3"
                                    label="Input my strength 3"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">3.</InputAdornment>,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
