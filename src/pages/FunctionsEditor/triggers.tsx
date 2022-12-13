import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { HttpMethod, TriggerType } from '../../models';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

export const Triggers = (props: { triggers: any[], setTriggers: any }) => {
    const { triggers, setTriggers } = props;

    const handleChangeTriggerType = (id: string, triggerType: TriggerType) => {
      const trs = triggers.map(t => t.id === id ? ({ ...t, type: triggerType }) : t);
      setTriggers(trs);
    };
  
    const handleMethodChange = (id: string, method: HttpMethod) => {
      const trs = triggers.map(t => t.id === id ? ({ ...t, method }) : t);
      setTriggers(trs);
    };
  
    const handleTopicChange = (id: string, topic: string) => {
      const trs = triggers.map(t => t.id === id ? ({ ...t, topic }) : t);
      setTriggers(trs);
    };
  
    const handlePropChange = (id: string, props: any) => {
      const trs = triggers.map(t => t.id === id ? ({ ...t, ...props }) : t);
      setTriggers(trs);
    };
  
    const handleAddTrigger = () => {
      setTriggers([
        ...triggers,
        { id: uuidv4(), type: TriggerType.Http }
      ])
    };
  
    const handleDeleteTrigger = (id: string) => {
      setTriggers(triggers.filter(t => t.id !== id));
    };
  
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ margin: '8px 0 0 0' }}>Triggers</div>
          <Tooltip title="Add trigger"><IconButton onClick={handleAddTrigger}><AddIcon /></IconButton></Tooltip>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {triggers.map((trigger) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="trigger-type-label">Type</InputLabel>
                      <Select
                        labelId="trigger-type-label"
                        id="trigger-type"
                        label="Type"
                        value={trigger.type}
                        onChange={event => handleChangeTriggerType(trigger.id, event.target.value as any)}
                      >
                        <MenuItem value={TriggerType.Http}>Http</MenuItem>
                        {/* <MenuItem value={TriggerType.Event}>Event</MenuItem> */}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="standard" fullWidth>
                      {trigger.type === TriggerType.Http ? (
                        <>
                          <InputLabel id="method-label">Method</InputLabel>
                          <Select
                            labelId="method-label"
                            id="method"
                            label="Method"
                            value={trigger.method}
                            onChange={event => handleMethodChange(trigger.id, event.target.value as any)}
                          >
                            <MenuItem value={HttpMethod.Get}>Get</MenuItem>
                            <MenuItem value={HttpMethod.Post}>Post</MenuItem>
                            <MenuItem value={HttpMethod.Put}>Put</MenuItem>
                            <MenuItem value={HttpMethod.Patch}>Patch</MenuItem>
                            <MenuItem value={HttpMethod.Delete}>Delete</MenuItem>
                          </Select>
                        </>
                      ) : (
                        <TextField
                          margin="dense"
                          id="topic"
                          label="Topic"
                          type="text"
                          fullWidth
                          multiline
                          variant="standard"
                          value={trigger.topic}
                          onChange={event => handleTopicChange(trigger.id, event.target.value)}
                        />
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <FormControl variant="standard" fullWidth>
                      <TextField
                        margin="dense"
                        id={trigger.type === TriggerType.Http ? 'url' : 'eventType'}
                        label={trigger.type === TriggerType.Http ? 'Url' : 'Event type'}
                        type="text"
                        fullWidth
                        multiline
                        variant="standard"
                        value={trigger.type === TriggerType.Http ? trigger.url : trigger.eventType}
                        onChange={event => handlePropChange(trigger.id, { [trigger.type === TriggerType.Http ? 'url' : 'eventType']: event.target.value })}
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Delete trigger"><IconButton onClick={() => handleDeleteTrigger(trigger.id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }