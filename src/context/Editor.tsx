import { ConfigurationOption, ConfigurationsType, LiveEditorState } from '@/components/LiveEditor';
import { createContext, ReactNode, useReducer } from 'react';

type ConfigurationsPerName = {
  [K in keyof ConfigurationsType]: [K, ConfigurationsType[K]]
}[keyof ConfigurationsType];

export interface LiveEditorContextProps {
  codeState: LiveEditorState;
  updateSelectedOption: (name: string, value: ConfigurationOption[]) => void;
  updateCode: (code: string) => void;
}

type CodeAction =
  | { type: 'UPDATE_CODE'; payload: string }
  | { type: 'UPDATE_SELECTED_OPTION'; payload: ConfigurationsPerName }

export const LiveEditorContext = createContext<LiveEditorContextProps | null>(null);

const codeReducer = (state: LiveEditorState, action: CodeAction): LiveEditorState => {
  switch (action.type) {
    case 'UPDATE_CODE':
      return { ...state, code: action.payload };
    case 'UPDATE_SELECTED_OPTION':
      return {
        ...state,
        selectedOptions: {
          [action.payload[0]]: action.payload[1],
        },
      };
    default:
      return state;
  }
};

const LiveEditorContextProvider = ({initialState, children}: {initialState: LiveEditorState, children:ReactNode}) => {
  const [state, dispatch] = useReducer(codeReducer, initialState);

  const updateSelectedOption = (name: string, value: ConfigurationOption[]) => {
    dispatch({ type: 'UPDATE_SELECTED_OPTION', payload: [name, value] });
  };

  const updateCode = (code: string) => {
    dispatch({ type: 'UPDATE_CODE', payload: code });
  };

  return (
    <LiveEditorContext.Provider value={{ codeState: state, updateSelectedOption, updateCode }}>
      {children}
    </LiveEditorContext.Provider>
  );
}

export default LiveEditorContextProvider;
