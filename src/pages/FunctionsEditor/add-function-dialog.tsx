import { useState } from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { EventTrigger, FunctionLanguage, HttpTrigger, RuntimeForLanguage } from '../../models';
import { getLanguageSuffix } from '../../utils/get-language-suffix';
import { removeSuffixFromName } from '../../utils/remove-sufffix-from-name';
import { functionsService } from '../../services/functions-service';
import { FunctionRuntime } from '../../models';
import { Triggers } from './triggers';

export interface AddFunctionDialogProps {
  open: boolean;
  onClose: (functionName?: string) => void;
}

export const AddFunctionDialog = (props: AddFunctionDialogProps) => {
  const { onClose, open } = props;
  const [name, setName] = useState(getLanguageSuffix(FunctionLanguage.Javascript));
  const [language, setLanguage] = useState(FunctionLanguage.Javascript);
  const [runtime, setRuntime] = useState(FunctionRuntime.NodeJS);
  const [description, setDescription] = useState('');
  const [triggers, setTriggers] = useState([] as (HttpTrigger | EventTrigger)[]);

  const resetAndClose = (functionName?: string) => {
    setName(getLanguageSuffix(FunctionLanguage.Javascript));
    setDescription('');
    setLanguage(FunctionLanguage.Javascript);
    setRuntime(FunctionRuntime.NodeJS);
    setTriggers([]);
    onClose(functionName);
  }

  const handleClose = async (shouldCreate: boolean) => {
    if (!shouldCreate) {
      resetAndClose();
      return;
    }

    await functionsService.createFunction({ name, runtime, description, triggers });

    resetAndClose(name);
  };

  const handleLanguageChange = (event: any) => {
    const language: FunctionLanguage = event.target.value;
    setLanguage(language);
    setName(removeSuffixFromName(name) + getLanguageSuffix(language))
    setRuntime(RuntimeForLanguage[language][0].runtime);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Add new function</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Function name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(event: any) => setName(removeSuffixFromName(event.target.value) + getLanguageSuffix(language))}
          />
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
            value={language}
            onChange={handleLanguageChange}
          >
            <MenuItem value={FunctionLanguage.Javascript}>Javascript</MenuItem>
            <MenuItem value={FunctionLanguage.Typescript}>Typescript</MenuItem>
            {/* <MenuItem value={FunctionLanguage.Go}>Golang</MenuItem>
            <MenuItem value={FunctionLanguage.Java}>Java</MenuItem> */}
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
        <Button onClick={() => handleClose(true)}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

