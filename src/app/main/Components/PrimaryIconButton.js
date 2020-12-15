import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const PrimaryIconButton = withStyles((theme) => ({
    root: {
      color: "#ffffff",
      backgroundColor: '#24aae0',
      '&:hover': {
        backgroundColor: '#1d8ab5',
      },
    },
  }))(IconButton);

  export default PrimaryIconButton