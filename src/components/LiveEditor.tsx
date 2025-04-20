import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { createRoot, Root } from 'react-dom/client';
import { transpileAndRender } from '../utils/transpileAndRender';
import { SelectWithPopover } from './SelectWithPopover';
import { Label } from './ui/label';

function LiveEditor({ children }: { children: React.ReactNode }) {
  const [code, setCode] = useState<string>(`function MyComponent() {
  return (
    <div style={{ padding: "1rem", backgroundColor: "#eef" }}>
      <h2>Hello, live JSX!</h2>
      <p>You can edit this component.</p>
    </div>
  );
}

root.render(<MyComponent />);`);

  const outputRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      transpileAndRender(code, outputRef.current, rootRef, createRoot);
    }
  }, []);

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined && outputRef.current) {
      setCode(value);
      transpileAndRender(value, outputRef.current, rootRef, createRoot);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      { children }
      <div className="flex flex-1">
        <div className="w-1/2">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            value={code}
            onChange={handleCodeChange}
            theme="vs-dark"
          />
        </div>
        <div
          ref={outputRef}
          className="w-1/2 p-4 bg-white overflow-auto"
        />
      </div>
    </div>
  );
}

function Header({children}: {children: React.ReactNode}) {
  return (
    <div className="flex justify-around border-b bg-muted p-4">
      {children}
    </div>
  );
}

function HeaderItem({name, options}: {name: string, options: {label: string, value: string}[]}) {
  return (<div className='flex items-center'>
  <Label className="text-sm font-semibold text-muted-foreground me-2">
    {name}:
  </Label>
  <SelectWithPopover options={options} />
</div>);
}


LiveEditor.Header = Header;
LiveEditor.HeaderItem = HeaderItem;

export default LiveEditor;
