import { LiveEditorContext } from '@/context/Editor';
import { SelectWithPopover } from './SelectWithPopover';
import { Label } from './ui/label';
import { useContext } from 'react';
import { Editor } from '@monaco-editor/react';

export type ConfigurationOption = {
  label: string;
  value: any;
  algorithms?: ConfigurationOption[];
  algorithm?: string;
};

export type ConfigurationsType = {
  [name: string]: ConfigurationOption[];
};

export type LiveEditorState = {
  code: string;
  options: ConfigurationsType;
  selectedOptions: Map<string, ConfigurationOption[]>;
};

const LiveEditor = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header>
        <HeaderItem name="Data Structures" />
        <HeaderItem name="Algorithms" />
        <HeaderItem name="Delay" />
      </Header>
      <Body>
        <CodeFrame />
        <AlgoVisualizer />
      </Body>
    </div>
  );
};

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-around border-b bg-muted p-4">
      {children}
    </div>
  );
}

function HeaderItem({ name }: { name: string }) {
  const { codeState, updateSelectedOption } = useContext(LiveEditorContext) || {};
  if (!codeState || !updateSelectedOption) throw new Error("LiveEditorContext must be used within LiveEditorContextProvider");

  const { selectedOptions } = codeState;
  const selected = selectedOptions.get(name) || [];
  const options = codeState.options[name] || [];

  return (
    <div className="flex flex-col md:flex-row indeterminate:items-center">
      <Label className="text-sm font-semibold text-muted-foreground me-2">
        {name}:
      </Label>
      <SelectWithPopover
        name={name}
        options={options}
        selected={selected}
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
  const { codeState } = useContext(LiveEditorContext) || {};
  if (!codeState) throw new Error("LiveEditorContext must be used within LiveEditorContextProvider");

  const { code } = codeState;

  function handleEditorWillMount(monaco: any) {
    monaco.editor.defineTheme('myCustomTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '90A959', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'F3A712' },
        { token: 'number', foreground: 'EC7F20' },
        { token: 'string', foreground: 'E4572E' },
      ],
      colors: {
        'editor.background': '#151B2E',
      }
    });
  }

  return (
    <Editor
      height="100%"
      width="50%"
      defaultLanguage="javascript"
      defaultValue={code}
      theme="myCustomTheme"
      beforeMount={handleEditorWillMount}
    />
  );
}

function AlgoVisualizer() {
  return <div className="flex-1"></div>;
}

export default LiveEditor;
