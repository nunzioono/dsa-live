import './App.css'
import LiveEditor, { ConfigurationOption, ConfigurationsType, LiveEditorState } from './components/LiveEditor'
import LiveEditorContextProvider from './context/Editor';

function App() {
  const arrayAlgorithmsOptions: ConfigurationOption[] = [
    { label: 'Sorting', value: 'sorting', algorithm: `for (let i = 0; i < arr.length; i++) {\n\tfor (let j = 0; j < arr.length - i - 1; j++) {\n\t\tif (arr[j] > arr[j + 1]) {\n\t\t\tlet temp = arr[j];\n\t\t\tarr[j] = arr[j + 1];\n\t\t\tarr[j + 1] = temp;
\n\t\t}\n\t}\n}` },
    { label: 'Searching', value: 'searching', algorithm: `for (let i = 0; i < arr.length; i++) {\n\tif (arr[i] === target) {\n\t\treturn i;\n\t}\n}\nreturn -1;` },
    { label: 'Insertion', value: 'insertion', algorithm: `for (let i = 1; i < arr.length; i++) {\n\tlet key = arr[i];\n\tlet j = i - 1;\n\twhile (j >= 0 && arr[j] > key) {\n\t\tarr[j + 1] = arr[j];\n\t\tj--;\n\t}\n\tarr[j + 1] = key;\n}` }
  ];

  const dsOptions: ConfigurationOption[]= [
    { label: 'Array', value: 'array', algorithms: arrayAlgorithmsOptions },
  ];
  const delayOptions: ConfigurationOption[] = [
    { label: '500ms', value: '500' },
    { label: '1000ms', value: '1000' },
    { label: '2000ms', value: '2000' },
  ];
  const getAlgorithmOptions = (options: ConfigurationOption[], selected: ConfigurationOption[]): ConfigurationOption[] => {
    return options.filter(option=>option.algorithms !== undefined && selected.includes(option)).map(option=>option.algorithms!).flat();
  };

  const options: ConfigurationsType = {
    "Data Structures": dsOptions,
    "Algorithms": getAlgorithmOptions(dsOptions, dsOptions),
    "Delay": delayOptions
  };


  let selected = new Map<string, ConfigurationOption[]>();
  const selectFirstOptionByKey = (options: ConfigurationsType, key: string): ConfigurationOption => {
      const values = options[key].map((option) => option.value);
      let selectedValue: ConfigurationOption = values[0];
      return selectedValue;
  };

  const getSelectedAlgorithms = (options: ConfigurationsType, selected: Map<string, ConfigurationOption[]>): ConfigurationOption => {
    let selectedAlgorithms: ConfigurationOption[] = [];

    for (const [key, value] of selected.entries()) {
      if (key === "Data Structures" && value.length > 0) {
        const algorithms = options[key].map(option=>option.algorithms).flat().filter(el=> el !== undefined);
        if (algorithms) {
          selectedAlgorithms.push(...algorithms);
        }
      }
    }

    return selectedAlgorithms[0];
  }

  const selectedDs: ConfigurationOption = selectFirstOptionByKey(options, "Data Structures");
  selected.set("Data Structures", [selectedDs]);
  const selectedAlgorithms: ConfigurationOption = getSelectedAlgorithms(options, selected);
  selected.set("Algorithms", [selectedAlgorithms]);
  const selectedDelay: ConfigurationOption = selectFirstOptionByKey(options, "Delay");
  selected.set("Delay", [selectedDelay]);
  const codeState: LiveEditorState = {
    code: selectedAlgorithms.algorithm || '',
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
