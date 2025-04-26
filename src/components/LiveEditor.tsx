import LiveEditorContextProvider, { LiveEditorContext, LiveEditorContextProps } from '@/context/Editor';
import { SelectWithPopover } from './SelectWithPopover';
import { Label } from './ui/label';
import { useContext } from 'react';

export type ConfigurationOption = {
  label: string;
  value: any;
  algorithms?: ConfigurationOption[];
  algorithm?: string;
}

export type ConfigurationsType = {
  [name: string]: ConfigurationOption[]
};

export type LiveEditorState = {
  code: string;
  options: ConfigurationsType;
  selectedOptions: ConfigurationsType;
};

interface LiveEditorProps {
  options: ConfigurationsType
}

const LiveEditor: React.FC<LiveEditorProps> = ({options}) => {
  const selected = Object.keys(options).reduce((acc, key) => {
    const values = options[key].map((option) => option.value);
    let selectedValue: ConfigurationOption = values[0];
    acc.set(key, selectedValue);
    if (selectedValue.algorithms) {
      selectedValue = selectedValue.algorithms[0]; // Select the first algorithm by defaul
      acc.set("Algorithms", selectedValue);
    }
    return acc;
  }, new Map());
  const initialState: LiveEditorState = {
    code: "",
    options: options,
    selectedOptions: selected,
  };

  return (
    <LiveEditorContextProvider initialState={initialState}>
      <div className="flex flex-col h-screen w-screen">
        <Header>
          <HeaderItem name="Data Structures" />
        </Header>
        <Body>
          <CodeFrame/>
          <AlgoVisualizer/>
        </Body>
      </div>
    </LiveEditorContextProvider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-around border-b bg-muted p-4">
      {children}
    </div>
  );
}

function HeaderItem({ name }: { name: string }) {
  const { codeState, updateSelectedOption } = useContext(LiveEditorContext) || {};
  const { selectedOptions } = codeState || {};
  const selected = selectedOptions?.[name] || [];
  const options = codeState?.options?.[name] || [];

  return (
    <div className='flex flex-col md:flex-row indeterminate:items-center'>
      <Label className="text-sm font-semibold text-muted-foreground me-2">
        {name}:
      </Label>
      <SelectWithPopover
        name={name}
        options={options}
        selected={selected!}
        onValueChange={updateSelectedOption!}
      />
    </div>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1">
      {children}
    </div>
  );
}

function CodeFrame() {
  const emptyState: LiveEditorContextProps = { codeState: { code: "", options: {}, selectedOptions: {} }, updateSelectedOption: () => {}, updateCode: () => {} };
  const { codeState }: LiveEditorContextProps = useContext(LiveEditorContext) || emptyState;
  const { selectedOptions } = codeState || {};

return (<div className="flex-1 bg-amber-700">
    <iframe
      srcDoc={JSON.stringify(selectedOptions?.Algorithms?.[0]) || ''}
    />
  </div>);
}

function AlgoVisualizer() {
  return (<div className="flex-1">
    </div>
  );
}

export default LiveEditor;
