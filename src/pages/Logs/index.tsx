import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactJson from '@dinuac/react-json-view'
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { logsService } from "../../services/logs-service";
import { Log } from '../../models';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Logs = () => {
    const [executionId, setExecutionId] = useState('');
    const [functionName, setFunctionName] = useState('');
    const [logLevel, setLogLevel] = useState('');
    const [logs, setLogs] = useState([] as Log[]);

    const search = async () => {
        const logs = await logsService.getLogs({ executionId, functionName, logLevel });
        setLogs(logs);
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Logs
            </Typography>
            <Box sx={{ mb: 2 }}>
                <div style={{ marginBottom: 16, display: 'flex' }}>
                    <FormControl sx={{ flex: 1, mr: 2 }}>
                        <TextField
                            autoFocus
                            id="executionId"
                            label="Execution ID"
                            type="text"
                            variant="standard"
                            value={executionId}
                            onChange={(event: any) => setExecutionId(event.target.value as any)}
                        />
                    </FormControl>
                    <FormControl sx={{ flex: 1, mr: 2 }}>
                        <TextField
                            id="functionName"
                            label="Function Name"
                            type="text"
                            multiline
                            variant="standard"
                            value={functionName}
                            onChange={(event: any) => setFunctionName(event.target.value)}
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ flex: 1 }}>
                        <InputLabel id="log-level-label">Log level</InputLabel>
                        <Select
                            labelId="log-level-label"
                            id="log-level"
                            label="Log level"
                            value={logLevel}
                            onChange={(event: any) => setLogLevel(event.target.value)}
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="error">Error</MenuItem>
                            <MenuItem value="warning">Warning</MenuItem>
                            <MenuItem value="info">Info</MenuItem>
                            <MenuItem value="debug">Debug</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button onClick={search} disabled={!executionId && !functionName} variant="contained">Search</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Execution Id</TableCell>
                            <TableCell align="right">Log Level</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Message</TableCell>
                            <TableCell align="right">Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow
                                key={log.executionId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0, fontSize: 12 } }}
                            >
                                <TableCell sx={{ fontSize: 12 }} component="th" scope="row">
                                    {log.executionId}
                                </TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="right">{log.level}</TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="right">{new Date(log.time).toLocaleString()}</TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="right">{log.message}</TableCell>
                                <TableCell sx={{ fontSize: 12 }} align="right">{log.data ? (<ReactJson src={log.data} />) : null}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Logs;
