import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));
export default function QuestionPage() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Input
        placeholder="answer"
        className={classes.input}
        inputProps={{
          'aria-label': 'description',
        }}
      />
    </div>
  );
}
