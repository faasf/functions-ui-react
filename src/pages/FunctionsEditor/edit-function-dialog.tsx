import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from '@mui/material';
import { EventTrigger, Function, FunctionLanguage, HttpTrigger, RuntimeForLanguage, Trigger } from '../../models';
import { getLanguageSuffix } from '../../utils/get-language-suffix';
import { removeSuffixFromName } from '../../utils/remove-sufffix-from-name';
import { functionsService } from '../../services/functions-service';
import { FunctionRuntime } from '../../models';
import { FunctionStatus } from '../../models/FunctionStatus';
import { v4 as uuidv4 } from 'uuid';
import { Triggers } from './triggers';

export interface EditFunctionDialogProps {
  open: boolean;
  onClose: (fn?: Function) => void;
  function: Function | undefined;
}

export const EditFunctionDialog = (props: EditFunctionDialogProps) => {
  const { onClose, open } = props;
  const [name, setName] = useState(getLanguageSuffix(FunctionLanguage.Javascript));
  const [language, setLanguage] = useState(FunctionLanguage.Javascript);
  const [runtime, setRuntime] = useState(FunctionRuntime.NodeJS);
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(FunctionStatus.Published);
  const [alreadyPublished, setAlreadyPublished] = useState(false);
  const [triggers, setTriggers] = useState([] as (Trigger | HttpTrigger | EventTrigger)[]);

  useEffect(() => {
    if (!props.function) {
      return;
    }

    setName(props.function.name);
    setLanguage(props.function.sourceCode.language);
    setRuntime(props.function.runtime);
    setDescription(props.function.description);
    setStatus(props.function.status);
    setAlreadyPublished(props.function.status === FunctionStatus.Published);
    setTriggers(props.function.triggers.map(t => ({ id: uuidv4(), ...t})));
  }, [open])

  const resetAndClose = (fn?: Function) => {
    setName(getLanguageSuffix(FunctionLanguage.Javascript));
    setDescription('');
    setLanguage(FunctionLanguage.Javascript);
    setRuntime(FunctionRuntime.NodeJS);
    setTriggers([]);
    onClose(fn);
  }

  const handleClose = async (shouldCreate: boolean) => {
    if (!shouldCreate) {
      resetAndClose();
      return;
    }

    const f = await functionsService.updateFunction(name, { runtime, description, triggers, code: props.function?.sourceCode.content as any, etag: props.function?.etag as any });

    resetAndClose(f);
  };

  const handleLanguageChange = (event: any) => {
    const language: FunctionLanguage = event.target.value;
    setLanguage(language);
    setName(removeSuffixFromName(name) + getLanguageSuffix(language))
    setRuntime(RuntimeForLanguage[language][0].runtime);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Function settings</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Function name"
            type="text"
            fullWidth
            disabled={true}
            variant="standard"
            value={name}
            onChange={(event: any) => setName(removeSuffixFromName(event.target.value) + getLanguageSuffix(language))}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormControlLabel control={<Switch onChange={event =>setStatus(event.target.checked ? FunctionStatus.Published : FunctionStatus.Draft)} checked={status === FunctionStatus.Published} disabled={alreadyPublished} />} label="Publish" />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            variant="standard"
            value={description}
            onChange={(event: any) => setDescription(event.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="function-language-label">Language</InputLabel>
          <Select
            labelId="function-language-label"
            id="function-language"
            label="Language"
            disabled={true}
            value={language}
            onChange={handleLanguageChange}
          >
            <MenuItem value={FunctionLanguage.Javascript}>Javascript</MenuItem>
            <MenuItem value={FunctionLanguage.Typescript}>Typescript</MenuItem>
            <MenuItem value={FunctionLanguage.Go}>Golang</MenuItem>
            <MenuItem value={FunctionLanguage.Java}>Java</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel id="function-runtime-label">Runtime</InputLabel>
          <Select
            labelId="function-runtime-label"
            id="function-runtime"
            label="Language"
            value={runtime}
            onChange={(event) => setRuntime(event.target.value as any)}
          >
            {RuntimeForLanguage[language].map(runtimeInfo => (<MenuItem value={runtimeInfo.runtime}>{runtimeInfo.name}</MenuItem>))}
          </Select>
        </FormControl>
        <Triggers triggers={triggers} setTriggers={setTriggers} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)}>Cancel</Button>
        <Button onClick={() => handleClose(true)}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}
