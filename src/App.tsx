import './App.css'
import LiveEditor, { ConfigurationOption, ConfigurationsType } from './components/LiveEditor'

function App() {
  const arrayAlgorithmsOptions: ConfigurationOption[] = [
    { label: 'Sorting', value: 'sorting', algorithm: `for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }` },
    { label: 'Searching', value: 'searching', algorithm: `` },
  ];
  const dsOptions: ConfigurationOption[]= [
    { label: 'Array', value: 'array', algorithms: arrayAlgorithmsOptions },
  ];
  const delayOptions: ConfigurationOption[] = [
    { label: '500ms', value: '500' },
    { label: '1000ms', value: '1000' },
    { label: '2000ms', value: '2000' },
  ];
  const options: ConfigurationsType = {
    "Data Structures": dsOptions,
    "Delay": delayOptions
  };

  return (
    <LiveEditor options={options}/>
  )
}

export default App
