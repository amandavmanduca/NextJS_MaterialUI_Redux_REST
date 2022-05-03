import { TextField } from "@mui/material"


export const FormTextField = ({
    name,
    touched,
    error,
    handleChange,
    handleBlur,
    label,
    value,
    isRequired = true,
    readOnly = false,
}: any) => {
    return (
        <TextField
            margin="normal"
            variant="outlined"
            style={{ width: '100%', margin: 0, padding: 0 }}
            label={label}
            name={name}
            value={value}
            required={isRequired}
            helperText={
                touched && error
                ? error
                : ""
            }
            InputProps={{
                readOnly: readOnly,
            }}
            error={Boolean(touched && error)}
            onChange={handleChange}
            onBlur={handleBlur}
        />
    )
}