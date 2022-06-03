import './App.css';
import React from 'react';

const countries = [
  {
    country: 'England',
    color: 'lightblue',
    regions: [
      { code: 'Edi' },
      { code: 'Lvp' },
    ],
  },
  {
    country: 'France',
    color: 'lightgreen',
    regions: [
      { code: 'Edi2' },
      { code: 'Lvp2' },
    ],
  },
];

function OptionGroup({ country, value }) {
  return <optgroup label={country.country} style={{ backgroundColor: country.color }}>
    {country.regions.map(region =>
      <option
        selected={value === region.code}
        value={region.code}
        style={{ fontSize: '16px', margin: '10px', textAlign: 'center' }}
      >{region.code}</option>
    )}
    {/* <option style={{ backgroundColor: c.color }}>{c.code}</option> */}
  </optgroup>
}

function CountrySelect({ value, onChange }) {
  return (
    <select style={{ display: 'flex', flex: '2 auto', fontSize: '16px', padding: '10px', textAlign: 'center' }}
      // value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option></option>
      {countries.map((c) => (
        <OptionGroup country={c} value={value} />

      ))}
    </select>
  );
}

function ActionSelect({ value, onChange }) {
  const options = ['TO', 'SUPPORTS', 'HOLD'];
  return <select
    style={{ display: 'flex', flex: '1 auto', fontSize: '16px', padding: '10px', textAlign: 'center' }} onChange={(event) => onChange(event.target.value)}

  >
    <option></option>
    {options.map((c) => (
      <option selected={value === c}>{c}</option>
    ))}
  </select>
}

function Row({ onDelete, row, onChange }) {
  return <>
    <CountrySelect value={row.country1} onChange={(val) => onChange({ ...row, country1: val })} />
    <ActionSelect value={row.action} onChange={(val) => onChange({ ...row, action: val })} />
    <CountrySelect value={row.country2} onChange={(val) => onChange({ ...row, country2: val })} /><button style={{ flex: '0 auto', minWidth: '10%', textAlign: 'center' }} onClick={onDelete}>X</button>
  </>
}

function App() {
  const [rows, setRows] = React.useState([{
    country1: 'Edi',
    action: 'to',
    country2: 'Edi'
  }]);

  function onDelete(index) {
    console.log('delete', index)
    setRows(oldRows => oldRows.filter((_row, innerIndex) => innerIndex !== index));
  }

  function onChange(index, newRow) {
    console.log(index, newRow)
    const newRows = rows;
    rows[index] = newRow;
    console.log(newRows)
    setRows(newRows)
  }

  return (
    <div className="App" >
      {JSON.stringify(rows, null, 2)}
      {rows.map((row, index) => <div style={{ display: 'flex' }}>
        <Row onDelete={() => onDelete(index)} row={row} onChange={(newRow) => onChange(index, newRow)} /></div>)}
      <div style={{ display: 'flex' }}><button style={{
        flex: '1 auto', padding: '10px', backgroundColor: '#402cc7', color: 'white', fontWeight: '600', fontSize: '16px'
      }}
        onClick={() => setRows((rows => [...rows, {}]))}
      >Add</button></div>
    </div >
  );
}

export default App;
