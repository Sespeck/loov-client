import { Snackbar, SnackbarContent } from '@mui/material';

const customSnackBar = ({ openBar, setOpenBar, snackBarMessage }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={openBar}
      autoHideDuration={1000}
      onClose={() => {
        setOpenBar(false);
      }}
    >
      <SnackbarContent
        style={{
          display: 'inline-block',
          textAlign: 'center',
          backgroundColor: 'royalblue',
          boxShadow: 2,
          borderRadius: 50,
        }}
        message={
          <span className=" font-bold text-white">{snackBarMessage}</span>
        }
      />
    </Snackbar>
  );
};
export default customSnackBar;
