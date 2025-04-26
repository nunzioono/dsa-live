import './App.css'
import LiveEditor, { ConfigurationOption, ConfigurationsType, LiveEditorState } from './components/LiveEditor'
import LiveEditorContextProvider from './context/Editor';

function App() {
  const arrayAlgorithmsOptions: ConfigurationOption[] = [
    { label: 'Sorting', value: 'sorting', algorithm: `for (let i = 0; i < arr.length; i++) {\n\tfor (let j = 0; j < arr.length - i - 1; j++) {\n\t\tif (arr[j] > arr[j + 1]) {\n\t\t\tlet temp = arr[j];\n\t\t\tarr[j] = arr[j + 1];\n\t\t\tarr[j + 1] = temp;
\n\t\t}\n\t}\n}` },
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


  let selected = new Map<string, ConfigurationOption[]>();
  const selectFirstOptionByKey = (options: ConfigurationsType, key: string): ConfigurationOption => {
      const values = options[key].map((option) => option.value);
      let selectedValue: ConfigurationOption = values[0];
      return selectedValue;
  };

  const getSelectedAlgorithms = (options: ConfigurationsType, selected: Map<string, ConfigurationOption[]>): ConfigurationOption[] => {
    let selectedAlgorithms: ConfigurationOption[] = [];

    for (const [key, value] of selected.entries()) {
      if (key === "Data Structures" && value.length > 0) {
        const algorithms = options[key].map(option=>option.algorithms).flat().filter(el=> el !== undefined);
        if (algorithms) {
          selectedAlgorithms.push(...algorithms);
        }
      }
    }

    return selectedAlgorithms;
  }

  const selectedDs: ConfigurationOption = selectFirstOptionByKey(options, "Data Structures");
  selected.set("Data Structures", [selectedDs]);
  const selectedAlgorithms: ConfigurationOption[] = getSelectedAlgorithms(options, selected);
  selected.set("Algorithms", selectedAlgorithms);
  const selectedDelay: ConfigurationOption = selectFirstOptionByKey(options, "Delay");
  selected.set("Delay", [selectedDelay]);
  const firstAlgorithm: string = selectedAlgorithms[0] ? selectedAlgorithms[0].algorithm! : "";
  const codeState: LiveEditorState = {
    code: firstAlgorithm,
    options: options,
    selectedOptions: selected
  }

  return (
    <LiveEditorContextProvider initialState={codeState}>
      <LiveEditor/>
    </LiveEditorContextProvider>
  )
}

export default App
