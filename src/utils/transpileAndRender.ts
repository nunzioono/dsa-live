import * as Babel from '@babel/standalone';
import React from 'react';
import { Root } from 'react-dom/client';

export function transpileAndRender(
  sourceCode: string,
  mountNode: HTMLElement,
  rootRef: React.MutableRefObject<Root | null>,
  createRootFn: (container: HTMLElement) => Root
): void {
  try {
    if (!rootRef.current) {
      rootRef.current = createRootFn(mountNode);
    }

    const transpiled = Babel.transform(sourceCode, {
      presets: ['react', 'env'],
    }).code;

    if (!transpiled) {
      throw new Error('Transpilation failed.');
    }

    const renderFunction = new Function(
      'React',
      'root',
      transpiled
    );

    renderFunction(React, rootRef.current);
  } catch (err: any) {
    mountNode.innerHTML = `<pre style="color: red;">${err.message}</pre>`;
  }
}
