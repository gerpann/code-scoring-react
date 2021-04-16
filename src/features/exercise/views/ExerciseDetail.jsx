import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  Input,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon, CloudUpload as UploadIcon } from '@material-ui/icons';

import { RUN_SUBMIT_EXERCISE_TYPE, LANGUAGE_CODE } from 'src/app/constants';
import {
  fetchExerciseDetail,
  fetchSubmitExercise,
  fetchRunExercise,
} from 'src/features/exercise/exerciseSlice';
import LoadingScreen from 'src/components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
  commonPaperWrap: {
    padding: theme.spacing(4),
  },
  contentWrap: {
    marginTop: theme.spacing(8),
  },
  testCasesArea: {
    padding: theme.spacing(2),
  },
  testCase: {
    width: '100%',
  },
  testCaseArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  ioArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  ioDataArea: {
    backgroundColor: '#ecf0f1',
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  },
  paragraph: {
    whiteSpace: 'pre-wrap',
  },
  submitArea: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputWrap: {},
  submitAreaButton: {
    margin: theme.spacing(1),
  },
  uploadFileInput: {
    display: 'none',
    minWidth: 120,
  },
}));

const ListExercise = (props) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const currentExercise_gs = useSelector((state) => state.exerciseSlice.currentExercise);
  const runResult_gs = useSelector((state) => state.exerciseSlice.runResult);
  const submittedResult_gs = useSelector((state) => state.exerciseSlice.submittedResult);

  // local state
  const { exerciseId } = props.match.params;
  const [uploadedFile_ls, setUploadedFile_ls] = useState(null);
  const [language_ls, setLanguage_ls] = useState(LANGUAGE_CODE.c);
  const [openSelect_ls, setOpenSelect_ls] = useState(false);

  const handleUpload = (event) => {
    setUploadedFile_ls(event.target.files[0]);
  };

  const handleRunExercise = () => {
    dispatch(
      fetchRunExercise({ exerciseId, scriptCode: '', languageId: 2, codeFile: uploadedFile_ls })
    );
  };

  const handleSubmitExercise = () => {
    dispatch(
      fetchSubmitExercise({ exerciseId, scriptCode: '', languageId: 2, codeFile: uploadedFile_ls })
    );
  };

  useEffect(() => {
    dispatch(fetchExerciseDetail({ exerciseId }));
  }, [dispatch, exerciseId]);

  return (
    <Container>
      {!currentExercise_gs ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={2}>
          <Grid container item spacing={2} md={9} className={classes.contentWrap}>
            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <Typography variant="h6">{currentExercise_gs?.title}</Typography>
                <Typography className={classes.paragraph} paragraph>
                  {currentExercise_gs?.content}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Accordion className={classes.testCasesArea} elevation={5}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{`Test case thử`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box className={classes.testCase}>
                    {currentExercise_gs.testCases?.length &&
                      currentExercise_gs.testCases.map((testCase, index) => {
                        return (
                          <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography>{`Test case ${index + 1}`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Box className={classes.testCaseArea}>
                                <Box className={classes.ioArea} marginBottom={1}>
                                  <Typography>{'Input:'}</Typography>
                                  <Box className={classes.ioDataArea}>
                                    <Typography className={classes.paragraph}>
                                      {testCase.input.toString()}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box className={classes.ioArea}>
                                  <Typography>{'Output:'}</Typography>
                                  <Box className={classes.ioDataArea}>
                                    <Typography className={classes.paragraph}>
                                      {testCase.output.toString()}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            </AccordionDetails>
                          </Accordion>
                        );
                      })}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.commonPaperWrap} elevation={5}>
                <div>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Ngôn ngữ</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={openSelect_ls}
                      onClose={() => setOpenSelect_ls(false)}
                      onOpen={() => setOpenSelect_ls(true)}
                      value={language_ls}
                      onChange={(event) => setLanguage_ls(event.target.value)}
                    >
                      {Object.keys(LANGUAGE_CODE).map((language) => (
                        <MenuItem value={LANGUAGE_CODE[language]}>
                          {LANGUAGE_CODE[language]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <Button
                  className={[classes.inputWrap, classes.submitAreaButton]}
                  variant="contained"
                  color="primary"
                  component="label"
                >
                  <Input
                    className={classes.uploadFileInput}
                    id="contained-button-file"
                    type="file"
                    onChange={handleUpload}
                    draggable
                  />
                  <UploadIcon />
                </Button>

                {uploadedFile_ls && (
                  <React.Fragment>
                    <Input value={uploadedFile_ls.name} disabled />
                    <Button
                      className={classes.submitAreaButton}
                      variant="outlined"
                      color="primary"
                      onClick={handleRunExercise}
                    >
                      {'Chạy code'}
                    </Button>
                    <Button
                      className={classes.submitAreaButton}
                      variant="outlined"
                      color="primary"
                      onclick={handleSubmitExercise}
                    >
                      {'Nộp bài'}
                    </Button>
                  </React.Fragment>
                )}
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={2} item md={3} className={classes.contentWrap}>
            <Grid item xs={12}>
              <Box className={classes.commonPaperWrap}>
                <Typography>{`Author: ${currentExercise_gs.created_by}`}</Typography>
                <Typography>{`Max score: ${currentExercise_gs.point}`}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ListExercise;
