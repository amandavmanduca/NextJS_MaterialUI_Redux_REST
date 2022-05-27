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
    type = 'text',
}: any) => {
    return (
        <TextField
            margin="normal"
            id={name}
            variant="outlined"
            style={{ width: '100%', margin: 0 }}
            label={label}
            name={name}
            type={type}
            value={value}
            required={isRequired}
            helperText={
                touched && error
                ? String(error)
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