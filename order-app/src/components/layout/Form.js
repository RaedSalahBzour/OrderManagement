export default function Form(props) {
  const { children, ...other } = props;

  return (
    <form
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        "& .MuiFormControl-root": {
          width: "90%",
          m: 1,
        },
      }}
      {...other}
    >
      {children}
    </form>
  );
}
