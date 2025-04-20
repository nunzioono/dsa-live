import './App.css'
import LiveEditor from './components/LiveEditor'

function App() {
  const DsOptions = [
    { label: 'Array', value: 'array' },
  ];

  const AlgoritmsOptions = [
    { label: 'Sorting', value: 'sorting' },
    { label: 'Searching', value: 'searching' },
  ];

  return (
    <>
      <LiveEditor>
        <LiveEditor.Header>
          <LiveEditor.HeaderItem name="Data Structures" options={DsOptions} />
          <LiveEditor.HeaderItem name="Algorithms" options={AlgoritmsOptions} />
        </LiveEditor.Header>
      </LiveEditor>
    </>
  )
}

export default App
